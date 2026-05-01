const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const elsewhereLinks = [
  { label: "yrberrada@gmail.com", href: "mailto:yrberrada@gmail.com", external: false },
  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/yassine-berrada-rekhami/", external: true },
  { label: "GitHub ↗", href: "https://github.com/yrberrada", external: true },
];

const linkStyle: React.CSSProperties = {
  color: "var(--text-dim)",
  transition: "color 200ms",
  textDecoration: "none",
};

const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) =>
  (e.currentTarget.style.color = "var(--accent-warm)");
const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) =>
  (e.currentTarget.style.color = "var(--text-dim)");

const SiteFooter = () => {
  return (
    <footer
      className="mt-24 pt-16 pb-10"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div>
            <p
              className="font-display text-xl font-bold mb-2"
              style={{ color: "var(--text)" }}
            >
              Yassine Berrada Rekhami
            </p>
            <p
              className="font-sans"
              style={{ color: "var(--text-dim)", fontSize: "0.875rem", lineHeight: 1.6 }}
            >
              Full-stack developer.
              <br />
              Cooking software end-to-end.
            </p>
          </div>

          {/* Navigate column */}
          <div>
            <p className="section-label mb-4">Navigate</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans"
                    style={{ ...linkStyle, fontSize: "0.875rem" }}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere column */}
          <div>
            <p className="section-label mb-4">Elsewhere</p>
            <ul className="space-y-2">
              {elsewhereLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans"
                    style={{ ...linkStyle, fontSize: "0.875rem" }}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="mt-12 pt-6 flex justify-center md:justify-start"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="font-sans"
            style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}
          >
            © 2026 Yassine Berrada Rekhami
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
