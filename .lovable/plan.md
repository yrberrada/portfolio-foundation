# Prompt D — Fonts + Meta

Two small fixes: load the Playfair Display italic faces that the hero/contact background text actually uses, and clean up the page meta so the title, description, and social cards reflect the real owner instead of placeholder Lovable values.

## 1. `src/index.css` — Add Playfair Display italic

**Current import (line 1):**

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap');
```

The hero ("mise en place") and contact ("bon appétit") sections render Playfair Display in italic, but only roman weights are loaded — the browser is faux-italicising the glyphs.

**Replace with:**

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700;1,900&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap');
```

This adds true italic 400 / 700 / 900 for Playfair Display while keeping the existing roman 700 / 900. No other CSS changes needed.

## 2. `index.html` — Title and OG tags

Currently:
- `og:url` points to the preview Lovable URL with a TODO.
- `og:image` and `twitter:image` use `lovable.dev/opengraph-image-p98pqg.png` (generic Lovable placeholder).
- `twitter:site` has a placeholder TODO and no actual handle.
- No `og:site_name`, no `twitter:title`, no `twitter:description`, no canonical link.

**Changes:**

- Keep the existing `<title>` and `<meta name="description">` (already correct).
- Add `<link rel="canonical" href="..." />` matching the `og:url`.
- Add `<meta property="og:site_name" content="Yassine Berrada Rekhami" />`.
- Add `<meta property="og:locale" content="en_US" />`.
- Add `<meta property="og:image:alt" content="Yassine Berrada Rekhami — Full-Stack Developer & Designer" />`.
- Add `<meta name="twitter:title" content="Yassine Berrada Rekhami — Full-Stack Developer & Designer" />` and matching `twitter:description`.
- Replace the Lovable `og:image` / `twitter:image` URL with `/og-image.png` (relative — resolves against the deployed origin). Add a TODO comment above instructing the owner to drop a 1200×630 `og-image.png` into `public/` (and noting that until then social cards will 404 the image).
- Keep the `og:url` TODO comment but tighten the wording.
- Remove the `twitter:site` TODO line entirely (it's optional metadata and currently just dead text). The owner can re-add it later if they create a Twitter/X handle.

## Out of scope

- No design token changes.
- No JS / component changes.
- No new sections.
- Not creating an actual `og-image.png` — the user/owner needs to provide it.

## Files touched

- `src/index.css`
- `index.html`
