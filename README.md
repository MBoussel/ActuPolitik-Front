# ActuPolitik Frontend

Interface React TypeScript pour consulter des résumés d'actualité politique française.

## Stack

- **React 18** + TypeScript
- **Vite** (build tool)
- **Axios** (requêtes HTTP)
- **CSS Modules** (styles componentisés)
- **Google Fonts** (Montserrat + Inter)

## Installation
```bash
# Dépendances
npm install
```

## Lancer
```bash
npm run dev
```

Application : http://localhost:5173/

## Architecture
```
src/
├── components/
│   ├── SearchForm.tsx         # Formulaire de recherche
│   ├── SearchForm.css
│   ├── SummaryDisplay.tsx     # Affichage des résumés
│   ├── SummaryDisplay.css
│   ├── LoadingSpinner.tsx     # Animation de chargement
│   └── LoadingSpinner.css
├── services/
│   └── api.ts                 # Client API (axios)
├── types/
│   └── index.ts               # Types TypeScript
├── styles/
│   ├── variables.css          # Variables CSS globales
│   └── global.css             # Styles globaux
├── assets/
│   └── actupolitik-hero.jpg   # Image hero
├── App.tsx                    # Composant principal
└── main.tsx                   # Point d'entrée
```

## Fonctionnalités

**Interface utilisateur**
- Recherche par nom de personnalité politique
- Exemples cliquables (Macron, Le Pen, etc.)
- Animation de chargement pendant la génération
- Affichage du résumé avec sources cliquables
- Gestion d'erreurs explicite

**Design**
- Image hero (Arc de Triomphe)
- Typographie punch (Montserrat bold)
- Gradient violet moderne
- Responsive (mobile-friendly)
- Animations smooth (fadeInUp, hover)

**UX**
- Autocomplétion disabled pendant le chargement
- Bouton "Nouvelle recherche" pour recommencer
- Sources en grille horizontale
- Messages d'erreur clairs en français

## Configuration
Créer un fichier `.env` à la racine :
```bash
cp .env.example .env
```

Variables disponibles :

| Variable | Description 
|----------|-------------
| `VITE_API_URL` | URL du backend API 

**Exemple pour production :**
```env
VITE_API_URL=https://api.actupolitik.fr
```


## Build de production
```bash
npm run build
```

Les fichiers optimisés seront dans `dist/`

## Choix techniques

**TypeScript** : Type safety pour éviter les bugs. Tous les composants, props et réponses API sont typés.

**CSS modulaire** : Un fichier CSS par composant pour la maintenabilité. Variables CSS centralisées pour la cohérence visuelle.

**Axios** : Gestion d'erreurs plus simple que fetch natif. Intercepteurs pour logger les requêtes en dev.

**Vite** : Build ultra-rapide comparé à Create React App. HMR (Hot Module Replacement) instantané pendant le dev.