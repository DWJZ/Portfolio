import type { ReactNode } from "react";
import styles from "./ExperienceCard.module.css";

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
    <article className={styles.card} data-observe="card">
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.company}>{company}</p>
      {date ? <p className={styles.date}>{date}</p> : null}
      <div className={styles.body}>{children}</div>
    </article>
  );
}
