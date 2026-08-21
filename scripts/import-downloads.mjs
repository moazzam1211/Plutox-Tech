/**
 * Collect the client-facing installers and generate `src/data/downloads.ts`.
 *
 * Two tiers, decided by size:
 *
 * - **Hosted here.** The ServeSync .NET thin client (2 MB) and the Android TWA
 *   shells (30–385 KB) are copied into `public/downloads` and served directly.
 * - **Linked to GitHub Releases.** The Electron and pkg installers are 48–96 MB.
 *   GitHub warns above 50 MB and refuses above 100 MB, git history keeps a blob
 *   forever, and a static host would be serving ~240 MB of binaries from the
 *   marketing site. Releases is what that mechanism is for.
 *
 * Size and SHA-256 are read off the real file, never typed by hand — a checksum
 * nobody generated is worse than no checksum, because it looks like assurance.
 *
 * Run with:  npm run downloads
 */
import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, join } from "node:path";

const DL = "C:/Users/aaa/Downloads";
const OUT = join(process.cwd(), "public", "downloads");

/** `repo` is the GitHub repo whose Releases page hosts the large builds. */
const PRODUCTS = [
  {
    slug: "servesync-pos",
    name: "ServeSync POS",
    repo: "moazzam1211/ServeSync-POS",
    version: "2.0.0",
    files: [
      {
        from: `${DL}/restaurant-pos-full/desktop-dotnet/installer-out/ServeSync-POS-Setup-DotNet.exe`,
        label: "Windows desktop (thin client)",
        note: "A .NET shell that points at your server and updates itself from it, so a new release does not mean re-installing on every till.",
        platform: "Windows",
        hosted: true,
      },
      {
        from: `${DL}/restaurant-pos-full/dist-desktop/ServeSync-POS-Setup.exe`,
        label: "Windows desktop (standalone)",
        note: "Bundles its own runtime and server. Use it where a till has no reliable connection to a central server.",
        platform: "Windows",
        hosted: false,
      },
      {
        from: `${DL}/restaurant-pos-full/android/apks/ServeSync-Owner.apk`,
        label: "Owner app",
        note: "Every branch's live sales, orders and alerts on a phone.",
        platform: "Android",
        hosted: true,
      },
      {
        from: `${DL}/restaurant-pos-full/android/apks/ServeSync-Waiter.apk`,
        label: "Waiter pad",
        note: "Table-aware order punching from the floor, with PIN login.",
        platform: "Android",
        hosted: true,
      },
      {
        from: `${DL}/restaurant-pos-full/android/apks/ServeSync-Rider.apk`,
        label: "Rider app",
        note: "Assigned deliveries with navigate, call and status updates.",
        platform: "Android",
        hosted: true,
      },
    ],
  },
  {
    slug: "pharmasync-pos",
    name: "PharmaSync POS",
    repo: "moazzam1211/PharmaSync",
    version: "1.0.0",
    files: [
      {
        from: `${DL}/pharmacy-pos-full/dist/pharmasync-pos-full-win.exe`,
        label: "Windows desktop",
        note: "Standalone binary with automatic self-signed HTTPS, so LAN terminals get the secure context a PWA needs.",
        platform: "Windows",
        hosted: false,
      },
    ],
  },
  {
    slug: "vendeez-pos",
    name: "Vendeez POS",
    repo: "moazzam1211/Vendeez-POS",
    version: "1.3.0",
    files: [
      {
        from: `${DL}/mart-pos-full/dist-desktop/Vendeez POS Setup 1.3.0.exe`,
        label: "Windows desktop",
        note: "Installer for the till, with the scanner pairing and fiscal integration built in.",
        platform: "Windows",
        hosted: false,
      },
      {
        from: `${DL}/mart-pos-full/dist/Vendeez-Owner.apk`,
        label: "Owner app",
        note: "Sales, profit, stock and alerts for the store on a phone.",
        platform: "Android",
        hosted: true,
      },
      {
        from: `${DL}/mart-pos-full/dist/Vendeez-Scanner.apk`,
        label: "Scanner app",
        note: "Turns a phone into a wireless barcode scanner, paired to the till over Socket.IO.",
        platform: "Android",
        hosted: true,
      },
    ],
  },
];

await mkdir(OUT, { recursive: true });

const groups = [];

for (const product of PRODUCTS) {
  const files = [];

  for (const file of product.files) {
    if (!existsSync(file.from)) {
      console.log(`  ! missing, skipped: ${file.from}`);
      continue;
    }

    const [{ size }, buffer] = await Promise.all([stat(file.from), readFile(file.from)]);
    const sha256 = createHash("sha256").update(buffer).digest("hex");
    // Spaces in a filename become %20 in a URL and a support call. Normalise.
    const filename = basename(file.from).replace(/\s+/g, "-");

    if (file.hosted) {
      await copyFile(file.from, join(OUT, filename));
    }

    files.push({
      label: file.label,
      note: file.note,
      platform: file.platform,
      filename,
      bytes: size,
      sha256,
      href: file.hosted
        ? `/downloads/${filename}`
        : `https://github.com/${product.repo}/releases/latest`,
      hosted: file.hosted,
    });

    console.log(
      `  ${file.hosted ? "✓ hosted " : "→ release"}  ${(size / 1048576).toFixed(1).padStart(6)} MB  ${filename}`,
    );
  }

  groups.push({ ...product, files });
}

const body = `import type { DownloadGroup } from "@/types";

/**
 * Client downloads. GENERATED — run \`npm run downloads\` rather than editing.
 *
 * Every size and checksum is read off the real build artefact by
 * \`scripts/import-downloads.mjs\`. A hand-typed checksum is worse than none: it
 * looks like assurance and verifies nothing.
 *
 * \`hosted: false\` means the file is too large to serve from this repo — GitHub
 * refuses a blob over 100 MB and git history would keep it forever — so the link
 * goes to that product's Releases page instead.
 */
export const downloadGroups: DownloadGroup[] = ${JSON.stringify(groups.map(({ slug, name, repo, version, files }) => ({ slug, name, repo, version, files })), null, 2)};
`;

await writeFile(join(process.cwd(), "src", "data", "downloads.ts"), body, "utf8");
console.log("\nWrote src/data/downloads.ts");
