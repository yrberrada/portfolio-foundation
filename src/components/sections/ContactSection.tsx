import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "var(--bg-raised)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  color: "var(--text)",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontWeight: 400,
  outline: "none",
};

const ContactSection = () => {
  const reduce = useReducedMotion();
  const initial = <T extends object>(v: T): T | false => (reduce ? false : v);

  const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--accent-warm)";
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
  };

  return (
    <section id="contact" className="pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="container-x">
        {/* Header */}
        <p className="section-label mb-3">Let's Cook Something</p>
        <h2
          className="font-display font-bold mb-2"
          style={{ color: "var(--text)", fontSize: "2rem" }}
        >
          Get In Touch
        </h2>
        <div
          className="mb-10"
          style={{ height: 2, backgroundColor: "var(--border)", width: "100%" }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-10 lg:gap-12">
          {/* LEFT — context */}
          <motion.div
            className="relative overflow-hidden"
            initial={initial({ opacity: 0, y: 20 })}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 pointer-events-none font-display italic whitespace-nowrap"
              style={{
                color: "var(--text-dim)",
                opacity: 0.06,
                fontSize: "clamp(4rem, 10vw, 8rem)",
                lineHeight: 1,
                userSelect: "none",
                zIndex: 0,
              }}
            >
              bon appétit
            </span>

            <div className="relative" style={{ zIndex: 10 }}>
              <p
                className="font-sans"
                style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "20rem" }}
              >
                Open to full-stack roles, contract work, and interesting problems.
                Response time: fast.
              </p>

              <ul className="mt-6 flex flex-col gap-3 list-none p-0">
                {[
                  { label: "yrberrada@gmail.com", href: "mailto:yrberrada@gmail.com", external: false },
                  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/yassine-berrada-rekhami/", external: true },
                  { label: "GitHub ↗", href: "https://github.com/yrberrada", external: true },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="font-sans"
                      style={{
                        color: "var(--text)",
                        fontSize: "0.9rem",
                        fontWeight: 400,
                        textDecoration: "none",
                        transition: "color 200ms",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text)";
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={initial({ opacity: 0, y: 20 })}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            {/* TODO: Replace YOUR_FORM_ID with actual Formspree form ID from formspree.io */}
            <form
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
              className="flex flex-col gap-3"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="_gotcha"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                maxLength={100}
                style={{ ...inputBaseStyle, padding: "0.625rem 1rem" }}
                onFocus={focusOn}
                onBlur={focusOff}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                maxLength={255}
                style={{ ...inputBaseStyle, padding: "0.625rem 1rem" }}
                onFocus={focusOn}
                onBlur={focusOff}
              />
              <textarea
                name="message"
                placeholder="What are we cooking?"
                required
                maxLength={1000}
                className="h-28 resize-none"
                style={{ ...inputBaseStyle, padding: "0.625rem 1rem" }}
                onFocus={focusOn}
                onBlur={focusOff}
              />

              <button
                type="submit"
                className="w-full font-sans transition-colors"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#ffffff",
                  fontWeight: 500,
                  padding: "0.75rem 0",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c25a26")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
              >
                Send it →
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
