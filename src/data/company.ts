import {
  Eye,
  HeartHandshake,
  Lightbulb,
  Lock,
  Sparkles,
  Target,
} from "lucide-react";

import type { TimelineEntry, ValuePillar } from "@/types";

/* ------------------------------------------------------------------ */
/* Mission, vision, values                                            */
/* ------------------------------------------------------------------ */

export const mission =
  "To put enterprise-grade software within reach of ambitious businesses — engineered to the same standard whether the client runs three outlets or three hundred.";

export const vision =
  "To be the software partner that growing companies across South Asia, the Gulf and beyond name first when technology becomes the constraint on their growth.";

export const coreValues: ValuePillar[] = [
  {
    title: "Craft Over Volume",
    description:
      "We take fewer projects than we could and finish every one properly. Code reviews, tests and documentation are not line items to be cut.",
    icon: Sparkles,
  },
  {
    title: "Radical Clarity",
    description:
      "Fixed scope, fixed price, weekly demos. You always know what is built, what is next and what it costs — no surprise invoices.",
    icon: Eye,
  },
  {
    title: "Ownership, Not Lock-In",
    description:
      "You get the source code, the infrastructure credentials and the documentation. Staying with us is a choice, never a dependency.",
    icon: Lock,
  },
  {
    title: "Business Outcomes First",
    description:
      "Every feature is justified against a metric — throughput, margin, retention. Software that does not move a number does not ship.",
    icon: Target,
  },
  {
    title: "Long-Term Partnership",
    description:
      "Most of our revenue comes from clients we onboarded in our first two years. We optimise for the tenth year, not the first invoice.",
    icon: HeartHandshake,
  },
  {
    title: "Relentless Curiosity",
    description:
      "A standing engineering budget for R&D keeps the stack modern, so you inherit improvements instead of technical debt.",
    icon: Lightbulb,
  },
];

/* ------------------------------------------------------------------ */
/* Company timeline                                                   */
/* ------------------------------------------------------------------ */

export const timeline: TimelineEntry[] = [
  {
    year: "2022",
    title: "Founded in Lahore",
    description:
      "One developer, a rented desk and a single restaurant POS contract that we over-delivered on.",
    milestone: "First client shipped",
  },
  {
    year: "2023",
    title: "ServeSync POS launches",
    description:
      "The restaurant work was productised. Twelve venues went live in the first quarter after release.",
    milestone: "First product",
  },
  {
    year: "2024",
    title: "Cloud-native, multi-branch",
    description:
      "The whole platform moved to containerised cloud infrastructure, with central control across unlimited locations.",
    milestone: "100% uptime year",
  },
  {
    year: "2025",
    title: "StaySync Hotel ERP ships",
    description:
      "The hospitality product went live — multi-property reservations, housekeeping and night audit on one system.",
    milestone: "Fourth product deployed",
  },
  {
    year: "2025",
    title: "Regional expansion",
    description:
      "Delivery for clients in the UAE, Saudi Arabia and the UK, with locale-aware tax and fiscal compliance built in.",
    milestone: "10 countries served",
  },
  {
    year: "2026",
    title: "AI automation practice",
    description:
      "Forecasting, document intelligence and retrieval assistants now ship as first-class modules across the product line.",
    milestone: "100+ projects delivered",
  },
];

/* ------------------------------------------------------------------ */
/* Statistics                                                         */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Why choose us                                                      */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Awards & certifications                                            */
/* ------------------------------------------------------------------ */
