# Portfolio React SPA

Application web SPA de gestion de portfolio realisee avec React et connectee a l'API Express/MongoDB `EXPRESSJS PORTFOLIO`.

## Fonctionnalites

- prototypage du portfolio en page unique
- decomposition en composants React
- composant `Dossier` pour gerer la liste des projets
- composant `Projet` pour afficher le libelle, l'image et la suppression
- composant `AjouterProjet` pour l'ajout de projet
- composant `DetaillerProjet` avec annulation et edition
- recherche, ajout, suppression et edition avec persistance REST via Express

## Structure

- `src/App.jsx` : composition globale de la SPA
- `src/components/` : composants d'interface et composants metier
- `src/data/` : contenu statique du portfolio et donnees de secours
- `src/services/projectsApi.js` : appels REST vers le backend Express
- `src/data/` : donnees de secours si l'API est indisponible

## Lancement

Installez les dependances puis demarrez le backend Express et le front React dans deux terminaux.

```bash
cd "../EXPRESSJS PORTFOLIO"
npm install
npm run dev
```

```bash
cd "../reactportfolio"
npm install
npm run dev
```

L'application React est disponible sur `http://localhost:5173`.
Le backend Express doit etre disponible sur `http://localhost:5000`.

## Verification

```bash
npm run build
```

## Remarque

En developpement, Vite transfere les appels `/api` vers `http://localhost:5000`.
Si l'API Express n'est pas demarree, l'application retombe sur les donnees locales pour rester utilisable.
