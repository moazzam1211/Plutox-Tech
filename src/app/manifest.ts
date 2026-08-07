import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/** Web app manifest — enables install prompts and a themed splash screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#1a1a1a",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "developer"],
    // Points at the supplied artwork; see public/images/brand/README.md.
    icons: [
      {
        src: "/images/brand/plutox-mark.png",
        sizes: "4800x4800",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/brand/plutox-mark.png",
        sizes: "4800x4800",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
