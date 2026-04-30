## Phase 5 — Education Section ("The Training")

Single file rewrite: `src/components/sections/EducationSection.tsx`. No other files touched.

### Layout
- `<section id="education" className="py-20">` + `.container-x`.
- Inline header (matches the pattern from Experience/Projects/Skills): `.section-label` "The Training" → `<h2>` "Education" Playfair 700 / 2rem with 2px `--border` bottom-border, `mb-10`.

### Card
- `<motion.article>` with:
  - `background: var(--bg-surface)`
  - `border: 1px solid var(--border)`
  - `border-left: 2px solid var(--accent)` (overrides left edge — same accent treatment as KitchenCard)
  - `border-radius: var(--radius)`
  - `padding: 2rem`
- Contents:
  - **Institution** "University of Minnesota Duluth" — Playfair 700, `1.1rem`, `--text`.
  - **Degree** "B.S., Computer Science — Minor in Mathematics" — DM Sans 400, `0.9rem`, `--text-muted`, `mt-1`.
  - **Period + location** "2019 – 2025 · Duluth, MN" — JetBrains Mono `0.75rem`, `--text-dim`, `mt-0.5`.
  - **Divider** `h-px bg-[var(--border)] my-4`.
  - **"COURSEWORK"** label — JetBrains Mono `0.7rem` uppercase, letter-spacing `0.08em`, `--text-dim`, `mb-2`.
  - **Coursework tags** — `flex flex-wrap gap-2`, same tag style as Skills/Projects: font-mono `0.7rem`, bg `--accent-dim`, color `--accent-warm`, border `1px solid rgba(232,164,74,0.15)`, radius 4px, `px-2 py-0.5`. Items: Operating Systems, Database Management Systems, Artificial Intelligence, Computer Architecture, Computer Security.

### Animation
- `whileInView` `opacity 0→1`, `y 20→0`, viewport `{ once: true, amount: 0.2 }`, duration 0.6s, ease `[0.22, 1, 0.36, 1]`. `useReducedMotion` short-circuits.

### Notes
- Coursework tags inlined here (5 items, single use) rather than extracting a new shared component. The same visual style as `PantryCard` tags is reproduced in place.
- No other files touched.