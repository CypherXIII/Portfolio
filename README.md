# Portfolio - Marie Challet

## Description

Ce portfolio présente les compétences et projets de Marie Challet en data science, business intelligence et cybersécurité. Il s'agit d'un site web statique conçu pour mettre en valeur un parcours professionnel avec une interface moderne et interactive.

## Technologies utilisées

- HTML5
- CSS3 (avec variables CSS, flexbox, grid, animations)
- JavaScript vanilla
- Bibliothèques:
  - Font Awesome (icônes)
  - AOS (Animate On Scroll)
  - GSAP (animations avancées)
  - PDF.js (visualisation de PDF)
  - Particles.js (effets de particules)

## Structure du projet

``` md
Portfolio/
├── index.html          # Page principale du portfolio
├── assets/
│   ├── css/
│   │   └── style.css   # Styles du site
│   ├── js/
│   │   └── script.js   # Fonctionnalités JavaScript
│   └── example/       # Fichiers de démonstration (PDF, etc.)
└── README.md           # Ce fichier
```

## Installation

1. Clonez ce dépôt ou téléchargez-le sous forme d'archive
2. Aucune dépendance à installer, tous les scripts sont chargés via CDN
3. Ouvrez `index.html` dans un navigateur web moderne

Pour le développement:

- Utilisez un éditeur de code comme VS Code, Sublime Text ou WebStorm
- Pour modifier les styles, éditez `assets/css/style.css`
- Pour modifier les comportements, éditez `assets/js/script.js`

## Personnalisation

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
- Visualisation de documents PDF et images
- Animations fluides et optimisées
- Sections détaillées pour chaque compétence
- Mode sombre intégré
- Navigation ergonomique
- Consentement aux cookies
- Optimisations de performance

## Résolution de problèmes

### Images non affichées

- Vérifiez que l'attribut `data-src` dans les éléments de prévisualisation est correctement défini
- Assurez-vous que les chemins des images sont corrects

### Problèmes d'affichage PDF

- Vérifiez que la bibliothèque PDF.js est correctement chargée
- Assurez-vous que les chemins des fichiers PDF sont valides

## Licence

Tous droits réservés - Marie Challet

## Notes de développement

- Ce portfolio a été développé pour présenter des projets data/cybersécurité
- Le code est optimisé pour les performances et l'accessibilité
- Les animations sont désactivées automatiquement si l'utilisateur a activé l'option "réduire les animations" dans son système
