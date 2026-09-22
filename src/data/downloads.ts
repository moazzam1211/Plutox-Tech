import type { PosBuild } from "@/types";

/**
 * The three ServeSync POS installers. GENERATED — run `npm run downloads`.
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
    "version": "2.2.45",
    "bytes": 110566755,
    "sha256": "668abf36cbca0b182f3236707da1bdfb93aa10c9ca81faf043d36200daedaf39",
    "releasedAt": "2026-09-22",
    "filename": "ServeSync-Restaurant-Setup.exe",
    "href": "https://admin.plutoxtech.com/downloads/ServeSync-Restaurant-Setup.exe"
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
    "version": "2.1.39",
    "bytes": 110091080,
    "sha256": "c6ab0ef6b34ba36dbe8ddf70eb1c920caf71f9460c57af78d3cb41c921be8524",
    "releasedAt": "2026-09-22",
    "filename": "ServeSync-Mart-Setup.exe",
    "href": "https://admin.plutoxtech.com/downloads/ServeSync-Mart-Setup.exe"
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
    "version": "2.1.38",
    "bytes": 113927969,
    "sha256": "416482de237069dad08d11a837139615cd03ffde0b32b3c747f003cec89cb5eb",
    "releasedAt": "2026-09-22",
    "filename": "ServeSync-Pharmacy-Setup.exe",
    "href": "https://admin.plutoxtech.com/downloads/ServeSync-Pharmacy-Setup.exe"
  }
];
