import { creerProjetViaApi, supprimerProjetViaApi } from "./api.js";
import { references } from "./dom.js";
import { projets, sauvegarderProjetsSession } from "./state.js";

function estElementPresent(element) {
  return Boolean(element);
}

function genererCarteProjet(projet, options = {}) {
  const {
    afficherSuppression = true,
    urlDetail = `detailler-projet.html?id=${encodeURIComponent(projet.id)}`
  } = options;

  const carte = document.createElement("article");
  const technologies = projet.technologies?.length
    ? projet.technologies.slice(0, 3).join(" • ")
    : "";
  const resumeCarte = projet.description || technologies || "";

  carte.className = "project-card";
  carte.dataset.projetId = String(projet.id);

  carte.innerHTML = `
    <span class="project-card-category">${projet.categorie ?? "Projet"}</span>
    <h4>${projet.libelle}</h4>
    ${projet.image ? `<img src="${projet.image}" alt="Illustration du projet ${projet.libelle}" />` : ""}
    <p>${resumeCarte}</p>
    <div class="project-card-meta">
      <span>${projet.statut ?? "Statut non renseigné"}</span>
      <span>${projet.periode ?? "Période non renseignée"}</span>
    </div>
    <div class="card-actions">
      <a class="detail-link" href="${urlDetail}">Voir le détail</a>
      ${afficherSuppression ? '<button class="delete-button" type="button" data-action="delete">Supprimer</button>' : ""}
    </div>
  `;

  return carte;
}

export function trouverProjetParId(id) {
  return projets.find((projet) => String(projet.id) === String(id));
}

export function creerProjet(id, libelle, image, container = references.listeProjets) {
  if (!estElementPresent(container)) {
    return null;
  }

  const projet = trouverProjetParId(id) ?? { id, libelle, image };
  const carte = genererCarteProjet(projet);
  container.prepend(carte);
  return carte;
}

export function afficherProjets(container = references.listeProjets, options = {}) {
  if (!estElementPresent(container)) {
    return;
  }

  container.innerHTML = "";
  [...projets].reverse().forEach((projet) => {
    const carte = genererCarteProjet(projet, options);
    container.append(carte);
  });
}

export function afficherProjetsVedette() {
  if (!estElementPresent(references.projetsVedette)) {
    return;
  }

  references.projetsVedette.innerHTML = "";
  projets.slice(0, 2).forEach((projet) => {
    const carte = genererCarteProjet(projet, { afficherSuppression: false });
    references.projetsVedette.append(carte);
  });
}

export function detaillerProjet(id) {
  const projet = trouverProjetParId(id);

  if (!projet || !estElementPresent(references.detailProjet)) {
    if (estElementPresent(references.detailProjet)) {
      references.detailProjet.classList.add("is-hidden");
    }

    if (estElementPresent(references.detailProjetVide)) {
      references.detailProjetVide.classList.remove("is-hidden");
      references.detailProjetVide.textContent =
        "Sélectionnez un projet pour afficher ses informations.";
    }
    return;
  }

  references.detailProjetVide?.classList.add("is-hidden");
  references.detailProjet.classList.remove("is-hidden");
  references.detailCategorie.textContent = projet.categorie ?? "Projet";
  references.detailLibelle.textContent = projet.libelle;
  references.detailDescription.textContent = projet.description || "";
  references.detailDescription.classList.toggle("is-hidden", !projet.description);
  references.detailImage.src = projet.image || "";
  references.detailImage.classList.toggle("is-hidden", !projet.image);
  references.detailPeriode.textContent = projet.periode ?? "Non renseignée";
  references.detailStatut.textContent = projet.statut ?? "Non renseigné";
  references.detailRole.textContent = projet.role ?? "Non renseigné";

  if (projet.lien) {
    references.detailLien.innerHTML = `<a href="${projet.lien}" target="_blank" rel="noreferrer noopener">${projet.lien}</a>`;
  } else {
    references.detailLien.textContent = "Non renseigné";
  }

  references.detailTechnologies.innerHTML = "";
  (projet.technologies ?? []).forEach((technologie) => {
    const tag = document.createElement("span");
    tag.textContent = technologie;
    references.detailTechnologies.append(tag);
  });

  const boutonsSelection = references.selectionProjets?.querySelectorAll("[data-projet-id]");
  boutonsSelection?.forEach((bouton) => {
    bouton.classList.toggle(
      "is-active",
      bouton.dataset.projetId === String(projet.id)
    );
  });
}

export function afficherSelectionProjets() {
  if (!estElementPresent(references.selectionProjets)) {
    return;
  }

  references.selectionProjets.innerHTML = "";
  projets.forEach((projet) => {
    const bouton = document.createElement("button");
    bouton.className = "selector-button";
    bouton.type = "button";
    bouton.dataset.projetId = String(projet.id);
    bouton.innerHTML = `
      <strong>${projet.libelle}</strong>
      <span>${projet.categorie ?? "Projet"} • ${projet.periode ?? "Période non renseignée"}</span>
    `;
    references.selectionProjets.append(bouton);
  });
}

function lireProjetDepuisFormulaire() {
  return {
    id: Date.now(),
    libelle: references.champLibelle.value.trim(),
    image: references.champImage.value.trim(),
    categorie: references.champCategorie.value.trim(),
    periode: references.champPeriode.value.trim(),
    statut: references.champStatut.value.trim(),
    role: references.champRole.value.trim(),
    lien: references.champLien.value.trim(),
    technologies: references.champTechnologies.value
      .split(",")
      .map((technologie) => technologie.trim())
      .filter(Boolean),
    description: references.champDescription.value.trim()
  };
}

export async function ajouterProjet(event, options = {}) {
  event.preventDefault();

  const { redirection = null } = options;
  const nouveauProjet = lireProjetDepuisFormulaire();

  try {
    const projetPersiste = await creerProjetViaApi(nouveauProjet);
    projets.unshift(projetPersiste);
  } catch (error) {
    projets.unshift(nouveauProjet);
  }

  sauvegarderProjetsSession();

  references.formAjoutProjet?.reset();

  if (estElementPresent(references.retourFormulaire)) {
    references.retourFormulaire.textContent = "Projet enregistré avec succès.";
  }

  if (redirection) {
    window.location.href = redirection;
  }
}

export async function supprimerProjet(id) {
  const indexProjet = projets.findIndex(
    (projet) => String(projet.id) === String(id)
  );

  if (indexProjet === -1) {
    return;
  }

  try {
    await supprimerProjetViaApi(id);
  } catch (error) {
    // La suppression locale reste prioritaire si l'API ne répond pas.
  }

  projets.splice(indexProjet, 1);
  sauvegarderProjetsSession();
  references.listeProjets
    ?.querySelector(`[data-projet-id="${id}"]`)
    ?.remove();
}

export function activerActionsProjet(onChange) {
  if (!estElementPresent(references.listeProjets)) {
    return;
  }

  references.listeProjets.addEventListener("click", async (event) => {
    const bouton = event.target.closest("[data-action='delete']");

    if (!bouton) {
      return;
    }

    const carte = bouton.closest("[data-projet-id]");
    await supprimerProjet(carte?.dataset.projetId);
    onChange?.();
  });
}

export function activerSelectionDetail() {
  if (!estElementPresent(references.selectionProjets)) {
    return;
  }

  references.selectionProjets.addEventListener("click", (event) => {
    const bouton = event.target.closest("[data-projet-id]");

    if (!bouton) {
      return;
    }

    const idProjet = bouton.dataset.projetId;
    detaillerProjet(idProjet);
    const url = new URL(window.location.href);
    url.searchParams.set("id", idProjet);
    window.history.replaceState({}, "", url);
  });
}
