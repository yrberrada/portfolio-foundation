## Wire up resume download

The Hero section already links to `/resume.pdf` but the file doesn't exist in `public/`. The user uploaded `yassine_resume_v3.pdf` — copy it into place and clean up the TODO comment.

### Steps

1. **Copy the uploaded PDF** to `public/resume.pdf`
   - `code--copy user-uploads://yassine_resume_v3.pdf public/resume.pdf`
   - Vite serves `public/` at the site root, so `/resume.pdf` will resolve correctly.

2. **Remove the TODO comment** in `src/components/sections/HeroSection.tsx`
   - Delete the `// TODO: Add resume PDF to public/...` line directly above the `<a href="/resume.pdf">` element.
   - Leave the link, label ("Download Recipe"), and styling untouched.

### Files touched
- `public/resume.pdf` (new — copied from upload)
- `src/components/sections/HeroSection.tsx` (remove one comment line)

### Files NOT touched
Everything else — no design tokens, no other sections, no nav/footer changes.
