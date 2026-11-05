import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Terms of Use" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" />
      <div className="container-page prose-jivora max-w-3xl py-12">
          <p>By using this website you agree to these terms.</p>
          <h2>Nature of service
JivOra Insurance Solutions provides educational content, indicative calculators and facilitation services. We are not the insurer. Insurance contracts are underwritten by IRDAI-registered insurers.</h2>
          <h2>No binding quotes online
Calculator outputs and comparisons are indicative/illustrative unless expressly stated otherwise. They are not offers, warranties or final premiums.</h2>
          <h2>Accounts
You are responsible for safeguarding login credentials and for the accuracy of information you submit. Do not upload unlawful content.</h2>
          <h2>Acceptable use
Do not misuse the site, attempt unauthorised access, scrape aggressively, or impersonate government systems.</h2>
          <h2>Liability
To the fullest extent permitted by law, we are not liable for indirect losses arising from use of educational tools or third-party insurer decisions.</h2>
          <h2>Governing law
These terms are governed by the laws of India. Courts in Gujarat shall have jurisdiction, subject to mandatory law.</h2>
      </div>
    </>
  );
}
