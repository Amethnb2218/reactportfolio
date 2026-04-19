import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectsContext.jsx";

export default function HomePortfolioSection() {
  const { projects, status } = useProjects();
  const recentProjects = projects.slice(0, 3);

  return (
    <section className="section">
      <div className="section-heading">
        <p className="section-kicker">Organisation</p>
        <h2>Un portfolio plus clair, plus pilote, plus actionnable</h2>
        <p>
          L&apos;accueil sert maintenant de tableau d&apos;orientation avec acces
          rapide aux zones importantes du portfolio.
        </p>
      </div>

      <div className="home-overview-grid">
        <article className="panel overview-panel overview-panel-lead">
          <div className="panel-title-row">
            <div>
              <h3>Espace portfolio</h3>
              <p className="muted">
                {projects.length} projet(s) disponibles avec un suivi en direct.
              </p>
            </div>
            <span className="status-badge">{status}</span>
          </div>
          <p className="overview-copy">
            Naviguez entre le dossier des projets, l&apos;ajout de nouvelles
            realisations et le detail complet de chaque mission depuis une base
            plus dense et mieux structuree.
          </p>
          <div className="detail-actions">
            <Link className="button button-primary" to="/dossier">
              Ouvrir le dossier
            </Link>
            <Link className="button button-ghost" to="/ajouter-projet">
              Ajouter un projet
            </Link>
          </div>
        </article>

        <article className="panel overview-panel">
          <h3>Parcours de gestion</h3>
          <div className="overview-steps">
            <div>
              <strong>1. Centraliser</strong>
              <span>Consulter tous les projets dans un dossier unique.</span>
            </div>
            <div>
              <strong>2. Enrichir</strong>
              <span>Ajouter texte, image, statut, lien et technologies.</span>
            </div>
            <div>
              <strong>3. Piloter</strong>
              <span>Modifier, detailler ou supprimer au bon moment.</span>
            </div>
          </div>
        </article>

        <article className="panel overview-panel">
          <h3>Projets recents</h3>
          <div className="overview-project-list">
            {recentProjects.map((project) => (
              <Link
                className="overview-project-item"
                key={project.id}
                to={`/projets/${project.id}`}
              >
                <strong>{project.libelle}</strong>
                <span>
                  {project.categorie} · {project.periode || "Periode non renseignee"}
                </span>
              </Link>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
