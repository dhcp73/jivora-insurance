
/** Stub so Vercel builds never load the native better-sqlite3 addon. */
export default function BetterSqlite3Stub() {
  throw new Error("better-sqlite3 is unavailable in demo/Vercel mode. Set STORAGE_MODE=sqlite only on Node hosts with the native module.");
}
