import type { AnyDb } from "./db-types";
import { getMemoryDb, resetMemoryDb } from "./memory-db";

/** Used on Vercel/demo builds where native better-sqlite3 is unavailable. */
export function getSqliteDb(): AnyDb {
  return getMemoryDb() as unknown as AnyDb;
}

export function resetSqliteDb() {
  resetMemoryDb();
}
export function dataDirSqlite() {
  return "/tmp/jivora-data";
}
export function dbPathSqlite() {
  return ":memory:";
}
