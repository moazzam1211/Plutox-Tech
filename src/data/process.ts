import {
  Compass,
  FlaskConical,
  LifeBuoy,
  Map,
  PenTool,
  Rocket,
  Terminal,
} from "lucide-react";

import type { ProcessStep } from "@/types";

/** The seven-stage delivery process, rendered as an animated timeline. */
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We sit with the people who will actually use the software, map the current workflow and write down what success looks like in numbers.",
    icon: Compass,
    deliverables: ["Stakeholder workshops", "Process map", "Success metrics"],
  },
  {
    step: "02",
    title: "Planning",
    description:
      "Scope, architecture and a costed roadmap. You approve a fixed first milestone before any code is written — no open-ended estimates.",
    icon: Map,
    deliverables: ["Technical architecture", "Costed roadmap", "Risk register"],
  },
  {
    step: "03",
    title: "Design",
    description:
      "Wireframes to a clickable prototype in your own branding, tested with real users before engineering commits to it.",
    icon: PenTool,
    deliverables: ["Design system", "Clickable prototype", "Usability test notes"],
  },
  {
    step: "04",
    title: "Development",
    description:
      "Two-week sprints with a working demo at the end of every one. You see progress continuously instead of waiting for a big reveal.",
    icon: Terminal,
    deliverables: ["Sprint demos", "Code reviews", "Staging environment"],
  },
  {
    step: "05",
    title: "Testing",
    description:
      "Automated regression suites plus manual QA on real hardware — printers, scanners, scales and the tablets your staff will hold.",
    icon: FlaskConical,
    deliverables: ["Automated test suite", "Device QA matrix", "Load test report"],
  },
  {
    step: "06",
    title: "Deployment",
    description:
      "Data migration, staff training and a phased go-live. We stay on-site or on-call for the first week of live trading.",
    icon: Rocket,
    deliverables: ["Data migration", "Staff training", "Phased go-live plan"],
  },
  {
    step: "07",
    title: "Support",
    description:
      "24/7 monitored uptime, a named account engineer and a quarterly roadmap review to keep the system ahead of your growth.",
    icon: LifeBuoy,
    deliverables: ["24/7 monitoring", "Named engineer", "Quarterly roadmap review"],
  },
];
