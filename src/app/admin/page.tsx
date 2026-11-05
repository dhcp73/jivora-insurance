import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { PageHero } from "@/components/page-hero";
import { LogoutButton } from "@/components/logout-button";
import { AdminPanels } from "@/components/admin-panels";
import { isDemoMode } from "@/lib/mode";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/dashboard");
  const db = getDb();
  const stats = {
    leads: (db.prepare("SELECT COUNT(*) AS c FROM leads").get() as { c: number }).c,
    quotes: (db.prepare("SELECT COUNT(*) AS c FROM quotes").get() as { c: number }).c,
    customers: (db.prepare("SELECT COUNT(*) AS c FROM users WHERE role = 'customer'").get() as { c: number }).c,
    reminders: (db.prepare("SELECT COUNT(*) AS c FROM reminders WHERE status = 'active'").get() as { c: number }).c,
    outbox: (db.prepare("SELECT COUNT(*) AS c FROM outbox").get() as { c: number }).c,
  };
  const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 50").all();
  const quotes = db.prepare("SELECT * FROM quotes ORDER BY created_at DESC LIMIT 50").all();
  const customers = db.prepare("SELECT id, email, name, phone, role, created_at FROM users ORDER BY created_at DESC LIMIT 50").all();
  const policies = db.prepare("SELECT * FROM policies ORDER BY updated_at DESC LIMIT 50").all();
  const reminders = db.prepare("SELECT * FROM reminders ORDER BY expiry_date LIMIT 50").all();
  const outbox = db.prepare("SELECT * FROM outbox ORDER BY created_at DESC LIMIT 50").all();
  return (
    <>
      <PageHero eyebrow="Admin" title="Maintainer dashboard" description="Leads, quotes, customers, policies, reminders and email outbox." />
      {isDemoMode() ? (
        <div className="container-page pt-4">
          <div className="rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
            <strong>Demo mode:</strong> this deployment uses an ephemeral in-memory store (no persistent SQLite).
            Seeded accounts reset on cold starts. Configure SMTP and a durable database for production use.
          </div>
        </div>
      ) : null}
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
        <div className="flex flex-wrap gap-2 text-sm">
          {Object.entries(stats).map(([k, v]) => (
            <span key={k} className="rounded-full bg-navy-900 px-3 py-1 text-white dark:bg-orange-500">{k}: {v}</span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href="/api/admin/export?table=leads" className="btn-outline">Export leads CSV</Link>
          <LogoutButton />
        </div>
      </div>
      <div className="container-page pb-16">
        <AdminPanels
          leads={leads as never[]}
          quotes={quotes as never[]}
          customers={customers as never[]}
          policies={policies as never[]}
          reminders={reminders as never[]}
          outbox={outbox as never[]}
        />
      </div>
    </>
  );
}
