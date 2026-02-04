/**
 * Utils Module - Fonctions utilitaires réutilisables
 * @module Utils
 */

const Utils = {
    /**
     * Debounce - Limite la fréquence d'exécution d'une fonction
     * @param {Function} func - Fonction à débouncer
     * @param {number} wait - Délai en ms
     * @param {boolean} immediate - Exécuter immédiatement
     * @returns {Function}
     */
    debounce(func, wait, immediate = false) {
        let timeout;
        return function(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    },

    /**
     * Throttle - Limite le nombre d'appels d'une fonction
     * @param {Function} func - Fonction à throttler
     * @param {number} limit - Limite en ms
     * @returns {Function}
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Vérifie si l'utilisateur préfère les mouvements réduits
     * @returns {boolean}
     */
    prefersReducedMotion() {
        return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    },

    /**
     * Vérifie si on est sur mobile
     * @returns {boolean}
     */
    isMobile() {
        return window.innerWidth <= 768;
    },

    /**
     * Vérifie si on est sur tablette
     * @returns {boolean}
     */
    isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    },

    /**
     * Sélecteur unique avec vérification null-safe
     * @param {string} selector - Sélecteur CSS
     * @returns {Element|null}
     */
    $(selector) {
        return document.querySelector(selector);
    },

    /**
     * Sélecteur multiple
     * @param {string} selector - Sélecteur CSS
     * @returns {NodeList}
     */
    $$(selector) {
        return document.querySelectorAll(selector);
    },

    /**
     * Ajoute un événement à un ou plusieurs éléments
     * @param {string|Element|NodeList} target - Cible(s)
     * @param {string} event - Nom de l'événement
     * @param {Function} handler - Gestionnaire
     * @param {Object} options - Options de l'événement
     */
    on(target, event, handler, options = {}) {
        const elements = typeof target === 'string' ? this.$$(target) : 
                        target instanceof NodeList ? target : [target];
        elements.forEach(el => el?.addEventListener(event, handler, options));
    },

    /**
     * Génère un ID unique
     * @returns {string}
     */
    uniqueId() {
        return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
};

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
