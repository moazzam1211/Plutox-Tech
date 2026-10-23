import type { PosBuild } from "@/types";

/**
 * The ServeSync downloads: three Windows POS installers and the Pocket Android app. GENERATED — run `npm run downloads`.
 *
 * Version, size and release date come from electron-builder's `latest.yml`; the
 * SHA-256 is computed from the artefact itself. Do not edit by hand — a figure
 * typed here that disagrees with the file on the server is worse than no figure.
 *
 * The binaries live on `admin.plutoxtech.com`, not in this repo: GitHub rejects
 * a blob over 100 MB, and three installers would put 320 MB in git history
 * permanently.
 */
export const posBuilds: PosBuild[] = [
  {
    "slug": "restaurant",
    "name": "ServeSync Restaurant",
    "tagline": "Dine-in, takeaway and delivery",
    "blurb": "Floor plan and table status, a kitchen display per station, modifiers and split tax at the till, riders and zones for delivery, and Foodpanda arriving as a first-class channel rather than a phone call someone re-types.",
    "highlights": [
      "Floor plan with dwell-time escalation",
      "Kitchen display with bump and recall",
      "Delivery zones, riders and a live map",
      "Foodpanda orders as a native channel"
    ],
    "version": "2.2.92",
    "bytes": 110615821,
    "sha256": "d49ca90b9cadfca5039511dd12533cc07921c20ef07800afc1e17a58a283917d",
    "releasedAt": "2026-10-16",
    "filename": "ServeSync-Restaurant-Setup.exe",
    "href": "https://admin.plutoxtech.com/downloads/ServeSync-Restaurant-Setup.exe",
    "platform": "windows"
  },
  {
    "slug": "mart",
    "name": "ServeSync Mart",
    "tagline": "Supermarkets and retail",
    "blurb": "Barcode scanning from a camera or a phone, loyalty tiers, promotions and gift cards, and a till report that closes the shift — built for a queue that has to keep moving.",
    "highlights": [
      "Camera and phone barcode scanning",
      "Loyalty tiers, promotions, gift cards",
      "Till Report-X and shift close",
      "Multi-outlet stock and transfers"
    ],
    "version": "2.1.56",
    "bytes": 110110469,
    "sha256": "ece459a46684bf1dc3e9a3b02378fde595c338a08856856460090f19804fe017",
    "releasedAt": "2026-10-16",
    "filename": "ServeSync-Mart-Setup.exe",
    "href": "https://admin.plutoxtech.com/downloads/ServeSync-Mart-Setup.exe",
    "platform": "windows"
  },
  {
    "slug": "pharmacy",
    "name": "ServeSync Pharmacy",
    "tagline": "Pharmacies and medical stores",
    "blurb": "Batch and expiry tracking, a dispensing ticket, PRA/FBR fiscal reporting and a list-view till that suits a counter where the product is asked for by name rather than picked off a shelf.",
    "highlights": [
      "Batch and expiry tracking",
      "Dispensing ticket printing",
      "PRA / FBR fiscal reporting",
      "List-view till for counter service"
    ],
    "version": "2.1.56",
    "bytes": 113946979,
    "sha256": "f445eb2636c2c23e613fa5b183150aa95116b52d4572f629bbf8179254d7cd3a",
    "releasedAt": "2026-10-16",
    "filename": "ServeSync-Pharmacy-Setup.exe",
    "href": "https://admin.plutoxtech.com/downloads/ServeSync-Pharmacy-Setup.exe",
    "platform": "windows"
  },
  {
    "slug": "pocket",
    "name": "ServeSync Pocket",
    "tagline": "The whole shop on an Android phone",
    "blurb": "Sell, stock and khata from a phone: scan barcodes with the camera, weigh loose items, print GST invoices and kitchen tickets to a Bluetooth printer, and keep selling offline — every sale uploads when the connection is back. Fits grocery, pharmacy, restaurant, wholesale and more.",
    "highlights": [
      "Camera scanning with auto-filled products",
      "Works offline, syncs when back online",
      "Bluetooth bills, KOT and day reports",
      "Khata, shifts, inventory and reports"
    ],
    "version": "0.10.1",
    "bytes": 83438899,
    "sha256": "c9f5688fdff02987da784dba00a980f066258379116f1817769b34dcd315a1e2",
    "releasedAt": "2026-10-23",
    "filename": "ServeSync-Pocket.apk",
    "href": "https://admin.plutoxtech.com/downloads/ServeSync-Pocket.apk",
    "platform": "android"
  }
];
