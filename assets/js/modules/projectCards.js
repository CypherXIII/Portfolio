/**
 * ProjectCards Module - Gestion des cartes de projets
 * @module ProjectCards
 */

const ProjectCards = {
    /**
     * Configuration
     */
    config: {
        cardSelector: '.project-card',
        filterSelector: '.filter-btn',
        gridSelector: '.projects-grid',
        activeClass: 'active',
        animationDuration: 400
    },

    /**
     * État
     */
    state: {
        activeFilter: 'all',
        cards: [],
        isAnimating: false
    },

    /**
     * Initialise le module
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.initializeCards();
    },

    /**
     * Cache les éléments DOM
     */
    cacheElements() {
        this.state.cards = document.querySelectorAll(this.config.cardSelector);
        this.filterButtons = document.querySelectorAll(this.config.filterSelector);
        this.grid = document.querySelector(this.config.gridSelector);
    },

    /**
     * Attache les événements
     */
    bindEvents() {
        // Filtres
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.filterCards(filter);
            });
        });

        // Cartes - hover et click
        this.state.cards.forEach(card => {
            // Effet au survol
            card.addEventListener('mouseenter', () => this.onCardHover(card, true));
            card.addEventListener('mouseleave', () => this.onCardHover(card, false));

            // Click sur les boutons de la carte
            const detailsBtn = card.querySelector('.view-details');
            if (detailsBtn) {
                detailsBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openProjectDetails(card);
                });
            }
        });
    },

    /**
     * Initialise l'état des cartes
     */
    initializeCards() {
        this.state.cards.forEach((card, index) => {
            card.style.setProperty('--card-index', index);
        });
    },

    /**
     * Filtre les cartes par catégorie
     * @param {string} filter - Catégorie à afficher
     */
    filterCards(filter) {
        if (this.state.isAnimating || filter === this.state.activeFilter) return;

        this.state.isAnimating = true;
        this.state.activeFilter = filter;

        // Met à jour les boutons
        this.filterButtons.forEach(btn => {
            btn.classList.toggle(this.config.activeClass, btn.dataset.filter === filter);
        });

        // Anime les cartes
        this.state.cards.forEach((card, index) => {
            const category = card.dataset.category || 'all';
            const shouldShow = filter === 'all' || category === filter;

            // Animation de sortie
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';

            setTimeout(() => {
                card.style.display = shouldShow ? '' : 'none';

                if (shouldShow) {
                    // Animation d'entrée avec délai
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 50);
                }
            }, this.config.animationDuration / 2);
        });

        // Fin de l'animation
        setTimeout(() => {
            this.state.isAnimating = false;
        }, this.config.animationDuration);
    },

    /**
     * Gère le survol d'une carte
     * @param {Element} card - Carte survolée
     * @param {boolean} isHovering - État du survol
     */
    onCardHover(card, isHovering) {
        if (isHovering) {
            card.style.transform = 'translateY(-8px)';
        } else {
            card.style.transform = 'translateY(0)';
        }
    },

    /**
     * Ouvre les détails d'un projet
     * @param {Element} card - Carte du projet
     */
    openProjectDetails(card) {
        const projectId = card.dataset.project;
        const projectDetails = document.getElementById(`details-${projectId}`);

        if (projectDetails) {
            // Scroll vers les détails
            projectDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Animation de mise en évidence
            projectDetails.classList.add('highlight');
            setTimeout(() => {
                projectDetails.classList.remove('highlight');
            }, 2000);
        }
    },

    /**
     * Réinitialise les filtres
     */
    reset() {
        this.filterCards('all');
    },

    /**
     * Ajoute une nouvelle carte dynamiquement
     * @param {Object} projectData - Données du projet
     * @returns {Element} - Carte créée
     */
    addCard(projectData) {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.dataset.category = projectData.category || 'other';
        card.dataset.project = projectData.id;

        card.innerHTML = `
            <div class="card-image">
                <img src="${projectData.image}" alt="${projectData.title}" loading="lazy">
                <div class="card-overlay">
                    <button class="btn btn-sm view-details">Voir détails</button>
                </div>
            </div>
            <div class="card-content">
                <h3>${projectData.title}</h3>
                <p>${projectData.description}</p>
                <div class="card-tags">
                    ${projectData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        if (this.grid) {
            this.grid.appendChild(card);
            this.state.cards = document.querySelectorAll(this.config.cardSelector);
            this.initializeCards();
        }

        return card;
    }
};

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectCards;
}
