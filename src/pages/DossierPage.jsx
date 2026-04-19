import Dossier from "../components/Dossier.jsx";
import Topbar from "../components/Topbar.jsx";
import { useProjects } from "../context/ProjectsContext.jsx";

export default function DossierPage() {
  const { projects, status } = useProjects();

  return (
    <>
      <header className="page-hero">
        <Topbar />
        <div className="page-hero-copy page-hero-layout">
          <div>
            <p className="section-kicker">Dossier</p>
            <h1>Dossier des projets</h1>
            <p>
              Une vue de pilotage plus compacte pour rechercher, consulter et
              gerer les projets du portfolio sans dispersion visuelle.
            </p>
          </div>
          <div className="page-summary-card">
            <span className="status-badge">{status}</span>
            <div className="page-summary-metrics">
              <div>
                <strong>{projects.length}</strong>
                <span>projets actifs</span>
              </div>
              <div>
                <strong>
                  {new Set(projects.map((project) => project.categorie)).size}
                </strong>
                <span>categories</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main id="contenu-principal">
        <Dossier />
      </main>
    </>
  );
}
