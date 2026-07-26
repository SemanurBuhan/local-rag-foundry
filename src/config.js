import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");

export const config = {
  model: {
    alias: "qwen2.5-1.5b",
    displayName: "Qwen2.5 1.5B",
    temperature: 0.1,
    maxTokens: 150,
  },
  chunk: {
    size: 200,
    overlap: 25,
  },
  retrieval: {
    topK: 2,
  },
  paths: {
    docsDir: path.join(ROOT_DIR, "docs"),
    dbPath: path.join(ROOT_DIR, "data", "rag.db"),
    publicDir: path.join(ROOT_DIR, "public"),
  },
  server: {
    port: 3000,
    host: "127.0.0.1",
  },
};
