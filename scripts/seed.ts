import { createUser, hashPassword } from "../src/lib/auth";
import { getDb, now, resetDb } from "../src/lib/db";
import { newId } from "../src/lib/ids";
import { faqs } from "../src/content/faqs";

function ensureUser(email: string, name: string, password: string, role: "admin" | "customer") {
  const db = getDb();
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email) as { id: string } | undefined;
  if (existing) {
    db.prepare("UPDATE users SET password_hash = ?, role = ?, name = ? WHERE id = ?").run(
      hashPassword(password),
      role,
      name,
      existing.id,
    );
    return existing.id;
  }
  return createUser({ email, name, password, role }).userId;
}

function main() {
  resetDb();
  const db = getDb();
  const adminId = ensureUser("admin@jivora.local", "JivOra Admin", "admin1234", "admin");
  const demoId = ensureUser("demo@jivora.local", "Demo Customer", "demo1234", "customer");

  // Seed FAQs into DB for admin content surface
  db.prepare("DELETE FROM faqs").run();
  const insertFaq = db.prepare(
    "INSERT INTO faqs (id, category, question, answer, sort_order) VALUES (?, ?, ?, ?, ?)",
  );
  faqs.forEach((f, i) => insertFaq.run(f.id, f.category, f.question, f.answer, i));

  const ts = now();
  db.prepare(
    `INSERT INTO policies (id, user_id, product_type, insurer, policy_number, vehicle_or_subject, sum_insured, premium, start_date, end_date, notes, created_at, updated_at)
     VALUES (?, ?, 'motor-car', 'Illustrative Insurer', 'DEMO/MOT/2026/001', 'GJ09 Demo Car', 450000, 12500, '2026-01-01', '2027-01-01', 'Seed policy', ?, ?)`,
  ).run(newId("pol"), demoId, ts, ts);

  db.prepare(
    `INSERT INTO reminders (id, user_id, email, label, kind, expiry_date, remind_days, status, created_at)
     VALUES (?, ?, 'demo@jivora.local', 'Demo car policy', 'policy', '2027-01-01', 45, 'active', ?)`,
  ).run(newId("rem"), demoId, ts);

  db.prepare(
    `INSERT INTO quotes (id, user_id, product_type, inputs, estimate, name, email, phone, status, created_at)
     VALUES (?, ?, 'motor-car', '{}', ?, 'Demo Customer', 'demo@jivora.local', '8460327686', 'new', ?)`,
  ).run(
    newId("qt"),
    demoId,
    JSON.stringify({ summary: "Indicative total incl. GST: ₹14,200" }),
    ts,
  );

  db.prepare(
    `INSERT INTO leads (id, type, name, email, phone, message, payload, status, user_id, created_at)
     VALUES (?, 'contact', 'Walk-in Lead', 'lead@example.com', '9999999999', 'Need bike renewal help', '{}', 'new', NULL, ?)`,
  ).run(newId("lead"), ts);

  db.prepare(
    "INSERT OR REPLACE INTO settings (key, value) VALUES ('brand_notice', ?)",
  ).run("IRDAI registration: [to be added]");

  console.log("Seeded admin@jivora.local / admin1234 and demo@jivora.local / demo1234");
  console.log("adminId", adminId, "demoId", demoId);
}

main();
