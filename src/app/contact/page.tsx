import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We are a message away"
        description="WhatsApp is usually fastest. Use the form for detailed requests — we also email a copy to our inbox / outbox."
      />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <p><span className="font-semibold text-navy-900 dark:text-white">Phone / WhatsApp:</span>{" "}
            <a className="text-orange-600" href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a>
          </p>
          <p><span className="font-semibold text-navy-900 dark:text-white">Email:</span>{" "}
            <a className="text-orange-600" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p><span className="font-semibold text-navy-900 dark:text-white">Region:</span> {site.region}</p>
          <p><span className="font-semibold text-navy-900 dark:text-white">Address:</span> {site.addressPlaceholder}</p>
          <p className="text-xs text-slate-500">{site.legalDisclaimer}</p>
          <a className="btn-primary inline-flex" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
            Open WhatsApp
          </a>
        </div>
        <div className="card p-6">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
