import fs from "node:fs";
import path from "node:path";
import { config } from "./config.js";
import { splitIntoChunks } from "./chunker.js";
import { resetStore, indexChunks } from "./vectorStore.js";

function loadChunksFromDocs() {
  const files = fs
    .readdirSync(config.paths.docsDir)
    .filter((file) => file.endsWith(".md"));

  const chunksData = [];
  for (const file of files) {
    const text = fs.readFileSync(
      path.join(config.paths.docsDir, file),
      "utf-8"
    );
    const chunks = splitIntoChunks(text);
    chunks.forEach((content, chunkIndex) => {
      chunksData.push({ source: file, chunkIndex, content });
    });
    console.log(`  ${file}: ${chunks.length} chunk`);
  }

  return { files, chunksData };
}

function main() {
  console.log(`Dokümanlar okunuyor: ${config.paths.docsDir}`);
  const { files, chunksData } = loadChunksFromDocs();

  if (chunksData.length === 0) {
    console.log("Hiç .md dosyası bulunamadı, indeksleme yapılmadı.");
    return;
  }

  resetStore();
  const inserted = indexChunks(chunksData);

  console.log(
    `\nTamamlandı: ${files.length} doküman, ${inserted} chunk indekslendi.`
  );
  console.log(`Veritabanı: ${config.paths.dbPath}`);
}

main();
