import type { AnyDb } from "./db-types";

export function getSqliteDb(): AnyDb {
  throw new Error("SQLite backend is not available in demo/Vercel builds.");
}

export function resetSqliteDb() {}
export function dataDirSqlite() { return "/tmp"; }
export function dbPathSqlite() { return ":memory:"; }
