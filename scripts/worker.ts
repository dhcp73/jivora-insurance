import { daysUntil } from "../src/lib/calculators";
import { getDb, now } from "../src/lib/db";
import { sendRenewalReminder } from "../src/lib/email";

async function processReminders() {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM reminders WHERE status = 'active'")
    .all() as {
      id: string;
      email: string;
      label: string;
      expiry_date: string;
      remind_days: number;
      last_sent_at: string | null;
    }[];

  for (const r of rows) {
    let days: number;
    try {
      days = daysUntil(r.expiry_date);
    } catch {
      continue;
    }
    if (days > r.remind_days) continue;
    // avoid resending same day
    if (r.last_sent_at && r.last_sent_at.slice(0, 10) === now().slice(0, 10)) continue;
    await sendRenewalReminder({
      to: r.email,
      label: r.label,
      expiryDate: r.expiry_date,
      daysLeft: days,
    });
    db.prepare("UPDATE reminders SET last_sent_at = ? WHERE id = ?").run(now(), r.id);
    console.log("Reminder sent for", r.id, "daysLeft", days);
  }
}

async function main() {
  console.log("JivOra worker starting", new Date().toISOString());
  await processReminders();
  if (process.argv.includes("--once")) {
    console.log("Done (--once)");
    return;
  }
  setInterval(() => {
    processReminders().catch((e) => console.error(e));
  }, 60_000);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
