import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/**
 * robots.txt.
 *
 * Everything is crawlable except the API surface, which has nothing indexable
 * and would only waste crawl budget.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
