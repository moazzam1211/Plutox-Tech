import type { Product } from "@/types";

/**
 * The products built by Plutox Tech — eleven platforms.
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
  /* ServeSync ERP — one product, three verticals                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "servesync-pos",
    name: "ServeSync ERP",
    category: "Multi-vertical POS",
    tagline: "One POS, 62 kinds of business",
    description:
      "One POS that runs 62 kinds of business. The type is picked at first run — grocery, mart, restaurant, cafe, bakery, pharmacy, salon, gym and fifty-four more — and resolves to one of three engines, which decides the theme, the vocabulary and which of the 33 modules appear: a pharmacy gets prescriptions and a controlled register but no floor plan; a mart gets promotions and scale labels but no kitchen display. Same offline-first, multi-branch codebase underneath, so a fix lands in every type at once. The pharmacy and mart captures below were taken in the standalone builds those engines were ported from.",
    image: "/images/products/servesync-logo.webp",
    brandColor: "#33BCA8",
    audience:
      "Restaurants, cafés and cloud kitchens; retail pharmacies and medical stores; supermarkets, grocery stores and mini-marts",
    badge: "62 business types",
    features: [
      "62 business types across retail, food, services, health and home trades",
      "Three engines underneath — restaurant, pharmacy, mart — picked for you by type",
      "33 modules, gated per edition: 26 shared, 4 pharmacy-only, 3 mart-only",
      "Offline-first PWA — an outbox replays every sale on reconnect",
      "Multi-branch by design: one owner login over many shops and warehouses",
      "Multiple warehouses, each with its own code, category and staff",
      "Pharmacy: batch stock with FEFO dispensing, Rx gating and a controlled register",
      "Mart: barcode scanning three ways, promotions, gift cards and scale labels",
      "Restaurant: kitchen display, live floor plan, delivery and Foodpanda",
      "Partial payments \u2014 part cash, part card on one bill, or the balance on the customer\u2019s Khata",
      "Set up from the vendor console \u2014 menu, staff, tables and receipt details arrive before the first sale",
      "PRA / FBR fiscal invoicing shared by all three editions",
      "Silent ESC/POS printing straight to the thermal printer, no browser dialog",
      "A desktop app that updates itself \u2014 an \u201cUpdate now\u201d banner, not a reinstall",
      "260 vector icons replacing every emoji, so the UI stays crisp at any DPI",
    ],
    moduleGroups: [
      {
        title: "Business types — how one product becomes sixty-two",
        items: [
          {
            name: "Business-type picker at first run",
            detail:
              "The superadmin searches 62 types — 20 retail, 13 food, 12 services, 9 health and beauty, 7 home and micro — and picks the match. Each resolves to an engine: 45 run the mart engine, 15 the restaurant engine, 2 the pharmacy engine. It can be changed later in Setup. The choice is stored server-side and served pre-login, so even the splash and login screen are already themed for the business. Existing restaurant installs migrate to the restaurant edition and are never asked.",
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
              "Dine-in / takeaway / delivery for restaurants, scan-to-cart for marts and pharmacies. Modifiers and per-item add-ons, % or fixed discounts, surcharges, promo and loyalty redemption, split and method-based tax. A bill can be settled in parts and by several methods \u2014 cash now, the rest by card \u2014 or its balance put on the customer\u2019s Khata, so the bill closes and the debt lands in their ledger.",
          },
          {
            name: "Orders & invoices",
            detail:
              "The full order list with manage, void and refund behind a supervisor PIN, pre-bill and customer bill, and a QR code on every receipt. Cancelling or removing food the kitchen never made can put it back: each line records how much it drew from ready-made stock and how much from ingredients, so the return restores exactly that.",
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
              "Profiles with purchase history, loyalty points and tiers, and Excel export, plus a Khata credit ledger with statements, ageing and credit limits that a manager can override. Shown as Patients in the pharmacy edition.",
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
          {
            name: "Set up from the vendor console",
            detail:
              "The client\u2019s business details, tax rates, owner PIN, tables, menu and staff are prepared in the Plutox console \u2014 the menu pasted straight from Excel \u2014 and the till applies them itself the next time it calls home. A new install opens ready to sell; one that already has a menu is left alone unless the vendor chooses to add only what is missing. Nobody has to sit at the client\u2019s PC.",
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
              "A desktop app that updates itself. It runs the server in-process from editable files rather than a frozen binary, so a new version arrives as an \u201cUpdate now\u201d banner instead of a reinstall across a floor of terminals \u2014 which is the difference between shipping a fix and scheduling one. The thin-client shell also still exists: it asks once for the server address, Ctrl+Shift+O repoints it, and a failed load returns to setup rather than a blank window.",
          },
          {
            name: "AI assistant, in a floating window",
            detail:
              "Answers over the screen someone is already working on rather than on a page of its own \u2014 an owner asking what today took wants a sentence, not a navigation. It is superadmin-switchable per install, and it answers from queried data rather than being handed the business to improvise over.",
          },
          {
            name: "Plutox ID sign-in",
            detail:
              "Passwordless sign-in through Plutox ID, toggled on or off per install by the vendor superadmin next to the POS-access switch. A till that a client wants on local PINs stays on local PINs.",
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
      { label: "Business types", value: "62" },
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
    metric: { label: "Business types from one codebase", value: "62" },
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
    /*
      Three charts, and three genuinely different package structures — read out
      of each vertical's own code, not assumed from the restaurant's:

        restaurant  `PLAN_PRICING` in the unified POS routes.js
                    → three tiers, 5,000 / 10,000 / 15,000, gated by module id
        mart        `SUB_PLANS()` in mart-pos-full/src/store.js
                    → two tiers, Basic 7,000 / Advanced 15,000, with their own
                      module and feature lists
        pharmacy    the subscription seed in pharmacy-pos-full/src/store.js
                    → one plan, 5,000, no module gating at all

      An earlier version of this page gave all three the restaurant's table. It
      was tidy and it was wrong: a mart client pays 7,000 to start, not 5,000, and
      a pharmacy was never sold tiers to choose between.
    /*
      Three ladders, read out of `PRICING` and the tier table in the running POS
      rather than from the retired standalone builds.

      Two things this corrects. The site had no Enterprise tier at all — the POS
      has sold one for a while, and it is the tier a multi-branch buyer actually
      lands on. And the mart figures came from the old Vendeez build at Rs 7,000
      and Rs 15,000; the live POS sells mart as **ServeSync Mart Plus** on its own
      ladder starting at PKR 15,000, with its own tier names. Quoting a client the
      old numbers would have been a real problem.

      Restaurant and pharmacy stop at Premium by choice. The POS does sell a
      fourth Enterprise tier on that ladder, but it is not advertised here. Mart
      still shows its four.

      Enterprise runs exactly the same modules as Premium. What it sells is scale:
      it lifts the branch ceiling carried in the signed licence. The module list
      is deliberately identical so a Premium client can never lose a screen on the
      way up — which is worth saying, because "Enterprise" usually implies more
      features and here it does not.
    */
    pricing: [
      {
        edition: "Restaurant",
        editionSummary:
          "Dine-in, takeaway and delivery, with the floor and the kitchen on screen.",
        note: "Per branch, billed monthly. The package gates which of the 33 modules a branch gets, enforced in the sidebar and again server-side. Paid plans get a three-day grace period after the due date; the POS keeps working with an overdue warning and locks once that runs out. Free trials get no grace.",
        plans: [
          {
            name: "Basic",
            price: "PKR 5,000",
            period: "/ month",
            summary: "Core POS to run a single shop",
            includes: [
              "Order, Tables, Kitchen display",
              "Orders, Invoices, Customers",
              "Menu, Till & shift",
              "Setup — ten modules in all",
            ],
          },
          {
            name: "Standard",
            price: "PKR 10,000",
            period: "/ month",
            summary: "Everything to run and grow one restaurant",
            featured: true,
            includes: [
              "Everything in Basic, plus eight more",
              "Stock, Demand planning, Reports",
              "Staff, Vendors, Promos, Expenses",
              "Delivery",
            ],
          },
          {
            name: "Premium",
            price: "PKR 15,000",
            period: "/ month",
            summary: "The full suite — every module, multi-branch",
            includes: [
              "Everything in Standard, plus seven more",
              "Branches command centre, Warehouse",
              "HR, Accounts, R&D Lab",
              "Foodpanda, PRA / FBR fiscal",
            ],
          },
        ],
      },
      {
        edition: "Pharmacy",
        editionSummary:
          "Batch stock, prescriptions and the controlled register — no floor plan, no kitchen.",
        note: "Two plans, billed monthly per branch. Modules that do not apply to a pharmacy — tables, kitchen, delivery, Foodpanda, R&D — are hidden by the engine rather than sold back to you, and prescriptions, doctors, the controlled register and expiry come with the type rather than with a tier.",
        plans: [
          {
            name: "Basic",
            price: "PKR 7,000",
            period: "/ month",
            summary: "Core dispensing for a single counter",
            includes: [
              "Sell, Orders, Invoices, Patients",
              "Medicines with batch stock and expiry",
              "Prescriptions, doctors, controlled register",
              "Till & shift, Setup",
            ],
          },
          {
            name: "Premium",
            price: "PKR 15,000",
            period: "/ month",
            summary: "The full suite — every module, multi-branch",
            featured: true,
            includes: [
              "Everything in Basic",
              "Branches command centre, Warehouse",
              "Staff, Suppliers, Expenses, HR, Accounts",
              "Reports, demand planning, PRA / FBR fiscal",
            ],
          },
        ],
      },
      {
        edition: "Mart & Retail",
        editionSummary:
          "Sold as ServeSync Mart Plus — three ways to scan, promotions, gift cards and scale labels.",
        note: "The mart engine sells on its own ladder with its own tier names, starting higher than the restaurant and pharmacy plans. Billed monthly per branch, same three-day grace period, same server-side module gating.",
        plans: [
          {
            name: "Starter",
            price: "PKR 15,000",
            period: "/ month",
            summary: "Core POS, stock and purchasing for a single mart",
            includes: [
              "Sell with barcode scanning three ways",
              "Batch stock with expiry and FEFO",
              "Purchasing, Customers, Invoices",
              "Till & shift, Setup",
            ],
          },
          {
            name: "Business",
            price: "PKR 20,000",
            period: "/ month",
            summary: "Ledgers, expenses, promotions and full reporting",
            featured: true,
            includes: [
              "Everything in Starter",
              "Promotions, gift cards, loyalty tiers",
              "Staff, Suppliers, Expenses",
              "Full reporting and demand planning",
            ],
          },
          {
            name: "Professional",
            price: "PKR 25,000",
            period: "/ month",
            summary: "The full suite — warehouse, accounts and branches",
            includes: [
              "Everything in Business",
              "Branches command centre, Warehouse",
              "HR, Accounts",
              "Scale labels, PRA / FBR fiscal",
            ],
          },
          {
            name: "Enterprise",
            price: "PKR 35,000",
            period: "/ month",
            summary: "Professional, across unlimited branches",
            includes: [
              "Every module Professional has",
              "Lifts the branch ceiling in the licence",
              "For retail groups past that ceiling",
              "No screen is lost on the way up",
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

  /* ------------------------------------------------------------------ */
  /* ONVEE — peer-to-peer parcel & luggage delivery                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "onvee",
    name: "ONVEE",
    category: "Marketplace & Logistics",
    // The product's own `BRAND.tagline`, not the README's headline line.
    tagline: "Your parcel. Their journey.",
    description:
      "An international peer-to-peer parcel and luggage platform. Senders post what needs to move; identity-verified travellers already flying that route make offers. The platform holds the money, authenticates the handover with a QR code, a one-time code and a weight check, tracks the journey, verifies the recipient and only then releases payment — and settles the disputes when something goes wrong. It is a trust platform with a logistics workflow underneath, not a listings site: 19 service modules behind a single API, with a web product, an operations console and an Android app all speaking to it.",
    image: "/images/products/onvee-logo.svg",
    brandColor: "#E5B02C",
    audience:
      "People shipping between countries, travellers with spare luggage allowance, and the operations team moderating both",
    badge: "19 modules",
    features: [
      "Identity verification before anyone carries anything",
      "Payment held by the platform until delivery is confirmed",
      "Handover authenticated three ways: QR, one-time code and weight",
      "Journey tracking from handover to recipient signature",
      "Disputes raised, evidenced and ruled on inside the platform",
      "One API, three clients — web, ops console and Android",
      "Sign-in that cannot be used to enumerate accounts",
      "Prohibited-items policy stated on the page, not buried",
      "Ratings both ways once the money has moved",
    ],
    moduleGroups: [
      {
        title: "The marketplace",
        items: [
          {
            name: "Requests",
            detail:
              "A sender posts what is moving, from where to where, and by when. Size, weight and category are structured rather than free text, so travellers can filter and the rules engine can refuse what may not be carried.",
          },
          {
            name: "Trips",
            detail:
              "A traveller lists a route they are already flying and the space they have. Matching runs against both sides rather than making either browse the whole board.",
          },
          {
            name: "Matching",
            detail:
              "Requests and trips paired on route, date window and capacity, so a sender sees travellers who can actually take the parcel.",
          },
          {
            name: "Offers",
            detail:
              "A traveller names their price for a specific parcel; the sender accepts one. Accepting is what creates the booking — nothing is committed before money is secured.",
          },
          {
            name: "Bookings",
            detail:
              "The agreement itself: who is carrying what, for how much, under which terms. Every later event — handover, transit, delivery — hangs off it.",
          },
          {
            name: "Messaging",
            detail:
              "One thread per booking between sender and traveller, so the conversation stays attached to the parcel it is about.",
          },
        ],
      },
      {
        title: "Trust & safety",
        items: [
          {
            name: "Identity verification",
            detail:
              "KYC documents submitted by the user and decided by a human in the console. Nobody carries anything before the check clears.",
          },
          {
            name: "Authenticated handover",
            detail:
              "Three checks at the moment the parcel changes hands: a QR code scanned, a one-time code entered, and the weight confirmed against what was declared. A parcel that has grown between posting and handover does not pass.",
          },
          {
            name: "Recipient verification",
            detail:
              "Delivery is confirmed by a one-time code held by the recipient, not by the traveller asserting they dropped it off.",
          },
          {
            name: "Disputes",
            detail:
              "Either side can raise one, both attach evidence, and an operator rules. Held funds are the lever — the money has not moved yet, which is what makes a ruling enforceable.",
          },
          {
            name: "Account recovery",
            detail:
              "A password-reset flow that gives a locked-out member somewhere to go rather than a dead end, working on a phone as well as a desktop — the sign-in screen was rebuilt around it.",
          },
          {
            name: "Security",
            detail:
              "Opaque session tokens stored as SHA-256 digests, sign-in rate-limited per email and per network, and an identical error for an unknown email and a wrong password so the form cannot be used to discover who has an account. A password change revokes every other session.",
          },
          {
            name: "Audit log",
            detail:
              "Who did what, when, and to whom — written as operators work rather than reconstructed afterwards.",
          },
        ],
      },
      {
        title: "Money & operations",
        items: [
          {
            name: "Payments & wallet",
            detail:
              "Funds secured at acceptance, held while the parcel travels, released when delivery is verified. The wallet shows held, available and paid out separately, because to a traveller those are three different numbers.",
          },
          {
            name: "Journeys & tracking",
            detail:
              "The parcel's own timeline — handover, in transit, arrived, delivered — each step authenticated rather than self-reported.",
          },
          {
            name: "Shipments console",
            detail:
              "The operations view of every parcel in the system, with one screen per shipment carrying its full trail.",
          },
          {
            name: "Platform rules",
            detail:
              "Fees, limits and prohibited categories configured rather than hard-coded, so policy changes without a deploy.",
          },
          {
            name: "Notifications",
            detail:
              "Offers, handovers, deliveries and payouts pushed to whoever is waiting on them.",
          },
          {
            name: "Ratings",
            detail:
              "Both sides rate each other once the money has moved, so a rating reflects a completed delivery rather than an intention.",
          },
        ],
      },
      {
        title: "Platform",
        items: [
          {
            name: "One API, three clients",
            detail:
              "The web app's route handlers are the only HTTP surface. The browser and the Android app both speak to it, and the operations console calls the same services in-process — so a rule cannot be enforced in one client and forgotten in another.",
          },
          {
            name: "Shared domain layer",
            detail:
              "Types, Zod schemas and domain logic in a package with no I/O, so the same validation runs in the browser, on the server and in the app.",
          },
          {
            name: "Android app",
            detail:
              "Expo and React Native, covering the sender and traveller journeys end to end — post, find, offer, track, wallet and identity check.",
          },
          {
            name: "Operations console",
            detail:
              "A separate Next.js app for the work only staff do: KYC decisions, dispute rulings, user standing, platform rules and security review.",
          },
        ],
      },
    ],
    /*
      37 captures of the running application against seeded demo data — the
      repo's own screenshot script produces them, so they refresh rather than
      rot. Web product, operations console and the Android app.
    */
    screens: [
      {
        src: "/images/products/screens/onvee-web-landing.webp",
        label: "Landing",
        caption: "The promise in one screen: verified people, connected journeys",
      },
      {
        src: "/images/products/screens/onvee-web-dashboard.webp",
        label: "Dashboard",
        caption: "Requests, offers and journeys in flight",
      },
      {
        src: "/images/products/screens/onvee-web-request-new.webp",
        label: "Post a Request",
        caption: "What is moving, where to, and by when",
      },
      {
        src: "/images/products/screens/onvee-web-requests.webp",
        label: "My Requests",
        caption: "Every parcel posted, and where each one stands",
      },
      {
        src: "/images/products/screens/onvee-web-find-travelers.webp",
        label: "Find Travellers",
        caption: "Verified travellers already flying the route",
      },
      {
        src: "/images/products/screens/onvee-web-offers.webp",
        label: "Offers",
        caption: "What each traveller wants to carry it for",
      },
      {
        src: "/images/products/screens/onvee-web-request-detail.webp",
        label: "Request Detail",
        caption: "One parcel end to end, with its offers",
      },
      {
        src: "/images/products/screens/onvee-web-trip-new.webp",
        label: "Post a Trip",
        caption: "A traveller lists the route and the space they have",
      },
      {
        src: "/images/products/screens/onvee-web-trips.webp",
        label: "Trips",
        caption: "Routes offered, and what has been matched to them",
      },
      {
        src: "/images/products/screens/onvee-web-trip-detail.webp",
        label: "Trip Detail",
        caption: "One journey with its cargo and its handovers",
      },
      {
        src: "/images/products/screens/onvee-web-tracking.webp",
        label: "Tracking",
        caption: "Where every active parcel is right now",
      },
      {
        src: "/images/products/screens/onvee-web-tracking-detail.webp",
        label: "Journey Detail",
        caption: "Handover, transit and delivery, each authenticated",
      },
      {
        src: "/images/products/screens/onvee-web-verify.webp",
        label: "Identity Verification",
        caption: "KYC before anyone carries anything",
      },
      {
        src: "/images/products/screens/onvee-web-wallet.webp",
        label: "Wallet",
        caption: "Money held by the platform until delivery is confirmed",
      },
      {
        src: "/images/products/screens/onvee-web-messages.webp",
        label: "Messages",
        caption: "Sender and traveller, in one thread per booking",
      },
      {
        src: "/images/products/screens/onvee-web-conversation.webp",
        label: "Conversation",
        caption: "The thread itself, tied to the booking",
      },
      {
        src: "/images/products/screens/onvee-web-disputes.webp",
        label: "Disputes",
        caption: "Raised, evidenced and settled inside the platform",
      },
      {
        src: "/images/products/screens/onvee-web-notifications.webp",
        label: "Notifications",
        caption: "Offers, handovers and payouts as they happen",
      },
      {
        src: "/images/products/screens/onvee-web-settings.webp",
        label: "Settings",
        caption: "Profile, addresses and the roles you hold",
      },
      {
        src: "/images/products/screens/onvee-web-dashboard-dark.webp",
        label: "Dashboard (Dark)",
        caption: "The same screen in the dark theme",
      },
      {
        src: "/images/products/screens/onvee-web-legal-prohibited.webp",
        label: "Prohibited Items",
        caption: "What may never be carried, stated plainly",
      },
      {
        src: "/images/products/screens/onvee-admin-overview.webp",
        label: "Admin Overview",
        caption: "The whole marketplace on one screen",
      },
      {
        src: "/images/products/screens/onvee-admin-kyc.webp",
        label: "KYC Queue",
        caption: "Identity documents waiting on a human decision",
      },
      {
        src: "/images/products/screens/onvee-admin-kyc-detail.webp",
        label: "KYC Review",
        caption: "One applicant, their documents and the decision",
      },
      {
        src: "/images/products/screens/onvee-admin-users.webp",
        label: "Users",
        caption: "Every account, its roles and its standing",
      },
      {
        src: "/images/products/screens/onvee-admin-shipments.webp",
        label: "Shipments",
        caption: "Operations view of every parcel in the system",
      },
      {
        src: "/images/products/screens/onvee-admin-shipment-detail.webp",
        label: "Shipment Detail",
        caption: "One parcel's full audit trail",
      },
      {
        src: "/images/products/screens/onvee-admin-disputes.webp",
        label: "Dispute Resolution",
        caption: "Evidence from both sides, and the ruling",
      },
      {
        src: "/images/products/screens/onvee-admin-rules.webp",
        label: "Platform Rules",
        caption: "Fees, limits and prohibited categories",
      },
      {
        src: "/images/products/screens/onvee-admin-security.webp",
        label: "Security",
        caption: "Sessions, lockouts and suspicious activity",
      },
      {
        src: "/images/products/screens/onvee-admin-audit.webp",
        label: "Audit Log",
        caption: "Who did what, when, and to whom",
      },
      {
        src: "/images/products/screens/onvee-mobile-dashboard.webp",
        label: "Android Dashboard",
        caption: "The product in a pocket",
      },
      {
        src: "/images/products/screens/onvee-mobile-request-new.webp",
        label: "Android — Post",
        caption: "Posting a parcel from a phone",
      },
      {
        src: "/images/products/screens/onvee-mobile-find-travelers.webp",
        label: "Android — Find",
        caption: "Travellers on your route",
      },
      {
        src: "/images/products/screens/onvee-mobile-tracking.webp",
        label: "Android — Tracking",
        caption: "Live journeys on the phone",
      },
      {
        src: "/images/products/screens/onvee-mobile-wallet.webp",
        label: "Android — Wallet",
        caption: "Held funds and payouts",
      },
      {
        src: "/images/products/screens/onvee-mobile-verify.webp",
        label: "Android — Verify",
        caption: "Identity check with the phone camera",
      },
    ],
    languages: ["TypeScript", "TSX", "CSS", "SQL"],
    stack: [
      "TypeScript",
      "Next.js 15",
      "React Native",
      "Expo",
      "Prisma",
      "PostgreSQL",
      "Zod",
    ],
    specs: [
      { label: "Service modules", value: "19" },
      { label: "API routes", value: "57" },
      { label: "Prisma models", value: "39" },
      { label: "Clients", value: "3" },
    ],
    payments: ["Card", "Platform-held escrow", "Traveller payout"],
    metric: { label: "Checks at handover", value: "3" },
    demoUrl: "/contact",
  },

  /* ------------------------------------------------------------------ */
  /* Plutox ID — passwordless identity provider                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "plutox-id",
    name: "Plutox ID",
    category: "Identity & Access",
    tagline: "One sign-in for every Plutox product. No passwords.",
    description:
      "The identity provider the rest of the estate signs in through. Passkeys (WebAuthn/FIDO2) are the primary method and an emailed one-time code is the fallback — there are no passwords to phish, reuse or reset, and no biometric data ever reaches the server, only a cryptographic assertion. Other applications delegate sign-in to it over OAuth 2.0 Authorization Code with PKCE and OpenID Connect, so \"Login with Plutox ID\" is a standards-based flow rather than a shared session hack. Fleet Flow and ServeSync ERP both sign in through it today.",
    image: "/images/products/plutox-id-logo.svg",
    brandColor: "#8B5CF6",
    audience:
      "Every Plutox product and its users — and the administrators who need to see and revoke what is signed in",
    badge: "Passwordless",
    features: [
      "Passkeys as the primary sign-in — WebAuthn/FIDO2, no password to steal",
      "Emailed one-time code as the fallback, single-use and expiring",
      "OAuth 2.0 Authorization Code + PKCE, and OpenID Connect discovery",
      "No raw biometric data server-side, only WebAuthn assertions",
      "Admin console over users, registered apps, sessions and security activity",
      "Short-lived access tokens — 15 minutes, no long-lived bearer left lying around",
      "Live in Fleet Flow and ServeSync ERP, both signing in through it today",
    ],
    moduleGroups: [
      {
        title: "Authentication",
        items: [
          {
            name: "Passkeys (WebAuthn/FIDO2)",
            detail:
              "Registration and assertion against the platform authenticator — Windows Hello, Touch ID, a phone or a hardware key. The server stores a public key and a counter; the private key never leaves the device and no fingerprint or face template is ever transmitted.",
          },
          {
            name: "Email one-time code",
            detail:
              "The fallback for a device with no authenticator, or a user who has lost theirs. Codes are single-use and expiring, which keeps the fallback from becoming the weak path everybody takes.",
          },
          {
            name: "Sessions",
            detail:
              "Issued on successful authentication and revocable individually or wholesale from the admin console, so a lost laptop is one action rather than a password reset email.",
          },
        ],
      },
      {
        title: "Single sign-on",
        items: [
          {
            name: "OAuth 2.0 + PKCE",
            detail:
              "Authorization Code with PKCE, which is the flow a public client should use — no client secret shipped in a browser bundle, and an intercepted code is useless without the verifier.",
          },
          {
            name: "OpenID Connect",
            detail:
              "ID tokens and a discovery document, so an application integrates against the standard rather than against bespoke endpoints that drift.",
          },
          {
            name: "Registered applications",
            detail:
              "Each product registered with its own client id and redirect URIs, managed in the console rather than configured by hand on both sides.",
          },
          {
            name: "Two live integrations",
            detail:
              "Fleet Flow's login delegates to Plutox ID over the authorization-code flow and clears its own cookies before redirecting, so a sign-out actually signs out. ServeSync ERP now does too, with the vendor superadmin able to switch it off per install \u2014 which is what makes it adoptable by a client who wants local PINs.",
          },
        ],
      },
      {
        title: "Administration",
        items: [
          {
            name: "Users",
            detail:
              "Accounts, their registered authenticators and their standing, with the ability to revoke a credential without deleting the person.",
          },
          {
            name: "Sessions & security activity",
            detail:
              "What is signed in, from where, and what has been attempted — the view you need at the moment something looks wrong.",
          },
          {
            name: "Four applications",
            detail:
              "A user-facing web app (login, register, authorize, security settings), an Express API carrying the auth and OIDC endpoints, an admin console, and a dashboard — separated so the admin surface is not reachable from the login surface.",
          },
        ],
      },
    ],
    /*
      No gallery: the repository ships no screenshots, and this page's whole
      claim is that its images are captures of running software. A roadmap that
      names what is missing is worth more than an invented screen.
    */
    roadmap: [
      {
        label: "Built",
        title: "Passwordless authentication",
        detail:
          "WebAuthn passkey registration and assertion, email OTP fallback, sessions, and the user-facing web app for login, registration and security settings.",
        state: "done",
      },
      {
        label: "Built",
        title: "Standards-based SSO",
        detail:
          "OAuth 2.0 Authorization Code with PKCE and OpenID Connect, registered applications with their own client ids and redirect URIs, and a working Fleet Flow integration.",
        state: "done",
      },
      {
        label: "Built",
        title: "Administration",
        detail:
          "Admin console over users, registered applications, active sessions and security activity, across a four-app split (web, API, admin, dashboard).",
        state: "done",
      },
      {
        label: "Next",
        title: "Key rotation and refresh tokens",
        detail:
          "Two things the repository is explicit about not having yet: a single long-lived signing key with no rotation and no multi-`kid` JWKS, and no refresh-token flow — access tokens are 15 minutes with no renewal, so a long session means re-authenticating. Both are the difference between working and operable.",
        state: "next",
      },
    ],
    languages: ["TypeScript", "TSX", "SQL"],
    stack: [
      "TypeScript",
      "Next.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "WebAuthn / FIDO2",
      "OAuth 2.0 / OIDC",
      "Docker",
    ],
    specs: [
      { label: "API endpoints", value: "62" },
      { label: "Prisma models", value: "17" },
      { label: "Applications", value: "4" },
      { label: "Passwords stored", value: "0" },
    ],
    metric: { label: "Primary sign-in method", value: "Passkey" },
    demoUrl: "/contact",
  },

  /* ------------------------------------------------------------------ */
  /* INDUX — industrial ERP & smart factory OS                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "indux",
    name: "INDUX",
    category: "Manufacturing ERP",
    tagline: "A routing, a BOM and a station are data, not code.",
    description:
      "A configurable manufacturing ERP running procurement, inventory, MRP, production, quality, maintenance, workforce, sales, dispatch and double-entry finance, with an offline-capable terminal for the factory floor and an append-only audit trail over all of it. Nothing is hardcoded to one industry — the seed ships two plants on the same engines, a food factory and a textile unit, which is the proof that the routing and the bill of materials are configuration rather than a fork. Nine shared engines do the enforcing; nineteen route modules and twenty-nine console screens sit on top of them.",
    image: "/images/products/indux-logo.webp",
    brandColor: "#0F766E",
    audience:
      "Manufacturers running more than one plant, product line or process — food, textile and any industry whose routings differ but whose rules do not",
    badge: "9 engines",
    features: [
      "Two plants on one engine set — food and textile, from the same seed",
      "Every quantity change goes through one stock ledger, with lot genealogy",
      "Double-entry finance: balanced journals, trial balance, P&L, balance sheet",
      "MRP and production orders driven by real BOMs and routings",
      "Approval chains resolved from threshold rules, not hardcoded per document",
      "Append-only audit: who, what, when, where, before, after and why",
      "Offline-capable factory-floor station that syncs when the network returns",
      "Consignment tracking with QR, from material through dispatch",
      "Signed offline licences — Starter, Professional and Enterprise",
    ],
    moduleGroups: [
      {
        title: "The engines — what every module is built on",
        items: [
          {
            name: "Stock ledger",
            detail:
              "Every quantity change in the factory goes through one ledger, which owns lot picking, idempotency and genealogy. That is what makes a finished pallet traceable back to the specific material lots that made it, rather than to a date and a hope.",
          },
          {
            name: "Accounting",
            detail:
              "Balanced journals, trial balance, P&L, balance sheet and cash flow, posted by the engine rather than by each feature. A financial act that would not balance does not post.",
          },
          {
            name: "Approvals",
            detail:
              "Threshold rules resolve to an ordered chain of roles, so a purchase over a limit routes itself. The rule is data, which is why adding a tier does not mean touching a document type.",
          },
          {
            name: "Permissions",
            detail:
              "Grants shaped as `module:action` with wildcard support and factory scoping — so a supervisor at one plant is not a supervisor at the other.",
          },
          {
            name: "Workflow",
            detail:
              "One state machine every document shares. A purchase order, a production order and a dispatch note move through the same vocabulary, which is why the audit trail reads consistently.",
          },
          {
            name: "Audit",
            detail:
              "Append-only, capturing who, what, when, where, before, after and why. Written as work happens rather than reconstructed from other tables afterwards.",
          },
          {
            name: "Notifications",
            detail:
              "One alert pipeline with a dedupe window and pluggable channels, so a failing machine does not generate two hundred identical messages.",
          },
        ],
      },
      {
        title: "Make",
        items: [
          {
            name: "Production",
            detail:
              "Orders against real routings and stations, with the shop floor reporting progress rather than a planner guessing it.",
          },
          {
            name: "MRP",
            detail:
              "Requirements planned from BOMs and demand, so shortages surface before the line stops rather than when it does.",
          },
          {
            name: "BOM & master data",
            detail:
              "Bills of materials, routings, stations and items as configuration — the reason two industries run the same build.",
          },
          {
            name: "Quality",
            detail:
              "Checks bound to the process rather than filed beside it, so a batch that failed QC cannot quietly move on.",
          },
          {
            name: "Maintenance",
            detail:
              "Machine upkeep tracked against the asset, which is what turns unplanned downtime into a schedule.",
          },
          {
            name: "Factory-floor station",
            detail:
              "A terminal built for the floor and able to keep working offline, syncing when the network returns. A line does not stop because the office switch did.",
          },
        ],
      },
      {
        title: "Move & sell",
        items: [
          {
            name: "Procurement",
            detail:
              "Purchase orders through the approval chain to goods received, posting to the ledger and the accounts in one step.",
          },
          {
            name: "Inventory & warehouse",
            detail:
              "Material, packaging, finished goods and their locations, every movement written to the shared ledger.",
          },
          {
            name: "Consignment tracking",
            detail:
              "Consignments followed from material through production, QC, packaging, warehouse and dispatch to delivery, with QR at the handover points.",
          },
          {
            name: "Sales & dispatch",
            detail:
              "Orders through to what physically left the gate, reconciled against what was produced.",
          },
          {
            name: "Trace",
            detail:
              "The genealogy read back: from a delivered consignment to the lots, the run and the shift behind it.",
          },
        ],
      },
      {
        title: "Run the business",
        items: [
          {
            name: "Finance",
            detail:
              "The reporting side of the accounting engine — statements built from posted journals rather than assembled in a spreadsheet.",
          },
          {
            name: "HR & workforce",
            detail:
              "People, departments and the shift-level attribution that makes a production figure mean something.",
          },
          {
            name: "Reports, briefing & assistant",
            detail:
              "Reporting across the plants, plus a floating assistant and help pair in the corner \u2014 not a page. A manager asking what a plant made today wants an answer over the work in front of them; sending them elsewhere to read one sentence loses their place. There is a daily briefing endpoint and language selection behind it, and the full Assistant screen remains for a longer conversation.",
          },
          {
            name: "Licensing",
            detail:
              "Signed offline licences activated in the first-run wizard or in Admin — Starter at one plant and two terminals, Professional at two and ten, Enterprise unlimited. Perpetual or expiring, verified against the vendor key rather than a server call.",
          },
          {
            name: "Onboarding & setup",
            detail:
              "A first-run wizard that configures the plant, its stations and its people, so a new site is a setup task rather than an implementation project.",
          },
        ],
      },
    ],
    /*
      26 captures of the running console, taken headlessly against the real
      server with a signed-in owner session. The repo shipped no screenshot
      tooling, so scripts/screenshots.mjs was written for it — the shots refresh
      rather than rot.
    */
    screens: [
      {
        src: "/images/products/screens/indux-dashboard.webp",
        label: "Dashboard",
        caption: "The plant's day: output, orders and what needs attention",
      },
      {
        src: "/images/products/screens/indux-portfolio.webp",
        label: "Group Portfolio",
        caption: "Both plants side by side — food and textile on one engine",
      },
      {
        src: "/images/products/screens/indux-production.webp",
        label: "Production Orders",
        caption: "Orders against real routings and stations",
      },
      {
        src: "/images/products/screens/indux-station.webp",
        label: "Station Terminal",
        caption: "The floor terminal, built to keep working offline",
      },
      {
        src: "/images/products/screens/indux-mrp.webp",
        label: "MRP Planning",
        caption: "Requirements from BOMs and demand, before the line stops",
      },
      {
        src: "/images/products/screens/indux-quality.webp",
        label: "Quality Control",
        caption: "Checks bound to the process, not filed beside it",
      },
      {
        src: "/images/products/screens/indux-consignments.webp",
        label: "Consignments",
        caption: "Material through production, QC, packaging and dispatch",
      },
      {
        src: "/images/products/screens/indux-trace.webp",
        label: "Traceability",
        caption: "Genealogy read back from a delivery to its lots",
      },
      {
        src: "/images/products/screens/indux-inventory.webp",
        label: "Inventory",
        caption: "Every movement written to the shared stock ledger",
      },
      {
        src: "/images/products/screens/indux-warehouse.webp",
        label: "Warehouse",
        caption: "Locations for material, packaging and finished goods",
      },
      {
        src: "/images/products/screens/indux-procurement.webp",
        label: "Procurement",
        caption: "Requisition to purchase order to receipt",
      },
      {
        src: "/images/products/screens/indux-suppliers.webp",
        label: "Suppliers",
        caption: "Vendors, terms and what is owed",
      },
      {
        src: "/images/products/screens/indux-items.webp",
        label: "Products & Materials",
        caption: "The item master both plants share",
      },
      {
        src: "/images/products/screens/indux-bom.webp",
        label: "BOM & Recipes",
        caption: "Bills of materials as data, not code",
      },
      {
        src: "/images/products/screens/indux-routings.webp",
        label: "Workflows",
        caption: "Routings and the stations they run through",
      },
      {
        src: "/images/products/screens/indux-machines.webp",
        label: "Machines",
        caption: "Assets on the floor and their state",
      },
      {
        src: "/images/products/screens/indux-maintenance.webp",
        label: "Maintenance",
        caption: "Upkeep against the asset, turning downtime into a schedule",
      },
      {
        src: "/images/products/screens/indux-workforce.webp",
        label: "Workforce & HR",
        caption: "People, departments and shift-level attribution",
      },
      {
        src: "/images/products/screens/indux-sales.webp",
        label: "Sales & Dispatch",
        caption: "Orders through to what left the gate",
      },
      {
        src: "/images/products/screens/indux-finance.webp",
        label: "Finance",
        caption: "Statements built from posted journals",
      },
      {
        src: "/images/products/screens/indux-departments.webp",
        label: "Department Accounts",
        caption: "Cost carried by the department that incurred it",
      },
      {
        src: "/images/products/screens/indux-reports.webp",
        label: "Reports",
        caption: "Reporting across both plants",
      },
      {
        src: "/images/products/screens/indux-approvals.webp",
        label: "Approvals",
        caption: "Threshold rules resolved to an ordered role chain",
      },
      {
        src: "/images/products/screens/indux-audit.webp",
        label: "Audit Trail",
        caption: "Who, what, when, where, before, after and why",
      },
      {
        src: "/images/products/screens/indux-license.webp",
        label: "Licence & Packages",
        caption: "Signed offline activation and the tier's module set",
      },
      {
        src: "/images/products/screens/indux-assistant.webp",
        label: "AI Assistant",
        caption: "Questions answered from queried data",
      },
    ],
    /*
      The roadmap stays alongside the gallery rather than being replaced by it:
      the screens show what works, the roadmap names what does not.
    */
    roadmap: [
      {
        label: "Built",
        title: "The engine layer",
        detail:
          "Nine shared engines — permissions, stock ledger, accounting, approvals, notifications, workflow, audit, CRUD and persistence — with domain services composing them and route files doing nothing but parse, call and return.",
        state: "done",
      },
      {
        label: "Built",
        title: "The factory, end to end",
        detail:
          "Nineteen route modules and twenty-nine console screens covering procurement, inventory, MRP, production, quality, maintenance, workforce, sales, dispatch, finance, consignment tracking and trace — proven against two seeded plants in different industries.",
        state: "done",
      },
      {
        label: "Built",
        title: "Licensing and the desktop build",
        detail:
          "Signed offline licences across three tiers with plant and terminal ceilings, activated in the first-run wizard, plus a packaged desktop console.",
        state: "done",
      },
      {
        label: "Next",
        title: "Prisma persistence",
        detail:
          "Persistence sits behind a `Repository` interface and runs on memory plus JSON today, with Prisma as the stated next step. The seam exists precisely so that swap does not touch the engines — but until it lands, this is the honest limit on how large a deployment should get.",
        state: "next",
      },
    ],
    languages: ["TypeScript", "TSX", "CSS"],
    stack: ["TypeScript", "Node.js", "Express", "Socket.IO", "React", "Electron"],
    specs: [
      { label: "Shared engines", value: "9" },
      { label: "Route modules", value: "19" },
      { label: "Console screens", value: "29" },
      { label: "API handlers", value: "231" },
    ],
    /*
      Read out of `server/src/core/packages.ts` — the same table the Licence &
      Packages screen renders and the licence check enforces, so the page and the
      product cannot disagree. Tiers are supersets: each unlocks the nav keys of
      the one below it plus its own.
    */
    pricing: [
      {
        edition: "Per factory",
        editionSummary:
          "Billed monthly per plant. A tier unlocks modules; the signed licence sets how many plants and terminals it covers.",
        note: "Modules are gated by nav key, checked against the licence rather than hidden in the sidebar alone. Licences are signed and verified offline — no server call at activation, which matters on a factory network.",
        plans: [
          {
            name: "Starter",
            price: "PKR 15,000",
            period: "/ month",
            summary: "Run one production line",
            includes: [
              "Products, BOM / recipes and routings",
              "Inventory, warehouse and batch lots",
              "Procurement: requisition → PO → receipt",
              "Production orders and the station terminal",
              "Reports, approvals and the audit trail",
              "Users, roles and factory setup",
            ],
          },
          {
            name: "Professional",
            price: "PKR 30,000",
            period: "/ month",
            summary: "The whole factory floor",
            featured: true,
            includes: [
              "Everything in Starter",
              "Quality control and rejection analysis",
              "Machines, maintenance and downtime",
              "MRP and multi-level planning",
              "Batch traceability, end to end",
              "Workforce, attendance and sales dispatch",
            ],
          },
          {
            name: "Enterprise",
            price: "PKR 45,000",
            period: "/ month",
            summary: "Multi-factory ERP with full books",
            includes: [
              "Everything in Professional",
              "Multi-factory group portfolio",
              "Finance, double-entry accounting and AP/AR",
              "Manufacturing costing and margins",
              "AI management assistant",
              "Priority support",
            ],
          },
        ],
      },
    ],
    metric: { label: "Industries on one build", value: "2" },
    demoUrl: "/contact",
  },

  /* ------------------------------------------------------------------ */
  /* VitaDrop — blood donation & blood-finding platform                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "vitadrop",
    name: "VitaDrop",
    category: "Healthcare Platform",
    tagline: "Every Drop Saves a Life.",
    description:
      "A blood donation and blood-finding platform joining six kinds of account — donors, recipients, hospitals, blood banks, donation centres and foundations — around one matching engine. A request names a group, a component, a number of units and an urgency; the engine scores eligible donors on availability, distance and how long since they last gave, and the deferral rules that decide who may donate are data the platform enforces rather than guidance it displays. 33 pages and 40 API routes over a 24-model schema, with inventory, campaigns, messaging, consent and an audit trail around the core.",
    image: "/images/products/vitadrop-logo.svg",
    brandColor: "#DC2647",
    audience:
      "Donors and patients, and the blood banks, hospitals, donation centres and foundations that have to find each other quickly",
    badge: "6 account types",
    features: [
      "Matching that scores donors on availability, distance and recency",
      "Urgency widens the search radius instead of just colouring a label",
      "Deferral intervals enforced at the point of asking, not printed as advice",
      "Blood inventory by group and component, with a movement log",
      "Find blood as a list or on a map, ranked by distance",
      "Campaigns with public registration, run by banks and foundations",
      "One message thread per match, so a conversation stays with its request",
      "Verification and consent recorded as their own tables, not flags",
      "Demo data that cannot be mistaken for a real blood bank",
    ],
    moduleGroups: [
      {
        title: "Matching — the part that has to be right",
        items: [
          {
            name: "Donor scoring",
            detail:
              "A request scores every eligible donor rather than filtering to a list. Availability is weighted, distance decays exponentially — a donor twice the half-life away scores a quarter — and someone who last gave a long time ago ranks above someone just past the minimum interval, because the safer ask is the better ask.",
          },
          {
            name: "Urgency changes the physics",
            detail:
              "Urgency sets both the search radius and the distance half-life, so an emergency genuinely reaches further rather than showing the same candidates with a red badge on them.",
          },
          {
            name: "Eligibility as enforced rules",
            detail:
              "Minimum intervals between whole blood, plasma and platelet donations live in an `EligibilityRule` table, seeded as data and checked when a donor is considered. A platform that lets someone volunteer inside their deferral window has moved the risk onto the donor.",
          },
          {
            name: "Requests, matches and donations",
            detail:
              "Three separate records rather than one row with a status: a request is what a patient needs, a match is a specific donor paired to it, and a donation is what actually happened. That separation is what makes the history honest when a match falls through.",
          },
        ],
      },
      {
        title: "For donors and patients",
        items: [
          {
            name: "Donor profile and eligibility",
            detail:
              "Blood group, health answers and availability, with the next date a donor becomes eligible computed from their own history rather than typed in.",
          },
          {
            name: "Donation history",
            detail:
              "Every donation, what component it was, and what it made the donor eligible for next.",
          },
          {
            name: "Raise a request",
            detail:
              "Group, component, units, urgency and the hospital it is for. Structured, because the matching engine reads it rather than a person.",
          },
          {
            name: "Find blood",
            detail:
              "Search by group, component and distance, as a ranked list or plotted on a map — the two views over the same query, because a relative wants distance and an operator wants a list.",
          },
          {
            name: "Messaging",
            detail:
              "One thread per match between donor and requester, so the conversation stays attached to the request it is about instead of becoming a phone number nobody logged.",
          },
          {
            name: "Notifications",
            detail:
              "Matches, campaign reminders and stock alerts, with delivery recorded per channel and push tokens held per device — so \"they were never told\" is answerable.",
          },
        ],
      },
      {
        title: "For banks, hospitals and foundations",
        items: [
          {
            name: "Blood inventory",
            detail:
              "Units held by group and component, every change written to a movement log rather than adjusted in place, so a discrepancy has a history to read.",
          },
          {
            name: "Branches",
            detail:
              "Collection points under one organisation, each with its own stock, so a group's total and a specific centre's shelf are different numbers.",
          },
          {
            name: "Campaigns",
            detail:
              "A drive with a venue, its slots and public registration — run by a bank or a foundation, and listed on the public site where a donor can actually find it.",
          },
          {
            name: "Organisation profile",
            detail:
              "What the public directory shows about a bank: where it is, what it holds and how to reach it.",
          },
          {
            name: "Hospital requests",
            detail:
              "A hospital raising and tracking requests on a patient's behalf, which is how most urgent need actually arrives.",
          },
        ],
      },
      {
        title: "Trust, safety and the platform",
        items: [
          {
            name: "Verification and consent as records",
            detail:
              "`VerificationRecord` and `ConsentRecord` are their own tables rather than booleans on a user. When someone asks what a donor agreed to and when, the answer is a row with a timestamp, not an inference.",
          },
          {
            name: "Admin approval of organisations",
            detail:
              "Who may hold blood and appear in the directory is an administrator's decision, not a signup outcome.",
          },
          {
            name: "Audit log",
            detail:
              "Who did what to which record, written as work happens. On a platform touching medical eligibility that is the difference between a system of record and a website.",
          },
          {
            name: "Demo data that cannot be mistaken for real",
            detail:
              "Every seeded organisation is prefixed `[DEMO]` and every seeded email sits on `demo.vitadrop.local`, so a demonstration record can never be read as a real blood bank holding real stock. `SEED_DEMO_DATA=false` seeds the eligibility rules and the admin account alone.",
          },
          {
            name: "Real data behind every screen",
            detail:
              "No mock layer: the pages read the database through Prisma, and the matching, authorisation and eligibility checks are the same ones a production install would run.",
          },
        ],
      },
    ],
    /*
      33 captures from the project's own `npm run screenshots`, taken against the
      running app with a real signed-in session per role — a donor never sees
      inventory and a bank never sees a donor profile, so capturing everything as
      the admin would have shown screens no real donor ever meets. Four mobile
      views included, because the phone is where a donor answers a request.
    */
    screens: [
      {
        src: "/images/products/screens/vitadrop-landing.webp",
        label: "Landing",
        caption: "Every drop saves a life — the public front door",
      },
      {
        src: "/images/products/screens/vitadrop-find-blood-list.webp",
        label: "Find Blood",
        caption: "Search by group, component and distance",
      },
      {
        src: "/images/products/screens/vitadrop-find-blood-map.webp",
        label: "Find Blood — Map",
        caption: "Banks and centres plotted around the patient",
      },
      {
        src: "/images/products/screens/vitadrop-blood-banks.webp",
        label: "Blood Banks",
        caption: "The directory, with what each one holds",
      },
      {
        src: "/images/products/screens/vitadrop-campaigns.webp",
        label: "Campaigns",
        caption: "Donation drives open for registration",
      },
      {
        src: "/images/products/screens/vitadrop-campaign-detail.webp",
        label: "Campaign Detail",
        caption: "One drive, its venue and its slots",
      },
      {
        src: "/images/products/screens/vitadrop-learn-blood-groups.webp",
        label: "Learn — Blood Groups",
        caption: "Who can give to whom, without the jargon",
      },
      {
        src: "/images/products/screens/vitadrop-learn-blood-donation.webp",
        label: "Learn — Donating",
        caption: "What actually happens when you donate",
      },
      {
        src: "/images/products/screens/vitadrop-sign-in.webp",
        label: "Sign In",
        caption: "One door for six different kinds of account",
      },
      {
        src: "/images/products/screens/vitadrop-register.webp",
        label: "Register",
        caption: "Donor, recipient or organisation",
      },
      {
        src: "/images/products/screens/vitadrop-donor-dashboard.webp",
        label: "Donor Dashboard",
        caption: "Eligibility, next date and open matches",
      },
      {
        src: "/images/products/screens/vitadrop-donor-profile.webp",
        label: "Donor Profile",
        caption: "Group, health answers and availability",
      },
      {
        src: "/images/products/screens/vitadrop-donor-donations.webp",
        label: "Donation History",
        caption: "Every donation, and what it made you eligible for",
      },
      {
        src: "/images/products/screens/vitadrop-requests.webp",
        label: "Requests",
        caption: "Live requests a donor can answer",
      },
      {
        src: "/images/products/screens/vitadrop-request-new.webp",
        label: "Raise a Request",
        caption: "Group, units, urgency and the hospital",
      },
      {
        src: "/images/products/screens/vitadrop-request-detail-matching.webp",
        label: "Matching",
        caption: "The engine pairing a request with eligible donors",
      },
      {
        src: "/images/products/screens/vitadrop-messages.webp",
        label: "Messages",
        caption: "Donor and requester, in one thread per match",
      },
      {
        src: "/images/products/screens/vitadrop-notifications.webp",
        label: "Notifications",
        caption: "Matches, campaign reminders and stock alerts",
      },
      {
        src: "/images/products/screens/vitadrop-settings.webp",
        label: "Settings",
        caption: "Contact, privacy and notification channels",
      },
      {
        src: "/images/products/screens/vitadrop-org-dashboard.webp",
        label: "Organisation Dashboard",
        caption: "A bank's day: stock, requests and drives",
      },
      {
        src: "/images/products/screens/vitadrop-org-inventory.webp",
        label: "Blood Inventory",
        caption: "Units by group and component, with a movement log",
      },
      {
        src: "/images/products/screens/vitadrop-org-branches.webp",
        label: "Branches",
        caption: "Collection points under one organisation",
      },
      {
        src: "/images/products/screens/vitadrop-org-campaigns.webp",
        label: "Run a Campaign",
        caption: "Create a drive and take registrations",
      },
      {
        src: "/images/products/screens/vitadrop-org-profile.webp",
        label: "Organisation Profile",
        caption: "What the public directory shows",
      },
      {
        src: "/images/products/screens/vitadrop-admin-overview.webp",
        label: "Admin Overview",
        caption: "The whole platform on one screen",
      },
      {
        src: "/images/products/screens/vitadrop-admin-users.webp",
        label: "Users",
        caption: "Accounts, roles and verification state",
      },
      {
        src: "/images/products/screens/vitadrop-admin-organisations.webp",
        label: "Organisations",
        caption: "Approving who may hold blood",
      },
      {
        src: "/images/products/screens/vitadrop-admin-rules.webp",
        label: "Eligibility Rules",
        caption: "The deferral rules the platform enforces",
      },
      {
        src: "/images/products/screens/vitadrop-admin-audit.webp",
        label: "Audit Log",
        caption: "Who did what to which record",
      },
      {
        src: "/images/products/screens/vitadrop-donor-dashboard-mobile.webp",
        label: "Mobile — Dashboard",
        caption: "The donor view on a phone",
      },
      {
        src: "/images/products/screens/vitadrop-find-blood-mobile.webp",
        label: "Mobile — Find Blood",
        caption: "Searching on the move",
      },
      {
        src: "/images/products/screens/vitadrop-menu-drawer-mobile.webp",
        label: "Mobile — Navigation",
        caption: "The drawer, role-aware",
      },
      {
        src: "/images/products/screens/vitadrop-requests-mobile.webp",
        label: "Mobile — Requests",
        caption: "Answering a request from a phone",
      },
    ],
    languages: ["TypeScript", "TSX", "CSS", "SQL"],
    stack: [
      "TypeScript",
      "Next.js 16",
      "Prisma",
      "PostgreSQL",
      "Socket.IO",
      "Leaflet",
      "Zod",
      "Playwright",
    ],
    specs: [
      { label: "Account types", value: "6" },
      { label: "Pages", value: "33" },
      { label: "API routes", value: "40" },
      { label: "Prisma models", value: "24" },
    ],
    metric: { label: "Mock data behind the screens", value: "None" },
    demoUrl: "/contact",
  },

  /* ------------------------------------------------------------------ */
  /* CareSync — hospital ERP                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "caresync",
    name: "CareSync",
    category: "Hospital ERP",
    tagline: "One record, every department.",
    description:
      "A multi-tenant hospital ERP covering the clinical day end to end: a patient registers at the desk, joins an OPD queue, is seen in a consultation that writes vitals, an ICD-coded diagnosis and a prescription, and the pharmacy dispenses against that same record while billing accumulates what was actually done. 420 endpoints over a 116-model schema, 79 screens, and 31 of the 32 modules in its permission catalogue are built. It runs in a browser, as a Windows application with its own updater, and as a portal the patient signs into themselves.",
    image: "/images/products/caresync-logo.svg",
    brandColor: "#0E8A76",
    audience:
      "Hospital groups and clinics that want one system for the clinic, the ward, the lab, the pharmacy and the books",
    badge: "31 of 32 modules",
    features: [
      "OPD queue to consultation to pharmacy on one patient record",
      "Prescriptions, discharge summaries, lab and radiology reports as real A4 documents",
      "Allergy warnings raised before the prescription is written",
      "Observations charted with an early-warning score, and a medication chart",
      "Emergency board ordered by triage category, not arrival time",
      "Billing that accumulates from what was done, with insurance and TPA claims",
      "Accounting that reads the billing rather than a re-keyed spreadsheet",
      "A patient portal for appointments, reports, prescriptions and payments",
      "32 modules by ten actions in one permission catalogue, enforced server-side",
      "Windows build with its own updater, and a dark theme for night shifts",
    ],
    moduleGroups: [
      {
        title: "The clinical day, end to end",
        items: [
          {
            name: "Registration, queue and token",
            detail:
              "A walk-in is registered at the desk, gets a token and joins the OPD queue for a named doctor. Duplicate registration is caught at the point of typing rather than found later as two charts for one person.",
          },
          {
            name: "Consultation on one page",
            detail:
              "Vitals, presenting complaint, history, examination, an ICD-coded diagnosis, a prescription built from a medicine list, advice and a follow-up interval — then signed, which is what turns it from a draft into a record.",
          },
          {
            name: "The chart interrupts",
            detail:
              "A recorded allergy raises a warning on the consultation before the prescription is written. A system that stores the allergy and says nothing at the moment it matters has only moved the risk onto the doctor.",
          },
          {
            name: "In-patients and the bed board",
            detail:
              "Every ward and bed live, admission from the consultation, and a discharge summary that prints as the document the next clinician will actually read.",
          },
          {
            name: "Emergency, ordered by acuity",
            detail:
              "Arrivals are triaged at the door and the board sorts by category rather than by who walked in first — which is the entire point of having a triage category.",
          },
          {
            name: "Nursing: observations and the medication chart",
            detail:
              "Vitals charted over time with an early-warning score computed from them, and a medication administration record showing what is due, what was given and by whom.",
          },
        ],
      },
      {
        title: "Diagnostics, pharmacy and stock",
        items: [
          {
            name: "Orders that travel",
            detail:
              "Investigations raised in the consultation arrive in the lab worklist as orders. Nobody re-types a request, which is where transcription errors come from.",
          },
          {
            name: "Lab and radiology reporting",
            detail:
              "Specimens through to verified results with reference ranges, and radiology reported against the request — both printing as signed A4 documents.",
          },
          {
            name: "Operation theatre and blood bank",
            detail:
              "The list by theatre and session with the team and operative notes, and blood units held by group against the requests made for them.",
          },
          {
            name: "Pharmacy dispensing",
            detail:
              "Prescriptions arrive from the clinic rather than being re-entered at the counter, and dispensing moves the stock it actually used.",
          },
          {
            name: "Inventory and procurement",
            detail:
              "Stock by item and location with a movement history, and requests through approval to a purchase order.",
          },
        ],
      },
      {
        title: "Money, people and the platform",
        items: [
          {
            name: "Billing from what was done",
            detail:
              "Charges accumulate from the consultation, the investigation and the admission rather than being assembled by hand at the end, with panel and TPA claims raised against the bill.",
          },
          {
            name: "Accounting on top of the billing",
            detail:
              "Journal, bank reconciliation, profit and loss, balance sheet and departmental profitability — reading the same records the bills came from, not a monthly re-key.",
          },
          {
            name: "HR and payroll",
            detail:
              "Staff, roster, attendance and a payroll run that closes a period and produces payslips, with a self-service view for the employee.",
          },
          {
            name: "Tenancy, plans and licensing",
            detail:
              "Organisation, hospital group, hospital, branch and department as real records; a platform console listing every tenant on the installation; subscription plans deciding which modules a tenant gets; and Plutox licence keys with vendor lock, unlock and ping commands verified cryptographically.",
          },
          {
            name: "Access, enforced server-side",
            detail:
              "32 modules by ten actions — 147 permissions — with 23 role templates seeded per tenant. The server is the only authority; the web app reads the same catalogue purely to hide what a user could not do anyway, and the role editor greys out what the editing user does not hold themselves.",
          },
          {
            name: "Audit, two-factor and sign-in history",
            detail:
              "Who did what to which record, TOTP enrolment per account, and sessions and failed attempts kept as their own tables. Suspending a tenant signs its users out immediately rather than waiting for tokens to lapse.",
          },
        ],
      },
      {
        title: "How it is delivered",
        items: [
          {
            name: "Browser, desktop and portal",
            detail:
              "The same application in a browser, as a Windows build with its own updater and an offline page, and as a patient portal where someone books their own appointment and reads their own reports.",
          },
          {
            name: "It documents itself",
            detail:
              "`DOCS=1 npx playwright test` drives the whole system and writes 131 screenshots. Every capture on this page came from that run, so the gallery cannot drift from the software without the test failing first.",
          },
          {
            name: "Demo data that cannot be mistaken for real",
            detail:
              "The seeded tenant is suffixed (DEMO) and every screen says the records are sample data, not real patients or staff. On a system holding medical records that distinction has to be visible in the screenshot itself.",
          },
          {
            name: "The one module that is not built",
            detail:
              "Documents exists in the permission catalogue and nowhere else — there is no module behind it yet. Everything else named in the role matrix has screens and endpoints.",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/products/screens/caresync-overview.webp",
        label: "Overview",
        caption: "The hospital's day on one screen",
      },
      {
        src: "/images/products/screens/caresync-patients.webp",
        label: "Patients",
        caption: "The register, searchable by MRN, name or phone",
      },
      {
        src: "/images/products/screens/caresync-patient-chart.webp",
        label: "Patient Chart",
        caption: "History, vitals, orders and documents in one place",
      },
      {
        src: "/images/products/screens/caresync-opd-queue.webp",
        label: "OPD Queue",
        caption: "Who is waiting, for whom, and since when",
      },
      {
        src: "/images/products/screens/caresync-walk-in.webp",
        label: "Walk-in",
        caption: "Registration and a token at the desk",
      },
      {
        src: "/images/products/screens/caresync-consultation.webp",
        label: "Consultation",
        caption: "Vitals, diagnosis, prescription and plan on one page",
      },
      {
        src: "/images/products/screens/caresync-allergy-warning.webp",
        label: "Allergy Warning",
        caption: "The chart interrupts before the prescription is written",
      },
      {
        src: "/images/products/screens/caresync-consultation-signed.webp",
        label: "Signed & Complete",
        caption: "A consultation closed and attributed",
      },
      {
        src: "/images/products/screens/caresync-prescription-sheet-a4.webp",
        label: "Prescription (A4)",
        caption: "What the patient actually walks out with",
      },
      {
        src: "/images/products/screens/caresync-appointment-diary.webp",
        label: "Appointment Diary",
        caption: "The day across every doctor",
      },
      {
        src: "/images/products/screens/caresync-book-appointment.webp",
        label: "Booking",
        caption: "Slot, doctor and reason, checked against the schedule",
      },
      {
        src: "/images/products/screens/caresync-bed-board.webp",
        label: "Bed Board",
        caption: "Every ward and bed, live",
      },
      {
        src: "/images/products/screens/caresync-admission.webp",
        label: "Admission",
        caption: "One stay, its orders and its notes",
      },
      {
        src: "/images/products/screens/caresync-discharge-summary-a4.webp",
        label: "Discharge Summary (A4)",
        caption: "The document the next clinician reads",
      },
      {
        src: "/images/products/screens/caresync-er-board.webp",
        label: "Emergency Board",
        caption: "Arrivals ordered by acuity, not by arrival time",
      },
      {
        src: "/images/products/screens/caresync-er-triage.webp",
        label: "Triage",
        caption: "Category assigned at the door",
      },
      {
        src: "/images/products/screens/caresync-nursing-station.webp",
        label: "Nursing Station",
        caption: "The ward's work list for a shift",
      },
      {
        src: "/images/products/screens/caresync-observations.webp",
        label: "Observations",
        caption: "Vitals charted over time with an early-warning score",
      },
      {
        src: "/images/products/screens/caresync-mar.webp",
        label: "Medication Chart",
        caption: "What is due, what was given and by whom",
      },
      {
        src: "/images/products/screens/caresync-order-tests.webp",
        label: "Order Tests",
        caption: "Investigations raised from the consultation",
      },
      {
        src: "/images/products/screens/caresync-lab-worklist.webp",
        label: "Lab Worklist",
        caption: "Specimens through to verified results",
      },
      {
        src: "/images/products/screens/caresync-lab-report-a4.webp",
        label: "Lab Report (A4)",
        caption: "Results with reference ranges, signed",
      },
      {
        src: "/images/products/screens/caresync-radiology-report.webp",
        label: "Radiology",
        caption: "Reporting against the request",
      },
      {
        src: "/images/products/screens/caresync-ot-board.webp",
        label: "Operation Theatre",
        caption: "The list, by theatre and session",
      },
      {
        src: "/images/products/screens/caresync-surgery.webp",
        label: "Surgery",
        caption: "Team, procedure and the notes that follow",
      },
      {
        src: "/images/products/screens/caresync-blood-stock.webp",
        label: "Blood Bank",
        caption: "Units by group, and who has asked for them",
      },
      {
        src: "/images/products/screens/caresync-pharmacy-queue.webp",
        label: "Pharmacy",
        caption: "Prescriptions arriving from the clinic, not re-typed",
      },
      {
        src: "/images/products/screens/caresync-dispense.webp",
        label: "Dispensing",
        caption: "Against the prescription, against the stock",
      },
      {
        src: "/images/products/screens/caresync-inventory.webp",
        label: "Inventory",
        caption: "Stock by item and location, with movements",
      },
      {
        src: "/images/products/screens/caresync-procurement.webp",
        label: "Procurement",
        caption: "Requests, approvals and purchase orders",
      },
      {
        src: "/images/products/screens/caresync-billing.webp",
        label: "Billing",
        caption: "Charges accumulated from what was actually done",
      },
      {
        src: "/images/products/screens/caresync-invoice-a4.webp",
        label: "Invoice (A4)",
        caption: "The bill as the patient receives it",
      },
      {
        src: "/images/products/screens/caresync-claims.webp",
        label: "Insurance Claims",
        caption: "Panel and TPA claims against a bill",
      },
      {
        src: "/images/products/screens/caresync-hr-overview.webp",
        label: "Human Resources",
        caption: "Staff, roster and attendance",
      },
      {
        src: "/images/products/screens/caresync-payroll-run.webp",
        label: "Payroll Run",
        caption: "A period calculated and closed",
      },
      {
        src: "/images/products/screens/caresync-profit-loss.webp",
        label: "Profit & Loss",
        caption: "Accounting that reads from the billing, not a spreadsheet",
      },
      {
        src: "/images/products/screens/caresync-reports-executive.webp",
        label: "Executive Reports",
        caption: "The numbers an owner asks for",
      },
      {
        src: "/images/products/screens/caresync-roles.webp",
        label: "Roles",
        caption: "23 seeded templates a tenant can edit",
      },
      {
        src: "/images/products/screens/caresync-permission-matrix.webp",
        label: "Permission Matrix",
        caption: "32 modules by ten actions, enforced server-side",
      },
      {
        src: "/images/products/screens/caresync-audit-log.webp",
        label: "Audit Log",
        caption: "Who did what to which record",
      },
      {
        src: "/images/products/screens/caresync-two-factor-setup.webp",
        label: "Two-Factor",
        caption: "TOTP enrolment for a staff account",
      },
      {
        src: "/images/products/screens/caresync-tenants.webp",
        label: "Platform — Tenants",
        caption: "Every hospital on the installation",
      },
      {
        src: "/images/products/screens/caresync-plans.webp",
        label: "Plans",
        caption: "What each subscription tier unlocks",
      },
      {
        src: "/images/products/screens/caresync-portal-sign-in.webp",
        label: "Patient Portal",
        caption: "The patient's own way in",
      },
      {
        src: "/images/products/screens/caresync-portal-home.webp",
        label: "Portal — Home",
        caption: "Appointments, reports and bills, to the patient",
      },
      {
        src: "/images/products/screens/caresync-portal-booking.webp",
        label: "Portal — Booking",
        caption: "A patient booking their own slot",
      },
      {
        src: "/images/products/screens/caresync-portal-prescription.webp",
        label: "Portal — Prescription",
        caption: "The script, without a trip to the counter",
      },
      {
        src: "/images/products/screens/caresync-integrations.webp",
        label: "Integrations",
        caption: "Lab analysers and outbound interfaces",
      },
      {
        src: "/images/products/screens/caresync-global-search.webp",
        label: "Global Search",
        caption: "Staff, patients and pages from one box",
      },
      {
        src: "/images/products/screens/caresync-dark-opd-queue.webp",
        label: "Dark Theme",
        caption: "The same queue for a night shift",
      },
      {
        src: "/images/products/screens/caresync-mobile-overview.webp",
        label: "Mobile — Overview",
        caption: "The workspace at phone width",
      },
      {
        src: "/images/products/screens/caresync-mobile-menu.webp",
        label: "Mobile — Navigation",
        caption: "The drawer, role-aware",
      },    ],
    languages: ["TypeScript", "TSX", "CSS", "SQL"],
    stack: [
      "TypeScript",
      "NestJS",
      "React",
      "Vite",
      "Prisma",
      "PostgreSQL",
      "Zod",
      "TanStack Query",
      "Electron",
      "Playwright",
    ],
    specs: [
      { label: "API endpoints", value: "420" },
      { label: "Prisma models", value: "116" },
      { label: "Screens", value: "79" },
      { label: "Modules built", value: "31 of 32" },
    ],
    metric: { label: "Captures from its own test run", value: "131" },
    demoUrl: "/contact",
  },

  /* ------------------------------------------------------------------ */
  /* E-Commerce Platform — storefront + back office                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "ecommerce",
    name: "E-Commerce Platform",
    category: "E-commerce Platform",
    tagline: "A storefront and the office that runs it.",
    description:
      "A direct-to-consumer storefront and the back office that runs it, built as one application rather than a shop bolted onto a dashboard. 26 customer-facing pages and 26 admin pages over a 41-model schema, with 203 server actions doing the work instead of a REST layer nobody else calls. Payment covers what Pakistani customers actually use — cash on delivery, JazzCash, Easypaisa and Stripe — and the product photography is composed in code from a single reference shot, so a new line ships with consistent studio imagery without a studio.",
    image: "/images/products/ecommerce-logo.svg",
    brandColor: "#B08462",
    audience:
      "A brand selling direct, that needs the catalogue, the orders and the stock to be one system",
    badge: "Store + admin",
    features: [
      "Storefront and admin in one codebase, one schema, one deploy",
      "Product photography composed in code from one reference shot",
      "Cash on delivery, JazzCash, Easypaisa and Stripe",
      "Passkeys alongside passwords, through WebAuthn",
      "Stock by variant, with every movement written to a log",
      "Coupons scoped to products or collections, with usage recorded",
      "Shipping zones and methods priced per zone",
      "First-party visitor analytics — no third-party tracker on the store",
      "Packing slips generated as real PDFs",
      "Admin activity log, and admin devices tracked per account",
    ],
    moduleGroups: [
      {
        title: "The storefront",
        items: [
          {
            name: "Catalogue and collections",
            detail:
              "Categories are what a product is; collections are what a shop wants to sell together, and they are separate tables for that reason. A product can sit in one category and three curated edits without duplicating the record.",
          },
          {
            name: "Product attributes as data",
            detail:
              "Attributes are their own table joined to products, not a comma-separated string in a description. That is what makes filtering by one a query rather than a text search that also matches the word in a paragraph.",
          },
          {
            name: "Variants and real stock",
            detail:
              "Size and price live on the variant, and availability is read from inventory rather than a boolean someone remembers to switch. A sold-out 100ml does not hide the 50ml.",
          },
          {
            name: "Cart, checkout and payment",
            detail:
              "Cash on delivery, JazzCash, Easypaisa and Stripe, each a transaction record with its webhook events kept. A payment nobody can reconcile later is the expensive kind.",
          },
          {
            name: "Accounts, addresses and wishlist",
            detail:
              "Order history, saved addresses, reviews and a wishlist — with passkeys offered alongside the password, because a returning customer on a phone should not have to remember anything.",
          },
        ],
      },
      {
        title: "The back office",
        items: [
          {
            name: "Dashboard over a chosen range",
            detail:
              "Revenue, orders, average order value, low and out-of-stock counts, with revenue and orders plotted over the selected window and a breakdown by product and category under them.",
          },
          {
            name: "Orders and their history",
            detail:
              "Every order carries its own event trail, so what happened to it is a record rather than an inference from the current status.",
          },
          {
            name: "Inventory with a movement log",
            detail:
              "Stock changes are written as movements rather than adjusted in place. When a count disagrees with the shelf, there is a history to read.",
          },
          {
            name: "Coupons that know their scope",
            detail:
              "A discount can be limited to products or collections, and every redemption is recorded against the customer — which is what makes a one-per-customer rule enforceable rather than aspirational.",
          },
          {
            name: "Shipping zones and methods",
            detail:
              "Rates priced per zone, with shipments tracked against the order they belong to.",
          },
          {
            name: "Reviews, moderated",
            detail:
              "What a customer writes and what appears on the product page are two different decisions.",
          },
        ],
      },
      {
        title: "Decisions worth naming",
        items: [
          {
            name: "The photography is composed, not shot",
            detail:
              "Each product's studio photograph is rendered in code from one reference shot, with the colour and label set per item. A new line ships with a consistent image on the day it is added, and re-rendering the whole catalogue after a palette change is one command rather than a photo shoot.",
          },
          {
            name: "Server actions instead of an API nobody calls",
            detail:
              "203 server actions and eight route handlers. The routes exist for the things that genuinely need an HTTP endpoint — webhooks, uploads — and the rest is a function call the type checker can see both ends of.",
          },
          {
            name: "Analytics without a third party",
            detail:
              "Page views and visitor identity are first-party tables. A shop has no reason to hand its customers' browsing to an ad network, and a store that does cannot honestly write its own privacy page.",
          },
          {
            name: "Roles enforced on the server",
            detail:
              "Owner, admin, staff and customer, checked server-side rather than by hiding a menu item. Admin devices are recorded per account, so an unfamiliar sign-in is visible.",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/products/screens/ecommerce-home.webp",
        label: "Storefront",
        caption: "The shop front",
      },
      {
        src: "/images/products/screens/ecommerce-products.webp",
        label: "Catalogue",
        caption: "The collection, filtered and sorted",
      },
      {
        src: "/images/products/screens/ecommerce-product-detail.webp",
        label: "Product",
        caption: "Notes, variants and what is actually in stock",
      },
      {
        src: "/images/products/screens/ecommerce-collections.webp",
        label: "Collections",
        caption: "Curated groupings, not just categories",
      },
      {
        src: "/images/products/screens/ecommerce-search.webp",
        label: "Search",
        caption: "Querying the catalogue by name and note",
      },
      {
        src: "/images/products/screens/ecommerce-about.webp",
        label: "Our Story",
        caption: "The brand page",
      },
      {
        src: "/images/products/screens/ecommerce-register.webp",
        label: "Register",
        caption: "Customer sign-up, with passkeys supported",
      },
      {
        src: "/images/products/screens/ecommerce-admin-overview.webp",
        label: "Admin Dashboard",
        caption: "Revenue, orders and stock over a chosen range",
      },
      {
        src: "/images/products/screens/ecommerce-admin-analytics.webp",
        label: "Analytics",
        caption: "Where the revenue actually came from",
      },
      {
        src: "/images/products/screens/ecommerce-admin-orders.webp",
        label: "Orders",
        caption: "Every order and the events behind it",
      },
      {
        src: "/images/products/screens/ecommerce-admin-products.webp",
        label: "Products",
        caption: "The catalogue as the shop manages it",
      },
      {
        src: "/images/products/screens/ecommerce-admin-product-new.webp",
        label: "New Product",
        caption: "Variants, notes, images and inventory in one form",
      },
      {
        src: "/images/products/screens/ecommerce-admin-inventory.webp",
        label: "Inventory",
        caption: "Stock by variant, with a movement log",
      },
      {
        src: "/images/products/screens/ecommerce-admin-customers.webp",
        label: "Customers",
        caption: "Accounts, orders and lifetime value",
      },
      {
        src: "/images/products/screens/ecommerce-admin-coupons.webp",
        label: "Coupons",
        caption: "Discounts scoped to products or collections",
      },
      {
        src: "/images/products/screens/ecommerce-admin-collections.webp",
        label: "Collections",
        caption: "Building a curated group",
      },
      {
        src: "/images/products/screens/ecommerce-admin-reviews.webp",
        label: "Reviews",
        caption: "Moderating what appears on a product",
      },
      {
        src: "/images/products/screens/ecommerce-admin-visitors.webp",
        label: "Visitors",
        caption: "First-party traffic, no third-party tracker",
      },
      {
        src: "/images/products/screens/ecommerce-admin-shipping.webp",
        label: "Shipping",
        caption: "Zones, methods and what each one costs",
      },
      {
        src: "/images/products/screens/ecommerce-admin-payments.webp",
        label: "Payments",
        caption: "Transactions and their webhook history",
      },
      {
        src: "/images/products/screens/ecommerce-admin-settings.webp",
        label: "Settings",
        caption: "What the store owner controls",
      },
      {
        src: "/images/products/screens/ecommerce-admin-logs.webp",
        label: "Activity Log",
        caption: "Who changed what in the admin",
      },
      {
        src: "/images/products/screens/ecommerce-admin-users.webp",
        label: "Admin Users",
        caption: "Owner, admin and staff, with devices",
      },    ],
    languages: ["TypeScript", "TSX", "CSS", "SQL"],
    stack: [
      "TypeScript",
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Zod",
      "React Hook Form",
      "Recharts",
      "SimpleWebAuthn",
      "pdf-lib",
      "Sharp",
      "Playwright",
    ],
    specs: [
      { label: "Prisma models", value: "41" },
      { label: "Pages", value: "52" },
      { label: "Server actions", value: "203" },
      { label: "Payment methods", value: "4" },
    ],
    metric: { label: "Third-party trackers on the store", value: "None" },
    demoUrl: "/contact",
  },
  /* ------------------------------------------------------------------ */
  /* ORYNZA — lead follow-up for HVAC contractors                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "orynza",
    name: "ORYNZA",
    category: "SaaS · Lead Management",
    tagline: "Answer every lead. Miss no follow-up.",
    status: "shipped",
    description:
      "A multi-tenant SaaS for small and mid-sized US heating and air-conditioning contractors, built around one question an owner asks every morning: what needs attention today? New enquiries waiting for a first call, follow-ups gone overdue, estimates nobody chased, appointments still unconfirmed and automation that failed all land on one Action Center, each with the reason, the urgency and the button that deals with it. A separate worker process keeps reminders and automations running with no browser open, and the next-best-action suggestions are deterministic rules that explain themselves rather than a paid AI call.",
    image: "/images/products/orynza-logo.svg",
    brandColor: "#5140E0",
    audience: "HVAC contractors with two to twenty-five people who lose jobs to slow replies and forgotten follow-ups",
    badge: "Live SaaS",
    features: [
      "Today's Action Center: everything that needs a person, with the reason and the action",
      "Lead CRM with table and kanban views, assignment, notes and a full activity history",
      "Follow-ups with due-today, overdue, failed and needs-approval views",
      "Appointments in the business's timezone, with technician double-booking detection",
      "Automations owners can pause, edit and audit — they create tasks and drafts, never message customers",
      "Eleven HVAC message templates, filled from the lead and copied to the owner's own phone",
      "Explainable next-best-action suggestions, labelled as rule-based",
      "Reports where every metric carries its written definition",
      "CSV import with a preview, row-level errors and duplicate detection; formula-safe export",
      "Owner, manager and agent roles, enforced on the server",
    ],
    moduleGroups: [
      {
        title: "The working day",
        items: [
          {
            name: "Action Center",
            detail:
              "New leads awaiting contact, overdue and due-today follow-ups, estimates waiting on a reply, appointments in the next 48 hours, unassigned leads, leads with no next step and failed automations — each row shows who, why, how urgent and when, with Call, Complete, Confirm or Assign right there.",
          },
          {
            name: "Leads and customers",
            detail:
              "Nine statuses from New to Won, Lost or Not interested, with every change written to the lead's history. Customers are matched by normalised phone and email; an ambiguous match is flagged for a person to link and never merged automatically.",
          },
          {
            name: "Follow-ups and appointments",
            detail:
              "Tasks carry a type, a due time in the business's timezone and an assignee; double submits are made harmless by an idempotency key. Booking a technician into an overlapping slot is refused unless someone confirms the double-booking on purpose.",
          },
          {
            name: "Next-best-action suggestions",
            detail:
              "Rules decide the suggestion and say why: a new lead past the response target, an estimate sent days ago with no reply, a visit tomorrow that nobody confirmed, an enquiry mentioning no heat or a gas smell. Nothing happens until someone accepts, edits or dismisses it.",
          },
        ],
      },
      {
        title: "Automation people can trust",
        items: [
          {
            name: "A worker that runs without a browser",
            detail:
              "A separate process claims due work from a Postgres queue with FOR UPDATE SKIP LOCKED, so several copies never pick up the same job. Retries back off exponentially with jitter, work left half-done by a crashed worker is recovered, and failures stay visible until a person resolves them.",
          },
          {
            name: "Exactly once, or not at all",
            detail:
              "Each automation's actions and its execution record are written in one transaction, keyed by rule and event. A replayed event is a no-op, and a run either fully happened or did not happen at all.",
          },
          {
            name: "Explained before it runs",
            detail:
              "Every automation states its trigger, what it touches, when it runs, whether it needs approval and what happens if it fails. Loops are prevented by design: an overdue-follow-up rule can notify people but never create more follow-ups.",
          },
        ],
      },
      {
        title: "Decisions worth naming",
        items: [
          {
            name: "Tenancy is checked on every query",
            detail:
              "The workspace comes only from the signed-in session and a fresh membership lookup, never from the request. Another company's record returns the same not-found as a missing one — proven by a dedicated cross-tenant test suite.",
          },
          {
            name: "Drafts, not sends",
            detail:
              "ORYNZA writes the message and the contractor sends it from their own phone or email. \"Copied\" and \"marked as sent manually\" are recorded separately, so the history never claims a message went out that nobody sent.",
          },
          {
            name: "No paid AI at runtime",
            detail:
              "Suggestions and summaries come from deterministic rules, so the product works with no API credits. A provider-independent adapter exists for a model later, behind configuration, with timeouts and usage limits.",
          },
          {
            name: "Audit that cannot be edited",
            detail:
              "Security and admin events are append-only, enforced by a database trigger rather than by convention.",
          },
        ],
      },
    ],
    screens: [
      { src: "/images/products/screens/orynza-action-center.webp", label: "Action Center", caption: "What needs attention today, and why" },
      { src: "/images/products/screens/orynza-leads.webp", label: "Leads", caption: "Status and owner changed inline" },
      { src: "/images/products/screens/orynza-leads-board.webp", label: "Board", caption: "Every open lead by stage" },
      { src: "/images/products/screens/orynza-lead-detail.webp", label: "Lead", caption: "Suggested next step, drafted message, full history" },
      { src: "/images/products/screens/orynza-follow-ups.webp", label: "Follow-ups", caption: "Overdue work, kept in view until it is done" },
      { src: "/images/products/screens/orynza-appointments.webp", label: "Appointments", caption: "Visits by day, in the business's timezone" },
      { src: "/images/products/screens/orynza-customers.webp", label: "Customers", caption: "One record per customer, duplicates prevented" },
      { src: "/images/products/screens/orynza-reports.webp", label: "Reports", caption: "Metrics with their definitions" },
      { src: "/images/products/screens/orynza-automations.webp", label: "Automations", caption: "What each rule does, when, and if it failed" },
      { src: "/images/products/screens/orynza-templates.webp", label: "Templates", caption: "HVAC message templates with variables" },
      { src: "/images/products/screens/orynza-team.webp", label: "Team", caption: "Roles and each person's workload" },
      { src: "/images/products/screens/orynza-import.webp", label: "CSV Import", caption: "Preview, errors and duplicates before anything is saved" },
      { src: "/images/products/screens/orynza-settings.webp", label: "Settings", caption: "Business hours, response targets and plan limits" },
      { src: "/images/products/screens/orynza-home.webp", label: "Website", caption: "The public site" },
      { src: "/images/products/screens/orynza-login.webp", label: "Sign in", caption: "Server-side sessions, rate-limited sign-in" },
    ],
    languages: ["TypeScript", "TSX", "CSS", "SQL"],
    stack: [
      "TypeScript",
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Zod",
      "Vitest",
      "Playwright",
      "Caddy",
      "systemd",
    ],
    specs: [
      { label: "Prisma models", value: "23" },
      { label: "Pages", value: "37" },
      { label: "Server actions", value: "53" },
      { label: "Automated tests", value: "152" },
    ],
    metric: { label: "Cross-tenant access paths tested", value: "38" },
    demoUrl: "/contact",
  },
  /* ------------------------------------------------------------------ */
  /* Modeza — multi-vendor fashion marketplace                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "modeza",
    name: "Modeza",
    category: "Marketplace",
    tagline: "Every fashion brand. One destination.",
    description:
      "A multi-vendor fashion marketplace with four different systems behind one domain: customers browse every brand in one cart, vendors run their own shop and stock, riders carry the deliveries, and the platform approves who may trade and takes its commission. One order splits into a sub-order per vendor, each fulfilled and refunded independently while the customer still sees a single purchase. 51 screens and 49 API routes over a 39-model schema.",
    image: "/images/products/modeza-logo.webp",
    brandColor: "#5B21B6",
    audience:
      "A marketplace operator onboarding independent fashion brands, and the brands and couriers working inside it",
    badge: "Four roles, one platform",
    features: [
      "One cart across many vendors, split into a sub-order each",
      "Vendor onboarding with documents, approved by a human before trading",
      "Commission and payouts calculated per vendor",
      "Rider app with assigned deliveries, a map and earnings",
      "Returns and refunds adjudicated against the sub-order that sold the item",
      "Stock by variant with a movement log, per vendor",
      "Promotions and coupons, scoped to a vendor's own lines",
      "Cash on delivery, JazzCash, EasyPaisa and bank transfer",
      "Audit log over every administrative change",
      "Demo catalogue runs on fictional vendors, not real companies",
    ],
    moduleGroups: [
      {
        title: "The part that makes it a marketplace",
        items: [
          {
            name: "One order, a sub-order per vendor",
            detail:
              "A customer buying from three brands makes one purchase and three sub-orders. Each vendor sees only theirs, fulfils on their own timetable and refunds independently, while the customer still tracks a single order. Collapsing that into one record is what makes multi-vendor refunds impossible later.",
          },
          {
            name: "Who may trade is a decision",
            detail:
              "A brand registers, uploads documents and waits. An administrator approves them. A marketplace where signing up is the same as being listed has no answer when a seller turns out to be fictitious.",
          },
          {
            name: "Commission and payouts",
            detail:
              "The platform's cut is calculated per sub-order and carried into a payout balance per vendor, so what a seller is owed is derived from what actually sold rather than reconciled by hand each month.",
          },
          {
            name: "Returns adjudicated centrally",
            detail:
              "A return is raised against the sub-order that sold the item, so the money comes back from the right vendor's balance and the platform — not the customer — is the one chasing it.",
          },
        ],
      },
      {
        title: "Four systems, one domain",
        items: [
          {
            name: "Customer",
            detail:
              "Browse by brand or category, search across every vendor at once, one cart, one checkout, wishlist, order tracking and returns.",
          },
          {
            name: "Vendor",
            detail:
              "Their own dashboard, catalogue, inventory by variant, orders limited to their sub-orders, promotions on their own lines, analytics, payouts, storefront settings and a catalogue integration.",
          },
          {
            name: "Rider",
            detail:
              "Assigned deliveries with their status, a map to the next drop, and earnings. The courier is a first-class role with its own screens rather than a status field on an order.",
          },
          {
            name: "Platform admin",
            detail:
              "Brand approval, every listing and order across the marketplace, customers, riders, payouts, returns, the shared taxonomy, analytics, an audit log and the commission and payment policy.",
          },
        ],
      },
      {
        title: "Decisions worth naming",
        items: [
          {
            name: "Stock belongs to the vendor",
            detail:
              "Inventory is per vendor and per variant with a movement log, because two brands selling a similar item are two independent stock positions, not one shared number.",
          },
          {
            name: "Payment as Pakistani customers use it",
            detail:
              "Cash on delivery, JazzCash, EasyPaisa and bank transfer. A marketplace in this market that only takes cards is a marketplace most of its customers cannot buy from.",
          },
          {
            name: "Fictional vendors in the demo",
            detail:
              "The seeded catalogue originally used real Pakistani fashion companies as sample vendors, which is why the hosted demo carries a noindex header. The captures on this page were taken after renaming them to invented labels: a real company must not appear as a seller on a marketplace it has no relationship with, beside invented orders and payouts.",
          },
          {
            name: "Custom auth, not a provider",
            detail:
              "JWT sessions signed with jose and bcrypt password hashes, with the role carried in the token and checked server-side per route group — four roles meeting in one app is exactly where a bolted-on auth provider starts fighting the routing.",
          },
        ],
      },
    ],
    screens: [
      {
        src: "/images/products/screens/modeza-home.webp",
        label: "Storefront",
        caption: "Every brand, one cart, one checkout",
      },
      {
        src: "/images/products/screens/modeza-brands.webp",
        label: "Brands",
        caption: "The vendors trading on the platform",
      },
      {
        src: "/images/products/screens/modeza-brand-storefront.webp",
        label: "Brand Storefront",
        caption: "A vendor's own shop inside the marketplace",
      },
      {
        src: "/images/products/screens/modeza-categories.webp",
        label: "Categories",
        caption: "The catalogue by department",
      },
      {
        src: "/images/products/screens/modeza-product-detail.webp",
        label: "Product",
        caption: "Variants, stock and the brand behind it",
      },
      {
        src: "/images/products/screens/modeza-search.webp",
        label: "Search",
        caption: "Across every vendor at once",
      },
      {
        src: "/images/products/screens/modeza-cart.webp",
        label: "Cart",
        caption: "One basket spanning several vendors",
      },
      {
        src: "/images/products/screens/modeza-wishlist.webp",
        label: "Wishlist",
        caption: "Saved across sessions",
      },
      {
        src: "/images/products/screens/modeza-orders.webp",
        label: "My Orders",
        caption: "One order, split by the vendors that fulfil it",
      },
      {
        src: "/images/products/screens/modeza-notifications.webp",
        label: "Notifications",
        caption: "Order, delivery and return events",
      },
      {
        src: "/images/products/screens/modeza-brand-signup.webp",
        label: "Sell on Modeza",
        caption: "Vendor onboarding, with documents",
      },
      {
        src: "/images/products/screens/modeza-seller-terms.webp",
        label: "Seller Terms",
        caption: "What a vendor is agreeing to",
      },
      {
        src: "/images/products/screens/modeza-vendor-dashboard.webp",
        label: "Vendor Dashboard",
        caption: "A seller's own trading figures",
      },
      {
        src: "/images/products/screens/modeza-vendor-products.webp",
        label: "Vendor Products",
        caption: "The seller's catalogue",
      },
      {
        src: "/images/products/screens/modeza-vendor-product-new.webp",
        label: "Add a Product",
        caption: "Variants, images and stock in one form",
      },
      {
        src: "/images/products/screens/modeza-vendor-orders.webp",
        label: "Vendor Orders",
        caption: "Only the sub-orders that belong to them",
      },
      {
        src: "/images/products/screens/modeza-vendor-inventory.webp",
        label: "Vendor Inventory",
        caption: "Stock by variant, with movements",
      },
      {
        src: "/images/products/screens/modeza-vendor-promotions.webp",
        label: "Promotions",
        caption: "Discounts a vendor runs on their own lines",
      },
      {
        src: "/images/products/screens/modeza-vendor-payouts.webp",
        label: "Payouts",
        caption: "Commission deducted, balance owed",
      },
      {
        src: "/images/products/screens/modeza-vendor-returns.webp",
        label: "Returns",
        caption: "Requests against the seller's own orders",
      },
      {
        src: "/images/products/screens/modeza-vendor-analytics.webp",
        label: "Vendor Analytics",
        caption: "What sold, and what did not",
      },
      {
        src: "/images/products/screens/modeza-vendor-storefront.webp",
        label: "Storefront Settings",
        caption: "How the shop presents itself",
      },
      {
        src: "/images/products/screens/modeza-vendor-integrations.webp",
        label: "Integrations",
        caption: "Pushing a catalogue in from elsewhere",
      },
      {
        src: "/images/products/screens/modeza-admin-dashboard.webp",
        label: "Admin Dashboard",
        caption: "The whole marketplace on one screen",
      },
      {
        src: "/images/products/screens/modeza-admin-brands.webp",
        label: "Brand Approval",
        caption: "Who may trade, decided by a human",
      },
      {
        src: "/images/products/screens/modeza-admin-products.webp",
        label: "Products",
        caption: "Every listing across every vendor",
      },
      {
        src: "/images/products/screens/modeza-admin-orders.webp",
        label: "Orders",
        caption: "The order and its sub-orders together",
      },
      {
        src: "/images/products/screens/modeza-admin-customers.webp",
        label: "Customers",
        caption: "Accounts and their order history",
      },
      {
        src: "/images/products/screens/modeza-admin-riders.webp",
        label: "Riders",
        caption: "The delivery fleet and its assignments",
      },
      {
        src: "/images/products/screens/modeza-admin-payouts.webp",
        label: "Payouts",
        caption: "What the platform owes each vendor",
      },
      {
        src: "/images/products/screens/modeza-admin-returns.webp",
        label: "Returns",
        caption: "Refunds adjudicated centrally",
      },
      {
        src: "/images/products/screens/modeza-admin-categories.webp",
        label: "Categories",
        caption: "The taxonomy every vendor lists into",
      },
      {
        src: "/images/products/screens/modeza-admin-analytics.webp",
        label: "Platform Analytics",
        caption: "Revenue, commission and growth",
      },
      {
        src: "/images/products/screens/modeza-admin-audit.webp",
        label: "Audit Log",
        caption: "Who changed what",
      },
      {
        src: "/images/products/screens/modeza-admin-settings.webp",
        label: "Platform Settings",
        caption: "Commission, payments and policy",
      },
      {
        src: "/images/products/screens/modeza-rider-dashboard.webp",
        label: "Rider Dashboard",
        caption: "The courier's day",
      },
      {
        src: "/images/products/screens/modeza-rider-deliveries.webp",
        label: "Deliveries",
        caption: "Assigned jobs, with their status",
      },
      {
        src: "/images/products/screens/modeza-rider-map.webp",
        label: "Rider Map",
        caption: "Where the next drop is",
      },
      {
        src: "/images/products/screens/modeza-rider-earnings.webp",
        label: "Rider Earnings",
        caption: "What the courier is owed",
      },
      {
        src: "/images/products/screens/modeza-mobile-home.webp",
        label: "Mobile — Storefront",
        caption: "The shop at phone width",
      },
      {
        src: "/images/products/screens/modeza-mobile-brands.webp",
        label: "Mobile — Brands",
        caption: "Browsing vendors on a phone",
      },    ],
    languages: ["TypeScript", "TSX", "CSS", "SQL"],
    stack: [
      "TypeScript",
      "Next.js 16",
      "Prisma",
      "PostgreSQL",
      "Zod",
      "Radix UI",
      "Tailwind CSS",
      "framer-motion",
      "jose",
    ],
    specs: [
      { label: "Screens", value: "51" },
      { label: "API routes", value: "49" },
      { label: "Prisma models", value: "39" },
      { label: "Roles", value: "4" },
    ],
    metric: { label: "Systems behind one domain", value: "4" },
    demoUrl: "/contact",
  },
];

/**
 * The platform count, spelled out.
 *
 * Four pages and the navbar open with "N platforms". That line was hand-typed
 * and went stale the moment a product was added — so it is derived here instead,
 * from the same array the pages render. Past twelve it falls back to digits,
 * which is the point at which prose would stop reading like prose anyway.
 */
const WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six",
  "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
];

export const platformCount = products.length;
export const platformCountWord = WORDS[products.length] ?? String(products.length);
