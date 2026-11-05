import fs from "node:fs";
import path from "node:path";
import { isDemoMode } from "./mode";
import { getMemoryDb, resetMemoryDb } from "./memory-db";
import { getSqliteDb, resetSqliteDb } from "./db-sqlite";
import type { AnyDb } from "./db-types";

export type { AnyDb };

export function dataDir(): string {
  if (isDemoMode()) {
    const dir = path.join("/tmp", "jivora-data");
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      /* */
    }
    return dir;
  }
  const dir = process.env.JIVORA_DATA_DIR || path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function uploadsDir(): string {
  const dir = path.join(dataDir(), "uploads");
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {
    /* */
  }
  return dir;
}

export function dbPath(): string {
  if (isDemoMode()) return ":memory:";
  return process.env.JIVORA_DB || path.join(dataDir(), "jivora.db");
}

export function now(): string {
  return new Date().toISOString();
}

export function parseJson<T>(v: unknown, fallback: T): T {
  if (typeof v !== "string" || !v) return fallback;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

export function getDb(): AnyDb {
  if (isDemoMode()) {
    return getMemoryDb() as unknown as AnyDb;
  }
  return getSqliteDb();
}

export function resetDb() {
  if (isDemoMode()) {
    resetMemoryDb();
    return;
  }
  resetSqliteDb();
}
