import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { comparisons } from "@/content/comparisons";

export const metadata: Metadata = { title: "Compare" };

export default function ComparePage() {
  return (
    <>
      <PageHero eyebrow="Compare" title="Side-by-side cover comparisons" description="Educational tables to understand structures. Rows marked illustrative are not live insurer quotations." />
      <div className="container-page space-y-12 py-12">
        {comparisons.map((c) => (
          <section key={c.id} className="card overflow-x-auto p-5">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">{c.title}</h2>
              {c.illustrative && <span className="badge">Illustrative</span>}
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{c.subtitle}</p>
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-navy-700">
                  {c.columns.map((col) => (
                    <th key={col.key} className="px-3 py-2 font-semibold text-navy-900 dark:text-white">{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-100 dark:border-navy-800">
                    {c.columns.map((col) => (
                      <td key={col.key} className="px-3 py-2.5 text-slate-700 dark:text-slate-300">
                        {col.key === "feature" ? row.feature : row.values[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {c.id === "insurer-features" && (
              <p className="mt-3 text-xs text-slate-500">* Insurer A/B/C are placeholders until JivOra confirms appointed insurer list.</p>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
