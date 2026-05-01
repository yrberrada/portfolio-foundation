## Goal

Replace the downloadable resume served by the "Download Recipe" button on the hero with the newly uploaded `Yassine_resume-2.pdf`.

## Change

- Copy `user-uploads://Yassine_resume-2.pdf` → `public/resume.pdf` (overwrite).

That's it. The hero CTA already points to `/resume.pdf`, so no code changes are needed.

## Out of scope

- No site content updates (hero bio, experience, projects, skills) — this is just swapping the downloadable file.
