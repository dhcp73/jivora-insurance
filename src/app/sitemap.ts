import type { MetadataRoute } from "next";
import { site, nav } from "@/lib/site";
import { articles } from "@/content/articles";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/services",
    "/compare",
    "/tools",
    "/knowledge",
    "/knowledge/faq",
    "/knowledge/glossary",
    "/knowledge/claims",
    "/quote",
    "/login",
    "/signup",
    ...nav.legal.map((l) => l.href),
    ...nav.tools.map((t) => t.href),
  ];
  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${base}/knowledge/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
