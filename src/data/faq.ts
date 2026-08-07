import type { FaqItem } from "@/types";

/** Also fed into FAQPage JSON-LD, so answers are written to stand alone. */
export const faqs: FaqItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "A single-location POS deployment usually goes live in 4 to 6 weeks. A multi-branch ERP with data migration runs 3 to 6 months. After the discovery sprint you receive a costed roadmap with dated milestones, and we hold ourselves to it.",
    category: "General",
  },
  {
    question: "Do I own the source code?",
    answer:
      "Yes. On final milestone payment you receive the full source code, database schema, infrastructure credentials and technical documentation. There is no licence that expires and no vendor lock-in — continuing with us stays a commercial choice.",
    category: "General",
  },
  {
    question: "How is a project priced?",
    answer:
      "Fixed price per milestone, agreed before any code is written. The discovery sprint is quoted separately and is deductible from the build if you proceed. You will never receive an invoice for work you did not approve in advance.",
    category: "Pricing",
  },
  {
    question: "What does ongoing support cost?",
    answer:
      "Support plans start at 12% of the build value annually and include 24/7 monitoring, security patching, a named account engineer and a quarterly roadmap review. Feature development is quoted separately so your support fee stays predictable.",
    category: "Pricing",
  },
  {
    question: "Can you integrate with the software we already run?",
    answer:
      "Almost always. We routinely integrate with accounting systems, payroll, tax and fiscal authorities, payment gateways, delivery aggregators, WhatsApp Business, e-commerce storefronts and hotel channel managers. If an API exists we can work with it; if it does not, we will tell you honestly what the workaround costs.",
    category: "Technical",
  },
  {
    question: "Does the software work without internet?",
    answer:
      "Our POS products are offline-first. Billing, printing and stock deduction continue during an outage, transactions queue locally, and everything reconciles automatically on reconnect with conflict-free merge rules. Nothing is lost and no duplicates are created.",
    category: "Technical",
  },
  {
    question: "Where is our data stored, and how is it secured?",
    answer:
      "You choose the region — we deploy to AWS or Azure in the jurisdiction you require, or on-premise where regulation demands it. Data is encrypted at rest and in transit, access is least-privilege and audited, dependencies are scanned in CI, and backups are tested with point-in-time restore.",
    category: "Technical",
  },
  {
    question: "Will you train our staff?",
    answer:
      "Yes, and it is included in every deployment. We run role-based sessions on the actual hardware your team will use, leave printed quick-reference cards at each station, and stay on-site or on-call through the first week of live trading.",
    category: "Support",
  },
  {
    question: "What happens if we need changes after launch?",
    answer:
      "Small adjustments in the first 30 days are covered as part of the deployment. Beyond that, changes are quoted as scoped enhancements and scheduled into a sprint. Most retained clients run a rolling improvement budget with us.",
    category: "Support",
  },
  {
    question: "Do you work with clients outside Pakistan?",
    answer:
      "Yes — roughly half of our current work is for clients in the UAE, Saudi Arabia, the UK, the US and Australia. We handle locale-specific tax rules, currencies, right-to-left layouts and fiscal invoicing requirements, and we schedule overlapping working hours with your timezone.",
    category: "General",
  },
];
