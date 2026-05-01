## Goal

Reconcile the live site content with the latest resume (`Yassine_resume.pdf`). The design system, layouts, and all Prompts A–I work stay untouched — this is a content-only pass.

## Diff: resume vs. current site

**New on resume, missing from site:**
- Second experience entry: **University of Minnesota Duluth — STEM Tutor** (Apr 2021 – Nov 2022).
- New project: **AI Interactive Narrative Engine** (Next.js, scene-tree state machine, LLM tone adaptation).
- New project: **Solar Wind Data Parser (C++)** — 1M+ NASA dataset entries, 40% query-time reduction.
- Updated summary line: explicit mention of "B.S. in Computer Science" and "Authorized to work in the U.S. under OPT."
- Skills additions: **C#, Kotlin**, **.NET / ASP.NET Core**, **Flutter**, **Android (Kotlin/Dart)**, **Azure**, **VS Code**, **Schema Design**, **Prompt Engineering**, **Technical Documentation (MAD/PRD/TAD)**.
- Pulse multi-view detail: list views explicitly (Week/Month/Day/Sprint/Agenda).
- Symphony on-site go-live framed as separate bullet (3-day on-site, 14 dept. leads through UAT, MAD v3.0 40+ pages).

**On site, not on resume — keep as-is:**
- "Currently building at Go Optimal, shipping real products for real clients." (hero tagline — site voice).
- Cooking-metaphor section labels.

## Changes

### 1. `src/components/sections/HeroSection.tsx`
Update the bio paragraph to lead with the credential + OPT line from the resume summary, while keeping the cooking-free site voice:

> "Full-stack developer with a B.S. in Computer Science, building production systems end-to-end — from database schema and RLS design to pixel-accurate UI. Currently building at Go Optimal, shipping real products for real clients. Authorized to work in the U.S. under OPT."

### 2. `src/components/sections/ExperienceSection.tsx`
- Update the **Go Optimal** Pulse bullet to include the explicit view list: "multi-view timeline (Week/Month/Day/Sprint/Agenda)…".
- Split the Symphony work into two bullets to match the resume: (a) co-architecture + 9-endpoint API, (b) the 3-day on-site go-live + MAD v3.0 (40+ pages) supporting 14 dept. leads through UAT.
- Keep the TGI bullet, expand to match resume wording (G45X 6-week drip-lock; Beginnings 30 lessons / 3 books).
- Keep the diagnostic/fix bullet (already matches resume).
- Add a **second `KitchenCard`** below Go Optimal:
  - Company: "University of Minnesota Duluth"
  - Role: "STEM Tutor"
  - Stack: "Mathematics · Statistics · Physics · Chemistry"
  - Period: "Apr 2021 – Nov 2022"
  - Bullets: the two from the resume (3–4 hrs/week + SSP 3003 training; communicating technical concepts to non-technical audiences).

### 3. `src/content/projects.json`
Reorder and rewrite to match the resume's project list, while preserving the `featured` flag on Pulse and Symphony (which stay top items in the Experience-driven projects section). The resume "Projects" list maps to the non-Go-Optimal cards. Final entries (in render order):

1. Pulse — Project Intelligence (`featured: true`, keep)
2. Symphony Operations (`featured: true`, keep)
3. TGI Progressions Builder (keep)
4. Full-Stack Intranet Platform (keep, refresh tagline to mention 14+ models, 40% query-complexity reduction, NextAuth RBAC admin/manager/staff)
5. **AI Interactive Narrative Engine** (NEW) — tagline: "Next.js engine adapting tone via LLM prompts. Scene-tree state machine with persistent state and branching dialogue." Tech: Next.js, TypeScript, LLM. `serves`: "Interactive fiction prototype". `image: ""`.
6. JobFlow Notion Sync API (keep)
7. Baseball Player Database (keep)
8. **Solar Wind Data Parser (C++)** (NEW) — tagline: "Parser for 1M+ NASA dataset entries. 40% query-time reduction via modular C++ OOP (SOLID, factory patterns)." Tech: C++, OOP, SOLID. `serves`: "NASA dataset analysis". `image: ""`.

All new entries get `image: ""` (consistent with the placeholder strategy from Prompt G) and no `featured` flag.

### 4. `src/content/skills.json`
Update each group to match the resume's broader stack:

- **Languages:** Go, Java, JavaScript, TypeScript, Python, C++, C#, SQL, Dart, Kotlin
- **Frontend & UI:** React, Next.js, Tailwind CSS, Framer Motion, Flutter, Android (Kotlin/Dart), Lovable
- **Backend & APIs:** Node.js, FastAPI, REST APIs, .NET / ASP.NET Core, Prisma ORM, NextAuth, Express.js, Supabase Edge Functions
- **Databases:** PostgreSQL, Supabase (RLS), SQLite, MongoDB, Firestore, Schema Design
- **Tools & Platforms:** Git, GitHub, Unix/Linux, VS Code, Firebase, AWS (S3/IAM), Azure, Vercel, Figma, Lovable
- **Practices:** Agile/Scrum, Technical Documentation (MAD/PRD/TAD), Stakeholder Management, AI-assisted Development, Prompt Engineering

### 5. `src/components/sections/EducationSection.tsx`
No structural change. Coursework list already matches the resume (Operating Systems, DBMS, AI, Computer Architecture, Computer Security). Leave as-is.

### 6. `public/resume.pdf`
Replace with the freshly uploaded `Yassine_resume.pdf` so the "Download Recipe" button serves the latest version.

## Out of scope

- No design, layout, animation, or component-API changes.
- No edits to `index.html`, footer, contact form, or nav.
- No new project images yet (`image: ""` placeholders kept per Prompt G).
