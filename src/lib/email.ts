import nodemailer from "nodemailer";
import { getDb, now, parseJson } from "./db";
import { newId } from "./ids";
import { site } from "./site";

export interface OutboxRow {
  id: string;
  to_addr: string;
  subject: string;
  body: string;
  html: string;
  status: string;
  error: string;
  meta: string;
  created_at: string;
  sent_at: string | null;
}

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);
}

function transporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  meta?: Record<string, unknown>;
}): Promise<{ id: string; status: string }> {
  const id = newId("mail");
  const db = getDb();
  db.prepare(
    `INSERT INTO outbox (id, to_addr, subject, body, html, status, error, meta, created_at)
     VALUES (?, ?, ?, ?, ?, 'queued', '', ?, ?)`,
  ).run(
    id,
    input.to,
    input.subject,
    input.text,
    input.html || "",
    JSON.stringify(input.meta || {}),
    now(),
  );

  if (!smtpConfigured()) {
    db.prepare("UPDATE outbox SET status = 'logged', sent_at = ? WHERE id = ?").run(now(), id);
    return { id, status: "logged" };
  }

  try {
    await transporter().sendMail({
      from: process.env.SMTP_FROM || `JivOra Insurance <noreply@jivora.local>`,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html || undefined,
    });
    db.prepare("UPDATE outbox SET status = 'sent', sent_at = ? WHERE id = ?").run(now(), id);
    return { id, status: "sent" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    db.prepare("UPDATE outbox SET status = 'error', error = ? WHERE id = ?").run(message, id);
    return { id, status: "error" };
  }
}

export function listOutbox(limit = 100): OutboxRow[] {
  return getDb()
    .prepare("SELECT * FROM outbox ORDER BY created_at DESC LIMIT ?")
    .all(limit) as OutboxRow[];
}

export async function sendQuoteConfirmation(opts: {
  to: string;
  name: string;
  productType: string;
  estimateSummary: string;
  quoteId: string;
}) {
  const subject = `Your indicative ${opts.productType} estimate — JivOra`;
  const text = [
    `Hi ${opts.name},`,
    ``,
    `Thank you for requesting an insurance estimate from ${site.name}.`,
    ``,
    `Product: ${opts.productType}`,
    `Reference: ${opts.quoteId}`,
    ``,
    opts.estimateSummary,
    ``,
    `This is an indicative estimate only — not a binding quotation. An advisor will follow up to refine options with licensed insurers.`,
    ``,
    `WhatsApp: ${site.phoneDisplay}`,
    `Email: ${site.email}`,
    ``,
    site.legalDisclaimer,
  ].join("\n");
  return sendEmail({
    to: opts.to,
    subject,
    text,
    meta: { type: "quote", quoteId: opts.quoteId },
  });
}

export async function sendRenewalReminder(opts: {
  to: string;
  label: string;
  expiryDate: string;
  daysLeft: number;
}) {
  const subject = `Reminder: ${opts.label} expires on ${opts.expiryDate}`;
  const text = [
    `This is a friendly reminder from ${site.name}.`,
    ``,
    `Item: ${opts.label}`,
    `Expiry date: ${opts.expiryDate}`,
    `Days remaining (as of send): ${opts.daysLeft}`,
    ``,
    `Keeping motor insurance valid is a legal requirement under the Motor Vehicles Act, 1988 (sections 146 and 196). For vehicle registration or PUC status, use the official Parivahan portal: ${site.parivahanUrl}`,
    ``,
    `Reply to this email or WhatsApp ${site.phoneDisplay} if you would like help reviewing renewal options.`,
    ``,
    site.legalDisclaimer,
  ].join("\n");
  return sendEmail({
    to: opts.to,
    subject,
    text,
    meta: { type: "renewal", label: opts.label, expiryDate: opts.expiryDate },
  });
}

export async function sendContactNotification(opts: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const subject = `New contact message from ${opts.name}`;
  const text = `Name: ${opts.name}\nEmail: ${opts.email}\nPhone: ${opts.phone || "—"}\n\n${opts.message}`;
  return sendEmail({
    to: site.email,
    subject,
    text,
    meta: { type: "contact", from: opts.email },
  });
}

export function getOutboxMeta(row: OutboxRow): Record<string, unknown> {
  return parseJson(row.meta, {});
}
