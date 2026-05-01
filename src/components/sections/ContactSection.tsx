import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// TODO: Replace with the real Formspree form ID from formspree.io
const FORMSPREE_FORM_ID = "YOUR_FORM_ID";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

type Status = "idle" | "submitting" | "success" | "error";

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

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--accent-warm)";
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // Short-circuit if Formspree isn't wired yet — lets the success UX be reviewed
    // before the real ID is in place. Remove once FORMSPREE_FORM_ID is set.
    if (FORMSPREE_FORM_ID === "YOUR_FORM_ID") {
      console.warn(
        "[ContactSection] Formspree form ID is still the placeholder — not actually sending.",
      );
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", message: "" });
    setStatus("idle");
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

          {/* RIGHT — form / success */}
          <motion.div
            initial={initial({ opacity: 0, y: 20 })}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center text-center py-10"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div
                    className="flex items-center justify-center mb-4"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "9999px",
                      backgroundColor: "var(--accent-dim)",
                      border: "1px solid rgba(232,164,74,0.25)",
                      color: "var(--accent-warm)",
                      fontSize: "1.4rem",
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    ✓
                  </div>
                  <h3
                    className="font-display font-bold"
                    style={{ color: "var(--text)", fontSize: "1.4rem" }}
                  >
                    Order received
                  </h3>
                  <p
                    className="font-sans mt-2"
                    style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "22rem" }}
                  >
                    I'll get back to you within a day or two.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="font-sans mt-6 px-5 py-2 transition-colors"
                    style={{
                      color: "var(--text)",
                      border: "1px solid var(--border-warm)",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "transparent",
                      fontWeight: 400,
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
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
                    value={form.name}
                    onChange={onChange}
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
                    value={form.email}
                    onChange={onChange}
                    style={{ ...inputBaseStyle, padding: "0.625rem 1rem" }}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                  <textarea
                    name="message"
                    placeholder="What are we cooking?"
                    required
                    maxLength={1000}
                    value={form.message}
                    onChange={onChange}
                    className="h-28 resize-none"
                    style={{ ...inputBaseStyle, padding: "0.625rem 1rem" }}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />

                  {status === "error" && (
                    <p
                      className="font-sans"
                      style={{ color: "var(--accent-warm)", fontSize: "0.8rem" }}
                    >
                      Something went wrong — try emailing{" "}
                      <a
                        href="mailto:yrberrada@gmail.com"
                        style={{ color: "var(--accent-warm)", textDecoration: "underline" }}
                      >
                        yrberrada@gmail.com
                      </a>{" "}
                      directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full font-sans transition-colors"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "#ffffff",
                      fontWeight: 500,
                      padding: "0.75rem 0",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      cursor: status === "submitting" ? "wait" : "pointer",
                      opacity: status === "submitting" ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (status !== "submitting")
                        e.currentTarget.style.backgroundColor = "#c25a26";
                    }}
                    onMouseLeave={(e) => {
                      if (status !== "submitting")
                        e.currentTarget.style.backgroundColor = "var(--accent)";
                    }}
                  >
                    {status === "submitting" ? "Sending…" : "Send it →"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
