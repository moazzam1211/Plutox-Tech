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

export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  /** One-paragraph positioning statement. */
  description: string;
  /** The product's own logo (trimmed wordmark). */
  image: string;
  /** Brand colour of the product itself, used for its accent wash. */
  brandColor: string;
  /** Headline capability bullets — the scannable summary. */
  features: string[];
  /** Full capability breakdown, grouped by area. */
  moduleGroups: ModuleGroup[];
  /** Screenshot gallery from the live product. */
  screens: ProductScreen[];
  /** Technologies the product is actually built on. */
  stack: string[];
  /** Hard numbers about the build (modules, endpoints, etc.). */
  specs: { label: string; value: string }[];
  /** Payment rails and compliance the product supports. */
  payments?: string[];
  /** Who it's for. */
  audience: string;
  demoUrl: string;
  learnMoreUrl: string;
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

export interface Differentiator {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Left column of the comparison card: what most vendors do. */
  others: string;
  /** Right column: the Plutox Tech approach. */
  plutox: string;
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

export interface PricingPlan {
  name: string;
  tagline: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  /** Pre-formatted for display so no client-side date lib is needed. */
  dateLabel: string;
  image: string;
  author: { name: string; role: string };
}

export interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  experience: string;
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

export interface Award {
  title: string;
  issuer: string;
  year: string;
  icon: LucideIcon;
}
