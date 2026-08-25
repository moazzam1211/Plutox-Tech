/**
 * Product logo preparation.
 *
 * The supplied product logos arrive at wildly different sizes — some are
 * 4800×4800 squares with the wordmark floating in a sea of empty space, others
 * are already tight 600×111 strips. Dropped straight into a layout they would
 * render at unrelated optical sizes.
 *
 * This trims each one to its actual ink and normalises the height, so the four
 * cards present their logos at a consistent visual weight. The artwork itself is
 * untouched — only the surrounding empty margin is removed.
 *
 * Sources live in `_src/`; the trimmed results are what the app references.
 *
 * Run with:  npm run product-logos
 */
import { readdir } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const DIR = join(process.cwd(), "public", "images", "products");
const SRC = join(DIR, "_src");

/** Target cap height for every trimmed wordmark, in pixels. */
const TARGET_HEIGHT = 240;

const LOGOS = [
  { src: "servesync.png", out: "servesync-logo.webp" },
  { src: "staysync.png", out: "staysync-logo.webp" },
  // Fleet Flow ships a stacked lock-up rather than a horizontal wordmark, so it
  // is trimmed to a taller target and rendered larger on the page.
  { src: "fleetflow.png", out: "fleetflow-logo.webp", height: 420 },
];

async function prepare({ src, out, height = TARGET_HEIGHT }) {
  const inputPath = join(SRC, src);
  const outputPath = join(DIR, out);

  const before = await sharp(inputPath).metadata();

  await sharp(inputPath)
    // `trim` removes uniform border area. A threshold of 10 catches near-white
    // and near-transparent margins, not just pixel-perfect ones.
    .trim({ threshold: 10 })
    // Scale to a common height; width follows the logo's own proportions.
    .resize({ height, fit: "inside", withoutEnlargement: false })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const after = await sharp(outputPath).metadata();
  console.log(
    `✓ ${out.padEnd(22)} ${before.width}×${before.height} → ${after.width}×${after.height}`,
  );
}

async function main() {
  const available = await readdir(SRC);
  const missing = LOGOS.filter((l) => !available.includes(l.src));
  if (missing.length) {
    console.warn(`! missing sources: ${missing.map((m) => m.src).join(", ")}`);
  }

  for (const logo of LOGOS.filter((l) => available.includes(l.src))) {
    await prepare(logo);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
