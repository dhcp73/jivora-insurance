import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Disclaimer" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Disclaimer" />
      <div className="container-page prose-jivora max-w-3xl py-12">
          <p>Insurance is the subject matter of solicitation.</p>
          <h2>Intermediary disclosure
JivOra assists customers in understanding and obtaining insurance products. IRDAI registration: [to be added]. Appointed insurer list: [to be confirmed].</h2>
          <h2>Government systems
This website is not affiliated with MoRTH, RTO, Vahan or Parivahan. We do not reproduce official “archive” notices. For vehicle status, use https://parivahan.gov.in.</h2>
          <h2>Accuracy
Premium tables and legal summaries can change by notification. Verify critical figures against official gazettes and insurer prospectuses before purchase.</h2>
      </div>
    </>
  );
}
