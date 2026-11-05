"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AnyRow = Record<string, unknown>;

export function DashboardClient({
  quotes, policies, reminders, documents,
}: {
  quotes: AnyRow[]; policies: AnyRow[]; reminders: AnyRow[]; documents: AnyRow[];
}) {
  const router = useRouter();
  const [msg, setMsg] = useState("");

  async function addPolicy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/policies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd.entries())),
    });
    setMsg(res.ok ? "Policy saved" : "Failed to save policy");
    if (res.ok) { e.currentTarget.reset(); router.refresh(); }
  }

  async function uploadDoc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/documents", { method: "POST", body: fd });
    setMsg(res.ok ? "Document uploaded" : "Upload failed");
    if (res.ok) { e.currentTarget.reset(); router.refresh(); }
  }

  return (
    <div className="space-y-10">
      {msg && <p className="text-sm text-orange-600">{msg}</p>}
      <section className="card p-5">
        <h2 className="text-lg font-bold text-navy-900 dark:text-white">My quotes</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b"><th className="py-2">ID</th><th>Type</th><th>Estimate</th><th>Date</th></tr></thead>
            <tbody>
              {quotes.map((q) => {
                let summary = "";
                try { summary = JSON.parse(String(q.estimate || "{}")).summary || ""; } catch { /* */ }
                return (
                  <tr key={String(q.id)} className="border-b border-slate-100 dark:border-navy-800">
                    <td className="py-2 font-mono text-xs">{String(q.id)}</td>
                    <td>{String(q.product_type)}</td>
                    <td>{summary}</td>
                    <td>{String(q.created_at).slice(0, 10)}</td>
                  </tr>
                );
              })}
              {!quotes.length && <tr><td colSpan={4} className="py-4 text-slate-500">No quotes yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-lg font-bold">My policies</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {policies.map((p) => (
              <li key={String(p.id)} className="rounded-xl bg-cream p-3 dark:bg-navy-800">
                <p className="font-semibold">{String(p.product_type)} · {String(p.insurer || "Insurer TBD")}</p>
                <p className="text-slate-600 dark:text-slate-300">{String(p.policy_number || "—")} · ends {String(p.end_date || "—")}</p>
              </li>
            ))}
            {!policies.length && <li className="text-slate-500">No policies saved.</li>}
          </ul>
          <form onSubmit={addPolicy} className="mt-4 grid gap-2">
            <input className="input" name="product_type" placeholder="Product type" required />
            <input className="input" name="insurer" placeholder="Insurer" />
            <input className="input" name="policy_number" placeholder="Policy number" />
            <input className="input" name="vehicle_or_subject" placeholder="Vehicle / subject" />
            <input className="input" name="end_date" type="date" />
            <button className="btn-secondary" type="submit">Add policy</button>
          </form>
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-bold">Reminders</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {reminders.map((r) => (
              <li key={String(r.id)} className="rounded-xl border border-slate-200 p-3 dark:border-navy-700">
                {String(r.label)} · {String(r.expiry_date)} ({String(r.kind)})
              </li>
            ))}
            {!reminders.length && <li className="text-slate-500">None yet. Use Tools → Renewal reminder.</li>}
          </ul>
          <h2 className="mt-6 text-lg font-bold">Documents</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {documents.map((d) => (
              <li key={String(d.id)}>{String(d.filename)} · {(Number(d.size)/1024).toFixed(1)} KB</li>
            ))}
            {!documents.length && <li className="text-slate-500">No uploads.</li>}
          </ul>
          <form onSubmit={uploadDoc} className="mt-3 space-y-2">
            <input className="input" type="file" name="file" required />
            <button className="btn-outline" type="submit">Upload document</button>
          </form>
        </div>
      </section>
    </div>
  );
}
