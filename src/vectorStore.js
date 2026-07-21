import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { config } from "./config.js";
import { tokenizeForVector, computeTermFrequency } from "./chunker.js";

let db = null;

export function getDb() {
  if (db) return db;

  fs.mkdirSync(path.dirname(config.paths.dbPath), { recursive: true });
  db = new Database(config.paths.dbPath);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS chunks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT NOT NULL,
      chunk_index INTEGER NOT NULL,
      content TEXT NOT NULL,
      vector TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS vocabulary (
      term TEXT PRIMARY KEY,
      idf REAL NOT NULL
    );
  `);

  return db;
}

export function resetStore() {
  const database = getDb();
  database.exec("DELETE FROM chunks; DELETE FROM vocabulary;");
}

export function computeIdf(termFrequencies) {
  const totalChunks = termFrequencies.length;
  const documentFrequency = new Map();

  for (const termFrequency of termFrequencies) {
    for (const term of termFrequency.keys()) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
  }

  const idf = new Map();
  for (const [term, freq] of documentFrequency) {
    idf.set(term, Math.log(totalChunks / freq));
  }
  return idf;
}

export function buildVector(termFrequency, idfMap) {
  const vector = new Map();
  for (const [term, count] of termFrequency) {
    const idf = idfMap.get(term);
    if (idf) vector.set(term, count * idf);
  }
  return vector;
}

export function cosineSimilarity(vectorA, vectorB) {
  const [smaller, larger] =
    vectorA.size <= vectorB.size ? [vectorA, vectorB] : [vectorB, vectorA];

  let dotProduct = 0;
  for (const [term, weight] of smaller) {
    const otherWeight = larger.get(term);
    if (otherWeight) dotProduct += weight * otherWeight;
  }

  const normA = Math.sqrt([...vectorA.values()].reduce((sum, w) => sum + w * w, 0));
  const normB = Math.sqrt([...vectorB.values()].reduce((sum, w) => sum + w * w, 0));
  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (normA * normB);
}

export function indexChunks(chunksData) {
  const database = getDb();

  const termFrequencies = chunksData.map((chunk) =>
    computeTermFrequency(tokenizeForVector(chunk.content))
  );
  const idfMap = computeIdf(termFrequencies);

  const insertChunk = database.prepare(
    "INSERT INTO chunks (source, chunk_index, content, vector) VALUES (?, ?, ?, ?)"
  );
  const insertTerm = database.prepare(
    "INSERT OR REPLACE INTO vocabulary (term, idf) VALUES (?, ?)"
  );

  const insertAll = database.transaction(() => {
    chunksData.forEach((chunk, i) => {
      const vector = buildVector(termFrequencies[i], idfMap);
      insertChunk.run(
        chunk.source,
        chunk.chunkIndex,
        chunk.content,
        JSON.stringify([...vector])
      );
    });
    for (const [term, idf] of idfMap) {
      insertTerm.run(term, idf);
    }
  });
  insertAll();

  return chunksData.length;
}

export function getChunkCount() {
  const database = getDb();
  const row = database.prepare("SELECT COUNT(*) AS n FROM chunks").get();
  return row.n;
}

export function loadVocabulary() {
  const database = getDb();
  const rows = database.prepare("SELECT term, idf FROM vocabulary").all();
  return new Map(rows.map((row) => [row.term, row.idf]));
}

export function search(queryText, topK = config.retrieval.topK) {
  const database = getDb();
  const idfMap = loadVocabulary();

  const queryTf = computeTermFrequency(tokenizeForVector(queryText));
  const queryVector = buildVector(queryTf, idfMap);

  const rows = database
    .prepare("SELECT source, chunk_index, content, vector FROM chunks")
    .all();

  const scored = rows.map((row) => ({
    source: row.source,
    chunkIndex: row.chunk_index,
    content: row.content,
    score: cosineSimilarity(queryVector, new Map(JSON.parse(row.vector))),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((result) => result.score > 0);
}
