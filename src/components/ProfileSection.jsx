import { certifications, formations } from "../data/portfolioContent.js";

export default function ProfileSection() {
  return (
    <section className="section" id="profil">
      <div className="section-heading">
        <p className="section-kicker">Profil</p>
        <h2>Une base solide entre logiciel, cloud et reseaux</h2>
        <p>
          Le portfolio garde la presentation personnelle d&apos;origine mais
          devient maintenant une vraie application React centree sur la gestion
          des projets.
        </p>
      </div>

      <div className="profile-grid">
        <article className="panel">
          <h3>Ce que je construis</h3>
          <ul className="plain-list compact-list">
            <li>Interfaces web modernes et rapides.</li>
            <li>APIs Node.js pour la logique metier.</li>
            <li>Solutions orientees reservation, cloud et operations.</li>
          </ul>
        </article>

        <article className="panel">
          <h3>Formation</h3>
          <ul className="plain-list compact-list">
            {formations.map((formation) => (
              <li key={formation}>{formation}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Certifications</h3>
          <ul className="plain-list compact-list">
            {certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
