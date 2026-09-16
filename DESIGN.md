# DESIGN.md — Fahad Aba-Alkhail portfolio

Design system for this site. It adapts the warm editorial system from
[awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT). The tokens live in `app/globals.css`
under `@theme`. Components use those token names and never inline hex values.

## 1. Atmosphere
The page is editorial, warm and precise, and should read like a well-set technical magazine, not a template. It sits on a cream canvas with
serif display headlines and dark "product surfaces" that show real work: code windows, pipelines and app screenshots.
Motion is quiet: content fades up once, product mockups animate, and decoration never animates.

## 2. Color roles
| Token | Hex | Role |
|---|---|---|
| `canvas` | #faf9f5 | Page floor |
| `surface-soft` | #f5f0e8 | Soft bands |
| `surface-card` | #efe9de | Feature cards, active tabs |
| `hairline` | #e6dfd8 | 1px borders on cream |
| `ink` | #141413 | Headlines |
| `body` / `body-strong` | #3d3d3a / #252523 | Running text / lead text |
| `muted` / `muted-soft` | #6c6a64 / #8e8b82 | Secondary text / captions |
| `accent` / `accent-active` | #2f45d6 / #2436b0 | Cobalt. Primary CTA, inline links, full-bleed callout |
| `accent-soft` | #8f9cff | Cobalt for text, marks and small details on dark surfaces |
| `dark` / `dark-elevated` / `dark-soft` | #181715 / #252320 / #1f1e1b | Code windows, architecture, footer |
| `on-dark` / `on-dark-soft` | #faf9f5 / #a09d96 | Text on dark |
| `teal`, `amber`, `success` | #5db8a6, #e8a55a, #5db872 | Status dots and syntax only |

App showcases are the one sanctioned exception: Mrasem uses `espresso`/`gold`, Lapel uses its own stone `#eeece5` / sheet `#23211b` / rust `#b4402c`, and Mawaqeet uses `night`/`peach`,
matched to each app's own UI.

## 3. Typography
- **Display**: Newsreader, weight 400, negative tracking. Never bold. Sizes are 64 / 48 / 36 / 28.
- **Body/UI**: Inter. Use 400 for text and 500 for labels, buttons and nav.
- **Code**: JetBrains Mono at 13–14px, for code windows and terminal output.
- **Eyebrow**: 12px, weight 500, uppercase, 1.5px tracking, `muted`.
- Emphasis inside a headline uses a `muted` second clause, not a new color.

## 4. Components
- **Buttons**: 40px tall, `rounded-md` (8px), 14px/500. Primary is `accent` (cobalt) with white text; secondary is `canvas` with a hairline border.
- **Cards**: `rounded-lg` (12px), 32px padding. Feature cards use `surface-card`; tiles use `canvas` with a hairline border.
- **Code window**: `dark` with a `dark-soft` body, JetBrains Mono, a tab row and a status bar.
- **Badges**: pill, 13px/500, on `surface-card`.
- **Nav**: 64px canvas bar with a hairline bottom once scrolled; the active link uses `surface-card` with `rounded-md`.
- **Tech logos**: official full-color Devicon / Simple Icons SVGs in `public/stack`, shown at 28–32px inside tiles.

## 5. Layout
- Max width is 1200px, spacing is on a 4px base, and major sections are separated by 96px.
- Surfaces alternate cream → dark → cream; never put two dark bands back to back.

## 6. Depth
Depth comes from blocks of color, not shadows. Only device mockups get a real shadow.

## 7. Don'ts
- No gradient blobs, grain, rainbow bento tiles, emoji labels or rotated sticker chips.
- No bold serif, no pure white canvas and no second accent colour.
- The cobalt accent stays scarce: CTAs, links and the single callout band.
- No hover effects beyond a color or border shift; no tilt or magnetic effects.
