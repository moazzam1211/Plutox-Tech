import {
  Boxes,
  Database,
  Flame,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  TestTube2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Founder profile.
 *
 * Kept in its own module so the name, photo and skill matrix can be edited in
 * one place without touching the section component.
 */
export interface SkillGroup {
  label: string;
  icon: LucideIcon;
  skills: string[];
}

export const founder = {
  name: "Moazzam Naveed",
  /** Shown under the name. */
  role: "Founder · Owner · CEO",
  /**
   * ───────────────────────────────────────────────────────────────────────
   *  DROP THE SUPPLIED PORTRAIT AT THIS EXACT PATH:
   *
   *    public/images/team/moazzam-naveed.jpg
   *
   *  Any aspect ratio works — the profile section crops to 4:5 with
   *  `object-cover`. If the file is absent the component falls back to the
   *  generated placeholder rather than showing a broken image.
   * ───────────────────────────────────────────────────────────────────────
   */
  photo: "/images/team/moazzam-naveed.jpg",
  /** Shown if the portrait above hasn't been added yet. */
  photoFallback: "/images/team/founder.svg",
  photoAlt: "Moazzam Naveed, Founder and CEO of Plutox Tech",

  /** Two short paragraphs — the section is a profile, not a CV. */
  bio: [
    "Plutox Tech started as one developer taking on work nobody else wanted to scope properly. Years of shipping — point of sale systems that survive a dinner rush, ERP migrations with twelve years of ledger data, Android apps used by field teams every day — turned that into a company.",
    "Still hands-on with the code. Every engagement gets a technical review from the founder before a line is written, and the same standard applies whether the client runs three outlets or three hundred.",
  ],

  /** Headline figures beside the portrait. */
  highlights: [
    { value: "4+", label: "Years building software" },
    { value: "100+", label: "Projects delivered" },
    { value: "7", label: "Disciplines, hands-on" },
  ],

  contact: {
    email: "moazzam@plutoxtech.com",
    linkedin: "https://www.linkedin.com/company/plutoxtech",
  },
} as const;

/**
 * Technical skill matrix, grouped by discipline.
 *
 * "Business Systems" and "AI & Automation" are deliberately separate groups
 * rather than extra tags under Web Development: POS, ERP and CRM are domain
 * expertise, not a framework, and they are the thing clients are actually
 * buying — burying them in a list of languages undersells them.
 */
export const founderSkills: SkillGroup[] = [
  {
    label: "Web Development",
    icon: Boxes,
    skills: [
      "Laravel",
      "PHP",
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript",
      "TypeScript",
      "Vue.js",
      "Node.js",
      "Express",
      ".NET",
      "API Integration",
    ],
  },
  {
    label: "App Development",
    icon: Smartphone,
    skills: ["Java", "Kotlin", "Android SDK"],
  },
  {
    // Firebase is broken out from App Development: it spans auth, hosting and
    // data, so listing it as one "Firebase Integration" tag hid three distinct
    // pieces of expertise behind a single word.
    label: "Firebase",
    icon: Flame,
    skills: [
      "Authentication",
      "Cloud Firestore",
      "Realtime Database",
      "Cloud Functions",
      "Cloud Messaging",
    ],
  },
  {
    label: "Databases",
    icon: Database,
    skills: ["DBMS", "SQL", "MongoDB"],
  },
  {
    label: "Business Systems",
    icon: LayoutDashboard,
    skills: ["POS Systems", "ERP", "CRM", "Inventory", "Payment Integration"],
  },
  {
    label: "AI & Automation",
    icon: Sparkles,
    skills: [
      "Claude",
      "AI Prompt Engineering",
      "LLM Integration",
      "Workflow Automation",
    ],
  },
  {
    label: "Quality Assurance",
    icon: TestTube2,
    skills: ["Selenium", "Test Automation"],
  },
];
