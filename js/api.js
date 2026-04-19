const API_URL =
  window.location.protocol.startsWith("http")
    ? `${window.location.origin}/projets`
    : "http://localhost:3000/projets";

async function requeteApi(url, options = {}) {
  const reponse = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!reponse.ok) {
    throw new Error(`Erreur API (${reponse.status})`);
  }

  if (reponse.status === 204) {
    return null;
  }

  return reponse.json();
}

export async function recupererProjetsDepuisApi() {
  return requeteApi(API_URL);
}

export async function creerProjetViaApi(projet) {
  return requeteApi(API_URL, {
    method: "POST",
    body: JSON.stringify(projet)
  });
}

export async function supprimerProjetViaApi(id) {
  return requeteApi(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
