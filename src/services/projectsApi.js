const API_URL = "/api/projects";

function normalizeProject(project) {
  if (!project) {
    return project;
  }

  return {
    ...project,
    id: project.id ?? project._id
  };
}

function normalizeApiResponse(payload) {
  const data = payload?.data ?? payload;

  if (Array.isArray(data)) {
    return data.map(normalizeProject);
  }

  return normalizeProject(data);
}

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    let message = `Erreur API (${response.status})`;

    try {
      const payload = await response.json();
      message = payload.error || payload.message || message;
    } catch (error) {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json();

  return normalizeApiResponse(payload);
}

export function fetchProjects() {
  return apiRequest(API_URL);
}

export function createProject(project) {
  return apiRequest(API_URL, {
    method: "POST",
    body: JSON.stringify(project)
  });
}

export function deleteProject(projectId) {
  return apiRequest(`${API_URL}/${projectId}`, {
    method: "DELETE"
  });
}

export function updateProject(projectId, project) {
  return apiRequest(`${API_URL}/${projectId}`, {
    method: "PUT",
    body: JSON.stringify(project)
  });
}
