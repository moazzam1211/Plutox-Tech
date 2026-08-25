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
        "label": "Windows till (thin client)",
        "note": "The one to install on a till. Asks once for your server address, then loads the POS from it — restaurant, pharmacy or mart, whichever edition that server runs. Updating the server updates every till.",
        "platform": "Windows",
        "filename": "ServeSync-POS-Setup-DotNet.exe",
        "bytes": 19941264,
        "sha256": "0806cf2545a3c313cd765bead450b40aebe9be6043cf55808eabc7ca504881e6",
        "href": "/downloads/ServeSync-POS-Setup-DotNet.exe",
        "hosted": true
      },
      {
        "label": "Windows all-in-one (Electron)",
        "note": "Bundles the server and its own runtime, for a single shop with no separate server box. Carries all three editions; you pick one at first run.",
        "platform": "Windows",
        "filename": "ServeSync-POS-Setup.exe",
        "bytes": 122520872,
        "sha256": "c5559b69a84551d7bbaaf442f53da5f40c3b916a46379ee1db303083e6db1789",
        "href": "https://github.com/moazzam1211/ServeSync-POS/releases/latest",
        "hosted": false
      },
      {
        "label": "Windows server (single file)",
        "note": "The POS server as one executable — no install, no Node. Run it on the shop's PC and point every till and phone at it.",
        "platform": "Windows",
        "filename": "servesync-pos-full-win.exe",
        "bytes": 72552380,
        "sha256": "32c907a92d947b2c15db8f429d79050de0ebad502f782355aaa0979dcf1e3fb7",
        "href": "https://github.com/moazzam1211/ServeSync-POS/releases/latest",
        "hosted": false
      },
      {
        "label": "Owner app",
        "note": "Every branch's live sales, orders and alerts on a phone.",
        "platform": "Android",
        "filename": "ServeSync-Owner.apk",
        "bytes": 2037161,
        "sha256": "74ef56685c30bfe95ea5ebceee7fdad925ffcdba0ff5695882adc333e2c44d20",
        "href": "/downloads/ServeSync-Owner.apk",
        "hosted": true
      },
      {
        "label": "Waiter pad",
        "note": "Table-aware order punching from the floor, with PIN login. Restaurant edition.",
        "platform": "Android",
        "filename": "ServeSync-Waiter.apk",
        "bytes": 2043333,
        "sha256": "720e9b8eecd128189219a015bd7f08b0946d2281366ea35d08b28ccfed1ee2ac",
        "href": "/downloads/ServeSync-Waiter.apk",
        "hosted": true
      },
      {
        "label": "Rider app",
        "note": "Assigned deliveries with navigate, call and status updates. Restaurant edition.",
        "platform": "Android",
        "filename": "ServeSync-Rider.apk",
        "bytes": 2050341,
        "sha256": "a91931cb7618c4975dc38315640ee83a13384d482b225018e2378c0474c7e201",
        "href": "/downloads/ServeSync-Rider.apk",
        "hosted": true
      },
      {
        "label": "Scanner app",
        "note": "Turns a phone into a wireless barcode scanner paired to the till over Socket.IO, for selling and for stock-in. Mart and pharmacy editions.",
        "platform": "Android",
        "filename": "ServeSync-Scanner.apk",
        "bytes": 30136,
        "sha256": "50a79596c376910da642f6f8c1c4f5f36dadf750a355d637135b6cb9637f3202",
        "href": "/downloads/ServeSync-Scanner.apk",
        "hosted": true
      }
    ]
  }
];
