import { useEffect, useRef } from "react";
import { ExperienceCard } from "./components/ExperienceCard";
import { Contact } from "./components/Contact";

const SKILLS = [
  "TypeScript/JavaScript",
  "Golang",
  "Python",
  "React",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "GitLab CI/CD",
];

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          if (el.classList.contains("experience-card")) {
            el.style.animationDelay = `${index * 0.1}s`;
          }
          if (el.classList.contains("contact-link")) {
            el.style.animationDelay = `${index * 0.08}s`;
          }
          if (el.classList.contains("skill-tag")) {
            el.style.animationDelay = `${index * 0.05}s`;
          }
          el.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const sections = container.querySelectorAll("section");
    const cards = container.querySelectorAll(".experience-card");
    const links = container.querySelectorAll(".contact-link");
    const tags = container.querySelectorAll(".skill-tag");
    const footers = container.querySelectorAll("footer");

    sections.forEach((s) => observer.observe(s));
    cards.forEach((c) => observer.observe(c));
    links.forEach((l) => observer.observe(l));
    tags.forEach((t) => observer.observe(t));
    footers.forEach((f) => observer.observe(f));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <header>
        <h1>Tianmu Wu</h1>
        <p className="tagline">Full-Stack Software Engineer · Placentia, CA</p>
      </header>

      <main>
        <section id="about">
          <h2>About</h2>
          <p style={{ color: "var(--color-text-muted)", margin: 0 }}>
            Full-stack software engineer with 8 years of experience, specializing
            in scalable backend systems, frontend architecture, and CI/CD
            automation. Currently pursuing a Master of Science in Software
            Engineering at California State University, Fullerton (expected
            graduation Mar 2027).
          </p>
          <div className="skills-list" style={{ marginTop: "1rem" }}>
            {SKILLS.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="experience">
          <h2>Work Experience</h2>

          <ExperienceCard
            title="Senior Software Engineer"
            company="CIeNET Technologies – Chengdu, China"
            date="01/2025 – 06/2025"
          >
            <ul className="experience-desc" style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Migrated frontend framework from Remix 2.x to 3.x, improving page load times by 10%.</li>
              <li>Maintained frontend component libraries that were reused by 4 products.</li>
              <li>Introduced unit test examples, increasing component test coverage to 60%.</li>
              <li>Maintained CI/CD pipelines to automate testing and reduce manual intervention.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="Senior Software Engineer"
            company="Beijing Shudu Technology – Chengdu, China"
            date="07/2020 – 01/2025"
          >
            <ul className="experience-desc" style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Designed RESTful APIs in Go and achieved 87% unit test coverage.</li>
              <li>Implemented automated E2E testing using Postman, Docker and GitLab CI/CD, reaching 90% main API coverage and reducing production issues.</li>
              <li>Isolated RBAC module from backend service, centralizing permission checks and reducing code duplication.</li>
              <li>Led Hermes (RAG Q&A system with Qwen2 + Qdrant), Mercury (task management platform with FastAPI + Redis).</li>
              <li>Mentored developers, managed code reviews, and guided Git-based workflows in Agile teams.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="Senior Software Engineer"
            company="Aegle Analytica Inc. – Chengdu, China"
            date="03/2020 – 07/2020"
          >
            <ul className="experience-desc" style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Built JSON Schema-based form configurator, accelerating business feature delivery.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="Frontend Technical Lead"
            company="Chengdu Shuimu Sanyi Education Tech – Chengdu, China"
            date="05/2018 – 03/2020"
          >
            <ul className="experience-desc" style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Led development of Future Classroom, a full-stack teaching platform (React, Node.js, PostgreSQL, Redis).</li>
              <li>Delivered real-time interactive classroom features using WebSocket and Redis.</li>
              <li>Optimized frontend architecture, reducing load times and enhancing reusability.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="Web Frontend Engineer"
            company="Chengdu Shuzhilian Technology – Chengdu, China"
            date="08/2017 – 04/2018"
          >
            <ul className="experience-desc" style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Developed Flight Path Visualization and Web Crawler tools for data visualization and retrieval.</li>
            </ul>
          </ExperienceCard>
        </section>

        <section id="projects">
          <h2>Projects</h2>

          <ExperienceCard
            title="Water Web"
            company="Frontend Engineer · 01/2025 – 06/2025"
            date=""
          >
            <p className="experience-desc" style={{ marginBottom: "0.5rem" }}>
              Sewer inspection system powered by robotic hardware and AI modeling for automated scanning and repair. Enables field engineers to control robots in real time.
            </p>
            <p className="experience-date" style={{ marginBottom: 0 }}>JavaScript, Docker, Remix</p>
            <ul className="experience-desc" style={{ margin: "0.5rem 0 0 1.25rem", paddingLeft: 0 }}>
              <li>Built system UI from design specs and core features; upgraded Remix 2.x → 3.x; maintained CI/CD for stable deployment.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="Hermes"
            company="Software Engineer · 03/2024 – 01/2025"
            date=""
          >
            <p className="experience-desc" style={{ marginBottom: "0.5rem" }}>
              RAG-based intelligent Q&A system: vectorizes customer data, retrieves with Qdrant, and uses Qwen2 to summarize and answer. Delivers standardized APIs and a modular, extensible design.
            </p>
            <p className="experience-date" style={{ marginBottom: 0 }}>Python, Qwen2, Qdrant, FastAPI, Gradio, Docker</p>
            <ul className="experience-desc" style={{ margin: "0.5rem 0 0 1.25rem", paddingLeft: 0 }}>
              <li>Designed and implemented full architecture (storage, query, integration, generation); vector storage on Qdrant for efficient, near–real-time retrieval; containerized deployment; wrote API documentation for clients.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="Mercury"
            company="Software Engineer · 03/2024 – 01/2025"
            date=""
          >
            <p className="experience-desc" style={{ marginBottom: "0.5rem" }}>
              Standardized platform for digital-human generation workflows: user management, file management, task management, and model configuration. Deployed for multiple client projects.
            </p>
            <p className="experience-date" style={{ marginBottom: 0 }}>FastAPI, MySQL, Redis, Docker</p>
            <ul className="experience-desc" style={{ margin: "0.5rem 0 0 1.25rem", paddingLeft: 0 }}>
              <li>Implemented user/role management, task scheduling, file storage; task status UI and task-management API; JWT auth and file access control; full containerization for multi-server deployment.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="Tester"
            company="Software Engineer · 03/2023 – 04/2024"
            date=""
          >
            <p className="experience-desc" style={{ marginBottom: "0.5rem" }}>
              E2E testing system for backend services. Postman + GitLab CI runs automated tests on every commit. Reduced production incidents by ~30% and raised test coverage.
            </p>
            <p className="experience-date" style={{ marginBottom: 0 }}>Postman, GitLab CI/CD, Docker</p>
            <ul className="experience-desc" style={{ margin: "0.5rem 0 0 1.25rem", paddingLeft: 0 }}>
              <li>Built Postman-based API test framework; integrated into GitLab CI/CD; Dockerized test environment; caught multiple breaking API changes before production.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="Paas_go"
            company="Backend Engineer · 07/2020 – 03/2024"
            date=""
          >
            <p className="experience-desc" style={{ marginBottom: "0.5rem" }}>
              High-performance Golang backend for a privacy-computing platform: RBAC, project management, task scheduling. Served multiple projects; E2E coverage reached 90% on core APIs.
            </p>
            <p className="experience-date" style={{ marginBottom: 0 }}>Golang, MySQL, Redis, Docker, RESTful API</p>
            <ul className="experience-desc" style={{ margin: "0.5rem 0 0 1.25rem", paddingLeft: 0 }}>
              <li>Designed RBAC and core modules; implemented E2E testing; CI/CD and containerized deployment with Docker Compose.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="FE_common"
            company="Frontend Engineer · 07/2021 – 03/2024"
            date=""
          >
            <p className="experience-desc" style={{ marginBottom: "0.5rem" }}>
              Shared frontend module platform: common features (CLI, components, utils) packaged as npm modules for reuse across products. Five packages published; reduced duplicate work and improved team velocity.
            </p>
            <p className="experience-date" style={{ marginBottom: 0 }}>React, TypeScript, Lerna, Gulp, GitLab CI, NPM</p>
            <ul className="experience-desc" style={{ margin: "0.5rem 0 0 1.25rem", paddingLeft: 0 }}>
              <li>Split and published npm packages; Lerna + Gulp for build and release; GitLab CI/CD for one-command publish and dependency updates.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="StageEditor"
            company="Frontend Engineer · 07/2020 – 03/2024"
            date=""
          >
            <p className="experience-desc" style={{ marginBottom: "0.5rem" }}>
              Form-builder tool driven by JSON Schema config: generate dynamic forms for various business needs. Deep nesting, custom fields, dynamic validation and rendering. Cut form development effort across many scenarios.
            </p>
            <p className="experience-date" style={{ marginBottom: 0 }}>React, TypeScript, JSON Schema, Ant Design</p>
            <ul className="experience-desc" style={{ margin: "0.5rem 0 0 1.25rem", paddingLeft: 0 }}>
              <li>Implemented JSON Schema–based form configurator; deep nesting and custom components; configurable validation and dynamic updates.</li>
            </ul>
          </ExperienceCard>

          <ExperienceCard
            title="Future Classroom"
            company="Web Frontend Team Lead · 05/2018 – 03/2020"
            date=""
          >
            <p className="experience-desc" style={{ marginBottom: "0.5rem" }}>
              Full-stack teaching platform: course authoring, lesson prep, and live class with three-screen interaction. React + TypeScript + Redux course editor and teaching tools; Node.js/Koa backend; PostgreSQL and Redis.
            </p>
            <p className="experience-date" style={{ marginBottom: 0 }}>React, TypeScript, Redux, Node.js, Koa, PostgreSQL, Redis</p>
            <ul className="experience-desc" style={{ margin: "0.5rem 0 0 1.25rem", paddingLeft: 0 }}>
              <li>Delivered editor and teaching-tool core features; implemented backend business logic; real-time interaction via WebSocket and Redis.</li>
            </ul>
          </ExperienceCard>
        </section>

        <section id="education">
          <h2>Education</h2>
          <ExperienceCard
            title="M.S. in Software Engineering"
            company="California State University, Fullerton"
            date="09/2025 – 03/2027 (anticipated)"
          >
            <></>
          </ExperienceCard>
          <ExperienceCard
            title="B.S. in Electrical Engineering & Automation"
            company="Shanghai University of Engineering Science"
            date="09/2012 – 06/2016"
          >
            <></>
          </ExperienceCard>
        </section>

        <Contact />
      </main>

      <footer>
        <p>© 2026 Tianmu Wu. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
