import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { glossary } from "@/content/glossary";

export const metadata: Metadata = { title: "Glossary" };

export default function GlossaryPage() {
  return (
    <>
      <PageHero eyebrow="Glossary" title="Insurance terms in plain English" />
      <div className="container-page grid gap-4 py-12 sm:grid-cols-2">
        {glossary.map((g) => (
          <div key={g.term} className="card p-5">
            <h2 className="font-semibold text-navy-900 dark:text-white">{g.term}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{g.definition}</p>
          </div>
        ))}
      </div>
    </>
  );
}
