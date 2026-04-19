import { useEffect, useRef, useState } from "react";

const initialFormData = {
  libelle: "",
  image: "",
  imageUrl: "",
  categorie: "",
  periode: "",
  statut: "",
  role: "",
  lien: "",
  technologies: "",
  description: ""
};

function toFormData(project) {
  if (!project) {
    return initialFormData;
  }

  return {
    libelle: project.libelle ?? "",
    image: project.image ?? "",
    imageUrl:
      typeof project.image === "string" && /^https?:\/\//i.test(project.image)
        ? project.image
        : "",
    categorie: project.categorie ?? "",
    periode: project.periode ?? "",
    statut: project.statut ?? "",
    role: project.role ?? "",
    lien: project.lien ?? "",
    technologies: Array.isArray(project.technologies)
      ? project.technologies.join(", ")
      : project.technologies ?? "",
    description: project.description ?? ""
  };
}

export default function AjouterProjet({
  onAddProject,
  onUpdateProject,
  projectToEdit = null,
  onCancelEdit
}) {
  const isEditing = Boolean(projectToEdit);
  const [formData, setFormData] = useState(toFormData(projectToEdit));
  const [feedback, setFeedback] = useState(
    "Ajoutez une nouvelle realisation a votre portfolio."
  );
  const imageInputRef = useRef(null);

  useEffect(() => {
    setFormData(toFormData(projectToEdit));
    setFeedback(
      isEditing
        ? "Modifiez les informations puis enregistrez la mise a jour."
        : "Ajoutez une nouvelle realisation a votre portfolio."
    );
  }, [isEditing, projectToEdit]);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "imageUrl") {
      setFormData((currentData) => ({
        ...currentData,
        imageUrl: value,
        image: value
      }));
      return;
    }

    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Impossible de lire ce fichier."));
      reader.readAsDataURL(file);
    });
  }

  async function handleImageFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const imageDataUrl = await readFileAsDataUrl(file);
      setFormData((currentData) => ({
        ...currentData,
        image: imageDataUrl,
        imageUrl: ""
      }));
      setFeedback(`Image selectionnee depuis l'appareil : ${file.name}`);
    } catch (error) {
      setFeedback("Impossible de charger cette image depuis l'appareil.");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const projectPayload = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),
      image: formData.image.trim(),
      periode: formData.periode.trim(),
      lien: formData.lien.trim()
    };

    delete projectPayload.imageUrl;

    if (isEditing) {
      await onUpdateProject({
        ...projectPayload,
        id: projectToEdit.id
      });
      setFeedback("Le projet a ete mis a jour.");
      return;
    }

    await onAddProject(projectPayload);
    setFormData(initialFormData);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    setFeedback("Le projet a ete ajoute au portfolio.");
  }

  return (
    <form className="panel project-form" id="formulaire-projet" onSubmit={handleSubmit}>
      <div className="panel-title-row">
        <div>
          <h3>{isEditing ? "Editer le projet" : "AjouterProjet"}</h3>
          <p className="muted">
            {isEditing
              ? "Mettez a jour les champs du projet selectionne."
              : "Remplissez les champs essentiels pour creer une nouvelle carte projet."}
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
          <span>Image par URL</span>
          <input
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://... (optionnel)"
          />
        </label>

        <label>
          <span>Image depuis l'appareil</span>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
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
            value={formData.periode}
            onChange={handleChange}
            placeholder="2026 (optionnel)"
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

      {formData.image ? (
        <div className="form-image-preview">
          <span>Apercu de l'image</span>
          <img src={formData.image} alt="Apercu du projet a enregistrer" />
        </div>
      ) : null}

      <div className="form-actions">
        <button className="button button-primary" type="submit">
          {isEditing ? "Enregistrer les modifications" : "Enregistrer le projet"}
        </button>
        {isEditing ? (
          <button className="button button-ghost" type="button" onClick={onCancelEdit}>
            Annuler l edition
          </button>
        ) : null}
        <p className="form-hint">{feedback}</p>
      </div>
    </form>
  );
}
