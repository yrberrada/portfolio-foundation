import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface RecipeCardProps {
  title: string;
  tagline: string;
  serves: string;
  tech: string[];
  links?: { github?: string; live?: string };
  image?: string;
  featured?: boolean;
  index?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const RecipeCard = ({
  title,
  tagline,
  serves,
  tech,
  links,
  image,
  featured = false,
  index = 0,
}: RecipeCardProps) => {
  const reduce = useReducedMotion();

  const restBorder = featured
    ? "rgba(232, 164, 74, 0.12)"
    : "rgba(240, 235, 224, 0.08)";

  const hoverVariants = {
    rest: { scale: 1, borderColor: restBorder },
    hover: { scale: 1.015, borderColor: "rgba(232, 164, 74, 0.20)" },
  };

  return (
    <motion.article
      className="group relative overflow-hidden flex flex-col h-full"
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
      {image && (
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16 / 10",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <motion.img
            src={image}
            alt={`${title} preview`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover block"
            initial={false}
            whileHover={reduce ? undefined : { scale: 1.02 }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {featured && (
          <p
            className="font-mono uppercase mb-1"
            style={{
              color: "var(--accent-warm)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
            }}
          >
            Featured
          </p>
        )}

        <h3
          className="font-display"
          style={{
            color: "var(--text)",
            fontWeight: 700,
            fontSize: featured ? "1.25rem" : "1.1rem",
          }}
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
      </div>
    </motion.article>
  );
};

export default RecipeCard;
