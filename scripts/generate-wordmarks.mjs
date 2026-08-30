/**
 * Product lock-ups for the two platforms that ship no PNG logo art.
 *
 * **ONVEE has a real logo** and this reproduces it rather than inventing one.
 * The mark is the exact geometry from `apps/web/components/brand.tsx` in the
 * ONVEE repo — a route that opens on the right and closes into an O, ending in a
 * filled arrival node, reading sender → traveller → destination — set beside the
 * wordmark at the same proportions the product's own `Wordmark` component uses
 * (mark at size S, text at 0.56S, a gap of 8px at S=28). Colours are its tokens:
 * `--color-brand-400` #f5c542 for the mark, `--color-ink-900` #111111 for the
 * text, which is the light-surface pairing, and the plate these sit on is white.
 *
 * **Plutox ID has none**, so it gets a typographic lock-up in the house violet.
 * That one is a placeholder and says so; drop a PNG into `assets/product-logos`
 * and add it to `generate-product-logos.mjs` to replace it.
 *
 * The wordmark uses `textLength` with `lengthAdjust="spacing"`, so the glyphs
 * keep their shapes while the tracking stretches to exactly the width the
 * viewBox reserves. That makes the output independent of which font the renderer
 * actually has — without it, a missing Space Grotesk would leave the lock-up
 * either overflowing its box or floating in dead space.
 *
 * Run with:  npm run wordmarks
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images", "products");

/** Mark height, and therefore the lock-up's height. Everything else derives. */
const S = 160;

/* ONVEE's own ratios, read off its Wordmark component. */
const TEXT_RATIO = 0.56; // font-size = S * 0.56
const GAP_RATIO = 8 / 28; // gap-2 at the component's default size
/**
 * Width of "ONVEE" as bold uppercase at 0.16em tracking: five glyphs at ~0.68em
 * plus four letter-spaces. Used as `textLength`, so it is a reservation rather
 * than an estimate that could be wrong.
 */
const TEXT_WIDTH_EM = 5 * 0.68 + 4 * 0.16;

/** The ONVEE mark, in its native 32-unit box. */
function onveeMark(x, size, colour) {
  const scale = size / 32;
  return `<g transform="translate(${x} 0) scale(${scale})">
    <path d="M21.7 24.2A10 10 0 1 1 25.4 12.6" fill="none" stroke="${colour}" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="25.4" cy="12.6" r="3.6" fill="${colour}"/>
  </g>`;
}

/*
  The mark's ink inside its 32-unit box, derived from the same constants the
  ONVEE repo's own icon generator uses (centre 16, radius 10, stroke 3.4, arc
  55°→340°, node at 25.4/12.6 r3.6).

  The arc sweeps through the bottom, left and top — the gap is on the right — so
  its extremes are x=6 at 180°, y=6 at 270°, y=26 at 90°, and on the right it
  stops at its own endpoints. Half the stroke plus the round cap extends each by
  1.7, and the node reaches x=29.

  This matters because the box carries ~4 units of safe-area padding on every
  side. Left in, `object-contain` would scale the *padding* to the plate's height
  and render the mark visibly smaller than the other products' logos, which are
  trimmed to their ink by `generate-product-logos.mjs`. Trimming the viewBox to
  the ink puts ONVEE on the same footing without touching any proportion.
*/
const MARK_INK = { x0: 4.3, y0: 4.3, x1: 29.0, y1: 27.7 };

function onveeLockup() {
  const fontSize = S * TEXT_RATIO;
  const gap = S * GAP_RATIO;
  const textWidth = TEXT_WIDTH_EM * fontSize;
  const textX = S + gap;
  // Cap-centred on the mark, which is what `items-center` gives in the original.
  const baseline = S / 2 + fontSize * 0.36;

  const scale = S / 32;
  const ink = {
    x0: MARK_INK.x0 * scale,
    y0: MARK_INK.y0 * scale,
    x1: textX + textWidth,
    // All-caps, so there are no descenders below the baseline.
    y1: Math.max(MARK_INK.y1 * scale, baseline),
  };
  // Cap height for a bold geometric sans is ~0.72em.
  ink.y0 = Math.min(ink.y0, baseline - fontSize * 0.72);

  const vbW = +(ink.x1 - ink.x0).toFixed(1);
  const vbH = +(ink.y1 - ink.y0).toFixed(1);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ink.x0.toFixed(1)} ${ink.y0.toFixed(1)} ${vbW} ${vbH}" width="${vbW}" height="${vbH}" role="img" aria-label="ONVEE">
  ${onveeMark(0, S, "#F5C542")}
  <text x="${textX.toFixed(1)}" y="${baseline.toFixed(1)}" textLength="${textWidth.toFixed(1)}" lengthAdjust="spacing"
        fill="#111111" font-family="'Space Grotesk','Inter',system-ui,sans-serif"
        font-size="${fontSize.toFixed(1)}" font-weight="700">ONVEE</text>
</svg>
`;
}

/** Placeholder lock-up: the product name, set, with a rule under it. */
function typographicLockup({ name, accent, tracking }) {
  const fontSize = 120;
  const advance = 0.62;
  const textWidth = name.length * fontSize * advance + (name.length - 1) * tracking;
  const padX = 48;
  const width = Math.round(textWidth + padX * 2);
  const height = 240;
  const baseline = 150;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${name}">
  <text x="${width / 2}" y="${baseline}" fill="${accent}"
        font-family="'Space Grotesk','Inter',system-ui,sans-serif"
        font-size="${fontSize}" font-weight="700"
        letter-spacing="${tracking}" text-anchor="middle">${name}</text>
  <rect x="${padX}" y="${baseline + 34}" width="${width - padX * 2}" height="4" rx="2" fill="${accent}" opacity="0.35"/>
</svg>
`;
}

const FILES = [
  { file: "onvee-logo.svg", svg: onveeLockup(), note: "real mark + wordmark" },
  {
    file: "indux-logo.svg",
    svg: typographicLockup({ name: "INDUX", accent: "#0F766E", tracking: 8 }),
    note: "placeholder — no art in repo",
  },
  {
    file: "plutox-id-logo.svg",
    svg: typographicLockup({ name: "PLUTOX ID", accent: "#8B5CF6", tracking: 5 }),
    note: "placeholder — no art in repo",
  },
];

for (const { file, svg, note } of FILES) {
  await writeFile(join(OUT, file), svg, "utf8");
  console.log(`✓ ${file.padEnd(22)} ${String(svg.length).padStart(4)} bytes  (${note})`);
}
