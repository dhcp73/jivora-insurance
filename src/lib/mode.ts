/** Demo/memory mode for Vercel (no persistent SQLite / no native better-sqlite3). */
export function isDemoMode(): boolean {
  const mode = (process.env.STORAGE_MODE || "").toLowerCase();
  if (mode === "sqlite" || mode === "local") return false;
  if (mode === "demo" || mode === "memory" || mode === "browser") return true;
  return process.env.VERCEL === "1" || process.env.VERCEL_ENV != null;
}

export function storageModeLabel(): "demo" | "sqlite" {
  return isDemoMode() ? "demo" : "sqlite";
}
