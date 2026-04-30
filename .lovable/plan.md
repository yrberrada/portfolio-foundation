## Phases 3 + 4 — Projects ("Tonight's Menu") and Skills ("The Pantry")

Phase 3 was interrupted before files were written, so I'll do both phases together. Four files; no other files touched.

---

### Phase 3 — Projects

**New file: `src/components/RecipeCard.tsx`**

Props: `title`, `tagline`, `serves`, `tech: string[]`, `links?: { github?, live? }`, `index` (stagger).

- `<motion.article>` `p-6`, `border: 1px solid var(--border)`, `border-radius: var(--radius)`, background `linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-raised) 100%)`.
- Hover: `whileHover={{ scale: 1.015 }}` (200ms); inline mouse handlers swap `borderColor` to `var(--border-warm)`.
- Title — Playfair 700, `1.1rem`, `--text`.
- Tagline — DM Sans 400, `0.875rem`, `--text-muted`, `mt-1`, line-height 1.5.
- Serves — `font-mono 0.75rem`, `--text-dim`, `mt-2`. Format: `serves <span color=accent-warm>·</span> {serves}`.
- Divider — `h-px bg-[var(--border)] my-3`.
- "INGREDIENTS" — `font-mono 0.7rem` uppercase, letter-spacing `0.08em`, `--text-dim`, `mb-1.5`.
- Tags — `flex flex-wrap gap-1.5`. Each: `font-mono 0.7rem`, bg `--accent-dim`, color `--accent-warm`, border `1px solid rgba(232,164,74,0.15)`, radius 4px, `px-2 py-0.5`.
- Links row (only if at least one truthy link) — `mt-4 flex gap-4`. Each `<a target="_blank" rel="noopener noreferrer">` DM Sans `0.8rem`, `--text-muted` → `--text` on hover, with lucide `ArrowUpRight` 12px. Live first, then GitHub.

Animation: `whileInView` `opacity 0→1`, `y 20→0`, viewport `{ once: true, amount: 0.15 }`, delay `index * 0.07`. `useReducedMotion` short-circuits.

**Rewrite: `src/components/sections/ProjectsSection.tsx`**
- Reads `src/content/projects.json`.
- `<section id="projects" className="py-20">` + `.container-x`.
- Inline header (matches Experience pattern): `.section-label` "Tonight's Menu" → `<h2>` "Projects" Playfair 700 / 2rem / 2px `--border` bottom-border.
- Subtext below: DM Sans `--text-muted` `0.9375rem`, `mb-10` — "A selection of work shipped for real clients and real teams."
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`. Each project → `RecipeCard` with its `index`.

---

### Phase 4 — Skills

**New file: `src/components/PantryCard.tsx`** (extracted for clarity; the prompt doesn't forbid an extra component, and it keeps the section file readable)

Props: `group`, `items: string[]`, `index`.

- `<motion.article>` `p-5` (`1.25rem`), background `var(--bg-surface)`, `border: 1px solid var(--border)`, `border-radius: var(--radius)`. Inline mouse handlers swap border to `--border-warm`, 200ms transition.
- Group name — DM Sans 500, `0.9rem`, `--text`, `mb-3`. Below it a 30%-width 1px `--border` divider.
- Tags — `flex flex-wrap gap-2`. Same tag styling as `RecipeCard` ingredients (font-mono, `--accent-dim` bg, `--accent-warm` text, 4px radius, `px-2 py-0.5`, 0.7rem).

Animation: `whileInView` `opacity 0→1`, `y 15→0`, viewport `{ once: true, amount: 0.2 }`, delay `index * 0.06`. Reduced-motion safe.

**Rewrite: `src/components/sections/SkillsSection.tsx`**
- Reads `src/content/skills.json` as-is.
- `<section id="skills" className="py-20">` + `.container-x`.
- Inline header: `.section-label` "The Pantry" → `<h2>` "Skills" (same pattern).
- Subtext: "Stocked and ready. The full ingredient list." DM Sans `--text-muted` `0.9375rem`, `mb-8` (matches the prompt's `mt-8` on the grid).
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`. Each entry → `PantryCard` with its index.

---

### Notes
- `lucide-react` already in deps; `framer-motion` installed in Phase 1.
- Empty-string `github` values in projects.json are falsy, so cards without a real link won't render the links row.
- `HeroSection`, `ExperienceSection`, `KitchenCard`, `SiteNav`, `index.css`, `tailwind.config.ts` are not touched.