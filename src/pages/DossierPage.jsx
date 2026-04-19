import Dossier from "../components/Dossier.jsx";
import Topbar from "../components/Topbar.jsx";

export default function DossierPage() {
  return (
    <>
      <header className="page-hero">
        <Topbar />
        <div className="page-hero-copy">
          <p className="section-kicker">Dossier</p>
          <h1>Dossier des projets</h1>
          <p>
            Cette page est dediee a la consultation, la recherche et la
            suppression des projets du portfolio.
          </p>
        </div>
      </header>
      <main id="contenu-principal">
        <Dossier />
      </main>
    </>
  );
}
