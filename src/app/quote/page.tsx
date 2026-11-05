import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { QuoteWizard } from "@/components/quote-wizard";

export const metadata: Metadata = { title: "Get a quote" };

export default function QuotePage() {
  return (
    <>
      <PageHero eyebrow="Quotes" title="Indicative insurance estimate" description="Multi-step form with transparent formulas. Results are educational — not binding insurer quotations." />
      <div className="container-page max-w-3xl py-12">
        <Suspense fallback={<div className="card p-6">Loading…</div>}>
          <QuoteWizard />
        </Suspense>
      </div>
    </>
  );
}
