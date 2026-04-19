import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import { ProjectsProvider } from "./context/ProjectsContext.jsx";
import AjouterProjetPage from "./pages/AjouterProjetPage.jsx";
import DossierPage from "./pages/DossierPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjetDetailPage from "./pages/ProjetDetailPage.jsx";

export default function App() {
  return (
    <HashRouter>
      <ProjectsProvider>
        <div className="page-shell">
          <a className="skip-link" href="#contenu-principal">
            Aller au contenu principal
          </a>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dossier" element={<DossierPage />} />
            <Route path="/ajouter-projet" element={<AjouterProjetPage />} />
            <Route path="/projets/:id" element={<ProjetDetailPage />} />
          </Routes>
          <Footer />
        </div>
      </ProjectsProvider>
    </HashRouter>
  );
}
