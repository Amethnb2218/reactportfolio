import { useMemo, useState } from "react";
import { initialProjects } from "../data/projects.js";
import Projet from "./Projet.jsx";

function getNextProjectId(projects) {
  return projects.reduce((maxId, project) => Math.max(maxId, project.id), 0) + 1;
}

export default function Dossier() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialProjects[0]?.id ?? null
  );

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

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? null;

  function handleDeleteProject(projectId) {
    setProjects((currentProjects) => {
      const updatedProjects = currentProjects.filter(
        (project) => project.id !== projectId
      );

      if (selectedProjectId === projectId) {
        setSelectedProjectId(updatedProjects[0]?.id ?? null);
      }

      return updatedProjects;
    });
  }

  function handleAddPlaceholderProject() {
    const newProject = {
      id: getNextProjectId(projects),
      libelle: "Nouveau projet a completer",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
      categorie: "Prototype",
      periode: "2026",
      statut: "Brouillon",
      role: "A renseigner",
      lien: "",
      technologies: ["React"],
      description:
        "Projet provisoire ajoute depuis le composant Dossier en attendant le formulaire dedie."
    };

    setProjects((currentProjects) => [newProject, ...currentProjects]);
    setSelectedProjectId(newProject.id);
  }

  return (
    <section className="section" id="portfolio">
      <div className="section-heading">
        <p className="section-kicker">Portfolio</p>
        <h2>Espace de gestion des projets</h2>
        <p>
          Le composant Dossier centralise maintenant l&apos;etat des projets, la
          recherche locale et les actions de base.
        </p>
      </div>

      <div className="workspace-grid">
        <article className="panel">
          <div className="panel-title-row">
            <div>
              <h3>Dossier projets</h3>
              <p className="muted">
                {projects.length} projet(s) stocke(s) dans l&apos;etat React.
              </p>
            </div>
            <span className="status-badge">Etat local</span>
          </div>

          <div className="form-grid">
            <label className="form-column-full">
              <span>Rechercher un projet</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Libelle, categorie, technologie..."
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              className="button button-primary"
              type="button"
              onClick={handleAddPlaceholderProject}
            >
              Ajouter un projet temporaire
            </button>
          </div>

          <div className="project-flex" aria-live="polite">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Projet
                  key={project.id}
                  project={project}
                  onDelete={handleDeleteProject}
                  onSelect={setSelectedProjectId}
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
          <h3>Projet selectionne</h3>
          {selectedProject ? (
            <article className="project-detail">
              <span className="detail-chip">{selectedProject.categorie}</span>
              <h4>{selectedProject.libelle}</h4>
              <p>{selectedProject.description}</p>
              <img
                src={selectedProject.image}
                alt={`Illustration du projet ${selectedProject.libelle}`}
              />
              <dl className="detail-grid">
                <div>
                  <dt>Periode</dt>
                  <dd>{selectedProject.periode}</dd>
                </div>
                <div>
                  <dt>Statut</dt>
                  <dd>{selectedProject.statut}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{selectedProject.role}</dd>
                </div>
                <div>
                  <dt>Lien</dt>
                  <dd>{selectedProject.lien || "Non renseigne"}</dd>
                </div>
              </dl>
              <div className="tech-list">
                {selectedProject.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </article>
          ) : (
            <div className="project-detail-empty">
              Selectionnez ou ajoutez un projet pour afficher son detail.
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
