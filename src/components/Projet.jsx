import { Link } from "react-router-dom";

export default function Projet({ project, onDelete, isBusy = false }) {
  const detailPath = `/projets/${project.id}`;
  const shortDescription = project.description?.trim() || "Description non renseignee.";

  return (
    <article className="project-card">
      <div className="project-card-head">
        <span className="project-card-category">{project.categorie}</span>
        <span className="project-card-status">{project.statut}</span>
      </div>
      <h4>
        <Link className="project-title-link" to={detailPath}>
          {project.libelle}
        </Link>
      </h4>
      {project.image ? (
        <img
          src={project.image}
          alt={`Illustration du projet ${project.libelle}`}
        />
      ) : null}
      <p>{shortDescription}</p>
      <div className="project-card-meta">
        <span>{project.periode || "Periode non renseignee"}</span>
        <span>{project.role || "Role non renseigne"}</span>
      </div>
      <div className="project-card-tech">
        {(project.technologies ?? []).slice(0, 3).map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
      <div className="card-actions">
        <Link className="detail-link" to={detailPath}>
          Voir le detail
        </Link>
        <button
          className="delete-button"
          type="button"
          disabled={isBusy}
          onClick={() => onDelete(project.id)}
        >
          {isBusy ? "Suppression..." : "Supprimer"}
        </button>
      </div>
    </article>
  );
}
