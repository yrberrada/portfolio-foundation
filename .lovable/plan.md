## Audit reconciliation

Two items from the audit are already implemented and should be skipped:

- **#5 scroll progress bar** — already present in `SiteNav.tsx` (animated `scaleX` bar on the bottom edge of the header).
- **#10 dead footer** — already rebuilt into a 3-column sitemap (Brand / Navigate / Elsewhere) in Prompt E.

**#7 uniform spacing** is partially done (major vs. supporting sections now differ). Leaving as-is unless we want a further pass.

The remaining 6 issues will be tackled in 4 prompts, ordered by impact.

---

## Prompt F — Critical credibility fixes (live-issue triage)

Two one-line fixes that are actively damaging perception, plus the footer attribution.

**Touches:** `index.html`, `src/components/sections/HeroSection.tsx`, `src/components/layout/SiteFooter.tsx`

1. **Canonical + OG URL → production domain.** In `index.html`, swap the preview URL in `<link rel="canonical">` and `<meta property="og:url">` for `https://yassineberradadev.com`. Remove the "TODO replace" comments.
2. **De-cute the hero bio.** In `HeroSection.tsx`, change "Currently cooking at Go Optimal, shipping real products for real clients." to "Currently building at Go Optimal, shipping real products for real clients." The cooking metaphor stays in section labels and ambient text only.
3. **Drop the build-tool brag.** In `SiteFooter.tsx`, remove the "Built with React + TypeScript" line from the bottom strip. Leave the copyright line on its own (centered on mobile, left-aligned on desktop).

---

## Prompt G — Project visuals (highest-impact design upgrade)

Add screenshot/preview imagery to each `RecipeCard` so the projects section becomes a showcase instead of a list.

**Touches:** `src/components/RecipeCard.tsx`, `src/content/projects.json`, `public/projects/*` (new images)

1. **Schema:** add an optional `image` field to each entry in `projects.json` (path like `/projects/pulse.webp`). Keep it optional so cards without an image still render gracefully.
2. **Card layout:** in `RecipeCard.tsx`, render the image at the top of the card when present — full-width, fixed aspect ratio (16:10), `object-cover`, rounded top corners matching the card radius, with a subtle inner border on the bottom edge to separate it from the text block. Lazy-load (`loading="lazy"`, `decoding="async"`).
3. **Hover treatment:** on card hover, gently scale the image (1.02) inside `overflow-hidden`, behind the existing border-color hover. Disabled when `prefers-reduced-motion`.
4. **Placeholder strategy:** since we don't have screenshots yet, ship the schema + rendering and leave `image` empty for all six entries. Add a TODO comment in `projects.json` listing the recommended next step (drop a 1200×750 WebP into `/public/projects/` and reference it). Cards without an image fall back to the current text-only layout — no broken UI.

This way the infrastructure ships now and the user can drop in screenshots without another code change.

---

## Prompt H — Project hierarchy (visual weight)

Make Pulse and Symphony Operations (the headline client work) read as featured, and demote the smaller projects.

**Touches:** `src/components/sections/ProjectsSection.tsx`, `src/content/projects.json`, `src/components/RecipeCard.tsx`

1. **Schema:** add an optional `featured: true` flag in `projects.json`. Mark Pulse and Symphony as featured.
2. **Grid:** switch the projects grid to a 6-column grid on `lg`. Featured cards span 3 columns (so two per row); non-featured span 2 columns (three per row). On `sm` keep the current 2-col, on mobile single column. This preserves a clean rhythm without random-looking sizes.
3. **Card emphasis:** when `featured`, `RecipeCard` gets a slightly larger title (`1.25rem` vs `1.1rem`), an "Featured" eyebrow label in the accent-warm color above the title, and a marginally brighter border (`rgba(232,164,74,0.12)` resting). Hover treatment unchanged.
4. **Order:** ensure featured items render first regardless of source order, so the showcase sits at the top.

---

## Prompt I — Contact form success state

Wire a real submit handler so the form gives feedback even if Formspree isn't configured yet.

**Touches:** `src/components/sections/ContactSection.tsx`

1. **State machine:** convert the form to a controlled component with `status: "idle" | "submitting" | "success" | "error"`.
2. **Submit handler:** on submit, `preventDefault`, set `submitting`, then `fetch` the Formspree URL with JSON body and `Accept: application/json`. On 2xx → `success`; otherwise → `error`. If the form ID is still the literal `YOUR_FORM_ID` placeholder, short-circuit to `success` after a 600 ms delay so the UX can be reviewed before Formspree is wired (and log a `console.warn` so it's obvious in dev).
3. **Success UI:** replace the form with a centered confirmation block — small accent-warm check glyph, headline "Order received", body "I'll get back to you within a day or two.", and a ghost button "Send another" that resets `status` to `idle`. Animate in with the same `EASE` curve used elsewhere (opacity + 8 px y).
4. **Error UI:** keep the form visible, show a small line of `text-warm` copy above the submit button: "Something went wrong — try emailing yrberrada@gmail.com directly." with a mailto link.
5. **Submit button:** while `submitting`, disable it and swap the label to "Sending…".
6. **Bonus:** drop the `# TODO Replace YOUR_FORM_ID` comment into a clearer `// TODO` near the constant so it's obvious where to wire the real ID.

---

## Skipped / deferred

- **#9 458 KB bundle.** Real but low ROI for a portfolio. Would require auditing which shadcn components are actually used (most aren't on the public page), removing unused ones, and verifying nothing breaks. Worth doing later as a dedicated cleanup prompt if Lighthouse scores matter — not now.
- **#7 spacing rhythm refinement.** Already addressed in Prompt E. Could do a finer pass later if desired.

---

## Suggested execution order

Run **F** first (live issues, ~5 min). Then **G** and **H** together since they touch overlapping files (`RecipeCard.tsx`, `projects.json`) and share a theme. Then **I** to close the loop on the contact form.
