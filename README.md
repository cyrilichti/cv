# CV — Cyril Ichti

Mon CV personnel, version web optimisée pour l'impression.

Le CV principal est une **one-page** au format **A4** (210 × 297 mm). Le contenu se modifie dans des fichiers de données, sans toucher aux composants React.

## Lancement avec Docker

```bash
docker compose up --build
```

Ouvrir [http://localhost:3001/cv](http://localhost:3001/cv)

## Lancement local

```bash
npm install
npm start
```

Ouvrir [http://localhost:3001/cv](http://localhost:3001/cv)

## Impression

Utiliser l'impression du navigateur (`Cmd + P` / `Ctrl + P`) pour générer un PDF ou imprimer. Le bouton d'impression sur la page déclenche la même action.

## Themes

The CV follows the device color preference until the theme button is used. A manual choice is saved for later visits. Printed output always uses the light palette.

## Browser tests

```bash
npm install
npx playwright install chromium
npm test
```

The browser suite covers system preferences, manual switching with pointer and keyboard, persistence, text contrast, layout preservation, and light printed output. Run `npm run build` to validate the production build.
