import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");

export const config = {
  model: {
    alias: "phi-3.5-mini",
    temperature: 0.1,
    maxTokens: 400,
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
  },
  server: {
    port: 3000,
    host: "127.0.0.1",
  },
};
