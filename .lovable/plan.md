## Phase 1 — Hero Section ("The Kitchen")

Single-file change: rewrite `src/components/sections/HeroSection.tsx`. Plus install `framer-motion` (not currently in `package.json`).

### Dependency
- Add `framer-motion` (used for entrance animations + `useReducedMotion`).

### Layout
- `<section id="home">`, `min-h-screen`, `overflow-hidden`.
- Inside `.container-x`: `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-24`.

### Left column (text)
1. Section label — "The Kitchen" via `.section-label`.
2. Name — `font-display font-black`, `font-size: clamp(2.8rem, 5.5vw, 4.5rem)`, color `--text`, `leading-[1.05]`.
3. Role — "Full-Stack Developer & Designer", DM Sans 300, `1.25rem`, `--text-muted`.
4. Rule — 48px wide × 1px, `background: var(--border-warm)`, margin `1.5rem 0` (animates from width 0 → 48).
5. Bio — DM Sans 400, `1rem`, line-height 1.6, `max-w-md`, `--text-muted`. Exact copy from prompt.
6. CTAs — flex row, gap-3:
   - Primary `<a href="#projects">` "See the Menu": bg `--accent`, color `#fff`, DM Sans 500, `px-6 py-3`, `border-radius: var(--radius-sm)`. Hover: bg `#c25a26` (~8% darker than `#d4622a`).
   - Secondary `<a href="/resume.pdf" target="_blank" rel="noopener noreferrer">` "Download Recipe": transparent bg, `border: 1px solid var(--border-warm)`, color `--text`, DM Sans 400. Hover: bg `--bg-raised`.

### Right column (ambient)
- Full column height (`h-[60vh] lg:h-screen`).
- `background: radial-gradient(ellipse at center, var(--accent-dim) 0%, var(--bg) 70%)`.
- Absolutely-positioned centered span with the text "mise en place":
  - Playfair Display italic, `font-size: 15vw`, `color: var(--text-dim)`, `opacity: 0.04`.
  - `pointer-events-none select-none whitespace-nowrap`.
  - `aria-hidden`.

### Animations (framer-motion)
Use `useReducedMotion()` — when true, render with `initial={false}` so nothing animates (CSS reduced-motion media query already neutralizes transitions as a backstop).

| Element | initial | animate | delay |
|---|---|---|---|
| Section label | `opacity: 0` | `opacity: 1` | 0s |
| Name | `opacity: 0, y: 30` | `opacity: 1, y: 0` | 0.05s |
| Role | `opacity: 0, y: 10` | `opacity: 1, y: 0` | 0.10s |
| Rule | `width: 0` | `width: 48` | 0.15s |
| Bio | `opacity: 0` | `opacity: 1` | 0.20s |
| CTAs | `opacity: 0, y: 10` | `opacity: 1, y: 0` | 0.28s |
| Right column | `opacity: 0` | `opacity: 1` | 0.10s |

Duration ~0.5–0.7s, ease `[0.22, 1, 0.36, 1]`. These fire on mount (hero is above the fold, so `whileInView` isn't needed — `once: true` only matters for scroll reveals).

### Notes / caveats
- `/resume.pdf` does not exist in `public/`. Link will 404 until you drop the file. No placeholder will be created — the design doc and your prompt both specify the path, so I'll wire the link as-is.
- No other files touched. Nav already lives in `SiteNav.tsx`; not adding nav here.
- `font-light` is not in the default Tailwind weight list issue — DM Sans 300 is loaded via the Google Fonts import in `index.css`, so `font-weight: 300` will resolve.

After approval I'll install `framer-motion` and write the new `HeroSection.tsx`.