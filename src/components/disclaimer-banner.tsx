export function DisclaimerBanner({ children }: { children?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
      {children ||
        "Indicative estimate only — not a binding quotation. Final premiums are issued by insurers after underwriting."}
    </div>
  );
}
