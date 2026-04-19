import { recupererProjetsDepuisApi } from "./api.js";
import { references } from "./dom.js";
import {
  complementPortfolio,
  experiencesProfessionnelles,
  formations
} from "./portfolio-data.js";
import {
  activerActionsProjet,
  activerSelectionDetail,
  ajouterProjet,
  afficherProjets,
  afficherProjetsVedette,
  afficherSelectionProjets,
  detaillerProjet
} from "./projets.js";
import {
  initialiserProjetsEnMemoire,
  lireProjetsSession,
  projets,
  remplacerProjets,
  sauvegarderProjetsSession
} from "./state.js";

function mettreAJourCompteur() {
  if (references.compteurProjets) {
    references.compteurProjets.textContent = String(projets.length);
  }
}

function fermerMenuMobile() {
  if (!references.menuPrincipal || !references.menuButton) {
    return;
  }

  references.menuPrincipal.classList.remove("is-open");
  references.menuButton.setAttribute("aria-expanded", "false");
}

function activerNavigationMobile() {
  if (!references.menuPrincipal || !references.menuButton) {
    return;
  }

  const mediaQueryMobile = window.matchMedia("(max-width: 720px)");

  references.menuButton.addEventListener("click", () => {
    const menuOuvert = references.menuPrincipal.classList.toggle("is-open");
    references.menuButton.setAttribute("aria-expanded", String(menuOuvert));
  });

  references.menuPrincipal.querySelectorAll("a").forEach((lien) => {
    lien.addEventListener("click", () => {
      if (mediaQueryMobile.matches) {
        fermerMenuMobile();
      }
    });
  });

  mediaQueryMobile.addEventListener("change", (event) => {
    if (!event.matches) {
      fermerMenuMobile();
    }
  });
}

function creerTimelineItem({ titre, organisme = "", meta, points = [] }) {
  const article = document.createElement("article");
  article.className = "timeline-item";
  article.innerHTML = `
    <h4>${titre}</h4>
    <p class="timeline-meta">${organisme ? `${organisme} | ` : ""}${meta}</p>
    <ul>
      ${points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;
  return article;
}

function renderiserParcours() {
  if (!references.blocExperience || !references.blocFormation || !references.blocComplementaire) {
    return;
  }

  references.blocExperience.innerHTML = "";
  experiencesProfessionnelles.forEach((experience) => {
    references.blocExperience.append(creerTimelineItem(experience));
  });

  references.blocFormation.innerHTML = formations
    .map(
      (formation) => `
        <article class="timeline-item">
          <h4>${formation}</h4>
        </article>
      `
    )
    .join("");

  references.blocComplementaire.innerHTML = `
    <article class="timeline-item">
      <h4>Certifications</h4>
      <ul>
        ${complementPortfolio.certifications
          .map((certification) => `<li>${certification}</li>`)
          .join("")}
      </ul>
    </article>
    <article class="timeline-item">
      <h4>Langues</h4>
      <ul>
        ${complementPortfolio.langues
          .map((langue) => `<li>${langue}</li>`)
          .join("")}
      </ul>
    </article>
  `;
}

async function chargerProjets() {
  try {
    const projetsDistants = await recupererProjetsDepuisApi();
    remplacerProjets(projetsDistants);
    sauvegarderProjetsSession();
    if (references.etatApplication) {
      references.etatApplication.textContent = "Portfolio à jour";
    }
  } catch (error) {
    const projetsSession = lireProjetsSession();

    if (projetsSession.length > 0) {
      remplacerProjets(projetsSession);
    } else {
      initialiserProjetsEnMemoire();
      sauvegarderProjetsSession();
    }

    if (references.etatApplication) {
      references.etatApplication.textContent = "Mode local";
    }
  }
}

function activerFormulaire() {
  if (!references.formAjoutProjet) {
    return;
  }

  references.formAjoutProjet.addEventListener("submit", async (event) => {
    await ajouterProjet(event, { redirection: "lister-projets.html" });
  });
}

function initialiserPageAccueil() {
  renderiserParcours();
  afficherProjetsVedette();
}

function initialiserPageListe() {
  afficherProjets();
  activerActionsProjet(mettreAJourCompteur);
}

function initialiserPageDetail() {
  afficherSelectionProjets();
  activerSelectionDetail();

  const params = new URLSearchParams(window.location.search);
  const idDepuisUrl = params.get("id");
  const projetInitial = projets.find(
    (projet) => String(projet.id) === String(idDepuisUrl)
  );
  detaillerProjet(projetInitial?.id ?? projets[0]?.id);
}

function initialiserPageAjout() {
  activerFormulaire();
}

async function initialiserInterface() {
  activerNavigationMobile();
  await chargerProjets();
  mettreAJourCompteur();

  switch (references.pageCourante) {
    case "home":
      initialiserPageAccueil();
      break;
    case "list":
      initialiserPageListe();
      break;
    case "detail":
      initialiserPageDetail();
      break;
    case "add":
      initialiserPageAjout();
      break;
    default:
      break;
  }
}

initialiserInterface();
