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

export async function answerQuestion(question) {
  if (!chatClient) {
    throw new Error(
      "Chat engine henüz hazır değil. Önce initChatEngine() çağrılmalı."
    );
  }

  const results = search(question);
  const messages = buildMessages(question, results);

  const completion = await chatClient.completeChat(messages);

  return {
    answer: completion.choices[0].message.content,
    sources: [...new Set(results.map((r) => r.source))],
  };
}
