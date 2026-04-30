const HeroSection = () => {
  return (
    <section id="home" className="min-h-[80vh] flex items-center">
      <div className="container-x">
        <p className="section-label mb-4">The Kitchen</p>
        <h1
          className="font-display font-black leading-[1.05] tracking-tight"
          style={{ color: "var(--text)", fontSize: "clamp(3rem, 6vw, 5rem)" }}
        >
          Yassine Berrada Rekhami
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
