import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { HealthCoverCalculator } from "@/components/tools-client";

export const metadata: Metadata = { title: "Health cover calculator" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Tools" title="Health cover calculator" description="Rule-of-thumb sum insured and indicative health premium model." />
      <div className="container-page py-12">
        <HealthCoverCalculator />
      </div>
    </>
  );
}
