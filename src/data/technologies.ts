import type { Technology } from "@/types";

/**
 * The stack we build on.
 *
 * Rendered as monogram tiles rather than fetched brand SVGs — no third-party
 * asset requests, no trademark ambiguity, and the row stays perfectly on-grid
 * regardless of each vendor's logo aspect ratio.
 */
export const technologies: Technology[] = [
  { name: "React", mark: "Re", color: "#61DAFB", category: "Frontend" },
  { name: "Next.js", mark: "N", color: "#FFFFFF", category: "Frontend" },
  { name: "TypeScript", mark: "TS", color: "#3178C6", category: "Frontend" },
  { name: "Tailwind CSS", mark: "TW", color: "#38BDF8", category: "Frontend" },
  { name: "Vue.js", mark: "Vue", color: "#42B883", category: "Frontend" },
  { name: "Framer Motion", mark: "FM", color: "#E64BFF", category: "Frontend" },
  { name: "Node.js", mark: "No", color: "#5FA04E", category: "Backend" },
  { name: "Express", mark: "Ex", color: "#8CC84B", category: "Backend" },
  { name: "Laravel", mark: "La", color: "#FF2D20", category: "Backend" },
  { name: "PHP", mark: "PHP", color: "#777BB4", category: "Backend" },
  { name: ".NET / ASP.NET", mark: ".NET", color: "#512BD4", category: "Backend" },
  { name: "Python", mark: "Py", color: "#FFD343", category: "Backend" },
  { name: "Flutter", mark: "Fl", color: "#54C5F8", category: "Mobile" },
  { name: "Firebase", mark: "Fb", color: "#FFCA28", category: "Mobile" },
  { name: "MongoDB", mark: "Mo", color: "#47A248", category: "Database" },
  { name: "MySQL", mark: "My", color: "#00758F", category: "Database" },
  { name: "PostgreSQL", mark: "Pg", color: "#4169E1", category: "Database" },
  { name: "Redis", mark: "Rd", color: "#FF4438", category: "Database" },
  { name: "Docker", mark: "Dk", color: "#2496ED", category: "DevOps" },
  { name: "Kubernetes", mark: "K8s", color: "#326CE5", category: "DevOps" },
  { name: "GitHub", mark: "Gh", color: "#F0F6FC", category: "DevOps" },
  { name: "AWS", mark: "AWS", color: "#FF9900", category: "Cloud" },
  { name: "Azure", mark: "Az", color: "#0078D4", category: "Cloud" },
  { name: "Vercel", mark: "▲", color: "#FFFFFF", category: "Cloud" },
  { name: "Claude", mark: "Cl", color: "#D97757", category: "AI" },
  { name: "Prompt Engineering", mark: "AI", color: "#8B5CF6", category: "AI" },
];

/** Client wordmarks for the logo wall (placeholder brands). */
export const clients = [
  "Zameer Group",
  "MartOne Retail",
  "CareWell",
  "Serai Resorts",
  "Noor Traders",
  "Hydra Beverages",
  "Meridian Health",
  "Ravi Logistics",
  "Bluepeak Foods",
  "Orbit Telecom",
] as const;
