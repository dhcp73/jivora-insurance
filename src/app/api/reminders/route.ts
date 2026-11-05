import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDb, now } from "@/lib/db";
import { newId } from "@/lib/ids";
import { daysUntil } from "@/lib/calculators";

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  const label = String(body.label || "").trim();
  const kind = String(body.kind || "policy");
  const expiry = String(body.expiry_date || "");
  const remindDays = Number(body.remind_days || 30);
  if (!email || !label || !expiry) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  try { daysUntil(expiry); } catch { return NextResponse.json({ error: "Invalid expiry date" }, { status: 400 }); }
  const session = await getSession();
  const id = newId("rem");
  getDb().prepare(
    `INSERT INTO reminders (id, user_id, email, label, kind, expiry_date, remind_days, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?)`,
  ).run(id, session?.user.id || null, email, label, kind, expiry, remindDays, now());
  return NextResponse.json({ ok: true, id, days_left: daysUntil(expiry) });
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = session.user.role === "admin"
    ? getDb().prepare("SELECT * FROM reminders ORDER BY expiry_date").all()
    : getDb().prepare("SELECT * FROM reminders WHERE user_id = ? OR email = ? ORDER BY expiry_date").all(session.user.id, session.user.email);
  return NextResponse.json({ reminders: rows });
}
