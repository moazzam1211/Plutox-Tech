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
 * five platforms on /projects, and `shippedIn` names them. That is the whole point
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

const SERVESYNC = { name: "ServeSync POS", slug: "servesync-pos" };
const SERVESYNC_WEB = { name: "ServeSync Web", slug: "servesync-pos" };
const PHARMASYNC = { name: "PharmaSync POS", slug: "pharmasync-pos" };
const VENDEEZ = { name: "Vendeez POS", slug: "vendeez-pos" };
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
    shippedIn: [SERVESYNC, PHARMASYNC, VENDEEZ, STAYSYNC, FLEETFLOW],
    screens: [
      ["servesync-pos", "HR"],
      ["pharmasync-pos", "Staff"],
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
    shippedIn: [SERVESYNC, PHARMASYNC, VENDEEZ, STAYSYNC, FLEETFLOW],
    screens: [
      ["pharmasync-pos", "Inventory"],
      ["pharmasync-pos", "Batches (FEFO)"],
      ["pharmasync-pos", "Expiry"],
      ["vendeez-pos", "Inventory"],
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
    shippedIn: [SERVESYNC, VENDEEZ, PHARMASYNC],
    screens: [
      ["servesync-pos", "Warehouse"],
      ["servesync-pos", "Demand Planning"],
      ["vendeez-pos", "Warehouse"],
      ["vendeez-pos", "Stock In"],
      ["vendeez-pos", "Purchases"],
      ["pharmasync-pos", "Purchasing"],
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
    shippedIn: [SERVESYNC, PHARMASYNC, VENDEEZ, STAYSYNC, FLEETFLOW],
    screens: [
      ["pharmasync-pos", "Sales Report"],
      ["pharmasync-pos", "Demand Forecast"],
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
    shippedIn: [SERVESYNC, PHARMASYNC, VENDEEZ, STAYSYNC, FLEETFLOW],
    screens: [
      ["fleet-flow", "Expenses"],
      ["fleet-flow", "Accounting"],
      ["servesync-pos", "Accounts"],
      ["vendeez-pos", "Suppliers"],
      ["pharmasync-pos", "Suppliers"],
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
    shippedIn: [SERVESYNC, PHARMASYNC, VENDEEZ, STAYSYNC, FLEETFLOW],
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
    shippedIn: [SERVESYNC, PHARMASYNC, VENDEEZ, FLEETFLOW],
    screens: [
      ["servesync-pos", "PRA / FBR Fiscal"],
      ["vendeez-pos", "Tax / Fiscal"],
      ["pharmasync-pos", "Controlled Register"],
      ["vendeez-pos", "A4 Invoice"],
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
