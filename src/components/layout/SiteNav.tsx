import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
          className="md:hidden flex flex-col justify-between"
          style={{ width: 24, height: 18, padding: 0, background: "transparent", border: "none", cursor: "pointer" }}
        >
          <span style={{ display: "block", height: 1, width: "100%", backgroundColor: "var(--text)" }} />
          <span style={{ display: "block", height: 1, width: "100%", backgroundColor: "var(--text)" }} />
          <span style={{ display: "block", height: 1, width: "100%", backgroundColor: "var(--text)" }} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden absolute left-0 right-0 top-full"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderBottom: "1px solid var(--border)",
          }}
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
                      color: isActive ? "var(--text)" : "var(--text)",
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
        </div>
      )}
    </header>
  );
};

export default SiteNav;
