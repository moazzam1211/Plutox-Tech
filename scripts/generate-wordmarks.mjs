/**
 * Typographic wordmarks for products that ship no logo art.
 *
 * ONVEE and Plutox ID have no logo files in their repositories. The product
 * cards need *something*, and the two dishonest options are inventing a mark
 * they do not have or leaving a broken image — so this draws the product's own
 * name, set in the same display face the site uses, in its own accent colour.
 * It reads as a deliberate typographic lock-up rather than a missing asset, and
 * it is replaced the moment real art exists: drop a PNG into
 * `assets/product-logos` and add it to `generate-product-logos.mjs`.
 *
 * SVG rather than raster: a few hundred bytes, crisp at any density, and the
 * accent colour stays editable.
 *
 * Run with:  node scripts/generate-wordmarks.mjs
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images", "products");

/**
 * `weightless` letter-spacing and a hairline rule under the name, so the mark
 * has some structure instead of being bare text floating on the plate.
 */
const WORDMARKS = [
  {
    file: "onvee-logo.svg",
    name: "ONVEE",
    accent: "#E5B02C",
    tracking: 8,
    // Set wider than the others: five capitals with room to breathe reads as a
    // logotype, whereas tight capitals read as a heading.
    weight: 700,
  },
  {
    file: "plutox-id-logo.svg",
    name: "PLUTOX ID",
    accent: "#8B5CF6",
    tracking: 5,
    weight: 700,
  },
];

/** Rough advance width per character at 1em, enough to size the viewBox. */
const ADVANCE = 0.62;

function wordmarkSvg({ name, accent, tracking, weight }) {
  const fontSize = 120;
  const textWidth = name.length * fontSize * ADVANCE + (name.length - 1) * tracking;
  const padX = 48;
  const width = Math.round(textWidth + padX * 2);
  const height = 240;
  const baseline = 150;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${name}">
  <text x="${width / 2}" y="${baseline}" fill="${accent}"
        font-family="'Space Grotesk','Inter',system-ui,sans-serif"
        font-size="${fontSize}" font-weight="${weight}"
        letter-spacing="${tracking}" text-anchor="middle">${name}</text>
  <rect x="${padX}" y="${baseline + 34}" width="${width - padX * 2}" height="4" rx="2" fill="${accent}" opacity="0.35"/>
</svg>
`;
}

for (const mark of WORDMARKS) {
  const svg = wordmarkSvg(mark);
  await writeFile(join(OUT, mark.file), svg, "utf8");
  console.log(`✓ ${mark.file.padEnd(24)} ${mark.name}  ${svg.length} bytes`);
}
