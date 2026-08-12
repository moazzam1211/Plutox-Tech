import type { Product } from "@/types";

/**
 * The products built by Plutox Tech — four shipped, one in build.
 *
 * Every capability, spec figure and technology listed here is taken from the
 * products' own documentation rather than written as marketing copy — the
 * module counts, endpoint counts and payment rails are the real ones.
 *
 * `image` is each product's own logo, trimmed by `npm run product-logos`.
 * `screens` point at screenshots captured from the running applications, and are
 * absent on anything still in development — a product with no finished screens
 * shows its roadmap instead. Inventing a screenshot is the one thing this page
 * must never do, since its whole claim is that none of it is a mockup.
 *
 * `demoUrl` goes to /contact rather than a hosted instance: there is no public
 * live demo, and the previous /portfolio and /products anchors were deleted in
 * the restructure into a small set of pages, so they 404'd.
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
      "A multi-branch, offline-first restaurant POS with 24 live modules spanning point of sale, kitchen, floor, delivery, inventory, a central warehouse, an R&D lab, HR, accounting and fiscal compliance — all synced in real time across every terminal. One owner login oversees many branches, each with its own menu, tables, tax and staff, fed by a central warehouse.",
    image: "/images/products/servesync-logo.webp",
    brandColor: "#33BCA8",
    audience: "Restaurants, cafés, cloud kitchens and multi-branch food groups",
    badge: "24 modules",
    features: [
      "Dine-in, takeaway, delivery and QR self-order in one till",
      "Kitchen Display with bump, recall, 86-items and KOT notes",
      "Live floor plan with dwell-time escalation, merge & transfer",
      "Offline-first PWA — an outbox replays every sale on reconnect",
      "Central warehouse: branch demands → dispatch → goods received",
      "Foodpanda orders arrive as a first-class channel, not a re-key",
      "An R&D Lab that costs a recipe before it reaches the menu",
      "Eleven ranked roles, including a dedicated purchasing kiosk",
      "Five field apps: waiter pad, rider app, QR menu, display, tracking",
      "Ships as a standalone binary for Windows, macOS and Linux — no Node needed",
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
            name: "Orders & invoices",
            detail:
              "The full order list with manage, void and refund behind a supervisor PIN, pre-bill and customer bill, and a QR code on every receipt.",
          },
          {
            name: "Till & shift",
            detail:
              "Opening float, cash in/out, mid-shift X-report, Z-report with variance, and one-step cashier handover.",
          },
          {
            name: "Menu management",
            detail:
              "Categories and sub-categories, recipes, modifier groups, custom add-ons and emoji items.",
          },
          {
            name: "Customers & CRM",
            detail:
              "Guest profiles with order history, loyalty points and tiers, and Excel export.",
          },
          {
            name: "Reports & BI",
            detail:
              "Sales, by-channel, discounts, tax by method, top sellers and forecast — with the owner rolling every figure up across branches.",
          },
        ],
      },
      {
        title: "Operations & supply chain",
        items: [
          {
            name: "All-branches command centre",
            detail:
              "Every branch's live sales, open orders, tables, alerts and who's on shift — each card drilling into that branch's reports, stock, staff and demand.",
          },
          {
            name: "Central warehouse",
            detail:
              "In-house and supply items filed by category and sub-category, branch demands → dispatch → receive, with goods-received notes.",
          },
          {
            name: "Inventory",
            detail:
              "Two linked inventories (menu + ingredient) with live 'makeable' counts, FIFO/LIFO valuation, expiry flags and Excel export.",
          },
          {
            name: "Delivery",
            detail:
              "Zones and riders with live Google Maps plotting, geocoding, one-tap navigate links and customer GPS share.",
          },
          {
            name: "Foodpanda channel",
            detail:
              "Aggregator orders as a first-class channel through a secret-gated webhook, with accept/decline and SKU mapping.",
          },
          {
            name: "R&D Lab",
            detail:
              "Recipe development kept off the live menu until it is ready, with its own purchasing and a costing engine that returns food-cost percentage, gross profit and a suggested price. Draws on the central warehouse, and is gated to the Premium package.",
          },
          {
            name: "Purchasing & approvals",
            detail:
              "A dedicated purchaser role with its own kiosk — limited to demand, vendors and warehouse — plus an owner approval path, where only a purchaser or the owner can approve or reject a purchase order.",
          },
          {
            name: "Settings & packages",
            detail:
              "Branches with quick rename, tax rules, printers, OTP, branding, access control and integrations — plus three subscription packages (Basic, Standard, Premium) whose module gating is enforced in the sidebar and again server-side.",
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
              "Attendance, payroll runs, advances and leaves across all branches, with staff assigned to a specific branch so per-branch teams stay separate rather than merging into one list.",
          },
          {
            name: "Vendors & payables",
            detail:
              "Supplier records and invoices with pay-now or pay-later terms and payment reminders, plus warehouse purchase invoices for goods received in.",
          },
          {
            name: "Expenses",
            detail:
              "Petty cash and category expenses feeding straight into the P&L.",
          },
          {
            name: "Promos",
            detail:
              "Promo codes as a percentage or fixed amount, with spend caps and usage tracking.",
          },
          {
            name: "PRA / FBR fiscal",
            detail:
              "Reports paid invoices to Punjab and Federal tax authorities, printing the official invoice number and QR on receipts.",
          },
        ],
      },
      {
        title: "Field & guest apps",
        items: [
          {
            name: "Waiter order pad",
            detail:
              "Mobile dine-in and takeaway punching from the floor, table-aware, with PIN login.",
          },
          {
            name: "Rider delivery app",
            detail:
              "A phone-login field app listing assigned deliveries with navigate, call and status updates.",
          },
          {
            name: "Customer QR self-order",
            detail:
              "A scan-to-order card menu with its own per-device theme, cart and checkout.",
          },
          {
            name: "Customer display",
            detail:
              "A customer-facing second screen mirroring the cart live, working offline over a same-origin broadcast channel.",
          },
          {
            name: "Order tracking",
            detail:
              "A guest order-journey page linked from the confirmation, so nobody has to phone the branch.",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/products/screens/servesync-new-order.webp",
        label: "New Order",
        caption: "Modifiers, add-ons, discounts and split tax",
      },
      {
        src: "/images/products/screens/servesync-checkout-addons.webp",
        label: "Add-ons",
        caption: "Per-item modifiers priced at the till",
      },
      {
        src: "/images/products/screens/servesync-kitchen.webp",
        label: "Kitchen Display",
        caption: "Live tickets per station with bump and recall",
      },
      {
        src: "/images/products/screens/servesync-tables.webp",
        label: "Floor Plan",
        caption: "Table status with dwell-time escalation",
      },
      {
        src: "/images/products/screens/servesync-orders.webp",
        label: "Orders",
        caption: "Manage, void and refund behind a supervisor PIN",
      },
      {
        src: "/images/products/screens/servesync-invoices.webp",
        label: "Invoices",
        caption: "Pre-bill, customer bill and QR receipt",
      },
      {
        src: "/images/products/screens/servesync-till-shift.webp",
        label: "Till & Shift",
        caption: "Float, cash moves, X and Z reports",
      },
      {
        src: "/images/products/screens/servesync-delivery.webp",
        label: "Delivery",
        caption: "Zones, riders and the live map",
      },
      {
        src: "/images/products/screens/servesync-foodpanda.webp",
        label: "Foodpanda",
        caption: "Aggregator orders as a first-class channel",
      },
      {
        src: "/images/products/screens/servesync-inventory.webp",
        label: "Inventory",
        caption: "Menu and ingredient stock with makeable counts",
      },
      {
        src: "/images/products/screens/servesync-warehouse.webp",
        label: "Warehouse",
        caption: "Branch demands, dispatch and goods received",
      },
      {
        src: "/images/products/screens/servesync-demand.webp",
        label: "Demand Planning",
        caption: "Branch requests against warehouse stock",
      },
      {
        src: "/images/products/screens/servesync-customers.webp",
        label: "Customers & CRM",
        caption: "Loyalty points, visits and lifetime spend",
      },
      {
        src: "/images/products/screens/servesync-hr.webp",
        label: "HR",
        caption: "Attendance, payroll, advances and leaves",
      },
      {
        src: "/images/products/screens/servesync-accounts.webp",
        label: "Accounts",
        caption: "P&L, cash book, journal and payables",
      },
      {
        src: "/images/products/screens/servesync-fiscal.webp",
        label: "PRA / FBR Fiscal",
        caption: "Tax-authority invoicing with number and QR",
      },
      {
        src: "/images/products/screens/servesync-waiter-pad.webp",
        label: "Waiter Pad",
        caption: "Mobile order punching from the floor",
      },
      {
        src: "/images/products/screens/servesync-packages.webp",
        label: "Packages",
        caption: "Three plans, gated in the sidebar and server-side",
      },    ],
    languages: ["JavaScript", "HTML", "CSS"],
    stack: [
      "Node.js",
      "Express",
      "Socket.IO",
      "Vanilla JS PWA",
      "ESC/POS",
      "Stripe",
      "Docker",
    ],
    specs: [
      { label: "Live modules", value: "24" },
      { label: "REST endpoints", value: "189" },
      { label: "Lines of code", value: "~13,500" },
      { label: "Runtime deps", value: "2" },
    ],
    payments: ["Cash", "Card", "JazzCash", "EasyPaisa", "Bank transfer"],
    metric: { label: "Front-end apps & surfaces", value: "7" },
    pricing: {
      note: "Per branch, billed monthly. The package gates which modules a branch gets, enforced in the sidebar and again server-side.",
      plans: [
        {
          name: "Basic",
          price: "PKR 5,000",
          period: "/ month",
          summary: "Core POS to run a single shop",
          includes: [
            "Dashboard, POS, tables & floor plan",
            "Kitchen display and orders",
            "Invoices, customers & loyalty",
            "Menu management, till & shift",
          ],
        },
        {
          name: "Standard",
          price: "PKR 10,000",
          period: "/ month",
          summary: "Everything to run and grow one restaurant",
          featured: true,
          includes: [
            "Everything in Basic",
            "Inventory & stock, demand planning",
            "Staff, vendors & payables, promos",
            "Expenses, delivery, reports & analytics",
          ],
        },
        {
          name: "Premium",
          price: "PKR 15,000",
          period: "/ month",
          summary: "The full suite — all modules and multi-branch",
          includes: [
            "Everything in Standard",
            "Multi-branch command centre & transfers",
            "Central warehouse, HR & payroll, accounting",
            "Foodpanda, PRA / FBR fiscal, R&D Lab",
          ],
        },
      ],
    },
    demoUrl: "/contact",
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
    image: "/images/products/pharmasync-logo.webp",
    brandColor: "#004AAD",
    audience: "Retail pharmacies, medical stores and pharmacy chains",
    features: [
      "Batch and expiry tracking with strict FEFO dispensing",
      "Sell a whole strip or individual tablets — stock deducts the exact fraction",
      "Rx-required and controlled medicines gated at the counter",
      "Controlled-drug register, exportable for audit",
      "One-tap dosage and usage info for cashier and customer",
      "Purchase order → approval → receive creates batches, GRN and payable",
      "Patients and customers in one record set, two views",
      "Demand forecasting with reorder suggestions",
      "Standalone binaries plus self-signed HTTPS, so LAN terminals get a secure context",
    ],
    moduleGroups: [
      {
        title: "Dispensing & point of sale",
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
            name: "Prescriptions & doctors",
            detail:
              "Record an Rx with an image and attach it at the till; Rx-required and controlled medicines are gated without a valid prescription or a pharmacist override.",
          },
          {
            name: "Controlled-drug register",
            detail:
              "Every controlled dispense is logged with medicine, batch, patient, doctor and dispenser, and the register exports to Excel for inspection.",
          },
          {
            name: "Medicine info",
            detail:
              "One tap shows dosage and usage, so the cashier can answer the customer without reaching for the carton.",
          },
          {
            name: "Receipt & bill",
            detail:
              "On-screen and thermal (ESC/POS) output with a QR code and logo watermark, and a fully customisable bill layout.",
          },
        ],
      },
      {
        title: "Stock & purchasing",
        items: [
          {
            name: "Inventory",
            detail:
              "Medicine master covering generic, brand, manufacturer, strength, form, drug schedule, cold-chain flag and rack/shelf location, plus adjustments and write-offs.",
          },
          {
            name: "Pharma companies",
            detail:
              "A managed manufacturer list with one-click filtering across the catalogue.",
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
            name: "Expenses & petty cash",
            detail:
              "Operating costs by category and a petty-cash float, reconciled against the drawer.",
          },
          {
            name: "Reports & forecasting",
            detail:
              "Sales, stock valuation, expiry, expenses and the controlled register, plus demand forecasting — filterable by day, week, month, quarter, year or a custom range, with Excel and thermal export.",
          },
        ],
      },
      {
        title: "People, platform & compliance",
        items: [
          {
            name: "Customer ledger",
            detail:
              "Credit sales tracked per customer, with a sales return or refund reversing the ledger rather than leaving a balance that no longer matches what was sold.",
          },
          {
            name: "Patients & customers",
            detail:
              "One record set with two views — Patients (allergies, blood group, insurance) and Customers (loyalty, spend, purchase history) — both exportable to Excel.",
          },
          {
            name: "Staff & salary slips",
            detail:
              "PIN login across six ranked roles, an audit log, and printable payslips with full history.",
          },
          {
            name: "Subscription billing",
            detail:
              "A monthly plan that locks the POS when the fee lapses, with owner-side Pay & Renew and printable SUB-#### invoices.",
          },
          {
            name: "PRA / FBR fiscal",
            detail:
              "Fiscalises invoices and prints the fiscal number and QR code on every receipt.",
          },
          {
            name: "Real-time & offline",
            detail:
              "Multi-terminal sync over Socket.IO, installable as a PWA and fully functional offline. Ships as a standalone binary with automatic self-signed HTTPS, because a PWA needs a secure context and LAN terminals have no public certificate.",
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
        src: "/images/products/screens/pharmasync-pos-grid.svg",
        label: "Grid View",
        caption: "Tile layout for a busy counter",
      },
      {
        src: "/images/products/screens/pharmasync-pack-loose.svg",
        label: "Pack or Loose",
        caption: "Sell a strip or single tablets",
      },
      {
        src: "/images/products/screens/pharmasync-medicine-info.svg",
        label: "Medicine Info",
        caption: "Dosage and usage at one tap",
      },
      {
        src: "/images/products/screens/pharmasync-prescriptions.svg",
        label: "Prescriptions",
        caption: "Rx recorded with an image and attached at the till",
      },
      {
        src: "/images/products/screens/pharmasync-controlled.svg",
        label: "Controlled Register",
        caption: "Every controlled dispense, audit-ready",
      },
      {
        src: "/images/products/screens/pharmasync-doctors.svg",
        label: "Doctors",
        caption: "Prescribers linked to their prescriptions",
      },
      {
        src: "/images/products/screens/pharmasync-inventory.svg",
        label: "Inventory",
        caption: "Medicine master with schedule and cold-chain flags",
      },
      {
        src: "/images/products/screens/pharmasync-batches.svg",
        label: "Batches (FEFO)",
        caption: "Stock-in, write-off and expiry ordering",
      },
      {
        src: "/images/products/screens/pharmasync-expiry.svg",
        label: "Expiry",
        caption: "Near-expiry and expired stock at risk",
      },
      {
        src: "/images/products/screens/pharmasync-purchases.svg",
        label: "Purchasing",
        caption: "PO to approval to receive, creating batches and GRN",
      },
      {
        src: "/images/products/screens/pharmasync-suppliers.svg",
        label: "Suppliers",
        caption: "Terms, bills, partial payments and overdue",
      },
      {
        src: "/images/products/screens/pharmasync-reports-sales.svg",
        label: "Sales Report",
        caption: "Revenue, margin and top sellers by period",
      },
      {
        src: "/images/products/screens/pharmasync-forecast.svg",
        label: "Demand Forecast",
        caption: "Projected demand and reorder suggestions",
      },
      {
        src: "/images/products/screens/pharmasync-patients.svg",
        label: "Patients",
        caption: "Allergies, blood group and insurance",
      },
      {
        src: "/images/products/screens/pharmasync-staff.svg",
        label: "Staff",
        caption: "PIN login, ranked roles and the audit log",
      },
      {
        src: "/images/products/screens/pharmasync-receipt.svg",
        label: "Receipt",
        caption: "Thermal output with QR and logo watermark",
      },    ],
    languages: ["JavaScript", "CSS", "HTML"],
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
    pricing: {
      note: "One plan, billed monthly on a 30-day cycle. The POS locks if the fee lapses; the owner can pay and renew from inside the app.",
      plans: [
        {
          name: "Monthly",
          price: "PKR 5,000",
          period: "/ month",
          summary: "The whole product — no module gating",
          featured: true,
          includes: [
            "Batch & expiry dispensing with FEFO",
            "Prescriptions, controlled register, doctors",
            "Purchasing, suppliers, patients & customers",
            "Reports with demand forecasting, PRA / FBR fiscal",
          ],
        },
      ],
    },
    demoUrl: "/contact",
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
      "A retail and supermarket POS with 17 live modules covering selling, batch-and-expiry inventory, a central warehouse, purchasing, customers and loyalty, promotions, gift cards, accounting and reporting. Scan with a USB or Bluetooth gun, the device camera, or a staff phone paired over Socket.IO — unknown barcodes are looked up online and auto-categorised, and produce sold by weight gets its own printed scale label that scans straight into the cart at the printed price.",
    image: "/images/products/vendeez-logo.webp",
    brandColor: "#005F73",
    audience: "Supermarkets, grocery stores, mini-marts and retail chains",
    badge: "17 modules",
    features: [
      "USB, camera or phone-as-scanner — all three, live to the till",
      "Unknown barcodes looked up online and auto-categorised",
      "Batch and expiry inventory with FEFO allocation",
      "Promotions auto-applied at checkout: BOGO, combo, flash sales",
      "Loyalty tiers that upgrade themselves, plus gift cards and store credit",
      "Scale labels for produce — embedded-price barcodes that scan into the cart",
      "A central warehouse behind the shop floor, with transfers and a movement log",
      "Real PRA / FBR fiscal registration, with sandbox and live gateways",
      "Two subscription plans, with Advanced-only modules locked on Basic",
    ],
    moduleGroups: [
      {
        title: "Checkout & scanning",
        items: [
          {
            name: "Dashboard",
            detail:
              "A feature-card hub over live metrics: sales and profit by day, week, month or year, a seven-day chart, and top products and customers.",
          },
          {
            name: "Sell (POS)",
            detail:
              "Scan-to-cart with keyboard-first operation, department filters, list and grid catalogues, pack or loose units, line and cart discounts, coupons, hold and resume.",
          },
          {
            name: "Barcode scanning",
            detail:
              "USB and Bluetooth guns captured globally (no need to focus the search box), device-camera scanning via ZXing, and a phone paired by QR that streams scans over Socket.IO for both selling and stock-in.",
          },
          {
            name: "Auto product lookup",
            detail:
              "An unknown barcode is queried against your catalogue, then Open Food Facts, then UPCitemdb — pre-filling name, brand, size and the product photo, and auto-selecting the department.",
          },
          {
            name: "Orders",
            detail:
              "A daily order register, so the shift can be reviewed line by line.",
          },
          {
            name: "Invoices",
            detail:
              "Three registers on one screen — Sales, Purchase and Supplies — with thermal or A4 reprints of any document.",
          },
        ],
      },
      {
        title: "Stock & supply chain",
        items: [
          {
            name: "Inventory",
            detail:
              "Every product tracks batches with expiry; sales allocate first-expiry-first-out, with category and brand filters, low-stock, near-expiry and expired alerts, adjustments, transfers, aisle/shelf locations and Excel export.",
          },
          {
            name: "Warehouse",
            detail:
              "Central stock held separately from the shop floor: receive goods, track per-SKU levels against a reorder point, transfer to the store (which creates a sellable batch) and read the full movement log.",
          },
          {
            name: "Barcode Generator (weighed items)",
            detail:
              "Scale labels for produce sold by weight — an EAN-13 embedded-price barcode (in-store prefix 2, then the PLU and the price), a printable label, and a scan at the till that drops the item into the cart at the printed price, exactly as in a large supermarket.",
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
            name: "Reports & forecasting",
            detail:
              "Sales, stock valuation, expiry, profit and tax with a period selector, plus a demand forecast with reorder suggestions.",
          },
        ],
      },
      {
        title: "Customers & growth",
        items: [
          {
            name: "Customers & loyalty",
            detail:
              "Points, visits and lifetime spend driving automatic tier upgrades from Silver through Gold and Platinum to VIP, plus store credit and Excel export.",
          },
          {
            name: "Promotions",
            detail:
              "Buy-X-Get-Y, category percentage off, flash sales and combo pricing — all applied automatically at checkout rather than keyed in by the cashier.",
          },
          {
            name: "Gift cards",
            detail:
              "Issue, top up, look up a balance, and enable or disable a card.",
          },
        ],
      },
      {
        title: "Money, people & setup",
        items: [
          {
            name: "Till",
            detail:
              "Open and close the shift with cash reconciliation and recorded drawer moves.",
          },
          {
            name: "Expenses",
            detail: "Costs by category and a petty-cash float.",
          },
          {
            name: "Staff & payroll",
            detail:
              "Team records, roles and PINs with ranked permissions, and A4 salary slips itemising earnings, deductions and net pay.",
          },
          {
            name: "Tax / Fiscal (PRA / FBR)",
            detail:
              "Real-time invoice registration with the tax authority over FBR Digital Invoicing or PRA POS: sandbox and live gateways, auto-fiscalise on payment or on demand, the official invoice number and QR printed on the receipt, plus a connection test and a fiscal log.",
          },
          {
            name: "Scanner / Devices",
            detail:
              "Per-terminal setup rather than one global switch: USB and Bluetooth keyboard-wedge capture with its own end key and minimum length, camera facing, a beep toggle with a test, continuous scanning, and the scale-barcode prefix.",
          },
          {
            name: "Subscription & packages",
            detail:
              "Two plans — Basic and Advanced — each listing its features on the billing screen. Only the vendor's super admin can switch a client's plan; the owner sees both read-only and can pay and renew against a printable invoice. Advanced-only modules are locked on Basic behind an upgrade prompt.",
          },
          {
            name: "Settings",
            detail:
              "Store details, tax, receipt branding, theme switcher, layout and data reset.",
          },
        ],
      },
    ],
    /*
      Gallery refreshed after the August update. The dashboard and reports
      captures came out of a fresh demo database showing Rs 0.00 and no chart,
      so they are replaced by the three screens the update actually added —
      all of them populated.
    */
    screens: [
      {
        src: "/images/products/screens/vendeez-pos.webp",
        label: "Sell",
        caption: "Scan-to-cart with department filters",
      },
      {
        src: "/images/products/screens/vendeez-pos-cart.webp",
        label: "Cart",
        caption: "Line and cart discounts, hold and resume",
      },
      {
        src: "/images/products/screens/vendeez-checkout.webp",
        label: "Checkout",
        caption: "Split and multi-method payments",
      },
      {
        src: "/images/products/screens/vendeez-barcode-lookup.webp",
        label: "Barcode Lookup",
        caption: "Unknown codes resolved online, then auto-categorised",
      },
      {
        src: "/images/products/screens/vendeez-phone-scanner.webp",
        label: "Phone Scanner",
        caption: "A paired phone scanning for sale or stock-in",
      },
      {
        src: "/images/products/screens/vendeez-barcode-generator.webp",
        label: "Scale Labels",
        caption: "Embedded-price EAN-13 for produce sold by weight",
      },
      {
        src: "/images/products/screens/vendeez-kiosk-weigh.webp",
        label: "Weigh Kiosk",
        caption: "Self-service weighing that prints the label",
      },
      {
        src: "/images/products/screens/vendeez-inventory.webp",
        label: "Inventory",
        caption: "Batches, expiry alerts and FEFO allocation",
      },
      {
        src: "/images/products/screens/vendeez-stock-in.webp",
        label: "Stock In",
        caption: "Goods received against a purchase order",
      },
      {
        src: "/images/products/screens/vendeez-warehouse.webp",
        label: "Warehouse",
        caption: "Central stock, reorder points and transfers to store",
      },
      {
        src: "/images/products/screens/vendeez-purchases.webp",
        label: "Purchases",
        caption: "PO to GRN to payable",
      },
      {
        src: "/images/products/screens/vendeez-suppliers.webp",
        label: "Suppliers",
        caption: "Vendor ledger, payables and ageing",
      },
      {
        src: "/images/products/screens/vendeez-customers.webp",
        label: "Customers & Loyalty",
        caption: "Points, visits, tiers and store credit",
      },
      {
        src: "/images/products/screens/vendeez-promotions.webp",
        label: "Promotions",
        caption: "BOGO, combo and flash sales, applied automatically",
      },
      {
        src: "/images/products/screens/vendeez-giftcards.webp",
        label: "Gift Cards",
        caption: "Issue, top up and look up a balance",
      },
      {
        src: "/images/products/screens/vendeez-till.webp",
        label: "Till",
        caption: "Shift open and close with cash reconciliation",
      },
      {
        src: "/images/products/screens/vendeez-a4-invoice.webp",
        label: "A4 Invoice",
        caption: "Printable invoice alongside the thermal receipt",
      },
      {
        src: "/images/products/screens/vendeez-fiscal.webp",
        label: "Tax / Fiscal",
        caption: "PRA / FBR registration, sandbox and live gateways",
      },    ],
    languages: ["JavaScript", "HTML", "CSS"],
    stack: ["Node.js", "Express", "Socket.IO", "Vanilla JS PWA", "ZXing", "HTTPS"],
    specs: [
      { label: "Live modules", value: "17" },
      { label: "Scan methods", value: "3" },
      { label: "Loyalty tiers", value: "4" },
      { label: "Fiscal", value: "PRA / FBR" },
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
    pricing: {
      note: "Billed monthly. Advanced-only modules are locked on Basic behind an upgrade prompt, and only the vendor's super admin can switch a client's plan.",
      plans: [
        {
          name: "Basic",
          price: "Rs 7,000",
          period: "/ month",
          summary: "Sell, stock and report",
          includes: [
            "Sell, orders, invoices and till",
            "Batch & expiry inventory with FEFO",
            "Customers, loyalty and expenses",
            "Reports, staff & payroll, settings",
          ],
        },
        {
          name: "Advanced",
          price: "Rs 15,000",
          period: "/ month",
          summary: "The full retail suite",
          featured: true,
          includes: [
            "Everything in Basic",
            "Central warehouse and transfers",
            "Barcode generator for weighed items",
            "Purchases, suppliers, promotions, gift cards",
          ],
        },
      ],
    },
    demoUrl: "/contact",
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
    image: "/images/products/staysync-logo.webp",
    brandColor: "#6F50E9",
    audience: "Hotel groups, resorts, serviced apartments and villa portfolios",
    badge: "22 modules",
    features: [
      "One login across many properties with shared guests and CRM",
      "Full PMS: reservations, availability engine, check-in and check-out",
      "Live room rack combining occupancy and housekeeping status",
      "Folios with auto-posted room charges, tax and split payments",
      "Channel manager syncing OTA rates, inventory and commission",
      "Five revenue centres beyond rooms: F&B, banquet, spa, laundry, room service",
      "Per-room IoT registry for smart locks, thermostats and energy meters",
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
            name: "Front desk",
            detail:
              "A live room rack with assign-on-check-in, and a checkout gated on the folio balance so nobody leaves owing.",
          },
          {
            name: "Room management",
            detail:
              "Room types, rate plans, and live room plus housekeeping status.",
          },
          {
            name: "Housekeeping",
            detail:
              "A Kanban board running pending → in progress → done → verified, with tasks created automatically on checkout.",
          },
          {
            name: "Folio & billing",
            detail:
              "Auto-posted room charges and tax, F&B, service and discount lines, split and multi-method payments, A4 invoices and thermal receipts.",
          },
          {
            name: "Room Service POS",
            detail:
              "A menu and cart that charges straight to the room folio rather than taking a separate payment.",
          },
        ],
      },
      {
        title: "Operations & revenue centres",
        items: [
          {
            name: "Maintenance",
            detail:
              "Work orders by area, category and priority, with assignment and resolution tracking.",
          },
          {
            name: "Laundry",
            detail:
              "Guest, linen and uniform orders with an express tier and a status pipeline.",
          },
          {
            name: "Banquet & events",
            detail:
              "Halls and bookings for weddings, conferences and more, with package pricing and a full booking lifecycle.",
          },
          {
            name: "Spa & salon",
            detail:
              "Services, appointments, therapist assignment and completion.",
          },
          {
            name: "Channel manager",
            detail:
              "OTA channels with connect and disconnect, rate and inventory sync, and commission tracking.",
          },
          {
            name: "Loyalty & marketing",
            detail:
              "Campaigns over email, SMS and WhatsApp, plus promo codes.",
          },
        ],
      },
      {
        title: "Finance & supply chain",
        items: [
          {
            name: "Finance & accounting",
            detail:
              "P&L comparing revenue against expenses, expenses by category, a chart of accounts and the ledger.",
          },
          {
            name: "Procurement",
            detail:
              "Vendors and purchase orders with computed totals and an approve-then-receive flow.",
          },
          {
            name: "Inventory",
            detail:
              "Stock levels with reorder alerts, stock value and adjustments.",
          },
          {
            name: "Asset management",
            detail:
              "An asset register tracking purchase cost against current value, warranty and status.",
          },
          {
            name: "HR & payroll",
            detail:
              "Employees and payroll runs covering basic pay, allowances, deductions and net, with finalisation.",
          },
        ],
      },
      {
        title: "Platform & intelligence",
        items: [
          {
            name: "Multi-property",
            detail:
              "One login opening many properties, each scoped separately but sharing guests and CRM, with an executive portfolio view over all of them.",
          },
          {
            name: "Super administration",
            detail:
              "Hotel group and properties, users, roles and RBAC, a full audit log, and three subscription packages (Starter, Professional, Enterprise) whose module gating is enforced rather than merely hidden in the nav.",
          },
          {
            name: "BI dashboard & reports",
            detail:
              "Occupancy, ADR, RevPAR and revenue with trends and a multi-property rollup.",
          },
          {
            name: "Smart hotel (IoT)",
            detail:
              "A per-room device registry covering smart locks, thermostats and energy meters.",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/products/screens/staysync-dashboard.webp",
        label: "Dashboard",
        caption: "Occupancy, ADR, RevPAR and revenue trend",
      },
      {
        src: "/images/products/screens/staysync-portfolio.webp",
        label: "Portfolio",
        caption: "Multi-property performance side by side",
      },
      {
        src: "/images/products/screens/staysync-reservations.webp",
        label: "Reservations",
        caption: "Bookings against a live availability engine",
      },
      {
        src: "/images/products/screens/staysync-frontdesk-arrivals.webp",
        label: "Front Desk",
        caption: "Arrivals, departures and in-house",
      },
      {
        src: "/images/products/screens/staysync-room-rack.webp",
        label: "Room Rack",
        caption: "Occupancy and housekeeping status per room",
      },
      {
        src: "/images/products/screens/staysync-rooms.webp",
        label: "Rooms",
        caption: "Room types, rate plans and live status",
      },
      {
        src: "/images/products/screens/staysync-housekeeping.webp",
        label: "Housekeeping",
        caption: "Kanban from pending through to verified",
      },
      {
        src: "/images/products/screens/staysync-billing.webp",
        label: "Billing & Folios",
        caption: "Auto-posted charges, tax and split payments",
      },
      {
        src: "/images/products/screens/staysync-folio-detail.webp",
        label: "Folio Detail",
        caption: "Every line on the guest account",
      },
      {
        src: "/images/products/screens/staysync-room-service-pos.webp",
        label: "Room Service POS",
        caption: "Menu and cart charged to the room",
      },
      {
        src: "/images/products/screens/staysync-banquet.webp",
        label: "Banquet & Events",
        caption: "Halls, packages and booking lifecycle",
      },
      {
        src: "/images/products/screens/staysync-spa.webp",
        label: "Spa & Salon",
        caption: "Services, therapists and appointments",
      },
      {
        src: "/images/products/screens/staysync-laundry.webp",
        label: "Laundry",
        caption: "Guest, linen and uniform orders",
      },
      {
        src: "/images/products/screens/staysync-maintenance.webp",
        label: "Maintenance",
        caption: "Work orders by area, category and priority",
      },
      {
        src: "/images/products/screens/staysync-procurement.webp",
        label: "Procurement",
        caption: "Vendors and purchase orders, approve then receive",
      },
      {
        src: "/images/products/screens/staysync-finance.webp",
        label: "Finance",
        caption: "P&L, expenses by category and the ledger",
      },
      {
        src: "/images/products/screens/staysync-channel-manager.webp",
        label: "Channel Manager",
        caption: "OTA rates, inventory sync and commission",
      },
      {
        src: "/images/products/screens/staysync-plan-upgrade.webp",
        label: "Plan Upgrade",
        caption: "Modules locked by plan, with the upgrade path",
      },
      {
        src: "/images/products/screens/staysync-iot.webp",
        label: "Smart Hotel",
        caption: "Per-room locks, thermostats and energy meters",
      },    ],
    languages: ["TypeScript", "TSX", "SQL", "CSS"],
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
      { label: "Live modules", value: "22" },
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
    pricing: {
      note: "Billed monthly. Each tier unlocks a set of navigation modules and is a superset of the one below; the vendor can enable or disable the whole system, and the owner can pay and renew in-app.",
      plans: [
        {
          name: "Starter",
          price: "PKR 15,000",
          period: "/ month",
          summary: "Run the front desk",
          includes: [
            "Reservations & front desk",
            "Room management & housekeeping",
            "Guest CRM",
            "Folio & billing plus invoices",
            "Dashboard & reports",
          ],
        },
        {
          name: "Professional",
          price: "PKR 25,000",
          period: "/ month",
          summary: "Operations & revenue centres",
          featured: true,
          includes: [
            "Everything in Starter",
            "Room-service POS & inventory",
            "Maintenance & laundry",
            "Banquet, events & spa",
            "Loyalty, marketing & channel manager",
          ],
        },
        {
          name: "Enterprise",
          price: "PKR 35,000",
          period: "/ month",
          summary: "Full multi-property ERP",
          includes: [
            "Everything in Professional",
            "Multi-property portfolio",
            "Finance & accounting",
            "HR & payroll",
            "Procurement, assets and Smart Hotel (IoT)",
          ],
        },
      ],
    },
    demoUrl: "/contact",
  },
/* ------------------------------------------------------------------ */
  /* Fleet Flow TMS                                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "fleet-flow",
    name: "Fleet Flow",
    category: "Transport & Logistics",
    status: "in-development",
    tagline: "Smart fleet. Real-time control.",
    description:
      "A multi-tenant transport management platform for truck fleets: vehicles, drivers, customers, shipments and trips with a lifecycle the software enforces rather than trusts, a drag-and-drop dispatch board, a live-tracking feed, and the whole upkeep side — fuel, maintenance, workshop jobs, tyres and parts. Built on a NestJS API and a Next.js console over PostgreSQL and PostGIS, with tenant isolation enforced at four layers so one company's data cannot reach another's. Thirty-six API modules are in — including a finance tier where every invoice, payment, expense and payroll run posts a balanced double-entry journal, a driver app and customer portal, public tracking, and a command centre with analytics and a plain-language assistant. Route planning and geofencing are what remain.",
    image: "/images/products/fleetflow-logo.webp",
    logoLayout: "stacked",
    brandColor: "#FF7B56",
    audience:
      "Trucking companies, logistics operators and freight brokers running their own fleets — from a dozen trucks to several hundred across branches",
    badge: "36 modules",
    features: [
      "Multi-tenant by design — tenant isolation enforced at four layers",
      "Trip lifecycle validated against a transition map, not trusted",
      "Conflict detection dry-runs an assignment before it is committed",
      "Driver assignment over a time window, so history survives reassignment",
      "Shipment totals derived from cargo lines, never typed twice",
      "190 granular permissions across 15 groups and nine seeded roles",
      "A drag-and-drop dispatch board that refuses to double-book a truck",
      "Fuel, maintenance, workshop, tyres and parts, all against the vehicle",
      "Double-entry accounting where debits equal credits, enforced three ways",
      "A driver app with proof of delivery, and public tracking with no login",
      "A command centre and a plain-language assistant over live data",
      "Overdue is derived from today's date, never stored and never stale",
      "Per-tenant numbering that survives two concurrent dispatchers",
      "Vendor kill switch that revokes every live session for a company",
    ],
    moduleGroups: [
      {
        title: "Operations",
        items: [
          {
            name: "Vehicles",
            detail:
              "Full records with plan-limit enforcement, a status lifecycle that refuses to move a truck mid-trip, soft delete that releases the driver and blocks while trips are open, and a per-vehicle count of documents expiring inside 30 days.",
          },
          {
            name: "Drivers",
            detail:
              "Assignment to a truck over a time window rather than a foreign key, so \"who was driving on the 14th\" survives every later reassignment. One primary driver per truck, enforced by a partial unique index, and expired licences surfaced on the list.",
          },
          {
            name: "Customers",
            detail:
              "Contacts, credit limit and payment terms, with deletion blocked while shipments are in progress.",
          },
          {
            name: "Shipments",
            detail:
              "Cargo lines with concurrency-safe numbering and an opaque public tracking code minted at creation. Header weight and value are derived from the lines — a header that disagrees with its items is the classic source of billing disputes.",
          },
          {
            name: "Trips",
            detail:
              "Stops, shipment links, rate and advance, with an append-only event timeline. Every status move is applied with its side effects in one transaction: the truck, the driver, every shipment on board and the timeline entry all move, or none do.",
          },
          {
            name: "Conflict detection",
            detail:
              "Dry-runs an assignment and reports overlapping trips, unavailable trucks, drivers on leave and licences expiring mid-trip. Conflicts block assignment unless an override reason is supplied — and the reason is recorded.",
          },
        ],
      },
      {
        title: "Dispatch, tracking & upkeep",
        items: [
          {
            name: "Dispatch board",
            detail:
              "Trips laid out in lanes — needs a truck, scheduled, at pickup, in transit — with trucks and drivers down the side. Drag one onto a trip, or select the trip and use the assign buttons, which keeps the whole board usable from the keyboard.",
          },
          {
            name: "Live tracking",
            detail:
              "Position, speed, heading and staleness per truck, with a 15-minute silence threshold and filters for moving, idle and stale. The table is the feed the map draws from, so it stays useful before a Mapbox token is configured.",
          },
          {
            name: "Fuel",
            detail:
              "Fill-ups logged against the vehicle and the trip, so consumption is measurable per truck rather than as one monthly invoice.",
          },
          {
            name: "Maintenance",
            detail:
              "Service schedules and jobs by vehicle, tracked against odometer and date so a due service surfaces before it becomes a breakdown.",
          },
          {
            name: "Workshop",
            detail:
              "Job cards through the workshop — what is in, what it needs, who is on it and what it cost.",
          },
          {
            name: "Tyres",
            detail:
              "Tyre history per axle position, with a partial unique index enforcing one tyre per position so a fitting cannot be recorded twice.",
          },
          {
            name: "Parts inventory",
            detail:
              "Stock levels for parts and consumables with reorder points, drawn down by workshop jobs rather than counted separately.",
          },
          {
            name: "Running costs",
            detail:
              "Cost per kilometre assembled from fuel, maintenance, tyres and trip expenses — the figure that decides whether a rate is worth accepting.",
          },
        ],
      },
      {
        title: "Finance & accounting",
        items: [
          {
            name: "Invoices",
            detail:
              "Raised against trips, with tax credited to a liability rather than revenue — the carrier collects it for the state, and booking it as income overstates earnings and understates what is owed at filing. Overdue is derived from today's date, so it is never stale.",
          },
          {
            name: "Payments",
            detail:
              "Receipts allocated against invoices without touching revenue, which was recognised when the invoice issued. Crediting it again on receipt is the double-count that reports twice the income.",
          },
          {
            name: "Expenses",
            detail:
              "Costs booked against a trip, a vehicle or the business, feeding both the P&L and the per-kilometre running cost.",
          },
          {
            name: "Payroll",
            detail:
              "Runs that expense the gross and treat an advance as money owed back rather than salary, so the same rupee is not billed twice. Recovery is capped at a share of gross — clawing back a whole balance in one run is arithmetically correct and operationally ruinous.",
          },
          {
            name: "Double-entry ledger",
            detail:
              "Every financial act posts a balanced journal, enforced three deliberately overlapping ways: a check that refuses an unbalanced draft with a named rule, posting inside the caller's transaction because the constraint is deferred to commit, and a database trigger that makes an unbalanced journal impossible even from psql.",
          },
          {
            name: "Accounting reports",
            detail:
              "Trial balance, profit and loss, and receivables ageing — checkable precisely because the ledger balances, so a wrong figure is a posting rule to fix rather than a number nobody can trace.",
          },
        ],
      },
      {
        title: "Outside the office",
        items: [
          {
            name: "Driver app",
            detail:
              "A driver's own trips on their phone, with status updates and proof of delivery captured where the handover actually happens rather than re-keyed at the depot that evening.",
          },
          {
            name: "Customer portal",
            detail:
              "A customer signs in and sees their own shipments, documents and invoices — which removes the phone call that was previously the only way to answer \"where is my load\".",
          },
          {
            name: "Public tracking",
            detail:
              "An opaque code minted at shipment creation opens a tracking page with no login at all, and an invalid code says so plainly rather than leaking whether it ever existed.",
          },
          {
            name: "Proof of delivery",
            detail:
              "Signature and photo captured against the stop, attached to the trip and visible to the customer through the portal.",
          },
          {
            name: "SOS",
            detail:
              "A driver-side panic path that reaches the operator immediately, because a truck in trouble cannot wait for the next status poll.",
          },
        ],
      },
      {
        title: "Analytics & command centre",
        items: [
          {
            name: "Command centre",
            detail:
              "The whole operation on one screen — trips in flight, exceptions, and what needs a decision now, rather than five tabs an operator has to correlate by hand.",
          },
          {
            name: "Analytics",
            detail:
              "Utilisation, cost and margin sliced by vehicle, driver, customer and lane, so an unprofitable lane is visible before the quarter closes.",
          },
          {
            name: "Reports",
            detail:
              "Operational and financial reports over the same figures the dashboard shows, exportable rather than screenshotted.",
          },
          {
            name: "Assistant",
            detail:
              "Ask the fleet a question in plain words and get an answer drawn from live data, which is a shorter path than knowing which report holds it.",
          },
          {
            name: "Alerts & notifications",
            detail:
              "Licences, vehicle documents and services falling due, surfaced before they expire rather than discovered at a checkpoint.",
          },
        ],
      },
      {
        title: "Platform & tenancy",
        items: [
          {
            name: "Multi-tenancy",
            detail:
              "Four enforcement layers: the tenant comes from the signed JWT only, AsyncLocalStorage carries it through the request, and a Prisma extension injects it into every read, stamps it on every write and throws if a scoped query runs without one. The scoped-model set is derived from the schema at boot, so a model added later is protected the day it exists.",
          },
          {
            name: "Authentication",
            detail:
              "Registration with automatic tenant provisioning, argon2id hashing, rotating refresh tokens with family-wide revocation on reuse, TOTP two-factor with single-use recovery codes, phone OTP for drivers, and rate limits on every credential endpoint.",
          },
          {
            name: "RBAC",
            detail:
              "190 permissions in 15 groups across nine seeded roles, with wildcard expansion, a global guard and cache-backed resolution — so a revoked role takes effect immediately rather than when the token expires.",
          },
          {
            name: "Platform console",
            detail:
              "The vendor's own account: suspend a company to revoke every live session and block both sign-in and tenant switching, reactivate, extend the period after payment, change plan, or enter a company through the audited switch-tenant path.",
          },
          {
            name: "Branches & users",
            detail:
              "Multiple branches per company, user management, invitations and per-branch scoping.",
          },
          {
            name: "Audit log",
            detail:
              "Append-only at the database level via a trigger, so history cannot be quietly rewritten from the application tier.",
          },
        ],
      },
      {
        title: "Data & integrity",
        items: [
          {
            name: "Schema",
            detail:
              "68 Prisma models covering all eight phases, so later features slot into a schema that already anticipated them instead of forcing a migration of live data.",
          },
          {
            name: "Constraints Prisma cannot express",
            detail:
              "A hand-authored SQL layer: check constraints (a geofence is a circle or a polygon, never both; a ledger line is a debit or a credit), partial unique indexes, and a deferred constraint trigger asserting that every journal balances.",
          },
          {
            name: "Spatial & search indexes",
            detail:
              "PostGIS geography columns with GiST indexes for tracking, BRIN indexes for time-series telemetry, and trigram indexes so search stays fast as the tables grow.",
          },
          {
            name: "Numbering",
            detail:
              "A per-tenant sequence incremented by one atomic upsert, allocated inside the creating transaction. MAX(number) + 1 races under two concurrent dispatchers, and a unique violation on trip creation is a terrible way to find out.",
          },
          {
            name: "Shared contracts",
            detail:
              "The permission catalogue, role definitions, status enums, the legal trip-transition map, the GPS packet contract and the Zod schemas all live in one package used by API and console alike, so a status string cannot drift between tiers.",
          },
          {
            name: "Dashboard",
            detail:
              "Real fleet, driver, trip and shipment tallies, month-to-date revenue, expenses and profit, on-time delivery over 30 days, a daily trip trend and a six-month revenue series.",
          },
        ],
      },
    ],
    /*
      Real captures from the running console. Fleet Flow keeps its roadmap as
      well as its gallery: the screens prove what works, and the roadmap is the
      honest answer to what does not yet.
    */
    screens: [
      {
        src: "/images/products/screens/fleetflow-dashboard-trends.webp",
        label: "Dashboard",
        caption: "Utilisation, 30-day trip trend and six-month revenue",
      },
      {
        src: "/images/products/screens/fleetflow-dashboard-fleet-status.webp",
        label: "Fleet Status",
        caption: "Available, on trip, loading, idle and maintenance",
      },
      {
        src: "/images/products/screens/fleetflow-dispatch.webp",
        label: "Dispatch Board",
        caption: "Drag a truck or driver onto a trip, by lane",
      },
      {
        src: "/images/products/screens/fleetflow-trips.webp",
        label: "Trips",
        caption: "Execution side, with delayed trips badged",
      },
      {
        src: "/images/products/screens/fleetflow-trip-detail.webp",
        label: "Trip Detail",
        caption: "Lifecycle actions generated from the transition map",
      },
      {
        src: "/images/products/screens/fleetflow-tracking.webp",
        label: "Live Tracking",
        caption: "Position, speed, heading and staleness per truck",
      },
      {
        src: "/images/products/screens/fleetflow-shipments.webp",
        label: "Shipments",
        caption: "The commercial side of the load",
      },
      {
        src: "/images/products/screens/fleetflow-vehicles.webp",
        label: "Vehicles",
        caption: "Fleet register with document-expiry counts",
      },
      {
        src: "/images/products/screens/fleetflow-drivers.webp",
        label: "Drivers",
        caption: "Licence expiry and the truck currently assigned",
      },
      {
        src: "/images/products/screens/fleetflow-fuel.webp",
        label: "Fuel",
        caption: "Fill-ups against the vehicle and the trip",
      },
      {
        src: "/images/products/screens/fleetflow-maintenance.webp",
        label: "Maintenance",
        caption: "Service schedules by odometer and date",
      },
      {
        src: "/images/products/screens/fleetflow-workshop.webp",
        label: "Workshop",
        caption: "Job cards — what is in, who is on it, what it cost",
      },
      {
        src: "/images/products/screens/fleetflow-tires.webp",
        label: "Tyres",
        caption: "History per axle position, one tyre per position",
      },
      {
        src: "/images/products/screens/fleetflow-inventory.webp",
        label: "Parts Inventory",
        caption: "Stock and reorder points, drawn down by jobs",
      },
      {
        src: "/images/products/screens/fleetflow-running-costs.webp",
        label: "Running Costs",
        caption: "Cost per kilometre from fuel, upkeep and expenses",
      },
      {
        src: "/images/products/screens/fleetflow-customers.webp",
        label: "Customers",
        caption: "Credit limits and payment terms",
      },
      {
        src: "/images/products/screens/fleetflow-invoices.webp",
        label: "Invoices",
        caption: "Issued against trips, with overdue derived from today",
      },
      {
        src: "/images/products/screens/fleetflow-payments.webp",
        label: "Payments",
        caption: "Receipts allocated to invoices, never re-crediting revenue",
      },
      {
        src: "/images/products/screens/fleetflow-expenses.webp",
        label: "Expenses",
        caption: "Costs against the trip, vehicle or the business",
      },
      {
        src: "/images/products/screens/fleetflow-payroll.webp",
        label: "Payroll",
        caption: "Gross expensed, advances recovered at a capped share",
      },
      {
        src: "/images/products/screens/fleetflow-accounting.webp",
        label: "Accounting",
        caption: "Trial balance, P&L and receivables ageing",
      },
      {
        src: "/images/products/screens/fleetflow-driver-my-trips.webp",
        label: "Driver App",
        caption: "A driver's own trips, on their phone",
      },
      {
        src: "/images/products/screens/fleetflow-customer-portal.webp",
        label: "Customer Portal",
        caption: "A customer's shipments, without an account manager",
      },
      {
        src: "/images/products/screens/fleetflow-public-tracking.webp",
        label: "Public Tracking",
        caption: "A tracking code anyone can open, no login",
      },
      {
        src: "/images/products/screens/fleetflow-command-centre.webp",
        label: "Command Centre",
        caption: "The whole operation on one screen",
      },
      {
        src: "/images/products/screens/fleetflow-analytics.webp",
        label: "Analytics",
        caption: "Utilisation, cost and margin by dimension",
      },
      {
        src: "/images/products/screens/fleetflow-assistant.webp",
        label: "Assistant",
        caption: "Ask the fleet a question in plain words",
      },
      {
        src: "/images/products/screens/fleetflow-alerts.webp",
        label: "Alerts",
        caption: "Licences, documents and services falling due",
      },
      {
        src: "/images/products/screens/fleetflow-platform-console.webp",
        label: "Platform Console",
        caption: "Every tenant, its plan and its usage",
      },
      {
        src: "/images/products/screens/fleetflow-settings.webp",
        label: "Settings",
        caption: "Plan limits and usage against them",
      },    ],
    roadmap: [
      {
        label: "Phase 1",
        title: "Foundation",
        detail:
          "Monorepo, 68-model schema, authentication, multi-tenancy, RBAC, the design system and the app shell.",
        state: "done",
      },
      {
        label: "Phase 2",
        title: "Operational core",
        detail:
          "Vehicles, drivers, customers, shipments, trips with an enforced lifecycle, and a dashboard on real tenant data.",
        state: "done",
      },
      {
        label: "Phase 3",
        title: "Dispatch & live tracking",
        detail:
          "The dispatch board, live-tracking feed and alerting are in. Route planning and geofencing over PostGIS are what remain.",
        state: "next",
      },
      {
        label: "Phase 4",
        title: "Fleet upkeep",
        detail:
          "Fuel, maintenance schedules, workshop job cards, tyre positions and parts inventory — all five in, each tied to the vehicle rather than kept in a separate book.",
        state: "done",
      },
      {
        label: "Phase 5",
        title: "Finance",
        detail:
          "Invoices, payments, expenses, payroll and a double-entry ledger, all in — debits equal to credits, enforced at the service, in the transaction and by the database.",
        state: "done",
      },
      {
        label: "Phase 6",
        title: "Portals & driver app",
        detail:
          "Driver app with proof of delivery and SOS, a customer portal, and public tracking on an opaque code — all in.",
        state: "done",
      },
      {
        label: "Phase 7",
        title: "Analytics & command centre",
        detail:
          "Command centre, analytics, reports, notifications and a plain-language assistant over live data — all in.",
        state: "done",
      },
      {
        label: "Phase 8",
        title: "Hardening & launch",
        detail: "Performance, security review, billing and production rollout.",
        state: "planned",
      },
    ],
    languages: ["TypeScript", "TSX", "SQL", "CSS"],
    stack: [
      "TypeScript",
      "NestJS",
      "Next.js 15",
      "Prisma",
      "PostgreSQL 16",
      "PostGIS",
      "Redis",
      "Docker",
    ],
    specs: [
      { label: "Prisma models", value: "68" },
      { label: "API endpoints", value: "190" },
      { label: "API modules", value: "36" },
      { label: "Phases shipped", value: "6 / 8" },
    ],
    metric: { label: "Tenant isolation layers", value: "4" },
    pricing: {
      note: "Billed monthly per company. Limits are enforced server-side, so a plan is a real ceiling rather than a suggestion.",
      plans: [
        {
          name: "Starter",
          price: "PKR 15,000",
          period: "/ month",
          summary: "15 vehicles · 10 users · 1 branch",
          includes: [
            "Trips, tracking, fuel and maintenance",
            "30 days of GPS retention",
            "One branch",
          ],
        },
        {
          name: "Growth",
          price: "PKR 55,000",
          period: "/ month",
          summary: "100 vehicles · 50 users · 5 branches",
          featured: true,
          includes: [
            "Everything in Starter",
            "Workshop, parts inventory and the finance tier",
            "Customer portal",
            "90 days of GPS retention",
          ],
        },
        {
          name: "Enterprise",
          price: "PKR 180,000",
          period: "/ month",
          summary: "Effectively uncapped · 500 branches",
          includes: [
            "Everything in Growth",
            "AI-assisted dispatch and the command centre",
            "API access and white-labelling",
            "365 days of GPS retention",
          ],
        },
      ],
    },
    demoUrl: "/contact",
  },
];
