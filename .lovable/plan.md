# Prompt B — Animation & Hover System

Consolidate ad-hoc DOM mutations into Framer Motion variants, fix KitchenCard accent-bar timing, and add proper enter/exit animation to the mobile nav dropdown.

## 1. `src/components/RecipeCard.tsx` — Hover via Framer variants

**Current:** Hover does two things — `whileHover={{ scale: 1.015 }}` (Framer) AND `onMouseEnter/Leave` directly mutating `borderColor`. Mixing imperative DOM mutation with Framer transforms causes jank and isn't reduced-motion aware for the border.

**Fix:**
- Replace `onMouseEnter`/`onMouseLeave` with Framer `variants` + `whileHover`.
- Define `cardVariants = { rest: { scale: 1, borderColor: "var(--border)" }, hover: { scale: 1.015, borderColor: "var(--border-warm)" } }`.
- Set `initial="rest"`, `whileHover={reduce ? undefined : "hover"}`, `transition={{ duration: 0.2, ease: "easeOut" }}`.
- Remove inline `borderColor` from `style` (variants own it). Keep border width/style on the element.
- Drop the redundant `transition-colors` Tailwind class.

## 2. `src/components/PantryCard.tsx` — Hover via Framer variants

**Current:** Same pattern — imperative `onMouseEnter/Leave` swapping `borderColor`.

**Fix:**
- Add `whileHover` with a variants object: `{ rest: { borderColor: "var(--border)", y: 0 }, hover: { borderColor: "var(--border-warm)", y: -2 } }`.
- Subtle 2px lift on hover for parity with RecipeCard's scale, gated by `reduce`.
- Remove the imperative handlers and the `transition-colors` class.

## 3. `src/components/KitchenCard.tsx` — Accent bar delay

**Current:** The vertical accent bar uses its own `whileInView` with `viewport={{ amount: 0.2 }}`, which can fire before the parent article's enter animation completes — the bar appears before the card content settles, looking out of sync.

**Fix:**
- Drive the accent bar from the parent's animation orchestration using `variants`:
  - Parent variants: `{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, when: "beforeChildren", staggerChildren: 0.1 } } }`.
  - Bar variants: `{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.4, ease: "easeOut", delay: 0.15 } } }`.
- Parent uses `initial="hidden"`, `whileInView="show"`, `viewport={{ once: true, amount: 0.2 }}`. Bar uses `variants={barVariants}` only — no own `whileInView`.
- This guarantees the bar grows after the card has faded/translated in.

## 4. `src/components/layout/SiteNav.tsx` — Mobile nav AnimatePresence

**Current:** The mobile dropdown is `{open && <div>...</div>}` — pops in/out instantly with no exit animation. Feels broken next to the rest of the site.

**Fix:**
- Wrap the dropdown in `<AnimatePresence>` and convert the `<div>` to `<motion.div>`.
- Variants: `initial={{ opacity: 0, y: -8 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -8 }}`, `transition={{ duration: 0.2, ease: "easeOut" }}`.
- Respect `useReducedMotion()` — if reduced, skip the y translate (opacity only) or use `initial={false}`.
- Hamburger icon: animate the three bars to a subtle "X" hint by rotating top/bottom bars when `open` (top: rotate 45deg + translateY ~8px; middle: opacity 0; bottom: rotate -45deg + translateY -8px). Use Framer `animate` props on each `motion.span`. Keep reduced-motion aware (snap, no transition).

## Out of scope

- No design token, content, copy, or layout changes.
- No changes to other section files or `Index.tsx`.
- No changes to the desktop nav active-underline behavior.

## Files touched

- `src/components/RecipeCard.tsx`
- `src/components/PantryCard.tsx`
- `src/components/KitchenCard.tsx`
- `src/components/layout/SiteNav.tsx`
