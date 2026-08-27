import {
  Boxes,
  Building2,
  Cpu,
  Hotel,
  Layers,
  LifeBuoy,
  Pill,
  ShoppingCart,
  Truck,
  UtensilsCrossed,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { products } from "./products";

/**
 * Homepage positioning content — industries, why-us, and the technology list.
 *
 * The rule for this file is the same as the rest of `src/data`: nothing here may
 * be a claim we cannot point at. Industries name products that serve them, the
 * technology list is *derived* from what the products are actually built with,
 * and there are no customer counts, growth figures or awards anywhere — because
 * we do not have verified ones, and a fabricated number is worse than a missing
 * section.
 */

export interface Industry {
  name: string;
  icon: LucideIcon;
  /** The operational problem, in the words someone in that trade would use. */
  problem: string;
  /** What we put in front of it. */
  answer: string;
  /** Product slugs that serve this industry — the receipt for the claim. */
  served: string[];
}

export const industries: Industry[] = [
  {
    name: "Restaurants & QSR",
    icon: UtensilsCrossed,
    problem:
      "Orders arrive from the counter, a phone, a QR code and an aggregator, and none of them agree with the kitchen.",
    answer:
      "One queue for every channel, tickets on a screen instead of a printer, and a floor plan that knows which table has been waiting.",
    served: ["servesync-pos"],
  },
  {
    name: "Retail & Marts",
    icon: ShoppingCart,
    problem:
      "A queue at the till, produce priced by weight, and stock that is only counted at stocktake.",
    answer:
      "Three ways to scan into one cart, embedded-price scale labels, and stock that depletes as you sell with promotions applied automatically.",
    served: ["servesync-pos"],
  },
  {
    name: "Pharmacies",
    icon: Pill,
    problem:
      "Stock lives in batches with expiry dates, some of it cannot legally be sold without a prescription, and an inspector may ask for the register.",
    answer:
      "First-expiry-first dispensing that refuses expired stock, prescription gating enforced at payment, and a controlled register written as you work.",
    served: ["servesync-pos"],
  },
  {
    name: "Hotels & Hospitality",
    icon: Hotel,
    problem:
      "Front desk, housekeeping, the restaurant and the finance office each keep their own version of the truth.",
    answer:
      "One property system across reservations, the room rack, housekeeping, room service and the folio — with rates syncing out to the OTAs.",
    served: ["staysync"],
  },
  {
    name: "Transport & Logistics",
    icon: Truck,
    problem:
      "Trucks, drivers, trips, fuel and maintenance tracked across a whiteboard, a spreadsheet and several phones.",
    answer:
      "A dispatch board that refuses to double-book, live tracking, the whole upkeep side, and a ledger that balances after every financial act.",
    served: ["fleet-flow", "onvee"],
  },
  {
    name: "Small & Medium Business",
    icon: Building2,
    problem:
      "Off-the-shelf software fits the trade but not the business, and the workarounds become the process.",
    answer:
      "Systems built around how the business actually works, deployed on hardware it already owns, with the source handed over.",
    served: ["servesync-pos", "plutox-id"],
  },
];

export interface Differentiator {
  title: string;
  detail: string;
  icon: LucideIcon;
}

/** Why us — capability claims, each one demonstrable from the work on /projects. */
export const differentiators: Differentiator[] = [
  {
    title: "Business-first, not code-first",
    detail:
      "Every platform here started with someone's actual working day — a pass, a counter, a dispatch board — and the software was shaped to it rather than the other way round.",
    icon: Workflow,
  },
  {
    title: "Built, not assembled",
    detail:
      "These are our own codebases, not white-labelled licences with a logo swapped. That is why an edition can be added or a rule changed in days.",
    icon: Layers,
  },
  {
    title: "Architecture that survives growth",
    detail:
      "Multi-branch and multi-tenant from the schema up — one owner login over many outlets, and tenant isolation enforced in four layers where the data demands it.",
    icon: Boxes,
  },
  {
    title: "Offline is a requirement, not a feature",
    detail:
      "A till that stops when the internet does is not a till. Sales queue in an outbox and replay on reconnect, and printing goes straight to the hardware.",
    icon: Cpu,
  },
  {
    title: "Deployment and support included",
    detail:
      "We install it, migrate the data, train the staff and stay reachable on WhatsApp afterwards. Handover is not where the relationship ends.",
    icon: LifeBuoy,
  },
];

/**
 * Technologies we actually build on, counted from the products themselves.
 *
 * Derived rather than listed: every name comes from a `stack` array on a real
 * product in `products.ts`, and the count is how many of them use it. A logo
 * board of technologies nobody here has shipped is the easiest lie on a software
 * company's homepage, and this makes it impossible to tell by accident.
 */
export const technologies = (() => {
  const uses = new Map<string, string[]>();

  for (const product of products) {
    for (const tech of product.stack) {
      const list = uses.get(tech) ?? [];
      list.push(product.name);
      uses.set(tech, list);
    }
  }

  return [...uses.entries()]
    .map(([name, usedBy]) => ({ name, usedBy }))
    // Most-used first, then alphabetically so the order is stable between builds.
    .sort((a, b) => b.usedBy.length - a.usedBy.length || a.name.localeCompare(b.name));
})();

export interface BuildCategory {
  name: string;
  blurb: string;
  items: string[];
}

/**
 * What we build, in four groups.
 *
 * Ordered by what actually pays: business software is the practice, and the
 * other three exist because a platform needs a phone app, an integration and
 * somewhere to run. Every line is something present in the work on /projects —
 * the AI group is the shortest because it is the newest, and saying so is more
 * credible than padding it.
 */
export const buildCategories: BuildCategory[] = [
  {
    name: "Business software",
    blurb: "The core practice — the systems a business runs its day on.",
    items: [
      "Point-of-sale platforms, multi-branch and offline-first",
      "ERP for hospitality, retail and transport",
      "Inventory, batch and expiry, central warehousing",
      "Accounting with a ledger that balances",
    ],
  },
  {
    name: "Digital products",
    blurb: "The surfaces around the core system, for staff and for customers.",
    items: [
      "Web applications and admin consoles",
      "Android apps — native shells and React Native",
      "Customer portals and public tracking",
      "Customer-facing sites wired to the till",
    ],
  },
  {
    name: "Automation & AI",
    blurb:
      "The newest of the four, and deliberately the shortest list — these are shipped, not aspirational.",
    items: [
      "In-product assistants answering from live data only",
      "Workflow automation and scheduled jobs",
      "Aggregator and payment-gateway integrations",
      "Fiscal-authority reporting (PRA / FBR)",
    ],
  },
  {
    name: "Infrastructure",
    blurb: "Where it runs, and what happens after launch.",
    items: [
      "PostgreSQL schema design and multi-tenant isolation",
      "Deployment on cloud, VPS or the shop's own PC",
      "Passwordless identity and single sign-on",
      "Installation, migration, training and support",
    ],
  },
];
