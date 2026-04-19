import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AjouterProjet from "../components/AjouterProjet.jsx";
import DetaillerProjet from "../components/DetaillerProjet.jsx";
import Topbar from "../components/Topbar.jsx";
import { useProjects } from "../context/ProjectsContext.jsx";

export default function ProjetDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { editProject, getProjectById } = useProjects();
  const [isEditing, setIsEditing] = useState(false);

  const project = getProjectById(id);

  async function handleUpdateProject(projectData) {
    const updatedProject = await editProject(projectData);
    setIsEditing(false);
    navigate(`/projets/${updatedProject.id}`);
  }

  return (
    <>
      <header className="page-hero">
        <Topbar />
        <div className="page-hero-copy">
          <p className="section-kicker">Detail</p>
          <h1>Detailler un projet</h1>
          <p>
            Cette page affiche les informations completes du projet selectionne
            et permet son edition.
          </p>
        </div>
      </header>
      <main id="contenu-principal">
        <section className="section">
          <div className="workspace-grid">
            <article className="panel">
              <div className="panel-title-row">
                <div>
                  <h3>DetaillerProjet</h3>
                  <p className="muted">
                    Le detail complet s&apos;affiche ici sur une page dediee.
                  </p>
                </div>
              </div>
              <DetaillerProjet
                project={project}
                onCancel={() => navigate("/dossier")}
                onEdit={() => setIsEditing(true)}
              />
            </article>

            <aside className="panel project-detail-panel">
              {isEditing ? (
                <AjouterProjet
                  projectToEdit={project}
                  onUpdateProject={handleUpdateProject}
                  onCancelEdit={() => setIsEditing(false)}
                />
              ) : (
                <>
                  <h3>Edition</h3>
                  <p className="muted">
                    Cliquez sur Editer pour modifier les informations du projet
                    depuis cette page.
                  </p>
                </>
              )}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
