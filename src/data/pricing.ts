import type { PricingPlan } from "@/types";

/** Indicative engagement tiers. Real quotes follow the discovery sprint. */
export const pricingPlans: PricingPlan[] = [
  {
    name: "Launch",
    tagline: "Single location, live fast",
    price: "$2,400",
    period: "one-time",
    description:
      "For a single outlet that needs a production-grade system running this quarter.",
    features: [
      "One product deployment (POS or PMS)",
      "Up to 3 terminals, 1 location",
      "Hardware setup & staff training",
      "Standard report pack",
      "30 days post-launch support",
      "Email & WhatsApp support",
    ],
    cta: "Start with Launch",
  },
  {
    name: "Growth",
    tagline: "Multi-branch, custom workflows",
    price: "$7,900",
    period: "one-time",
    description:
      "For growing operators who need central control across several locations.",
    features: [
      "Unlimited terminals, up to 10 locations",
      "Custom workflow & report development",
      "Data migration from your current system",
      "Payment gateway & WhatsApp integration",
      "Loyalty, promotions & purchase orders",
      "90 days post-launch support",
      "Named account engineer",
      "Priority 4-hour response SLA",
    ],
    cta: "Talk about Growth",
    featured: true,
  },
  {
    name: "Enterprise",
    tagline: "Bespoke platform, your terms",
    price: "Custom",
    period: "scoped per project",
    description:
      "For groups and enterprises needing a platform built around their own operating model.",
    features: [
      "Unlimited locations & entities",
      "Full ERP / custom platform build",
      "Dedicated engineering squad",
      "On-premise or private-cloud deployment",
      "SSO, audit logging & compliance reporting",
      "AI forecasting & automation modules",
      "24/7 support with 15-minute critical SLA",
      "Quarterly roadmap review with leadership",
      "Complete source code ownership",
    ],
    cta: "Request a proposal",
  },
];
