/**
 * Placeholder asset generator.
 *
 * Writes every dummy image the site references as an SVG into `public/images`.
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
/* Product mockups — abstract dashboard UI                            */
/* ------------------------------------------------------------------ */
function productMockup({ id, title, category, from, to, seed }) {
  const random = makeRandom(seed);
  const W = 1200;
  const H = 750;

  // Abstract bar chart.
  const bars = Array.from({ length: 14 }, (_, i) => {
    const height = 40 + Math.round(random() * 170);
    const x = 128 + i * 46;
    return `<rect x="${x}" y="${520 - height}" width="26" height="${height}" rx="6" fill="url(#g-${id})" opacity="${(0.35 + random() * 0.6).toFixed(2)}"/>`;
  }).join("\n    ");

  // Abstract list rows.
  const rows = Array.from({ length: 4 }, (_, i) => {
    const y = 566 + i * 42;
    const width = 220 + Math.round(random() * 300);
    return `<rect x="128" y="${y}" width="${width}" height="14" rx="7" fill="#ffffff" opacity="${(0.1 - i * 0.015).toFixed(3)}"/>
    <rect x="${W - 200}" y="${y}" width="72" height="14" rx="7" fill="url(#g-${id})" opacity="0.5"/>`;
  }).join("\n    ");

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${title} — ${category} interface preview">
  ${defs(id, from, to)}
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <rect width="${W}" height="${H}" fill="url(#grid-${id})"/>
  <ellipse cx="${W * 0.78}" cy="90" rx="380" ry="260" fill="url(#glow-${id})"/>
  <ellipse cx="90" cy="${H - 60}" rx="300" ry="220" fill="url(#glow-${id})" opacity="0.6"/>

  <!-- window chrome -->
  <rect x="64" y="56" width="${W - 128}" height="${H - 120}" rx="24" fill="#212121" fill-opacity="0.72" stroke="#ffffff" stroke-opacity="0.09"/>
  <line x1="64" y1="118" x2="${W - 64}" y2="118" stroke="#ffffff" stroke-opacity="0.07"/>
  <circle cx="100" cy="87" r="6" fill="#ff5f57"/>
  <circle cx="122" cy="87" r="6" fill="#febc2e"/>
  <circle cx="144" cy="87" r="6" fill="#28c840"/>

  <!-- sidebar rail -->
  <rect x="64" y="118" width="52" height="${H - 182}" fill="#ffffff" fill-opacity="0.02"/>
  ${Array.from({ length: 6 }, (_, i) => `<rect x="76" y="${150 + i * 42}" width="28" height="28" rx="8" fill="${i === 0 ? `url(#g-${id})` : "#ffffff"}" opacity="${i === 0 ? 0.85 : 0.1}"/>`).join("\n  ")}

  <!-- title block -->
  <text x="128" y="176" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="600" letter-spacing="3" fill="${to}" opacity="0.85">${category.toUpperCase()}</text>
  <text x="128" y="230" font-family="Inter, system-ui, sans-serif" font-size="46" font-weight="700" fill="#f3ffff">${title}</text>

  <!-- KPI tiles -->
  ${Array.from({ length: 3 }, (_, i) => {
    const x = 128 + i * 224;
    return `<rect x="${x}" y="262" width="200" height="86" rx="14" fill="#ffffff" fill-opacity="0.035" stroke="#ffffff" stroke-opacity="0.07"/>
  <rect x="${x + 18}" y="284" width="${60 + i * 14}" height="10" rx="5" fill="#ffffff" opacity="0.16"/>
  <rect x="${x + 18}" y="306" width="${96 - i * 10}" height="18" rx="9" fill="url(#g-${id})" opacity="0.8"/>`;
  }).join("\n  ")}

  <!-- chart -->
  <rect x="104" y="372" width="${W - 208}" height="176" rx="16" fill="#ffffff" fill-opacity="0.025" stroke="#ffffff" stroke-opacity="0.06"/>
  ${bars}
  <line x1="128" y1="520" x2="${W - 128}" y2="520" stroke="#ffffff" stroke-opacity="0.12"/>

  <!-- rows -->
  ${rows}
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Portfolio thumbnails — abstract geometric compositions             */
/* ------------------------------------------------------------------ */
function portfolioThumb({ id, title, category, from, to, seed }) {
  const random = makeRandom(seed);
  const W = 1200;
  const H = 800;

  const shapes = Array.from({ length: 7 }, (_, i) => {
    const cx = 140 + random() * (W - 280);
    const cy = 140 + random() * (H - 280);
    const size = 60 + random() * 190;
    const opacity = (0.06 + random() * 0.16).toFixed(3);
    if (i % 3 === 0) {
      return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(size / 2).toFixed(0)}" fill="none" stroke="url(#g-${id})" stroke-width="1.5" opacity="${opacity}"/>`;
    }
    if (i % 3 === 1) {
      return `<rect x="${cx.toFixed(0)}" y="${cy.toFixed(0)}" width="${size.toFixed(0)}" height="${size.toFixed(0)}" rx="20" fill="url(#g-${id})" opacity="${opacity}" transform="rotate(${(random() * 40 - 20).toFixed(1)} ${cx.toFixed(0)} ${cy.toFixed(0)})"/>`;
    }
    return `<path d="M${cx.toFixed(0)} ${cy.toFixed(0)} l${size.toFixed(0)} 0 l${(-size / 2).toFixed(0)} ${size.toFixed(0)} Z" fill="none" stroke="url(#g-${id})" stroke-width="1.5" opacity="${opacity}"/>`;
  }).join("\n  ");

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${title} — ${category} case study">
  ${defs(id, from, to)}
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <rect width="${W}" height="${H}" fill="url(#grid-${id})"/>
  <ellipse cx="${W * 0.24}" cy="${H * 0.22}" rx="420" ry="320" fill="url(#glow-${id})"/>
  <ellipse cx="${W * 0.82}" cy="${H * 0.84}" rx="380" ry="300" fill="url(#glow-${id})" opacity="0.55"/>
  ${shapes}

  <!-- central plate -->
  <rect x="${W / 2 - 300}" y="${H / 2 - 130}" width="600" height="260" rx="28" fill="#212121" fill-opacity="0.55" stroke="#ffffff" stroke-opacity="0.1"/>
  <text x="${W / 2}" y="${H / 2 - 56}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="600" letter-spacing="4" fill="${to}" opacity="0.9">${category.toUpperCase()}</text>
  <text x="${W / 2}" y="${H / 2 + 10}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="42" font-weight="700" fill="#f3ffff">${title}</text>
  <rect x="${W / 2 - 40}" y="${H / 2 + 52}" width="80" height="4" rx="2" fill="url(#g-${id})"/>
  <text x="${W / 2}" y="${H / 2 + 98}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="500" letter-spacing="2" fill="#a0a6a6">PLUTOX TECH</text>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Blog covers                                                        */
/* ------------------------------------------------------------------ */
function blogCover({ id, label, from, to, seed }) {
  const random = makeRandom(seed);
  const W = 1200;
  const H = 675;

  // Flowing polyline, like a metric trend.
  const points = Array.from({ length: 12 }, (_, i) => {
    const x = 80 + i * ((W - 160) / 11);
    const y = H * 0.72 - random() * (H * 0.36);
    return `${x.toFixed(0)},${y.toFixed(0)}`;
  }).join(" ");

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label} article cover">
  ${defs(id, from, to)}
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <rect width="${W}" height="${H}" fill="url(#grid-${id})"/>
  <ellipse cx="${W * 0.7}" cy="${H * 0.18}" rx="400" ry="280" fill="url(#glow-${id})"/>
  <polyline points="${points}" fill="none" stroke="url(#g-${id})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
  ${points
    .split(" ")
    .map((p) => {
      const [x, y] = p.split(",");
      return `<circle cx="${x}" cy="${y}" r="4.5" fill="${to}" opacity="0.9"/>`;
    })
    .join("\n  ")}
  <text x="80" y="${H * 0.24}" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="600" letter-spacing="4" fill="${to}">${label.toUpperCase()}</text>
  <text x="80" y="${H * 0.24 + 58}" font-family="Inter, system-ui, sans-serif" font-size="40" font-weight="700" fill="#f3ffff">Plutox Engineering</text>
</svg>`;
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
const PRODUCTS = [
  { id: "servesync", title: "ServeSync POS", category: "Restaurant", from: VIOLET, to: VIOLET_DEEP, seed: 11 },
  { id: "pharmasync", title: "PharmaSync POS", category: "Pharmacy", from: INK, to: VIOLET, seed: 22 },
  { id: "vendeez", title: "Vendeez POS", category: "Mart & Retail", from: VIOLET_DEEP, to: INK, seed: 33 },
  { id: "staysync", title: "StaySync", category: "Hospitality", from: VIOLET, to: INK, seed: 44 },
];

const PORTFOLIO = [
  { id: "servesync-rollout", title: "ServeSync Rollout", category: "POS Systems", from: VIOLET, to: VIOLET_DEEP, seed: 101 },
  { id: "vendeez-chain", title: "Vendeez Chain", category: "POS Systems", from: VIOLET_DEEP, to: VIOLET, seed: 102 },
  { id: "pharmasync-network", title: "PharmaSync Network", category: "Healthcare", from: INK, to: VIOLET, seed: 103 },
  { id: "staysync-pms", title: "StaySync PMS", category: "Hospitality", from: VIOLET, to: INK, seed: 104 },
  { id: "field-crm", title: "Field Sales CRM", category: "ERP & CRM", from: VIOLET_DEEP, to: INK, seed: 106 },
  { id: "clinic-platform", title: "Clinic Platform", category: "Web Platforms", from: VIOLET, to: VIOLET_DEEP, seed: 107 },
  { id: "courier-app", title: "Courier App", category: "Mobile Apps", from: VIOLET_DEEP, to: VIOLET, seed: 108 },
  { id: "forecasting-engine", title: "Forecasting Engine", category: "AI & Automation", from: INK, to: VIOLET_DEEP, seed: 109 },
  { id: "invoice-ai", title: "Invoice Intelligence", category: "AI & Automation", from: VIOLET, to: INK, seed: 110 },
  { id: "banquet-suite", title: "Banquet Suite", category: "Hospitality", from: INK, to: VIOLET, seed: 111 },
  { id: "franchise-portal", title: "Franchise Portal", category: "Web Platforms", from: VIOLET_DEEP, to: INK, seed: 112 },
];

const BLOG = [
  { id: "offline-first", label: "Engineering", from: VIOLET, to: VIOLET_DEEP, seed: 201 },
  { id: "erp-decision", label: "Strategy", from: INK, to: VIOLET, seed: 202 },
  { id: "ai-forecasting", label: "AI & Data", from: VIOLET_DEEP, to: INK, seed: 203 },
  { id: "web-vitals", label: "Performance", from: VIOLET, to: INK, seed: 204 },
];

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
    ...PORTFOLIO.map((p) => write(`portfolio/${p.id}.svg`, portfolioThumb(p))),
    ...BLOG.map((b) => write(`blog/${b.id}.svg`, blogCover(b))),
    ...AVATARS.map((a, i) =>
      write(
        `avatars/avatar-0${i + 1}.svg`,
        avatar({ id: `av${i}`, ...a }),
      ),
    ),
    write("team/founder.svg", founderPortrait()),
    write("misc/map-lahore.svg", mapPlaceholder()),
  ]);

  const total =
    PORTFOLIO.length + BLOG.length + AVATARS.length + 2;
  console.log(`Generated ${total} placeholder assets in public/images.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
