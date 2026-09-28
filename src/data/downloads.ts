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
    "version": "2.2.49",
    "bytes": 110571778,
    "sha256": "5d3571c02afb78ee25d64e61192e095db1cc39e66735d5cccc682a92e4b65d0c",
    "releasedAt": "2026-09-27",
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
    "version": "2.1.41",
    "bytes": 110095173,
    "sha256": "126854deaddd7fa4b8e6da56082dbb57371ef4e957d85f0378bc21603eeb0a7a",
    "releasedAt": "2026-09-27",
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
    "version": "2.1.40",
    "bytes": 113932171,
    "sha256": "7978870756ebb4cbfa76bdb938002e81d47967cbd4d6dd49b74794911f7973a0",
    "releasedAt": "2026-09-27",
    "filename": "ServeSync-Pharmacy-Setup.exe",
    "href": "https://admin.plutoxtech.com/downloads/ServeSync-Pharmacy-Setup.exe"
  }
];
