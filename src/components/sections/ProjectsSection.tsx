import RecipeCard from "@/components/RecipeCard";
import projects from "@/content/projects.json";

interface Project {
  title: string;
  tagline: string;
  serves: string;
  tech: string[];
  links?: { github?: string; live?: string };
}

const ProjectsSection = () => {
  const items = projects as Project[];

  return (
    <section id="projects" className="py-20">
      <div className="container-x">
        <p className="section-label mb-3">Tonight's Menu</p>
        <h2
          className="font-display pb-3 mb-3"
          style={{
            color: "var(--text)",
            fontWeight: 700,
            fontSize: "2rem",
            borderBottom: "2px solid var(--border)",
          }}
        >
          Projects
        </h2>
        <p
          className="font-sans mb-10"
          style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}
        >
          A selection of work shipped for real clients and real teams.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p, i) => (
            <RecipeCard
              key={p.title}
              index={i}
              title={p.title}
              tagline={p.tagline}
              serves={p.serves}
              tech={p.tech}
              links={p.links}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
