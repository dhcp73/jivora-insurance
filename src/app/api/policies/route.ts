import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDb, now } from "@/lib/db";
import { newId } from "@/lib/ids";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = session.user.role === "admin"
    ? getDb().prepare("SELECT * FROM policies ORDER BY updated_at DESC").all()
    : getDb().prepare("SELECT * FROM policies WHERE user_id = ? ORDER BY updated_at DESC").all(session.user.id);
  return NextResponse.json({ policies: rows });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const id = newId("pol");
  const ts = now();
  getDb().prepare(
    `INSERT INTO policies (id, user_id, product_type, insurer, policy_number, vehicle_or_subject, sum_insured, premium, start_date, end_date, notes, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    session.user.id,
    String(body.product_type || "motor"),
    String(body.insurer || ""),
    String(body.policy_number || ""),
    String(body.vehicle_or_subject || ""),
    body.sum_insured != null ? Number(body.sum_insured) : null,
    body.premium != null ? Number(body.premium) : null,
    body.start_date || null,
    body.end_date || null,
    String(body.notes || ""),
    ts,
    ts,
  );
  return NextResponse.json({ ok: true, id });
}
