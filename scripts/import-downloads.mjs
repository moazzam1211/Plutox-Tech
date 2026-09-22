/**
 * Collect the three POS installers and generate `src/data/downloads.ts`.
 *
 * Every figure is read off electron-builder's own `latest.yml` and the real
 * artefact on disk — version, byte size, release date — and the SHA-256 is
 * computed here. Nothing is typed by hand: a checksum nobody generated is worse
 * than no checksum, because it looks like assurance and verifies nothing.
 *
 * **The binaries are not in this repo.** At ~105 MB each, GitHub refuses a blob
 * over 100 MB outright, and git history would keep all three forever. They are
 * served from `admin.plutoxtech.com/downloads/`, which is the box that already
 * hosts the POS update channel — so this is the host clients' tills already talk
 * to, not a new dependency.
 *
 * Publishing a new build is therefore two commands, in this order:
 *
 *   scp -i ~/.ssh/servesync_cloud "<dist-desktop>/<Setup>.exe" \
 *       root@15.252.227.22:/opt/plutox/admin/public/downloads/<stable-name>.exe.part
 *   ssh … 'cd /opt/plutox/admin/public/downloads && mv <name>.exe.part <name>.exe'
 *   npm run downloads
 *
 * Upload first, generate second. The `.part` staging matters: the directory is
 * publicly served, so moving into place only once the bytes are complete is what
 * stops a client downloading a truncated installer mid-upload.
 *
 * ponytail: the generated size/hash describe the LOCAL build, and nothing here
 * proves the server holds that same file. Re-uploading is a manual step, so a
 * skipped upload shows up as a failed checksum for the client rather than a
 * failed build here. If that ever bites, make this script verify the remote
 * hash before writing.
 *
 * Run with:  npm run downloads
 */
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DL = "C:/Users/aaa/Downloads";
const BASE = "https://admin.plutoxtech.com/downloads";

/**
 * The three editions. `stable` is the filename on the server — deliberately
 * without a version, so a new build is an upload rather than an upload plus a
 * link edit on every page that points at it.
 */
const EDITIONS = [
  {
    slug: "restaurant",
    dir: "restaurant-pos-full",
    stable: "ServeSync-Restaurant-Setup.exe",
    name: "ServeSync Restaurant",
    tagline: "Dine-in, takeaway and delivery",
    blurb:
      "Floor plan and table status, a kitchen display per station, modifiers and split tax at the till, riders and zones for delivery, and Foodpanda arriving as a first-class channel rather than a phone call someone re-types.",
    highlights: [
      "Floor plan with dwell-time escalation",
      "Kitchen display with bump and recall",
      "Delivery zones, riders and a live map",
      "Foodpanda orders as a native channel",
    ],
  },
  {
    slug: "mart",
    dir: "mart-pos-full",
    stable: "ServeSync-Mart-Setup.exe",
    name: "ServeSync Mart",
    tagline: "Supermarkets and retail",
    blurb:
      "Barcode scanning from a camera or a phone, loyalty tiers, promotions and gift cards, and a till report that closes the shift — built for a queue that has to keep moving.",
    highlights: [
      "Camera and phone barcode scanning",
      "Loyalty tiers, promotions, gift cards",
      "Till Report-X and shift close",
      "Multi-outlet stock and transfers",
    ],
  },
  {
    slug: "pharmacy",
    dir: "pharmacy-pos-full",
    stable: "ServeSync-Pharmacy-Setup.exe",
    name: "ServeSync Pharmacy",
    tagline: "Pharmacies and medical stores",
    blurb:
      "Batch and expiry tracking, a dispensing ticket, PRA/FBR fiscal reporting and a list-view till that suits a counter where the product is asked for by name rather than picked off a shelf.",
    highlights: [
      "Batch and expiry tracking",
      "Dispensing ticket printing",
      "PRA / FBR fiscal reporting",
      "List-view till for counter service",
    ],
  },
];

/** electron-builder's manifest — the authority on what was actually built. */
async function manifest(dir) {
  const yml = await readFile(join(DL, dir, "dist-desktop", "latest.yml"), "utf8");
  const pick = (key) => {
    const m = new RegExp(`^${key}:\\s*'?([^'\\n\\r]+)'?`, "m").exec(yml);
    if (!m) throw new Error(`${dir}/dist-desktop/latest.yml: no "${key}"`);
    return m[1].trim();
  };
  const size = Number(/size:\s*(\d+)/.exec(yml)?.[1]);
  if (!Number.isFinite(size)) throw new Error(`${dir}: latest.yml has no file size`);
  return { version: pick("version"), releaseDate: pick("releaseDate"), size };
}

/**
 * Find the built installer.
 *
 * Matched on the byte size from the manifest rather than on its filename:
 * electron-builder writes a URL-normalised name into the yml (hyphens) while the
 * file on disk keeps its spaces, so trusting the name finds nothing for two of
 * the three editions.
 */
async function locate(dir, size) {
  const base = join(DL, dir, "dist-desktop");
  for (const file of await readdir(base)) {
    if (!/setup.*\.exe$/i.test(file)) continue;
    const path = join(base, file);
    if ((await stat(path)).size === size) return path;
  }
  throw new Error(`${dir}: no *Setup*.exe in dist-desktop measuring ${size} bytes`);
}

/** Streamed, so a 105 MB installer never lands in memory in one piece. */
function sha256(path) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    createReadStream(path)
      .on("data", (chunk) => hash.update(chunk))
      .on("error", reject)
      .on("end", () => resolve(hash.digest("hex")));
  });
}

const builds = [];
for (const edition of EDITIONS) {
  const { version, releaseDate, size } = await manifest(edition.dir);
  const path = await locate(edition.dir, size);
  const checksum = await sha256(path);

  builds.push({
    slug: edition.slug,
    name: edition.name,
    tagline: edition.tagline,
    blurb: edition.blurb,
    highlights: edition.highlights,
    version,
    bytes: size,
    sha256: checksum,
    releasedAt: new Date(releaseDate).toISOString().slice(0, 10),
    filename: edition.stable,
    href: `${BASE}/${edition.stable}`,
  });

  console.log(
    `✓ ${edition.name.padEnd(22)} v${version.padEnd(8)} ${(size / 1048576).toFixed(1)} MB  ${checksum.slice(0, 16)}…`,
  );
}

const file = `import type { PosBuild } from "@/types";

/**
 * The three ServeSync POS installers. GENERATED — run \`npm run downloads\`.
 *
 * Version, size and release date come from electron-builder's \`latest.yml\`; the
 * SHA-256 is computed from the artefact itself. Do not edit by hand — a figure
 * typed here that disagrees with the file on the server is worse than no figure.
 *
 * The binaries live on \`admin.plutoxtech.com\`, not in this repo: GitHub rejects
 * a blob over 100 MB, and three installers would put 320 MB in git history
 * permanently.
 */
export const posBuilds: PosBuild[] = ${JSON.stringify(builds, null, 2)};
`;

await writeFile(join(process.cwd(), "src", "data", "downloads.ts"), file, "utf8");
console.log(`\n→ src/data/downloads.ts  (${builds.length} builds)`);
