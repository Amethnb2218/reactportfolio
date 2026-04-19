import { useEffect, useMemo, useState } from "react";
import { initialProjects } from "../data/projects.js";
import AjouterProjet from "./AjouterProjet.jsx";
import DetaillerProjet from "./DetaillerProjet.jsx";
import Projet from "./Projet.jsx";
import RechercheProjet from "./RechercheProjet.jsx";
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject
} from "../services/projectsApi.js";

function getNextProjectId(projects) {
  return projects.reduce((maxId, project) => Math.max(maxId, project.id), 0) + 1;
}

export default function Dossier() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialProjects[0]?.id ?? null
  );
  const [status, setStatus] = useState("Chargement API");
  const [pendingDeletionId, setPendingDeletionId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const loadedProjects = await fetchProjects();

        if (!isMounted) {
          return;
        }

        setProjects(loadedProjects);
        setSelectedProjectId(loadedProjects[0]?.id ?? null);
        setStatus("Connecte a json-server");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setProjects(initialProjects);
        setSelectedProjectId(initialProjects[0]?.id ?? null);
        setStatus("Mode local");
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

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
  const editingProject =
    projects.find((project) => project.id === editingProjectId) ?? null;

  function removeProjectLocally(projectId) {
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

  async function handleDeleteProject(projectId) {
    setPendingDeletionId(projectId);

    try {
      await deleteProject(projectId);
      removeProjectLocally(projectId);
      setStatus("Projet supprime sur le serveur");
    } catch (error) {
      removeProjectLocally(projectId);
      setStatus("Suppression locale hors ligne");
    } finally {
      setPendingDeletionId(null);
    }
  }

  async function handleAddProject(projectData) {
    const optimisticProject = {
      ...projectData,
      id: getNextProjectId(projects)
    };

    try {
      const createdProject = await createProject(projectData);
      setProjects((currentProjects) => [createdProject, ...currentProjects]);
      setSelectedProjectId(createdProject.id);
      setStatus("Projet ajoute sur le serveur");
    } catch (error) {
      setProjects((currentProjects) => [optimisticProject, ...currentProjects]);
      setSelectedProjectId(optimisticProject.id);
      setStatus("Ajout local hors ligne");
    }
  }

  async function handleUpdateProject(projectData) {
    try {
      const savedProject = await updateProject(projectData.id, projectData);
      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === savedProject.id ? savedProject : project
        )
      );
      setSelectedProjectId(savedProject.id);
      setEditingProjectId(null);
      setStatus("Projet modifie sur le serveur");
    } catch (error) {
      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === projectData.id ? projectData : project
        )
      );
      setSelectedProjectId(projectData.id);
      setEditingProjectId(null);
      setStatus("Modification locale hors ligne");
    }
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

      <div className="form-layout">
        <AjouterProjet
          onAddProject={handleAddProject}
          onUpdateProject={handleUpdateProject}
          projectToEdit={editingProject}
          onCancelEdit={() => setEditingProjectId(null)}
        />

        <aside className="panel helper-panel">
          <h3>Rappels rapides</h3>
          <ul className="plain-list compact-list">
            <li>Le libelle doit etre clair et actionnable.</li>
            <li>Les technologies separentes par des virgules seront converties en tags.</li>
            <li>Le projet ajoute est automatiquement selectionne.</li>
            <li>Le bouton Editer pre-remplit le formulaire avec le projet courant.</li>
          </ul>
        </aside>
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
                  onDelete={handleDeleteProject}
                  onSelect={setSelectedProjectId}
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
          <h3>Projet selectionne</h3>
          <DetaillerProjet
            project={selectedProject}
            onCancel={() => setSelectedProjectId(null)}
            onEdit={() => setEditingProjectId(selectedProject?.id ?? null)}
          />
        </aside>
      </div>
    </section>
  );
}
