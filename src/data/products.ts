import type { Product } from "@/types";

/**
 * The products built by Plutox Tech — three products, all shipped.
 *
 * ServeSync is one POS with three editions (restaurant / pharmacy / mart) chosen
 * at first run. It used to be three separate products; PharmaSync and Vendeez were
 * ported into it and retired, so they are no longer listed separately.
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
  /* ServeSync POS — one product, three verticals                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "servesync-pos",
    name: "ServeSync POS",
    category: "Multi-vertical POS",
    tagline: "One POS for restaurants, pharmacies and marts",
    description:
      "One POS that runs three kinds of business. The edition is picked at first run — restaurant, pharmacy or mart — and it decides the theme, the vocabulary and which of the 33 modules appear: a pharmacy gets prescriptions and a controlled register but no floor plan; a mart gets promotions and scale labels but no kitchen display. Same offline-first, multi-branch codebase underneath, so a fix lands in all three at once. The pharmacy and mart captures below were taken in the standalone builds those editions were ported from.",
    image: "/images/products/servesync-logo.webp",
    brandColor: "#33BCA8",
    audience:
      "Restaurants, cafés and cloud kitchens; retail pharmacies and medical stores; supermarkets, grocery stores and mini-marts",
    badge: "3 editions",
    features: [
      "Restaurant, pharmacy or mart — chosen at first run, themed and relabelled to match",
      "33 modules, gated per edition: 26 shared, 4 pharmacy-only, 3 mart-only",
      "Offline-first PWA — an outbox replays every sale on reconnect",
      "Multi-branch by design: one owner login over many shops, one central warehouse",
      "Pharmacy: batch stock with FEFO dispensing, Rx gating and a controlled register",
      "Mart: barcode scanning three ways, promotions, gift cards and scale labels",
      "Restaurant: kitchen display, live floor plan, delivery and Foodpanda",
      "PRA / FBR fiscal invoicing shared by all three editions",
      "Silent ESC/POS printing straight to the thermal printer, no browser dialog",
      "A 2 MB Windows thin client that reloads the new UI when the server updates",
    ],
    moduleGroups: [
      {
        title: "Editions — how one product becomes three",
        items: [
          {
            name: "Edition picker at first run",
            detail:
              "The superadmin chooses restaurant, pharmacy or mart on first launch, and can change it later in Setup. The choice is stored server-side and served pre-login, so even the splash and login screen are already themed for the business. Existing restaurant installs migrate to the restaurant edition and are never asked.",
          },
          {
            name: "Runtime theming, not separate builds",
            detail:
              "Each edition carries its own name, accent and vocabulary — restaurant teal #33bca8, pharmacy blue #004aad, mart orange #f97316 — swapped into CSS custom properties at boot. One installer therefore ships all three editions; there is no per-vertical build to keep in step.",
          },
          {
            name: "Terminology that matches the trade",
            detail:
              "The same screens are relabelled per edition: Order becomes Sell, Menu becomes Medicines or Products, Customers becomes Patients, Vendors becomes Suppliers. Staff read their own language rather than restaurant jargon.",
          },
          {
            name: "Module gating per edition",
            detail:
              "26 modules are shared. Four are pharmacy-only (Prescriptions, Doctors, Controlled, Expiry) and three are mart-only (Promotions, Gift Cards, Labels). Five restaurant modules — Tables, Kitchen, Delivery, Foodpanda, R&D — are hidden outside the restaurant edition. Gating is enforced in the sidebar and again server-side, on top of the package and role checks.",
          },
        ],
      },
      {
        title: "Point of sale & floor (all editions)",
        items: [
          {
            name: "Point of sale",
            detail:
              "Dine-in / takeaway / delivery for restaurants, scan-to-cart for marts and pharmacies. Modifiers and per-item add-ons, % or fixed discounts, surcharges, promo and loyalty redemption, split and method-based tax.",
          },
          {
            name: "Orders & invoices",
            detail:
              "The full order list with manage, void and refund behind a supervisor PIN, pre-bill and customer bill, and a QR code on every receipt.",
          },
          {
            name: "Silent thermal printing",
            detail:
              "Raw ESC/POS spooled to the configured Windows or system printer, so Print and the kitchen ticket go straight to the thermal head with no browser dialog and no GDI garbage. Receipts, KOTs, pre-bills and warehouse transfer invoices all print direct, with a browser window only as a fallback.",
          },
          {
            name: "Receipt customisation",
            detail:
              "Font size, style and weight per line, separate controls for the title and thank-you text, a logo watermark, contact number, NTN and a QR that renders as a raster bitmap so it prints on thermal heads that never supported the native QR command.",
          },
          {
            name: "Till & shift",
            detail:
              "Opening float, cash in/out, mid-shift X-report, Z-report with variance and order counts, and one-step cashier handover.",
          },
          {
            name: "Catalogue management",
            detail:
              "Categories and sub-categories, recipes, modifier groups, custom add-ons — labelled Menu, Medicines or Products depending on the edition.",
          },
          {
            name: "Customers & CRM",
            detail:
              "Profiles with purchase history, loyalty points and tiers, credit on account, and Excel export. Shown as Patients in the pharmacy edition.",
          },
          {
            name: "Reports & BI",
            detail:
              "Sales, by-channel, discounts, tax by method, top sellers and forecast — with the owner rolling every figure up across branches.",
          },
        ],
      },
      {
        title: "Restaurant edition",
        items: [
          {
            name: "Floor plan & tables",
            detail:
              "Live table status with dwell-time colour escalation, waiter assignment, add-to and view occupied tables, merge and transfer — and a refusal to punch a new order onto a table that is already occupied.",
          },
          {
            name: "Kitchen Display (KDS)",
            detail:
              "Live tickets per station, bump and recall, 86-items, KOT notes, and a cross-branch view for the owner. The KOT prints centred with a banner header, items left and add-ons right, and names whoever punched the order.",
          },
          {
            name: "Delivery",
            detail:
              "Zones and riders with live Google Maps plotting, geocoding, one-tap navigate links and customer GPS share.",
          },
          {
            name: "Foodpanda channel",
            detail:
              "Aggregator orders as a first-class channel through a secret-gated webhook, with accept/decline and SKU mapping — and the channel marked on the kitchen ticket.",
          },
          {
            name: "R&D Lab",
            detail:
              "Recipe development kept off the live menu until it is ready, with its own purchasing and a costing engine returning food-cost percentage, gross profit and a suggested price. Gated to the Premium package.",
          },
        ],
      },
      {
        title: "Pharmacy edition",
        items: [
          {
            name: "Batch stock with FEFO dispensing",
            detail:
              "Medicines are stocked by batch with manufacture and expiry dates. A sale allocates first-expiry-first-out and records which batches it consumed; expired stock is excluded from sellable stock rather than merely flagged.",
          },
          {
            name: "Expiry watch",
            detail:
              "An expiry report over every batch — what has expired, what is close — so slow movers are returned or discounted before they are worthless.",
          },
          {
            name: "Prescriptions & doctors",
            detail:
              "Prescriber records and prescriptions with auto-numbered RX-n, patient, doctor, diagnosis, medicines and status. Dispensing a prescription at the till marks it dispensed and tags the order.",
          },
          {
            name: "Rx enforcement at the counter",
            detail:
              "Items flagged Rx-required or controlled cannot be sold without a linked prescription — the payment is refused, not warned about — unless a manager overrides, and the override is recorded. Generic name and strength sit on the item so the cashier can match what was prescribed.",
          },
          {
            name: "Controlled-drug register",
            detail:
              "Every controlled dispense writes to its own register with the medicine, batch, prescription, who dispensed it and when, readable as an audit trail rather than reconstructed from sales.",
          },
          {
            name: "Manufacturers & suppliers",
            detail:
              "A manufacturer field on every medicine, and each batch linked to the supplier it came from, so a recall or a bad batch traces back to one vendor.",
          },
        ],
      },
      {
        title: "Mart & retail edition",
        items: [
          {
            name: "Barcode scanning, three ways",
            detail:
              "A USB or Bluetooth gun captured globally with no need to focus the search box, the device camera, or a staff phone paired over Socket.IO that streams its scans to the till. All three land in the same scan-to-cart path.",
          },
          {
            name: "Barcode lookup",
            detail:
              "An unknown barcode is checked against the catalogue, then Open Food Facts, then UPCitemdb — so a new line can be created at the counter instead of set aside.",
          },
          {
            name: "Weighed & pack/loose selling",
            detail:
              "Produce sold by weight with a price per kg and a PLU, and packaged goods sold as a full pack or loose units. Stock deducts in kilos for weighed items and as a fraction of a pack for loose ones.",
          },
          {
            name: "Barcode & scale labels",
            detail:
              "An EAN-13 generator printing shelf labels and scale labels with the price embedded in the barcode, so the label scans at the till at exactly the price printed on it. Verified generate-then-scan, not just generated.",
          },
          {
            name: "Promotions engine",
            detail:
              "Buy-X-Get-Y, category percentage off, combo pricing and flat discounts, computed into the cart total automatically rather than keyed in by the cashier.",
          },
          {
            name: "Loyalty tiers",
            detail:
              "Silver, Gold and Platinum awarded on lifetime spend, with a tier bonus on points earned and the tier shown against the customer at the till.",
          },
          {
            name: "Gift cards",
            detail:
              "Issue, top up, look up a balance and disable a card, plus a gift-card tender that caps at the balance, allows a partial payment and deducts with a history entry.",
          },
        ],
      },
      {
        title: "Operations & supply chain (all editions)",
        items: [
          {
            name: "All-branches command centre",
            detail:
              "Every branch's live sales, open orders, alerts and who's on shift — each card drilling into that branch's reports, stock, staff and demand.",
          },
          {
            name: "Central warehouse",
            detail:
              "Stock held behind the shop floor: branch demands → dispatch → receive, with goods-received notes and a transfer invoice that prints direct to thermal.",
          },
          {
            name: "Inventory",
            detail:
              "Two linked inventories with live 'makeable' counts for recipes, batch tracking where the edition needs it, FIFO/LIFO valuation, expiry flags and Excel export. Retail sales deduct stock on payment.",
          },
          {
            name: "Purchasing & approvals",
            detail:
              "A dedicated purchaser role with its own kiosk — limited to demand, vendors and warehouse — plus an owner approval path, where only a purchaser or the owner can approve or reject a purchase order.",
          },
          {
            name: "Settings & packages",
            detail:
              "Branches with quick rename, tax rules, printers, OTP, branding, access control, integrations and the edition switch — plus three subscription packages whose module gating is enforced in the sidebar and again server-side.",
          },
        ],
      },
      {
        title: "Back office & compliance (all editions)",
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
              "Supplier records and invoices with pay-now or pay-later terms and payment reminders, plus warehouse purchase invoices for goods received in. Labelled Suppliers in the pharmacy and mart editions.",
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
              "Reports paid invoices to Punjab and Federal tax authorities, printing the official invoice number, QR and NTN on every receipt.",
          },
        ],
      },
      {
        title: "Field & guest apps",
        items: [
          {
            name: "Windows desktop client",
            detail:
              "A .NET and WebView2 shell that asks once for the POS server address and then loads it. Updating the server updates every till — no reinstall, no version drift across a floor of terminals. Ctrl+Shift+O repoints it, and a failed load returns to the setup screen rather than a blank window. One installer carries all three editions.",
          },
          {
            name: "Waiter order pad",
            detail:
              "Mobile dine-in and takeaway punching from the floor, table-aware, with PIN login. The login screen only offers the companion apps that the current edition actually uses.",
          },
          {
            name: "Rider delivery app",
            detail:
              "A phone-login field app listing assigned deliveries with navigate, call and status updates.",
          },
          {
            name: "Phone scanner",
            detail:
              "A staff phone paired by QR that becomes a scanner, relaying each scan to the till over Socket.IO for selling or stock-in.",
          },
          {
            name: "Customer QR self-order & kiosk",
            detail:
              "A scan-to-order card menu with its own per-device theme, cart and checkout, which doubles as a self-service kiosk.",
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
    /*
      54 captures: 18 from the restaurant edition, 18 from the pharmacy build and
      18 from the mart build. The pharmacy and mart sets were taken in the
      standalone products those editions were ported from — said plainly in the
      description rather than passed off as captures of the unified build.
    */
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
      },
      {
        src: "/images/products/screens/pharmasync-dashboard.svg",
        label: "Pharmacy Dashboard",
        caption: "Sales, profit, inventory value and cash drawer",
      },
      {
        src: "/images/products/screens/pharmasync-pos.svg",
        label: "Sell (Pharmacy)",
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
        label: "Medicine Master",
        caption: "Schedule, strength and cold-chain flags",
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
        label: "Pharmacy Receipt",
        caption: "Thermal output with QR and logo watermark",
      },
      {
        src: "/images/products/screens/vendeez-pos.webp",
        label: "Sell (Mart)",
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
        label: "Retail Inventory",
        caption: "Batches, expiry alerts and FEFO allocation",
      },
      {
        src: "/images/products/screens/vendeez-stock-in.webp",
        label: "Stock In",
        caption: "Goods received against a purchase order",
      },
      {
        src: "/images/products/screens/vendeez-warehouse.webp",
        label: "Retail Warehouse",
        caption: "Central stock, reorder points and transfers to store",
      },
      {
        src: "/images/products/screens/vendeez-purchases.webp",
        label: "Purchases",
        caption: "PO to GRN to payable",
      },
      {
        src: "/images/products/screens/vendeez-suppliers.webp",
        label: "Vendor Ledger",
        caption: "Bills, payables and ageing",
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
        label: "Retail Till",
        caption: "Shift open and close with cash reconciliation",
      },
      {
        src: "/images/products/screens/vendeez-a4-invoice.webp",
        label: "A4 Invoice",
        caption: "Printable invoice alongside the thermal receipt",
      },
      {
        src: "/images/products/screens/vendeez-fiscal.webp",
        label: "Fiscal Gateway",
        caption: "PRA / FBR registration, sandbox and live",
      },
    ],
    languages: ["JavaScript", "HTML", "CSS", "C#"],
    stack: [
      "Node.js",
      "Express",
      "Socket.IO",
      "Vanilla JS PWA",
      "ESC/POS",
      "ZXing",
      ".NET + WebView2",
      "Electron",
      "Docker",
    ],
    specs: [
      { label: "Modules", value: "33" },
      { label: "Editions", value: "3" },
      { label: "REST endpoints", value: "236" },
      { label: "Runtime deps", value: "4" },
    ],
    payments: [
      "Cash",
      "Card",
      "JazzCash",
      "EasyPaisa",
      "Raast",
      "Bank transfer",
      "Gift card",
      "Credit on account",
    ],
    metric: { label: "Verticals from one codebase", value: "3" },
    /*
      Three charts, one per edition.

      The prices are the same in all three because that is what the POS charges —
      `PLAN_PRICING` in its own `routes.js` is a single table, and inventing
      different numbers per vertical would be a marketing decision dressed up as a
      fact. What differs is what each tier *contains*, and that is the whole point
      of splitting the charts: the tiers gate by module id, five restaurant modules
      are hidden outside the restaurant edition, and each vertical's own modules
      are not in any tier list at all — so they come with the edition rather than
      with a higher tier. A shared chart would have offered a kitchen display to a
      pharmacist and left the controlled-drug register unmentioned.
    */
    pricing: [
      {
        edition: "Restaurant",
        editionSummary:
          "Dine-in, takeaway and delivery, with the floor and the kitchen on screen.",
        note: "Per branch, billed monthly. The package gates which modules a branch gets, enforced in the sidebar and again server-side.",
        plans: [
          {
            name: "Basic",
            price: "PKR 5,000",
            period: "/ month",
            summary: "Core POS to run a single restaurant",
            includes: [
              "Order, Tables & Kitchen display",
              "Orders, Invoices & QR receipts",
              "Customers & loyalty",
              "Menu, Till & shift, Setup",
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
              "Stock, Demand planning",
              "Staff, Vendors, Promos, Expenses",
              "Delivery & Reports",
            ],
          },
          {
            name: "Premium",
            price: "PKR 15,000",
            period: "/ month",
            summary: "The full suite — every module, many branches",
            includes: [
              "Everything in Standard",
              "Branches command centre & Warehouse",
              "HR & payroll, Accounts",
              "Foodpanda, PRA / FBR, R&D Lab",
            ],
          },
        ],
      },
      {
        edition: "Pharmacy",
        editionSummary:
          "Batch stock, prescriptions and the controlled register — no floor plan, no kitchen.",
        note: "Per branch, billed monthly. Dispensing, prescriptions, the controlled register and expiry tracking come with the edition at every tier, not with a higher one.",
        plans: [
          {
            name: "Basic",
            price: "PKR 5,000",
            period: "/ month",
            summary: "Core counter for a single pharmacy",
            includes: [
              "Sell, Orders & Invoices",
              "Prescriptions, Doctors & Controlled register",
              "Batch stock with FEFO & Expiry watch",
              "Patients, Medicines, Till & shift, Setup",
            ],
          },
          {
            name: "Standard",
            price: "PKR 10,000",
            period: "/ month",
            summary: "Everything to run and grow one pharmacy",
            featured: true,
            includes: [
              "Everything in Basic",
              "Stock, Demand planning",
              "Staff, Suppliers, Promos, Expenses",
              "Reports & analytics",
            ],
          },
          {
            name: "Premium",
            price: "PKR 15,000",
            period: "/ month",
            summary: "The full suite — every module, many branches",
            includes: [
              "Everything in Standard",
              "Branches command centre & Warehouse",
              "HR & payroll, Accounts",
              "PRA / FBR fiscal invoicing",
            ],
          },
        ],
      },
      {
        edition: "Mart & Retail",
        editionSummary:
          "Three ways to scan, promotions and gift cards — no floor plan, no kitchen.",
        note: "Per branch, billed monthly. Promotions, gift cards and barcode labels come with the edition at every tier, not with a higher one.",
        plans: [
          {
            name: "Basic",
            price: "PKR 5,000",
            period: "/ month",
            summary: "Core checkout for a single store",
            includes: [
              "Sell with USB, camera or phone scanning",
              "Promotions, Gift cards & Barcode labels",
              "Orders, Invoices & Customers",
              "Products, Till & shift, Setup",
            ],
          },
          {
            name: "Standard",
            price: "PKR 10,000",
            period: "/ month",
            summary: "Everything to run and grow one store",
            featured: true,
            includes: [
              "Everything in Basic",
              "Batch stock with FEFO, Demand planning",
              "Staff, Suppliers, Promos, Expenses",
              "Reports & analytics",
            ],
          },
          {
            name: "Premium",
            price: "PKR 15,000",
            period: "/ month",
            summary: "The full suite — every module, many branches",
            includes: [
              "Everything in Standard",
              "Branches command centre & Warehouse",
              "HR & payroll, Accounts",
              "PRA / FBR fiscal invoicing",
            ],
          },
        ],
      },
    ],
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
              "A menu and cart that charges straight to the room folio rather than taking a separate payment, with the menu editable in place — add, edit or remove a dish without a developer.",
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
              "Hotel group and properties, a full audit log, and three subscription packages (Starter, Professional, Enterprise) whose module gating is enforced rather than merely hidden in the nav.",
          },
          {
            name: "Staff & role management",
            detail:
              "Add and edit staff with their PIN, role, property access and active state, and build roles from department checkboxes plus a per-module None / Read / Full permission picker — so access is composed in the UI rather than requested from whoever has database access.",
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
    pricing: [
      {
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
    ],
    demoUrl: "/contact",
  },

  /* ------------------------------------------------------------------ */
  /* Fleet Flow TMS                                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "fleet-flow",
    name: "Fleet Flow",
    category: "Transport & Logistics",
    tagline: "Smart fleet. Real-time control.",
    description:
      "A multi-tenant transport platform for truck fleets: vehicles, drivers, shipments and trips with a lifecycle the software enforces rather than trusts, a drag-and-drop dispatch board, live tracking, geofences and route planning — plus the upkeep side and a finance tier where every invoice, payment and payroll run posts a balanced double-entry journal. NestJS and Next.js over PostgreSQL and PostGIS, with tenant isolation enforced at four layers so one company's data cannot reach another's.",
    image: "/images/products/fleetflow-logo.webp",
    logoLayout: "stacked",
    brandColor: "#FF7B56",
    audience:
      "Trucking companies, logistics operators and freight brokers running their own fleets — from a dozen trucks to several hundred across branches",
    badge: "38 modules",
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
      "Postgres row-level security, verified across 59 tables, not just described",
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
            name: "Row-level security",
            detail:
              "The fourth tenancy layer, applied to every table carrying a tenantId and derived from the system catalogue rather than a hand-kept list — one forgotten entry would leave a table unprotected with nothing looking wrong. The API connects as the table owner, so behaviour is unchanged; what it stops is every other route in, psql and BI tools included, which see nothing until they declare a tenant. Verified across 59 tables rather than asserted.",
          },
          {
            name: "Boot guard",
            detail:
              "The API refuses to start in production while any placeholder secret survives, and refuses if the two JWT secrets match — sharing one lets a stolen access token be replayed as a refresh token, turning a 15-minute exposure into a 30-day one. A warning in a log is not a control.",
          },
          {
            name: "CI & verified backups",
            detail:
              "Typecheck, tests, lint and build on every push, then a real Postgres, migrate, seed, verify RLS and seven live smoke suites — because every defect this project has actually shipped was invisible to a typechecker. Backups run dump, restore and verify, the last restoring into a scratch database and counting rows, since an untested backup is a hope.",
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
        src: "/images/products/screens/fleetflow-geofences.webp",
        label: "Geofences",
        caption: "Circular zones matched by haversine, no PostGIS round trip",
      },
      {
        src: "/images/products/screens/fleetflow-geofence-crossings.webp",
        label: "Geofence Crossings",
        caption: "Entries and exits, counted in one query per sweep",
      },
      {
        src: "/images/products/screens/fleetflow-tracking-map.webp",
        label: "Tracking Map",
        caption: "Every truck's last position, live",
      },
      {
        src: "/images/products/screens/fleetflow-tracking-map-geofence.webp",
        label: "Map & Zones",
        caption: "Restricted zones drawn over the live fleet",
      },
      {
        src: "/images/products/screens/fleetflow-routes.webp",
        label: "Routes",
        caption: "Planned lanes with distance and expected duration",
      },
      {
        src: "/images/products/screens/fleetflow-routes-lane.webp",
        label: "Route Lane",
        caption: "One lane end to end, with its stops",
      },
      {
        src: "/images/products/screens/fleetflow-reports.webp",
        label: "Reports",
        caption: "Exports built from the same queries as the screens",
      },
      {
        src: "/images/products/screens/fleetflow-notifications.webp",
        label: "Notifications",
        caption: "SOS, breakdown and zone entry, routed to who is on call",
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
          "Dispatch board, live-tracking feed, circular geofences with crossing detection, alerting and route planning with named lanes — all in.",
        state: "done",
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
        detail:
          "Row-level security applied as the fourth tenancy layer and verified across 59 tables, a boot guard that refuses to start on placeholder secrets, CI that runs seven live smoke suites against a real Postgres, and backups whose restore is actually verified. The load test and a containerised deploy are the two items still outstanding.",
        state: "done",
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
      { label: "API endpoints", value: "195" },
      { label: "API modules", value: "38" },
      { label: "Phases shipped", value: "8 / 8" },
    ],
    metric: { label: "Tenant isolation layers", value: "4" },
    pricing: [
      {
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
    ],
    demoUrl: "/contact",
  },
];
