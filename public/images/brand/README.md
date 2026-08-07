# Brand assets

These are the supplied Plutox Tech logo files, used **verbatim** — no redraw, no
recolouring, no re-cropping.

| File | Artwork | Used by |
| --- | --- | --- |
| `plutox-mark.png` | Ink mark on `#f3ffff` | Navbar / footer / 404 chip (light), favicon, PWA icon, JSON-LD logo |
| `plutox-mark-dark.png` | Pale mark on `#1a1a1a` | Navbar / footer / 404 chip (dark) |
| `plutox-lockup.png` | Mark + `PLUTOX` on light | `<Logo lockup />` |
| `plutox-lockup-dark.png` | Mark + `PLUTOX` on dark | `<Logo lockup />` (dark) |
| `plutox-splash.png` | Lock-up + tagline on light | Loading splash (light) |
| `plutox-splash-dark.png` | Lock-up + tagline on dark | Loading splash (dark) |
| `plutox-mark-violet.png` | Violet mark on light | Spare — not currently referenced |

## Why there is a light *and* a dark file for each

Each PNG has its background baked in rather than being a transparent cut-out. So
instead of one asset recoloured with CSS, the matching variant is selected with
Tailwind's `dark:` variant. Each file's background is exactly the theme canvas
(`#f3ffff` / `#1a1a1a`), so it reads as seamless in both themes.

Two knock-on details, both in `src/components/shared/logo.tsx`:

- The mark is framed in a `rounded-lg` chip. Its baked square edge would
  otherwise be visible against the translucent scrolled navbar.
- Both variants are always in the DOM and swapped with CSS — no JS theme check,
  so there is no wrong-logo flash before hydration.

If transparent-background versions are ever exported, the chip can be dropped
and a single file used for both themes.

## Favicon

`src/app/icon.png` and `src/app/apple-icon.png` are copies of the mark. Next.js
detects those filenames automatically and generates the `<link rel="icon">` and
Apple touch icon tags at build time — no code change needed to swap them.
