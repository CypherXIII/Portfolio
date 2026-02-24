# Portfolio - Marie Challet

> Site web personnel présentant mon parcours, mes compétences et mes projets.

## À propos

Ce portfolio est mon site web personnel. Il présente mes compétences et mes projets en data science, business intelligence et cybersécurité. Il s'agit d'un site web statique conçu pour mettre en valeur mon parcours professionnel avec une interface moderne et interactive.

## Technologies utilisées

- HTML5
- CSS3 (avec variables CSS, flexbox, grid, animations)
- JavaScript vanilla (architecture modulaire)
- Bibliothèques:
  - Font Awesome (icônes)
  - AOS (Animate On Scroll)
  - GSAP (animations avancées)
  - Particles.js (effets de particules)

## Architecture du projet

### Structure des fichiers

```txt
Portfolio/
├── index.html              # Page principale du portfolio
├── assets/
│   ├── css/
│   │   ├── main.css        # Point d'entrée CSS (imports)
│   │   ├── style.css       # Ancien fichier (backup)
│   │   ├── base/           # Styles fondamentaux
│   │   │   ├── _variables.css   # Variables CSS (couleurs, espacements, etc.)
│   │   │   ├── _reset.css       # Reset et normalisation
│   │   │   └── _typography.css  # Typographie globale
│   │   ├── layout/         # Mise en page
│   │   │   ├── _container.css   # Conteneurs et grilles
│   │   │   └── _sections.css    # Structure des sections
│   │   ├── components/     # Composants réutilisables
│   │   │   ├── _navigation.css  # Navigation flottante
│   │   │   ├── _buttons.css     # Boutons
│   │   │   ├── _cards.css       # Cartes (projets, skills)
│   │   │   ├── _timeline.css    # Timeline expérience/formation
│   │   │   ├── _modal.css       # Modal pour images/PDF
│   │   │   └── _footer.css      # Footer et contact
│   │   ├── sections/       # Styles spécifiques aux sections
│   │   │   ├── _hero.css        # Section hero
│   │   │   ├── _about.css       # Section à propos
│   │   │   ├── _skills.css      # Section compétences
│   │   │   └── _projects.css    # Section projets
│   │   └── utilities/      # Utilitaires
│   │       ├── _animations.css  # Animations et keyframes
│   │       └── _responsive.css  # Media queries
│   ├── js/
│   │   ├── main.js         # Point d'entrée JS (initialisation)
│   │   ├── script.js       # Ancien fichier (backup)
│   │   └── modules/        # Modules JavaScript
│   │       ├── utils.js         # Fonctions utilitaires
│   │       ├── animation.js     # Animations (slide, fade)
│   │       ├── typedText.js     # Effet de texte tapé
│   │       ├── particles.js     # Configuration des particules
│   │       ├── modal.js         # Gestion des modales
│   │       ├── projectCards.js  # Cartes de projets
│   │       ├── scroll.js        # Navigation et scroll
│   │       └── certificationCircles.js  # Cercles de progression
│   └── examples/           # Fichiers de démonstration (PDF, etc.)
└── README.md               # Ce fichier
```

### Architecture CSS (ITCSS)

Le CSS suit l'architecture ITCSS (Inverted Triangle CSS) pour une meilleure gestion de la spécificité :

1. **Base** - Variables, reset, typographie
2. **Layout** - Structure de la page
3. **Components** - Éléments réutilisables
4. **Sections** - Styles spécifiques aux sections
5. **Utilities** - Animations et responsive

### Architecture JavaScript (Modules)

Chaque module est indépendant et suit le pattern Module :

- **Utils** - Fonctions utilitaires (debounce, throttle, etc.)
- **Animation** - Gestion des animations CSS/GSAP
- **TypedText** - Effet de texte tapé dynamique
- **Particles** - Configuration Particles.js
- **Modal** - Système de modal avec zoom
- **ProjectCards** - Filtrage et interactions des projets
- **Scroll** - Navigation, progression, back-to-top
- **CertificationCircles** - Cercles animés de progression

## Fonctionnalités

- Design responsive adapté à tous les appareils
- Filtrage des projets par catégorie
- Animations fluides et optimisées
- Sections détaillées pour chaque compétence
- Mode sombre intégré
- Navigation ergonomique
- Consentement aux cookies
- Optimisations de performance

## Licence

© 2026 Marie Challet — Tous droits réservés.  
Ce dépôt est public à titre de présentation. Le code et le contenu ne sont pas destinés à être réutilisés sans autorisation.
