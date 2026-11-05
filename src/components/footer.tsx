import Link from "next/link";
import { Logo } from "./logo";
import { nav, site } from "@/lib/site";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-navy-800 dark:bg-navy-950">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{site.tagline}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{site.region}</p>
          <p className="text-xs leading-5 text-slate-500">{site.legalDisclaimer}</p>
          <div className="pt-2"><NewsletterForm /></div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-navy-900 dark:text-white">Services</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {nav.services.slice(0, 8).map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="hover:text-orange-600">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-navy-900 dark:text-white">Tools & info</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {nav.tools.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="hover:text-orange-600">
                  {t.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/knowledge" className="hover:text-orange-600">
                Knowledge centre
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-orange-600">
                Comparisons
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-navy-900 dark:text-white">Contact</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <a href={`tel:+91${site.phone}`} className="hover:text-orange-600">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-orange-600">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} className="hover:text-orange-600" target="_blank" rel="noreferrer">
                WhatsApp chat
              </a>
            </li>
            <li className="pt-2 text-xs">IRDAI: {site.irdaiPlaceholder}</li>
            <li className="text-xs">{site.addressPlaceholder}</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {nav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-slate-500 hover:text-orange-600">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500 dark:border-navy-800">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
