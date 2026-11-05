import { NextResponse } from "next/server";
import { getDb, now } from "@/lib/db";
import { newId } from "@/lib/ids";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  const db = getDb();
  const existing = db.prepare("SELECT id FROM newsletter WHERE email = ?").get(email);
  if (!existing) {
    db.prepare("INSERT INTO newsletter (id, email, status, created_at) VALUES (?, ?, 'active', ?)").run(newId("news"), email, now());
  }
  await sendEmail({ to: email, subject: "Subscribed to JivOra insights", text: "Thanks for subscribing. You can unsubscribe anytime by emailing us.", meta: { type: "newsletter" } });
  return NextResponse.json({ ok: true });
}
