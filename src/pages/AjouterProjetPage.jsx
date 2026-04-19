import { useNavigate } from "react-router-dom";
import AjouterProjet from "../components/AjouterProjet.jsx";
import Topbar from "../components/Topbar.jsx";
import { useProjects } from "../context/ProjectsContext.jsx";

export default function AjouterProjetPage() {
  const navigate = useNavigate();
  const { addProject } = useProjects();

  async function handleAddProject(projectData) {
    const createdProject = await addProject(projectData);
    navigate(`/projets/${createdProject.id}`);
  }

  return (
    <>
      <header className="page-hero">
        <Topbar />
        <div className="page-hero-copy">
          <p className="section-kicker">Ajout</p>
          <h1>Ajouter un projet</h1>
          <p>
            Cette page contient uniquement le formulaire d&apos;ajout d&apos;un
            projet au portfolio.
          </p>
        </div>
      </header>
      <main id="contenu-principal">
        <section className="section">
          <div className="form-layout">
            <AjouterProjet onAddProject={handleAddProject} />
            <aside className="panel helper-panel">
              <h3>Rappels rapides</h3>
              <ul className="plain-list compact-list">
                <li>Le libelle doit etre clair et actionnable.</li>
                <li>Les technologies separees par des virgules deviennent des tags.</li>
                <li>Apres ajout, vous serez redirige vers la page de detail du projet.</li>
              </ul>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
