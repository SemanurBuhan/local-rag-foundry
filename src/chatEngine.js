import { FoundryLocalManager } from "foundry-local-sdk";
import { config } from "./config.js";
import { search } from "./vectorStore.js";
import { buildMessages } from "./prompts.js";

let chatClient = null;

export async function initChatEngine(onStatus) {
  if (chatClient) return;

  onStatus?.("baslatiliyor");
  const manager = FoundryLocalManager.create({ appName: "local-rag-foundry" });

  const model = await manager.catalog.getModel(config.model.alias);

  if (!model.isCached) {
    onStatus?.("indiriliyor", 0);
    await model.download((progress) => onStatus?.("indiriliyor", progress));
  }

  onStatus?.("yukleniyor");
  await model.load();

  chatClient = model.createChatClient();
  chatClient.settings.temperature = config.model.temperature;
  chatClient.settings.maxTokens = config.model.maxTokens;
  onStatus?.("hazir");
}

export function isReady() {
  return chatClient !== null;
}

// Foundry Local aynı modele gelen istekleri paralel işleyemiyor; ikinci bir
// istek gelince ilkini "Operation was cancelled" ile iptal ediyor. Bu yüzden
// istekleri tek sıraya diziyoruz.
let queue = Promise.resolve();

export function answerQuestion(question) {
  const task = queue.then(
    () => generateAnswer(question),
    () => generateAnswer(question)
  );
  // Bir isteğin hatası sıradaki isteği düşürmesin.
  queue = task.catch(() => {});
  return task;
}

// Model maxTokens sınırına takılırsa cevap cümle ortasında kesilebiliyor.
// Son tam cümleye kadar kırparak temiz bir bitiş sağlıyoruz.
function trimToLastSentence(text) {
  const trimmed = (text || "").trim();
  if (!trimmed || /[.!?…]$/.test(trimmed)) return trimmed;
  const lastStop = Math.max(
    trimmed.lastIndexOf("."),
    trimmed.lastIndexOf("!"),
    trimmed.lastIndexOf("?"),
    trimmed.lastIndexOf("…")
  );
  return lastStop > 40 ? trimmed.slice(0, lastStop + 1) : trimmed;
}

function isCancelled(err) {
  const msg = `${err?.message || ""} ${err?.cause?.message || ""}`;
  return /cancel/i.test(msg);
}

async function generateAnswer(question, attempt = 1) {
  if (!chatClient) {
    throw new Error(
      "Chat engine henüz hazır değil. Önce initChatEngine() çağrılmalı."
    );
  }

  const results = search(question);
  const messages = buildMessages(question, results);

  try {
    // Senkron completeChat() native çağrısı tüm event loop'u bloklar (cevap
    // üretimi 30-240 sn sürebiliyor), bu da sunucuyu donduruyor ve eşzamanlı
    // isteklerde "Operation was cancelled" hatasına yol açıyordu. Streaming API
    // executeCommandStreaming'i bir worker thread'de await ile çalıştırıyor;
    // event loop'u bloklamıyor. Parçaları burada biriktirip tek yanıt dönüyoruz.
    let answer = "";
    const stream = chatClient.completeStreamingChat(messages);
    for await (const chunk of stream) {
      const choice = chunk?.choices?.[0];
      const delta = choice?.delta?.content ?? choice?.message?.content ?? "";
      if (delta) answer += delta;
    }

    return {
      answer: trimToLastSentence(answer),
      sources: [...new Set(results.map((r) => r.source))],
    };
  } catch (err) {
    if (isCancelled(err) && attempt < 2) {
      console.warn(
        `completeChat iptal edildi, yeniden deneniyor (deneme ${attempt + 1})...`
      );
      return generateAnswer(question, attempt + 1);
    }
    throw err;
  }
}
