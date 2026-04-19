# Portfolio Web Vanilla JavaScript

Portfolio professionnel de Mouhamed Sall réalisé en HTML, CSS et JavaScript vanilla avec persistance via `json-server`.

## Pages

- `index.html` : accueil et présentation
- `lister-projets.html` : liste des projets
- `detailler-projet.html` : détail d'un projet
- `ajouter-projet.html` : ajout d'un projet

## JavaScript

- `js/dom.js` : références DOM communes
- `js/state.js` : état mémoire et données de secours
- `js/projets.js` : création, ajout, détail et suppression des projets
- `js/api.js` : appels REST
- `js/app.js` : initialisation selon la page affichée
- `js/portfolio-data.js` : expériences, formation, certifications et langues

## Lancement

```bash
npm install
npm start
```

Ouvrir ensuite `http://localhost:3000`.

## Vérification

```bash
npm run check
```

## Remarque

Si `json-server` n'est pas démarré, l'application utilise les données mémoire locales pour rester fonctionnelle.
