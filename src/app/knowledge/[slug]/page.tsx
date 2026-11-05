import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { articles, getArticle } from "@/content/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  return (
    <>
      <PageHero eyebrow={a.category} title={a.title} description={a.excerpt} />
      <article className="container-page prose-jivora max-w-3xl py-12">
        <p className="text-sm text-slate-500">{a.date} · {a.readMinutes} min read</p>
        {a.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p className="pt-6"><Link href="/knowledge" className="text-orange-600 hover:underline">← All articles</Link></p>
      </article>
    </>
  );
}
