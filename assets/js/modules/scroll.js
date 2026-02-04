/**
 * Scroll Module - Gestion du scroll et de la navigation
 * @module Scroll
 */

const Scroll = {
    /**
     * Configuration
     */
    config: {
        navSelector: '.floating-nav',
        navLinkSelector: '.nav-link',
        sectionSelector: 'section[id]',
        progressSelector: '.scroll-progress-fill',
        backToTopSelector: '.back-to-top',
        offset: 100,
        throttleDelay: 16
    },

    /**
     * État
     */
    state: {
        isScrolling: false,
        currentSection: null,
        scrollProgress: 0,
        lastScrollY: 0
    },

    /**
     * Éléments DOM
     */
    elements: {
        nav: null,
        navLinks: [],
        sections: [],
        progressBar: null,
        backToTop: null
    },

    /**
     * Initialise le module
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.updateActiveSection();
        this.updateScrollProgress();
    },

    /**
     * Cache les éléments DOM
     */
    cacheElements() {
        this.elements.nav = document.querySelector(this.config.navSelector);
        this.elements.navLinks = document.querySelectorAll(this.config.navLinkSelector);
        this.elements.sections = document.querySelectorAll(this.config.sectionSelector);
        this.elements.progressBar = document.querySelector(this.config.progressSelector);
        this.elements.backToTop = document.querySelector(this.config.backToTopSelector);
    },

    /**
     * Attache les événements
     */
    bindEvents() {
        // Scroll throttled
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                    this.onScroll();
                }, this.config.throttleDelay);
            }
        }, { passive: true });

        // Navigation smooth scroll
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScrollTo(e));
        });

        // Back to top
        if (this.elements.backToTop) {
            this.elements.backToTop.addEventListener('click', () => this.scrollToTop());
        }
    },

    /**
     * Gestionnaire de scroll
     */
    onScroll() {
        this.updateActiveSection();
        this.updateScrollProgress();
        this.updateNavVisibility();
        this.updateBackToTop();
        
        this.state.lastScrollY = window.scrollY;
    },

    /**
     * Met à jour la section active
     */
    updateActiveSection() {
        const scrollY = window.scrollY;
        let currentId = null;

        this.elements.sections.forEach(section => {
            const sectionTop = section.offsetTop - this.config.offset;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentId = section.getAttribute('id');
            }
        });

        if (currentId && currentId !== this.state.currentSection) {
            this.state.currentSection = currentId;
            this.highlightNavLink(currentId);
        }
    },

    /**
     * Met en évidence le lien de navigation actif
     * @param {string} sectionId - ID de la section
     */
    highlightNavLink(sectionId) {
        this.elements.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${sectionId}`;
            
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    },

    /**
     * Met à jour la barre de progression
     */
    updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        this.state.scrollProgress = progress;

        if (this.elements.progressBar) {
            this.elements.progressBar.style.width = `${progress}%`;
        }
    },

    /**
     * Met à jour la visibilité de la navigation
     */
    updateNavVisibility() {
        if (!this.elements.nav) return;

        const scrollY = window.scrollY;
        const scrollingDown = scrollY > this.state.lastScrollY;
        const pastHero = scrollY > window.innerHeight / 2;

        // Affiche/cache la nav selon le scroll
        if (pastHero) {
            this.elements.nav.style.opacity = scrollingDown ? '0.7' : '1';
            this.elements.nav.style.transform = 'translateX(-50%)';
        } else {
            this.elements.nav.style.opacity = '1';
        }
    },

    /**
     * Met à jour le bouton back to top
     */
    updateBackToTop() {
        if (!this.elements.backToTop) return;

        const shouldShow = window.scrollY > window.innerHeight;
        this.elements.backToTop.classList.toggle('visible', shouldShow);
    },

    /**
     * Scroll fluide vers une section
     * @param {Event} e - Événement click
     */
    smoothScrollTo(e) {
        e.preventDefault();
        
        const href = e.currentTarget.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            this.state.isScrolling = true;

            const headerOffset = this.config.offset;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Reset isScrolling après l'animation
            setTimeout(() => {
                this.state.isScrolling = false;
            }, 1000);

            // Met à jour l'URL sans recharger
            history.pushState(null, null, href);
        }
    },

    /**
     * Scroll vers le haut de la page
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    /**
     * Scroll vers une section spécifique
     * @param {string} sectionId - ID de la section
     */
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetPosition = section.offsetTop - this.config.offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    /**
     * Observe les sections pour l'animation au scroll
     * @param {Function} callback - Fonction appelée quand une section est visible
     */
    observeSections(callback) {
        if (!('IntersectionObserver' in window)) {
            // Fallback pour les navigateurs sans support
            this.elements.sections.forEach(section => callback(section, true));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                callback(entry.target, entry.isIntersecting);
            });
        }, {
            rootMargin: '-50px 0px',
            threshold: 0.1
        });

        this.elements.sections.forEach(section => observer.observe(section));

        return observer;
    }
};

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Scroll;
}
