export function DemoBanner() {
  const mode = process.env.NEXT_PUBLIC_STORAGE_MODE || process.env.STORAGE_MODE || "sqlite";
  if (mode !== "demo" && mode !== "memory" && mode !== "browser") return null;
  return (
    <div className="border-b border-amber-300/50 bg-amber-50 px-4 py-2 text-center text-xs text-amber-950 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100">
      Demo mode — data is ephemeral (in-memory on the server). Use local SQLite when running on your machine.
    </div>
  );
}
