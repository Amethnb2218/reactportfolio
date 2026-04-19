export default function PortfolioIntroSection() {
  return (
    <section className="section" id="portfolio">
      <div className="section-heading">
        <p className="section-kicker">Portfolio</p>
        <h2>Prototype de l&apos;espace de gestion des projets</h2>
        <p>
          La prochaine etape consiste a brancher les composants React
          specialises pour gerer le cycle complet des projets.
        </p>
      </div>

      <div className="workspace-grid">
        <article className="panel">
          <div className="panel-title-row">
            <div>
              <h3>Liste des projets</h3>
              <p className="muted">
                Zone reservee au composant Dossier et a la liste de projets.
              </p>
            </div>
            <span className="status-badge">Prototype</span>
          </div>

          <div className="project-detail-empty">
            L&apos;interface React est prete. Les composants Dossier, Projet,
            AjouterProjet et DetaillerProjet seront ajoutes ensuite.
          </div>
        </article>

        <aside className="panel project-detail-panel">
          <h3>Objectifs fonctionnels</h3>
          <ul className="plain-list compact-list">
            <li>Ajouter un nouveau projet a partir d&apos;un formulaire.</li>
            <li>Rechercher un projet par son libelle ou sa categorie.</li>
            <li>Afficher le detail complet en cliquant sur le libelle.</li>
            <li>Supprimer et editer les projets avec persistance serveur.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
