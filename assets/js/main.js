/**
 * Main Application Entry Point
 * Portfolio de Marie Challet
 * 
 * Ce fichier initialise tous les modules et gère le cycle de vie de l'application
 * @module Main
 */

// ============================================================
// IMPORTS DES MODULES (pour serveur avec support ES6 modules)
// ============================================================
// import Utils from './modules/utils.js';
// import Animation from './modules/animation.js';
// import TypedText from './modules/typedText.js';
// import Particles from './modules/particles.js';
// import Modal from './modules/modal.js';
// import ProjectCards from './modules/projectCards.js';
// import Scroll from './modules/scroll.js';
// import CertificationCircles from './modules/certificationCircles.js';

// ============================================================
// APPLICATION PRINCIPALE
// ============================================================

const App = {
    /**
     * Configuration globale
     */
    config: {
        debug: false,
        typedStrings: [
            'Future Ingénieure en Cybersécurité Défensive',
            'Profil Hybride Data × Cybersécurité',
            'SOC | CERT/CSIRT | Threat Intelligence | Forensic',
            'La Data au service de la Cybersécurité',
            'INSA CVL — SecNumEdu ANSSI'
        ],
        particlesEnabled: true,
        reducedMotion: false
    },

    /**
     * État de l'application
     */
    state: {
        isLoaded: false,
        modules: {}
    },

    /**
     * Initialise l'application
     */
    init() {
        // Détecte les préférences utilisateur
        this.config.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.log('🚀 Initialisation de l\'application...');
        
        // Attends que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Attends que tout soit chargé
        window.addEventListener('load', () => this.onWindowLoad());
    },

    /**
     * Appelé quand le DOM est prêt
     */
    onDOMReady() {
        this.log('📄 DOM prêt');
        
        // Initialise les modules critiques
        this.initCriticalModules();
        
        // Initialise les événements globaux
        this.initGlobalEvents();
    },

    /**
     * Appelé quand tout est chargé
     */
    onWindowLoad() {
        this.log('✅ Fenêtre chargée');
        
        this.state.isLoaded = true;
        
        // Initialise les modules non-critiques
        this.initSecondaryModules();
        
        // Cache le loader si présent
        this.hideLoader();
        
        // Déclenche l'événement custom
        document.dispatchEvent(new CustomEvent('app:ready'));
    },

    /**
     * Initialise les modules critiques
     */
    initCriticalModules() {
        // Scroll et Navigation
        if (typeof Scroll !== 'undefined') {
            Scroll.init();
            this.state.modules.scroll = Scroll;
            this.log('📜 Module Scroll initialisé');
        }

        // Modal
        if (typeof Modal !== 'undefined') {
            Modal.init();
            this.state.modules.modal = Modal;
            this.log('🖼️ Module Modal initialisé');
        }

        // Project Cards
        if (typeof ProjectCards !== 'undefined') {
            ProjectCards.init();
            this.state.modules.projectCards = ProjectCards;
            this.log('🃏 Module ProjectCards initialisé');
        }
    },

    /**
     * Initialise les modules secondaires
     */
    initSecondaryModules() {
        // Typed Text Effect
        if (typeof TypedText !== 'undefined' && !this.config.reducedMotion) {
            const typedElement = document.querySelector('.typed-text');
            if (typedElement) {
                TypedText.create(typedElement, this.config.typedStrings);
                this.state.modules.typedText = TypedText;
                this.log('⌨️ Module TypedText initialisé');
            }
        }

        // Particles
        if (this.config.particlesEnabled && !this.config.reducedMotion) {
            if (typeof Particles !== 'undefined') {
                Particles.init('particles-js');
                this.state.modules.particles = Particles;
                this.log('✨ Module Particles initialisé');
            }
        }

        // Certification Circles
        if (typeof CertificationCircles !== 'undefined') {
            CertificationCircles.init();
            this.state.modules.certificationCircles = CertificationCircles;
            this.log('⭕ Module CertificationCircles initialisé');
        }

        // Animations au scroll
        this.initScrollAnimations();
    },

    /**
     * Initialise les animations au scroll
     */
    initScrollAnimations() {
        if (this.config.reducedMotion) return;

        const animatedElements = document.querySelectorAll('[data-animate]');
        
        if (!('IntersectionObserver' in window)) {
            // Fallback
            animatedElements.forEach(el => el.classList.add('animated'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    },

    /**
     * Initialise les événements globaux
     */
    initGlobalEvents() {
        // Gestion du resize avec debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.onResize(), 250);
        });

        // Gestion des préférences de mouvement
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.config.reducedMotion = e.matches;
            this.handleReducedMotionChange();
        });

        // Raccourcis clavier globaux
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    },

    /**
     * Gère le resize de la fenêtre
     */
    onResize() {
        this.log('📐 Resize détecté');

        // Rafraîchit les particules si nécessaire
        if (this.state.modules.particles) {
            this.state.modules.particles.refresh();
        }
    },

    /**
     * Gère le changement de préférence de mouvement
     */
    handleReducedMotionChange() {
        if (this.config.reducedMotion) {
            // Arrête les animations
            if (this.state.modules.particles) {
                this.state.modules.particles.destroy();
            }
            if (this.state.modules.typedText) {
                this.state.modules.typedText.stopAll();
            }
        } else {
            // Relance les animations
            if (typeof Particles !== 'undefined') {
                Particles.init('particles-js');
            }
        }
    },

    /**
     * Gère les raccourcis clavier
     * @param {KeyboardEvent} e 
     */
    handleKeyboard(e) {
        // Skip si focus dans un input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        // Raccourcis de navigation
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    },

    /**
     * Cache le loader
     */
    hideLoader() {
        const loader = document.querySelector('.loader, .loading-screen');
        if (loader) {
            if (typeof Animation !== 'undefined') {
                Animation.fadeOut(loader, 0.5, () => {
                    loader.style.display = 'none';
                });
            } else {
                loader.style.display = 'none';
            }
        }
    },

    /**
     * Log de debug
     * @param  {...any} args 
     */
    log(...args) {
        if (this.config.debug) {
            console.log('[App]', ...args);
        }
    },

    /**
     * Active le mode debug
     */
    enableDebug() {
        this.config.debug = true;
        console.log('[App] Mode debug activé');
        console.log('[App] État:', this.state);
        console.log('[App] Modules:', Object.keys(this.state.modules));
    },

    /**
     * Retourne un module par son nom
     * @param {string} name - Nom du module
     * @returns {Object|null}
     */
    getModule(name) {
        return this.state.modules[name] || null;
    }
};

// ============================================================
// INITIALISATION
// ============================================================

// Démarrage de l'application
App.init();

// Expose l'app globalement pour le debug
window.App = App;

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
