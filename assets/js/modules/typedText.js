/**
 * TypedText Module - Effet de texte tapé
 * @module TypedText
 */

const TypedText = {
    /**
     * Configuration par défaut
     */
    defaults: {
        typeSpeed: 100,
        deleteSpeed: 50,
        pauseTime: 2000,
        loop: true
    },

    /**
     * Instance active
     */
    instances: [],

    /**
     * Crée un effet de texte tapé
     * @param {Element|string} element - Élément ou sélecteur
     * @param {string[]} strings - Textes à afficher
     * @param {Object} options - Options personnalisées
     * @returns {Object} Instance pour contrôle
     */
    create(element, strings, options = {}) {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        
        if (!el || !strings || !strings.length) return null;

        const config = { ...this.defaults, ...options };
        
        const instance = {
            element: el,
            strings,
            config,
            currentStringIndex: 0,
            currentCharIndex: 0,
            isDeleting: false,
            isRunning: true,
            timeoutId: null,

            /**
             * Démarre l'animation
             */
            start() {
                this.isRunning = true;
                this.tick();
            },

            /**
             * Arrête l'animation
             */
            stop() {
                this.isRunning = false;
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null;
                }
            },

            /**
             * Tick principal de l'animation
             */
            tick() {
                if (!this.isRunning) return;

                const currentString = this.strings[this.currentStringIndex];
                const speed = this.isDeleting ? this.config.deleteSpeed : this.config.typeSpeed;

                if (this.isDeleting) {
                    this.currentCharIndex--;
                } else {
                    this.currentCharIndex++;
                }

                // Mise à jour du texte
                this.element.textContent = currentString.substring(0, this.currentCharIndex);

                let delay = speed;

                // Gestion de la fin du mot
                if (!this.isDeleting && this.currentCharIndex === currentString.length) {
                    delay = this.config.pauseTime;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.currentCharIndex === 0) {
                    this.isDeleting = false;
                    this.currentStringIndex++;

                    if (this.currentStringIndex >= this.strings.length) {
                        if (this.config.loop) {
                            this.currentStringIndex = 0;
                        } else {
                            this.isRunning = false;
                            return;
                        }
                    }
                    delay = 500;
                }

                this.timeoutId = setTimeout(() => this.tick(), delay);
            }
        };

        this.instances.push(instance);
        instance.start();

        return instance;
    },

    /**
     * Arrête toutes les instances
     */
    stopAll() {
        this.instances.forEach(instance => instance.stop());
    },

    /**
     * Réinitialise le module
     */
    reset() {
        this.stopAll();
        this.instances = [];
    }
};

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypedText;
}
