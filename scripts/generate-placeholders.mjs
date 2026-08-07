/**
 * Placeholder asset generator.
 *
 * Writes the review avatars, the founder fallback portrait and the contact-page
 * map as SVGs into `public/images` — the only placeholder art the site still
 * uses. Product imagery is no longer generated: /projects shows real
 * screenshots captured from the running applications.
 * SVGs are used deliberately instead of stock JPEGs: they are a fraction of the
 * weight, stay crisp at any density, and can carry the brand gradient — so the
 * placeholders look intentional rather than like missing assets.
 *
 * Run with:  node scripts/generate-placeholders.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ROOT = join(process.cwd(), "public", "images");

// Palette taken from the brand lock-up: the wordmark violet and the mark's ink.
const VIOLET = "#8b5cf6";
const VIOLET_DEEP = "#6d28d9";
const INK = "#1a1a1a";
const PAPER = "#f3ffff";

/** Deterministic PRNG so re-running the script produces identical files. */
function makeRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

async function write(relativePath, contents) {
  const target = join(ROOT, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents.trim() + "\n", "utf8");
}

/** Shared <defs>: brand gradient, background wash, grid pattern, soft blur. */
function defs(id, from, to) {
  return `
  <defs>
    <linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0%" stop-color="#242424"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </linearGradient>
    <radialGradient id="glow-${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${from}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${from}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid-${id}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
  </defs>`;
}

/* ------------------------------------------------------------------ */
/* Avatars — gradient monograms                                       */
/* ------------------------------------------------------------------ */
function avatar({ id, initials, from, to }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160" role="img" aria-label="${initials} portrait placeholder">
  <defs>
    <linearGradient id="a-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="160" height="160" rx="80" fill="url(#a-${id})"/>
  <rect width="160" height="160" rx="80" fill="#1a1a1a" fill-opacity="0.25"/>
  <text x="80" y="80" text-anchor="middle" dominant-baseline="central" font-family="Inter, system-ui, sans-serif" font-size="58" font-weight="600" fill="#f3ffff" letter-spacing="1">${initials}</text>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Map placeholder                                                    */
/* ------------------------------------------------------------------ */
/* The brand mark is NOT generated here — the supplied artwork is used   */
/* verbatim from public/images/brand/. See that folder's README.         */
function mapPlaceholder() {
  const W = 1200;
  const H = 700;
  const random = makeRandom(99);

  // Abstract street grid.
  const roads = [];
  for (let i = 0; i < 14; i += 1) {
    const y = 40 + i * 48 + random() * 12;
    roads.push(
      `<line x1="0" y1="${y.toFixed(0)}" x2="${W}" y2="${(y + random() * 20 - 10).toFixed(0)}" stroke="#ffffff" stroke-opacity="0.05" stroke-width="${(1 + random() * 2).toFixed(1)}"/>`,
    );
  }
  for (let i = 0; i < 18; i += 1) {
    const x = 30 + i * 66 + random() * 16;
    roads.push(
      `<line x1="${x.toFixed(0)}" y1="0" x2="${(x + random() * 24 - 12).toFixed(0)}" y2="${H}" stroke="#ffffff" stroke-opacity="0.05" stroke-width="${(1 + random() * 2).toFixed(1)}"/>`,
    );
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Map showing the Plutox Tech office in Lahore, Pakistan">
  ${defs("map", VIOLET, VIOLET_DEEP)}
  <rect width="${W}" height="${H}" fill="#151515"/>
  ${roads.join("\n  ")}
  <!-- arterial route -->
  <path d="M0 470 C 240 430, 380 300, 620 330 S 980 250, ${W} 300" fill="none" stroke="url(#g-map)" stroke-width="5" opacity="0.35"/>
  <!-- water -->
  <path d="M0 620 C 220 590, 420 640, ${W} 590 L ${W} ${H} L 0 ${H} Z" fill="${VIOLET}" fill-opacity="0.07"/>
  <!-- pin -->
  <circle cx="${W / 2}" cy="330" r="70" fill="${VIOLET}" fill-opacity="0.12"/>
  <circle cx="${W / 2}" cy="330" r="40" fill="${VIOLET}" fill-opacity="0.2"/>
  <path d="M${W / 2} 296a17 17 0 0 0-17 17c0 12.5 17 33 17 33s17-20.5 17-33a17 17 0 0 0-17-17Z" fill="${VIOLET}"/>
  <circle cx="${W / 2}" cy="313" r="6" fill="#f3ffff"/>
  <text x="${W / 2}" y="400" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="600" fill="#f3ffff">Central Park Housing Scheme</text>
  <text x="${W / 2}" y="428" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="15" fill="#a0a6a6">Ferozepur Road, Lahore, Pakistan</text>
</svg>`;
}


/* ------------------------------------------------------------------ */
/* Founder portrait placeholder                                       */
/* ------------------------------------------------------------------ */
/**
 * Stand-in for the founder photo, sized to the 4:5 frame the profile section
 * uses. Replace by dropping a real photo at `public/images/team/founder.jpg`
 * and updating `photo` in `src/data/founder.ts`.
 */
function founderPortrait() {
  const W = 800;
  const H = 1000;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Founder portrait placeholder">
  <defs>
    <linearGradient id="fp-bg" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="#242424"/>
      <stop offset="100%" stop-color="${INK}"/>
    </linearGradient>
    <radialGradient id="fp-glow" cx="0.5" cy="0.34" r="0.55">
      <stop offset="0%" stop-color="${VIOLET}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="${VIOLET}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#fp-bg)"/>
  <ellipse cx="${W / 2}" cy="${H * 0.36}" rx="330" ry="330" fill="url(#fp-glow)"/>

  <!-- abstract bust silhouette -->
  <circle cx="${W / 2}" cy="${H * 0.36}" r="132" fill="${PAPER}" fill-opacity="0.1"/>
  <path d="M${W / 2 - 232} ${H * 0.86} a232 200 0 0 1 464 0 Z" fill="${PAPER}" fill-opacity="0.1"/>

  <text x="${W / 2}" y="${H * 0.365}" text-anchor="middle" dominant-baseline="central" font-family="Inter, system-ui, sans-serif" font-size="104" font-weight="700" fill="${PAPER}" fill-opacity="0.55">MN</text>

  <text x="${W / 2}" y="${H - 96}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="600" letter-spacing="4" fill="${VIOLET}">FOUNDER</text>
  <text x="${W / 2}" y="${H - 58}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="17" fill="#a0a6a6">Add moazzam-naveed.jpg</text>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Manifest of everything to generate                                 */
/* ------------------------------------------------------------------ */
const AVATARS = [
  { initials: "ZA", from: VIOLET, to: VIOLET_DEEP },
  { initials: "AK", from: INK, to: VIOLET },
  { initials: "BR", from: VIOLET_DEEP, to: INK },
  { initials: "SY", from: VIOLET, to: INK },
  { initials: "IN", from: INK, to: VIOLET_DEEP },
  { initials: "FS", from: VIOLET_DEEP, to: VIOLET },
  { initials: "HT", from: VIOLET, to: VIOLET_DEEP },
  { initials: "NQ", from: INK, to: VIOLET },
];

async function main() {
  await Promise.all([
    ...AVATARS.map((a, i) =>
      write(
        `avatars/avatar-0${i + 1}.svg`,
        avatar({ id: `av${i}`, ...a }),
      ),
    ),
    write("team/founder.svg", founderPortrait()),
    write("misc/map-lahore.svg", mapPlaceholder()),
  ]);

  const total = AVATARS.length + 2;
  console.log(`Generated ${total} placeholder assets in public/images.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
