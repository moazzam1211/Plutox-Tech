import {
  BarChart3,
  Boxes,
  ClipboardList,
  Globe,
  LayoutDashboard,
  Monitor,
  ShoppingBag,
  Truck,
  Users2,
  Wallet,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { products } from "./products";

/**
 * The modules we build, listed on /products.
 *
 * These are not aspirational: every one already ships inside at least one of the
 * platforms on /projects, and `shippedIn` names them — down to the ServeSync
 * edition where a module is edition-specific. That is the whole point
 * of the page — a buyer wants a module list, and this one can be checked against
 * working software rather than taken on trust.
 */
export interface ProductModule {
  slug: string;
  name: string;
  summary: string;
  icon: LucideIcon;
  /** What you actually get. Kept short — the detail lives on /projects. */
  capabilities: string[];
  /** Products that already run this module, as `#slug` anchors on /projects. */
  shippedIn: { name: string; slug: string }[];
  /**
   * Captures that illustrate the module, referenced as `[productSlug, screenLabel]`
   * into `products.ts` rather than copied. Empty is allowed — a module with nothing
   * captured yet says so instead of borrowing another product's screens.
   *
   * Referencing means the caption and the file path have exactly one home, so they
   * cannot drift apart — and `moduleScreens` throws at build time if a label is
   * renamed, instead of the page quietly rendering a shorter gallery.
   */
  screens: [string, string][];
}

const SERVESYNC = { name: "ServeSync ERP", slug: "servesync-pos" };
const SERVESYNC_WEB = { name: "ServeSync Web", slug: "servesync-pos" };
const SERVESYNC_RX = { name: "ServeSync Pharmacy", slug: "servesync-pos" };
const SERVESYNC_MART = { name: "ServeSync Mart", slug: "servesync-pos" };
const STAYSYNC = { name: "StaySync Hotel ERP", slug: "staysync" };
const FLEETFLOW = { name: "Fleet Flow", slug: "fleet-flow" };

export const productModules: ProductModule[] = [
  {
    slug: "restaurant-website",
    name: "Restaurant Website",
    summary:
      "A customer-facing website wired to your POS rather than a copy of it. The menu, prices, availability, delivery zones and every order come from the till over its API — so there is one catalogue, not two that drift apart by Friday.",
    icon: Globe,
    capabilities: [
      "Menu, prices, availability and delivery fees read live from the POS",
      "Checkout for delivery, pickup or dine-in, with promo codes and scheduling",
      "\"Use my location\" ranks branches by their POS delivery zones and picks the nearest",
      "Table QR codes open checkout on dine-in with the table pre-filled",
      "Admin panel signed in with a POS PIN, validated on every request",
      "Four layouts and four palettes, plus reservations, gallery, journal and careers",
      "Installable PWA with an offline shell, Restaurant JSON-LD and a sitemap",
      "Admin order list with a printable bill per order",
    ],
    shippedIn: [SERVESYNC_WEB],
    // No captures yet — the site has no screenshot set in its repo, and borrowing
    // POS screens to fill the gallery would misrepresent what it looks like.
    screens: [],
  },
  {
    slug: "online-ordering",
    name: "Online Ordering",
    summary:
      "Take orders from a QR code on the table, a phone, or an aggregator — all landing in the same queue as the counter, so nothing is re-keyed off a second tablet.",
    icon: ShoppingBag,
    capabilities: [
      "QR self-order menu with its own per-device theme, cart and checkout",
      "Dine-in, takeaway and delivery as first-class order types",
      "Foodpanda orders arriving through a secret-gated webhook with SKU mapping",
      "Guest order-tracking page linked from the confirmation",
      "Promo codes and loyalty redemption applied at checkout",
    ],
    shippedIn: [SERVESYNC],
    screens: [
      ["servesync-pos", "New Order"],
      ["servesync-pos", "Add-ons"],
      ["servesync-pos", "Foodpanda"],
      ["servesync-pos", "Waiter Pad"],
      ["servesync-pos", "Orders"],
      ["staysync", "Room Service POS"],
    ],
  },
  {
    slug: "kds",
    name: "Kitchen Display (KDS)",
    summary:
      "Tickets on a screen instead of a printer, so the pass always shows the true state of every order and nobody works from a curling slip.",
    icon: Monitor,
    capabilities: [
      "Live tickets per station with bump and recall",
      "86-items marked unavailable straight from the pass",
      "KOT notes and per-item modifiers shown on the ticket",
      "Cross-branch view for the owner",
      "Charge-to-room room-service tickets for hotel kitchens",
    ],
    shippedIn: [SERVESYNC, STAYSYNC],
    screens: [
      ["servesync-pos", "Kitchen Display"],
      ["servesync-pos", "Floor Plan"],
      ["servesync-pos", "Till & Shift"],
      ["staysync", "Room Service POS"],
    ],
  },
  {
    slug: "rider-management",
    name: "Rider Management",
    summary:
      "Dispatch, track and settle with the people actually carrying the order — from a single restaurant rider to a fleet of trucks on a dispatch board.",
    icon: Truck,
    capabilities: [
      "Phone-login rider app: assigned deliveries, navigate, call, status updates",
      "Delivery zones, charges and rider assignment",
      "Live map plotting with geocoding and customer GPS share",
      "Drag-and-drop dispatch board that refuses to double-book",
      "Conflict detection before assignment, with the override reason recorded",
    ],
    shippedIn: [SERVESYNC, FLEETFLOW],
    screens: [
      ["servesync-pos", "Delivery"],
      ["fleet-flow", "Dispatch Board"],
      ["fleet-flow", "Live Tracking"],
      ["fleet-flow", "Trips"],
      ["fleet-flow", "Trip Detail"],
      ["fleet-flow", "Drivers"],
    ],
  },
  {
    slug: "staff-management",
    name: "Staff Management",
    summary:
      "Who can do what, who was on shift, and what they are owed — with permissions the server enforces rather than the sidebar merely hiding.",
    icon: Users2,
    capabilities: [
      "PIN or password login with ranked roles and an access-control matrix",
      "190 granular permissions across 15 groups, resolved from cache so a revoked role bites immediately",
      "Attendance, payroll runs, advances and leaves",
      "Per-branch teams that stay separate instead of merging into one list",
      "Printable salary slips itemising earnings, deductions and net",
    ],
    shippedIn: [SERVESYNC, SERVESYNC_RX, SERVESYNC_MART, STAYSYNC, FLEETFLOW],
    screens: [
      ["servesync-pos", "HR"],
      ["servesync-pos", "Staff"],
      ["fleet-flow", "Payroll"],
      ["fleet-flow", "Settings"],
    ],
  },
  {
    slug: "inventory-management",
    name: "Inventory Management",
    summary:
      "Stock that depletes as you sell, valued correctly, and loud about what is about to expire — because the alternative is finding out at stocktake.",
    icon: Boxes,
    capabilities: [
      "Batches with expiry and first-expiry-first-out allocation",
      "Recipes linked to ingredients, with live 'makeable' counts",
      "FIFO / LIFO valuation, adjustments, write-offs and transfers",
      "Low-stock, near-expiry and expired alerts with reorder points",
      "Aisle, shelf and rack locations, plus Excel export",
    ],
    shippedIn: [SERVESYNC, SERVESYNC_RX, SERVESYNC_MART, STAYSYNC, FLEETFLOW],
    screens: [
      ["servesync-pos", "Medicine Master"],
      ["servesync-pos", "Batches (FEFO)"],
      ["servesync-pos", "Expiry"],
      ["servesync-pos", "Retail Inventory"],
      ["servesync-pos", "Inventory"],
      ["fleet-flow", "Parts Inventory"],
    ],
  },
  {
    slug: "warehouse-management",
    name: "Warehouse Management",
    summary:
      "A central store behind the shop floor, so branches request stock instead of buying their own and nobody reconciles two sets of numbers.",
    icon: Warehouse,
    capabilities: [
      "Central stock held separately from sellable store stock",
      "Branch demands → dispatch → receive, with goods-received notes",
      "Transfer to store that creates a sellable batch",
      "Per-SKU levels against a reorder point, with a full movement log",
      "Purchase orders → GRN → automatic stock-in and supplier payable",
    ],
    shippedIn: [SERVESYNC, SERVESYNC_MART, SERVESYNC_RX],
    screens: [
      ["servesync-pos", "Warehouse"],
      ["servesync-pos", "Demand Planning"],
      ["servesync-pos", "Retail Warehouse"],
      ["servesync-pos", "Stock In"],
      ["servesync-pos", "Purchases"],
      ["servesync-pos", "Purchasing"],
    ],
  },
  {
    slug: "analytics-and-reports",
    name: "Analytics & Reports",
    summary:
      "The figures that decide something, on one screen, daily — not a monthly export nobody opens.",
    icon: BarChart3,
    capabilities: [
      "Sales by channel, discount, tax method and top seller",
      "Occupancy, ADR and RevPAR for hospitality; cost per kilometre for fleets",
      "Demand forecasting with reorder suggestions",
      "Trial balance, profit and loss, and receivables ageing",
      "Excel and thermal export, and multi-branch rollup for the owner",
    ],
    shippedIn: [SERVESYNC, SERVESYNC_RX, SERVESYNC_MART, STAYSYNC, FLEETFLOW],
    screens: [
      ["servesync-pos", "Sales Report"],
      ["servesync-pos", "Demand Forecast"],
      ["staysync", "Dashboard"],
      ["staysync", "Portfolio"],
      ["fleet-flow", "Dashboard"],
      ["fleet-flow", "Running Costs"],
    ],
  },
  {
    slug: "expense-management",
    name: "Expense Management",
    summary:
      "Every rupee out of the business booked against something — a category, a vehicle, a trip — so the P&L is assembled rather than estimated.",
    icon: Wallet,
    capabilities: [
      "Petty cash and category expenses feeding straight into the P&L",
      "Supplier bills with pay-now or pay-later terms and payment reminders",
      "Payables ageing and overdue tracking",
      "Costs booked against a trip or a vehicle, not just the month",
      "Double-entry journals where debits equal credits, enforced by the database",
    ],
    shippedIn: [SERVESYNC, SERVESYNC_RX, SERVESYNC_MART, STAYSYNC, FLEETFLOW],
    screens: [
      ["fleet-flow", "Expenses"],
      ["fleet-flow", "Accounting"],
      ["servesync-pos", "Accounts"],
      ["servesync-pos", "Vendor Ledger"],
      ["servesync-pos", "Suppliers"],
    ],
  },
  {
    slug: "admin-panel",
    name: "Admin Panel",
    summary:
      "The owner's side of the product: many branches or properties under one login, plus a vendor console above it that can switch a client off.",
    icon: LayoutDashboard,
    capabilities: [
      "One login across many branches, properties or tenants",
      "Tax rules, printers, receipt branding, OTP and integrations",
      "Subscription packages whose module gating is enforced server-side",
      "A vendor kill switch that revokes every live session for a client",
      "Append-only audit log, enforced by a database trigger",
    ],
    shippedIn: [SERVESYNC, SERVESYNC_RX, SERVESYNC_MART, STAYSYNC, FLEETFLOW],
    screens: [
      ["servesync-pos", "Packages"],
      ["fleet-flow", "Platform Console"],
      ["fleet-flow", "Settings"],
      ["staysync", "Portfolio"],
    ],
  },
  {
    slug: "compliance",
    name: "Fiscal & Compliance",
    summary:
      "Invoices your tax authority accepts, produced automatically at the point of sale rather than reconstructed at filing.",
    icon: ClipboardList,
    capabilities: [
      "PRA and FBR registration with sandbox and live gateways",
      "Auto-fiscalise on payment, with the official invoice number and QR on the receipt",
      "Connection test and a fiscal log for failed submissions",
      "Controlled-drug register, exportable for inspection",
      "Tax credited to a liability rather than revenue",
    ],
    shippedIn: [SERVESYNC, SERVESYNC_RX, SERVESYNC_MART, FLEETFLOW],
    screens: [
      ["servesync-pos", "PRA / FBR Fiscal"],
      ["servesync-pos", "Fiscal Gateway"],
      ["servesync-pos", "Controlled Register"],
      ["servesync-pos", "A4 Invoice"],
      ["fleet-flow", "Invoices"],
    ],
  },
];

/**
 * Resolve a module's `[productSlug, label]` references into real screen entries.
 *
 * Throws rather than skipping: a renamed label should break the build, not silently
 * shrink a gallery on the live site.
 */
export function moduleScreens(module: ProductModule) {
  return module.screens.map(([productSlug, label]) => {
    const product = products.find((candidate) => candidate.slug === productSlug);
    const screen = product?.screens?.find((entry) => entry.label === label);

    if (!product || !screen) {
      throw new Error(
        `modules.ts: ${module.slug} references "${label}" in ${productSlug}, which does not exist`,
      );
    }

    return { ...screen, product: product.name, productSlug: product.slug };
  });
}

/* ------------------------------------------------------------------ */
/* Per-module detail                                                  */
/* ------------------------------------------------------------------ */

/**
 * The long-form half of a module page.
 *
 * `productModules` above answers "what is this and where does it run". This
 * answers "why would I want it, how does it actually work, and what will I ask
 * before buying" — which is what those pages were missing, and why they were the
 * thinnest thing on the site.
 *
 * Every mechanism described here exists in the software on /projects. Where a
 * behaviour is specific to one product it says so, because "the system handles
 * it" is the kind of sentence that makes a buyer stop believing the rest.
 */
export interface ModuleDetail {
  /** The operational pain, in the words of whoever feels it. */
  problem: string;
  /** How it actually works. Mechanism, not benefit. */
  how: { title: string; detail: string }[];
  /** Who this is for — specific trades, not "businesses of all sizes". */
  forWho: string[];
  /** Questions a buyer genuinely asks, answered honestly including the limits. */
  faqs: { question: string; answer: string }[];
}

const MODULE_DETAIL: Record<string, ModuleDetail> = {
  "restaurant-website": {
    problem:
      "Most restaurant websites are built once and then drift. The menu on the site says one price, the till says another, a dish sold out at lunch is still orderable at eight, and every change means emailing whoever built it. Meanwhile the orders that do arrive land in an inbox and get re-typed into the POS by hand.",
    how: [
      {
        title: "One catalogue, read from the till",
        detail:
          "The site does not keep its own copy of the menu. Items, prices, availability, delivery fees and zones are read from the POS over its API at request time, so 86-ing a dish at the pass takes it off the website too. There is nothing to sync because there is nothing duplicated.",
      },
      {
        title: "Orders arrive as orders",
        detail:
          "A web checkout creates a real order in the POS, in the same queue as the counter and the waiter pad — not an email. Delivery, pickup and dine-in are distinct types, and a table QR code opens checkout with the table already filled in.",
      },
      {
        title: "Signed in with a POS PIN",
        detail:
          "The admin panel authenticates against the POS itself and validates on every request, so there is no second set of staff accounts to create, revoke or forget about when someone leaves.",
      },
      {
        title: "Branch picked by the customer's location",
        detail:
          "\"Use my location\" ranks branches by the delivery zones already configured in the POS and picks the nearest one that actually delivers there, instead of asking a hungry customer to know your branch structure.",
      },
    ],
    forWho: [
      "Restaurants taking orders on paper, WhatsApp or an inbox",
      "Groups whose website menu has drifted from the till",
      "Anyone paying aggregator commission on orders their own customers would place direct",
    ],
    faqs: [
      {
        question: "Do I have to maintain the menu twice?",
        answer:
          "No. The website has no menu of its own — it reads the POS. You change a price or mark something unavailable at the till and the site reflects it on the next request.",
      },
      {
        question: "Can it look like our brand rather than a template?",
        answer:
          "It ships with four layouts and four palettes, and the type, imagery and copy are yours. It is a real front end rather than a themed page builder, so anything beyond those options is a code change we make — not something you are locked out of.",
      },
      {
        question: "What happens to orders if the POS is offline?",
        answer:
          "The site needs the POS to read the live menu and to create an order, so if the server is unreachable the checkout is unavailable rather than silently accepting orders nobody will see. The POS itself keeps working offline on the shop floor; this is about the public site reaching it.",
      },
      {
        question: "Is it installable on a phone?",
        answer:
          "Yes — it is a PWA with an offline shell, Restaurant JSON-LD for search results and a sitemap. Customers can add it to their home screen.",
      },
    ],
  },

  "online-ordering": {
    problem:
      "Orders come from the counter, a phone call, a QR code on the table and an aggregator app, and each channel has its own screen. Someone ends up re-keying an aggregator order into the till, which is where the wrong table number and the missing modifier come from.",
    how: [
      {
        title: "Every channel into one queue",
        detail:
          "Dine-in, takeaway, delivery and QR self-order are order types on the same order, not separate systems. The kitchen sees one list; reports count one set of numbers.",
      },
      {
        title: "Aggregator orders as a first-class channel",
        detail:
          "Foodpanda arrives through a secret-gated webhook with SKU mapping, so an aggregator item becomes your item with your recipe and your stock deduction. Accept or decline from the POS, and the channel is marked on the kitchen ticket so the pass knows what it is looking at.",
      },
      {
        title: "QR self-order that is actually the menu",
        detail:
          "A scan opens a card menu with its own per-device theme, cart and checkout, priced from the same catalogue as the till. It doubles as an unattended kiosk.",
      },
      {
        title: "The customer can see where the order is",
        detail:
          "A guest tracking page is linked from the confirmation, so nobody has to phone the branch to ask whether the food has left.",
      },
    ],
    forWho: [
      "Restaurants and cafés running more than one order channel",
      "Cloud kitchens where aggregators are most of the volume",
      "QSR and food courts wanting self-order without a kiosk vendor",
    ],
    faqs: [
      {
        question: "Does an aggregator order deduct stock like a normal sale?",
        answer:
          "Yes, provided the SKU mapping is set up — that is what the mapping is for. The aggregator's item resolves to your item, so the recipe and the ingredient deduction behave identically to a counter sale.",
      },
      {
        question: "Which aggregators are supported?",
        answer:
          "Foodpanda is built and running. The webhook and SKU-mapping layer is the reusable part, so another aggregator is an integration rather than a rebuild — but we would be adding it, not switching it on.",
      },
      {
        question: "Do customers need an app for QR ordering?",
        answer:
          "No. The QR opens a web page. There is nothing to install.",
      },
    ],
  },

  kds: {
    problem:
      "Paper tickets curl, get lost under a pass, and tell you nothing about what has been sitting for eleven minutes. When a modifier changes after the ticket printed, the printer has no way to say so — the only record of the truth is whoever remembers.",
    how: [
      {
        title: "Live tickets per station",
        detail:
          "Each station sees its own tickets in real time over a socket, with bump and recall. Recall matters: the most common kitchen error is bumping the wrong ticket, and paper offers no way back.",
      },
      {
        title: "86-ing from the pass",
        detail:
          "Marking an item unavailable at the kitchen screen takes it off the till, the QR menu and the website at once, so the next customer is not sold something that ran out two minutes ago.",
      },
      {
        title: "A ticket built to be read across a kitchen",
        detail:
          "The KOT prints centred with a banner header, items on the left and add-ons on the right, and names whoever punched the order so a question has an addressee. It prints automatically on punch, straight to the thermal head — no browser dialog, no window to dismiss with wet hands.",
      },
      {
        title: "Owner view across branches",
        detail:
          "One screen showing every branch's pass at once, which is the difference between hearing that a kitchen is behind and seeing it.",
      },
    ],
    forWho: [
      "Kitchens still working from a printer",
      "Multi-branch groups where the owner cannot stand in every kitchen",
      "Hotels running room service through the same kitchen as the restaurant",
    ],
    faqs: [
      {
        question: "What if we have no screen in the kitchen?",
        answer:
          "The display can be switched off per branch, and \"Send to Kitchen\" then routes to the Orders list instead. Tickets still print. A kitchen display is worth having, but the POS does not insist on one.",
      },
      {
        question: "Does it need the internet?",
        answer:
          "It needs the local network — the KDS talks to the POS server in the building, not to a cloud service. If the internet drops, the kitchen carries on.",
      },
      {
        question: "Can room service tickets go to the same kitchen?",
        answer:
          "Yes. In StaySync, room-service orders charge to the room folio and reach the kitchen as tickets like any other order.",
      },
    ],
  },

  "rider-management": {
    problem:
      "Deliveries get assigned by shouting, tracked by phoning the rider, and settled from memory at the end of the week. When two jobs land on one rider at the same time, nobody finds out until a customer calls.",
    how: [
      {
        title: "The rider has an app, not a phone call",
        detail:
          "A phone-login field app lists the deliveries assigned to that rider, with one-tap navigate, call, and status updates that flow straight back to the POS. No install from a store is required for the restaurant flow.",
      },
      {
        title: "Zones decide the charge",
        detail:
          "Delivery zones and their fees are configured once, and the checkout — counter, website or QR — prices against them rather than a guess at the till.",
      },
      {
        title: "A dispatch board that refuses to double-book",
        detail:
          "In Fleet Flow, trucks and drivers are dragged onto trips and the board checks for a conflict before it accepts the assignment. An override is possible, and the reason is recorded — because the useful audit trail is the one that captures the exception.",
      },
      {
        title: "Live position, not last-known guess",
        detail:
          "Map plotting with geocoding, and a share link so the customer can see the rider rather than ring the branch.",
      },
    ],
    forWho: [
      "Restaurants running their own riders instead of paying commission",
      "Carriers and fleets dispatching trucks against trips",
      "Anyone whose delivery record currently lives in a WhatsApp group",
    ],
    faqs: [
      {
        question: "Do riders need expensive phones?",
        answer:
          "No. The rider app is a thin WebView shell over the POS, around 2 MB, and works on modest Android hardware. It is sideloaded rather than fetched from Play.",
      },
      {
        question: "Can a rider be assigned to two jobs at once?",
        answer:
          "In Fleet Flow the board detects the conflict and blocks it unless someone overrides, and the override is logged with its reason. The restaurant flow is simpler — assignment is manual, so the safeguard there is that the board shows who already has a job.",
      },
      {
        question: "Does the customer get tracking?",
        answer:
          "They get an order-journey page from the confirmation, and a GPS share where the rider's position is available.",
      },
    ],
  },

  "staff-management": {
    problem:
      "Everyone knows the manager's PIN. Permissions are enforced by the sidebar hiding a button, which stops nobody who knows the URL. And when someone leaves, their access lingers until somebody remembers to remove it.",
    how: [
      {
        title: "Permissions the server enforces",
        detail:
          "190 granular permissions across 15 groups, checked on the request and not only in the interface — a hidden button is a hint, not a control. Permissions resolve from cache, so revoking a role bites on the next request rather than the next login.",
      },
      {
        title: "Ranked roles with real kiosks",
        detail:
          "Roles are ranked, and some are deliberately narrow: a kitchen login reaches only the display, an HR login only HR, a purchaser only demands, vendors and the warehouse. A till is not a place for a general-purpose admin account.",
      },
      {
        title: "Attendance through to payslip",
        detail:
          "Attendance, payroll runs, advances and leaves, with advances recovered at a capped share so a payslip cannot go negative. Printable slips itemise earnings, deductions and net.",
      },
      {
        title: "Per-branch teams that stay separate",
        detail:
          "Staff belong to a branch, so a manager sees their own team rather than one merged list of everybody in the group.",
      },
    ],
    forWho: [
      "Multi-branch groups where one shared PIN is doing the work of an access-control system",
      "Businesses paying advances against salary and reconciling them by hand",
      "Anyone who cannot currently answer \"who voided that invoice?\"",
    ],
    faqs: [
      {
        question: "Can I stop cashiers giving discounts?",
        answer:
          "Yes — discounting is one of the 190 permissions, and voids and refunds sit behind a supervisor PIN as well. The check is server-side, so it holds even if someone reaches the screen another way.",
      },
      {
        question: "Does it do biometric attendance?",
        answer:
          "There is face login in ServeSync, and it is honest about its constraint: browsers only allow the camera in a secure context, so it needs the POS reached over HTTPS. PIN login always works, and is what most branches use.",
      },
      {
        question: "Can a manager see other branches' staff?",
        answer:
          "Only if their role allows it. Staff are assigned to a branch and the owner rolls up across all of them; a branch manager sees their own.",
      },
    ],
  },

  "inventory-management": {
    problem:
      "Stock is counted at stocktake and guessed at in between. Something expires on a shelf and nobody notices until a customer does, and the value of what is in the building is whatever last month's spreadsheet said.",
    how: [
      {
        title: "Batches, expiry and first-expiry-first-out",
        detail:
          "Where the trade needs it, stock lives in batches with manufacture and expiry dates. A sale allocates first-expiry-first and records which batches it consumed, and expired stock is excluded from sellable stock rather than merely flagged — in a pharmacy that is the difference between a warning and a control.",
      },
      {
        title: "Recipes that make ingredients count",
        detail:
          "A menu item is linked to its ingredients, so the system can say how many are actually makeable right now, and selling one depletes the components rather than an abstract counter.",
      },
      {
        title: "Valued, not just counted",
        detail:
          "FIFO and LIFO valuation, adjustments, write-offs and transfers, so the number in the accounts is derived from movements rather than typed in.",
      },
      {
        title: "Loud before it is a loss",
        detail:
          "Low-stock, near-expiry and expired alerts against reorder points, plus aisle, shelf and rack locations so someone can actually find the thing, and Excel export for whoever wants their own view.",
      },
    ],
    forWho: [
      "Pharmacies, where batch and expiry are a legal matter and not a preference",
      "Marts and grocers carrying perishables",
      "Kitchens wanting food cost that reflects what was consumed",
    ],
    faqs: [
      {
        question: "Does stock come off when I sell, or when I close the day?",
        answer:
          "On the sale. Retail and pharmacy editions deduct on payment, and recipe-linked kitchen items deduct their ingredients when the order is punched.",
      },
      {
        question: "Can it stop us selling something expired?",
        answer:
          "Yes. Expired batches are excluded from sellable stock, so the item is not available to sell rather than available with a warning attached.",
      },
      {
        question: "Do we have to use batches for everything?",
        answer:
          "No — batch tracking is per item. A pharmacy turns it on for medicines; a restaurant generally does not need it for napkins.",
      },
    ],
  },

  "warehouse-management": {
    problem:
      "A central store and the shop floor share one stock number, so nobody can tell what is available to sell from what is sitting in the back for other branches. Transfers happen on a phone call and are reconciled never.",
    how: [
      {
        title: "Central stock held apart from the floor",
        detail:
          "Warehouse stock is its own set of levels, so what is sellable at a branch and what is held centrally are two different numbers — which is the whole point of having a warehouse.",
      },
      {
        title: "Demand, dispatch, receive",
        detail:
          "A branch raises a demand, the warehouse dispatches against it, and the branch receives it with a goods-received note. Each step is a record, so a missing carton has a place to be missing from.",
      },
      {
        title: "A transfer creates sellable stock",
        detail:
          "Moving goods to a store creates a batch the till can actually sell, rather than an adjustment somebody has to remember to make.",
      },
      {
        title: "Priced and printed",
        detail:
          "Transfers can be charged between branches and the invoice prints direct to thermal, and the full movement log is there for the argument about what was sent.",
      },
    ],
    forWho: [
      "Multi-branch groups supplying their own outlets",
      "Marts running a back store behind the shop floor",
      "Central kitchens producing for several restaurants",
    ],
    faqs: [
      {
        question: "Can a branch order from the warehouse itself?",
        answer:
          "Yes — that is the demand step, and there is a dedicated purchaser role whose kiosk is limited to demands, vendors and the warehouse.",
      },
      {
        question: "Do transfers between branches get charged?",
        answer:
          "They can. A transfer can be marked payable and settled between branches, with the invoice printable.",
      },
      {
        question: "Is purchasing approved before it happens?",
        answer:
          "Purchase orders run through an approval path where only a purchaser or the owner can approve or reject.",
      },
    ],
  },

  "analytics-and-reports": {
    problem:
      "The numbers exist in the system and nowhere anyone can use them. Getting a figure means exporting a CSV and rebuilding the same spreadsheet every month, and two people asking the same question get two answers.",
    how: [
      {
        title: "Reports over the same data as the screens",
        detail:
          "Sales, by-channel, discounts, tax by method, top sellers and forecast, filterable by day, week, month, quarter, year or a custom range — computed from the transactions rather than a separate reporting copy that can disagree.",
      },
      {
        title: "The owner rolls up across branches",
        detail:
          "Every figure aggregates across the group, and each branch card drills into that branch's own reports, stock, staff and demand.",
      },
      {
        title: "The till's own accounting",
        detail:
          "Mid-shift X-report and end-of-shift Z-report with variance and order counts, so the drawer is reconciled against what was actually rung up, and handover is one step.",
      },
      {
        title: "A plain-language assistant that cannot invent",
        detail:
          "Fleet Flow's assistant answers questions in words, and by design an answer may only contain data it queried — there is no language model free-associating over your figures. That constraint is why the answers are trustworthy.",
      },
    ],
    forWho: [
      "Owners who currently ask a manager for numbers",
      "Multi-branch groups comparing outlets",
      "Accountants tired of being sent a raw export",
    ],
    faqs: [
      {
        question: "Can I export to Excel?",
        answer:
          "Yes, and thermal for the reports that make sense on a receipt. Fleet Flow exports CSV; PDF is on the list rather than done, and the docs say so.",
      },
      {
        question: "Does the assistant use AI on my data?",
        answer:
          "It answers only from records it has queried, scoped by the asker's permissions. It is a query layer with a natural-language front, not a model given free rein over your business.",
      },
      {
        question: "How far back does reporting go?",
        answer:
          "As far as the data — reports run over the transaction history, so the limit is when you started, not a retention window we impose.",
      },
    ],
  },

  "expense-management": {
    problem:
      "Petty cash is a drawer and a memory. Costs land in the accounts weeks later as a lump nobody can break down, so the profit figure is a guess and the drawer never quite balances.",
    how: [
      {
        title: "Recorded where it is spent",
        detail:
          "Category expenses and a petty-cash float entered at the branch as the money moves, rather than reconstructed from receipts at month end.",
      },
      {
        title: "Straight into the P&L",
        detail:
          "Expenses feed the profit-and-loss directly, so the margin on the dashboard already accounts for what the day cost as well as what it earned.",
      },
      {
        title: "Reconciled against the drawer",
        detail:
          "Cash in and out is recorded against the shift, and the Z-report shows the variance — so a shortfall is a number with a shift and a name attached.",
      },
      {
        title: "Trips and vehicles, where that is the unit",
        detail:
          "In Fleet Flow an expense attaches to the trip, the vehicle or the business, which is what makes cost per kilometre computable rather than estimated.",
      },
    ],
    forWho: [
      "Branch managers holding a float",
      "Owners whose expenses arrive as an undifferentiated monthly total",
      "Fleets needing cost attributed to a vehicle or a trip",
    ],
    faqs: [
      {
        question: "Can I stop staff entering expenses?",
        answer:
          "Yes — it is permission-gated like every other module, and the check is server-side.",
      },
      {
        question: "Does it handle supplier bills as well as petty cash?",
        answer:
          "Supplier invoices live in Vendors and Payables with terms, partial payments and overdue tracking. Expenses is for the operating costs that are not a supplier bill.",
      },
      {
        question: "Will the P&L balance?",
        answer:
          "In Fleet Flow, every financial act posts a balanced double-entry journal, enforced at the service, in the transaction and by the database. The POS accounting is simpler — a P&L, cash book, journal, payables and receivables — but expenses do feed it directly.",
      },
    ],
  },

  "admin-panel": {
    problem:
      "Configuration lives in whoever set the system up. Changing a tax rate, adding a branch or repointing a printer means a support call, and there is no way to see what a given client's installation is actually running.",
    how: [
      {
        title: "The business configures itself",
        detail:
          "Branches with quick rename, tax rules, printers, OTP, branding, access control and integrations — all owner-editable, so a new outlet or a changed tax rate is not a ticket.",
      },
      {
        title: "Packages gated in two places",
        detail:
          "Subscription tiers decide which modules a branch gets, and the gate is applied in the sidebar and again server-side. Only the vendor's super admin can switch a client's plan; the owner sees both read-only and can pay and renew against a printable invoice.",
      },
      {
        title: "Edition chosen, not compiled in",
        detail:
          "In ServeSync the vertical — restaurant, pharmacy or mart — is a setting. It drives the theme, the vocabulary and which of the 33 modules appear, so one installer serves all three and a change is a switch rather than a migration.",
      },
      {
        title: "A console above the tenants",
        detail:
          "Fleet Flow's platform console lists every tenant, its plan and its usage against the plan's limits, which is the view you need before a renewal conversation.",
      },
    ],
    forWho: [
      "Owners who want to change a price or a tax rate without calling anyone",
      "Vendors reselling the software to multiple clients",
      "Groups adding outlets faster than a support queue can keep up",
    ],
    faqs: [
      {
        question: "Can I add a branch myself?",
        answer:
          "Yes, with its own menu, tables, tax and staff, fed by the central warehouse. Quick rename is there because the first name is rarely the final one.",
      },
      {
        question: "What happens if the subscription lapses?",
        answer:
          "The POS locks, and the owner can pay and renew from inside the app against a printable invoice. It is deliberately not silent.",
      },
      {
        question: "Can we switch from restaurant to mart later?",
        answer:
          "The edition is changeable in Setup by the superadmin. Existing installs keep the edition they were set up with and are not asked again.",
      },
    ],
  },

  compliance: {
    problem:
      "Fiscal reporting is a rule you cannot negotiate with, and doing it by hand means a person re-typing invoice numbers into a portal. In a pharmacy the stakes are higher: an inspector can ask for the controlled register, and \"we can reconstruct it from sales\" is not an answer.",
    how: [
      {
        title: "Invoices registered with the authority",
        detail:
          "Real-time registration over FBR Digital Invoicing or PRA POS, with sandbox and live gateways, auto-fiscalising on payment or on demand. The official invoice number, the QR and the NTN print on the receipt.",
      },
      {
        title: "A log and a connection test",
        detail:
          "A fiscal log of what was submitted and what came back, plus a connection test — because the failure you need to see is the one that happened at four o'clock on a Friday, not the one you discover at year end.",
      },
      {
        title: "Prescription gating that refuses, not warns",
        detail:
          "In the pharmacy edition, items flagged Rx-required or controlled cannot be sold without a linked prescription: the payment is refused. A manager can override, and the override is recorded.",
      },
      {
        title: "A controlled register written as you work",
        detail:
          "Every controlled dispense writes to its own register with the medicine, batch, prescription, who dispensed it and when — an audit trail kept as it happens rather than assembled afterwards.",
      },
    ],
    forWho: [
      "Businesses inside PRA or FBR fiscal scope",
      "Pharmacies dispensing prescription-only or controlled medicines",
      "Anyone whose current compliance step is a person and a portal",
    ],
    faqs: [
      {
        question: "Is the fiscal integration real or a placeholder?",
        answer:
          "Real, with sandbox and live gateways and a connection test. It is running in the shipped POS, not scheduled.",
      },
      {
        question: "What if the authority's service is down?",
        answer:
          "Fiscalising can be triggered on demand as well as automatically on payment, and the fiscal log records what succeeded and what did not, so the queue is visible rather than lost.",
      },
      {
        question: "Can a pharmacist override the prescription check?",
        answer:
          "A manager can, and the override is logged. The default is refusal — a compliance control that can be clicked past without a trace is not a control.",
      },
    ],
  },
};

/**
 * Long-form detail for one module.
 *
 * Throws rather than returning undefined, so a module added to `productModules`
 * without its detail fails the build instead of shipping a page that is missing
 * half its content — the same guard `moduleScreens` applies to screenshots.
 */
export function moduleDetail(slug: string): ModuleDetail {
  const detail = MODULE_DETAIL[slug];
  if (!detail) {
    throw new Error(
      `modules.ts: no MODULE_DETAIL entry for "${slug}". Every module needs a problem statement, mechanism, audience and FAQs.`,
    );
  }
  return detail;
}
