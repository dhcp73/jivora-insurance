import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { NcbCalculator } from "@/components/tools-client";

export const metadata: Metadata = { title: "NCB calculator" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Tools" title="NCB calculator" description="Apply an illustrative No Claim Bonus ladder to an OD premium." />
      <div className="container-page py-12">
        <NcbCalculator />
      </div>
    </>
  );
}
