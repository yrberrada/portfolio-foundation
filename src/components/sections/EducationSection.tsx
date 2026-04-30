import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const COURSEWORK = [
  "Operating Systems",
  "Database Management Systems",
  "Artificial Intelligence",
  "Computer Architecture",
  "Computer Security",
];

const EducationSection = () => {
  const reduce = useReducedMotion();

  return (
    <section id="education" className="py-16 md:py-20">
      <div className="container-x">
        <p className="section-label mb-3">The Training</p>
        <h2
          className="font-display pb-3 mb-10"
          style={{
            color: "var(--text)",
            fontWeight: 700,
            fontSize: "2rem",
            borderBottom: "2px solid var(--border)",
          }}
        >
          Education
        </h2>

        <motion.article
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderLeft: "2px solid var(--accent)",
            borderRadius: "var(--radius)",
            padding: "2rem",
          }}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h3
            className="font-display"
            style={{ color: "var(--text)", fontWeight: 700, fontSize: "1.1rem" }}
          >
            University of Minnesota Duluth
          </h3>

          <p
            className="font-sans mt-1"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              fontWeight: 400,
            }}
          >
            B.S., Computer Science — Minor in Mathematics
          </p>

          <p
            className="font-mono mt-0.5"
            style={{
              color: "var(--text-dim)",
              fontSize: "0.75rem",
              fontWeight: 400,
            }}
          >
            2019 – 2025 · Duluth, MN
          </p>

          <div
            className="my-4 h-px"
            style={{ backgroundColor: "var(--border)" }}
          />

          <p
            className="font-mono uppercase mb-2"
            style={{
              color: "var(--text-dim)",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
            }}
          >
            Coursework
          </p>

          <div className="flex flex-wrap gap-2">
            {COURSEWORK.map((c) => (
              <span
                key={c}
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
                {c}
              </span>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default EducationSection;
