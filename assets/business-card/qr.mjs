/**
 * The styled Plutox QR, in one place.
 *
 * Both the business card and the standalone QR files render from this, so the
 * code on the card and the code in the PNG can never drift apart.
 *
 * Style: round ink dots for data, rounded rings for the three finder eyes, and
 * the brand mark (`plutox/8.png`, background keyed out) knocked into the centre
 * on a paper plate. The plate keeps the mark clear of the data dots so the centre
 * reads as a logo rather than a smudge.
 *
 * Error correction is H, recovering 30% of the code. The centre knockout removes
 * 7×7 of 33×33 modules, about 4.5% of the area, which is well inside that. That
 * is the whole reason a logo can sit there at all.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import QRCode from "../../../restaurant-pos-full/node_modules/qrcode/lib/index.js";
import sharp from "sharp";

const HERE = dirname(fileURLToPath(import.meta.url));

export const INK = "#1a1a1a";
export const VIOLET = "#8b5cf6";
export const PAPER = "#f3ffff";

/*
  The QR is inverted: light modules on an ink ground.

  #f2ffff cannot sit on the card's #f3ffff paper — they differ by 1 in a single
  channel, so the code would be invisible. Light modules need a dark ground, so
  the SVG carries its own ink background instead of borrowing the card's.

  Contrast lands at ~17:1, far past anything a scanner needs. The real cost is
  elsewhere: an inverted QR is less universally readable than dark-on-light.
  Phone cameras handle it; some older and industrial scanners assume dark modules
  and fail outright. That is why the unstyled fallback stays dark-on-light.
*/
export const QR_MODULE = "#f2ffff";
export const QR_GROUND = INK;

/** Modules of quiet zone. The spec asks for 4; less risks a miss. */
const QUIET = 4;
/** Side of the centre knockout, in modules. */
const LOGO = 7;

/**
 * The mark from `plutox/8.png`, with its background keyed out.
 *
 * 8.png is the mark in ink on the brand's paper canvas — the background samples
 * at exactly rgb(243,255,255), which is #f3ffff. Keying it out leaves ink
 * artwork on transparency, so inside the QR the mark is the same colour as the
 * data dots and reads as part of the code rather than a sticker on top of it.
 *
 * Two details that separate a clean key from a dirty one:
 *
 *   - Alpha ramps between two thresholds instead of switching at one. A hard
 *     cutoff leaves the anti-aliased edge either jagged or fringed.
 *   - Edge pixels are un-premultiplied: the observed colour is fg·a + bg·(1−a),
 *     so recovering fg needs the bg contribution removed. Skip this and every
 *     soft edge keeps a pale halo that shows up against dark paper.
 */
export async function markDataUri(px = 420, tint = null) {
  const BG = [243, 255, 255];
  const T0 = 14;   // at or below this distance from the background → transparent
  const T1 = 64;   // at or above → fully opaque

  const { data, info } = await sharp(join(HERE, "_src-8.png"))
    .trim({ threshold: 12 })
    .resize(px, px, { fit: "contain", background: { r: BG[0], g: BG[1], b: BG[2], alpha: 1 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const dist = Math.max(Math.abs(r - BG[0]), Math.abs(g - BG[1]), Math.abs(b - BG[2]));
    const a = Math.min(1, Math.max(0, (dist - T0) / (T1 - T0)));

    if (a <= 0) { out[i] = out[i+1] = out[i+2] = out[i+3] = 0; continue; }

    if (tint) {
      /*
        Recolour the artwork but keep its alpha. 8.png is ink artwork, and on an
        ink QR ground it would vanish — the mark has to carry the module colour.
        Alpha still comes from the key, so this is the real shape rather than a
        blocky silhouette.
      */
      out[i] = tint[0];
      out[i + 1] = tint[1];
      out[i + 2] = tint[2];
    } else {
      // Un-premultiply against the known background.
      const un = (c, bg) => Math.round(Math.min(255, Math.max(0, (c - bg * (1 - a)) / a)));
      out[i] = un(r, BG[0]);
      out[i + 1] = un(g, BG[1]);
      out[i + 2] = un(b, BG[2]);
    }
    out[i + 3] = Math.round(a * 255);
  }

  const buf = await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
  return `data:image/png;base64,${buf.toString("base64")}`;
}

/**
 * Build the styled QR as an SVG string, plus the numbers needed to verify it.
 *
 * `scale` only sets the SVG's `width`/`height` attributes; the geometry is in
 * module units, so it stays resolution-independent either way.
 */
export async function styledQr(target, { scale = 0, withMark = true } = {}) {
  const matrix = QRCode.create(target, { errorCorrectionLevel: "H" }).modules;
  const n = matrix.size;
  const dark = (x, y) => Boolean(matrix.data[y * n + x]);

  const finders = [
    [0, 0],
    [n - 7, 0],
    [0, n - 7],
  ];
  const inFinder = (x, y) =>
    finders.some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);

  const lo = Math.floor((n - LOGO) / 2);
  const inLogo = (x, y) =>
    withMark && x >= lo && x < lo + LOGO && y >= lo && y < lo + LOGO;

  const total = n + QUIET * 2;
  const parts = [];

  for (const [fx, fy] of finders) {
    const x = fx + QUIET;
    const y = fy + QUIET;
    parts.push(
      `<rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" rx="1.9" fill="none" stroke="${QR_MODULE}" stroke-width="1"/>`,
      `<rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx="1" fill="${QR_MODULE}"/>`,
    );
  }

  // Dots at r=0.41 — 82% of a module. Smaller and a scanner's binarisation
  // starts dropping them once the card is printed small.
  let dots = 0;
  for (let y = 0; y < n; y += 1) {
    for (let x = 0; x < n; x += 1) {
      if (!dark(x, y) || inFinder(x, y) || inLogo(x, y)) continue;
      parts.push(`<circle cx="${x + QUIET + 0.5}" cy="${y + QUIET + 0.5}" r="0.41" fill="${QR_MODULE}"/>`);
      dots += 1;
    }
  }

  let darkInLogo = 0;
  if (withMark) {
    const c = lo + QUIET;
    const uri = await markDataUri(420, [242, 255, 255]);
    const inset = 0.55;
    parts.push(
      // An ink well, so the mark never touches the nearest data dots.
      `<rect x="${c - 0.45}" y="${c - 0.45}" width="${LOGO + 0.9}" height="${LOGO + 0.9}" rx="1.7" fill="${QR_GROUND}"/>`,
      `<clipPath id="markClip"><rect x="${c + inset}" y="${c + inset}" width="${LOGO - inset * 2}" height="${LOGO - inset * 2}" rx="1.25"/></clipPath>`,
      `<image href="${uri}" x="${c + inset}" y="${c + inset}" width="${LOGO - inset * 2}" height="${LOGO - inset * 2}" clip-path="url(#markClip)" preserveAspectRatio="xMidYMid slice"/>`,
    );
    for (let y = lo; y < lo + LOGO; y += 1)
      for (let x = lo; x < lo + LOGO; x += 1) if (dark(x, y)) darkInLogo += 1;
  }

  const size = scale ? ` width="${total * scale}" height="${total * scale}"` : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}"${size} role="img" aria-label="Scan to book a free demo at plutoxtech.com/demo">
<rect width="${total}" height="${total}" rx="2.5" fill="${QR_GROUND}"/>
${parts.join("\n")}
</svg>
`;

  /* ---- structural self-check ---- */
  let totalDark = 0;
  let darkInFinder = 0;
  for (let y = 0; y < n; y += 1)
    for (let x = 0; x < n; x += 1) {
      if (!dark(x, y)) continue;
      totalDark += 1;
      if (inFinder(x, y)) darkInFinder += 1;
    }

  const obscuredPct = withMark ? ((LOGO * LOGO) / (n * n)) * 100 : 0;

  return {
    svg,
    report: {
      target,
      grid: `${n}×${n}, EC H`,
      darkModules: totalDark,
      rendered: { dots, insideFinders: darkInFinder, knockedOut: darkInLogo },
      // Every dark module is drawn as a dot, covered by a finder shape, or
      // deliberately removed under the mark. If this is false, something is lost.
      allAccountedFor: dots + darkInFinder + darkInLogo === totalDark,
      areaObscured: `${obscuredPct.toFixed(1)}% (EC H recovers 30%)`,
      withinEcBudget: obscuredPct < 30,
    },
  };
}
