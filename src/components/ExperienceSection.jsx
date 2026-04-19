import { experiences } from "../data/portfolioContent.js";

export default function ExperienceSection() {
  return (
    <section className="section" id="parcours">
      <div className="section-heading">
        <p className="section-kicker">Parcours</p>
        <h2>Experiences professionnelles recentes</h2>
        <p>
          Cette section reste informative tandis que la zone portfolio sera
          rendue interactive dans les prochaines etapes.
        </p>
      </div>

      <div className="timeline-grid">
        {experiences.map((experience) => (
          <article className="panel" key={experience.title}>
            <h3>{experience.title}</h3>
            <p className="muted">
              {experience.company} | {experience.meta}
            </p>
            <ul className="plain-list compact-list">
              {experience.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
