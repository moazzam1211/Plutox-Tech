import type { BlogPost, JobOpening } from "@/types";

/** Latest insights. `dateLabel` is pre-formatted to avoid a client date lib. */
export const blogPosts: BlogPost[] = [
  {
    slug: "offline-first-pos-architecture",
    title: "Offline-First POS: How We Keep Billing Alive Through an Outage",
    excerpt:
      "A practical breakdown of the local write-ahead log, deterministic IDs and conflict resolution rules that let a counter keep trading with no internet — and reconcile without duplicates.",
    category: "Engineering",
    readingTime: "9 min read",
    date: "2026-07-22",
    dateLabel: "22 Jul 2026",
    image: "/images/blog/offline-first.svg",
    author: { name: "Usman Ali", role: "Principal Engineer" },
  },
  {
    slug: "choosing-erp-vs-custom",
    title: "Off-the-Shelf ERP or Custom Build? A Decision Framework",
    excerpt:
      "Six questions that reliably predict which way an ERP decision should go, plus the total-cost model we walk clients through before recommending either path.",
    category: "Strategy",
    readingTime: "7 min read",
    date: "2026-06-30",
    dateLabel: "30 Jun 2026",
    image: "/images/blog/erp-decision.svg",
    author: { name: "Hira Malik", role: "Head of Delivery" },
  },
  {
    slug: "ai-demand-forecasting-retail",
    title: "What AI Demand Forecasting Actually Changed for a 9-Store Chain",
    excerpt:
      "The unglamorous version: data cleaning took longer than modelling, the first model was worse than the buyer's intuition, and the third one cut stockouts by 43%.",
    category: "AI & Data",
    readingTime: "11 min read",
    date: "2026-06-11",
    dateLabel: "11 Jun 2026",
    image: "/images/blog/ai-forecasting.svg",
    author: { name: "Zain Haider", role: "Lead Data Engineer" },
  },
  {
    slug: "core-web-vitals-for-saas",
    title: "Shipping a 98-Score Dashboard Without Giving Up Animation",
    excerpt:
      "How we budget JavaScript on interaction-heavy products: server components by default, motion isolated at the leaves, and a hard cap on what loads before first paint.",
    category: "Performance",
    readingTime: "8 min read",
    date: "2026-05-19",
    dateLabel: "19 May 2026",
    image: "/images/blog/web-vitals.svg",
    author: { name: "Ali Raza", role: "Frontend Architect" },
  },
];

/** Open roles surfaced on the careers page and CTA. */
export const jobOpenings: JobOpening[] = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Lahore / Remote",
    type: "Full-time",
    experience: "5+ years",
  },
  {
    title: "Flutter Mobile Engineer",
    department: "Mobile",
    location: "Lahore / Hybrid",
    type: "Full-time",
    experience: "3+ years",
  },
  {
    title: "Product Designer (UI/UX)",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
  },
  {
    title: "DevOps / Platform Engineer",
    department: "Infrastructure",
    location: "Lahore / Remote",
    type: "Full-time",
    experience: "4+ years",
  },
  {
    title: "Implementation Consultant (ERP)",
    department: "Delivery",
    location: "Lahore / On-site travel",
    type: "Full-time",
    experience: "3+ years",
  },
  {
    title: "QA Automation Engineer",
    department: "Quality",
    location: "Remote",
    type: "Contract",
    experience: "2+ years",
  },
];

/** Options shown in the contact form's service select. */
export const serviceOptions = [
  "POS Software Development",
  "Restaurant POS",
  "Mart & Retail POS",
  "Pharmacy POS",
  "Hotel Management System",
  "ERP Development",
  "CRM Development",
  "Web Development",
  "Mobile Application",
  "Desktop Application",
  "Cloud & DevOps",
  "AI Automation",
  "API & Integrations",
  "Custom Software",
  "Something else",
] as const;

/** Budget bands shown in the contact form. */
export const budgetOptions = [
  "Under $2,500",
  "$2,500 – $10,000",
  "$10,000 – $25,000",
  "$25,000 – $75,000",
  "$75,000+",
  "Not sure yet",
] as const;
