/**
 * Builds a print-ready business card for the founder.
 *
 * Output is one self-contained HTML file — logo and QR embedded as data, fonts
 * with system fallbacks — so it prints identically from any machine and needs no
 * design software. "Print to PDF" from the browser produces the file a printer
 * will accept.
 *
 * Geometry is the part that matters and the part people get wrong:
 *
 *   trim    85 × 55 mm   the finished card (the international/Pakistani standard,
 *                        not the 3.5 × 2 in US size — local printers cut to 85×55)
 *   bleed    3 mm        on every edge, so a 1 mm cutting drift shows ink rather
 *                        than a white sliver
 *   safe     5 mm        inside the trim; nothing readable crosses into it
 *   page    91 × 61 mm   trim + bleed, one card per page
 *
 * Colours come from the site's own tokens so the card matches the website: ink
 * #1a1a1a, violet #8b5cf6, paper #f3ffff.
 *
 * Run with:  node assets/business-card/build-card.mjs
 */
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { INK, PAPER, VIOLET, styledQr } from "./qr.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");

/* ---- The details. Single source, so a change is one edit. ---- */
const CARD = {
  name: "Moazzam Naveed",
  role: "Founder · CEO",
  company: "Plutox Tech",
  tagline: "Smart Software. Smarter Business.",
  pitch: "Software that runs your business.",
  email: "moazzam@plutoxtech.com",
  phone: "+92 344 024 4449",
  site: "plutoxtech.com",
  qrTarget: "https://plutoxtech.com/demo",
  street: "Central Park Housing Scheme",
  street2: "Ferozepur Road, Lahore",
};

async function assets() {
  const { svg, report } = await styledQr(CARD.qrTarget);
  console.log("  QR:", report.grid, "·", report.areaObscured, "· all modules accounted for:", report.allAccountedFor);

  const mark = await sharp(join(ROOT, "public/images/brand/plutox-mark-violet.webp"))
    .resize(320, 320, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  return { qr: svg, mark: `data:image/png;base64,${mark.toString("base64")}` };
}

const html = ({ qr, mark }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Plutox Tech — Business Card · ${CARD.name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  /* ---- Print geometry ---- */
  :root {
    --trim-w: 85mm;  --trim-h: 55mm;
    --bleed: 3mm;    --safe: 5mm;
    --ink: ${INK}; --violet: ${VIOLET}; --paper: ${PAPER};
  }

  @page { size: 91mm 61mm; margin: 0; }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: Inter, system-ui, sans-serif;
    background: #6b7280;
    display: flex; flex-wrap: wrap; gap: 12mm;
    padding: 12mm; justify-content: center; align-items: flex-start;
  }

  /* The page is trim + bleed; the card fills it and the design bleeds to the edge. */
  .card {
    position: relative; overflow: hidden;
    /*
      flex: 0 0 auto is load-bearing, not tidying. As a flex item the card
      shrinks below its declared width on a narrow viewport — it rendered 16mm
      wide instead of 91mm — and a card that squashes on screen prints squashed
      too. A physical object needs a fixed size.
    */
    flex: 0 0 auto;
    width: calc(var(--trim-w) + var(--bleed) * 2);
    height: calc(var(--trim-h) + var(--bleed) * 2);
    padding: calc(var(--bleed) + var(--safe));
    break-inside: avoid; page-break-inside: avoid;
    box-shadow: 0 6mm 18mm -8mm rgb(0 0 0 / 0.55);
  }

  /* ---- FRONT: ink, with the accent doing one job ---- */
  .front { background: var(--ink); color: var(--paper); display: flex; flex-direction: column; }
  /* A single violet arc bleeding off the right edge. One gesture, not a pattern. */
  .front::after {
    content: ""; position: absolute; right: -26mm; top: -20mm;
    width: 62mm; height: 62mm; border-radius: 50%;
    border: 0.9mm solid var(--violet); opacity: 0.5;
  }
  .front::before {
    content: ""; position: absolute; right: -14mm; bottom: -30mm;
    width: 46mm; height: 46mm; border-radius: 50%;
    background: radial-gradient(circle, ${VIOLET}2e, transparent 68%);
  }

  .brandline { display: flex; align-items: center; gap: 2.6mm; position: relative; z-index: 1; }
  .brandline img { width: 7.6mm; height: 7.6mm; display: block; }
  .brandname { font-family: Sora, system-ui, sans-serif; font-weight: 700; font-size: 4.1mm; letter-spacing: -0.02em; }

  .who { margin-top: auto; position: relative; z-index: 1; }
  .who h1 {
    font-family: Sora, system-ui, sans-serif; font-weight: 700;
    font-size: 6.4mm; line-height: 1.05; letter-spacing: -0.03em;
  }
  .who .role {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 2.5mm; letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--violet); margin-top: 1.8mm;
  }
  .rule { width: 13mm; height: 0.5mm; background: var(--violet); margin-top: 3mm; }

  /* ---- BACK: paper, the details, the QR ---- */
  .back { background: var(--paper); color: var(--ink); display: flex; flex-direction: column; }
  .back .pitch {
    font-family: Sora, system-ui, sans-serif; font-weight: 600;
    font-size: 4.2mm; line-height: 1.15; letter-spacing: -0.02em; max-width: 52mm;
  }
  .back .pitch span { color: #6d28d9; }

  .details { margin-top: auto; display: flex; align-items: flex-end; gap: 4mm; }
  .details dl { flex: 1; display: grid; gap: 1.5mm; }
  .row { display: flex; align-items: baseline; gap: 2mm; }
  .row dt {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 2.1mm; letter-spacing: 0.1em; text-transform: uppercase;
    color: #6d28d9; width: 8mm; flex-shrink: 0;
  }
  .row dd { font-size: 2.9mm; line-height: 1.25; }
  .row dd.addr { font-size: 2.5mm; color: #4b5563; }

  /* No plate behind it any more: the modules are ink, so the card's own paper is
     the quiet zone. The 4-module margin is built into the SVG viewBox. */
  .qr { width: 18.5mm; height: 18.5mm; flex-shrink: 0; }
  .qr svg { width: 100%; height: 100%; display: block; }

  /* ---- Screen-only helpers: labels and the trim guide ---- */
  .tag {
    width: 100%; text-align: center; color: #fff; font-size: 3.2mm;
    font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; opacity: 0.85;
  }
  .guide {
    position: absolute; inset: var(--bleed);
    outline: 0.2mm dashed rgb(255 0 0 / 0.55); pointer-events: none; z-index: 5;
  }

  @media print {
    body { background: none; padding: 0; gap: 0; display: block; }
    .card { box-shadow: none; }
    .card + .card { page-break-before: always; }
    .tag, .guide { display: none !important; }
  }
</style>
</head>
<body>

<p class="tag">FRONT — 85 × 55 mm trim · 3 mm bleed · red dashes = cut line (screen only)</p>

<section class="card front">
  <div class="guide"></div>
  <div class="brandline">
    <img src="${mark}" alt="">
    <span class="brandname">${CARD.company}</span>
  </div>
  <div class="who">
    <h1>${CARD.name}</h1>
    <p class="role">${CARD.role}</p>
    <div class="rule"></div>
  </div>
</section>

<p class="tag">BACK</p>

<section class="card back">
  <div class="guide"></div>
  <p class="pitch">Software that runs<br><span>your business.</span></p>
  <div class="details">
    <dl>
      <div class="row"><dt>Call</dt><dd>${CARD.phone}</dd></div>
      <div class="row"><dt>Mail</dt><dd>${CARD.email}</dd></div>
      <div class="row"><dt>Web</dt><dd>${CARD.site}</dd></div>
      <div class="row"><dt>At</dt><dd class="addr">${CARD.street}<br>${CARD.street2}</dd></div>
    </dl>
    <div class="qr" title="${CARD.qrTarget}">${qr}</div>
  </div>
</section>

</body>
</html>
`;

const parts = await assets();
const out = join(HERE, "plutox-business-card.html");
await writeFile(out, html(parts), "utf8");

const { size } = await import("node:fs").then((fs) =>
  fs.promises.stat(out).then((s) => ({ size: s.size })),
);
console.log(`✓ plutox-business-card.html  ${Math.round(size / 1024)} KB  (self-contained)`);
console.log("  Open it, then Print → Save as PDF → paper size 91×61mm, margins none, background graphics ON.");
