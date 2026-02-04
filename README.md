# Portfolio - Marie Challet

## Description

Ce portfolio présente mes compétences et mes projets en data science, business intelligence et cybersécurité. Il s'agit d'un site web statique conçu pour mettre en valeur un parcours professionnel avec une interface moderne et interactive.

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

## Installation

1. Clonez ce dépôt ou téléchargez-le sous forme d'archive
2. Aucune dépendance à installer, tous les scripts sont chargés via CDN
3. Ouvrez `index.html` dans un navigateur web moderne

Pour le développement:

- Utilisez un éditeur de code comme VS Code
- Pour modifier les styles, éditez les fichiers dans `assets/css/`
- Pour modifier les comportements, éditez les modules dans `assets/js/modules/`
- Le fichier `main.js` gère l'initialisation de tous les modules

## Personnalisation

### Modifier les couleurs

Éditez les variables dans `assets/css/base/_variables.css` :

```css
:root {
    --primary: #00b4d8;
    --primary-dark: #0077b6;
    --accent: #f72585;
    /* ... */
}
```

### Ajouter un nouveau projet

1. Ouvrez `index.html`
2. Repérez la section "projects-grid"
3. Ajoutez un nouveau bloc de projet en suivant le modèle existant:

```html
<div class="project-card" data-category="categorie1 categorie2" data-aos="fade-up">
    <div class="project-card-inner">
        <!-- Contenu du projet -->
    </div>
</div>
```

### Modifier les catégories

1. Mettez à jour les boutons de filtre dans la section "skills-filter"
2. Modifiez les attributs `data-category` des projets correspondants

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

Tous droits réservés - Marie Challet
