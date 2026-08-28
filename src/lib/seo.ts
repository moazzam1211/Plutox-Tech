import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Longest meta description worth serving.
 *
 * Google renders roughly 155–160 characters on desktop and less on mobile.
 * Beyond that the text is not a shorter snippet, it is a snippet cut mid-word —
 * so the tail is wasted and the visible part often ends badly.
 */
const DESCRIPTION_LIMIT = 158;

/**
 * Trim a description to the limit on a word boundary.
 *
 * A safety net rather than a licence to write long: it exists because several
 * pages fed a full body paragraph in as their description (one was 599
 * characters), and a helper that silently fixes it for every current and future
 * route beats hand-policing 28 strings. Short, purpose-written descriptions
 * still pass through untouched.
 */
export function clampDescription(text: string, limit = DESCRIPTION_LIMIT) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;

  // Cut at the last sentence end that fits, else the last word, and never leave
  // dangling punctuation before the ellipsis.
  const window = clean.slice(0, limit - 1);
  const sentence = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "));
  if (sentence > limit * 0.55) return window.slice(0, sentence + 1);

  const word = window.lastIndexOf(" ");
  return `${window.slice(0, word > 0 ? word : window.length).replace(/[,;:—–-]$/, "")}…`;
}

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
  description = clampDescription(description);

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

/**
 * SoftwareApplication schema for one product.
 *
 * Worth having because these pages *are* software product pages, and this is the
 * vocabulary a search engine understands them in. Deliberately omits
 * `aggregateRating` and `review`: we have no verified ratings, and inventing
 * them is both a fabrication and a Google structured-data violation.
 *
 * `offers` is only emitted where the product genuinely publishes prices, taken
 * from the same pricing data the page renders — so the markup and the visible
 * page can never disagree, which is the other way this kind of schema gets a
 * site penalised.
 */
export function softwareApplicationJsonLd(product: {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  stack: string[];
  pricing?: { note: string; plans: { name: string; price: string; period: string }[] }[];
}) {
  const url = `${siteConfig.url}/projects/${product.slug}`;

  /* "PKR 5,000" / "Rs 7,000" → { currency, amount }. Anything unparseable is
     dropped rather than guessed at. */
  const offers = (product.pricing ?? [])
    .flatMap((chart) => chart.plans)
    .map((plan) => {
      const amount = plan.price.replace(/[^0-9]/g, "");
      if (!amount) return null;
      return {
        "@type": "Offer",
        name: plan.name,
        price: Number(amount),
        priceCurrency: "PKR",
        // Monthly subscriptions, which is how every one of these bills.
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: Number(amount),
          priceCurrency: "PKR",
          unitText: plan.period.replace(/^\/\s*/, ""),
        },
      };
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: product.name,
    alternateName: product.tagline,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: product.category,
    description: clampDescription(product.description, 300),
    url,
    image: `${siteConfig.url}${product.image}`,
    operatingSystem: "Web, Windows, Android",
    softwareRequirements: product.stack.join(", "),
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    ...(offers.length
      ? { offers: offers.length === 1 ? offers[0] : offers }
      : {}),
  };
}

/**
 * Service schema for the consultancy programmes.
 *
 * One node per programme, each pointing back at the organisation as provider and
 * naming the area it is actually offered in. No prices: the consultancy is
 * scoped per engagement rather than listed, and an invented figure would be
 * worse than none.
 */
export function serviceJsonLd(
  programmes: {
    slug: string;
    name: string;
    summary: string;
    audience: string;
  }[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": programmes.map((programme) => ({
      "@type": "Service",
      "@id": `${siteConfig.url}/services#${programme.slug}`,
      name: programme.name,
      description: clampDescription(programme.summary, 300),
      serviceType: programme.name,
      audience: { "@type": "Audience", audienceType: programme.audience },
      provider: { "@id": `${siteConfig.url}/#organization` },
      areaServed: [
        { "@type": "City", name: siteConfig.contact.address.city },
        { "@type": "Country", name: siteConfig.contact.address.country },
      ],
      url: `${siteConfig.url}/services#${programme.slug}`,
    })),
  };
}
