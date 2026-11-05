import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDb, now } from "@/lib/db";
import { newId } from "@/lib/ids";
import { sendQuoteConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.json();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  const productType = String(body.product_type || "").trim();
  if (!name || !email || !productType) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const session = await getSession();
  const id = newId("qt");
  const estimate = body.estimate || {};
  const inputs = body.inputs || {};
  getDb().prepare(
    `INSERT INTO quotes (id, user_id, product_type, inputs, estimate, name, email, phone, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
  ).run(id, session?.user.id || null, productType, JSON.stringify(inputs), JSON.stringify(estimate), name, email, phone, now());
  getDb().prepare(
    `INSERT INTO leads (id, type, name, email, phone, message, payload, status, user_id, created_at)
     VALUES (?, 'quote', ?, ?, ?, ?, ?, 'new', ?, ?)`,
  ).run(newId("lead"), name, email, phone, `Quote request: ${productType}`, JSON.stringify({ quoteId: id, inputs, estimate }), session?.user.id || null, now());
  await sendQuoteConfirmation({
    to: email,
    name,
    productType,
    estimateSummary: String(estimate.summary || "See dashboard for details"),
    quoteId: id,
  });
  return NextResponse.json({ ok: true, id });
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = session.user.role === "admin"
    ? getDb().prepare("SELECT * FROM quotes ORDER BY created_at DESC LIMIT 200").all()
    : getDb().prepare("SELECT * FROM quotes WHERE user_id = ? OR email = ? ORDER BY created_at DESC").all(session.user.id, session.user.email);
  return NextResponse.json({ quotes: rows });
}
