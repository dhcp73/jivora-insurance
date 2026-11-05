export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-slate-200/80 bg-gradient-to-b from-white to-cream dark:border-navy-800 dark:from-navy-900 dark:to-navy-950">
      <div className="container-page py-12 md:py-16">
        {eyebrow && <p className="badge mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-navy-900 dark:text-white md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        )}
      </div>
    </section>
  );
}
