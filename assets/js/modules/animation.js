/**
 * Animation Module - Gestion des animations
 * @module Animation
 */

const Animation = {
    /**
     * Animation slide down pour afficher un élément
     * @param {Element} element - Élément à animer
     * @param {number} duration - Durée en ms
     */
    slideDown(element, duration = 300) {
        if (!element) return;
        
        element.style.display = 'block';
        element.style.overflow = 'hidden';
        const height = element.scrollHeight;
        element.style.height = '0px';
        
        requestAnimationFrame(() => {
            element.style.transition = `height ${duration}ms ease`;
            element.style.height = `${height}px`;
        });
        
        setTimeout(() => {
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration + 10);
    },

    /**
     * Animation slide up pour cacher un élément
     * @param {Element} element - Élément à animer
     * @param {number} duration - Durée en ms
     */
    slideUp(element, duration = 300) {
        if (!element) return;
        
        element.style.overflow = 'hidden';
        element.style.height = `${element.scrollHeight}px`;
        
        requestAnimationFrame(() => {
            element.style.transition = `height ${duration}ms ease`;
            element.style.height = '0px';
        });
        
        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration + 10);
    },

    /**
     * Toggle slide
     * @param {Element} element - Élément à animer
     * @param {number} duration - Durée en ms
     */
    slideToggle(element, duration = 300) {
        if (!element) return;
        
        if (window.getComputedStyle(element).display === 'none') {
            this.slideDown(element, duration);
        } else {
            this.slideUp(element, duration);
        }
    },

    /**
     * Animation fade in avec GSAP ou fallback CSS
     * @param {Element} element - Élément à animer
     * @param {number} duration - Durée en secondes
     */
    fadeIn(element, duration = 0.5) {
        if (!element) return;
        
        if (window.gsap) {
            gsap.to(element, { opacity: 1, duration });
        } else {
            element.style.transition = `opacity ${duration}s ease`;
            element.style.opacity = 1;
        }
    },

    /**
     * Animation fade out avec GSAP ou fallback CSS
     * @param {Element} element - Élément à animer
     * @param {number} duration - Durée en secondes
     * @param {Function} callback - Callback après animation
     */
    fadeOut(element, duration = 0.5, callback) {
        if (!element) return;
        
        if (window.gsap) {
            gsap.to(element, { 
                opacity: 0, 
                duration, 
                onComplete: callback 
            });
        } else {
            element.style.transition = `opacity ${duration}s ease`;
            element.style.opacity = 0;
            if (callback) setTimeout(callback, duration * 1000);
        }
    },

    /**
     * Animation de translation
     * @param {Element} element - Élément à animer
     * @param {Object} options - Options d'animation
     */
    translate(element, { x = 0, y = 0, duration = 0.5, ease = 'ease' } = {}) {
        if (!element) return;
        
        if (window.gsap) {
            gsap.to(element, { x, y, duration, ease });
        } else {
            element.style.transition = `transform ${duration}s ${ease}`;
            element.style.transform = `translate(${x}px, ${y}px)`;
        }
    }
};

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Animation;
}
