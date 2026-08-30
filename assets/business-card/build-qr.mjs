/**
 * Standalone QR files for plutoxtech.com/demo.
 *
 *   plutox-demo-qr.svg        styled — ink dots, rounded eyes, the mark centred.
 *                             Vector, so it is resolution-independent for print.
 *   plutox-demo-qr.png        the same at 1200px, for anywhere that will not take
 *                             an SVG (Instagram, Word, a print shop's template).
 *   plutox-demo-qr-plain.svg  unstyled. The safe fallback — guaranteed readable
 *                             by construction, for signage or a scanner that
 *                             struggles with the styled one.
 *
 * Geometry and error-correction headroom are verified here. Whether a phone
 * camera reads it is not something this script can prove, so test the styled one
 * before printing at volume.
 *
 * Run with:  node assets/business-card/build-qr.mjs
 */
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import QRCode from "../../../restaurant-pos-full/node_modules/qrcode/lib/index.js";
import sharp from "sharp";

import { INK, PAPER, styledQr } from "./qr.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const TARGET = "https://plutoxtech.com/demo";

const { svg, report } = await styledQr(TARGET, { scale: 16 });

await writeFile(join(HERE, "plutox-demo-qr.svg"), svg, "utf8");
await sharp(Buffer.from(svg)).resize(1200, 1200).png().toFile(join(HERE, "plutox-demo-qr.png"));

const plain = await QRCode.toString(TARGET, {
  type: "svg",
  margin: 4,
  errorCorrectionLevel: "H",
  color: { dark: INK, light: PAPER },
});
await writeFile(join(HERE, "plutox-demo-qr-plain.svg"), plain, "utf8");

console.log(report);
console.log(`
✓ plutox-demo-qr.svg        styled, vector
✓ plutox-demo-qr.png        styled, 1200×1200
✓ plutox-demo-qr-plain.svg  unstyled fallback

Scan it with a phone before printing at volume — the structure is verified above,
but only a camera proves a scan.`);
