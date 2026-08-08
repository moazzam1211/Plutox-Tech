import {
  Banknote,
  BookOpenCheck,
  Boxes,
  Building,
  ChefHat,
  ClipboardCheck,
  Compass,
  CreditCard,
  FileCheck2,
  GraduationCap,
  LifeBuoy,
  Rocket,
  Ruler,
  ScanLine,
  Store,
  TrendingUp,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Consultancy content for /services.
 *
 * Two things are modelled here, and they are deliberately separate:
 *
 * 1. `consultancyPrograms` — the three end-to-end engagements: POS, cloud
 *    kitchen and software projects. Each is a sequence of phases with named
 *    deliverables, because "consultancy" with no deliverable list is
 *    indistinguishable from a conversation.
 * 2. `launchJourney` — the ten stages of opening a business, with an explicit
 *    `owner` on every one. That column matters: a software house cannot sign a
 *    lease or hold a food licence for a client, and saying so in the data keeps
 *    the page honest rather than implying we do everything ourselves.
 */

export interface ConsultancyPhase {
  title: string;
  detail: string;
  /** Named artefacts handed over at the end of the phase. */
  deliverables: string[];
}

export interface ConsultancyProgram {
  slug: string;
  name: string;
  tagline: string;
  /** Who the engagement is for, in plain words. */
  audience: string;
  summary: string;
  icon: LucideIcon;
  /** Accent taken from the product this programme most often deploys. */
  brandColor: string;
  phases: ConsultancyPhase[];
  /** Everything bundled into the engagement, regardless of phase. */
  includes: string[];
  timeline: string;
  outcome: string;
}

export const consultancyPrograms: ConsultancyProgram[] = [
  /* ------------------------------------------------------------------ */
  /* POS system consultancy                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "pos-consultancy",
    name: "POS System Consultancy",
    tagline: "The right till, configured for how you actually trade",
    audience:
      "Restaurants, cafés, supermarkets, pharmacies, hotels and multi-branch groups — whether you are opening your first outlet or replacing a system that has stopped keeping up",
    summary:
      "Most POS projects fail on configuration, not software. We start with how your counter actually works — who rings up, who voids, what the tax rules are, what happens when the internet drops — and only then choose and configure the system. You end up with a till your staff can run on day one, books that reconcile, and invoices your tax authority accepts.",
    icon: CreditCard,
    brandColor: "#33BCA8",
    phases: [
      {
        title: "Counter audit",
        detail:
          "We sit through a live service — a full shift, at your busiest hour — and map what really happens: order flow, who overrides what, where the queue builds, how cash is handled, what gets written on paper because the system can't do it.",
        deliverables: [
          "Current-state workflow map",
          "Bottleneck and leakage report",
          "Role and permission matrix",
        ],
      },
      {
        title: "System selection & scoping",
        detail:
          "An honest recommendation on which platform fits — one of ours where it genuinely suits, and something else where it doesn't. Scoped against branch count, item count, tax regime, offline risk and the integrations you already depend on.",
        deliverables: [
          "Platform recommendation with reasoning",
          "Total cost of ownership over three years",
          "Module and integration scope",
        ],
      },
      {
        title: "Hardware specification",
        detail:
          "Terminals, thermal printers, cash drawers, barcode scanners, weighing scales, kitchen displays, customer-facing screens and network — specified to a budget, with models we have actually deployed rather than a generic list.",
        deliverables: [
          "Itemised hardware list with budget tiers",
          "Counter and kitchen layout plan",
          "Network and power requirements",
        ],
      },
      {
        title: "Fiscal & tax setup",
        detail:
          "Registration and integration with the tax authority your business reports to — PRA in Punjab, FBR federally — so paid invoices are fiscalised automatically and receipts carry the official invoice number and QR code.",
        deliverables: [
          "Fiscal registration and integration",
          "Tax rules by payment method",
          "Compliant receipt and invoice templates",
        ],
      },
      {
        title: "Data migration & configuration",
        detail:
          "Your menu or catalogue, suppliers, customers, opening stock and outstanding balances moved in and reconciled — then modifiers, recipes, discounts, promotions, loyalty tiers and user roles configured against the audit from phase one.",
        deliverables: [
          "Migrated and reconciled master data",
          "Configured modifiers, taxes and discounts",
          "Opening stock count",
        ],
      },
      {
        title: "Staff training",
        detail:
          "Hands-on sessions by role, not one long session for everyone: cashiers on billing and returns, kitchen on the display, managers on reports and voids, owners on the branch view. Plus a printed quick-reference card that lives at the counter.",
        deliverables: [
          "Role-based training sessions",
          "Counter quick-reference cards",
          "Recorded walkthroughs for new hires",
        ],
      },
      {
        title: "Go-live & hypercare",
        detail:
          "We are on site or on call for the first live services, when the real problems appear. Parallel running where the risk warrants it, and every issue logged and closed before we hand over.",
        deliverables: [
          "Supervised go-live",
          "Two weeks of hypercare support",
          "Closed issue log and handover note",
        ],
      },
    ],
    includes: [
      "A written recommendation you own, whichever platform you choose",
      "Hardware sourced to spec, or a list you can buy against yourself",
      "PRA / FBR fiscal registration and integration",
      "Data migration from spreadsheets or your previous system",
      "Role-based staff training and reference material",
      "Two weeks of hypercare after go-live, then ongoing support",
    ],
    timeline: "3–6 weeks for a single outlet, 8–12 for a multi-branch rollout",
    outcome:
      "A till your staff run without calling you, books that reconcile at close, and tax invoices that do not get rejected.",
  },

  /* ------------------------------------------------------------------ */
  /* Cloud kitchen consultancy                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "cloud-kitchen",
    name: "Cloud Kitchen Setup",
    tagline: "From an idea to first order — and then to a kitchen that runs itself",
    audience:
      "First-time founders opening a delivery-only kitchen, restaurants adding a delivery brand, and operators running several virtual brands out of one kitchen",
    summary:
      "A cloud kitchen is a different business from a restaurant: no dining room, no walk-ins, and margins decided by packaging, aggregator commission and rider time rather than table turns. We take you from the first spreadsheet to a kitchen where tickets print, riders get dispatched and the P&L is visible daily — and we are candid about the numbers before you sign a lease.",
    icon: ChefHat,
    brandColor: "#8b5cf6",
    phases: [
      {
        title: "Concept & feasibility",
        detail:
          "Cuisine, positioning and price point tested against what already delivers in your target radius. We build the unit economics — food cost, packaging, aggregator commission, rider cost, rent, staff — and show you the break-even order count before anything is committed.",
        deliverables: [
          "Unit-economics model with break-even",
          "Delivery-radius and competitor scan",
          "Go / no-go recommendation",
        ],
      },
      {
        title: "Registration & licensing",
        detail:
          "The paperwork mapped end to end: business registration, NTN, sales-tax registration, and the food authority licence your city requires. We prepare the checklist and the documents; you or your lawyer sign them.",
        deliverables: [
          "Licence and registration checklist",
          "Document pack ready for submission",
          "Renewal calendar",
        ],
      },
      {
        title: "Location & kitchen layout",
        detail:
          "A delivery kitchen is chosen on rider access, not footfall. We assess shortlisted sites for access, power, ventilation, drainage and storage, then lay out the line so that prep, cook, pack and pickup flow in one direction and never cross.",
        deliverables: [
          "Site assessment for each shortlisted unit",
          "Kitchen line layout and pickup-window plan",
          "Fit-out scope for your contractor",
        ],
      },
      {
        title: "Equipment & hardware",
        detail:
          "Cooking line, refrigeration, storage and packaging specified against your menu and volume — with the technology alongside it: POS terminal, kitchen display, thermal printers, and phones for the rider app.",
        deliverables: [
          "Costed equipment schedule",
          "Technology hardware list",
          "Supplier shortlist and lead times",
        ],
      },
      {
        title: "Menu engineering",
        detail:
          "Every dish costed to the gram, with recipes built into the system so stock depletes as you sell. Items are ranked by margin and popularity, and anything that travels badly is reworked or cut before launch, not after the reviews.",
        deliverables: [
          "Recipe cards with costed ingredients",
          "Menu margin ranking",
          "Packaging spec per item",
        ],
      },
      {
        title: "Systems & aggregator onboarding",
        detail:
          "ServeSync POS configured for a delivery-only operation — kitchen display, rider dispatch, zones and a QR menu for direct orders — plus Foodpanda connected as a first-class channel so aggregator orders land in the same queue instead of being re-keyed off a tablet.",
        deliverables: [
          "Configured POS, KDS and rider app",
          "Foodpanda channel integration and SKU mapping",
          "Delivery zones, charges and rider assignment",
        ],
      },
      {
        title: "Hiring & training",
        detail:
          "Role definitions and a shift plan sized to your forecast volume, then training for the whole team: kitchen on the display and ticket flow, packers on the spec, riders on the app, and the manager on daily close.",
        deliverables: [
          "Role definitions and shift roster",
          "Standard operating procedures",
          "Trained team, signed off",
        ],
      },
      {
        title: "Soft launch",
        detail:
          "A deliberately limited opening — a short menu, a small radius, real orders — to find what breaks while the volume is survivable. Ticket times, packaging failures and stockouts are measured and fixed before you open properly.",
        deliverables: [
          "Soft-launch plan and order caps",
          "Ticket-time and failure log",
          "Fix list closed before full launch",
        ],
      },
      {
        title: "Launch",
        detail:
          "Full menu, full radius, aggregator listings live and promotions loaded. Brand, photography and listing copy done properly, because on a delivery app the photograph is the shopfront.",
        deliverables: [
          "Live aggregator listings",
          "Menu photography and listing copy",
          "Launch promotions configured",
        ],
      },
      {
        title: "Run & optimise",
        detail:
          "Monthly review against the model built in phase one: margin by item, waste, ticket time, repeat rate, aggregator commission versus direct orders. Then we change the menu, the pricing or the process — and we keep the software running underneath it.",
        deliverables: [
          "Monthly performance review",
          "Menu and pricing adjustments",
          "Ongoing support and updates",
        ],
      },
    ],
    includes: [
      "Unit economics before you commit to a lease",
      "Licensing checklist and document pack",
      "Kitchen layout and costed equipment schedule",
      "Recipes costed to the gram, loaded into the system",
      "ServeSync POS, kitchen display, rider app and QR menu",
      "Foodpanda integration so aggregator orders skip the tablet",
      "Soft launch, full launch and a monthly review after it",
    ],
    timeline: "8–14 weeks from first meeting to first order, site depending",
    outcome:
      "A kitchen taking orders on every channel through one queue, with a P&L you can read daily and a menu you know the margin on.",
  },

  /* ------------------------------------------------------------------ */
  /* Project consultancy                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "project-consultancy",
    name: "Project Consultancy",
    tagline: "Decide what to build, and what it will really cost, before you commit",
    audience:
      "Businesses about to commission custom software, teams whose project has stalled or overrun, and anyone holding three vendor quotes that are impossible to compare",
    summary:
      "Most software money is lost before a line of code is written — on a scope nobody wrote down, a quote nobody could compare, and a decision to build something that already existed off the shelf. We do the thinking first: what the software has to do, whether it should be built at all, what it will genuinely cost and how long it will take. You get a specification and an estimate you own outright — and you are free to hand them to any developer, including one who isn't us.",
    icon: Compass,
    brandColor: "#004AAD",
    phases: [
      {
        title: "Discovery & requirements",
        detail:
          "Interviews with the people who will actually use the software and the people who will pay for it, then the current process mapped as it is rather than as the org chart says it is. Requirements are written down and ranked — must, should, could, won't — so the argument about priority happens now and not in month four.",
        deliverables: [
          "Stakeholder interviews and process map",
          "Prioritised requirements document",
          "Success metrics with numbers attached",
        ],
      },
      {
        title: "Feasibility & build-vs-buy",
        detail:
          "The uncomfortable question asked properly: does this need building? We price the custom build against the off-the-shelf products that already do most of it, including ours, and against doing nothing. Sometimes the honest answer is a configured product and two integrations, and we would rather say that than take the larger contract.",
        deliverables: [
          "Build, buy or configure recommendation",
          "Off-the-shelf options priced and compared",
          "Cost of doing nothing",
        ],
      },
      {
        title: "Solution architecture",
        detail:
          "How the system is put together and why: data model, integrations, hosting, offline behaviour, security and the concurrency it has to survive. Written for a technical reader but explained for a non-technical one, because you are the person who has to live with the consequences.",
        deliverables: [
          "Architecture and data model",
          "Integration and hosting plan",
          "Security and access-control design",
        ],
      },
      {
        title: "Scope, estimate & roadmap",
        detail:
          "Every requirement broken into work you can actually schedule, with ranged estimates rather than a single optimistic number, and the assumptions behind each one written down. Phased so that something useful ships early instead of everything landing at the end.",
        deliverables: [
          "Itemised scope with ranged estimates",
          "Phased roadmap with a defined first release",
          "Written assumptions and risk register",
        ],
      },
      {
        title: "Vendor selection & tender",
        detail:
          "If you are not building with us, we turn the specification into a tender pack, help you shortlist, sit in on the technical interviews and score the responses against the same criteria. Quotes stop being incomparable once every vendor is answering the same document.",
        deliverables: [
          "Tender pack built from the specification",
          "Vendor scorecard and shortlist",
          "Contract and milestone review",
        ],
      },
      {
        title: "Delivery governance",
        detail:
          "Someone technical on your side of the table for the length of the build. We review what is actually shipped against what was promised each sprint, read the code where it matters, and flag scope creep and slipping timelines while there is still room to correct them.",
        deliverables: [
          "Sprint reviews against agreed scope",
          "Code and architecture spot-checks",
          "Fortnightly status report in plain English",
        ],
      },
      {
        title: "Quality assurance & UAT",
        detail:
          "Test cases written from the requirements document, not from the software that got built — that distinction is the whole point. Functional, load and security testing, then user-acceptance sessions run with your staff so problems surface before go-live rather than during it.",
        deliverables: [
          "Test plan traced to requirements",
          "Defect log with severity and owner",
          "Signed user-acceptance record",
        ],
      },
      {
        title: "Handover & knowledge transfer",
        detail:
          "The end of a project should not be the start of a dependency. Source code, credentials, deployment instructions and documentation transferred into your ownership, with your team walked through running it — whether we built it or somebody else did.",
        deliverables: [
          "Source, credentials and infrastructure handover",
          "Technical and user documentation",
          "Team training and support plan",
        ],
      },
    ],
    includes: [
      "A written specification and estimate you own outright",
      "An honest build-vs-buy call, even when buying is worth less to us",
      "Architecture designed for the load and the offline behaviour you need",
      "Ranged estimates with the assumptions written down, not one hopeful figure",
      "Tender pack and vendor scoring if you build with someone else",
      "Technical oversight for the length of the build",
      "Test plans traced to requirements, and UAT run with your staff",
      "Full handover — code, credentials, documentation and training",
    ],
    timeline:
      "2–4 weeks for discovery through to estimate; governance runs for the length of the build",
    outcome:
      "A specification precise enough to quote against, an estimate you can budget from, and no vendor holding your source code hostage.",
  },
];

/* ------------------------------------------------------------------ */
/* The whole journey, stage by stage                                  */
/* ------------------------------------------------------------------ */

export interface JourneyStage {
  title: string;
  detail: string;
  /** Who does the work. Being explicit here keeps the offer honest. */
  owner: "Plutox" | "Plutox + you" | "You, with our checklist";
  icon: LucideIcon;
}

/**
 * Opening a business, from nothing to trading — the stages both programmes run
 * through. The `owner` column is the point of the table: it says plainly where
 * we do the work, where we do it with you, and where we can only hand you a
 * checklist because the signature has to be yours.
 */
export const launchJourney: JourneyStage[] = [
  {
    title: "Feasibility & business plan",
    detail:
      "Market, pricing, unit economics and break-even, modelled before any money is spent. If the numbers do not work, we say so at this stage rather than the next one.",
    owner: "Plutox",
    icon: TrendingUp,
  },
  {
    title: "Registration, licensing & tax",
    detail:
      "Business registration, NTN, sales-tax registration and the sector licence you need. We prepare the checklist and the pack; the filing is yours to sign.",
    owner: "You, with our checklist",
    icon: FileCheck2,
  },
  {
    title: "Location & fit-out",
    detail:
      "Site assessment against the things that actually matter for your model, a layout that keeps the workflow moving in one direction, and a fit-out scope your contractor can price.",
    owner: "Plutox + you",
    icon: Ruler,
  },
  {
    title: "Equipment & hardware",
    detail:
      "Everything from the cooking line or shelving through to terminals, printers, scanners and displays — costed, with lead times, so nothing arrives the week after opening.",
    owner: "Plutox + you",
    icon: Boxes,
  },
  {
    title: "Software & systems",
    detail:
      "POS, inventory, accounting, HR and the channels you sell through, configured as one system rather than five that need re-keying between them.",
    owner: "Plutox",
    icon: ScanLine,
  },
  {
    title: "Catalogue, menu & pricing",
    detail:
      "Every item costed, recipes linked to stock, margins ranked, and prices set from the model rather than from what the shop down the road charges.",
    owner: "Plutox + you",
    icon: BookOpenCheck,
  },
  {
    title: "Suppliers & opening stock",
    detail:
      "Supplier terms, purchase orders, goods-received flow and a counted opening stock, so your first day's valuation is real and not an estimate.",
    owner: "Plutox + you",
    icon: Truck,
  },
  {
    title: "Hiring & training",
    detail:
      "Roles, shift plan and standard operating procedures, then role-based training on the system for everyone who will touch it.",
    owner: "Plutox + you",
    icon: GraduationCap,
  },
  {
    title: "Soft launch & launch",
    detail:
      "A limited opening to find the failures at survivable volume, the fix list closed, then the full launch with listings, promotions and photography ready.",
    owner: "Plutox + you",
    icon: Rocket,
  },
  {
    title: "Run smoothly",
    detail:
      "Monthly reviews against the original model, software support and updates, and changes to the menu, pricing or process when the figures say so.",
    owner: "Plutox",
    icon: LifeBuoy,
  },
];

/* ------------------------------------------------------------------ */
/* How an engagement is structured                                    */
/* ------------------------------------------------------------------ */

export const engagementModels = [
  {
    title: "Advisory",
    detail:
      "A fixed-scope audit and written recommendation. You take the report and execute it yourself, with whichever vendor you choose. No lock-in and no obligation to build with us.",
    icon: ClipboardCheck,
  },
  {
    title: "Turnkey setup",
    detail:
      "We run the whole programme end to end — audit, selection, hardware, configuration, migration, training and go-live — and hand over a business that is trading.",
    icon: Store,
  },
  {
    title: "Retained support",
    detail:
      "A monthly arrangement after launch: software support and updates, a performance review against the original model, and changes made as the business grows.",
    icon: Banknote,
  },
  {
    title: "Multi-branch rollout",
    detail:
      "One outlet proven, then repeated. A branch playbook, a central warehouse and reporting configured so the tenth opening takes days rather than weeks.",
    icon: Building,
  },
];
