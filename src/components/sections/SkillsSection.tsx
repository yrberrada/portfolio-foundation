import PantryCard from "@/components/PantryCard";
import skills from "@/content/skills.json";

interface SkillGroup {
  group: string;
  items: string[];
}

const SkillsSection = () => {
  const groups = skills as SkillGroup[];

  return (
    <section id="skills" className="py-16 md:py-20">
      <div className="container-x">
        <p className="section-label mb-3">The Pantry</p>
        <h2
          className="font-display pb-3 mb-3"
          style={{
            color: "var(--text)",
            fontWeight: 700,
            fontSize: "2rem",
            borderBottom: "2px solid var(--border)",
          }}
        >
          Skills
        </h2>
        <p
          className="font-sans mb-8"
          style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}
        >
          Stocked and ready. The full ingredient list.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g, i) => (
            <PantryCard key={g.group} index={i} group={g.group} items={g.items} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
