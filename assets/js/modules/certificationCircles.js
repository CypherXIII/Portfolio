/**
 * CertificationCircles Module - Cercles de progression des certifications
 * @module CertificationCircles
 */

const CertificationCircles = {
    /**
     * Configuration
     */
    config: {
        circleSelector: '.certification-circle',
        progressSelector: '.circle-progress',
        valueSelector: '.circle-value',
        animationDuration: 1500,
        easing: 'easeOutCubic'
    },

    /**
     * État
     */
    state: {
        circles: [],
        hasAnimated: false,
        observer: null
    },

    /**
     * Fonctions d'easing
     */
    easingFunctions: {
        linear: t => t,
        easeOutCubic: t => 1 - Math.pow(1 - t, 3),
        easeOutQuart: t => 1 - Math.pow(1 - t, 4),
        easeInOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    },

    /**
     * Initialise le module
     */
    init() {
        this.cacheElements();
        this.setupObserver();
    },

    /**
     * Cache les éléments DOM
     */
    cacheElements() {
        this.state.circles = document.querySelectorAll(this.config.circleSelector);
    },

    /**
     * Configure l'IntersectionObserver
     */
    setupObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback : anime immédiatement
            this.animateAllCircles();
            return;
        }

        this.state.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    this.animateCircle(entry.target);
                    entry.target.dataset.animated = 'true';
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px'
        });

        this.state.circles.forEach(circle => {
            this.state.observer.observe(circle);
        });
    },

    /**
     * Anime un cercle de progression
     * @param {Element} circleElement - Élément cercle
     */
    animateCircle(circleElement) {
        const progress = circleElement.querySelector(this.config.progressSelector);
        const valueDisplay = circleElement.querySelector(this.config.valueSelector);
        
        if (!progress) return;

        const targetValue = parseInt(circleElement.dataset.value) || 0;
        const circumference = 2 * Math.PI * 45; // rayon de 45

        // Configure le cercle SVG
        progress.style.strokeDasharray = circumference;
        progress.style.strokeDashoffset = circumference;

        const startTime = performance.now();
        const easingFunc = this.easingFunctions[this.config.easing] || this.easingFunctions.linear;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const rawProgress = Math.min(elapsed / this.config.animationDuration, 1);
            const easedProgress = easingFunc(rawProgress);

            const currentValue = Math.round(targetValue * easedProgress);
            const offset = circumference - (circumference * (currentValue / 100));

            progress.style.strokeDashoffset = offset;

            if (valueDisplay) {
                valueDisplay.textContent = `${currentValue}%`;
            }

            if (rawProgress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    },

    /**
     * Anime tous les cercles
     */
    animateAllCircles() {
        this.state.circles.forEach((circle, index) => {
            setTimeout(() => {
                this.animateCircle(circle);
            }, index * 200);
        });
    },

    /**
     * Réinitialise l'animation d'un cercle
     * @param {Element} circleElement - Élément cercle
     */
    resetCircle(circleElement) {
        const progress = circleElement.querySelector(this.config.progressSelector);
        const valueDisplay = circleElement.querySelector(this.config.valueSelector);

        if (progress) {
            const circumference = 2 * Math.PI * 45;
            progress.style.strokeDashoffset = circumference;
        }

        if (valueDisplay) {
            valueDisplay.textContent = '0%';
        }

        delete circleElement.dataset.animated;
    },

    /**
     * Réinitialise tous les cercles
     */
    resetAll() {
        this.state.circles.forEach(circle => this.resetCircle(circle));
    },

    /**
     * Crée un cercle de certification dynamiquement
     * @param {Object} options - Options du cercle
     * @returns {Element} - Élément créé
     */
    createCircle({ value, label, color = 'var(--primary)' } = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'certification-circle';
        wrapper.dataset.value = value;

        wrapper.innerHTML = `
            <svg viewBox="0 0 100 100" class="circle-svg">
                <circle cx="50" cy="50" r="45" class="circle-bg" />
                <circle cx="50" cy="50" r="45" class="circle-progress" 
                        style="stroke: ${color};" />
            </svg>
            <div class="circle-content">
                <span class="circle-value">0%</span>
                <span class="circle-label">${label}</span>
            </div>
        `;

        return wrapper;
    },

    /**
     * Détruit le module
     */
    destroy() {
        if (this.state.observer) {
            this.state.observer.disconnect();
            this.state.observer = null;
        }
        this.resetAll();
    }
};

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CertificationCircles;
}
