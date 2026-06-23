import Link from "next/link";
import Image from "next/image";
import { githubUrl, heroStats, projects, services, skills } from "../data/portfolio";
import ContactSection from "../components/sections/contact";

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
              I design and build clean, fast, and modern interfaces with route-driven structure,
              reusable components, and a premium portfolio feel.
            </p>
            <div className="action-row">
              <Link className="button button-primary" href="/projects">
                View My Projects
              </Link>
              <Link className="button button-secondary" href="/contact">
                Contact
              </Link>
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
              <Image src="/Ayyaz.jpg" alt="Muhammad Ayyaz portrait" fill sizes="(max-width: 768px) 90vw, 420px" className="portrait-image" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted section-about-home">
        <div className="container about-grid">
          <div className="section-copy">
            <span className="eyebrow">About Me</span>
            <h2>About me</h2>
            <p>
              I focus on frontend experiences that feel structured, intentional, and visually
              consistent across every route .
            </p>
          </div>

          <div className="glass-card about-panel">
            <p>
              I like pages that are easy to scan, easy to use, and easy to grow. The structure,
              spacing, and route flow are all part of the experience.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-skills">
        <div className="container section-center">
          <div className="section-heading center-heading">
            <span className="eyebrow">Skills</span>
            <h2>My Skills</h2>
            <p>Three core cards centered on the page, with padding and spacing.</p>
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

      <section className="section section-muted">
        <div className="container section-heading section-heading-row">
          <div>
            <span className="eyebrow">Services</span>
            <h2>Services</h2>
          </div>
          <Link className="text-link" href="/services">
            View all services
          </Link>
        </div>

        <div className="container services-grid">
          {services.map((service) => (
            <article className="glass-card service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section-heading section-heading-row">
          <div>
            <span className="eyebrow">Projects</span>
            <h2>Featured Work</h2>
          </div>
          <Link className="text-link" href="/projects">
            See all project
          </Link>
        </div>

        <div className="container projects-grid projects-grid-home">
          {projects.map((project, index) => (
            <article className="glass-card project-card" key={project.slug}>
              <div className={`project-thumb thumb-${index + 1}`}>
                <div className="project-thumb-inner">
                  <span>Project</span>
                  <strong>{project.title}</strong>
                </div>
              </div>
              <p>{project.summary}</p>
              <a className="button button-primary button-small" href={project.link} target="_blank" rel="noreferrer">
                View My Project
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-muted">
        <div className="container hero-mini-cta glass-card">
          <div>
            <span className="eyebrow">Contact</span>
            <h2>Ready to work together?</h2>
            <p>Send a message using the form below—I&apos;ll reply with the next step.</p>
          </div>
          <div className="action-row">
            <Link className="button button-primary" href="#contact-form">
              Contact
            </Link>
            <a className="button button-ghost" href={githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </section>

      <div id="contact-form">
        <ContactSection />
      </div>
    </main>
  );
}