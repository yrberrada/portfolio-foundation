const SiteFooter = () => {
  return (
    <footer className="mt-24 py-10" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container-x">
        <p
          className="font-sans text-center"
          style={{ color: "var(--text-dim)", fontSize: "0.8rem", fontWeight: 400 }}
        >
          © 2026 Yassine Berrada Rekhami ·{" "}
          <a
            href="mailto:yrberrada@gmail.com"
            style={{ color: "var(--text-dim)", transition: "color 200ms" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-warm)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
          >
            yrberrada@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
