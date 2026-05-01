## Goal

Replace `public/resume.pdf` with the newly uploaded `yassine_resume.pdf` so the hero "Download Recipe" CTA serves the correct file.

## Change

- Overwrite `public/resume.pdf` with `user-uploads://yassine_resume.pdf`.

No code changes — the link in `HeroSection.tsx` already points to `/resume.pdf`.
