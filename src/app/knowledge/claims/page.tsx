import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ClaimForm } from "@/components/claim-form";

export const metadata: Metadata = { title: "Claim help" };

export default function ClaimsPage() {
  return (
    <>
      <PageHero eyebrow="Claims" title="Claim assistance" description="Insurers decide claims under policy terms. We help you intimate correctly, organise documents and follow up calmly." />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-2">
        <div className="prose-jivora">
          <h2>Quick checklist</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Intimate the insurer promptly via app/helpline/advisor channel.</li>
            <li>Photograph damage / hospital papers as applicable.</li>
            <li>Keep RC, policy, KYC, estimates and invoices ready.</li>
            <li>For theft or third-party injury, complete FIR formalities as required.</li>
          </ul>
          <p>Read our guide: <Link href="/knowledge/motor-claim-process" className="text-orange-600">Motor claim process</Link>.</p>
        </div>
        <div className="card p-6"><ClaimForm /></div>
      </div>
    </>
  );
}
