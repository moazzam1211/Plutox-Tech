/**
 * Product screenshot importer.
 *
 * Copies the chosen captures out of each product's own `docs/screenshots` folder,
 * normalises them for the web and prints the `screens` array to paste into
 * `src/data/products.ts`.
 *
 * Raster captures are re-encoded to **WebP** at 1920 wide. On flat UI screenshots
 * — large areas of one colour, hard edges, text — WebP lands around a third of the
 * PNG weight at a quality that survives being viewed at full width. SVGs are
 * copied through untouched: PharmaSync documents itself in vectors, and rasterising
 * them would trade resolution independence for nothing.
 *
 * The selection is deliberate, not "everything in the folder": login, lock and
 * help screens are skipped, and so are captures that were taken against a fresh
 * demo database and therefore show `Rs 0.00` with an empty chart. A gallery is
 * only as good as its weakest frame.
 *
 * Run with:  node scripts/import-product-screens.mjs
 */
import { copyFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

import sharp from "sharp";

const OUT = join(process.cwd(), "public", "images", "products", "screens");
const DL = "C:/Users/aaa/Downloads";

/** Widest we ever need: the gallery frame asks for 44vw of a 1440 viewport. */
const MAX_WIDTH = 1920;

const PRODUCTS = [
  {
    slug: "servesync",
    src: `${DL}/restaurant-pos-full/docs/screenshots`,
    screens: [
      ["03-new-order.png", "New Order", "Modifiers, add-ons, discounts and split tax"],
      ["12-checkout-addons.png", "Add-ons", "Per-item modifiers priced at the till"],
      ["05-kitchen.png", "Kitchen Display", "Live tickets per station with bump and recall"],
      ["04-tables.png", "Floor Plan", "Table status with dwell-time escalation"],
      ["07-orders.png", "Orders", "Manage, void and refund behind a supervisor PIN"],
      ["08-invoices.png", "Invoices", "Pre-bill, customer bill and QR receipt"],
      ["22-till-shift.png", "Till & Shift", "Float, cash moves, X and Z reports"],
      ["09-delivery.png", "Delivery", "Zones, riders and the live map"],
      ["10-foodpanda.png", "Foodpanda", "Aggregator orders as a first-class channel"],
      ["12-inventory.png", "Inventory", "Menu and ingredient stock with makeable counts"],
      ["13-warehouse.png", "Warehouse", "Branch demands, dispatch and goods received"],
      ["14-demand.png", "Demand Planning", "Branch requests against warehouse stock"],
      ["29-customers.png", "Customers & CRM", "Loyalty points, visits and lifetime spend"],
      ["17-hr.png", "HR", "Attendance, payroll, advances and leaves"],
      ["18-accounts.png", "Accounts", "P&L, cash book, journal and payables"],
      ["24-fiscal.png", "PRA / FBR Fiscal", "Tax-authority invoicing with number and QR"],
      ["28-waiter-pad.png", "Waiter Pad", "Mobile order punching from the floor"],
      ["32-packages.png", "Packages", "Three plans, gated in the sidebar and server-side"],
    ],
  },
  {
    slug: "pharmasync",
    src: `${DL}/pharmacy-pos-full/docs/screenshots`,
    screens: [
      ["02-dashboard.svg", "Dashboard", "Sales, profit, inventory value and cash drawer"],
      ["03-pos.svg", "Sell", "Scan or search, with a touch-friendly cart"],
      ["04-pos-grid.svg", "Grid View", "Tile layout for a busy counter"],
      ["07-pack-loose.svg", "Pack or Loose", "Sell a strip or single tablets"],
      ["06-medicine-info.svg", "Medicine Info", "Dosage and usage at one tap"],
      ["11-prescriptions.svg", "Prescriptions", "Rx recorded with an image and attached at the till"],
      ["13-controlled.svg", "Controlled Register", "Every controlled dispense, audit-ready"],
      ["12-doctors.svg", "Doctors", "Prescribers linked to their prescriptions"],
      ["14-inventory.svg", "Inventory", "Medicine master with schedule and cold-chain flags"],
      ["15-batches.svg", "Batches (FEFO)", "Stock-in, write-off and expiry ordering"],
      ["16-expiry.svg", "Expiry", "Near-expiry and expired stock at risk"],
      ["18-purchases.svg", "Purchasing", "PO to approval to receive, creating batches and GRN"],
      ["19-suppliers.svg", "Suppliers", "Terms, bills, partial payments and overdue"],
      ["20-reports-sales.svg", "Sales Report", "Revenue, margin and top sellers by period"],
      ["21-forecast.svg", "Demand Forecast", "Projected demand and reorder suggestions"],
      ["23-patients.svg", "Patients", "Allergies, blood group and insurance"],
      ["25-staff.svg", "Staff", "PIN login, ranked roles and the audit log"],
      ["08-receipt.svg", "Receipt", "Thermal output with QR and logo watermark"],
    ],
  },
  {
    slug: "vendeez",
    src: `${DL}/mart-pos-full/docs/screenshots`,
    screens: [
      ["03-pos.png", "Sell", "Scan-to-cart with department filters"],
      ["04-pos-cart.png", "Cart", "Line and cart discounts, hold and resume"],
      ["05-checkout.png", "Checkout", "Split and multi-method payments"],
      ["07-barcode-lookup.png", "Barcode Lookup", "Unknown codes resolved online, then auto-categorised"],
      ["10-phone-scanner.png", "Phone Scanner", "A paired phone scanning for sale or stock-in"],
      ["32-barcode-generator.png", "Scale Labels", "Embedded-price EAN-13 for produce sold by weight"],
      ["37-kiosk-weigh.png", "Weigh Kiosk", "Self-service weighing that prints the label"],
      ["11-inventory.png", "Inventory", "Batches, expiry alerts and FEFO allocation"],
      ["12-stock-in.png", "Stock In", "Goods received against a purchase order"],
      ["33-warehouse.png", "Warehouse", "Central stock, reorder points and transfers to store"],
      ["21-purchases.png", "Purchases", "PO to GRN to payable"],
      ["20-suppliers.png", "Suppliers", "Vendor ledger, payables and ageing"],
      ["17-customers.png", "Customers & Loyalty", "Points, visits, tiers and store credit"],
      ["18-promotions.png", "Promotions", "BOGO, combo and flash sales, applied automatically"],
      ["19-giftcards.png", "Gift Cards", "Issue, top up and look up a balance"],
      ["23-till.png", "Till", "Shift open and close with cash reconciliation"],
      ["16-a4-invoice.png", "A4 Invoice", "Printable invoice alongside the thermal receipt"],
      ["31-fiscal.png", "Tax / Fiscal", "PRA / FBR registration, sandbox and live gateways"],
    ],
  },
  {
    slug: "staysync",
    src: `${DL}/staysync-hotel-erp/docs/screenshots`,
    screens: [
      ["02-dashboard.png", "Dashboard", "Occupancy, ADR, RevPAR and revenue trend"],
      ["03-portfolio.png", "Portfolio", "Multi-property performance side by side"],
      ["04-reservations.png", "Reservations", "Bookings against a live availability engine"],
      ["05-frontdesk-arrivals.png", "Front Desk", "Arrivals, departures and in-house"],
      ["06-room-rack.png", "Room Rack", "Occupancy and housekeeping status per room"],
      ["07-rooms.png", "Rooms", "Room types, rate plans and live status"],
      ["09-housekeeping.png", "Housekeeping", "Kanban from pending through to verified"],
      ["12-billing.png", "Billing & Folios", "Auto-posted charges, tax and split payments"],
      ["30-folio-detail.png", "Folio Detail", "Every line on the guest account"],
      ["10-room-service-pos.png", "Room Service POS", "Menu and cart charged to the room"],
      ["21-banquet.png", "Banquet & Events", "Halls, packages and booking lifecycle"],
      ["22-spa.png", "Spa & Salon", "Services, therapists and appointments"],
      ["20-laundry.png", "Laundry", "Guest, linen and uniform orders"],
      ["19-maintenance.png", "Maintenance", "Work orders by area, category and priority"],
      ["23-procurement.png", "Procurement", "Vendors and purchase orders, approve then receive"],
      ["25-finance.png", "Finance", "P&L, expenses by category and the ledger"],
      ["27-channel-manager.png", "Channel Manager", "OTA rates, inventory sync and commission"],
      ["28-iot.png", "Smart Hotel", "Per-room locks, thermostats and energy meters"],
    ],
  },
  {
    slug: "fleetflow",
    src: `${DL}/fleetflow/docs/screenshots`,
    screens: [
      ["08-dashboard-trends.png", "Dashboard", "Utilisation, 30-day trip trend and six-month revenue"],
      ["09-dashboard-fleet-status.png", "Fleet Status", "Available, on trip, loading, idle and maintenance"],
      ["21-dispatch.png", "Dispatch Board", "Drag a truck or driver onto a trip, by lane"],
      ["17-trips.png", "Trips", "Execution side, with delayed trips badged"],
      ["19-trip-detail.png", "Trip Detail", "Lifecycle actions generated from the transition map"],
      ["23-tracking.png", "Live Tracking", "Position, speed, heading and staleness per truck"],
      ["15-shipments.png", "Shipments", "The commercial side of the load"],
      ["10-vehicles.png", "Vehicles", "Fleet register with document-expiry counts"],
      ["12-drivers.png", "Drivers", "Licence expiry and the truck currently assigned"],
      ["38-fuel.png", "Fuel", "Fill-ups against the vehicle and the trip"],
      ["39-maintenance.png", "Maintenance", "Service schedules by odometer and date"],
      ["40-workshop.png", "Workshop", "Job cards — what is in, who is on it, what it cost"],
      ["41-tires.png", "Tyres", "History per axle position, one tyre per position"],
      ["42-inventory.png", "Parts Inventory", "Stock and reorder points, drawn down by jobs"],
      ["43-running-costs.png", "Running Costs", "Cost per kilometre from fuel, upkeep and expenses"],
      ["14-customers.png", "Customers", "Credit limits and payment terms"],
      // Phase 5 — finance.
      ["45-invoices.png", "Invoices", "Issued against trips, with overdue derived from today"],
      ["46-payments.png", "Payments", "Receipts allocated to invoices, never re-crediting revenue"],
      ["47-expenses.png", "Expenses", "Costs against the trip, vehicle or the business"],
      ["48-payroll.png", "Payroll", "Gross expensed, advances recovered at a capped share"],
      ["49-accounting.png", "Accounting", "Trial balance, P&L and receivables ageing"],
      // Phase 6 — outside the office.
      ["50-driver-my-trips.png", "Driver App", "A driver's own trips, on their phone"],
      ["51-customer-portal.png", "Customer Portal", "A customer's shipments, without an account manager"],
      ["53-public-tracking.png", "Public Tracking", "A tracking code anyone can open, no login"],
      // Phase 7 — analytics and the command centre.
      ["55-command-centre.png", "Command Centre", "The whole operation on one screen"],
      ["56-analytics.png", "Analytics", "Utilisation, cost and margin by dimension"],
      ["58-assistant.png", "Assistant", "Ask the fleet a question in plain words"],
      ["52-alerts.png", "Alerts", "Licences, documents and services falling due"],
      ["30-platform-console.png", "Platform Console", "Every tenant, its plan and its usage"],
      ["25-settings.png", "Settings", "Plan limits and usage against them"],
    ],
  },
];

/**
 * Downscale rasters embedded as data URIs inside an SVG.
 *
 * PharmaSync's vector captures each carry the product logo as a base64 PNG at its
 * original 4800×4800, which is 94% of a 163 KB file — for a mark drawn at 34 px in
 * the sidebar. The `<image>` element declares its own width and height, so the SVG
 * scales whatever it is given: shrinking the payload changes nothing on screen and
 * takes the file to about 12 KB.
 */
async function shrinkEmbeddedRasters(file) {
  const { readFile, writeFile } = await import("node:fs/promises");
  const original = await readFile(file, "utf8");

  const matches = [...original.matchAll(/data:image\/png;base64,([A-Za-z0-9+/=]+)/g)];
  if (!matches.length) return;

  let updated = original;
  for (const [, base64] of matches) {
    const shrunk = await sharp(Buffer.from(base64, "base64"))
      // 128px covers a 34px mark at 3× density with room to spare.
      .resize({ width: 128, height: 128, fit: "inside" })
      .png({ compressionLevel: 9 })
      .toBuffer();
    updated = updated.replace(base64, shrunk.toString("base64"));
  }

  await writeFile(file, updated, "utf8");
}

await mkdir(OUT, { recursive: true });

const missing = [];
const emitted = [];

for (const product of PRODUCTS) {
  const entries = [];

  for (const [file, label, caption] of product.screens) {
    const from = join(product.src, file);
    if (!existsSync(from)) {
      missing.push(`${product.slug}: ${file}`);
      continue;
    }

    // `<slug>-<descriptive>` keeps the public URLs readable and stable.
    const stem = file.replace(/^\d+-/, "").replace(/\.(png|svg)$/, "");
    const isVector = file.endsWith(".svg");
    const out = `${product.slug}-${stem}.${isVector ? "svg" : "webp"}`;

    if (isVector) {
      await copyFile(from, join(OUT, out));
      await shrinkEmbeddedRasters(join(OUT, out));
    } else {
      const meta = await sharp(from).metadata();
      const pipeline = sharp(from);
      if (meta.width > MAX_WIDTH) pipeline.resize({ width: MAX_WIDTH });
      // `effort: 6` is the slowest sensible setting; this runs once, offline,
      // so trading encode time for bytes on every visitor is the right way round.
      await pipeline.webp({ quality: 82, effort: 6 }).toFile(join(OUT, out));
    }

    entries.push(
      `      {\n` +
        `        src: "/images/products/screens/${out}",\n` +
        `        label: ${JSON.stringify(label)},\n` +
        `        caption: ${JSON.stringify(caption)},\n` +
        `      },`,
    );
  }

  emitted.push({ slug: product.slug, count: entries.length, block: entries.join("\n") });
  console.log(`${product.slug.padEnd(12)} ${entries.length} screens`);
}

if (missing.length) {
  console.log(`\nMissing sources (skipped):\n  ${missing.join("\n  ")}`);
}

// Written out so the data file can be spliced without pasting by hand.
await import("node:fs/promises").then(({ writeFile }) =>
  writeFile(
    join(process.cwd(), "scripts", ".screens.generated.json"),
    JSON.stringify(emitted, null, 2),
    "utf8",
  ),
);
console.log("\nBlocks written to scripts/.screens.generated.json");
