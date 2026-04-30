## Heads up before we start

Your prompt was written for a Next.js project (`src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `next/font/google`). **This project is Vite + React + React Router** — there is no `src/app/` directory, no Next.js, no `next/font`.

Also, none of the "chess" files exist here, and `three`, `@react-three/fiber`, `@react-three/drei`, and `swiper` are not in `package.json`. So Step 1 of your prompt is a no-op on this codebase.

I'll therefore translate Prompt 0 to the equivalent Vite/React structure and skip the cleanup. If you actually meant to run this against a different repo, stop me and point me at it.

---

## Phase 0 — Foundation (this plan)

### 1. Cleanup
- Skip — chess files, `public/models/`, three.js, and swiper are not present.

### 2. Design system in `src/index.css`
Full rewrite:
- Google Fonts `@import` at top: Playfair Display (700, 900), DM Sans (300, 400, 500), JetBrains Mono (400).
- Tailwind directives.
- `:root` CSS variables exactly per design doc Section 2 (`--bg`, `--bg-surface`, `--bg-raised`, `--text`, `--text-muted`, `--text-dim`, `--accent`, `--accent-warm`, `--accent-dim`, `--border`, `--border-warm`, `--radius`, `--radius-sm`, `--radius-lg`).
- Map these into HSL-compatible Tailwind tokens via `tailwind.config.ts` (extend `colors` and `fontFamily`) so we can use `bg-bg`, `text-text-muted`, `font-display`, `font-mono`, etc. Note: the existing config uses the shadcn HSL token system; I'll add the new tokens alongside without ripping out shadcn so existing UI components keep working.
- Base styles: `html { scroll-smooth }`, `body { antialiased; background: var(--bg); color: var(--text); font-family: 'DM Sans' }`.
- Utilities: `.container-x` (max-w-5xl mx-auto px-6 — naming to avoid clashing with Tailwind's `.container`), `.text-muted`, `.text-dim`, `.bg-surface`, `.bg-raised`, `.border-default`, `.border-warm`, `.tag` (JetBrains Mono pill: `--accent-dim` bg, `--accent-warm` text, 4px radius, 2px 8px padding), `.section-label` (uppercase JetBrains Mono, `--text-dim`, 0.75rem, letter-spacing 0.12em).
- `@media (prefers-reduced-motion: reduce)` disabling transitions/animations.

### 3. Shell — `src/components/layout/SiteNav.tsx` + `SiteFooter.tsx`
Since there's no Next.js layout, I'll create dedicated layout components and use them in pages.
- **Nav**: sticky, `backdrop-blur`, bg `rgba(10,10,8,0.85)`, no border, `box-shadow: 0 1px 0 var(--border)`. Left = "Yassine Berrada" (DM Sans 500). Right = anchor links: "Tonight's Menu" → `#projects`, "The Pantry" → `#skills`, "The Training" → `#education`, "Let's Cook" → `#contact`. (Doc also shows "The Kitchen" / "Where I've Cooked" — I'll match the prompt's list of four; happy to add more.)
- **Footer**: minimal — `© {year} Yassine Berrada` + email link only.
- No chess references anywhere.

### 4. Page wiring — `src/pages/Index.tsx`
Replace placeholder. Render in this order, each as a section with the correct `id`:
1. `HeroSection` (placeholder returning a minimal labeled stub)
2. `ExperienceSection` (placeholder, returns `null` per your prompt)
3. `ProjectsSection` (placeholder)
4. `SkillsSection` (placeholder)
5. `EducationSection` (placeholder)
6. `ContactSection` (placeholder)

All section files created under `src/components/sections/` as empty placeholders that just render the section shell with the culinary section label + Playfair title — no real content yet. This keeps Phase 0 truly content-free while still letting nav anchors work.

Update metadata in `index.html`: `<title>Yassine Berrada Rekhami — Full-Stack Developer</title>` and an appropriate meta description.

### 5. Content JSON
- Create `src/content/projects.json` with the 6 projects from design doc Section 10 verbatim.
- Create `src/content/skills.json` with the 6 skill groups from design doc Section 10 verbatim.
- Add `"resolveJsonModule": true` check (already on by default in the Vite TS config — will verify, no edit if present).

### 6. Do not touch
- No `src/lib/motion.ts` work (file doesn't exist; won't create it in this phase).
- No `tsconfig.json` changes.
- No shadcn `ui/*` component changes.
- No section content beyond stub shells.

---

## Technical notes
- Tailwind extension: add `colors.bg`, `colors['bg-surface']`, `colors['bg-raised']`, `colors.text`, `colors['text-muted']`, `colors['text-dim']`, `colors.accent`, `colors['accent-warm']`, `colors['accent-dim']`, `colors['border-warm']`, plus `fontFamily.display = ['"Playfair Display"', 'serif']`, `fontFamily.sans = ['"DM Sans"', 'sans-serif']`, `fontFamily.mono = ['"JetBrains Mono"', 'monospace']`. Existing shadcn HSL tokens stay untouched.
- Anchor scrolling works with `scroll-smooth` on `html` + `id` on each section element — no router changes needed.
- Section placeholders will have `min-height` + the `.section-label` + Playfair title so the page is navigable, but no real copy. You'll fill them in subsequent prompts.

After approval I'll execute the above. Then we move to your next prompt for actual section content.