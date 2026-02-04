/**
 * Modal Module - Gestion des modales
 * @module Modal
 */

const Modal = {
    /**
     * Éléments de la modale
     */
    elements: {
        modal: null,
        content: null,
        image: null,
        loading: null,
        close: null,
        zoomIn: null,
        zoomOut: null,
        zoomReset: null
    },

    /**
     * État actuel
     */
    state: {
        isOpen: false,
        currentZoom: 1,
        isDragging: false,
        startX: 0,
        startY: 0,
        translateX: 0,
        translateY: 0,
        currentImage: null
    },

    /**
     * Configuration
     */
    config: {
        zoomStep: 0.25,
        minZoom: 0.5,
        maxZoom: 4,
        animationDuration: 300
    },

    /**
     * Initialise la modale
     */
    init() {
        this.cacheElements();
        this.bindEvents();
    },

    /**
     * Cache les éléments DOM
     */
    cacheElements() {
        this.elements.modal = document.getElementById('imageModal');
        this.elements.content = document.querySelector('.modal-content');
        this.elements.image = document.getElementById('modalImage');
        this.elements.loading = document.querySelector('.modal-loading');
        this.elements.close = document.querySelector('.modal-close');
        this.elements.zoomIn = document.querySelector('.zoom-in');
        this.elements.zoomOut = document.querySelector('.zoom-out');
        this.elements.zoomReset = document.querySelector('.zoom-reset');
    },

    /**
     * Attache les événements
     */
    bindEvents() {
        // Fermeture
        if (this.elements.close) {
            this.elements.close.addEventListener('click', () => this.close());
        }

        if (this.elements.modal) {
            this.elements.modal.addEventListener('click', (e) => {
                if (e.target === this.elements.modal) {
                    this.close();
                }
            });
        }

        // Zoom buttons
        if (this.elements.zoomIn) {
            this.elements.zoomIn.addEventListener('click', () => this.zoomIn());
        }

        if (this.elements.zoomOut) {
            this.elements.zoomOut.addEventListener('click', () => this.zoomOut());
        }

        if (this.elements.zoomReset) {
            this.elements.zoomReset.addEventListener('click', () => this.resetZoom());
        }

        // Clavier
        document.addEventListener('keydown', (e) => {
            if (!this.state.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    this.close();
                    break;
                case '+':
                case '=':
                    this.zoomIn();
                    break;
                case '-':
                    this.zoomOut();
                    break;
                case '0':
                    this.resetZoom();
                    break;
            }
        });

        // Drag pour l'image
        if (this.elements.image) {
            this.elements.image.addEventListener('mousedown', (e) => this.startDrag(e));
            document.addEventListener('mousemove', (e) => this.drag(e));
            document.addEventListener('mouseup', () => this.endDrag());
            
            // Mouse wheel zoom
            this.elements.image.addEventListener('wheel', (e) => {
                e.preventDefault();
                if (e.deltaY < 0) {
                    this.zoomIn();
                } else {
                    this.zoomOut();
                }
            });
        }
    },

    /**
     * Ouvre la modale avec une image
     * @param {string} src - Source de l'image
     * @param {string} alt - Texte alternatif
     */
    openImage(src, alt = '') {
        if (!this.elements.modal) return;

        this.state.currentImage = src;
        this.resetZoom();
        
        // Affiche le loading
        if (this.elements.loading) {
            this.elements.loading.style.display = 'block';
        }

        // Cache l'image pendant le chargement
        if (this.elements.image) {
            this.elements.image.style.display = 'none';
            this.elements.image.src = '';
        }

        // Ouvre la modale
        this.elements.modal.style.display = 'flex';
        this.state.isOpen = true;
        document.body.style.overflow = 'hidden';

        // Charge l'image
        const img = new Image();
        img.onload = () => {
            if (this.elements.image) {
                this.elements.image.src = src;
                this.elements.image.alt = alt;
                this.elements.image.style.display = 'block';
            }
            if (this.elements.loading) {
                this.elements.loading.style.display = 'none';
            }
        };
        img.onerror = () => {
            if (this.elements.loading) {
                this.elements.loading.textContent = 'Erreur de chargement';
            }
        };
        img.src = src;
    },

    /**
     * Ouvre la modale avec un PDF
     * @param {string} src - Source du PDF
     * @param {string} title - Titre du PDF
     */
    openPDF(src, title = 'Document PDF') {
        if (!this.elements.modal || !this.elements.content) return;

        // Cache l'image et le loading
        if (this.elements.image) {
            this.elements.image.style.display = 'none';
        }
        if (this.elements.loading) {
            this.elements.loading.style.display = 'none';
        }

        // Crée l'iframe PDF
        let iframe = this.elements.content.querySelector('.pdf-viewer');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.className = 'pdf-viewer';
            this.elements.content.appendChild(iframe);
        }
        
        iframe.src = src;
        iframe.title = title;
        iframe.style.display = 'block';

        // Ouvre la modale
        this.elements.modal.style.display = 'flex';
        this.state.isOpen = true;
        document.body.style.overflow = 'hidden';
    },

    /**
     * Ferme la modale
     */
    close() {
        if (!this.elements.modal) return;

        this.elements.modal.style.display = 'none';
        this.state.isOpen = false;
        document.body.style.overflow = '';

        // Nettoie
        if (this.elements.image) {
            this.elements.image.src = '';
        }

        // Supprime l'iframe PDF si présente
        const iframe = this.elements.content?.querySelector('.pdf-viewer');
        if (iframe) {
            iframe.remove();
        }

        this.resetZoom();
    },

    /**
     * Zoom avant
     */
    zoomIn() {
        if (this.state.currentZoom < this.config.maxZoom) {
            this.state.currentZoom += this.config.zoomStep;
            this.applyZoom();
        }
    },

    /**
     * Zoom arrière
     */
    zoomOut() {
        if (this.state.currentZoom > this.config.minZoom) {
            this.state.currentZoom -= this.config.zoomStep;
            this.applyZoom();
        }
    },

    /**
     * Réinitialise le zoom
     */
    resetZoom() {
        this.state.currentZoom = 1;
        this.state.translateX = 0;
        this.state.translateY = 0;
        this.applyZoom();
    },

    /**
     * Applique le zoom actuel
     */
    applyZoom() {
        if (!this.elements.image) return;

        this.elements.image.style.transform = 
            `translate(${this.state.translateX}px, ${this.state.translateY}px) scale(${this.state.currentZoom})`;

        // Met à jour le bouton de zoom
        if (this.elements.zoomReset) {
            this.elements.zoomReset.textContent = `${Math.round(this.state.currentZoom * 100)}%`;
        }
    },

    /**
     * Démarre le drag
     * @param {MouseEvent} e 
     */
    startDrag(e) {
        if (this.state.currentZoom <= 1) return;

        this.state.isDragging = true;
        this.state.startX = e.clientX - this.state.translateX;
        this.state.startY = e.clientY - this.state.translateY;
        
        if (this.elements.image) {
            this.elements.image.style.cursor = 'grabbing';
        }
    },

    /**
     * Drag en cours
     * @param {MouseEvent} e 
     */
    drag(e) {
        if (!this.state.isDragging) return;

        e.preventDefault();
        this.state.translateX = e.clientX - this.state.startX;
        this.state.translateY = e.clientY - this.state.startY;
        this.applyZoom();
    },

    /**
     * Fin du drag
     */
    endDrag() {
        this.state.isDragging = false;
        
        if (this.elements.image) {
            this.elements.image.style.cursor = this.state.currentZoom > 1 ? 'grab' : 'default';
        }
    }
};

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Modal;
}
