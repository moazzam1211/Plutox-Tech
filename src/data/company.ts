import {
  Award,
  BadgeCheck,
  Banknote,
  Building,
  Clock,
  Eye,
  Gauge,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Layers,
  Lightbulb,
  LifeBuoy,
  Lock,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";

import type {
  Award as AwardType,
  Differentiator,
  Stat,
  TimelineEntry,
  ValuePillar,
} from "@/types";

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

/** Headline counters in the statistics band. */
export const stats: Stat[] = [
  {
    value: 100,
    suffix: "+",
    label: "Projects Delivered",
    description: "Shipped, live and in production",
    icon: Rocket,
  },
  {
    value: 50,
    suffix: "+",
    label: "Happy Clients",
    description: "Across retail, hospitality and health",
    icon: Users,
  },
  {
    value: 10,
    suffix: "+",
    label: "Industries Served",
    description: "From pharmacies to logistics fleets",
    icon: Layers,
  },
  {
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Post-delivery survey average",
    icon: TrendingUp,
  },
];

/** Secondary counters used inside the About section. */
export const companyStats: Stat[] = [
  {
    value: 100,
    suffix: "+",
    label: "Projects Completed",
    description: "Delivered end to end since 2022",
    icon: BadgeCheck,
  },
  {
    value: 50,
    suffix: "+",
    label: "Clients Worldwide",
    description: "Long-term retained partnerships",
    icon: Building,
  },
  {
    value: 10,
    suffix: "",
    label: "Countries Served",
    description: "Pakistan, GCC, UK, US and Australia",
    icon: Globe2,
  },
  {
    value: 4,
    suffix: "+",
    label: "Years Experience",
    description: "Building production software since 2022",
    icon: GraduationCap,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Support Availability",
    description: "Monitored uptime and on-call engineers",
    icon: LifeBuoy,
  },
];

/* ------------------------------------------------------------------ */
/* Why choose us                                                      */
/* ------------------------------------------------------------------ */

export const differentiators: Differentiator[] = [
  {
    title: "24/7 Support",
    description:
      "A named engineer, a monitored status page and a phone number that a human answers at 3 AM.",
    icon: LifeBuoy,
    others: "Email ticket, 48-hour SLA",
    plutox: "Named engineer, 15-minute critical response",
  },
  {
    title: "Scalable Architecture",
    description:
      "Built to survive the growth you are planning for, not just the load you have today.",
    icon: Gauge,
    others: "Rewrite needed at scale",
    plutox: "Horizontally scalable from day one",
  },
  {
    title: "Transparent Pricing",
    description:
      "Fixed-scope milestones agreed before work starts. No change-request ambush at 80% complete.",
    icon: Banknote,
    others: "Hourly billing, moving totals",
    plutox: "Fixed milestone pricing, quoted upfront",
  },
  {
    title: "Senior Team",
    description:
      "Every project has a senior engineer accountable for it. Juniors learn on our time, not your budget.",
    icon: Users,
    others: "Junior team, senior in sales calls",
    plutox: "Senior lead on every engagement",
  },
  {
    title: "Fast Delivery",
    description:
      "First usable milestone inside four weeks, then a working demo every fortnight.",
    icon: Rocket,
    others: "Six months to first demo",
    plutox: "Working milestone in 4 weeks",
  },
  {
    title: "Modern Stack",
    description:
      "Next.js, TypeScript and containerised cloud infrastructure — hiring for it stays easy years from now.",
    icon: Wrench,
    others: "Legacy frameworks, hard to staff",
    plutox: "Current, well-documented, mainstream stack",
  },
  {
    title: "Security First",
    description:
      "Encryption at rest and in transit, least-privilege access, dependency scanning in CI and annual penetration tests.",
    icon: ShieldCheck,
    others: "Security reviewed after launch",
    plutox: "Threat modelled before the first sprint",
  },
  {
    title: "Truly Custom",
    description:
      "We shape the software around your workflow instead of asking your team to work around a template.",
    icon: Sparkles,
    others: "Rebranded template, rigid workflow",
    plutox: "Built to your process, source code yours",
  },
];

/* ------------------------------------------------------------------ */
/* Awards & certifications                                            */
/* ------------------------------------------------------------------ */

export const awards: AwardType[] = [
  {
    title: "Top Software Development Company",
    issuer: "Clutch Regional Awards",
    year: "2025",
    icon: Trophy,
  },
  {
    title: "Rising Tech Exporter",
    issuer: "Pakistan Software Export Board",
    year: "2024",
    icon: Award,
  },
  {
    title: "ISO/IEC 27001 Aligned Practices",
    issuer: "Independent security audit",
    year: "2024",
    icon: ShieldCheck,
  },
  {
    title: "Microsoft for Startups Member",
    issuer: "Microsoft",
    year: "2023",
    icon: BadgeCheck,
  },
  {
    title: "Best Hospitality Tech Product",
    issuer: "Regional HoReCa Expo",
    year: "2025",
    icon: Trophy,
  },
  {
    title: "99.98% Platform Uptime",
    issuer: "12-month rolling average",
    year: "2026",
    icon: Clock,
  },
];
