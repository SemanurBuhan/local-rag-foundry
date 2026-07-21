import express from "express";
import { config } from "./config.js";
import { initChatEngine, isReady, answerQuestion } from "./chatEngine.js";

const app = express();
app.use(express.json());
app.use(express.static(config.paths.publicDir));

const statusSubscribers = new Set();
let currentStatus = { stage: "baslatiliyor" };

function broadcastStatus(status) {
  currentStatus = status;
  const payload = `data: ${JSON.stringify(status)}\n\n`;
  for (const res of statusSubscribers) {
    res.write(payload);
  }
}

app.get("/api/status/stream", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();
  res.write(`data: ${JSON.stringify(currentStatus)}\n\n`);

  statusSubscribers.add(res);
  req.on("close", () => statusSubscribers.delete(res));
});

app.post("/api/chat", async (req, res) => {
  const question = req.body?.question;
  if (typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "Soru (question) alanı gerekli." });
  }
  if (!isReady()) {
    return res.status(503).json({ error: "Model henüz hazır değil, lütfen bekleyin." });
  }

  try {
    const result = await answerQuestion(question.trim());
    res.json(result);
  } catch (err) {
    console.error("Cevap üretme hatası:", err);
    res.status(500).json({ error: "Cevap üretilirken bir hata oluştu." });
  }
});

app.listen(config.server.port, config.server.host, () => {
  console.log(`Sunucu çalışıyor: http://${config.server.host}:${config.server.port}`);
});

initChatEngine((stage, progress) => broadcastStatus({ stage, progress })).catch(
  (err) => {
    console.error("Model başlatılamadı:", err);
    broadcastStatus({ stage: "hata", message: err.message });
  }
);
