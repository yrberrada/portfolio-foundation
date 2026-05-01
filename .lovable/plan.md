## Hero Upgrade — Conveyor of Plates

Replace the right-side "mise en place" panel with a 3D **conveyor of restaurant plates**, each plate textured with a real top-down food photo. Plates drift horizontally across the panel like a tasting-menu / kaiten-sushi flow. Desktop only; mobile keeps the current ambient panel (or hides it as today).

### What it looks like

```text
┌─────────────────────────────┬────────────────────────────────┐
│  Yassine Berrada Rekhami    │   ◯  ◯   ◯    ◯   ◯           │
│  Full-Stack Developer …     │  → plates drift left → … →     │
│  [See the Menu] [Download]  │   soft warm radial glow bg     │
└─────────────────────────────┴────────────────────────────────┘
```

- Each plate = thin 3D disc (CylinderGeometry, very low height) tilted ~20° toward camera.
- Top face uses a food photo as texture; rim is a warm off-white ceramic material.
- Plates loop horizontally: when one exits left, it wraps back to the right (seamless conveyor).
- Subtle vertical bob + slow self-rotation per plate so it doesn't feel mechanical.
- Soft warm radial gradient stays behind the canvas; faint "mise en place" wordmark removed (replaced by the conveyor).
- Respects `prefers-reduced-motion`: pauses the conveyor, plates stay static.

### Plates / food

6 plates, top-down food photos from Unsplash (stable, hotlinkable URLs):

1. Pasta with herbs
2. Steak with garnish
3. Sushi platter
4. Salad bowl
5. Dessert / tart
6. Soup with toppings

(Exact URLs picked from Unsplash food collection; all served via `https://images.unsplash.com/...` with `?auto=format&w=512&q=70` for fast load.)

### Technical plan

**Dependencies (pinned for React 18):**
- `three@^0.160`
- `@react-three/fiber@^8.18`
- `@react-three/drei@^9.122` (for `useTexture`, `OrbitControls`-free helpers)

**New files:**
- `src/components/hero/PlateConveyor.tsx` — R3F `<Canvas>` scene
  - `<Plate>` subcomponent: tilted disc, food texture on top face, ceramic rim
  - Conveyor logic in `useFrame`: advance `x`, wrap when `x < -bound`
  - 6 plates spaced evenly, staggered Y bob via per-plate phase offset
  - `dpr={[1, 1.5]}` cap, `frameloop="demand"` paused on `prefers-reduced-motion`
- `src/components/hero/plates.ts` — array of `{ id, image, alt }`

**Edited files:**
- `src/components/sections/HeroSection.tsx`
  - Right column: replace the radial-gradient + "mise en place" `<span>` with `<PlateConveyor />` (lazy-loaded via `React.lazy` + `<Suspense fallback={null}>` so three.js doesn't block initial paint)
  - Keep `hidden lg:block` so it stays desktop-only
  - Keep the existing radial-gradient background **behind** the canvas (canvas is transparent)

**Performance notes:**
- Canvas is `gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}`, transparent background.
- Textures loaded once via `useTexture` (drei) and shared.
- No shadows, no post-processing — keeps GPU cost minimal.
- Lazy import keeps three.js (~150 kb gz) out of the initial bundle.

### Complexity

**Low–medium.** ~150 lines of new code, one section edit, three deps. No backend, no asset pipeline — Unsplash URLs handle imagery. Most risk is texture load timing; handled with `<Suspense>`.

### Out of scope (ask if you want any of these)

- Real GLTF plate models with PBR ceramic
- Mouse-parallax / scroll-driven speed
- Plates clickable → open project recipe
