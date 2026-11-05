import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = { title: "FAQs" };

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow="FAQ" title="Frequently asked questions" />
      <div className="container-page max-w-3xl space-y-4 py-12">
        {faqs.map((f) => (
          <details key={f.id} className="card group p-5">
            <summary className="cursor-pointer list-none font-semibold text-navy-900 dark:text-white">
              <span className="mr-2 text-xs font-medium uppercase text-orange-600">{f.category}</span>
              {f.question}
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{f.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}
