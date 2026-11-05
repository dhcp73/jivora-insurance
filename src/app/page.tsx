import Link from "next/link";
import {
  Shield,
  HeartPulse,
  Car,
  Home,
  Calculator,
  RefreshCw,
  Scale,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { site, nav } from "@/lib/site";
import { articles } from "@/content/articles";

const pillars = [
  {
    icon: Car,
    title: "Motor",
    text: "Cars, bikes and commercial vehicles — TP, comprehensive, IDV and NCB guidance.",
    href: "/services/motor-car",
  },
  {
    icon: HeartPulse,
    title: "Health",
    text: "Individual, family floater and senior plans with claim-document help.",
    href: "/services/health",
  },
  {
    icon: Shield,
    title: "Life",
    text: "Term-first protection, then clear talk on savings and ULIP suitability.",
    href: "/services/term-life",
  },
  {
    icon: Home,
    title: "General",
    text: "Home, travel, shop and business covers sized to real risks.",
    href: "/services/home",
  },
];

const tools = [
  { href: "/tools/premium-calculator", title: "Premium calculator", desc: "Indicative motor estimates from notified TP bands + OD model." },
  { href: "/tools/renewal-reminder", title: "Renewal reminder", desc: "Track policy and PUC expiry dates; email yourself in advance." },
  { href: "/compare", title: "Compare covers", desc: "Side-by-side educational tables for plan types and features." },
  { href: "/tools/idv-calculator", title: "IDV calculator", desc: "Age-based depreciation estimate for educational IDV." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-300">
              {site.tagline}
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Clear insurance guidance for Gujarat families & businesses
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              JivOra helps you understand motor, health, life and general cover — with honest calculators,
              renewal reminders and WhatsApp-first support. No fake government notices. No scare copy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary">
                Get an indicative quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn bg-white text-navy-900 hover:bg-orange-50"
              >
                Chat on WhatsApp
              </a>
            </div>
            <ul className="mt-8 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
              {[
                "Indicative premiums clearly labelled",
                "Official Parivahan links for vehicle status",
                "Knowledge centre in plain English",
                "Customer dashboard for policies & reminders",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card grid gap-4 bg-white/95 p-6 text-navy-900 shadow-2xl dark:bg-navy-900 dark:text-white">
            <p className="text-sm font-semibold text-orange-600">Serving {site.region}</p>
            <h2 className="text-2xl font-bold">Renew on facts, not fear</h2>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Driving without valid third-party insurance is an offence under the Motor Vehicles Act, 1988
              (sections 146 and 196). Keep insurance and PUC current, and verify vehicle status only on{" "}
              <a className="font-medium text-orange-600 underline" href={site.parivahanUrl} target="_blank" rel="noreferrer">
                Parivahan
              </a>
              .
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/tools/renewal-reminder" className="rounded-xl bg-cream p-4 dark:bg-navy-800">
                <RefreshCw className="mb-2 h-5 w-5 text-orange-500" />
                <p className="font-semibold">Set a reminder</p>
                <p className="text-xs text-slate-500">Policy or PUC expiry</p>
              </Link>
              <Link href="/services/puc" className="rounded-xl bg-cream p-4 dark:bg-navy-800">
                <Scale className="mb-2 h-5 w-5 text-orange-500" />
                <p className="font-semibold">PUC guidance</p>
                <p className="text-xs text-slate-500">Authorised centres only</p>
              </Link>
            </div>
            <p className="text-xs text-slate-500">IRDAI registration: {site.irdaiPlaceholder}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="badge">Protection lines</p>
            <h2 className="mt-3 text-2xl font-bold text-navy-900 dark:text-white md:text-3xl">One partner for every cover type</h2>
          </div>
          <Link href="/services" className="btn-outline hidden sm:inline-flex">
            All services
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Link key={p.title} href={p.href} className="card group p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <p.icon className="h-8 w-8 text-orange-500" />
              <h3 className="mt-4 text-lg font-semibold text-navy-900 dark:text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{p.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
                Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-navy-900">
        <div className="container-page">
          <div className="mb-8 flex items-center gap-3">
            <Calculator className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-navy-900 dark:text-white">Tools that stay honest</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((t) => (
              <Link key={t.href} href={t.href} className="rounded-2xl border border-slate-200 p-5 hover:border-orange-300 dark:border-navy-700">
                <h3 className="font-semibold text-navy-900 dark:text-white">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-8 flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white">From the knowledge centre</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <Link key={a.slug} href={`/knowledge/${a.slug}`} className="card p-5 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{a.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-navy-900 dark:text-white">{a.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{a.excerpt}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/knowledge" className="btn-outline">
            Browse all articles
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-navy-900 py-14 text-white dark:border-navy-700">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Ready to review a policy or renewal?</h2>
            <p className="mt-2 max-w-xl text-slate-300">
              Call or WhatsApp {site.phoneDisplay}. Or create a free account to store policies and reminders.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="btn-primary">
              Create account
            </Link>
            <Link href="/contact" className="btn bg-white text-navy-900 hover:bg-orange-50">
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <p className="text-center text-xs text-slate-500">
          Popular:{" "}
          {nav.services.slice(0, 6).map((s, i) => (
            <span key={s.href}>
              {i > 0 && " · "}
              <Link href={s.href} className="hover:text-orange-600">
                {s.label}
              </Link>
            </span>
          ))}
        </p>
      </section>
    </>
  );
}
