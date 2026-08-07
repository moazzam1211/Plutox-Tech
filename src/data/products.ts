import type { Product } from "@/types";

/**
 * The four products built and deployed by Plutox Tech.
 *
 * Every capability, spec figure and technology listed here is taken from the
 * products' own documentation rather than written as marketing copy — the
 * module counts, endpoint counts and payment rails are the real ones.
 *
 * `image` is each product's own logo, trimmed by `npm run product-logos`.
 * `screens` point at screenshots captured from the running applications.
 */
export const products: Product[] = [
  /* ------------------------------------------------------------------ */
  /* ServeSync POS                                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "servesync-pos",
    name: "ServeSync POS",
    category: "Restaurant",
    tagline: "Run a whole restaurant chain from one codebase",
    description:
      "A multi-branch, offline-first restaurant POS with 24 live modules spanning point of sale, kitchen, floor, delivery, inventory, a central warehouse, HR, accounting and fiscal compliance — all synced in real time across every terminal. One owner login oversees many branches, each with its own menu, tables, tax and staff, fed by a central warehouse.",
    image: "/images/products/servesync-logo.png",
    brandColor: "#33BCA8",
    audience: "Restaurants, cafés, cloud kitchens and multi-branch food groups",
    badge: "24 modules",
    features: [
      "Dine-in, takeaway, delivery and QR self-order in one till",
      "Kitchen Display with bump, recall, 86-items and KOT notes",
      "Live floor plan with dwell-time escalation, merge & transfer",
      "Offline-first PWA — an outbox replays every sale on reconnect",
      "Central warehouse: branch demands → dispatch → goods received",
      "Five field apps: waiter pad, rider app, QR menu, display, tracking",
    ],
    moduleGroups: [
      {
        title: "Point of sale & floor",
        items: [
          {
            name: "New Order (POS)",
            detail:
              "Dine-in / takeaway / delivery, modifiers and per-item add-ons, % or fixed discounts, surcharges, promo and loyalty redemption, split and method-based tax.",
          },
          {
            name: "Floor plan & tables",
            detail:
              "Live table status with dwell-time colour escalation, waiter assignment, add-to and view occupied tables, merge and transfer.",
          },
          {
            name: "Kitchen Display (KDS)",
            detail:
              "Live tickets per station, bump and recall, 86-items, KOT notes, and a cross-branch view for the owner.",
          },
          {
            name: "Till & shift",
            detail:
              "Opening float, cash in/out, mid-shift X-report, Z-report with variance, and one-step cashier handover.",
          },
        ],
      },
      {
        title: "Operations & supply chain",
        items: [
          {
            name: "All-branches command centre",
            detail:
              "Every branch's live sales, open orders, tables, alerts and who's on shift — each card drilling into that branch.",
          },
          {
            name: "Central warehouse",
            detail:
              "In-house and supply items by category, branch demands → dispatch → receive, with goods-received notes.",
          },
          {
            name: "Inventory",
            detail:
              "Two linked inventories (menu + ingredient) with live 'makeable' counts, FIFO/LIFO valuation, expiry flags and Excel export.",
          },
          {
            name: "Delivery & aggregators",
            detail:
              "Zones, riders, live Google Maps plotting, geocoding and navigation links, plus Foodpanda orders as a first-class channel via a secret-gated webhook.",
          },
        ],
      },
      {
        title: "Back office & compliance",
        items: [
          {
            name: "Accounts",
            detail:
              "P&L, cash book, journal, payables and receivables, exported as a single Excel workbook.",
          },
          {
            name: "HR",
            detail:
              "Attendance, payroll runs, advances and leaves across all branches.",
          },
          {
            name: "PRA / FBR fiscal",
            detail:
              "Reports paid invoices to Punjab and Federal tax authorities, printing the official invoice number and QR on receipts.",
          },
          {
            name: "Vendors, promos & expenses",
            detail:
              "Supplier records with pay-now/pay-later, promo codes with caps and usage tracking, petty cash and category expenses feeding the P&L.",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/products/screens/servesync-dashboard.png",
        label: "Dashboard",
        caption: "Revenue, average ticket, covers and low-stock alerts",
      },
      {
        src: "/images/products/screens/servesync-new-order.png",
        label: "New Order",
        caption: "Modifiers, add-ons, discounts and split tax",
      },
      {
        src: "/images/products/screens/servesync-kitchen.png",
        label: "Kitchen Display",
        caption: "Live tickets per station with bump and recall",
      },
      {
        src: "/images/products/screens/servesync-tables.png",
        label: "Floor Plan",
        caption: "Table status with dwell-time escalation",
      },
      {
        src: "/images/products/screens/servesync-warehouse.png",
        label: "Warehouse",
        caption: "Branch demands, dispatch and goods received",
      },
      {
        src: "/images/products/screens/servesync-reports.png",
        label: "Reports & BI",
        caption: "Sales by channel, discounts, tax and forecast",
      },
    ],
    stack: ["Node.js", "Express", "Socket.IO", "Vanilla JS PWA", "ESC/POS", "Stripe"],
    specs: [
      { label: "Live modules", value: "24" },
      { label: "REST endpoints", value: "189" },
      { label: "Lines of code", value: "~13,500" },
      { label: "Runtime deps", value: "2" },
    ],
    payments: ["Cash", "Card", "JazzCash", "EasyPaisa", "Bank transfer"],
    metric: { label: "Front-end apps & surfaces", value: "7" },
    demoUrl: "/portfolio#servesync-pos",
    learnMoreUrl: "/products#servesync-pos",
  },

  /* ------------------------------------------------------------------ */
  /* PharmaSync POS                                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "pharmasync-pos",
    name: "PharmaSync POS",
    category: "Pharmacy",
    tagline: "Built around how a pharmacy actually works",
    description:
      "A pharmacy POS and ERP built on the premise that stock lives in batches. Every sale dispenses first-expiry-first and never sells expired stock, prescription-required and controlled medicines are gated, and every controlled dispense is written to an audit-ready register. Around that core sits purchasing, patients, doctors, demand forecasting and PRA/FBR fiscal printing.",
    image: "/images/products/pharmasync-logo.png",
    brandColor: "#004AAD",
    audience: "Retail pharmacies, medical stores and pharmacy chains",
    features: [
      "Batch and expiry tracking with strict FEFO dispensing",
      "Sell a whole strip or individual tablets — stock deducts the exact fraction",
      "Rx-required and controlled medicines gated at the counter",
      "Controlled-drug register, exportable for audit",
      "One-tap dosage and usage info for cashier and customer",
      "Demand forecasting with reorder suggestions",
    ],
    moduleGroups: [
      {
        title: "Selling & compliance",
        items: [
          {
            name: "Point of sale",
            detail:
              "Barcode and keyword search, list and grid views, touch cart, amount or % discounts, hold and resume, change calculation.",
          },
          {
            name: "Pack or loose units",
            detail:
              "Sell a whole strip or bottle, or individual tablets — stock deducts the exact pack fraction and profit is reported per unit.",
          },
          {
            name: "Batch & expiry (FEFO)",
            detail:
              "Every medicine is stocked by batch with manufacture and expiry dates; sales dispense first-expiry-first and expired stock can never be sold.",
          },
          {
            name: "Prescriptions & controlled drugs",
            detail:
              "Record an Rx with an image and attach it at the till. Rx-required and controlled medicines are gated without a valid prescription or a pharmacist override, and every controlled dispense is logged with medicine, batch, patient, doctor and dispenser.",
          },
        ],
      },
      {
        title: "Stock, purchasing & finance",
        items: [
          {
            name: "Inventory",
            detail:
              "Medicine master covering generic, brand, manufacturer, strength, form, drug schedule, cold-chain flag and rack location, plus adjustments and write-offs.",
          },
          {
            name: "Purchasing",
            detail:
              "Purchase orders → approval → receive, which automatically creates batches, a goods-received note and a supplier payable.",
          },
          {
            name: "Suppliers & payables",
            detail:
              "Vendors, credit terms, bills, partial payments and overdue tracking.",
          },
          {
            name: "Reports & forecasting",
            detail:
              "Sales, stock valuation, expiry, expenses and the controlled register, plus demand forecasting — filterable by day, week, month, quarter, year or a custom range, with Excel and thermal export.",
          },
        ],
      },
      {
        title: "People & platform",
        items: [
          {
            name: "Patients & customers",
            detail:
              "One record set with two views — Patients (allergies, blood group, insurance) and Customers (loyalty, spend, purchase history).",
          },
          {
            name: "Staff & payroll",
            detail:
              "PIN login, ranked roles, an audit log and printable payslips with history.",
          },
          {
            name: "PRA / FBR fiscal",
            detail:
              "Fiscalises invoices and prints the fiscal number and QR code on every receipt.",
          },
          {
            name: "Real-time & offline",
            detail:
              "Multi-terminal sync over Socket.IO, installable as a PWA, and fully functional offline.",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/products/screens/pharmasync-dashboard.svg",
        label: "Dashboard",
        caption: "Sales, profit, inventory value and cash drawer",
      },
      {
        src: "/images/products/screens/pharmasync-pos.svg",
        label: "Sell",
        caption: "Scan or search, with a touch-friendly cart",
      },
      {
        src: "/images/products/screens/pharmasync-inventory.svg",
        label: "Inventory",
        caption: "Medicine master with batch and schedule flags",
      },
      {
        src: "/images/products/screens/pharmasync-batches.svg",
        label: "Batches (FEFO)",
        caption: "Stock-in, write-off and expiry ordering",
      },
      {
        src: "/images/products/screens/pharmasync-controlled.svg",
        label: "Controlled Register",
        caption: "Every controlled dispense, audit-ready",
      },
      {
        src: "/images/products/screens/pharmasync-forecast.svg",
        label: "Demand Forecast",
        caption: "Projected demand and reorder suggestions",
      },
    ],
    stack: [
      "Node.js",
      "Express",
      "Socket.IO",
      "Vanilla JS PWA",
      "Prisma",
      "PostgreSQL",
    ],
    specs: [
      { label: "REST endpoints", value: "100" },
      { label: "UI screens", value: "31" },
      { label: "Lines of code", value: "~4,900" },
      { label: "Fiscal", value: "PRA / FBR" },
    ],
    payments: [
      "Cash",
      "Card",
      "JazzCash",
      "EasyPaisa",
      "Bank transfer",
      "Credit on account",
    ],
    metric: { label: "Dispensing rule", value: "FEFO" },
    demoUrl: "/portfolio#pharmasync-pos",
    learnMoreUrl: "/products#pharmasync-pos",
  },

  /* ------------------------------------------------------------------ */
  /* Vendeez POS                                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: "vendeez-pos",
    name: "Vendeez POS",
    category: "Mart & Retail",
    tagline: "Three ways to scan, one fast checkout",
    description:
      "A retail and supermarket POS with 15 live modules covering selling, batch-and-expiry inventory, purchasing, customers and loyalty, promotions, gift cards, accounting and reporting. Scan with a USB or Bluetooth gun, the device camera, or a staff phone paired over Socket.IO — and unknown barcodes are looked up online and auto-categorised.",
    image: "/images/products/vendeez-logo.png",
    brandColor: "#005F73",
    audience: "Supermarkets, grocery stores, mini-marts and retail chains",
    badge: "15 modules",
    features: [
      "USB, camera or phone-as-scanner — all three, live to the till",
      "Unknown barcodes looked up online and auto-categorised",
      "Batch and expiry inventory with FEFO allocation",
      "Promotions auto-applied at checkout: BOGO, combo, flash sales",
      "Loyalty tiers that upgrade themselves, plus gift cards and store credit",
      "Split and multi-method payments with thermal or A4 invoices",
    ],
    moduleGroups: [
      {
        title: "Selling & scanning",
        items: [
          {
            name: "Sell (POS)",
            detail:
              "Scan-to-cart with keyboard-first operation, department filters, list and grid catalogues, pack or loose units, line and cart discounts, coupons, hold and resume.",
          },
          {
            name: "Barcode scanning",
            detail:
              "USB and Bluetooth guns captured globally (no need to focus the search box), device-camera scanning via ZXing, and a phone paired by QR that streams scans over Socket.IO.",
          },
          {
            name: "Auto product lookup",
            detail:
              "An unknown barcode is queried against your catalogue, then Open Food Facts, then UPCitemdb — pre-filling name, brand and size, and auto-selecting the department.",
          },
          {
            name: "Checkout & receipts",
            detail:
              "Split and multi-method payments, thermal receipts at 58 or 80mm, and printable A4 invoices.",
          },
        ],
      },
      {
        title: "Inventory & purchasing",
        items: [
          {
            name: "Inventory",
            detail:
              "Every product tracks batches with expiry; sales allocate first-expiry-first-out, with low-stock, near-expiry and expired alerts, adjustments, transfers and aisle/shelf locations.",
          },
          {
            name: "Purchases",
            detail:
              "Purchase orders → goods-received note → automatic stock-in and supplier payable.",
          },
          {
            name: "Suppliers",
            detail: "Vendor ledger, bills, payables and ageing analysis.",
          },
          {
            name: "Invoices",
            detail:
              "Three registers on one screen — Sales, Purchase and Supplies — with thermal or A4 reprints.",
          },
        ],
      },
      {
        title: "Customers, finance & staff",
        items: [
          {
            name: "Customers & loyalty",
            detail:
              "Points, visits and lifetime spend driving automatic tier upgrades from Silver through Gold and Platinum to VIP, plus store credit.",
          },
          {
            name: "Promotions & gift cards",
            detail:
              "Buy-X-Get-Y, category percentage off, flash sales and combo pricing applied automatically at checkout; gift cards can be issued, topped up and disabled.",
          },
          {
            name: "Till & expenses",
            detail:
              "Open and close shifts with cash reconciliation and drawer moves, plus costs by category and petty cash.",
          },
          {
            name: "Reports & payroll",
            detail:
              "Sales, stock valuation, expiry, profit and tax with a period selector, demand forecasting with reorder suggestions, and A4 salary slips.",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/products/screens/vendeez-dashboard.png",
        label: "Dashboard",
        caption: "Feature hub with live sales, profit and top products",
      },
      {
        src: "/images/products/screens/vendeez-pos.png",
        label: "Sell",
        caption: "Scan-to-cart with department filters",
      },
      {
        src: "/images/products/screens/vendeez-inventory.png",
        label: "Inventory",
        caption: "Batches, expiry alerts and FEFO allocation",
      },
      {
        src: "/images/products/screens/vendeez-phone-scanner.png",
        label: "Phone Scanner",
        caption: "A paired phone scanning for sale or stock-in",
      },
      {
        src: "/images/products/screens/vendeez-promotions.png",
        label: "Promotions",
        caption: "BOGO, combo and flash sales",
      },
      {
        src: "/images/products/screens/vendeez-reports.png",
        label: "Reports",
        caption: "Valuation, profit, tax and demand forecast",
      },
    ],
    stack: ["Node.js", "Express", "Socket.IO", "Vanilla JS PWA", "ZXing", "HTTPS"],
    specs: [
      { label: "Live modules", value: "15" },
      { label: "Scan methods", value: "3" },
      { label: "Loyalty tiers", value: "4" },
      { label: "Runs on port", value: "3200" },
    ],
    payments: [
      "Cash",
      "Card",
      "JazzCash",
      "EasyPaisa",
      "Raast",
      "Bank transfer",
      "Gift card",
      "Store credit",
    ],
    metric: { label: "Ways to scan a product", value: "3" },
    demoUrl: "/portfolio#vendeez-pos",
    learnMoreUrl: "/products#vendeez-pos",
  },

  /* ------------------------------------------------------------------ */
  /* StaySync Hotel ERP                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "staysync",
    name: "StaySync Hotel ERP",
    category: "Hospitality",
    tagline: "One login, every property",
    description:
      "A multi-property hotel ERP: a complete Property Management System — reservations through front desk, folio and checkout — surrounded by 21 live modules covering operations, revenue centres, supply chain, finance, HR and IoT. One login controls many hotels, resorts and villas with shared guests, loyalty and central reporting.",
    image: "/images/products/staysync-logo.png",
    brandColor: "#6F50E9",
    audience: "Hotel groups, resorts, serviced apartments and villa portfolios",
    badge: "21 modules",
    features: [
      "One login across many properties with shared guests and CRM",
      "Full PMS: reservations, availability engine, check-in and check-out",
      "Live room rack combining occupancy and housekeeping status",
      "Folios with auto-posted room charges, tax and split payments",
      "Channel manager syncing OTA rates, inventory and commission",
      "Occupancy, ADR and RevPAR analytics rolled up across the portfolio",
    ],
    moduleGroups: [
      {
        title: "Front office (PMS)",
        items: [
          {
            name: "Reservations",
            detail:
              "Walk-in, OTA, corporate, group and web bookings against a live availability engine, with check-in and check-out.",
          },
          {
            name: "Front desk & room rack",
            detail:
              "A live room rack showing occupancy alongside housekeeping status, assign-on-check-in, and checkout gated on the folio balance.",
          },
          {
            name: "Room management",
            detail:
              "Room types, rate plans, and live room plus housekeeping status.",
          },
          {
            name: "Folio & billing",
            detail:
              "Auto-posted room charges and tax, F&B, service and discount lines, split and multi-method payments, A4 invoices and thermal receipts.",
          },
        ],
      },
      {
        title: "Operations & revenue centres",
        items: [
          {
            name: "Housekeeping",
            detail:
              "A Kanban board running pending → in progress → done → verified, with tasks created automatically on checkout.",
          },
          {
            name: "Maintenance & laundry",
            detail:
              "Work orders by area, category and priority with assignment and resolution; guest, linen and uniform laundry orders with an express tier and status pipeline.",
          },
          {
            name: "Banquet, spa & room service",
            detail:
              "Halls with package pricing and booking lifecycle, spa services with therapists and appointments, and a room-service POS that charges to the room.",
          },
          {
            name: "Channel manager",
            detail:
              "OTA channels with connect and disconnect, rate and inventory sync, and commission tracking.",
          },
        ],
      },
      {
        title: "Finance, people & platform",
        items: [
          {
            name: "Finance & accounting",
            detail:
              "P&L comparing revenue against expenses, expenses by category, a chart of accounts and the ledger.",
          },
          {
            name: "Procurement & assets",
            detail:
              "Vendors and purchase orders with computed totals and an approve-then-receive flow, plus an asset register tracking cost against current value, warranty and status.",
          },
          {
            name: "HR & payroll",
            detail:
              "Employees and payroll runs covering basic pay, allowances, deductions and net, with finalisation.",
          },
          {
            name: "Super administration",
            detail:
              "Hotel group and properties, users, roles and RBAC, subscription control and a full audit log — plus a per-room IoT device registry for smart locks, thermostats and energy meters.",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/products/screens/staysync-dashboard.png",
        label: "Dashboard",
        caption: "Occupancy, ADR, RevPAR and revenue trend",
      },
      {
        src: "/images/products/screens/staysync-reservations.png",
        label: "Reservations",
        caption: "Bookings against a live availability engine",
      },
      {
        src: "/images/products/screens/staysync-room-rack.png",
        label: "Room Rack",
        caption: "Occupancy and housekeeping status per room",
      },
      {
        src: "/images/products/screens/staysync-housekeeping.png",
        label: "Housekeeping",
        caption: "Kanban from pending through to verified",
      },
      {
        src: "/images/products/screens/staysync-portfolio.png",
        label: "Portfolio",
        caption: "Multi-property performance comparison",
      },
      {
        src: "/images/products/screens/staysync-reports.png",
        label: "Reports & BI",
        caption: "Trends and multi-property rollup",
      },
    ],
    stack: [
      "TypeScript",
      "Express",
      "Socket.IO",
      "React",
      "Vite",
      "Prisma",
      "PostgreSQL",
      "Docker",
    ],
    specs: [
      { label: "Live modules", value: "21" },
      { label: "Smoke-test checks", value: "66" },
      { label: "Seeded properties", value: "2" },
      { label: "Runs on port", value: "3300" },
    ],
    payments: [
      "Cash",
      "Card",
      "JazzCash",
      "Easypaisa",
      "Bank transfer",
      "City ledger",
    ],
    metric: { label: "Properties per login", value: "Unlimited" },
    demoUrl: "/portfolio#staysync",
    learnMoreUrl: "/products#staysync",
  },
];
