export default function Projet({ project, onDelete, onSelect, isBusy = false }) {
  function handleSelect(event) {
    event.preventDefault();
    onSelect(project.id);
  }

  return (
    <article className="project-card">
      <span className="project-card-category">{project.categorie}</span>
      <h4>
        <a className="project-title-link" href="#detail-projet" onClick={handleSelect}>
          {project.libelle}
        </a>
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
        <button className="detail-button" type="button" onClick={handleSelect}>
          Voir le detail
        </button>
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
