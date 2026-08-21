import type { DownloadGroup } from "@/types";

/**
 * Client downloads. GENERATED — run `npm run downloads` rather than editing.
 *
 * Every size and checksum is read off the real build artefact by
 * `scripts/import-downloads.mjs`. A hand-typed checksum is worse than none: it
 * looks like assurance and verifies nothing.
 *
 * `hosted: false` means the file is too large to serve from this repo — GitHub
 * refuses a blob over 100 MB and git history would keep it forever — so the link
 * goes to that product's Releases page instead.
 */
export const downloadGroups: DownloadGroup[] = [
  {
    "slug": "servesync-pos",
    "name": "ServeSync POS",
    "repo": "moazzam1211/ServeSync-POS",
    "version": "2.0.0",
    "files": [
      {
        "label": "Windows desktop (thin client)",
        "note": "A .NET shell that points at your server and updates itself from it, so a new release does not mean re-installing on every till.",
        "platform": "Windows",
        "filename": "ServeSync-POS-Setup-DotNet.exe",
        "bytes": 2310019,
        "sha256": "7006b9f1c0b5153d20c3c2a13b17f863f907dc3be5b5f8dc0f3d7ca017678ed2",
        "href": "/downloads/ServeSync-POS-Setup-DotNet.exe",
        "hosted": true
      },
      {
        "label": "Windows desktop (standalone)",
        "note": "Bundles its own runtime and server. Use it where a till has no reliable connection to a central server.",
        "platform": "Windows",
        "filename": "ServeSync-POS-Setup.exe",
        "bytes": 100635410,
        "sha256": "4e239d6e4c5c70d9b4b10af73e5fc5c056a3cfa700f88bd7cf28f2433f4ef392",
        "href": "https://github.com/moazzam1211/ServeSync-POS/releases/latest",
        "hosted": false
      },
      {
        "label": "Owner app",
        "note": "Every branch's live sales, orders and alerts on a phone.",
        "platform": "Android",
        "filename": "ServeSync-Owner.apk",
        "bytes": 30747,
        "sha256": "a9130e44ca565261c0898fc7f368dd6f87b648e3d03e66092b90d5f682e5e70f",
        "href": "/downloads/ServeSync-Owner.apk",
        "hosted": true
      },
      {
        "label": "Waiter pad",
        "note": "Table-aware order punching from the floor, with PIN login.",
        "platform": "Android",
        "filename": "ServeSync-Waiter.apk",
        "bytes": 36327,
        "sha256": "1315d02c1cf64f2936df7a6b09f6c5f14ae75c0943dd1a744d40581a94567104",
        "href": "/downloads/ServeSync-Waiter.apk",
        "hosted": true
      },
      {
        "label": "Rider app",
        "note": "Assigned deliveries with navigate, call and status updates.",
        "platform": "Android",
        "filename": "ServeSync-Rider.apk",
        "bytes": 40183,
        "sha256": "ddf2441459ba2624b5a46287d8dc34a89bc2d54401cb13dd8d83aadef6748406",
        "href": "/downloads/ServeSync-Rider.apk",
        "hosted": true
      }
    ]
  },
  {
    "slug": "pharmasync-pos",
    "name": "PharmaSync POS",
    "repo": "moazzam1211/PharmaSync",
    "version": "1.0.0",
    "files": [
      {
        "label": "Windows desktop",
        "note": "Standalone binary with automatic self-signed HTTPS, so LAN terminals get the secure context a PWA needs.",
        "platform": "Windows",
        "filename": "pharmasync-pos-full-win.exe",
        "bytes": 50543846,
        "sha256": "abc547b96daf6f695362d16f5ba06814d96c49307f385e22b402ca82ba3d5329",
        "href": "https://github.com/moazzam1211/PharmaSync/releases/latest",
        "hosted": false
      }
    ]
  },
  {
    "slug": "vendeez-pos",
    "name": "Vendeez POS",
    "repo": "moazzam1211/Vendeez-POS",
    "version": "1.3.0",
    "files": [
      {
        "label": "Windows desktop",
        "note": "Installer for the till, with the scanner pairing and fiscal integration built in.",
        "platform": "Windows",
        "filename": "Vendeez-POS-Setup-1.3.0.exe",
        "bytes": 100888424,
        "sha256": "af630ccfc0518294bd49797311bfcdc86985e1a27b7db0d064b753ea4f662a71",
        "href": "https://github.com/moazzam1211/Vendeez-POS/releases/latest",
        "hosted": false
      },
      {
        "label": "Owner app",
        "note": "Sales, profit, stock and alerts for the store on a phone.",
        "platform": "Android",
        "filename": "Vendeez-Owner.apk",
        "bytes": 38624,
        "sha256": "d82abbda4677fa96113740b4dc8499d913b3f7db0659027107bcd81605bef1fe",
        "href": "/downloads/Vendeez-Owner.apk",
        "hosted": true
      },
      {
        "label": "Scanner app",
        "note": "Turns a phone into a wireless barcode scanner, paired to the till over Socket.IO.",
        "platform": "Android",
        "filename": "Vendeez-Scanner.apk",
        "bytes": 394618,
        "sha256": "a6fc5350fb53fd929e77d272af93b77352b848542f2d1c9a4cca23c152f21284",
        "href": "/downloads/Vendeez-Scanner.apk",
        "hosted": true
      }
    ]
  }
];
