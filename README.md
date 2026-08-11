<p align="center">
  <img src="public/images/brand/plutox-lockup.png" alt="Plutox Tech" width="220" />
</p>

<h1 align="center">Plutox Tech — Company Website</h1>

<p align="center">
  <b>Smart Software. Smarter Business.</b><br/>
  The marketing site for Plutox Tech — a founder-led software house in Lahore
  building point-of-sale, ERP, hospitality and logistics platforms.
</p>

<p align="center">
  <img alt="framework" src="https://img.shields.io/badge/Next.js-16-1a1a1a" />
  <img alt="language" src="https://img.shields.io/badge/TypeScript-5-3178C6" />
  <img alt="styling" src="https://img.shields.io/badge/Tailwind-v4-38BDF8" />
  <img alt="theme" src="https://img.shields.io/badge/theme-dark--first%20%C2%B7%20%238b5cf6-8b5cf6" />
</p>

---

## Quick start

**Requirements:** Node 20.9+ (Next.js 16 minimum).

```bash
npm install
npm run dev          # → http://localhost:3400
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack on port 3400 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build on port 3400 |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run assets` | Regenerate placeholder SVGs (review avatars, founder fallback, map) |
| `npm run icons` | Rebuild the rounded favicon / Apple icon from the brand mark |
| `npm run product-logos` | Trim and normalise the five product lock-ups |
| `npm run product-screens` | Re-import the 18 gallery screenshots per product as WebP |
| `npm run portrait` | Crop + compress the founder portrait to a web-ready JPEG |

---

## Structure

Seven pages in the navbar, plus Skills and two legal pages that are linked from
the footer and indexed but kept out of the bar. Deliberately finite — every page
ends with a prev/next pager rather than an endless scroll.

| Route | Purpose |
| --- | --- |
| `/` | Intro — statement, product carousel, the five platforms, site index |
| `/about` | The company, mission, delivery process, values, timeline |
| `/services` | POS, cloud-kitchen and food-business consultancy, scratch-to-running stages, 16 build services |
| `/projects` | Full detail on all five platforms, 120 capabilities, screenshots |
| `/reviews` | Client reviews and FAQs |
| `/owner` | Founder profile |
| `/contact` | Contact channels, enquiry form, location |
| `/skills` | Skill matrix by discipline + the full stack (footer-linked, not in the bar) |
| `/privacy-policy`, `/terms` | Legal |

```
src/
├── app/                    one folder per route + API, sitemap, robots, manifest, OG image
├── components/
│   ├── layout/             floating navbar, footer, legal shell
│   ├── pages/              page-specific composites (project entry, portrait)
│   ├── providers/          theme (next-themes) + Lenis smooth scroll
│   ├── shared/             design-system primitives — page shell, splash, help, reveal
│   └── ui/                 button, badge, card, accordion, form fields
├── data/                   all content lives here; pages render it, never inline it
├── hooks/                  media query, scroll state, active section
├── lib/                    site config, SEO builders, motion vocabulary, utils
└── types/                  shared domain types — content is type-checked
```

**Content is data, not markup.** Products, services, reviews, FAQs, skills and
navigation are typed objects in `src/data`, so a typo is a build error rather
than a blank space on the page. To change copy, edit the data file.

---

## Design system

**Dark-first**, with light as a full alternative. Three brand colours, taken
from the logo:

| Token | Value | Role |
| --- | --- | --- |
| `--brand-ink` | `#1a1a1a` | Dark canvas / light text colour |
| `--brand-paper` | `#f3ffff` | Light canvas / dark text colour |
| `--brand` | `#8b5cf6` | The single accent (the wordmark's "X") |

The visual language is flat and typographic: hairline rules, square-ish panels,
monospace for figures, generous whitespace. No glass, blur, gradient blobs or 3D
— an earlier revision had all of those and they fought the content. There are no
page numbers anywhere; an earlier revision printed a two-digit index in the
navbar, every page header and the pager, and it only ever repeated the label.

Animation is treated as feedback, not decoration. `hover-lift`, `sheen-on-hover`,
`link-underline`, `icon-nudge`, `image-zoom`, `rule-grow` and `press` are all
transform/opacity only so they stay on the compositor, and everything is disabled
under `prefers-reduced-motion`.

---

## Brand assets

The logo files in `public/images/brand/` are the supplied artwork, used verbatim.
Each ships with its background baked in, so there is a light **and** a dark
variant of every lock-up, swapped with Tailwind's `dark:` variant. See
[`public/images/brand/README.md`](public/images/brand/README.md).

---

## Notes before going live

- `siteConfig.url` in `src/lib/site.ts` must point at the production origin —
  canonical URLs, the sitemap and OG tags all derive from it.
- `/api/contact` validates with Zod and rate-limits per IP, but `deliver()` is a
  deliberate no-op. Wire a mail provider (Resend, SES) there; it is one function.
  The in-memory rate limiter is per-process — use a shared store behind more than
  one instance.
- Client names and reviews are illustrative placeholders.
- Fleet Flow is marked `in-development`: it shows its screen gallery *and* an
  eight-phase roadmap, so the page says which parts are not built yet. Flip
  `status` to `shipped` in `src/data/products.ts` when it lands and the pill and
  the roadmap section drop away on their own. A product with no screens at all
  falls back to showing only the roadmap.
- Of the social links in `src/lib/site.ts`, only Instagram and Dribbble are
  confirmed. Replace or remove the rest — each is also emitted as `sameAs` in the
  Organization structured data.

---

<p align="center">Built by <b>Plutox Tech</b> · © 2026</p>
