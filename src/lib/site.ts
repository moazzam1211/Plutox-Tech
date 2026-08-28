/**
 * Single source of truth for company identity, contact details and SEO
 * keywords. Everything user-facing that appears in more than one place
 * lives here so a rebrand is a one-file change.
 */
export const siteConfig = {
  name: "Plutox Tech",
  legalName: "Plutox Tech (Pvt.) Ltd.",
  tagline: "Smart Software. Smarter Business.",
  /* The home page's search snippet. Kept under 158 characters — see
     `clampDescription` in lib/seo.ts for why. */
  description:
    "Plutox Tech builds the software businesses run on — POS, ERP, hospitality, logistics and custom platforms. A founder-led software house in Lahore.",
  shortDescription:
    "Custom POS, ERP, hotel & pharmacy software, web, mobile, AI automation and cloud solutions.",

  /** Update to the production origin before deploying. */
  url: "https://plutoxtech.com",
  ogImage: "/opengraph-image",
  locale: "en_US",
  founded: "2022",

  contact: {
    email: "hello@plutoxtech.com",
    salesEmail: "sales@plutoxtech.com",
    /**
     * Where the `/contact` project enquiry lands.
     *
     * Separate from `email` on purpose: `hello@` is the address printed on the
     * page, in the footer and in the legal pages, so it is the one a person
     * writes to directly. This is the one the form posts to, and keeping them
     * apart means the routing can change without editing what visitors read.
     */
    enquiryEmail: "info@plutoxtech.com",
    careersEmail: "careers@plutoxtech.com",
    phone: "+92 344 024 4449",
    /**
     * Digits-only in full international format — required by wa.me.
     * Local 0344 024 4449 → country code 92 with the leading 0 dropped.
     */
    whatsapp: "923440244449",
    address: {
      street: "Central Park Housing Scheme, Ferozepur Road",
      city: "Lahore",
      region: "Punjab",
      postalCode: "54600",
      country: "Pakistan",
      countryCode: "PK",
    },
    hours: "Mon – Sat, 9:00 AM – 8:00 PM (PKT) · Support 24/7",
  },

  /**
   * Social profiles.
   *
   * `instagram` and `dribbble` are confirmed real. The rest are still
   * placeholder guesses at the handle — replace or delete them before launch, as
   * a footer full of 404s reads worse than a shorter, honest list. Every entry
   * here is also emitted as `sameAs` in the Organization JSON-LD, so a dead URL
   * is a dead structured-data claim too.
   *
   * URLs are stored canonically, without share-sheet tracking parameters
   * (`utm_source`, `igsh`): those identify how a link was copied and carry no
   * meaning on an outbound link from our own site.
   */
  social: {
    linkedin: "https://www.linkedin.com/company/plutoxtech",
    github: "https://github.com/plutoxtech",
    instagram: "https://www.instagram.com/plutox.tech",
    facebook: "https://www.facebook.com/plutoxtech",
    youtube: "https://www.youtube.com/@plutoxtech",
    dribbble: "https://dribbble.com/plutox-tech",
  },

  keywords: [
    "software company",
    "POS software",
    "restaurant POS",
    "pharmacy POS",
    "mart POS",
    "hotel software",
    "hotel management system",
    "ERP development",
    "CRM development",
    "custom software",
    "business solutions",
    "Pakistan software house",
    "software company in Lahore",
    "web development",
    "mobile app development",
    "AI automation",
    "cloud solutions",
    "inventory management software",
    "Plutox Tech",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
