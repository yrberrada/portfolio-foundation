import { motion, useReducedMotion } from "framer-motion";
import { Suspense, lazy } from "react";

const PlateConveyor = lazy(() => import("@/components/hero/PlateConveyor"));

const EASE = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {
  const reduce = useReducedMotion();
  const initial = <T extends object>(v: T): T | false => (reduce ? false : v);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <div className="container-x grid min-h-[80vh] lg:min-h-screen grid-cols-1 items-center gap-12 py-20 lg:py-24 lg:grid-cols-2">
        {/* LEFT — text */}
        <div className="relative z-10">
          <motion.p
            className="section-label"
            initial={initial({ opacity: 0 })}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0, ease: EASE }}
          >
            The Kitchen
          </motion.p>

          <motion.h1
            className="font-display font-black leading-[1.05] tracking-tight mt-4"
            style={{ color: "var(--text)", fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}
            initial={initial({ opacity: 0, y: 30 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          >
            Yassine Berrada Rekhami
          </motion.h1>

          <motion.p
            className="mt-3 font-sans"
            style={{ color: "var(--text-muted)", fontSize: "1.25rem", fontWeight: 300 }}
            initial={initial({ opacity: 0, y: 10 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            Full-Stack Developer & Designer
          </motion.p>

          <motion.div
            className="my-6 h-px"
            style={{ backgroundColor: "var(--border-warm)" }}
            initial={initial({ width: 0 })}
            animate={{ width: 48 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          />

          <motion.p
            className="font-sans max-w-md"
            style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.6, fontWeight: 400 }}
            initial={initial({ opacity: 0 })}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            Full-stack developer with a B.S. in Computer Science, building production
            systems end-to-end — from database schema and RLS design to pixel-accurate UI.
            Currently building at Go Optimal, shipping real products for real clients.
            Authorized to work in the U.S. under OPT.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={initial({ opacity: 0, y: 10 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
          >
            <motion.a
              href="#projects"
              className="font-sans px-6 py-3"
              style={{
                backgroundColor: "#d4622a",
                color: "#ffffff",
                borderRadius: "var(--radius-sm)",
                fontWeight: 500,
              }}
              whileHover={reduce ? undefined : { backgroundColor: "#c25a26" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              See the Menu
            </motion.a>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans px-6 py-3"
              style={{
                color: "var(--text)",
                border: "1px solid var(--border-warm)",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "rgba(0,0,0,0)",
                fontWeight: 400,
              }}
              whileHover={reduce ? undefined : { backgroundColor: "rgba(255,255,255,0.04)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Download Recipe
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT — ambient visual */}
        <motion.div
          className="relative h-screen overflow-hidden hidden lg:block"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--accent-dim) 0%, var(--bg) 70%)",
          }}
          initial={initial({ opacity: 0 })}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          <Suspense fallback={null}>
            <PlateConveyor />
          </Suspense>

          {/* Overlay CTA */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <motion.div
              className="flex flex-col items-center text-center px-8 py-6"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
              }}
              initial={initial({ opacity: 0, y: 12 })}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            >
              <p className="section-label" style={{ color: "var(--text-muted)" }}>
                Tonight's Tasting
              </p>
              <motion.a
                href="#projects"
                className="pointer-events-auto font-sans mt-4 px-7 py-3"
                style={{
                  backgroundColor: "#d4622a",
                  color: "#ffffff",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 500,
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                }}
                whileHover={reduce ? undefined : { backgroundColor: "#c25a26", y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                View Tonight's Menu
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
