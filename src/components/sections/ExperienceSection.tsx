import KitchenCard from "@/components/KitchenCard";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container-x">
        <p className="section-label mb-3">Where I've Cooked</p>
        <h2
          className="font-display pb-3 mb-10"
          style={{
            color: "var(--text)",
            fontWeight: 700,
            fontSize: "2rem",
            borderBottom: "2px solid var(--border)",
          }}
        >
          Experience
        </h2>

        <KitchenCard
          company="Go Optimal"
          role="Full-Stack Developer & Designer"
          stack="React · TypeScript · Next.js · Supabase · PostgreSQL · Node.js · Tailwind · Lovable"
          period="2025 – Present"
          bullets={[
            "Built Pulse — internal Gantt project management platform; multi-view timeline, drag-and-drop persistence via PostgreSQL, Google OAuth with RLS-scoped access, and continuous zoom. Delivered MAD, PRD, and TAD across two sprint cycles.",
            "Co-architected Symphony Operations for Allied Electric Sign ($16M/yr) — rule-based production scheduling engine across 11 departments; 9-endpoint API surface (5 REST + 4 webhooks) bridging two Supabase projects with a field-mapping translation layer. Participated in 3-day on-site go-live.",
            "Built TGI Progressions Builder App — course player for 2 courses (G45X: 45 lessons / drip-lock; Beginnings: 30 lessons), Admin CRUD with Supabase edge-function YouTube import, and 3 marketing sales pages deployed to production.",
            "Diagnosed and resolved CSS class-prefix mismatch silently breaking all mobile breakpoints across 2 client pages; fixed Supabase RLS silent failure and React state race condition causing data loss on first render.",
          ]}
        />
      </div>
    </section>
  );
};

export default ExperienceSection;
