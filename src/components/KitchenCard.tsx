import { motion, useReducedMotion } from "framer-motion";

interface KitchenCardProps {
  company: string;
  role: string;
  stack: string;
  period: string;
  bullets: string[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

const KitchenCard = ({ company, role, stack, period, bullets }: KitchenCardProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="relative pl-6 py-4"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
        style={{ backgroundColor: "var(--accent)" }}
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <h3
        className="font-display"
        style={{ color: "var(--text)", fontWeight: 700, fontSize: "1.1rem" }}
      >
        {company}
      </h3>

      <div
        className="flex justify-between items-baseline gap-4 font-sans mt-0.5"
        style={{ color: "var(--text-muted)", fontSize: "0.875rem", fontWeight: 400 }}
      >
        <span>{role}</span>
        <span className="shrink-0">{period}</span>
      </div>

      <p
        className="font-mono mt-1"
        style={{ color: "var(--text-dim)", fontSize: "0.75rem", fontWeight: 400 }}
      >
        {stack}
      </p>

      <ul className="mt-3 flex flex-col gap-1.5">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="font-sans flex gap-3"
            style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.5, fontWeight: 400 }}
          >
            <span aria-hidden="true" style={{ color: "var(--accent-warm)" }}>—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
};

export default KitchenCard;
