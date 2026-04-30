# Prompt E — Rhythm & Footer

Two related polish fixes: break the monotonous `py-20` rhythm across every section, and turn the bare-bones footer into a proper sitemap-style nav with section links and socials.

## 1. Vertical rhythm — vary section spacing

Right now every section uses identical `py-20` (80px top + bottom). The page reads as one long uniform stripe — there's no visual hierarchy between "headline" sections (Experience, Projects) and "supporting" sections (Skills, Education).

**Approach:** introduce a subtle 3-tier rhythm using only Tailwind spacing utilities (no new tokens), with the major content sections breathing more than the supporting ones, and a tighter transition into the footer.

| Section          | Current        | New                                |
| ---------------- | -------------- | ---------------------------------- |
| Hero             | `py-20 lg:py-24` | unchanged (already custom)        |
| Experience       | `py-20`        | `pt-28 pb-20 md:pt-32 md:pb-24`   |
| Projects         | `py-20`        | `pt-20 pb-28 md:pt-24 md:pb-32`   |
| Skills           | `py-20`        | `py-16 md:py-20`                  |
| Education        | `py-20`        | `py-16 md:py-20`                  |
| Contact          | `py-20`        | `pt-28 pb-20 md:pt-36 md:pb-24`   |
| `SectionShell` default | `py-20`  | `py-20 md:py-24` (kept moderate, since it's the fallback) |

Rationale: Experience/Projects/Contact get extra top breathing room so they read as anchor moments; Skills/Education tighten up so they feel like a paired "facts" block between the two big content slabs. Nothing changes horizontally.

**Files:**
- `src/components/sections/ExperienceSection.tsx` (line 10)
- `src/components/sections/ProjectsSection.tsx` (line 20)
- `src/components/sections/SkillsSection.tsx` (line 13)
- `src/components/sections/EducationSection.tsx` (line 17)
- `src/components/sections/ContactSection.tsx` (line 28)
- `src/components/sections/SectionShell.tsx` (line 12)

## 2. Footer — add nav links

Current footer is a single line: `© 2026 ... · email`. Replace with a small three-column-on-desktop / stacked-on-mobile layout:

```text
┌────────────────────────────────────────────────────────────────────┐
│  Yassine Berrada Rekhami        Navigate          Elsewhere       │
│  Full-stack developer.          Experience        Email           │
│  Cooking software end-to-end.   Projects          LinkedIn ↗      │
│                                 Skills            GitHub  ↗       │
│                                 Education                          │
│                                 Contact                            │
├────────────────────────────────────────────────────────────────────┤
│  © 2026 Yassine Berrada Rekhami       Built in React + TypeScript │
└────────────────────────────────────────────────────────────────────┘
```

**Details:**
- Wrapper keeps `border-top: 1px solid var(--border)`; outer padding becomes `pt-16 pb-10` (so it pairs with the new section rhythm).
- Three columns via `grid grid-cols-1 md:grid-cols-3 gap-10`.
  - **Brand column:** name in `font-display`, single tagline in `var(--text-dim)`.
  - **Navigate column:** small heading "Navigate" in `section-label` style, then anchor links to `#experience`, `#projects`, `#skills`, `#education`, `#contact` — same hover pattern (dim → `var(--accent-warm)`).
  - **Elsewhere column:** heading "Elsewhere", then `mailto:yrberrada@gmail.com`, LinkedIn, GitHub — reuse the exact URLs already in `ContactSection.tsx` (lines 78–80) so there's a single source of truth visually, even if duplicated literally.
- Bottom strip: `border-top` + `mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-2` with the © line on the left and a small "Built with React + TypeScript" credit on the right, both in `text-dim` `0.75rem`.
- All anchor links get `transition: color 200ms` and the same hover-color swap already used for the email link.
- External links keep the `↗` glyph and `target="_blank" rel="noopener noreferrer"`.
- No new images, no new fonts, no new tokens.

**File:** `src/components/layout/SiteFooter.tsx` (full rewrite — it's only 22 lines).

## Out of scope

- No changes to nav, hero, or card components.
- No new color tokens.
- Not extracting a shared `socialLinks` constant (could be a follow-up; for now duplication is fine).
- Not adding a back-to-top button.

## Files touched

- `src/components/sections/ExperienceSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/SkillsSection.tsx`
- `src/components/sections/EducationSection.tsx`
- `src/components/sections/ContactSection.tsx`
- `src/components/sections/SectionShell.tsx`
- `src/components/layout/SiteFooter.tsx`
