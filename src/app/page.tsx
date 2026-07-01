import Link from "next/link";
import Image from "next/image";
import {
  resumeUrl,
  heroStats,
  projects,
  services,
  skills,
} from "../data/portfolio";
import ContactSection from "../components/sections/contact";
import ExperienceSection from "../components/sections/Experience";

export default function HomePage() {
  return (
    <main>
      <section className="hero section section-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Available for new projects</span>
            <h1>
              Hi, I&apos;m <span>Muhammad Ayyaz</span>
            </h1>
            <p className="lede">
              I design and build clean, fast, and modern interfaces with
              route-driven structure, reusable components, and a premium
              portfolio feel.
            </p>
            <div className="action-row">
              <Link className="button button-primary" href="/projects">
                View My Projects
              </Link>
              <a
                className="button button-secondary"
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                download
              >
                Resume
              </a>
            </div>
            <div className="stats-grid" aria-label="Portfolio highlights">
              {heroStats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="hero-visual glass-card">
            <div className="glow glow-primary" />
            <div className="portrait-frame">
              <Image
                src="/Ayyaz.jpg"
                alt="Muhammad Ayyaz portrait"
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="portrait-image"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section section-muted section-about-home">
        <div className="container about-grid">
          <div className="section-copy">
            <span className="eyebrow">About Me</span>
            <h2>Crafting Digital Experiences</h2>
            <p className="lede">
              I am a frontend developer who focuses on building experiences that
              feel structured, intentional, and visually consistent across every
              device.
            </p>
            <div className="action-row" style={{ marginTop: "1rem" }}>
              <Link className="button button-primary" href="/about">
                More About Me
              </Link>
            </div>
          </div>

          <div className="glass-card about-panel" style={{ padding: "40px" }}>
            <h3
              style={{
                marginBottom: "16px",
                fontSize: "1.4rem",
                color: "var(--text)",
              }}
            >
              My Approach
            </h3>
            <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
              I like pages that are easy to scan, easy to use, and easy to grow.
              The structure, spacing, and route flow are all part of the
              experience.
            </p>
            <ul
              style={{
                color: "var(--text)",
                display: "grid",
                gap: "14px",
                paddingLeft: "8px",
                listStyle: "none",
              }}
            >
              <li
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <span style={{ color: "var(--text)", opacity: 0.8 }}>❖</span>{" "}
                Clean, maintainable code architecture
              </li>
              <li
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <span style={{ color: "var(--text)", opacity: 0.8 }}>❖</span>{" "}
                Pixel-perfect design implementation
              </li>
              <li
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <span style={{ color: "var(--text)", opacity: 0.8 }}>❖</span>{" "}
                Performance and accessibility focus
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-skills">
        <div className="container section-center">
          <div className="section-heading center-heading">
            <span className="eyebrow">Skills</span>
            <h2>My Skills</h2>
            <p>
              Three core cards centered on the page, with padding and spacing.
            </p>
          </div>

          <div className="skills-grid skills-grid-center">
            {skills.map((skill) => (
              <article className="glass-card skill-card" key={skill.title}>
                <div className="skill-icon" aria-hidden="true">
                  {skill.icon === "window" && "◫"}
                  {skill.icon === "palette" && "◌"}
                  {skill.icon === "build" && "⌘"}
                </div>
                <h3>{skill.title}</h3>
                <ul>
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ExperienceSection limit={2} />

      <section className="section section-muted">
        <div className="container section-center">
          <div className="section-heading center-heading">
            <span className="eyebrow">Services</span>
            <h2>Services</h2>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="glass-card service-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>

          <div className="center-heading" style={{ marginTop: "8px" }}>
            <Link className="button button-secondary" href="/services">
              View all services
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-center">
          <div className="section-heading center-heading">
            <span className="eyebrow">Projects</span>
            <h2>Featured Work</h2>
          </div>

          <div className="projects-grid projects-grid-home">
            {projects.map((project) => (
              <article className="glass-card project-card" key={project.slug}>
                <div className="project-thumb-image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="project-cover-img"
                  />
                  <div className="project-thumb-overlay">
                    <span>Project</span>
                    <strong>{project.title}</strong>
                  </div>
                </div>
                <p>{project.summary}</p>
                <a
                  className="button button-primary button-small"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View My Project
                </a>
              </article>
            ))}
          </div>

          <div className="center-heading" style={{ marginTop: "8px" }}>
            <Link className="button button-secondary" href="/projects">
              See all projects
            </Link>
          </div>
        </div>
      </section>

      <div id="contact-form">
        <ContactSection />
      </div>
    </main>
  );
}
