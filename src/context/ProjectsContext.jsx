import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialProjects } from "../data/projects.js";
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject
} from "../services/projectsApi.js";

const ProjectsContext = createContext(null);

function getNextProjectId(projects) {
  return projects.reduce((maxId, project) => Math.max(maxId, project.id), 0) + 1;
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);
  const [status, setStatus] = useState("Chargement API");
  const [pendingDeletionId, setPendingDeletionId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const loadedProjects = await fetchProjects();

        if (!isMounted) {
          return;
        }

        setProjects(loadedProjects);
        setStatus("Connecte a json-server");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setProjects(initialProjects);
        setStatus("Mode local");
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  async function addProject(projectData) {
    const optimisticProject = {
      ...projectData,
      id: getNextProjectId(projects)
    };

    try {
      const createdProject = await createProject(projectData);
      setProjects((currentProjects) => [createdProject, ...currentProjects]);
      setStatus("Projet ajoute sur le serveur");
      return createdProject;
    } catch (error) {
      setProjects((currentProjects) => [optimisticProject, ...currentProjects]);
      setStatus("Ajout local hors ligne");
      return optimisticProject;
    }
  }

  async function editProject(projectData) {
    try {
      const savedProject = await updateProject(projectData.id, projectData);
      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === savedProject.id ? savedProject : project
        )
      );
      setStatus("Projet modifie sur le serveur");
      return savedProject;
    } catch (error) {
      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === projectData.id ? projectData : project
        )
      );
      setStatus("Modification locale hors ligne");
      return projectData;
    }
  }

  async function removeProject(projectId) {
    setPendingDeletionId(projectId);

    try {
      await deleteProject(projectId);
      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== projectId)
      );
      setStatus("Projet supprime sur le serveur");
    } catch (error) {
      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== projectId)
      );
      setStatus("Suppression locale hors ligne");
    } finally {
      setPendingDeletionId(null);
    }
  }

  function getProjectById(projectId) {
    return (
      projects.find((project) => String(project.id) === String(projectId)) ?? null
    );
  }

  const value = useMemo(
    () => ({
      projects,
      status,
      pendingDeletionId,
      addProject,
      editProject,
      removeProject,
      getProjectById
    }),
    [projects, status, pendingDeletionId]
  );

  return (
    <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error("useProjects doit etre utilise dans ProjectsProvider.");
  }

  return context;
}
