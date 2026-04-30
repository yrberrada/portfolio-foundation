# Prompt A — Critical Bug Fixes

Four targeted fixes across three files. No design tokens or content changes.

## 1. `src/components/RecipeCard.tsx` — Empty GitHub link condition

**Bug:** `projects.json` has `"github": ""` for 5 of 6 projects. The current check `links?.github` is truthy for the object key but `links.github` (empty string) renders a clickable "GitHub ↗" link that goes nowhere.

**Fix:**
- Change the outer conditional from `(links?.github || links?.live)` to truthy-string checks: `(links?.github?.trim() || links?.live?.trim())`.
- Wrap each individual link render in the same trimmed-truthy check so an empty string never produces an `<a>`.

## 2. `src/components/sections/HeroSection.tsx` — Mobile layout + "mise en place" overflow

**Bugs:**
- On mobile, the right ambient panel takes `60vh` and pushes the hero to ~160vh total — feels broken on phones.
- `font-size: 15vw` with `whitespace-nowrap` makes "mise en place" wider than the viewport on narrow screens, causing horizontal scroll (the parent has no `overflow-hidden` on the inner grid, only the section).

**Fixes:**
- Hide the right ambient column on mobile (`hidden lg:block`) so the hero is a clean single column on phones. Keep it as-is on `lg+`.
- Reduce min-height on mobile: change grid from `min-h-screen` to `min-h-[80vh] lg:min-h-screen` and tighten `py-24` to `py-20 lg:py-24`.
- Add `overflow-hidden` to the ambient panel itself (belt-and-suspenders, since the section already has it) and clamp the ambient text size: `fontSize: clamp(6rem, 12vw, 14rem)` so it never exceeds the panel width.

## 3. `src/components/sections/ContactSection.tsx` — "bon appétit" overflow

**Bug:** The `8rem` absolute-positioned italic word sits inside a relative container with no overflow clipping. On narrow viewports (and even desktop ~<500px column width), it overflows horizontally and can trigger page-level horizontal scroll. It also sits above the form on mobile because the left column stacks first.

**Fixes:**
- Add `overflow-hidden` to the left column wrapper so the ambient word is clipped to its column.
- Clamp ambient size: `fontSize: clamp(4rem, 10vw, 8rem)` so it scales down on small screens.
- Add `whitespace-nowrap` plus `left-0 top-0` explicit positioning so it anchors predictably.

## Out of scope

- No changes to design tokens, copy, animation easing, or other sections.
- No changes to `projects.json` (empty github strings stay; the card just won't render dead links).
- No new components.

## Files touched

- `src/components/RecipeCard.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/ContactSection.tsx`
