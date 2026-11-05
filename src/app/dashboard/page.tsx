import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { PageHero } from "@/components/page-hero";
import { DashboardClient } from "@/components/dashboard-client";
import { LogoutButton } from "@/components/logout-button";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role === "admin") redirect("/admin");
  const db = getDb();
  const quotes = db.prepare("SELECT * FROM quotes WHERE user_id = ? OR email = ? ORDER BY created_at DESC LIMIT 20").all(session.user.id, session.user.email);
  const policies = db.prepare("SELECT * FROM policies WHERE user_id = ? ORDER BY updated_at DESC").all(session.user.id);
  const reminders = db.prepare("SELECT * FROM reminders WHERE user_id = ? OR email = ? ORDER BY expiry_date").all(session.user.id, session.user.email);
  const documents = db.prepare("SELECT id, filename, mime, size, created_at FROM documents WHERE user_id = ? ORDER BY created_at DESC").all(session.user.id);
  return (
    <>
      <PageHero eyebrow="Customer dashboard" title={`Hello, ${session.user.name}`} description="Manage quotes, policies, renewal reminders and documents." />
      <div className="container-page flex justify-end gap-2 py-4">
        <Link href="/quote" className="btn-primary">New quote</Link>
        <LogoutButton />
      </div>
      <div className="container-page pb-16">
        <DashboardClient
          quotes={quotes as never[]}
          policies={policies as never[]}
          reminders={reminders as never[]}
          documents={documents as never[]}
        />
      </div>
    </>
  );
}
