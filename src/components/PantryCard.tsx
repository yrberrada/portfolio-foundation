import { motion, useReducedMotion } from "framer-motion";

interface PantryCardProps {
  group: string;
  items: string[];
  index?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const PantryCard = ({ group, items, index = 0 }: PantryCardProps) => {
  const reduce = useReducedMotion();

  const restState = { borderColor: "rgba(240, 235, 224, 0.08)", y: 0 };
  const hoverState = { borderColor: "rgba(232, 164, 74, 0.20)", y: -2 };

  return (
    <motion.article
      style={{
        backgroundColor: "var(--bg-surface)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "var(--radius)",
        padding: "1.25rem",
      }}
      initial={reduce ? false : { opacity: 0, y: 15, ...restState }}
      whileInView={{ opacity: 1, ...restState }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      whileHover={reduce ? undefined : hoverState}
    >
      <h3
        className="font-sans"
        style={{ color: "var(--text)", fontWeight: 500, fontSize: "0.9rem" }}
      >
        {group}
      </h3>
      <div
        className="mt-1.5 mb-3 h-px"
        style={{ backgroundColor: "var(--border)", width: "30%" }}
      />

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
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
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
};

export default PantryCard;
