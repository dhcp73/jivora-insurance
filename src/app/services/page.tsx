import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { services } from "@/content/services";

export const metadata: Metadata = { title: "Services" };

export default function ServicesIndex() {
  const groups = [...new Set(services.map((s) => s.category))];
  return (
    <>
      <PageHero eyebrow="Services" title="All insurance & compliance services" description="Explore motor, health, life, general and PUC assistance pages — each with plain-English guidance and a path to request an indicative quote." />
      <div className="container-page space-y-10 py-12">
        {groups.map((g) => (
          <div key={g}>
            <h2 className="mb-4 text-xl font-bold text-navy-900 dark:text-white">{g}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.filter((s) => s.category === g).map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="card p-5 hover:shadow-md">
                  <h3 className="font-semibold text-navy-900 dark:text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{s.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
