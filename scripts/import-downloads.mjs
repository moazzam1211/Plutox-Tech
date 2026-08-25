/**
 * Collect the client-facing installers and generate `src/data/downloads.ts`.
 *
 * Two tiers, decided by size:
 *
 * - **Hosted here.** The .NET thin client (~20 MB) and the four Android apps
 *   (30 KB – 2 MB) are copied into `public/downloads` and served directly. The
 *   thin client is the build most clients actually need, so it has to work the
 *   moment the page loads rather than wait on a release upload.
 * - **Linked to GitHub Releases.** The Electron installer (~123 MB) and the
 *   single-file server (~73 MB). GitHub refuses a repo blob over 100 MB, git
 *   history keeps a blob forever, and a marketing site has no business serving
 *   200 MB of binaries. Releases is what that mechanism is for.
 *
 * One product now, not three: the pharmacy and mart builds became editions of
 * ServeSync, and a single installer carries all three.
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
        label: "Windows till (thin client)",
        note: "The one to install on a till. Asks once for your server address, then loads the POS from it — restaurant, pharmacy or mart, whichever edition that server runs. Updating the server updates every till.",
        platform: "Windows",
        hosted: true,
      },
      {
        from: `${DL}/restaurant-pos-full/dist-desktop/ServeSync-POS-Setup.exe`,
        label: "Windows all-in-one (Electron)",
        note: "Bundles the server and its own runtime, for a single shop with no separate server box. Carries all three editions; you pick one at first run.",
        platform: "Windows",
        hosted: false,
      },
      {
        from: `${DL}/restaurant-pos-full/dist/servesync-pos-full-win.exe`,
        label: "Windows server (single file)",
        note: "The POS server as one executable — no install, no Node. Run it on the shop's PC and point every till and phone at it.",
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
        note: "Table-aware order punching from the floor, with PIN login. Restaurant edition.",
        platform: "Android",
        hosted: true,
      },
      {
        from: `${DL}/restaurant-pos-full/android/apks/ServeSync-Rider.apk`,
        label: "Rider app",
        note: "Assigned deliveries with navigate, call and status updates. Restaurant edition.",
        platform: "Android",
        hosted: true,
      },
      {
        from: `${DL}/restaurant-pos-full/android/apks/ServeSync-Scanner.apk`,
        label: "Scanner app",
        note: "Turns a phone into a wireless barcode scanner paired to the till over Socket.IO, for selling and for stock-in. Mart and pharmacy editions.",
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
