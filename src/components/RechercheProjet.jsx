export default function RechercheProjet({
  search,
  onSearchChange,
  resultCount,
  totalCount
}) {
  return (
    <div className="search-toolbar">
      <label className="search-field">
        <span>Rechercher un projet</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Libelle, categorie, technologie..."
        />
      </label>

      <p className="muted">
        {resultCount} resultat(s) sur {totalCount} projet(s)
      </p>
    </div>
  );
}
