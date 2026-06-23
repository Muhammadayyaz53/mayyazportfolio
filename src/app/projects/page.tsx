
import { projects } from "../../data/portfolio";
import { Section } from "../../components/section";

export default function ProjectsPage() {
  return (
    <Section
      eyebrow="Projects"
      title="Projects"
      description="Route-based project cards that lead to individual project pages."
      className="section-muted"
    >
      <div className="projects-grid projects-grid-full">
        {projects.map((project, index) => (
          <article className="glass-card project-card" key={project.slug}>
            <div className={`project-thumb thumb-${index + 1}`}>
              <div className="project-thumb-inner">
                <span>Project</span>
                <strong>{project.title}</strong>
              </div>
            </div>

            <div className="project-copy">
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p>{project.description}</p>
              <a className="button button-primary button-small" href={project.link} target="_blank" rel="noreferrer">
                View My Project
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}