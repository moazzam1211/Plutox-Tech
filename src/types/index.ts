/**
 * Shared domain types.
 *
 * Every entry in `src/data` is typed against one of these shapes, so a typo in
 * content is a compile-time error rather than a runtime blank on the page.
 */
import type { LucideIcon } from "lucide-react";

/** A single navigation entry; `children` renders a mega-menu column. */
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  children?: NavItem[];
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Bullet points revealed by the "Read more" interaction. */
  highlights: string[];
  /** Grid emphasis — `wide` cards span two columns on large screens. */
  span?: "default" | "wide";
}

/** A named group of capabilities within a product. */
export interface ModuleGroup {
  title: string;
  items: { name: string; detail: string }[];
}

/** One screenshot in a product's gallery. */
export interface ProductScreen {
  src: string;
  label: string;
  caption: string;
}

/** One entry in a product's delivery roadmap. */
export interface ProductPhase {
  label: string;
  title: string;
  detail: string;
  /** `done` phases are shipped; `next` is in progress; `planned` is scoped only. */
  state: "done" | "next" | "planned";
}

/** One subscription tier of a product. */
export interface ProductPlan {
  name: string;
  /** Formatted with its currency, because the products bill in PKR. */
  price: string;
  period: string;
  summary: string;
  includes: string[];
  /** The tier to lead with. At most one per product. */
  featured?: boolean;
}

/** One pricing chart. A product with editions has one per edition. */
export interface ProductPricing {
  /** Edition name, when the product prices more than one. Omitted otherwise. */
  edition?: string;
  /** One line under the edition tab explaining who it is for. */
  editionSummary?: string;
  note: string;
  plans: ProductPlan[];
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  /**
   * Whether the product is shipped or still being built. Drives the status pill
   * and, for `in-development`, swaps the screenshot gallery for the roadmap —
   * there are no screenshots of software that isn't finished, and inventing them
   * is the one thing this page must never do.
   */
  status?: "shipped" | "in-development";
  /** One-paragraph positioning statement. */
  description: string;
  /** The product's own logo (trimmed wordmark). */
  image: string;
  /**
   * `stacked` logos are a mark above a wordmark rather than a horizontal strip,
   * so they need roughly twice the height to stay legible on the plate.
   */
  logoLayout?: "horizontal" | "stacked";
  /** Brand colour of the product itself, used for its accent wash. */
  brandColor: string;
  /** Headline capability bullets — the scannable summary. */
  features: string[];
  /** Full capability breakdown, grouped by area. */
  moduleGroups: ModuleGroup[];
  /** Screenshot gallery from the live product. Absent while in development. */
  screens?: ProductScreen[];
  /** Delivery roadmap, shown in place of the gallery while in development. */
  roadmap?: ProductPhase[];
  /**
   * Programming languages the source is actually written in, ordered by share of
   * the tree. Measured by counting files per extension in each repository rather
   * than asserted — it is the one claim on this page a reader can check against
   * GitHub's own language bar.
   */
  languages: string[];
  /** Technologies, frameworks and services the product is built on. */
  stack: string[];
  /** Hard numbers about the build (modules, endpoints, etc.). */
  specs: { label: string; value: string }[];
  /** Payment rails and compliance the product supports. */
  payments?: string[];
  /** Who it's for. */
  audience: string;
  /** Where the demo CTA points — /contact, since there is no hosted demo. */
  demoUrl: string;
  /**
   * Subscription tiers, priced as the product itself bills them.
   *
   * An array because ServeSync prices its three editions separately: a pharmacy
   * and a restaurant pay the same per tier but get different modules for it, so
   * one shared chart would have listed a kitchen display to a pharmacist.
   * Single-edition products carry a one-entry array.
   */
  pricing?: ProductPricing[];
  /** Shown as a small metric row under the feature list. */
  metric?: { label: string; value: string };
  badge?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
}

export type ProjectCategory =
  | "POS Systems"
  | "ERP & CRM"
  | "Hospitality"
  | "Healthcare"
  | "Web Platforms"
  | "Mobile Apps"
  | "AI & Automation";

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  description: string;
  image: string;
  stack: string[];
  /** Headline outcome shown on hover, e.g. "42% faster checkout". */
  result: string;
  liveUrl: string;
  caseStudyUrl: string;
  year: string;
}

export interface Technology {
  name: string;
  /** Two-or-three letter monogram rendered inside the logo tile. */
  mark: string;
  /** Brand hex — used for the tile glow only, never for text on white. */
  color: string;
  category:
    | "Frontend"
    | "Backend"
    | "Mobile"
    | "Database"
    | "DevOps"
    | "Cloud"
    | "AI";
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Company wordmark initials for the glass card footer. */
  companyMark: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar: string;
}

export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Pricing" | "Technical" | "Support";
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  milestone: string;
}

export interface ValuePillar {
  title: string;
  description: string;
  icon: LucideIcon;
}

