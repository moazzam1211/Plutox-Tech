/**
 * App-icon generator.
 *
 * Derives the rounded favicon and Apple touch icon from the supplied brand
 * mark. The source artwork in `public/images/brand/` is never modified — this
 * only produces the app-icon variants Next.js picks up from `src/app/`.
 *
 * The mark PNG is a 4800px square with a solid background, so two things are
 * done here:
 *   1. The subject is scaled down slightly and re-padded, giving the icon proper
 *      optical margin instead of the glyph touching the corners at 16px.
 *   2. Corners are rounded by compositing an SVG rounded-rect as an alpha mask,
 *      which makes the corners genuinely transparent rather than painting a
 *      background-coloured arc.
 *
 * Run with:  npm run icons
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE = join(ROOT, "public", "images", "brand", "plutox-mark.png");

/** Background of the supplied light mark — matches the brand paper colour. */
const PAPER = "#f3ffff";

/**
 * Corner radius as a fraction of the icon's width.
 *
 * 22.5% matches the iOS/macOS "squircle" proportion, which is what reads as
 * correctly rounded next to other tab and home-screen icons.
 */
const RADIUS_RATIO = 0.225;

/** Inset the artwork so the glyph isn't flush against the rounded edge. */
const PADDING_RATIO = 0.06;

/**
 * Build one rounded icon.
 *
 * @param {string} outPath  Absolute destination path.
 * @param {number} size     Output edge length in pixels.
 * @param {boolean} rounded Whether to mask the corners transparent.
 */
async function buildIcon(outPath, size, rounded = true) {
  const padding = Math.round(size * PADDING_RATIO);
  const inner = size - padding * 2;

  // Scale the artwork down into the padded box.
  const artwork = await sharp(SOURCE)
    .resize(inner, inner, { fit: "contain", background: PAPER })
    .toBuffer();

  // Flatten onto the paper colour so the whole square is opaque before masking.
  let icon = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: PAPER,
    },
  })
    .composite([{ input: artwork, top: padding, left: padding }])
    .png();

  if (rounded) {
    const radius = Math.round(size * RADIUS_RATIO);
    const mask = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
         <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/>
       </svg>`,
    );

    // `dest-in` keeps the destination only where the mask is opaque, so the
    // corners become fully transparent.
    icon = sharp(await icon.toBuffer())
      .composite([{ input: mask, blend: "dest-in" }])
      .png();
  }

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, await icon.toBuffer());

  const { width, height } = await sharp(outPath).metadata();
  console.log(`✓ ${outPath.replace(ROOT + "\\", "").replace(ROOT + "/", "")}  ${width}×${height}`);
}

async function main() {
  await Promise.all([
    // Browser tab / bookmark icon.
    buildIcon(join(ROOT, "src", "app", "icon.png"), 512),
    // Apple touch icon. Rounded too — iOS masks it again, and a transparent
    // corner is safer than a light square showing through on a dark home screen.
    buildIcon(join(ROOT, "src", "app", "apple-icon.png"), 180),
    // Rounded mark for the PWA manifest and JSON-LD logo.
    buildIcon(join(ROOT, "public", "images", "brand", "plutox-mark-rounded.png"), 512),
  ]);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
