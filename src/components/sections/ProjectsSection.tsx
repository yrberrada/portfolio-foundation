import { motion, useReducedMotion } from "framer-motion";
import RecipeCard from "@/components/RecipeCard";
import projects from "@/content/projects.json";

interface Project {
  title: string;
  tagline: string;
  serves: string;
  tech: string[];
  links?: { github?: string; live?: string };
  image?: string;
  featured?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const ProjectsSection = () => {
  // Featured items render first so the showcase sits at the top.
  const items = [...(projects as Project[])].sort((a, b) => {
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="pt-20 pb-28 md:pt-24 md:pb-32">
      <div className="container-x">
        <motion.p
          className="section-label mb-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Tonight's Menu
        </motion.p>
        <motion.h2
          className="font-display pb-3 mb-3"
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
          Projects
        </motion.h2>
        <motion.p
          className="font-sans mb-10"
          style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
        >
          A selection of work shipped for real clients and real teams.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {items.map((p, i) => (
            <div
              key={p.title}
              className={
                p.featured
                  ? "sm:col-span-2 lg:col-span-3"
                  : "sm:col-span-1 lg:col-span-2"
              }
            >
              <RecipeCard
                index={i}
                title={p.title}
                tagline={p.tagline}
                serves={p.serves}
                tech={p.tech}
                links={p.links}
                image={p.image}
                featured={p.featured}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
