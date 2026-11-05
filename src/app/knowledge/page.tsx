import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { articles } from "@/content/articles";

export const metadata: Metadata = { title: "Knowledge centre" };

export default function KnowledgePage() {
  return (
    <>
      <PageHero eyebrow="Knowledge" title="Guides written for clarity" description="Original explainers on NCB, PUC, claims, health buying and renewal habits — no copied scare notices." />
      <div className="container-page py-10">
        <div className="mb-8 flex flex-wrap gap-3 text-sm">
          <Link href="/knowledge/faq" className="btn-outline">FAQs</Link>
          <Link href="/knowledge/glossary" className="btn-outline">Glossary</Link>
          <Link href="/knowledge/claims" className="btn-outline">Claim help</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((a) => (
            <Link key={a.slug} href={`/knowledge/${a.slug}`} className="card p-5 hover:shadow-md">
              <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wide text-orange-600">{a.category}</span>
                <span>{a.readMinutes} min · {a.date}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold text-navy-900 dark:text-white">{a.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
