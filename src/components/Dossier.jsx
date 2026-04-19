import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectsContext.jsx";
import Projet from "./Projet.jsx";
import RechercheProjet from "./RechercheProjet.jsx";

export default function Dossier() {
  const [search, setSearch] = useState("");
  const { pendingDeletionId, projects, removeProject, status } = useProjects();

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return projects;
    }

    return projects.filter((project) => {
      const haystack = [
        project.libelle,
        project.categorie,
        project.statut,
        ...(project.technologies ?? [])
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [projects, search]);

  return (
    <section className="section" id="portfolio">
      <div className="section-heading">
        <p className="section-kicker">Dossier</p>
        <h2>Liste des projets du portfolio</h2>
        <p>
          Le composant Dossier est maintenant affiche sur une page dediee pour
          consulter, rechercher et supprimer les projets.
        </p>
      </div>

      <div className="workspace-grid">
        <article className="panel">
          <div className="panel-title-row">
            <div>
              <h3>Dossier projets</h3>
              <p className="muted">
                {projects.length} projet(s) stocke(s) dans l&apos;etat partage.
              </p>
            </div>
            <span className="status-badge">{status}</span>
          </div>

          <RechercheProjet
            search={search}
            onSearchChange={setSearch}
            resultCount={filteredProjects.length}
            totalCount={projects.length}
          />

          <div className="project-flex" aria-live="polite">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Projet
                  key={project.id}
                  project={project}
                  onDelete={removeProject}
                  isBusy={pendingDeletionId === project.id}
                />
              ))
            ) : (
              <div className="project-detail-empty">
                Aucun projet ne correspond a votre recherche.
              </div>
            )}
          </div>
        </article>

        <aside className="panel project-detail-panel">
          <h3>Actions disponibles</h3>
          <ul className="plain-list compact-list">
            <li>Cliquez sur le libelle d&apos;un projet pour ouvrir sa page detail.</li>
            <li>Utilisez la recherche pour filtrer rapidement le dossier.</li>
            <li>La suppression reste disponible directement depuis cette page.</li>
          </ul>
          <div className="detail-actions">
            <Link className="button button-primary" to="/ajouter-projet">
              Aller a AjouterProjet
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
