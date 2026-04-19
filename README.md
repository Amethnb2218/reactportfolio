# Portfolio React SPA

Application web SPA de gestion de portfolio realisee avec React et `json-server`.

## Fonctionnalites

- prototypage du portfolio en page unique
- decomposition en composants React
- composant `Dossier` pour gerer la liste des projets
- composant `Projet` pour afficher le libelle, l'image et la suppression
- composant `AjouterProjet` pour l'ajout de projet
- composant `DetaillerProjet` avec annulation et edition
- recherche, ajout, suppression et edition avec persistance REST

## Structure

- `src/App.jsx` : composition globale de la SPA
- `src/components/` : composants d'interface et composants metier
- `src/data/` : contenu statique du portfolio et donnees de secours
- `src/services/projectsApi.js` : appels REST vers `json-server`
- `db.json` : base de donnees factice des projets

## Lancement

Installez les dependances puis demarrez le front React et l'API dans deux terminaux.

```bash
npm install
npm run server
```

```bash
npm run dev
```

L'application React est disponible sur `http://localhost:5173`.

## Verification

```bash
npm run build
```

## Remarque

Si `json-server` n'est pas demarre, l'application retombe sur les donnees locales pour rester utilisable.
