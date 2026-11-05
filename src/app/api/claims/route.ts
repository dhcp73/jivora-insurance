import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDb, now } from "@/lib/db";
import { newId } from "@/lib/ids";
import { sendEmail } from "@/lib/email";
import { site } from "@/lib/site";

export async function POST(req: Request) {
  const body = await req.json();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  const policyNumber = String(body.policy_number || "").trim();
  const details = String(body.details || "").trim();
  if (!name || !email || !details) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const session = await getSession();
  const id = newId("clm");
  getDb().prepare(
    `INSERT INTO claim_requests (id, user_id, name, email, phone, policy_number, details, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
  ).run(id, session?.user.id || null, name, email, phone, policyNumber, details, now());
  await sendEmail({
    to: site.email,
    subject: `Claim assistance request from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPolicy: ${policyNumber}\n\n${details}`,
    meta: { type: "claim", id },
  });
  return NextResponse.json({ ok: true, id });
}
