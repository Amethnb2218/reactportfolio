export default function DetaillerProjet({ project, onCancel }) {
  if (!project) {
    return (
      <div className="project-detail-empty">
        Selectionnez ou ajoutez un projet pour afficher son detail.
      </div>
    );
  }

  return (
    <article className="project-detail" id="detail-projet">
      <span className="detail-chip">{project.categorie}</span>
      <h4>{project.libelle}</h4>
      <p>{project.description}</p>
      <img
        src={project.image}
        alt={`Illustration du projet ${project.libelle}`}
      />
      <dl className="detail-grid">
        <div>
          <dt>Periode</dt>
          <dd>{project.periode}</dd>
        </div>
        <div>
          <dt>Statut</dt>
          <dd>{project.statut}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Lien</dt>
          <dd>{project.lien || "Non renseigne"}</dd>
        </div>
      </dl>
      <div className="tech-list">
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
      <div className="detail-actions">
        <button className="button button-ghost" type="button" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </article>
  );
}
