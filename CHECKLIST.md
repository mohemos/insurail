# SEO & accessibility checklist

How each requirement from the brief was met and how it was verified. Verified on the production build with
Lighthouse 13.4 (headless Chrome), a scripted HTML audit, and Puppeteer-driven browser checks at 375 / 768 / 1280 / 1920 px
in light and dark mode.

## SEO

| Requirement | Status | Where / how verified |
| --- | --- | --- |
| Unique `<title>` ≤ 60 chars | ✅ "Insurail — Embedded microinsurance API for Africa" (49 chars) | `content/site.ts` → `app/layout.tsx` |
| Meta description ≤ 155 chars | ✅ 143 chars | same |
| Exactly one `<h1>` | ✅ 1 (`Embed insurance into what you already sell.`) | HTML audit |
| Logical `<h2>`/`<h3>` per section | ✅ 9 section `h2`s, `h3`s for cards and steps | HTML audit |
| `<main>`, `<nav>`, `<section>`, `<footer>` | ✅ 1 main, 4 nav (primary + 3 footer groups), 11 sections, 1 footer | HTML audit |
| Open Graph + Twitter Card with generated 1200×630 image | ✅ `app/opengraph-image.tsx` (build-time PNG, 88 KB), `twitter-image` re-exports it; `og:image:alt` set | `curl /opengraph-image` |
| JSON-LD: Organization, WebSite, SoftwareApplication or Service, FAQPage | ✅ one `@graph` with Organization, WebSite, **Service**, FAQPage (8 questions generated from the FAQ content) | `lib/seo/json-ld.ts`; parsed from the built HTML |
| `sitemap.xml`, `robots.txt`, canonical | ✅ `/sitemap.xml` (3 URLs), `/robots.txt` (allow all, disallow `/api/`, sitemap + host), `<link rel="canonical" href="https://insurail.io">` per page | `app/sitemap.ts`, `app/robots.ts`, `lib/seo/metadata.ts` |
| Favicon set + web manifest | ✅ `favicon.ico` (16/32/48), SVG icon, 32 px PNG, 180 px Apple icon, 192/512 + maskable PNGs, `manifest.webmanifest` | `pnpm icons`, `app/manifest.ts` |
| Alt text on meaningful images; decorative SVG `aria-hidden` | ✅ no raster images on the page; 54/54 inline SVGs are `aria-hidden`; illustrations carry `role="img"` + `aria-label` | HTML audit |
| Keywords woven into H1/H2s, first paragraph, alt text | ✅ "embed insurance" (H1), "embedded microinsurance API" (eyebrow, first paragraph, OG alt), "insurance API", "Nigeria", "Africa"; no stuffing | copy review |
| Lighthouse ≥ 95 / ≥ 95 / ≥ 95 / 100 on mobile | ✅ Performance 95–98 (3 runs), Accessibility 100, Best Practices 100, SEO 100. Desktop: 100 / 100 / 100 / 100 | `lighthouse` CLI, simulated slow 4G |
| Optimised images, lazy loading, font preload, no layout shift | ✅ vector-only page; fonts self-hosted, subset, preloaded, `font-display: swap`; CLS 0.00; below-the-fold JS hydrated after idle | Lighthouse |

## Accessibility (WCAG 2.1 AA)

| Requirement | Status | Where / how verified |
| --- | --- | --- |
| Semantic HTML | ✅ landmarks, lists, `<details>` FAQ, real `<form>`/`<label>`/`<select>` | source + HTML audit |
| Keyboard navigable | ✅ first Tab lands on the skip link; menu, switch, tabs (arrow keys, Home/End), accordion and forms all operable | Puppeteer |
| Visible focus states | ✅ global `:focus-visible` outline in the brand colour, offset 2 px | `app/globals.css` |
| Colour contrast ≥ 4.5:1 | ✅ all text pairs 4.6:1 or better; input borders and switch ≥ 3:1 | contrast script, see `DESIGN.md` |
| Alt text / ARIA only where needed | ✅ `aria-labelledby` on sections, `role="switch"`, `role="tablist"`, `role="dialog" aria-modal`, live regions for form status; no redundant ARIA | source |
| Skip-to-content link | ✅ `<a href="#main">` first in the DOM; `<main id="main" tabindex="-1">` | Puppeteer |
| `prefers-reduced-motion` | ✅ reveals render static, typewriter disabled, transitions collapsed | `lib/hooks/use-reduced-motion.ts`, `globals.css` |
| Dark mode | ✅ tokens flip under `prefers-color-scheme: dark`; `color-scheme` and theme-colour meta set | screenshots at 375 / 1280 |
| Mobile menu | ✅ modal with focus trap, Escape closes, focus returns to the trigger, body scroll locked | Puppeteer |
| Forms | ✅ labels, `aria-invalid`, `aria-describedby`, focus moves to the first error, inline success (`role="status"`), server error (`role="alert"`) | Puppeteer + curl |
| No horizontal overflow at 375 / 768 / 1280 / 1920 | ✅ `scrollWidth === clientWidth` at every width (light and dark) | Puppeteer |

## Functional checks

- `POST /api/lead`: valid audit and developer leads delivered to a local webhook (200, `Authorization: Bearer` set);
  validation errors return 400 with per-field messages; honeypot submissions return 200 without delivery;
  wrong content type → 415; invalid JSON → 400; no transport in production → 503 with a friendly form error.
- Every navigation link and CTA resolves: 9 in-page anchors all have matching `id`s; external links open in a new tab
  with `rel="noopener noreferrer"`; `mailto:` links for contact and partnership; `/privacy`, `/terms` and a `/404` page exist.
- Build: `pnpm lint`, `pnpm typecheck` and `pnpm build` complete with no warnings or errors.
