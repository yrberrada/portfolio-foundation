## Phase 7 — Polish Pass

Scoped fixes only. No new sections, no design-token changes. Section content for Projects/Skills/Experience/Education stays untouched.

### 1. Mobile nav (src/components/layout/SiteNav.tsx)
- Replace the current "always-shown small links" mobile fallback with a hamburger + dropdown.
- Add `useState(open)`. Hamburger button (3 stacked 1px bars in a 24×24 box, color `--text`) shown only on `md:hidden`; toggles `open`.
- When `open`, render a full-width panel directly below the nav: position `absolute` (parent header is sticky/relative-friendly), `bg --bg-surface`, `border-bottom: 1px --border`, links stacked, each `py-3 px-6`, DM Sans 400, `--text`, hover `--accent-warm`.
- Each link `onClick` sets `open=false` so it closes after navigation.
- Desktop list (`hidden md:flex`) unchanged in structure but gains the active-state behavior from step 3.

### 2. Smooth scroll / section IDs
- Confirmed IDs already match: `home`, `experience` (nav doesn't link to it — that's intentional), `projects`, `skills`, `education`, `contact`. Nav hrefs `#projects`, `#skills`, `#education`, `#contact` all resolve. `html { scroll-behavior: smooth }` already in `index.css`. No ID changes needed.

### 3. Active nav state (SiteNav.tsx)
- Add `useEffect` that creates a single `IntersectionObserver` over `#projects`, `#skills`, `#education`, `#contact`.
- Use `rootMargin: "-40% 0px -55% 0px"` and `threshold: 0` so the section closest to viewport center wins; track the last entry that became `isIntersecting` in state (`activeId`).
- For each link, when `href === \`#${activeId}\``: color `--text` + 1px `--accent` underline (use `borderBottom: '1px solid var(--accent)'` + `paddingBottom: '2px'`); inactive = `--text-muted` (existing).
- Apply on both desktop list and mobile dropdown links.

### 4. OG meta (index.html — this is a Vite project, no `layout.tsx`)
- Update `<title>` to "Yassine Berrada Rekhami — Full-Stack Developer & Designer".
- Update `<meta name="description">`, `og:title`, `og:description` to match the culinary theme (e.g. description: "Full-stack developer cooking production software end-to-end. React, TypeScript, Go, PostgreSQL.").
- Add a `<!-- TODO: replace with deployed URL -->` comment alongside `og:url` set to the current Lovable preview URL (`https://id-preview--047d280a-88e1-44e9-8c9c-e571c3f368c1.lovable.app`).
- Remove Twitter `@Lovable` site handle (replace with TODO comment) and keep image fallback.

### 5. Footer (src/components/layout/SiteFooter.tsx)
- Replace current two-element flex layout with a single centered line.
- Markup: `<footer>` with top border, inner `container-x` wrapper, single `<p>` centered, DM Sans 400, color `--text-dim`, fontSize `0.8rem`. Content: `© 2026 Yassine Berrada Rekhami · ` + `<a mailto:yrberrada@gmail.com>` styled inline same color, hover `--accent-warm`.
- No chess attribution. Use literal `2026` per spec (matches current date).

### 6. Resume link (HeroSection.tsx)
- `public/files/` does not exist; no resume PDF present.
- Keep `href="/resume.pdf"` but add `// TODO: Add resume PDF to public/ (e.g. public/resume.pdf) and confirm filename matches this href` comment immediately above the `<a>` element.

### 7. Formspree TODO (ContactSection.tsx)
- Add `{/* TODO: Replace YOUR_FORM_ID with actual Formspree form ID from formspree.io */}` comment immediately above the `<form>` element.

### Files touched
- `src/components/layout/SiteNav.tsx` — rewrite (hamburger + active state)
- `src/components/layout/SiteFooter.tsx` — rewrite (centered minimal)
- `src/components/sections/HeroSection.tsx` — add TODO comment near resume link only
- `src/components/sections/ContactSection.tsx` — add TODO comment near form only
- `index.html` — meta tag updates

### Files NOT touched
ProjectsSection, SkillsSection, ExperienceSection, EducationSection, all card components, `index.css` (no token changes), JSON content files.