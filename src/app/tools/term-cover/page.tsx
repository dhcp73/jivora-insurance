import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TermCoverCalculator } from "@/components/tools-client";

export const metadata: Metadata = { title: "Term cover calculator" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Tools" title="Term cover calculator" description="Income-multiple cover sizing with an indicative term premium." />
      <div className="container-page py-12">
        <TermCoverCalculator />
      </div>
    </>
  );
}
