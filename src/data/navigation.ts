import {
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
 * Seven pages, each with a two-digit index. The index is part of the visual
 * language — the navbar, page headers and prev/next pagers all show it, so the
 * reader always knows where they are in a short, finite site rather than
 * scrolling one endless landing page.
 */
export interface Route {
  index: string;
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
    index: "01",
    label: "Intro",
    href: "/",
    short: "Intro",
    summary: "Who we are, in one screen",
    icon: Home,
  },
  {
    index: "02",
    label: "Projects",
    href: "/projects",
    short: "Projects",
    summary: "Four platforms, built and deployed",
    icon: Briefcase,
  },
  {
    index: "03",
    label: "About & Services",
    href: "/about",
    short: "About",
    summary: "The company and what we build",
    icon: Building2,
  },
  {
    index: "04",
    label: "Skills",
    href: "/skills",
    short: "Skills",
    summary: "The stack, hands-on",
    icon: Wrench,
  },
  {
    index: "05",
    label: "Reviews",
    href: "/reviews",
    short: "Reviews",
    summary: "What clients say",
    icon: MessageSquareQuote,
  },
  {
    index: "06",
    label: "Owner",
    href: "/owner",
    short: "Owner",
    summary: "Moazzam Naveed, founder",
    icon: UserRound,
  },
  {
    index: "07",
    label: "Contact",
    href: "/contact",
    short: "Contact",
    summary: "Start a conversation",
    icon: Mail,
  },
];

/** Legal pages — footer only, deliberately out of the numbered sequence. */
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
