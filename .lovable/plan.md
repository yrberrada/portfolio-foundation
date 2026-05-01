## Add overlay CTA on plate conveyor

Add a centered "View Tonight's Menu" call-to-action overlaying the 3D plate conveyor on the right side of the Hero. Clicking it smooth-scrolls to the `#projects` section.

### Changes

**File: `src/components/sections/HeroSection.tsx`**

Inside the right-side `<motion.div>` that holds `<PlateConveyor />`, add a sibling overlay layer positioned above the canvas:

- Wrap the existing `<Suspense><PlateConveyor /></Suspense>` and the new overlay in the same parent (already exists).
- Add an absolutely-positioned flex container centered over the canvas containing:
  - A small "Tonight's Tasting" eyebrow label (uses `section-label` class for consistency).
  - An anchor `<a href="#projects">` styled like the existing "See the Menu" button (warm orange `#d4622a`, `var(--radius-sm)`, same padding/font), labeled **"View Tonight's Menu"**.
  - A subtle radial vignette behind the CTA (`bg-[radial-gradient(...)]` or inline gradient) so the text stays legible against moving plates.
- Use `pointer-events-none` on the wrapper and `pointer-events-auto` on the CTA so the canvas underneath isn't blocked elsewhere.
- Animate in with framer-motion (fade + slight y), respecting `useReducedMotion` (already imported).
- Remove `aria-hidden="true"` from the right column (it now contains an interactive control).

### Technical notes

- Smooth scrolling: the project already uses anchor links like `#projects` (see existing "See the Menu" button), so a plain `<a href="#projects">` is consistent. No JS scroll handler needed unless we want to override.
- z-index: overlay sits above the `<Canvas>` via `absolute inset-0 z-10`.
- Desktop-only: parent already has `hidden lg:block`, so the CTA inherits that visibility automatically.
- No new dependencies, no new files.

### Acceptance

- On desktop (≥lg), a centered "View Tonight's Menu" button appears over the plate conveyor.
- Clicking it jumps to the Projects section.
- Plates remain visible and animating behind it.
- Hidden on mobile (parent column is hidden).
- Reduced-motion users see the CTA without entrance animation.
