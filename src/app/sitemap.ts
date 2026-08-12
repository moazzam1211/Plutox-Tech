import type { MetadataRoute } from "next";

import { productModules } from "@/data/modules";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/site";

/**
 * XML sitemap, served at /sitemap.xml.
 *
 * `changeFrequency` and `priority` are hints only — crawlers largely ignore
 * them — but `lastModified` is genuinely useful, so it is set from build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
  }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products", priority: 0.9, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
    { path: "/skills", priority: 0.7, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.6, changeFrequency: "monthly" },
    { path: "/owner", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  // One entry per module detail page.
  const all = [
    ...routes,
    ...products.map((p) => ({
      path: `/projects/${p.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...productModules.map((m) => ({
      path: `/products/${m.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
  ];

  return all.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
