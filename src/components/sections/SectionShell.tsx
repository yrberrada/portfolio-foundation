import { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  label: string;
  title: string;
  children?: ReactNode;
}

const SectionShell = ({ id, label, title, children }: SectionShellProps) => {
  return (
    <section id={id} className="py-20 md:py-24">
      <div className="container-x">
        <p className="section-label mb-3">{label}</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8" style={{ color: "var(--text)" }}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default SectionShell;
