# Portfolio - Marie Challet

> Portfolio Cybersécurité & Data Engineering — site web personnel présentant mon parcours, mes compétences et mes projets.

🔗 **[cypherxiii.github.io/Portfolio](https://cypherxiii.github.io/Portfolio/)**

## À propos

Étudiante ingénieure en cybersécurité à l'INSA Centre Val de Loire (SecNumEdu ANSSI), ce portfolio présente mon profil hybride **cybersécurité défensive / data engineering**. Il regroupe mes expériences, formations, certifications et projets classés par compétences (cybersécurité, BI, data engineering, data science, développement, humanités).

**Recherche une alternance de 24 mois en cybersécurité défensive dès septembre 2026** — Bourges / Clermont-Ferrand.

## Technologies utilisées

- HTML5 sémantique (SEO, accessibilité ARIA, données structurées JSON-LD)
- CSS3 (architecture ITCSS, variables CSS, flexbox, grid, animations)
- JavaScript vanilla (architecture modulaire ES6)
- Bibliothèques :
  - [Font Awesome 6.4](https://fontawesome.com/) — icônes
  - [AOS](https://michalsnik.github.io/aos/) — Animate On Scroll
  - [Animate.css](https://animate.style/) — animations CSS
  - [Particles.js](https://vincentgarreau.com/particles.js/) — effets de particules
  - [PDF.js](https://mozilla.github.io/pdf.js/) — visualisation de PDF

## Architecture du projet

### Structure des fichiers

```txt
Portfolio/
├── index.html              # Page principale du portfolio
├── README.md               # Ce fichier
├── assets/
│   ├── css/
│   │   ├── style.css       # Point d'entrée CSS (imports)
│   │   ├── base/           # Styles fondamentaux
│   │   │   ├── _variables.css   # Variables CSS (couleurs, espacements, etc.)
│   │   │   ├── _reset.css       # Reset et normalisation
│   │   │   └── _typography.css  # Typographie globale
│   │   ├── layout/         # Mise en page
│   │   │   ├── _container.css   # Conteneurs et grilles
│   │   │   └── _sections.css    # Structure des sections
│   │   ├── components/     # Composants réutilisables
│   │   │   ├── _navigation.css  # Menu latéral et navigation
│   │   │   ├── _buttons.css     # Boutons et CTA
│   │   │   ├── _cards.css       # Cartes (projets, certifications)
│   │   │   ├── _timeline.css    # Timeline expérience/formation
│   │   │   ├── _modal.css       # Modal pour images/PDF
│   │   │   └── _footer.css      # Footer et contact
│   │   ├── sections/       # Styles spécifiques aux sections
│   │   │   ├── _hero.css        # Section hero avec particules
│   │   │   ├── _about.css       # Section à propos
│   │   │   ├── _skills.css      # Section compétences
│   │   │   └── _projects.css    # Section projets
│   │   └── utilities/      # Utilitaires
│   │       ├── _animations.css  # Animations et keyframes
│   │       └── _responsive.css  # Media queries
│   ├── js/
│   │   ├── script.js       # Point d'entrée JS (initialisation)
│   │   └── modules/        # Modules JavaScript
│   │       ├── utils.js         # Fonctions utilitaires
│   │       ├── animation.js     # Animations (slide, fade)
│   │       ├── typedText.js     # Effet de texte tapé
│   │       ├── particles.js     # Configuration des particules
│   │       ├── modal.js         # Gestion des modales
│   │       ├── projectCards.js  # Filtrage et interactions des projets
│   │       ├── scroll.js        # Navigation et scroll
│   │       └── certificationCircles.js  # Cercles de progression
│   └── examples/           # Fichiers de démonstration (PDF, HTML, Python)
```

### Architecture CSS (ITCSS)

Le CSS suit l'architecture **ITCSS** (Inverted Triangle CSS) pour une gestion claire de la spécificité :

1. **Base** — Variables, reset, typographie
2. **Layout** — Conteneurs et structure de page
3. **Components** — Éléments réutilisables (navigation, cartes, timeline, modal…)
4. **Sections** — Styles spécifiques (hero, à propos, compétences, projets)
5. **Utilities** — Animations et responsive

### Architecture JavaScript (Modules)

Chaque module est indépendant et suit le pattern Module :

- **utils.js** — Fonctions utilitaires (debounce, throttle…)
- **animation.js** — Gestion des animations CSS
- **typedText.js** — Effet de texte tapé dynamique
- **particles.js** — Configuration Particles.js
- **modal.js** — Système de modal (images, PDF)
- **projectCards.js** — Filtrage par catégorie et interactions des projets
- **scroll.js** — Navigation, barre de progression, back-to-top
- **certificationCircles.js** — Cercles animés de progression

## Sections du portfolio

| Section | Description |
|---|---|
| **Accueil** | Hero avec effet de particules, texte tapé et CTA |
| **À propos** | Présentation, domaines de prédilection |
| **Formation** | Timeline : INSA CVL (Ingénieur Sécurité), B.U.T. SD (Major), engagement associatif |
| **Expériences** | Apprentie DevSecOps & IT (FormaSup), Data Engineer & BI (FormaSup, BeBlocks) |
| **Projets** | 17 projets filtrables par compétence (cyber, BI, data eng., data science, dev, humanités) |
| **Certifications & Langues** | SecNumEdu ANSSI, Diplôme Ingénieur CTI, B.U.T. SD — Français natif, Anglais C1 |
| **Contact** | LinkedIn, GitHub |

## Projets présentés

| Projet | Catégories | Type |
|---|---|---|
| FormaSup BI Platform | BI, Data Engineering, Cybersécurité | Pro |
| Portfolio Personnel | Développement | Personnel |
| Audit base de données OFA Link | Data Engineering, Data Science | Pro |
| Automatisation de Contrôle FEC | Développement, Data Engineering | Pro |
| Étude de cas – Tourisme France/Cantal | Data Science, BI, Humanités | Académique |
| Gestion des risques informatiques (RGPD/ISO 27005) | Cybersécurité | Académique |
| Operation ZeroDay – CTF Terminal Challenge | Cybersécurité, Développement | Académique |
| MedievAIl bAIttle generAIl – Simulateur IA | Data Science, Développement | Académique |
| Application de Gestion des Versements | Développement, Data Engineering | Pro |
| Tableau de Bord Formations en Alternance | BI | Pro |
| Modélisation Thématique d'Archives Policières (LDA) | Data Science | Académique |
| Classification sur Données de Croissance | Data Science | Académique |
| Couverture Médiatique Débat Harris/Trump | Data Science, Humanités | Académique |
| Anonymisation de données médicales | Cybersécurité, Data Science | Académique |
| Outil décisionnel de performance produit | BI | Académique |
| Migration SQL vers NoSQL (PostgreSQL/MongoDB) | Data Engineering | Académique |
| Cahier des Charges – Application de Reporting | Développement | Académique |
| Rongeurs à New York – Analyse spatiale | Data Science | Académique |
| Analyse de Circulation – Nouvelle Intersection | Data Science | Académique |
| Analyse éthique Cambridge Analytica | Humanités | Académique |

## Fonctionnalités

- Design responsive (mobile, tablette, desktop)
- Filtrage des projets par catégorie de compétences
- Animations fluides (AOS, Animate.css, CSS transitions)
- Effet de particules interactif en arrière-plan
- Effet de texte tapé dynamique (typed text)
- Navigation latérale avec menu hamburger
- Sections détaillées dépliables pour chaque projet
- Visualisation de documents PDF intégrée
- Accessibilité (ARIA, navigation clavier)
- SEO optimisé (données structurées JSON-LD, meta tags Open Graph)
- Optimisations de performance

## Licence

© 2026 Marie Challet — Tous droits réservés.  
Ce dépôt est public à titre de présentation. Le code et le contenu ne sont pas destinés à être réutilisés sans autorisation.
