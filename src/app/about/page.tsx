import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About JivOra"
        title="One partner. Every protection."
        description="We are a Gujarat-focused insurance solutions practice helping people make calmer, better-informed decisions on motor, health, life and general cover."
      />
      <div className="container-page prose-jivora py-12">
        <p>
          <strong>{site.name}</strong> exists to make insurance understandable. Our public materials emphasise
          education, indicative tools and renewal hygiene — not fear-based notices that look like government orders.
        </p>
        <h2>Where we focus</h2>
        <p>
          We primarily support customers connected to the Sabarkantha / Himmatnagar region (vehicle series GJ09) and
          across Gujarat, with WhatsApp-first service on {site.phoneDisplay}.
        </p>
        <h2>How we work</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Explain cover types and exclusions in plain English (and Gujarati on calls when preferred).</li>
          <li>Provide indicative calculators clearly labelled as non-binding.</li>
          <li>Help with documentation for proposals, renewals and claims coordination.</li>
          <li>Point vehicle owners to official Parivahan / RTO channels for registration status.</li>
        </ul>
        <h2>Regulatory note</h2>
        <p>
          Insurance is the subject matter of solicitation. Policies are underwritten by IRDAI-registered insurers.
          Our IRDAI registration details: <strong>{site.irdaiPlaceholder}</strong>. Legal entity / GST details will be
          published when confirmed. Address: {site.addressPlaceholder}.
        </p>
        <h2>What we will not do</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Impersonate MoRTH, RTO, Vahan or Parivahan.</li>
          <li>Publish unverifiable claim statistics or fake reviews.</li>
          <li>Present calculator output as a final insurer quotation.</li>
        </ul>
        <p className="pt-4">
          <Link href="/contact" className="btn-primary">Talk to us</Link>
        </p>
      </div>
    </>
  );
}
