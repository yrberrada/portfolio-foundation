## Phase 2 — Experience Section ("Where I've Cooked")

Two file changes. No other files touched.

### New file: `src/components/KitchenCard.tsx`
Reusable card. Props: `company`, `role`, `stack`, `period`, `bullets: string[]`.

Layout:
- `<motion.article>` with `relative pl-6 py-4`.
- 2px left border via an absolutely-positioned `<motion.span>` (so it can animate `scaleY 0→1` from `origin-top`), `background: var(--accent)`.
- Company — Playfair Display 700, `1.1rem`, `--text`.
- Row with `flex justify-between items-baseline`: role left, period right. DM Sans 400, `0.875rem`, `--text-muted`.
- Stack — JetBrains Mono 400, `0.75rem`, `--text-dim`, `mt-1`.
- Bullets — `<ul>` with `flex flex-col gap-1.5`, `mt-3`. Each `<li>` is `flex gap-3`; first child is "—" in `--accent-warm`, second is the bullet text. DM Sans 400, `0.9375rem`, line-height 1.5, `--text-muted`.

Animations (respects `useReducedMotion`):
- Card: `whileInView` `opacity 0→1`, `y 20→0`, viewport `{ once: true, amount: 0.2 }`, duration ~0.6s.
- Left border: `whileInView` `scaleY 0→1`, same viewport opts, duration 0.4s ease-out.

### Rewrite: `src/components/sections/ExperienceSection.tsx`
Replaces the empty `null` placeholder.

- `<section id="experience" className="py-20">` with `.container-x`.
- Section header (inline, not via SectionShell — the prompt's spec differs from SectionShell's mb/title size, and SectionShell is reused by other sections):
  - `<p className="section-label mb-3">Where I've Cooked</p>`
  - `<h2>` — Playfair Display 700, `2rem`, `--text`, `border-bottom: 2px solid var(--border)`, `pb-3 mb-10` (≈2.5rem).
- One `<KitchenCard>` with the exact Go Optimal data from the prompt (company, role, stack, period, 4 bullets verbatim).

### Notes
- Not modifying `SectionShell.tsx` — its existing styling is used by other sections, and the prompt forbids touching anything else. Header is inlined here; can refactor later when other sections adopt the same pattern.
- `framer-motion` already installed in Phase 1.