import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { nav, site } from "@/lib/site";

export const metadata: Metadata = { title: "Tools" };

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        title="Calculators & checkers"
        description="Transparent formulas, labelled indicative. For official vehicle status use Parivahan — we only link out."
      />
      <div className="container-page grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {nav.tools.map((t) => (
          <Link key={t.href} href={t.href} className="card p-5 hover:shadow-md">
            <h2 className="font-semibold text-navy-900 dark:text-white">{t.label}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Open tool →</p>
          </Link>
        ))}
        <a href={site.parivahanUrl} target="_blank" rel="noreferrer" className="card p-5 hover:shadow-md">
          <h2 className="font-semibold text-navy-900 dark:text-white">Parivahan vehicle status</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Official external link →</p>
        </a>
      </div>
    </>
  );
}
