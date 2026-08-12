import {
  Boxes,
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
    icon: Wrench,
  },
  {
    label: "Products",
    href: "/products",
    short: "Products",
    summary: "The modules we build — ordering, KDS, inventory, analytics and more",
    icon: Boxes,
  },
  {
    label: "Projects",
    href: "/projects",
    short: "Projects",
    summary: "Five platforms, four of them shipped",
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
