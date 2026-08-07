/**
 * Portrait optimiser.
 *
 * Photographs shipped as PNG are enormous — the supplied 1920×2400 portrait is
 * ~2.9 MB, where the same image as a quality-88 JPEG is roughly a tenth of that
 * with no visible difference. PNG is lossless and therefore the wrong container
 * for a photograph; it only wins on flat graphics like the logo artwork.
 *
 * Drop a new portrait at the source path below and re-run. The 4:5 crop matches
 * the frame the owner page renders, so nothing distorts.
 *
 * Run with:  npm run portrait
 */
import { access, unlink } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const ROOT = process.cwd();

/** Where the raw photo is dropped. Either name works. */
const SOURCES = [
  join(ROOT, "Untitled design.png"),
  join(ROOT, "portrait-source.png"),
  join(ROOT, "portrait-source.jpg"),
];

const OUTPUT = join(ROOT, "public", "images", "team", "moazzam-naveed.jpg");

/** Long edge of the output. The frame is at most ~20rem wide on a 2× display. */
const MAX_HEIGHT = 1400;

async function findSource() {
  for (const candidate of SOURCES) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

async function main() {
  const source = await findSource();

  if (!source) {
    console.warn(
      `! No portrait source found. Drop the photo at one of:\n  ${SOURCES.join("\n  ")}`,
    );
    return;
  }

  const before = await sharp(source).metadata();

  await sharp(source)
    // `cover` on a 4:5 box, so any aspect ratio crops cleanly to the frame
    // rather than letterboxing inside it.
    .resize({
      width: Math.round((MAX_HEIGHT * 4) / 5),
      height: MAX_HEIGHT,
      fit: "cover",
      position: "top",
    })
    .jpeg({ quality: 88, mozjpeg: true, progressive: true })
    .toFile(OUTPUT);

  const after = await sharp(OUTPUT).metadata();
  console.log(
    `✓ portrait  ${before.width}×${before.height} ${before.format} → ${after.width}×${after.height} jpeg`,
  );

  // Remove the raw drop-in so a multi-megabyte PNG doesn't linger in the repo.
  if (source.endsWith("Untitled design.png")) {
    await unlink(source);
    console.log("✓ removed the raw drop-in from the project root");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
