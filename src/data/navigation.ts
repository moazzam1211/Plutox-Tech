import {
  Boxes,
  Download,
  Briefcase,
  Building2,
  Home,
  Mail,
  MessageSquareQuote,
  UserRound,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The whole site, in order.
 *
 * The primary pages, in reading order. The order is the visual language: the navbar
 * lists them in sequence and every page ends with a prev/next pager, so a
 * visitor can read the whole site through rather than scrolling one endless
 * landing page. Pages used to print a two-digit index as well — it was removed
 * because the number carried no information the label didn't already give.
 */
export interface Route {
  label: string;
  href: string;
  /** Compact label for the floating navbar, where horizontal room is tight. */
  short: string;
  /** Shown in the mobile drawer and on the intro index. */
  summary: string;
  icon: LucideIcon;
  /**
   * Sub-destinations, shown in a hover panel on desktop and indented in the
   * mobile drawer. Only three routes have any; the rest render as plain links.
   *
   * Written out here rather than derived from `products` and `consultancyPrograms`
   * on purpose: the navbar is a client component, and importing those would pull
   * every module description and price into the bundle that renders a menu. The
   * cost is a handful of names to keep in step, and a wrong one is visible in the
   * navbar immediately.
   */
  children?: { label: string; href: string; hint: string }[];
}

export const routes: Route[] = [
  {
    label: "Intro",
    href: "/",
    short: "Intro",
    summary: "Who we are, in one screen",
    icon: Home,
  },
  {
    label: "About",
    href: "/about",
    short: "About",
    summary: "The company, how we work and what we stand for",
    icon: Building2,
  },
  {
    label: "Services",
    href: "/services",
    short: "Services",
    summary: "Consultancy and build — from an idea to a running business",
    children: [
      { label: "POS System Consultancy", href: "/services#pos-consultancy", hint: "Audit to go-live" },
      { label: "Cloud Kitchen Setup", href: "/services#cloud-kitchen", hint: "Idea to first order" },
      { label: "Food Business Consultancy", href: "/services#food-business", hint: "Restaurants, cafés, QSR" },
    ],
    icon: Wrench,
  },
  {
    label: "Products",
    href: "/products",
    short: "Products",
    summary: "The modules we build — ordering, KDS, inventory, analytics and more",
    children: [
      { label: "ServeSync POS", href: "/products#servesync-pos", hint: "Restaurant · pharmacy · mart" },
      { label: "StaySync Hotel ERP", href: "/products#staysync", hint: "Hospitality" },
      { label: "Fleet Flow", href: "/products#fleet-flow", hint: "Transport" },
      { label: "All modules", href: "/products", hint: "Eleven shared modules" },
      { label: "Downloads", href: "/downloads", hint: "Installers & Android apps" },
    ],
    icon: Boxes,
  },
  {
    label: "Projects",
    href: "/projects",
    short: "Projects",
    summary: "Three platforms, all shipped",
    children: [
      { label: "ServeSync POS", href: "/projects/servesync-pos", hint: "Restaurant · pharmacy · mart" },
      { label: "StaySync Hotel ERP", href: "/projects/staysync", hint: "Hospitality" },
      { label: "Fleet Flow", href: "/projects/fleet-flow", hint: "Transport" },
    ],
    icon: Briefcase,
  },
  {
    label: "Reviews",
    href: "/reviews",
    short: "Reviews",
    summary: "What clients say",
    icon: MessageSquareQuote,
  },
  {
    label: "Owner",
    href: "/owner",
    short: "Owner",
    summary: "Moazzam Naveed, founder",
    icon: UserRound,
  },
  {
    label: "Contact",
    href: "/contact",
    short: "Contact",
    summary: "Start a conversation",
    icon: Mail,
  },
];

/**
 * Pages that exist and are indexed, but stay out of the primary bar.
 *
 * Skills sits here rather than in `routes`: it is supporting evidence for the
 * work rather than a destination in its own right, and the bar only has room for
 * so many labels before they stop being scannable. It is still linked from the
 * footer, the About page and the Owner profile, and it is still in the sitemap.
 */
export const secondaryRoutes: Route[] = [
  {
    label: "Downloads",
    href: "/downloads",
    short: "Downloads",
    summary: "Windows installers and Android apps, with a checksum for each",
    icon: Download,
  },
  {
    label: "Skills",
    href: "/skills",
    short: "Skills",
    summary: "The stack, hands-on",
    icon: Wrench,
  },
];

/** Legal pages — footer only, deliberately out of the reading sequence. */
export const legalRoutes = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

/** Look up the previous and next route, for the page-footer pager. */
export function getAdjacentRoutes(href: string) {
  const position = routes.findIndex((route) => route.href === href);
  if (position === -1) return { previous: null, next: null };
  return {
    previous: position > 0 ? routes[position - 1] : null,
    next: position < routes.length - 1 ? routes[position + 1] : null,
  };
}
