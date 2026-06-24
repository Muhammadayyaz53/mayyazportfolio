import Image from "next/image";
import Link from "next/link";
import { experiences } from "../../data/experience";

export default function ExperienceSection({ limit }: { limit?: number }) {
  const displayedExperiences = limit
    ? experiences.slice(0, limit)
    : experiences;

  return (
    <section className="section section-experience" id="experience">
      <div className="container section-center">
        <div className="section-heading center-heading">
          <span className="eyebrow">Experience</span>

          <h2>Professional Journey</h2>

          <p>My work history and professional internships.</p>
        </div>

        <div className="experience-timeline">
          {displayedExperiences.map((exp, index) => (
            <div className="experience-item" key={index}>
              <div className="experience-year">
                <span>{exp.year}</span>
              </div>

              <article className="glass-card experience-card">
                <div className="experience-header">
                  <div className="experience-title-group">
                    <h3>{exp.role}</h3>

                    <div className="experience-company">{exp.organization}</div>

                    <div className="experience-meta">
                      <span>{exp.duration}</span>

                      <span>•</span>

                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="experience-logo">
                    {exp.logo ? (
                      <Link
                        href={exp.mapLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={`${exp.logo}`}
                          alt={`${exp.organization} logo`}
                          width={64}
                          height={64}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </Link>
                    ) : (
                      <span
                        className="skill-icon"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        ❖
                      </span>
                    )}
                  </div>
                </div>

                <div className="experience-body">
                  {exp.responsibilities.length > 0 && (
                    <ul className="experience-achievements">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="experience-footer">
                  <div className="tag-row">
                    {exp.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>

                  {exp.certificate && (
                    <Link
                      href={exp.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-secondary button-small"
                    >
                      View Certificate
                    </Link>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>

        {limit && limit < experiences.length && (
          <div className="center-heading" style={{ marginTop: "48px" }}>
            <Link href="/experience" className="button button-primary">
              View my work experience
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
