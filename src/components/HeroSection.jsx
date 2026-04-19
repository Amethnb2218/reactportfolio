import { Link } from "react-router-dom";
import portrait from "../../assets/images/mouhamed-sall.jpeg";
import { useProjects } from "../context/ProjectsContext.jsx";

export default function HeroSection() {
  const { projects, status } = useProjects();
  const highlightedProjects = projects.slice(0, 3);

  return (
    <div className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">Portfolio professionnel</p>
        <h1>Mouhamed Sall</h1>
        <p className="hero-role">
          Developpeur Full Stack Junior | DevOps & Cloud | Reseaux & Systemes
        </p>
        <p className="hero-summary">
          Application SPA en React pour presenter le profil, le parcours et
          surtout gerer un portfolio de projets dans une interface unique.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary" to="/dossier">
            Gerer les projets
          </Link>
          <a
            className="button button-ghost"
            href="https://jolofera.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Visiter Jolofera
          </a>
        </div>

        <ul className="hero-metrics" aria-label="Points cles">
          <li>
            <strong>{projects.length}</strong>
            <span>projets references</span>
          </li>
          <li>
            <strong>SPA React</strong>
            <span>navigation unifiee</span>
          </li>
          <li>
            <strong>REST API</strong>
            <span>{status}</span>
          </li>
        </ul>

        <div className="hero-note">
          <p className="hero-note-title">Navigation rapide</p>
          <div className="hero-inline-grid">
            <Link className="hero-mini-card" to="/dossier">
              <strong>Dossier projets</strong>
              <span>Consulter, rechercher et supprimer les projets.</span>
            </Link>
            <Link className="hero-mini-card" to="/ajouter-projet">
              <strong>AjouterProjet</strong>
              <span>Creer une nouvelle realisation avec image et details.</span>
            </Link>
          </div>
        </div>
      </div>

      <aside className="hero-spotlight">
        <div className="spotlight-frame">
          <figure className="portrait-card">
            <img
              className="portrait-image"
              src={portrait}
              alt="Portrait de Mouhamed Sall"
            />
            <figcaption>
              Etudiant ingenieur a Dakar avec une experience terrain en
              telecommunications, cloud et developpement full stack.
            </figcaption>
          </figure>

          <div className="spotlight-card profile-aside">
            <p className="spotlight-title">Axes du projet React</p>
            <ul className="plain-list quick-facts">
              <li>Afficher, ajouter, rechercher et supprimer des projets.</li>
              <li>Consulter puis editer le detail complet d'un projet.</li>
              <li>Persister les donnees avec un serveur REST factice.</li>
            </ul>
          </div>

          <div className="spotlight-card">
            <p className="spotlight-title">Projets a la une</p>
            <div className="hero-feature-list">
              {highlightedProjects.map((project) => (
                <Link
                  className="hero-feature-item"
                  key={project.id}
                  to={`/projets/${project.id}`}
                >
                  <strong>{project.libelle}</strong>
                  <span>
                    {project.categorie} · {project.statut}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
