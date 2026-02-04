/**
 * Particles Module - Configuration et gestion des particules
 * @module Particles
 */

const Particles = {
    /**
     * Configuration par défaut des particules
     */
    defaultConfig: {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00b4d8'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00b4d8',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    },

    /**
     * Configuration mobile (moins de particules)
     */
    mobileConfig: {
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 800
                }
            }
        }
    },

    /**
     * Initialise les particules
     * @param {string} containerId - ID du conteneur
     * @param {Object} customConfig - Configuration personnalisée
     */
    init(containerId = 'particles-js', customConfig = {}) {
        if (typeof particlesJS === 'undefined') {
            console.warn('particles.js library not loaded');
            return;
        }

        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container #${containerId} not found`);
            return;
        }

        // Détermine la configuration selon le device
        const isMobile = window.innerWidth < 768;
        const baseConfig = isMobile 
            ? this.deepMerge(this.defaultConfig, this.mobileConfig)
            : this.defaultConfig;

        // Fusion avec la config personnalisée
        const config = this.deepMerge(baseConfig, customConfig);

        // Initialisation
        particlesJS(containerId, config);
    },

    /**
     * Fusionne profondément deux objets
     * @param {Object} target - Objet cible
     * @param {Object} source - Objet source
     * @returns {Object} Objet fusionné
     */
    deepMerge(target, source) {
        const output = { ...target };
        
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        output[key] = source[key];
                    } else {
                        output[key] = this.deepMerge(target[key], source[key]);
                    }
                } else {
                    output[key] = source[key];
                }
            });
        }
        
        return output;
    },

    /**
     * Vérifie si une valeur est un objet
     * @param {*} item - Valeur à vérifier
     * @returns {boolean}
     */
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    },

    /**
     * Détruit l'instance de particules
     * @param {string} containerId - ID du conteneur
     */
    destroy(containerId = 'particles-js') {
        if (window.pJSDom && window.pJSDom.length > 0) {
            const containerElement = document.getElementById(containerId);
            if (containerElement) {
                containerElement.innerHTML = '';
            }
            window.pJSDom = [];
        }
    },

    /**
     * Recharge les particules
     * @param {string} containerId - ID du conteneur
     * @param {Object} customConfig - Configuration personnalisée
     */
    refresh(containerId = 'particles-js', customConfig = {}) {
        this.destroy(containerId);
        this.init(containerId, customConfig);
    }
};

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Particles;
}
