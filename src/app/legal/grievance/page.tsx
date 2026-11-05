import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Grievance Redressal" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Grievance Redressal" />
      <div className="container-page prose-jivora max-w-3xl py-12">
          <h2>How to raise a concern
1. Contact us on WhatsApp/phone +91 84603 27686 or email jivora.insurance.solutions@gmail.com with your policy number and details.
2. We aim to acknowledge within 3 working days and resolve or escalate promptly.
3. If your grievance concerns an insurer decision, you may also use that insurer’s grievance channel and the IRDAI Bima Bharosa / IGMS portals as applicable.</h2>
          <h2>Grievance officer (placeholder)
Name: [to be added]
Email: jivora.insurance.solutions@gmail.com
Phone: +91 84603 27686</h2>
      </div>
    </>
  );
}
