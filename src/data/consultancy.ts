import {
  Banknote,
  BookOpenCheck,
  Boxes,
  Building,
  ChefHat,
  ClipboardCheck,
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
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Consultancy content for /services.
 *
 * Two things are modelled here, and they are deliberately separate:
 *
 * 1. `consultancyPrograms` — the three end-to-end engagements: POS, cloud
 *    kitchen and food business. Each is a sequence of phases with named
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
          "ServeSync ERP configured for a delivery-only operation — kitchen display, rider dispatch, zones and a QR menu for direct orders — plus Foodpanda connected as a first-class channel so aggregator orders land in the same queue instead of being re-keyed off a tablet.",
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
      "ServeSync ERP, kitchen display, rider app and QR menu",
      "Foodpanda integration so aggregator orders skip the tablet",
      "Soft launch, full launch and a monthly review after it",
    ],
    timeline: "8–14 weeks from first meeting to first order, site depending",
    outcome:
      "A kitchen taking orders on every channel through one queue, with a P&L you can read daily and a menu you know the margin on.",
  },

  /* ------------------------------------------------------------------ */
  /* Food business consultancy                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "food-business",
    name: "Food Business Consultancy",
    tagline: "Open the restaurant, café or QSR — and still be trading in year three",
    audience:
      "Dine-in restaurants, cafés and coffee shops, QSR and takeaway counters, bakeries and dessert parlours, food-court units, and groups opening their second, fifth or twentieth outlet. Delivery-only operators are better served by the Cloud Kitchen Setup programme above",
    summary:
      "Most food businesses do not close because the food was bad. They close because the rent was too high for the covers the site could ever do, the menu was never costed, and nobody knew the daily numbers until the money had already gone. We run the whole project — concept, feasibility, site, licences, layout, equipment, menu, systems, hiring, launch — and we say no early when the numbers do not work, which is the cheapest advice you will ever get.",
    icon: UtensilsCrossed,
    brandColor: "#D97706",
    phases: [
      {
        title: "Concept & feasibility",
        detail:
          "Format, cuisine, price point and service model decided together rather than assumed: a 40-cover trattoria, a 12-seat speciality café and a QSR counter are three different businesses. We build the unit economics — covers per day, average ticket, food cost, rent, staff, utilities — and give you the break-even before you sign anything.",
        deliverables: [
          "Unit-economics model with break-even covers",
          "Format and service-model recommendation",
          "Go / no-go call, in writing",
        ],
      },
      {
        title: "Brand & positioning",
        detail:
          "Name, identity, menu design, packaging, signage and the photography your listings and social accounts will live on. A café and a QSR chain are read by customers in seconds, and most of that reading happens before anyone tastes anything.",
        deliverables: [
          "Brand identity and menu design",
          "Packaging and signage artwork",
          "Food photography and launch social kit",
        ],
      },
      {
        title: "Site selection & lease",
        detail:
          "Footfall counted at the hours you will actually trade, not on a Sunday afternoon. Catchment, visibility, parking, service access, power and the rent-to-revenue ratio your model can carry — then a read of the lease terms before you commit to five years of them.",
        deliverables: [
          "Site scorecard for each shortlisted unit",
          "Footfall and catchment assessment",
          "Rent-to-revenue check and lease review notes",
        ],
      },
      {
        title: "Licensing & compliance",
        detail:
          "Business registration, NTN, sales-tax registration, the food authority licence, hygiene and health requirements, signage NOC and music licensing where it applies. We prepare the checklist and the document pack; you or your lawyer sign and file them.",
        deliverables: [
          "Licence and registration checklist",
          "Document pack ready for submission",
          "Renewal and inspection calendar",
        ],
      },
      {
        title: "Layout, kitchen & fit-out",
        detail:
          "Seating plan sized to the covers in your model, then the back of house designed around it — prep, cook, plating, wash-up, cold and dry storage, and a counter or bar that does not become the bottleneck at peak. Service flow is planned so staff and guests never cross.",
        deliverables: [
          "Seating plan and cover count",
          "Kitchen line and service-flow layout",
          "Fit-out scope your contractor can price",
        ],
      },
      {
        title: "Equipment & hardware",
        detail:
          "Cooking line, refrigeration, storage, extraction and — for cafés — the espresso setup and grinders that decide your cup quality. Alongside it the technology: POS terminals, kitchen display, thermal printers, customer-facing screen and the tablets for the floor.",
        deliverables: [
          "Costed equipment schedule with lead times",
          "Technology hardware list",
          "Supplier shortlist and warranty terms",
        ],
      },
      {
        title: "Menu engineering & suppliers",
        detail:
          "Every dish costed to the gram with recipes loaded into the system so stock depletes as you sell, portions standardised so the tenth plate matches the first, and items ranked by margin and popularity. Supplier terms agreed and opening stock counted in.",
        deliverables: [
          "Costed recipe cards and portion standards",
          "Menu margin and popularity ranking",
          "Supplier terms and counted opening stock",
        ],
      },
      {
        title: "Systems & channels",
        detail:
          "ServeSync ERP configured for your format — live floor plan and table service for dine-in, a fast counter flow for QSR, kitchen display, QR self-order, delivery zones and riders, loyalty, and Foodpanda arriving in the same queue instead of on a separate tablet.",
        deliverables: [
          "Configured POS, floor plan and kitchen display",
          "Delivery, QR ordering and aggregator setup",
          "Reports, tax rules and fiscal invoicing",
        ],
      },
      {
        title: "Hiring & training",
        detail:
          "Front and back of house roles defined, a shift roster sized to your forecast covers, and service standards written down rather than assumed. Then training by role — floor staff on the pad and the table plan, kitchen on the display, managers on close and reports.",
        deliverables: [
          "Role definitions and shift roster",
          "Service standards and SOPs",
          "Trained team, signed off by role",
        ],
      },
      {
        title: "Soft launch & launch",
        detail:
          "Friends and family, then a limited menu at limited covers, with ticket times and service gaps measured while the volume is survivable. The fix list is closed before the full launch — the opening week is when reviews are written, and they are permanent.",
        deliverables: [
          "Soft-launch plan and cover caps",
          "Ticket-time and service-gap log",
          "Fix list closed, then launch marketing live",
        ],
      },
      {
        title: "Run, review & scale",
        detail:
          "Monthly review against the model built in phase one: margin by item, waste, labour percentage, covers by daypart, repeat rate. When the outlet is proven, the same configuration and playbook are repeated so the second opening takes days rather than months.",
        deliverables: [
          "Monthly P&L and menu review",
          "Waste and labour-cost actions",
          "Second-outlet playbook and rollout plan",
        ],
      },
    ],
    includes: [
      "Unit economics and a break-even cover count before you sign a lease",
      "Brand, menu design, packaging and launch photography",
      "Site scorecard, footfall assessment and lease review notes",
      "Licensing checklist and document pack",
      "Seating plan, kitchen layout and a fit-out scope for your contractor",
      "Costed equipment schedule and the POS hardware alongside it",
      "Recipes costed to the gram and loaded into the system",
      "ServeSync ERP configured for your format, with delivery and Foodpanda",
      "Role-based hiring, rosters and staff training",
      "Soft launch, full launch, and a monthly review after it",
    ],
    timeline:
      "10–16 weeks from first meeting to opening, site and fit-out depending",
    outcome:
      "An outlet that opens on plan, a menu you know the margin on, a team that runs service without you on the floor, and numbers you read monthly instead of discovering annually.",
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
