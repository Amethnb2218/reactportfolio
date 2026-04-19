const API_URL = "/api/projets";

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Erreur API (${response.status})`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
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
