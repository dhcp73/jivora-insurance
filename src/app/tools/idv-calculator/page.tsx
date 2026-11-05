import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { IdvCalculator } from "@/components/tools-client";

export const metadata: Metadata = { title: "IDV calculator" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Tools" title="IDV calculator" description="Estimate Insured Declared Value from ex-showroom price and age." />
      <div className="container-page py-12">
        <IdvCalculator />
      </div>
    </>
  );
}
