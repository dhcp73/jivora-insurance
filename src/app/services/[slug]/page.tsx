import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { getService, services } from "@/content/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.title, description: s.summary };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  return (
    <>
      <PageHero eyebrow={s.category} title={s.title} description={s.hero} />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-3">
        <div className="prose-jivora lg:col-span-2">
          <ul className="mb-6 list-disc space-y-2 pl-5">
            {s.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {s.sections.map((sec) => (
            <div key={sec.heading}>
              <h2>{sec.heading}</h2>
              <p>{sec.body}</p>
            </div>
          ))}
        </div>
        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="font-semibold text-navy-900 dark:text-white">Request an indicative quote</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Start a multi-step estimate. Results are educational, not binding.</p>
            <Link href={`/quote?type=${s.quoteType}`} className="btn-primary mt-4 w-full">Start quote</Link>
            <a href={`https://wa.me/${site.whatsapp}`} className="btn-outline mt-2 w-full" target="_blank" rel="noreferrer">WhatsApp instead</a>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold">Related</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {s.related.map((r) => {
                const rel = getService(r);
                return rel ? (
                  <li key={r}><Link className="text-orange-600 hover:underline" href={`/services/${rel.slug}`}>{rel.title}</Link></li>
                ) : null;
              })}
            </ul>
          </div>
          {s.slug === "puc" || s.category === "Motor" ? (
            <div className="card p-5 text-sm">
              <p className="font-semibold">Official vehicle status</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Use Parivahan — we do not host government vehicle databases.</p>
              <a className="btn-secondary mt-3 w-full" href={site.parivahanUrl} target="_blank" rel="noreferrer">Open Parivahan</a>
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}
