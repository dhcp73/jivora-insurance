import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { getSession } from "@/lib/auth";
import { getDb, now, uploadsDir } from "@/lib/db";
import { isDemoMode } from "@/lib/mode";
import { newId } from "@/lib/ids";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = getDb().prepare("SELECT id, filename, mime, size, policy_id, created_at FROM documents WHERE user_id = ? ORDER BY created_at DESC").all(session.user.id);
  return NextResponse.json({ documents: rows });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "file required" }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Max 5MB" }, { status: 400 });
  const id = newId("doc");
  const stored = `${id}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  if (!isDemoMode()) {
    const buf = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(uploadsDir(), stored), buf);
  }
  getDb().prepare(
    `INSERT INTO documents (id, user_id, policy_id, filename, stored_name, mime, size, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(id, session.user.id, form.get("policy_id") || null, file.name, stored, file.type || "application/octet-stream", file.size, now());
  return NextResponse.json({ ok: true, id });
}
