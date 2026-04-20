# Portfolio - Marie Challet

> Portfolio Cybersécurité & Data Engineering — site web personnel présentant mon parcours, mes compétences et mes projets.

🔗 **[cypherxiii.github.io/Portfolio](https://cypherxiii.github.io/Portfolio/)**

## À propos

Étudiante ingénieure en cybersécurité à l'INSA Centre Val de Loire (SecNumEdu ANSSI), ce portfolio présente mon profil hybride **cybersécurité défensive / data engineering**. Il regroupe mes expériences, formations, certifications et projets classés par compétences (cybersécurité, BI, data engineering, data science, développement, humanités).

**Disponible pour une alternance de 24 mois dès septembre 2026** — cybersécurité défensive, SOC, CERT/CSIRT, DevSecOps — Bourges / Clermont-Ferrand.

## Technologies utilisées

- HTML5 sémantique (SEO, accessibilité ARIA, données structurées JSON-LD)
- CSS3 (variables CSS, flexbox, grid, animations, `prefers-reduced-motion`)
- JavaScript vanilla (modules inline ES6)
- Bibliothèques :
  - [Font Awesome 6.4](https://fontawesome.com/) — icônes
  - [AOS 2.3.4](https://michalsnik.github.io/aos/) — Animate On Scroll
  - [Particles.js 2.0.0](https://vincentgarreau.com/particles.js/) — effets de particules
  - [PDF.js 3.11.174](https://mozilla.github.io/pdf.js/) — visualisation de PDF

## Architecture du projet

### Structure des fichiers

```txt
Portfolio/
├── index.html              # Page principale du portfolio (source unique)
├── README.md               # Ce fichier
├── assets/
│   ├── css/
│   │   └── style.css       # Fichier CSS unique (variables, composants, sections, responsive)
│   ├── js/
│   │   └── script.js       # Fichier JS unique (tous les modules inline)
│   └── examples/           # Fichiers de démonstration (PDF, HTML, Python)
```

> **Note architecture** : Les sous-dossiers `assets/css/*/` et `assets/js/modules/` contiennent des fichiers de référence hérités. Seuls `style.css` et `script.js` sont chargés par le HTML.

### Architecture CSS

Le fichier `style.css` est organisé en sections commentées :

1. **Variables** — Design tokens (couleurs, espacements, typographie, effets)
2. **Reset & base** — Normalisation, typographie globale
3. **Layout** — Conteneurs, grilles
4. **Components** — Navigation, boutons, cartes, timeline, modal, footer
5. **Sections** — Hero, à propos, compétences, projets, accréditations
6. **Utilities** — Animations keyframes, responsive (breakpoints 360px → 1200px), `prefers-reduced-motion`

### Architecture JavaScript

Le fichier `script.js` expose des modules inline initialisés au `DOMContentLoaded` :

- **Utils** — `debounce`, `throttle`, sélecteurs DOM
- **Animation** — Gestion des classes d'animation CSS
- **TypedText** — Effet de texte tapé dynamique
- **Particles** — Configuration Particles.js (avec guard anti-duplication canvas)
- **Modal** — Système de modal (images, PDF via PDF.js)
- **ProjectCards** — Filtrage par catégorie et interactions des projets
- **Scroll** — Navigation, barre de progression, back-to-top (handler unique debouncé 50ms)
- **CertificationCircles** — Cercles animés de progression

## Sections du portfolio

| Section | Description |
| --- | --- |
| **Accueil** | Hero avec effet de particules, texte tapé et CTA |
| **À propos** | Présentation, domaines de prédilection |
| **Formation** | Timeline : INSA CVL (Ingénieur Sécurité), B.U.T. SD (Major de promotion), engagement associatif |
| **Expériences** | Apprentie DevSecOps & IT (FormaSup), Data Engineer & BI (FormaSup, BeBlocks) |
| **Projets** | 20 projets filtrables par compétence (cyber, BI, data eng., data science, dev, humanités) |
| **Accréditations & Langues** | SecNumEdu ANSSI, Diplôme Ingénieur CTI, B.U.T. SD — Français natif, Anglais C1 (TOEIC 970/990) |
| **Contact** | LinkedIn, GitHub |

## Projets présentés

| Projet | Catégories | Type |
| --- | --- | --- |
| FormaSup BI Platform v3.0.0 | BI, Data Engineering, Cybersécurité, DevSecOps | Pro |
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

- Design responsive (mobile 360px → desktop 1200px+)
- Filtrage des projets par catégorie de compétences
- Animations fluides (AOS, CSS keyframes, transitions)
- Effet de particules interactif en arrière-plan
- Effet de texte tapé dynamique
- Navigation latérale avec menu hamburger
- Sections détaillées dépliables pour chaque projet
- Visualisation de documents PDF intégrée (PDF.js)
- Accessibilité (ARIA, navigation clavier, `prefers-reduced-motion`)
- SEO optimisé (JSON-LD Schema.org, meta Open Graph, Twitter Card, canonical)
- Performance : handler scroll unique debouncé, guard anti-duplication canvas

## Licence

© 2026 Marie Challet — Tous droits réservés.  
Ce dépôt est public à titre de présentation. Le code et le contenu ne sont pas destinés à être réutilisés sans autorisation.
