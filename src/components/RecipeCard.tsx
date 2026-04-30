import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface RecipeCardProps {
  title: string;
  tagline: string;
  serves: string;
  tech: string[];
  links?: { github?: string; live?: string };
  index?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const RecipeCard = ({ title, tagline, serves, tech, links, index = 0 }: RecipeCardProps) => {
  const reduce = useReducedMotion();

  const hoverVariants = {
    rest: { scale: 1, borderColor: "hsl(0 0% 100% / 0.06)" },
    hover: { scale: 1.015, borderColor: "hsl(28 60% 55% / 0.35)" },
  };

  return (
    <motion.article
      className="group relative p-6"
      style={{
        background:
          "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-raised) 100%)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "var(--radius)",
      }}
      initial={reduce ? false : { opacity: 0, y: 20, ...hoverVariants.rest }}
      whileInView={{ opacity: 1, y: 0, ...hoverVariants.rest }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
      whileHover={reduce ? undefined : hoverVariants.hover}
    >
      <h3
        className="font-display"
        style={{ color: "var(--text)", fontWeight: 700, fontSize: "1.1rem" }}
      >
        {title}
      </h3>

      <p
        className="font-sans mt-1"
        style={{
          color: "var(--text-muted)",
          fontSize: "0.875rem",
          fontWeight: 400,
          lineHeight: 1.5,
        }}
      >
        {tagline}
      </p>

      <p
        className="font-mono mt-2"
        style={{ color: "var(--text-dim)", fontSize: "0.75rem", fontWeight: 400 }}
      >
        serves <span style={{ color: "var(--accent-warm)" }}>·</span> {serves}
      </p>

      <div className="my-3 h-px" style={{ backgroundColor: "var(--border)" }} />

      <p
        className="font-mono uppercase mb-1.5"
        style={{
          color: "var(--text-dim)",
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
        }}
      >
        Ingredients
      </p>

      <div className="flex flex-wrap gap-1.5">
        {tech.map((t) => (
          <span
            key={t}
            className="font-mono px-2 py-0.5"
            style={{
              fontSize: "0.7rem",
              fontWeight: 400,
              backgroundColor: "var(--accent-dim)",
              color: "var(--accent-warm)",
              border: "1px solid rgba(232,164,74,0.15)",
              borderRadius: "4px",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {(links?.github?.trim() || links?.live?.trim()) && (
        <div className="mt-4 flex gap-4">
          {links.live?.trim() && (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans inline-flex items-center gap-1 transition-colors"
              style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 400 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Live <ArrowUpRight size={12} />
            </a>
          )}
          {links.github?.trim() && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans inline-flex items-center gap-1 transition-colors"
              style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 400 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              GitHub <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
};

export default RecipeCard;
