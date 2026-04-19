import { Link } from "react-router-dom";
import portrait from "../../assets/images/mouhamed-sall.jpeg";

export default function HeroSection() {
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
            <strong>SPA React</strong>
            <span>une seule interface</span>
          </li>
          <li>
            <strong>REST API</strong>
            <span>persistance json-server</span>
          </li>
          <li>
            <strong>Portfolio</strong>
            <span>gestion des projets</span>
          </li>
        </ul>
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
        </div>
      </aside>
    </div>
  );
}
