import type { ReactNode } from "react";

interface ExperienceCardProps {
  title: string;
  company: string;
  date?: string;
  children: ReactNode;
}

export function ExperienceCard({
  title,
  company,
  date,
  children,
}: ExperienceCardProps) {
  return (
    <article className="experience-card">
      <h3 className="experience-title">{title}</h3>
      <p className="experience-company">{company}</p>
      {date ? <p className="experience-date">{date}</p> : null}
      {children}
    </article>
  );
}
