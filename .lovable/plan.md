# Prompt C — Polish & Missing Animations

Add scroll-tied progress bar to the nav, animate the "Where I've Cooked" and "Tonight's Menu" section headers on enter, and clean up the Hero CTA hovers to use Framer instead of imperative DOM mutation.

## 1. `src/components/layout/SiteNav.tsx` — Scroll progress bar

- Import `useScroll`, `useSpring` from `framer-motion`.
- Inside `SiteNav`: `const { scrollYProgress } = useScroll();` and `const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });` (skip the spring if `useReducedMotion()` returns true — bind `scaleX` directly to `scrollYProgress`).
- Render a 2px-tall `<motion.div>` at the bottom edge of the sticky `<header>`:
  - `position: absolute; bottom: 0; left: 0; right: 0; height: 2px; transformOrigin: 0% 50%; backgroundColor: var(--accent);`
  - `style={{ scaleX }}`
  - `aria-hidden="true"`
- Place it as the last child of the `<header>` (after the `<AnimatePresence>` block) so it sits visually beneath the nav row but above content.

## 2. `src/components/sections/ExperienceSection.tsx` — Header enter animation

- Convert the section-label `<p>` and the H2 to `motion.p` / `motion.h2`.
- Wrap them in a `motion.div` with `variants` and `staggerChildren`, OR give each its own `whileInView`:
  - Pattern (matches site): `initial={reduce ? false : { opacity: 0, y: 16 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.4 }}`, `transition={{ duration: 0.5, ease: EASE }}` for the label, and `delay: 0.08` for the H2.
- Add `import { motion, useReducedMotion } from "framer-motion";` and the shared `EASE = [0.22, 1, 0.36, 1] as const;`.

## 3. `src/components/sections/ProjectsSection.tsx` — Header enter animation

- Same treatment as ExperienceSection: animate the section-label, the H2, and the descriptive paragraph below the H2 with the same variants pattern and a small staggered delay (0, 0.08, 0.14).
- Add the framer-motion import + `EASE` constant.
- Keep `RecipeCard` children untouched — they already self-animate via `whileInView` with their own index-based delay.

## 4. `src/components/sections/HeroSection.tsx` — CTA hover cleanup

- Remove the `onMouseEnter`/`onMouseLeave` handlers on both CTAs.
- Convert both `<a>` tags to `motion.a` and use `whileHover` with a `backgroundColor` (and for the secondary CTA, `borderColor`) target.
  - Primary "See the Menu": rest `backgroundColor: "rgb(216, 110, 51)"` (var(--accent) literal — see note); hover `backgroundColor: "rgb(194, 90, 38)"`. Use `transition={{ duration: 0.2, ease: "easeOut" }}`.
  - Secondary "Download Recipe": rest `backgroundColor: "rgba(0,0,0,0)"`; hover `backgroundColor: "rgba(255,255,255,0.04)"` (matches `--bg-raised` brightness).
- Gate hover with `reduce ? undefined : {...}`. Drop the `transition-colors` Tailwind class (Framer owns it now).
- **Color literal note:** Framer cannot animate CSS `var(--…)`. Read the actual values from `src/index.css` for `--accent`, `#c25a26`, `--bg-raised`, and inline them as literal `rgb()/rgba()` strings so the animation works. Confirm exact values before editing.

## Out of scope

- No changes to other sections, design tokens, content, or copy.
- No changes to RecipeCard / KitchenCard / PantryCard internals.
- No new sections.

## Files touched

- `src/components/layout/SiteNav.tsx`
- `src/components/sections/ExperienceSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/HeroSection.tsx`
