const NAV_LINKS = [
  { label: "Tonight's Menu", href: "#projects" },
  { label: "The Pantry", href: "#skills" },
  { label: "The Training", href: "#education" },
  { label: "Let's Cook", href: "#contact" },
];

const SiteNav = () => {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur"
      style={{
        backgroundColor: "rgba(10,10,8,0.85)",
        boxShadow: "0 1px 0 var(--border)",
      }}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a
          href="#home"
          className="font-sans font-medium tracking-tight"
          style={{ color: "var(--text)" }}
        >
          Yassine Berrada
        </a>
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile: simple inline list (no hamburger per design doc) */}
        <ul className="flex md:hidden items-center gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default SiteNav;
