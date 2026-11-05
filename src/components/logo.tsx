import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-white shadow-sm ring-2 ring-orange-500/30">
        <svg viewBox="0 0 40 40" className="h-6 w-6" aria-hidden>
          <circle cx="20" cy="22" r="7" fill="#fb923c" opacity="0.9" />
          <circle cx="13" cy="16" r="5.5" fill="#38bdf8" opacity="0.95" />
          <circle cx="27" cy="16" r="5.5" fill="#1e3a8a" />
        </svg>
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white">
          ✓
        </span>
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold tracking-tight text-navy-900 dark:text-white">
          Jiv<span className="text-orange-500">O</span>ra
        </span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
          Insurance Solutions
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </Link>
  );
}
