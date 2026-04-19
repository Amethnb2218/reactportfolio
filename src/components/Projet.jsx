import { Link } from "react-router-dom";

export default function Projet({ project, onDelete, isBusy = false }) {
  const detailPath = `/projets/${project.id}`;

  return (
    <article className="project-card">
      <span className="project-card-category">{project.categorie}</span>
      <h4>
        <Link className="project-title-link" to={detailPath}>
          {project.libelle}
        </Link>
      </h4>
      <img
        src={project.image}
        alt={`Illustration du projet ${project.libelle}`}
      />
      <p>{project.description}</p>
      <div className="project-card-meta">
        <span>{project.statut}</span>
        <span>{project.periode}</span>
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
