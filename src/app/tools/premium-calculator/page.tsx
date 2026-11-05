import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PremiumCalculator } from "@/components/tools-client";

export const metadata: Metadata = { title: "Premium calculator" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Tools" title="Premium calculator" description="Indicative motor premiums using notified TP bands plus an OD x IDV model with NCB." />
      <div className="container-page py-12">
        <PremiumCalculator />
      </div>
    </>
  );
}
