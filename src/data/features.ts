import {
  BarChart3,
  Bell,
  CloudCog,
  Database,
  FileSpreadsheet,
  Gift,
  MessageCircle,
  Network,
  Plug2,
  QrCode,
  ScanBarcode,
  ShieldCheck,
  Store,
  Truck,
  Users2,
  WifiOff,
} from "lucide-react";

import type { Feature } from "@/types";

/**
 * Platform capabilities shipped with every Plutox product. Rendered as an
 * animated bento grid.
 */
export const platformFeatures: Feature[] = [
  {
    title: "Cloud Sync",
    description:
      "Every branch writes to one cloud ledger with conflict-free merges.",
    icon: CloudCog,
  },
  {
    title: "Offline Mode",
    description:
      "Keep billing through an outage; queued transactions sync on reconnect.",
    icon: WifiOff,
  },
  {
    title: "Multi Branch",
    description:
      "Central pricing and stock visibility across unlimited locations.",
    icon: Store,
  },
  {
    title: "Real-Time Analytics",
    description: "Live sales, margin and footfall dashboards with drill-down.",
    icon: BarChart3,
  },
  {
    title: "Barcode Scanning",
    description:
      "USB, Bluetooth or phone-camera scanning with instant item lookup.",
    icon: ScanBarcode,
  },
  {
    title: "QR Ordering",
    description: "Contactless menus and self-checkout straight from a QR code.",
    icon: QrCode,
  },
  {
    title: "Kitchen Display",
    description: "Course-aware ticket routing with prep timers and recall.",
    icon: Bell,
  },
  {
    title: "Order Tracking",
    description:
      "Status timelines from placement to delivery, shared with the customer.",
    icon: Truck,
  },
  {
    title: "Employee Management",
    description: "Shifts, attendance, commissions and per-user sales targets.",
    icon: Users2,
  },
  {
    title: "Customer Loyalty",
    description: "Tiers, points, cashback and gift cards with expiry rules.",
    icon: Gift,
  },
  {
    title: "WhatsApp Integration",
    description:
      "Receipts, order updates and payment reminders on WhatsApp Business.",
    icon: MessageCircle,
  },
  {
    title: "Reports & Exports",
    description:
      "120+ built-in reports, scheduled email delivery, Excel and PDF export.",
    icon: FileSpreadsheet,
  },
  {
    title: "Role Permissions",
    description:
      "Granular, row-level access control with maker-checker approvals.",
    icon: Network,
  },
  {
    title: "Secure Database",
    description:
      "Encryption at rest and in transit, automated backups, point-in-time restore.",
    icon: Database,
  },
  {
    title: "API Ready",
    description:
      "Documented REST and webhook APIs so your other tools stay in sync.",
    icon: Plug2,
  },
  {
    title: "Audit & Compliance",
    description:
      "Immutable activity log, fiscal invoicing and tax-authority reporting.",
    icon: ShieldCheck,
  },
];
