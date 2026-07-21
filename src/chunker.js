import { config } from "./config.js";

function tokenize(text) {
  return text.split(/\s+/).filter(Boolean);
}

export function splitIntoChunks(
  text,
  { size = config.chunk.size, overlap = config.chunk.overlap } = {}
) {
  const words = tokenize(text);
  if (words.length === 0) return [];
  if (words.length <= size) return [words.join(" ")];

  const step = size - overlap;
  const chunks = [];
  for (let start = 0; start < words.length; start += step) {
    const end = Math.min(start + size, words.length);
    chunks.push(words.slice(start, end).join(" "));
    if (end === words.length) break;
  }
  return chunks;
}
