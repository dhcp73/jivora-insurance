import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <div className="container-page prose-jivora max-w-3xl py-12">
          <p>We respect your privacy. This policy explains what we collect on the JivOra website and how we use it.</p>
          <h2>Data we collect
- Contact and quote forms: name, email, phone, message and product inputs you submit.
- Accounts: name, email, phone, hashed password, policies and documents you upload.
- Technical: standard server logs and session cookies required to keep you signed in.</h2>
          <h2>How we use data
- To respond to enquiries, prepare indicative estimates and send renewal reminders you request.
- To operate your customer dashboard and admin tooling.
- Emails may be delivered via configured SMTP or stored in an internal outbox when SMTP is not configured.</h2>
          <h2>Sharing
We do not sell personal data. We may share proposal details with IRDAI-registered insurers or their authorised platforms when you ask us to obtain quotations or place cover. Legal disclosures may be made if required by law.</h2>
          <h2>Retention & security
We retain data only as long as needed for service and compliance. Passwords are stored using a salted scrypt hash. Upload only documents you are comfortable sharing with an insurance advisor.</h2>
          <h2>Contact
Email jivora.insurance.solutions@gmail.com or WhatsApp +91 84603 27686 for privacy requests.</h2>
      </div>
    </>
  );
}
