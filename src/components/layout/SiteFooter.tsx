const SiteFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 py-10" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container-x flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p className="font-sans text-sm" style={{ color: "var(--text-dim)" }}>
          © {year} Yassine Berrada Rekhami
        </p>
        <a
          href="mailto:berra046@d.umn.edu"
          className="font-sans text-sm transition-colors"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-warm)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          berra046@d.umn.edu
        </a>
      </div>
    </footer>
  );
};

export default SiteFooter;
