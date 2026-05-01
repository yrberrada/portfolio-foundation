import { motion, useReducedMotion } from "framer-motion";
import KitchenCard from "@/components/KitchenCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const ExperienceSection = () => {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="container-x">
        <motion.p
          className="section-label mb-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Where I've Cooked
        </motion.p>
        <motion.h2
          className="font-display pb-3 mb-10"
          style={{
            color: "var(--text)",
            fontWeight: 700,
            fontSize: "2rem",
            borderBottom: "2px solid var(--border)",
          }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
        >
          Experience
        </motion.h2>

        <KitchenCard
          company="Go Optimal"
          role="Full-Stack Developer & Designer"
          stack="React · TypeScript · Next.js · Supabase · PostgreSQL · Node.js · Tailwind · Lovable"
          period="2025 – Present"
          bullets={[
            "Built Pulse — internal Gantt project management platform; multi-view timeline (Week/Month/Day/Sprint/Agenda), drag-and-drop persistence via PostgreSQL, Google OAuth with RLS-scoped access, and continuous zoom. Delivered MAD, PRD, and TAD across two sprint cycles.",
            "Co-architected Symphony Operations for Allied Electric Sign ($16M/yr) — rule-based production scheduling engine across 11 departments; designed a 9-endpoint API surface (5 REST + 4 webhooks) bridging two Supabase projects with a field-mapping translation layer.",
            "Participated in 3-day on-site go-live at Allied's facility, supporting 14 dept. leads through UAT and live deployment; co-authored MAD v3.0 (40+ pages) used as source of truth across engineering and client teams.",
            "Built TGI Progressions Builder App — course player for 2 courses (G45X: 45 lessons / 6-week drip-lock; Beginnings: 30 lessons / 3 books), Admin CRUD with Supabase edge-function YouTube playlist import, and 3 marketing sales pages deployed to production.",
            "Resolved CSS class-prefix mismatch silently breaking all @media 768px breakpoints across 2 client pages; fixed Supabase RLS silent failure and React state race condition causing Gantt positions to drop on first render.",
          ]}
        />

        <div className="mt-10">
          <KitchenCard
            company="University of Minnesota Duluth"
            role="STEM Tutor"
            stack="Mathematics · Statistics · Physics · Chemistry"
            period="Apr 2021 – Nov 2022"
            bullets={[
              "Delivered 3–4 hrs/week of tutoring across math, stats, physics, and chemistry; completed SSP 3003 Peer Tutor Pedagogy training in tutoring strategies and communication.",
              "Improved student quantitative reasoning and coursework performance; built durable skill in translating complex technical concepts for non-technical audiences.",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
