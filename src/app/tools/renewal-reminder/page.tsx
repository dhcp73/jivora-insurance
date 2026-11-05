import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { RenewalReminderTool } from "@/components/tools-client";

export const metadata: Metadata = { title: "Renewal reminder" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Tools" title="Renewal reminder" description="Check days left and schedule an email reminder for policy or PUC expiry." />
      <div className="container-page py-12">
        <RenewalReminderTool />
      </div>
    </>
  );
}
