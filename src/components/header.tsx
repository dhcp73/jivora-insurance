"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { nav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-cream/90 backdrop-blur dark:border-navy-700 dark:bg-navy-950/90">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          <div className="relative">
            <button
              type="button"
              className="btn-ghost text-sm"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
            >
              Services <ChevronDown className="h-4 w-4" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 grid w-[520px] grid-cols-2 gap-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-navy-700 dark:bg-navy-900">
                {nav.services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="rounded-xl px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-navy-800"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="block font-medium text-navy-900 dark:text-white">{s.label}</span>
                    <span className="text-xs text-slate-500">{s.group}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {nav.main
            .filter((i) => i.href !== "/services")
            .map((item) => (
              <Link key={item.href} href={item.href} className="btn-ghost text-sm">
                {item.label}
              </Link>
            ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="btn-ghost hidden text-sm sm:inline-flex">
            Log in
          </Link>
          <Link href="/quote" className="btn-primary hidden sm:inline-flex">
            Get a quote
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            className="btn-secondary hidden md:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="btn-ghost lg:hidden !p-2"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy-950/50"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,360px)] flex-col gap-2 overflow-y-auto bg-white p-4 shadow-2xl dark:bg-navy-900">
            <div className="mb-2 flex items-center justify-between">
              <Logo />
              <button type="button" className="btn-ghost !p-2" onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            {nav.main.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 font-medium hover:bg-slate-50 dark:hover:bg-navy-800" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">All services</p>
            {nav.services.map((s) => (
              <Link key={s.href} href={s.href} className="rounded-xl px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-navy-800" onClick={() => setOpen(false)}>
                {s.label}
              </Link>
            ))}
            <Link href="/quote" className="btn-primary mt-4" onClick={() => setOpen(false)}>
              Get a quote
            </Link>
            <Link href="/signup" className="btn-outline" onClick={() => setOpen(false)}>
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
