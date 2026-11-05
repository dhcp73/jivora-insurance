import { NextResponse } from "next/server";
import { getDb, now } from "@/lib/db";
import { newId } from "@/lib/ids";
import { sendContactNotification } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.json();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  const message = String(body.message || "").trim();
  if (!name || !email || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const id = newId("lead");
  getDb().prepare(
    `INSERT INTO leads (id, type, name, email, phone, message, payload, status, created_at)
     VALUES (?, 'contact', ?, ?, ?, ?, '{}', 'new', ?)`,
  ).run(id, name, email, phone, message, now());
  await sendContactNotification({ name, email, phone, message });
  return NextResponse.json({ ok: true, id });
}
