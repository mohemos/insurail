# Design notes

Insurail should read as **calm, precise infrastructure**: closer to Stripe or Paystack than to an insurer.
The page earns trust through restraint: one deep colour, one warm accent, generous space, real-looking product
surfaces instead of stock imagery, and motion that never draws attention to itself.

## Visual direction

- **Colour.** A deep teal primary (`#0f5b57`) reads as financial and trustworthy without the "purple SaaS gradient"
  cliché, and pairs naturally with the warm off-white page. A single amber accent (`#f2a33a`) is reserved for the
  primary call to action so the eye always lands on "Request a risk audit". Amber is only ever a *fill with dark text*;
  it never appears as text on a light background, which would fail contrast.
- **Surfaces.** Slightly warm off-white page (`#fafaf8`), pure white cards, and a cool grey-green tint (`#f1f4f3`) to
  alternate section backgrounds. Two darker bands break the rhythm: the "ink" developer section and the deep-teal
  closing CTA.
- **Type.** Inter Tight for headings (tight, geometric, confident at display sizes) and Inter for body (highly legible
  at small sizes). Headings use negative tracking and `text-wrap: balance`.
- **Imagery.** No photos. Four product surfaces are built in code so they feel real: a checkout with a working cover
  toggle, an animated API request/response, an agent POS prompt and a USSD session on a basic phone.
- **Logo.** One continuous line that runs along a rail, dips into a shield, and continues: cover embedded in the flow
  of a transaction. Lowercase wordmark set in Inter Tight.

## Colour tokens

All tokens are CSS variables in `app/globals.css` and exposed to Tailwind through `@theme inline`
(`bg-bg`, `text-fg-muted`, `bg-primary`, `border-border-strong`, …). Dark mode overrides the same variables under
`prefers-color-scheme: dark`, so components rarely need `dark:` classes.

| Token             | Light     | Dark      | Role                                              |
| ----------------- | --------- | --------- | ------------------------------------------------- |
| `--bg`            | `#fafaf8` | `#0b1516` | Page background                                   |
| `--surface`       | `#ffffff` | `#10201f` | Cards, header when scrolled, form card            |
| `--surface-2`     | `#f1f4f3` | `#172a29` | Alternate section background, chips, inputs       |
| `--border`        | `#d9e2e0` | `#24393a` | Hairlines                                         |
| `--border-strong` | `#7a908d` | `#66807d` | Input borders, switch off-state (≥ 3:1 non-text)  |
| `--fg`            | `#0e1f1e` | `#ecf1f0` | Headings, body                                    |
| `--fg-muted`      | `#46605e` | `#a9b9b7` | Secondary text                                    |
| `--fg-subtle`     | `#5c7370` | `#8fa3a0` | Captions, placeholders (still ≥ 4.5:1)            |
| `--primary`       | `#0f5b57` | `#5fc9bf` | Brand teal: eyebrows, icons, links, switch on     |
| `--primary-hover` | `#0b4a47` | `#7ad8cf` |                                                   |
| `--primary-fg`    | `#ffffff` | `#0b1516` | Text on primary                                   |
| `--primary-soft`  | `#e2f0ed` | `#123332` | Tinted tiles and highlighted rows                 |
| `--accent`        | `#f2a33a` | `#f2a33a` | Primary CTA fill                                  |
| `--accent-hover`  | `#e8932a` | `#f6b25a` |                                                   |
| `--accent-fg`     | `#0e1f1e` | `#0b1516` | Text on accent                                    |
| `--accent-text`   | `#8a4b00` | `#f2b45c` | Accent as text, if ever needed                    |
| `--ink*`          | `#0e1f1e` band | `#060f10` band | Developer section (`--ink-surface`, `--ink-border`, `--ink-fg`, `--ink-fg-muted`, `--ink-primary`) |
| `--cta*`          | `#0f5b57` band | `#123332` band | Closing CTA section (`--cta-fg`, `--cta-fg-muted`)  |
| `--code-*`        | shared    | shared    | Code blocks: `#0b1f22` background, teal keys, amber strings, blue numbers |
| `--success`/`--error` | `#0f7a4a` / `#b3261e` | `#6fd6a0` / `#ff8a80` | Form feedback, with matching `-bg` tints |

### Contrast (WCAG 2.1 AA)

Measured with a script during the build (`node` implementation of the WCAG relative-luminance formula).

| Pair                                  | Light  | Dark   |
| ------------------------------------- | ------ | ------ |
| body text on page (`fg` / `bg`)        | 16.3:1 | 16.3:1 |
| muted text on page                     | 6.5:1  | 9.1:1  |
| subtle text on tinted surface          | 4.6:1  | 5.7:1  |
| primary on page                        | 7.6:1  | 9.4:1  |
| text on primary button                 | 7.9:1  | 9.4:1  |
| text on accent (CTA) button            | 8.2:1  | 8.9:1  |
| muted text in the ink band             | 8.4:1  | 8.4:1  |
| muted text in the CTA band             | 5.1:1  | 7.4:1  |
| code comments on code background       | 6.2:1  | 6.2:1  |
| input border vs page (non-text, 3:1)   | 3.0:1  | 3.8:1  |

## Type scale

Fluid sizes via `clamp()`, defined as Tailwind text utilities in `@theme`.

| Utility          | Size                                   | Line-height | Tracking  | Weight |
| ---------------- | -------------------------------------- | ----------- | --------- | ------ |
| `text-display`   | 40 → 72 px (`clamp(2.5rem, 1.7rem + 3.6vw, 4.5rem)`) | 1.02 | −0.03em | 600 |
| `text-h2`        | 30 → 48 px                             | 1.10        | −0.025em  | 600    |
| `text-h3`        | 20 → 24 px                             | 1.25        | −0.015em  | 600    |
| `text-lead`      | 17 → 20 px                             | 1.55        | –         | 400    |
| body (`text-base`) | 16 px                                | 1.5         | –         | 400    |
| `text-sm`        | 14 px                                  | 1.43        | –         | 400/500 |
| `text-eyebrow`   | 13 px, uppercase                       | 1.25        | +0.08em   | 600    |
| code             | 13 px monospace (12 px on phones)      | 1.5         | –         | 400    |

Headings use `font-display` (Inter Tight); everything else `font-sans` (Inter). Code uses the system monospace stack.

## Spacing and layout

8-point scale using Tailwind's 4 px unit in even steps.

| Purpose                 | Value                                   |
| ----------------------- | --------------------------------------- |
| Content width           | 1200 px (`max-w-page` = 75rem)          |
| Page gutters            | 20 px (phones) → 32 px (≥ 640 px)       |
| Section padding         | 80 px (phones) → 112 px (≥ 768 px)      |
| Heading → content       | 48 px → 64 px                           |
| Card padding            | 24 px                                   |
| Grid gaps               | 20 px cards, 32–40 px columns           |
| Radii                   | 12 px controls, 16 px cards, 24 px form card, pill buttons |
| Header height           | 64 px → 72 px; `scroll-padding-top: 88px` |

Breakpoints follow Tailwind defaults; the layouts were checked at 375, 768, 1280 and 1920 px.

## Motion

- Scroll reveals: fade + 16 px rise over 0.6 s with an ease-out-quart curve, once per element, staggered by 60–80 ms.
  Implemented with Framer Motion's `m` + `LazyMotion`; the animation engine loads after the page is idle.
- Hover: cards lift 4 px with a softer shadow; buttons lift 1 px.
- Hero: the checkout and API mocks fade up on load; the API request types itself once in view, then the response fades in.
- Everything respects `prefers-reduced-motion`: reveals render static, the typewriter shows the full code immediately,
  and a global rule collapses CSS transitions.

## Accessibility notes

- Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`), one `h1`, a skip link, and visible
  focus rings (`outline: 2px solid var(--ring)`).
- Illustrations are `role="img"` with descriptive labels (or `role="group"` when interactive); decorative SVGs are `aria-hidden`.
- The mobile menu is a modal dialog with a focus trap, Escape to close and focus return.
- Tabs follow the WAI-ARIA pattern (roving tabindex, arrow keys, Home/End); inactive panels stay in the DOM but hidden.
- Form fields use real `<label>`s, `aria-invalid` and `aria-describedby`; the first invalid field receives focus.
- The FAQ uses native `<details>`, so it works without JavaScript and with find-in-page.
