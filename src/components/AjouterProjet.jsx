import { useState } from "react";

const initialFormData = {
  libelle: "",
  image: "",
  categorie: "",
  periode: "",
  statut: "",
  role: "",
  lien: "",
  technologies: "",
  description: ""
};

export default function AjouterProjet({ onAddProject }) {
  const [formData, setFormData] = useState(initialFormData);
  const [feedback, setFeedback] = useState(
    "Ajoutez une nouvelle realisation a votre portfolio."
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newProject = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
      lien: formData.lien.trim()
    };

    onAddProject(newProject);
    setFormData(initialFormData);
    setFeedback("Le projet a ete ajoute au portfolio.");
  }

  return (
    <form className="panel project-form" onSubmit={handleSubmit}>
      <div className="panel-title-row">
        <div>
          <h3>AjouterProjet</h3>
          <p className="muted">
            Remplissez les champs essentiels pour creer une nouvelle carte
            projet.
          </p>
        </div>
      </div>

      <div className="form-grid">
        <label>
          <span>Libelle</span>
          <input
            name="libelle"
            type="text"
            minLength="4"
            required
            value={formData.libelle}
            onChange={handleChange}
            placeholder="Ex : Plateforme de gestion cloud"
          />
        </label>

        <label>
          <span>Image</span>
          <input
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        <label>
          <span>Categorie</span>
          <input
            name="categorie"
            type="text"
            required
            value={formData.categorie}
            onChange={handleChange}
            placeholder="SaaS, Cloud, Reseau..."
          />
        </label>

        <label>
          <span>Periode</span>
          <input
            name="periode"
            type="text"
            required
            value={formData.periode}
            onChange={handleChange}
            placeholder="2026"
          />
        </label>

        <label>
          <span>Statut</span>
          <input
            name="statut"
            type="text"
            required
            value={formData.statut}
            onChange={handleChange}
            placeholder="En cours, livre..."
          />
        </label>

        <label>
          <span>Role</span>
          <input
            name="role"
            type="text"
            required
            value={formData.role}
            onChange={handleChange}
            placeholder="Developpeur Full Stack"
          />
        </label>

        <label className="form-column">
          <span>Technologies</span>
          <input
            name="technologies"
            type="text"
            required
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, PostgreSQL"
          />
        </label>

        <label className="form-column">
          <span>Lien</span>
          <input
            name="lien"
            type="url"
            value={formData.lien}
            onChange={handleChange}
            placeholder="https://mon-projet.com"
          />
        </label>

        <label className="form-column-full">
          <span>Description</span>
          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description libre du projet"
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="button button-primary" type="submit">
          Enregistrer le projet
        </button>
        <p className="form-hint">{feedback}</p>
      </div>
    </form>
  );
}
