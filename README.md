# LastChampion

**Who's gonna win?**

LastChampion est une application de tournoi en élimination directe. Choisis 8 personnages parmi un thème, fais-les s'affronter en 1v1 et découvre qui sera le dernier champion.

🔗 [lastchampion.live](https://khadija-asa.github.io/LastChampion/)

---

## Fonctionnalités

- **+20 thèmes** — Anime, Pokémon, Super-Héros, LoL, One Piece, Basket, Football, Films, Séries, et plus
- **Tournoi en 3 étapes** — Sélection → Duels → Champion
- **Sélection aléatoire** — Bouton Random pour générer 8 participants automatiquement
- **Animations** — Transitions entre les étapes, entrée des cards, animations du champion final
- **Effets sonores** — Sélection, duel, victoire, musique de fond
- **Partage** — Partage natif mobile (Web Share API), X, WhatsApp, Snapchat, Instagram
- **PWA** — Installable sur mobile, fonctionne hors ligne
- **Responsive** — Optimisé desktop et mobile

---

## Stack

| Outil | Usage |
|---|---|
| [React 19](https://react.dev) | UI |
| [Vite 7](https://vite.dev) | Build & dev server |
| [GSAP 3](https://gsap.com) | Animations |
| [React Router 7](https://reactrouter.com) | Routing |
| [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/) | Effet tilt sur les cards |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app) | PWA & service worker |

---

## Lancer le projet

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
```

Déploiement sur GitHub Pages :

```bash
npm run deploy
```

---

## Structure

```
src/
├── assets/          # Images, fonts, SVG
├── components/      # Composants React (Home, Tournament, Header...)
├── datas/           # Données des thèmes (listes de personnages)
├── styles/          # CSS par composant
└── main.jsx         # Point d'entrée
public/
├── sounds/          # Effets sonores
└── ...
```

---

## Ajouter un thème

1. Créer `src/datas/monThemeData.js` avec un tableau d'objets `{ id, name, image }`
2. Créer `src/components/MonTheme.jsx` qui wrap `<Tournament data={...} />`
3. Ajouter la route dans `src/main.jsx`
4. Ajouter le lien dans `src/components/Header.jsx`
5. Ajouter les styles spécifiques dans `src/styles/Themes.css` (aspect-ratio, object-fit, etc.)

---

## Auteure

**Khadidja Aït Si Ali**  
[LinkedIn](https://www.linkedin.com/in/khadidja-ait-si-ali/) · [Portfolio](https://khadidja-dev.fr)

---

> Fan project — non-commercial. All images belong to their respective owners.
