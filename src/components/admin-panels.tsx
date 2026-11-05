"use client";

import { useState } from "react";

type Row = Record<string, unknown>;

function Table({ rows, cols }: { rows: Row[]; cols: string[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-navy-700">
            {cols.map((c) => <th key={c} className="px-2 py-2 font-semibold">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-slate-100 dark:border-navy-800">
              {cols.map((c) => <td key={c} className="max-w-[240px] truncate px-2 py-2">{String(r[c] ?? "")}</td>)}
            </tr>
          ))}
          {!rows.length && <tr><td className="py-4 text-slate-500" colSpan={cols.length}>Empty</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export function AdminPanels(props: {
  leads: Row[]; quotes: Row[]; customers: Row[]; policies: Row[]; reminders: Row[]; outbox: Row[];
}) {
  const tabs = ["leads", "quotes", "customers", "policies", "reminders", "outbox"] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]>("leads");
  const map = {
    leads: { rows: props.leads, cols: ["id", "type", "name", "email", "phone", "status", "created_at"] },
    quotes: { rows: props.quotes, cols: ["id", "product_type", "name", "email", "status", "created_at"] },
    customers: { rows: props.customers, cols: ["id", "name", "email", "phone", "role", "created_at"] },
    policies: { rows: props.policies, cols: ["id", "user_id", "product_type", "insurer", "policy_number", "end_date"] },
    reminders: { rows: props.reminders, cols: ["id", "label", "kind", "email", "expiry_date", "status"] },
    outbox: { rows: props.outbox, cols: ["id", "to_addr", "subject", "status", "created_at", "sent_at"] },
  } as const;
  const current = map[tab];
  return (
    <div className="card p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t} type="button" className={tab === t ? "btn-primary" : "btn-ghost"} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
        <a className="btn-outline ml-auto" href={`/api/admin/export?table=${tab === "customers" ? "customers" : tab}`}>CSV</a>
      </div>
      <Table rows={current.rows} cols={[...current.cols]} />
    </div>
  );
}
