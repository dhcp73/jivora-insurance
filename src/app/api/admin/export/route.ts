import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const table = searchParams.get("table") || "leads";
  const allowed = new Set(["leads", "quotes", "customers", "policies", "reminders", "outbox", "newsletter"]);
  if (!allowed.has(table)) return NextResponse.json({ error: "Unknown table" }, { status: 400 });
  const sql = table === "customers" ? "SELECT id, email, name, phone, role, created_at FROM users" : `SELECT * FROM ${table}`;
  const rows = getDb().prepare(sql).all() as Record<string, unknown>[];
  if (!rows.length) return new NextResponse("id\n", { headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename=${table}.csv` } });
  const keys = Object.keys(rows[0]!);
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n");
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename=${table}.csv` } });
}
