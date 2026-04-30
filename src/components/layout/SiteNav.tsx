import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, type MotionValue } from "framer-motion";

const NAV_LINKS = [
  { label: "Tonight's Menu", href: "#projects" },
  { label: "The Pantry", href: "#skills" },
  { label: "The Training", href: "#education" },
  { label: "Let's Cook", href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const scaleX: MotionValue<number> = reduce ? scrollYProgress : smoothProgress;

  useEffect(() => {
    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const linkBaseStyle = (active: boolean): React.CSSProperties => ({
    color: active ? "var(--text)" : "var(--text-muted)",
    borderBottom: active ? "1px solid var(--accent)" : "1px solid transparent",
    paddingBottom: "2px",
    transition: "color 200ms",
  });

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur"
      style={{
        backgroundColor: "rgba(10,10,8,0.85)",
        boxShadow: "0 1px 0 var(--border)",
      }}
    >
      <nav className="container-x relative flex h-16 items-center justify-between">
        <a
          href="#home"
          className="font-sans font-medium tracking-tight"
          style={{ color: "var(--text)" }}
          onClick={() => setOpen(false)}
        >
          Yassine Berrada
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-sm"
                  style={linkBaseStyle(isActive)}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative"
          style={{ width: 24, height: 18, padding: 0, background: "transparent", border: "none", cursor: "pointer" }}
        >
          <motion.span
            aria-hidden="true"
            style={{
              display: "block",
              position: "absolute",
              left: 0,
              top: 0,
              height: 1,
              width: "100%",
              backgroundColor: "var(--text)",
              transformOrigin: "center",
            }}
            animate={open ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
          />
          <motion.span
            aria-hidden="true"
            style={{
              display: "block",
              position: "absolute",
              left: 0,
              top: 8,
              height: 1,
              width: "100%",
              backgroundColor: "var(--text)",
            }}
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.15 }}
          />
          <motion.span
            aria-hidden="true"
            style={{
              display: "block",
              position: "absolute",
              left: 0,
              top: 16,
              height: 1,
              width: "100%",
              backgroundColor: "var(--text)",
              transformOrigin: "center",
            }}
            animate={open ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-dropdown"
            className="md:hidden absolute left-0 right-0 top-full overflow-hidden"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderBottom: "1px solid var(--border)",
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block font-sans"
                      style={{
                        padding: "0.75rem 1.5rem",
                        color: "var(--text)",
                        fontWeight: 400,
                        borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          transformOrigin: "0% 50%",
          backgroundColor: "var(--accent)",
          scaleX,
        }}
      />
    </header>
  );
};

export default SiteNav;
