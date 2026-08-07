<p align="center">
  <img src="public/images/brand/plutox-lockup.png" alt="Plutox Tech" width="220" />
</p>

<h1 align="center">Plutox Tech — Company Website</h1>

<p align="center">
  <b>Smart Software. Smarter Business.</b><br/>
  The marketing site for Plutox Tech — a founder-led software house in Lahore
  building point-of-sale, ERP and hospitality platforms.
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
| `npm run product-logos` | Trim and normalise the four product wordmarks |
| `npm run portrait` | Crop + compress the founder portrait to a web-ready JPEG |

---

## Structure

Seven numbered pages, plus two legal pages outside the sequence. Deliberately
finite — the numbered index in the navbar, page headers and prev/next pagers all
lean on that.

| # | Route | Purpose |
| --- | --- | --- |
| 01 | `/` | Intro — statement, product carousel, the four products, site index |
| 02 | `/projects` | Full detail on all four platforms, with screenshots |
| 03 | `/about` | Company, 16 services, delivery process, values, timeline |
| 04 | `/skills` | Skill matrix by discipline + the full stack |
| 05 | `/reviews` | Client reviews and FAQs |
| 06 | `/owner` | Founder profile |
| 07 | `/contact` | Contact channels, enquiry form, location |
| — | `/privacy-policy`, `/terms` | Legal |

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
monospace for indices and figures, generous whitespace. No glass, blur, gradient
blobs or 3D — an earlier revision had all of those and they fought the content.

Animation is treated as feedback, not decoration — `hover-lift`, `sheen-on-hover`
and `link-underline` are transform/opacity only so they stay on the compositor,
and everything is disabled under `prefers-reduced-motion`.

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
- Client names, reviews and blog entries are illustrative placeholders.
- Of the social links in `src/lib/site.ts`, only Instagram and Dribbble are
  confirmed. Replace or remove the rest — each is also emitted as `sameAs` in the
  Organization structured data.

---

<p align="center">Built by <b>Plutox Tech</b> · © 2026</p>
