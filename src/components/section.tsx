import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
};

export function Section({ eyebrow, title, description, children, className = "", centered = false }: SectionProps) {
  return (
    <section className={`section ${className}`.trim()}>
      <div className={`container ${centered ? "section-center" : ""}`.trim()}>
        <div className={`section-heading ${centered ? "center-heading" : ""}`.trim()}>
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="section-title">{title}</h1>
          {description ? <p className="section-description">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}