# Fonts

| File | Family | Use | Licence |
| --- | --- | --- | --- |
| `inter-latin-variable.woff2` | Inter (variable, latin subset) | Body text, UI | SIL Open Font License 1.1 |
| `inter-tight-latin-variable.woff2` | Inter Tight (variable, latin subset) | Headings | SIL Open Font License 1.1 |
| `Inter-Regular.woff`, `InterTight-SemiBold.woff` | Inter / Inter Tight (static) | Open Graph image only (`app/opengraph-image.tsx`) | SIL Open Font License 1.1 |

The woff2 files are the Google Fonts latin subsets, loaded through `next/font/local` in `app/layout.tsx`.
Only the latin range is included on purpose: the naira sign (₦, U+20A6) falls back to the system font
so the page never downloads the much larger latin-ext file.
