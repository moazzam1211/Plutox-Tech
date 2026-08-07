import {
  Boxes,
  Brain,
  Building2,
  Cloud,
  Code2,
  CreditCard,
  LayoutDashboard,
  MonitorSmartphone,
  Package,
  Pill,
  Plug,
  ShoppingCart,
  Smartphone,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";

import type { Service } from "@/types";

/**
 * The full service catalogue. Order matters — the first two cards are given
 * `wide` spans so the grid opens with a strong asymmetric rhythm instead of a
 * uniform 4×4 block.
 */
export const services: Service[] = [
  {
    slug: "pos-development",
    title: "POS Software Development",
    description:
      "Ground-up point of sale platforms engineered for speed at the counter — sub-second item lookup, offline-first billing and hardware that just works.",
    icon: CreditCard,
    span: "wide",
    highlights: [
      "Offline-first architecture with conflict-free sync",
      "Thermal printer, cash drawer & scale integration",
      "Multi-currency, multi-tax and fiscal compliance",
      "Shift, till and cash-reconciliation workflows",
    ],
  },
  {
    slug: "erp-development",
    title: "ERP Development",
    description:
      "Modular enterprise resource planning that replaces the spreadsheet sprawl — finance, procurement, HR, manufacturing and inventory on one ledger.",
    icon: LayoutDashboard,
    span: "wide",
    highlights: [
      "Double-entry accounting with audit trails",
      "Procure-to-pay and order-to-cash automation",
      "Role-based approvals and maker-checker controls",
      "Consolidated multi-entity reporting",
    ],
  },
  {
    slug: "restaurant-pos",
    title: "Restaurant POS",
    description:
      "Floor plans, split bills, kitchen display screens and delivery aggregator sync — built for peak dinner rush, not a demo.",
    icon: UtensilsCrossed,
    highlights: [
      "Table, takeaway, delivery & QR self-order",
      "Kitchen and bar display routing",
      "Recipe-level food cost and wastage tracking",
    ],
  },
  {
    slug: "mart-pos",
    title: "Mart & Retail POS",
    description:
      "High-throughput supermarket checkout with barcode scanning, weighed items, promotions and tiered customer loyalty.",
    icon: ShoppingCart,
    highlights: [
      "Camera and hardware barcode scanning",
      "Mix-and-match promotions and gift cards",
      "Purchase orders with supplier price history",
    ],
  },
  {
    slug: "pharmacy-pos",
    title: "Pharmacy POS",
    description:
      "Batch, expiry and narcotic register control with regulator-ready reporting, plus salt-level substitute suggestions at the counter.",
    icon: Pill,
    highlights: [
      "Batch-wise stock with FEFO dispensing",
      "Expiry alerts and return-to-supplier flows",
      "Prescription capture and refill reminders",
    ],
  },
  {
    slug: "hotel-management",
    title: "Hotel Management System",
    description:
      "Property management for single hotels or portfolios — reservations, housekeeping, channel manager, folios and night audit.",
    icon: Building2,
    highlights: [
      "Rate plans, allotments and channel sync",
      "Housekeeping and maintenance boards",
      "Guest folios, city ledger and night audit",
    ],
  },
  {
    slug: "crm-development",
    title: "CRM Development",
    description:
      "Pipelines your sales team actually updates — lead scoring, quotation builders and automated follow-up sequences.",
    icon: Users,
    highlights: [
      "Custom pipeline stages and win/loss analytics",
      "Quotation and proposal generation",
      "Email, SMS and WhatsApp sequences",
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Marketing sites, portals and SaaS dashboards on Next.js — accessible, server-rendered and consistently in the green on Core Web Vitals.",
    icon: Code2,
    highlights: [
      "Next.js App Router with React Server Components",
      "Headless CMS and design-system driven UI",
      "WCAG 2.2 AA accessibility baseline",
    ],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Applications",
    description:
      "One Flutter codebase, two native-quality apps — with offline caching, push notifications and store submission handled end to end.",
    icon: Smartphone,
    highlights: [
      "Flutter and React Native delivery",
      "Offline cache with background sync",
      "App Store and Play Store release management",
    ],
  },
  {
    slug: "desktop-applications",
    title: "Desktop Applications",
    description:
      "Windows, macOS and Linux builds for counters that cannot depend on a browser tab or a stable internet connection.",
    icon: MonitorSmartphone,
    highlights: [
      "Electron and .NET desktop builds",
      "Local database with cloud replication",
      "Silent auto-update channels",
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "Infrastructure as code on AWS or Azure — containerised, autoscaling, observable and costed before a single resource is provisioned.",
    icon: Cloud,
    highlights: [
      "Docker and Kubernetes deployments",
      "CI/CD pipelines with blue-green releases",
      "Backup, DR drills and cost governance",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    description:
      "Retrieval-augmented assistants, demand forecasting and document extraction wired directly into the systems your team already uses.",
    icon: Brain,
    highlights: [
      "RAG assistants over your own documents",
      "Sales and inventory demand forecasting",
      "Invoice and receipt data extraction",
    ],
  },
  {
    slug: "api-development",
    title: "API Development",
    description:
      "Versioned REST and GraphQL services with OpenAPI contracts, rate limiting and documentation your integration partners can self-serve.",
    icon: Plug,
    highlights: [
      "OpenAPI-first design and mock servers",
      "OAuth 2.0, API keys and scoped tokens",
      "Webhooks with retry and replay",
    ],
  },
  {
    slug: "payment-integration",
    title: "Payment Integration",
    description:
      "Card, wallet and bank rails integrated with idempotent flows, reconciliation reports and PCI-conscious tokenisation.",
    icon: Wallet,
    highlights: [
      "Stripe, PayPal, Razorpay & local gateways",
      "Easypaisa, JazzCash and bank transfers",
      "Settlement reconciliation and refunds",
    ],
  },
  {
    slug: "inventory-systems",
    title: "Inventory Systems",
    description:
      "Warehouse-grade stock control — multi-location, serialised, batch-tracked, with reorder intelligence that prevents dead capital.",
    icon: Package,
    highlights: [
      "Multi-warehouse transfers and cycle counts",
      "Serial, batch and expiry traceability",
      "Reorder points and demand-based suggestions",
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    description:
      "When nothing off the shelf fits: a discovery sprint, a costed roadmap, then software shaped precisely around how your business runs.",
    icon: Boxes,
    highlights: [
      "Fixed-scope discovery and technical roadmap",
      "Legacy system migration and data cleansing",
      "Source code ownership handed to you",
    ],
  },
];
