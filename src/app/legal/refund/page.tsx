import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Refund & Cancellation" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Refund & Cancellation" />
      <div className="container-page prose-jivora max-w-3xl py-12">
          <h2>Premium refunds
Insurance premiums are paid to insurers (or their authorised collection channels). Refunds, free-look cancellations and mid-term cancellations follow the specific product wording and IRDAI rules applicable to that product.</h2>
          <h2>Our facilitation fees
If any separate advisory fee is ever charged (none by default on this demo site), cancellation terms will be stated in writing before payment.</h2>
          <h2>Website subscriptions
The customer account on this website is free. Newsletter unsubscribes can be requested by emailing us.</h2>
      </div>
    </>
  );
}
