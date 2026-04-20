/**
 * Portfolio Marie Challet - Main JavaScript
 * Refactored with KISS, DRY, and SOLID principles
 * @version 2.0.0
 */

// ============================================================================
// UTILITIES MODULE - Fonctions utilitaires réutilisables
// ============================================================================
const Utils = {
    /**
     * Debounce - Limite la fréquence d'exécution d'une fonction
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
     * Vérifie si l'utilisateur préfère les mouvements réduits
     */
    prefersReducedMotion() {
        return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    },

    /**
     * Vérifie si on est sur mobile
     */
    isMobile() {
        return window.innerWidth <= 768;
    },

    /**
     * Sélecteur avec vérification null-safe
     */
    $(selector) {
        return document.querySelector(selector);
    },

    $$(selector) {
        return document.querySelectorAll(selector);
    }
};

// ============================================================================
// ANIMATION MODULE - Gestion des animations
// ============================================================================
const Animation = {
    /**
     * Animation slide down pour afficher un élément
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

    fadeIn(element, duration = 0.5) {
        if (!element) return;
        element.style.transition = `opacity ${duration}s ease`;
        element.style.opacity = 1;
    },

    fadeOut(element, duration = 0.5, callback) {
        if (!element) return;
        element.style.transition = `opacity ${duration}s ease`;
        element.style.opacity = 0;
        if (callback) setTimeout(callback, duration * 1000);
    }
};

// ============================================================================
// TYPED TEXT MODULE - Animation de texte machine à écrire
// ============================================================================
const TypedText = {
    config: {
        texts: [
            "Future Ingénieure en Cybersécurité Défensive",
            "Profil Hybride Data × Cybersécurité",
            "SOC | CERT/CSIRT | Threat Intelligence | Forensic",
            "La Data au service de la Cybersécurité",
            "INSA CVL — SecNumEdu ANSSI"
        ],
        typingDelay: 100,
        erasingDelay: 50,
        pauseDelay: 2000
    },

    state: {
        textIndex: 0,
        charIndex: 0
    },

    elements: {
        text: null,
        cursor: null
    },

    init() {
        this.elements.text = Utils.$('.typed-text');
        this.elements.cursor = Utils.$('.cursor');
        
        if (!this.elements.text || !this.elements.cursor) return;
        
        setTimeout(() => this.type(), this.config.pauseDelay);
    },

    type() {
        const { texts, typingDelay, pauseDelay } = this.config;
        const currentText = texts[this.state.textIndex];
        
        if (this.state.charIndex < currentText.length) {
            this.elements.cursor.classList.add('typing');
            this.elements.text.textContent += currentText.charAt(this.state.charIndex);
            this.state.charIndex++;
            setTimeout(() => this.type(), typingDelay);
        } else {
            this.elements.cursor.classList.remove('typing');
            setTimeout(() => this.erase(), pauseDelay);
        }
    },

    erase() {
        const { erasingDelay, typingDelay, texts } = this.config;
        
        if (this.state.charIndex > 0) {
            this.elements.cursor.classList.add('typing');
            this.elements.text.textContent = texts[this.state.textIndex].substring(0, this.state.charIndex - 1);
            this.state.charIndex--;
            setTimeout(() => this.erase(), erasingDelay);
        } else {
            this.elements.cursor.classList.remove('typing');
            this.state.textIndex = (this.state.textIndex + 1) % texts.length;
            setTimeout(() => this.type(), typingDelay + 500);
        }
    }
};

// ============================================================================
// PARTICLES MODULE - Configuration des particules de fond
// ============================================================================
const Particles = {
    init() {
        const container = Utils.$('#particles-js');
        if (typeof particlesJS === 'undefined' || !container) return;

        const existingCanvas = container.querySelector('canvas');
        if (existingCanvas) existingCanvas.remove();

        const particleCount = Utils.isMobile() ? 30 : 80;
        
        particlesJS('particles-js', {
            particles: {
                number: { value: particleCount, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 4, size_min: 0.3, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: !Utils.isMobile(), mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
};

// ============================================================================
// MODAL MODULE - Gestion des modales
// ============================================================================
const Modal = {
    elements: {
        modal: null,
        content: null
    },

    init() {
        this.elements.modal = Utils.$('#example-modal');
        this.elements.content = Utils.$('#modal-content-container');
        this.bindEvents();
    },

    bindEvents() {
        // Fermer avec le bouton X
        Utils.$('.close-modal')?.addEventListener('click', () => this.close());
        
        // Fermer en cliquant en dehors
        window.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) this.close();
        });

        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.modal?.style.display === 'block') {
                this.close();
            }
        });
    },

    open(type, src) {
        const { modal, content } = this.elements;
        if (!modal || !content) return;
        
        content.innerHTML = '<div class="loading-spinner"></div>';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        if (!src || src === 'null' || src === 'undefined') {
            this.showError('Contenu non disponible');
            return;
        }
        
        if (type === 'image') {
            this.loadImage(src);
        } else if (type === 'pdf') {
            this.loadPDF(src);
        } else {
            content.innerHTML = `<div class="content-container">${src}</div>`;
        }
    },

    loadImage(src) {
        const img = new Image();
        img.onload = () => {
            this.elements.content.innerHTML = '';
            img.className = 'image-viewer';
            img.alt = 'Aperçu du projet';
            this.elements.content.appendChild(img);
            this.addZoomControls(img);
        };
        img.onerror = () => this.showError('Impossible de charger l\'image');
        img.src = src;
    },

    addZoomControls(img) {
        let scale = 1;
        const controls = document.createElement('div');
        controls.className = 'zoom-controls';
        controls.innerHTML = `
            <button class="zoom-btn" data-action="in"><i class="fas fa-search-plus"></i></button>
            <button class="zoom-btn" data-action="out"><i class="fas fa-search-minus"></i></button>
            <button class="zoom-btn" data-action="reset"><i class="fas fa-sync"></i></button>
        `;
        
        controls.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            if (action === 'in') scale = Math.min(scale + 0.2, 3);
            else if (action === 'out') scale = Math.max(scale - 0.2, 0.5);
            else if (action === 'reset') scale = 1;
            img.style.transform = `scale(${scale})`;
        });
        
        this.elements.content.appendChild(controls);
    },

    loadPDF(src) {
        if (typeof pdfjsLib === 'undefined') {
            this.showError('PDF.js n\'est pas chargé');
            return;
        }

        pdfjsLib.getDocument(src).promise
            .then(pdf => this.renderPDF(pdf))
            .catch(err => this.showError(`Erreur PDF: ${err.message}`));
    },

    renderPDF(pdf) {
        let pageNum = 1;
        const content = this.elements.content;
        content.innerHTML = '';
        
        // Controls
        const controls = document.createElement('div');
        controls.className = 'pdf-controls';
        controls.innerHTML = `
            <button id="prev-page"><i class="fas fa-arrow-left"></i></button>
            <span class="page-info">Page <span id="page-num">1</span> / ${pdf.numPages}</span>
            <button id="next-page"><i class="fas fa-arrow-right"></i></button>
        `;
        
        // Canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-viewer';
        
        content.appendChild(controls);
        content.appendChild(canvas);
        
        const renderPage = (num) => {
            pdf.getPage(num).then(page => {
                const viewport = page.getViewport({ scale: 1.5 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                page.render({ canvasContext: canvas.getContext('2d'), viewport });
                Utils.$('#page-num').textContent = num;
            });
        };
        
        Utils.$('#prev-page')?.addEventListener('click', () => {
            if (pageNum > 1) renderPage(--pageNum);
        });
        
        Utils.$('#next-page')?.addEventListener('click', () => {
            if (pageNum < pdf.numPages) renderPage(++pageNum);
        });
        
        renderPage(pageNum);
    },

    showError(message) {
        this.elements.content.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i> ${message}
            </div>`;
    },

    close() {
        if (this.elements.modal) {
            this.elements.modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
};

// ============================================================================
// PROJECT CARDS MODULE - Gestion des cartes de projets
// ============================================================================
const ProjectCards = {
    init() {
        this.bindDetailButtons();
        this.bindPreviewItems();
        this.bindFilters();
    },

    bindDetailButtons() {
        const allButtons = Utils.$$('.project-details-btn');
        
        // Ajouter chevron et préparer chaque bouton
        allButtons.forEach(btn => {
            // Ajouter l'icône chevron si pas déjà présente
            if (!btn.querySelector('.chevron-icon')) {
                const label = document.createElement('span');
                label.textContent = btn.textContent.trim();
                const chevron = document.createElement('i');
                chevron.className = 'fas fa-chevron-down chevron-icon';
                btn.textContent = '';
                btn.appendChild(label);
                btn.appendChild(chevron);
            }
            
            // Préparer le contenu des détails
            const card = btn.closest('.project-card-inner');
            const details = card?.querySelector('.project-details-content');
            if (!details) return;
            
            // Supprimer display:none et utiliser max-height
            details.style.display = '';
            
            // Ajouter bouton fermer en bas si pas déjà présent
            if (!details.querySelector('.project-details-close')) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'project-details-close';
                closeBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Réduire';
                closeBtn.addEventListener('click', () => btn.click());
                details.appendChild(closeBtn);
            }
        });
        
        // Gérer le clic sur chaque bouton
        allButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.project-card-inner');
                const details = card?.querySelector('.project-details-content');
                if (!details) return;
                
                const isOpen = this.classList.contains('active');
                const label = this.querySelector('span');
                
                if (isOpen) {
                    // Fermer ce panneau
                    this.classList.remove('active');
                    if (label) label.textContent = 'Voir détails';
                    details.style.maxHeight = details.scrollHeight + 'px';
                    requestAnimationFrame(() => {
                        details.style.maxHeight = '0px';
                        details.classList.remove('open');
                    });
                } else {
                    // Fermer les autres panneaux ouverts (accordion)
                    allButtons.forEach(otherBtn => {
                        if (otherBtn !== this && otherBtn.classList.contains('active')) {
                            const otherCard = otherBtn.closest('.project-card-inner');
                            const otherDetails = otherCard?.querySelector('.project-details-content');
                            if (otherDetails) {
                                otherBtn.classList.remove('active');
                                const otherLabel = otherBtn.querySelector('span');
                                if (otherLabel) otherLabel.textContent = 'Voir détails';
                                otherDetails.style.maxHeight = otherDetails.scrollHeight + 'px';
                                requestAnimationFrame(() => {
                                    otherDetails.style.maxHeight = '0px';
                                    otherDetails.classList.remove('open');
                                });
                            }
                        }
                    });
                    
                    // Ouvrir ce panneau
                    this.classList.add('active');
                    if (label) label.textContent = 'Masquer détails';
                    details.classList.add('open');
                    details.style.maxHeight = details.scrollHeight + 'px';
                    
                    // Retirer max-height après la transition pour permettre le contenu dynamique
                    setTimeout(() => {
                        if (this.classList.contains('active')) {
                            details.style.maxHeight = 'none';
                        }
                    }, 550);
                    
                    // Scroll fluide vers le contenu
                    setTimeout(() => {
                        const cardEl = this.closest('.project-card');
                        if (cardEl) {
                            cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    }, 100);
                }
            });
        });
    },

    bindPreviewItems() {
        Utils.$$('.preview-item').forEach(item => {
            item.addEventListener('click', function() {
                const type = this.dataset.type;
                const src = this.dataset.src;
                if (type && src) Modal.open(type, src);
            });
        });
    },

    bindFilters() {
        const buttons = Utils.$$('.filter-btn');
        const cards = Utils.$$('.project-card');
        const descriptions = Utils.$$('.competence-description');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update button states
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                cards.forEach(card => {
                    const categories = card.dataset.category || '';
                    const shouldShow = filter === 'all' || categories.includes(filter);
                    card.style.display = shouldShow ? 'block' : 'none';
                    
                    if (shouldShow) {
                        Animation.fadeIn(card, 0.3);
                    }
                });

                // Update descriptions
                descriptions.forEach(desc => desc.classList.remove('active'));
                Utils.$(`#${filter}-description`)?.classList.add('active');
            });
        });
    }
};

// ============================================================================
// SCROLL MODULE - Gestion du défilement
// ============================================================================
const Scroll = {
    backToTopBtn: null,

    init() {
        this.backToTopBtn = Utils.$('#back-to-top');
        this.bindScrollEvents();
        this.bindSmoothScroll();
        this.initScrollObserver();
    },

    bindScrollEvents() {
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        document.body.appendChild(progress);

        const handleScroll = Utils.debounce(() => {
            const scrollY = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;

            if (this.backToTopBtn) {
                this.backToTopBtn.classList.toggle('visible', scrollY > 300);
                this.backToTopBtn.classList.toggle('show', scrollY > 300);
            }

            if (scrollHeight > 0) {
                progress.style.width = `${(scrollY / scrollHeight) * 100}%`;
            }
        }, 50);

        window.addEventListener('scroll', handleScroll, { passive: true });

        this.backToTopBtn?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    bindSmoothScroll() {
        Utils.$$('.scroll-link, a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (!href?.startsWith('#')) return;
                e.preventDefault();
                Utils.$(href)?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    },

    initScrollObserver() {
        if (Utils.prefersReducedMotion()) {
            Utils.$$('.section-title, .timeline-item, [data-animate], .title-underline')
                .forEach(el => el.classList.add('visible'));
            return;
        }

        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            entries => entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            }),
            { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
        );

        Utils.$$('.section-title, .timeline-item, [data-animate], .title-underline, .skill-progress-bar')
            .forEach(el => observer.observe(el));
    }
};

// ============================================================================
// AOS WRAPPER - Initialisation d'AOS
// ============================================================================
const AOSWrapper = {
    init() {
        if (typeof AOS === 'undefined') return;
        
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            offset: 100,
            disable: Utils.prefersReducedMotion()
        });
    }
};

// ============================================================================
// CERTIFICATION CIRCLES - Animation des cercles de certification
// ============================================================================
const CertificationCircles = {
    init() {
        Utils.$$('.certif-progress').forEach(circle => {
            const percent = parseFloat(circle.dataset.percent);
            const radius = parseFloat(circle.getAttribute('r'));
            if (isNaN(percent) || isNaN(radius)) return;
            
            const circumference = 2 * Math.PI * radius;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;
            
            this.animateOnScroll(circle, circumference, percent);
        });
    },

    animateOnScroll(circle, circumference, percent) {
        if (!('IntersectionObserver' in window)) {
            this.animate(circle, circumference, percent);
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(circle, circumference, percent);
                    observer.unobserve(circle);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(circle);
    },

    animate(circle, circumference, percent) {
        const offset = circumference - (percent / 100 * circumference);
        setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
            circle.style.strokeDashoffset = offset;
        }, 300);
    }
};

// ============================================================================
// RESPONSIVE HANDLER - Gestion du redimensionnement
// ============================================================================
const ResponsiveHandler = {
    wasMobile: Utils.isMobile(),

    init() {
        window.addEventListener('resize', Utils.debounce(() => {
            const isMobile = Utils.isMobile();
            if (isMobile !== this.wasMobile) {
                this.wasMobile = isMobile;
                Particles.init();
            }
        }, 250));
    }
};

// ============================================================================
// MENU TOGGLE MODULE - Gestion du menu latéral
// ============================================================================
const MenuToggle = {
    init() {
        const menuToggle = Utils.$('#menu-toggle');
        const sideMenu = Utils.$('#side-menu');
        const menuOverlay = Utils.$('#menu-overlay');
        
        if (!menuToggle || !sideMenu || !menuOverlay) return;
        
        // Toggle du menu
        const toggleMenu = () => {
            const isActive = menuToggle.classList.toggle('active');
            sideMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            menuToggle.setAttribute('aria-expanded', isActive);
            sideMenu.setAttribute('aria-hidden', !isActive);
            
            // Bloquer le scroll du body quand le menu est ouvert
            document.body.style.overflow = isActive ? 'hidden' : '';
        };
        
        menuToggle.addEventListener('click', toggleMenu);
        
        // Fermer le menu au clic sur l'overlay
        menuOverlay.addEventListener('click', toggleMenu);
        
        // Fermer le menu lors du clic sur un lien
        sideMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                sideMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                sideMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
        
        // Fermer avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
};

// ============================================================================
// MAIN INITIALIZATION - Point d'entrée principal
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Configuration PDF.js
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    // Initialisation des modules
    AOSWrapper.init();
    TypedText.init();
    Particles.init();
    Modal.init();
    ProjectCards.init();
    Scroll.init();
    CertificationCircles.init();
    ResponsiveHandler.init();
    MenuToggle.init();

    // Marquer le corps comme chargé
    document.body.classList.remove('is-preload');
});

// Export pour utilisation externe si nécessaire
window.Portfolio = {
    Utils,
    Animation,
    Modal,
    ProjectCards
};

