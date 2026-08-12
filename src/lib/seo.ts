import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Build a page-level `Metadata` object that inherits the site defaults.
 *
 * Every route should call this instead of hand-rolling `openGraph`/`twitter`
 * blocks, which keeps canonical URLs and card imagery consistent.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * JSON-LD graph describing the organisation, the website and the services
 * offered. Emitted once from the root layout so every crawler sees it.
 *
 * Uses a single `@graph` so the nodes can cross-reference each other by `@id`.
 */
export function organizationJsonLd() {
  const { name, legalName, url, description, contact, social, founded, tagline } =
    siteConfig;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name,
        legalName,
        url,
        slogan: tagline,
        description,
        foundingDate: founded,
        logo: {
          "@type": "ImageObject",
          // PNG for the same reason as the manifest icons — scrapers, not browsers.
          url: `${url}/images/brand/plutox-mark.png`,
          width: 512,
          height: 512,
        },
        image: `${url}/opengraph-image`,
        email: contact.email,
        telephone: contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.city,
          addressRegion: contact.address.region,
          postalCode: contact.address.postalCode,
          addressCountry: contact.address.countryCode,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: contact.phone,
            email: contact.salesEmail,
            contactType: "sales",
            areaServed: ["PK", "AE", "SA", "GB", "US", "CA", "AU"],
            availableLanguage: ["English", "Urdu"],
          },
          {
            "@type": "ContactPoint",
            email: contact.email,
            contactType: "customer support",
            hoursAvailable: "Mo-Su 00:00-23:59",
          },
        ],
        sameAs: Object.values(social),
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name,
        description,
        publisher: { "@id": `${url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#service`,
        name: `${name} — Custom Software Development`,
        provider: { "@id": `${url}/#organization` },
        areaServed: "Worldwide",
        serviceType: [
          "POS Software Development",
          "ERP Development",
          "CRM Development",
          "Hotel Management System",
          "Pharmacy Management Software",
          "Web Development",
          "Mobile App Development",
          "Cloud Solutions",
          "AI Automation",
        ],
        url: `${url}/services`,
      },
    ],
  };
}

/** FAQPage schema — improves the odds of a rich result for the FAQ block. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/** BreadcrumbList schema for inner pages. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.path}`,
    })),
  };
}
