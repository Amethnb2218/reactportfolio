export const projets = [];

export const projetsDeBase = [
  {
    id: 1,
    libelle: "Jolofera - Plateforme SaaS Réservation & E-commerce",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80",
    categorie: "SaaS",
    periode: "2024 - Présent",
    statut: "En production",
    role: "Fondateur & Développeur Full Stack",
    lien: "https://jolofera.com",
    technologies: ["React 18", "Vite", "Node.js", "Express.js", "PostgreSQL"],
    description:
      "Plateforme SaaS multi-tenant pour salons et boutiques avec réservation, e-commerce et paiements multi-passerelles."
  },
  {
    id: 2,
    libelle: "Pilotage Production B2B - Fibre & ADSL",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
    categorie: "Télécoms",
    periode: "Nov. 2024 - Déc. 2025",
    statut: "Livré",
    role: "Pilote Production B2B",
    lien: "",
    technologies: ["FTTH", "FTTO", "ADSL", "GAIA", "SONIS", "Excel"],
    description:
      "Supervision des productions B2B, coordination des équipes terrain et suivi de la qualité de service pour les clients entreprises."
  },
  {
    id: 3,
    libelle: "Déploiement Réseaux & Cybersécurité",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    categorie: "Infrastructure",
    periode: "Mai 2024 - Juin 2024",
    statut: "Terminé",
    role: "Stagiaire Réseaux & Cybersécurité",
    lien: "",
    technologies: ["Caméras IP", "Switches", "Microsoft Exchange"],
    description:
      "Projet technique autour de l'installation de caméras IP, de la configuration de switches et d'un serveur de messagerie Exchange."
  }
];

export function initialiserProjetsEnMemoire() {
  projets.splice(0, projets.length, ...projetsDeBase);
}

export function remplacerProjets(listeProjets = []) {
  projets.splice(0, projets.length, ...listeProjets);
}

export function sauvegarderProjetsSession() {
  window.sessionStorage.setItem("portfolio-projets", JSON.stringify(projets));
}

export function lireProjetsSession() {
  const donnees = window.sessionStorage.getItem("portfolio-projets");

  if (!donnees) {
    return [];
  }

  try {
    return JSON.parse(donnees);
  } catch (error) {
    return [];
  }
}
