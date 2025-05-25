/**
 * Portfolio Marie Challet - Main JavaScript
 * Provides animations, interactivity and responsive behavior
 */

document.addEventListener('DOMContentLoaded', function() {
    // Interactive quick links
    const quickLinks = document.querySelectorAll('.quick-link');
    quickLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (window.gsap) {
                gsap.to(this, {
                    y: -8,
                    duration: 0.3,
                    ease: "power1.out"
                });
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (window.gsap) {
                gsap.to(this, {
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });
    });

    // Enhanced hexagon effect on scroll
    const hexagonWrapper = document.querySelector('.hexagon-wrapper');
    if (hexagonWrapper && window.gsap && typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: hexagonWrapper,
            start: "top 80%",
            onEnter: () => {
                gsap.to('.hexagon-shape', {
                    rotation: 30,
                    duration: 1.2,
                    ease: "power2.out"
                });
                gsap.to('.hexagon-shape', {
                    rotation: 0,
                    duration: 1.8,
                    delay: 1.2,
                    ease: "elastic.out(1, 0.3)"
                });
            },
            once: true
        });
    }

    // Initialisation AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Animation texte d'accueil avec effet machine à écrire
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    
    if (typedTextSpan && cursorSpan) {
        const textArray = ["BI Developer", "Data Analyst", "Data Engineer", "Future Ingénieure en Cybersécurité"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } 
            else {
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } 
            else {
                cursorSpan.classList.remove("typing");
                textArrayIndex++;
                if(textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }
        
        if(textArray.length) setTimeout(type, newTextDelay + 250);
    }

    // Debounce function
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Gestion du scroll fluide avec Locomotive (si data-scroll-container est présent)
    let locoScroll;
    const scrollContainer = document.querySelector('[data-scroll-container]') || document.body;
    
    if (typeof LocomotiveScroll !== 'undefined' && scrollContainer.hasAttribute('data-scroll-container')) {
        locoScroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            smoothMobile: false,
            getDirection: true,
        });

        // Mettre à jour ScrollTrigger lorsque LocomotiveScroll défile
        locoScroll.on('scroll', ScrollTrigger.update);

        // Indiquer à ScrollTrigger d'utiliser LocomotiveScroll comme proxy de défilement
        ScrollTrigger.scrollerProxy(scrollContainer, {
            scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            pinType: scrollContainer.style.transform ? "transform" : "fixed"
        });
        
        ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
        ScrollTrigger.refresh();
    }

    // Swiper pour les projets
    try {
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            centeredSlides: true,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    } catch (err) {
        console.log('Swiper initialization error:', err);
    }

    // Barres de compétences - Animation
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    if (window.gsap && typeof ScrollTrigger !== 'undefined') {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            
            gsap.to(bar, {
                width: `${progress}%`,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 80%',
                }
            });
            
            // Add shine effect class
            bar.classList.add('with-shine');
        });
    } else {
        // Fallback for when GSAP isn't loaded
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
            bar.classList.add('with-shine');
        });
    }

    // Certification progress circle animation
    function initCertificationCircles() {
        const certifCircles = document.querySelectorAll('.certif-progress');
        
        certifCircles.forEach(circle => {
            const percent = circle.getAttribute('data-percent');
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;
            
            // Create a ScrollTrigger for each circle if GSAP exists
            if (window.gsap && typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.create({
                    trigger: circle,
                    start: "top 80%",
                    onEnter: () => {
                        const offset = circumference - (percent / 100 * circumference);
                        gsap.to(circle, {
                            strokeDashoffset: offset,
                            duration: 1.5,
                            ease: "power2.out"
                        });
                        
                        // Also animate the corresponding logo
                        const certifItem = circle.closest('.certif-item');
                        if (certifItem) {
                            const logo = certifItem.querySelector('.certif-logo');
                            if (logo) {
                                gsap.fromTo(logo, 
                                    { scale: 0.8, opacity: 0.5 }, 
                                    { scale: 1, opacity: 1, duration: 0.5, delay: 0.8 }
                                );
                            }
                        }
                    },
                    once: true
                });
            } else {
                // Fallback for browsers without GSAP
                setTimeout(() => {
                    const offset = circumference - (percent / 100 * circumference);
                    circle.style.strokeDashoffset = offset;
                }, 500);
            }
        });
    }

    // Call certification circle animation
    initCertificationCircles();

    // Gestion des onglets compétences
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Reset active state
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Set active state
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.querySelector(`.tab-content[data-tab="${tabId}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Filtres de projets
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Reset active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Set active state
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projects.forEach(project => {
                const categories = project.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    project.style.display = 'block';
                    if (window.gsap) {
                        gsap.to(project, { opacity: 1, duration: 0.5 });
                    } else {
                        project.style.opacity = 1;
                    }
                } else {
                    if (window.gsap) {
                        gsap.to(project, { 
                            opacity: 0, 
                            duration: 0.5,
                            onComplete: () => {
                                project.style.display = 'none';
                            }
                        });
                    } else {
                        project.style.opacity = 0;
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 500);
                    }
                }
            });
            
            // Update Swiper if it exists
            if (typeof Swiper !== 'undefined' && window.swiperInstance) {
                setTimeout(() => {
                    window.swiperInstance.update();
                }, 600);
            }
        });
    });

    // Gestion des boutons de détails des projets
    const detailsButtons = document.querySelectorAll('.btn-details');
    detailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project-card-inner');
            if (card) {
                card.classList.toggle('flipped');
            }
        });
    });
    
    const closeButtons = document.querySelectorAll('.overlay-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project-card-inner');
            if (card) {
                card.classList.remove('flipped');
            }
        });
    });
    
    // Conserver uniquement la gestion de la visibilité du bouton "Retour en haut"
    const debouncedScrollHandler = debounce(() => {
        const scrollPosition = locoScroll ? locoScroll.scroll.instance.scroll.y : window.pageYOffset;
        
        // Gérer la visibilité du bouton "Retour en haut"
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            if (scrollPosition > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    }, 100);

    if (locoScroll) {
        locoScroll.on('scroll', debouncedScrollHandler);
    } else {
        window.addEventListener('scroll', debouncedScrollHandler);
    }
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Ici vous ajouterez le code pour envoyer le formulaire par email
            alert('Message envoyé ! (simulation)');
            contactForm.reset();
        });
    }
    
    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    });

    // Ajout du bouton retour en haut avec comportement ergonomique
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            if (locoScroll) {
                locoScroll.scrollTo('top');
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Rendre le bouton "Découvrir" plus ergonomique
    const scrollLinks = document.querySelectorAll('.scroll-link');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (locoScroll) {
                locoScroll.scrollTo(targetId);
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Optimiser les performances des animations
    let isMobile = window.innerWidth <= 768;
    
    const debouncedResizeHandler = debounce(() => {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            isMobile = newIsMobile;
            updateParticlesConfig();
            if (locoScroll) locoScroll.update(); // Mettre à jour LocomotiveScroll au redimensionnement
        }
    }, 250);

    window.addEventListener('resize', debouncedResizeHandler);
    
    function updateParticlesConfig() {
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            // Réduire le nombre de particules sur mobile pour de meilleures performances
            const particleCount = isMobile ? 30 : 80;
            
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: particleCount,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: {
                        value: 0.5,
                        random: true,
                        animation: { enable: true, speed: 1, min_value: 0.1, sync: false }
                    },
                    size: {
                        value: 3,
                        random: true,
                        animation: { enable: true, speed: 4, min_value: 0.3, sync: false }
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
                        out_mode: "out"
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
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
    }
    
    // Appeler initialement et lors du redimensionnement
    updateParticlesConfig();
    
    // Détection de préférence de mouvement réduit
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Simplifier les animations pour respecter les préférences utilisateur
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(el => {
            el.removeAttribute('data-aos');
            el.classList.add('visible');
        });
        
        // Désactiver les animations AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                disable: true
            });
        }
    }

    // Animation améliorée des éléments d'information clés
    const keyInfoItems = document.querySelectorAll('.key-info-item');
    
    if (keyInfoItems.length && window.gsap) {
        // Créer une timeline GSAP réutilisable pour chaque élément
        keyInfoItems.forEach(item => {
            // Préparation de la timeline pour chaque élément (mais pas d'exécution immédiate)
            const tl = gsap.timeline({ paused: true });
            const icon = item.querySelector('.info-icon');
            const content = item.querySelector('.info-content');
            
            // Animation plus sophistiquée
            tl.to(item, {
                scale: 1.03, 
                boxShadow: '0 15px 25px rgba(0, 0, 0, 0.12)',
                duration: 0.4,
                ease: "power2.out"
            })
            .to(icon, {
                rotate: 10, 
                scale: 1.15,
                backgroundColor: 'var(--accent-color)',
                duration: 0.4,
                ease: "back.out(1.7)"
            }, "<")
            .to(content.querySelector('h4'), {
                color: 'var(--primary-color)',
                duration: 0.3,
                ease: "power1.out"
            }, "<0.1");
            
            // Utiliser les events handlers pour jouer/inverser la timeline
            item.addEventListener('mouseenter', () => tl.play());
            item.addEventListener('mouseleave', () => tl.reverse());
            item.addEventListener('focus', () => tl.play());
            item.addEventListener('blur', () => tl.reverse());
        });
        
        // Animation séquentielle initiale avec ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.set(keyInfoItems, { y: 30, opacity: 0 });
            
            ScrollTrigger.batch(keyInfoItems, {
                interval: 0.1, // Délai entre chaque animation d'élément
                batchMax: 3,   // Nombre maximum d'éléments à animer en même temps
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power3.out"
                }),
                start: "top 85%"
            });
        }
    }
    
    // Interaction améliorée pour le texte mis en évidence
    const highlights = document.querySelectorAll('.highlight');
    
    if (highlights.length && window.gsap) {
        highlights.forEach(highlight => {
            // Animation plus fluide avec effet de pulsation
            const tlHighlight = gsap.timeline({ paused: true });
            
            tlHighlight.to(highlight, {
                backgroundColor: `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--primary-rgb')}, 0.35)`,
                color: 'var(--text-highlight)',
                fontWeight: '600',
                letterSpacing: '0.3px',
                duration: 0.4,
                ease: "power2.inOut"
            });
            
            // Gérer les événements
            highlight.addEventListener('mouseenter', () => tlHighlight.play());
            highlight.addEventListener('mouseleave', () => tlHighlight.reverse());
            
            // Animation initiale pour attirer l'attention
            if (Math.random() > 0.6) { // Animation aléatoire pour certains éléments uniquement
                gsap.timeline({
                    scrollTrigger: {
                        trigger: highlight,
                        start: "top bottom-=100px",
                        once: true
                    }
                }).fromTo(highlight,
                    { backgroundColor: `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--primary-rgb')}, 0)` },
                    { backgroundColor: `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--primary-rgb')}, 0.4)`, 
                      duration: 0.7,
                      ease: "power2.in",
                      yoyo: true,
                      repeat: 1
                    }
                );
            }
        });
    }
    
    // Observer pour les animations progressives des éléments importants
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const fadeUpItems = document.querySelectorAll('.fade-up-on-scroll');
        
        const appearOnScroll = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('has-appeared');
                        observer.unobserve(entry.target);
                    }
                });
            }, 
            { threshold: 0.25 }
        );
        
        fadeUpItems.forEach(item => {
            appearOnScroll.observe(item);
        });
    }

    // Media Viewer - Gestionnaire pour l'affichage des PDFs et images
    function setupMediaViewer() {
        // Fonction pour ouvrir la modale avec le contenu approprié
        function openModal(content, type) {
            const modal = document.getElementById('example-modal');
            const modalContent = document.getElementById('modal-content-container');
            
            // Clear previous content
            modalContent.innerHTML = '';
            
            if (type === 'image') {
                // Create image element with error handling
                if (!content || content === 'null' || content === 'undefined') {
                    // Handle null or undefined content
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'modal-error';
                    errorMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Image non disponible';
                    modalContent.appendChild(errorMessage);
                } else {
                    const img = document.createElement('img');
                    img.className = 'modal-image';
                    img.alt = 'Aperçu du projet';
                    
                    // Add error handling for the image
                    img.onerror = function() {
                        this.onerror = null;
                        this.src = 'assets/img/placeholder-image.png';
                        this.classList.add('fallback-image');
                        
                        // Add error message below the fallback image
                        const errorNote = document.createElement('p');
                        errorNote.className = 'image-error-note';
                        errorNote.textContent = 'L\'image originale n\'a pas pu être chargée.';
                        modalContent.appendChild(errorNote);
                    };
                    
                    // Set the image source
                    img.src = content;
                    modalContent.appendChild(img);
                }
            } else if (type === 'pdf') {
                // Handle PDF content with error handling
                const pdfContainer = document.createElement('div');
                pdfContainer.className = 'pdf-container';
                
                // Check for valid PDF path
                if (!content || content === 'null' || content === 'undefined') {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'modal-error';
                    errorMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Document PDF non disponible';
                    modalContent.appendChild(errorMessage);
                } else {
                    // Try to load the PDF with proper error handling
                    try {
                        const pdfViewer = document.createElement('iframe');
                        pdfViewer.className = 'pdf-viewer';
                        pdfViewer.src = content;
                        pdfViewer.onerror = function() {
                            this.style.display = 'none';
                            const errorMessage = document.createElement('div');
                            errorMessage.className = 'modal-error';
                            errorMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Impossible de charger le PDF';
                            pdfContainer.appendChild(errorMessage);
                        };
                        pdfContainer.appendChild(pdfViewer);
                        modalContent.appendChild(pdfContainer);
                    } catch (e) {
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'modal-error';
                        errorMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur lors du chargement du PDF';
                        modalContent.appendChild(errorMessage);
                    }
                }
            } else {
                // For other content types, just insert as HTML
                if (!content) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'modal-error';
                    errorMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Contenu non disponible';
                    modalContent.appendChild(errorMessage);
                } else {
                    modalContent.innerHTML = content;
                }
            }
            
            // Show the modal
            modal.style.display = 'flex';
            
            // Add accessibility focus
            setTimeout(() => {
                const closeButton = modal.querySelector('.close-modal');
                if (closeButton) closeButton.focus();
            }, 100);
        }

        // Fix the preview item click handler
        document.addEventListener('DOMContentLoaded', function() {
            const previewItems = document.querySelectorAll('.preview-item');
            previewItems.forEach(item => {
                item.addEventListener('click', function() {
                    const type = this.getAttribute('data-type');
                    const src = this.getAttribute('data-src');
                    
                    // Validate the source before opening modal
                    if (!src || src === 'null' || src === 'undefined') {
                        console.warn('Invalid source for preview item:', type);
                        openModal(null, type); // Pass null to trigger error handling
                    } else {
                        openModal(src, type);
                    }
                });
            });
        });

        // Fonction pour fermer la modale
        function closeModal() {
            const modal = document.getElementById('example-modal');
            modal.style.display = 'none';
            document.getElementById('modal-content-container').innerHTML = '';
        }
        
        // Ajouter les event listeners
        document.querySelectorAll('.example-item').forEach(item => {
            item.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                const src = this.getAttribute('data-src');
                openModal(src, type);
            });
        });
        
        // Fermer la modale quand on clique sur le X
        const closeButton = document.querySelector('.close-modal');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
        
        // Fermer la modale quand on clique en dehors du contenu
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('example-modal');
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Initialiser le Media Viewer
    setupMediaViewer();

    // Configuration des particles.js
    function setupParticles() {
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                    },
                    opacity: {
                        value: 0.5,
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
                            speed: 4,
                            size_min: 0.3,
                            sync: false
                        }
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
                        bounce: false,
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "repulse"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        repulse: {
                            distance: 100,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    // Initialiser les particles
    setupParticles();

    // Initialiser le Scroll Observer
    function setupScrollObserver() {
        // Vérifier les préférences de mouvement réduit
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Appliquer directement les classes sans animation
            document.querySelectorAll('.section-title, .timeline-item, [data-animate], .title-underline')
                .forEach(el => {
                    el.classList.add('visible');
                });
            return;
        }
        
        // Implémenter l'Intersection Observer uniquement si le navigateur le prend en charge
        if ('IntersectionObserver' in window) {
            // Utiliser un seul observer avec une fonction de callback réutilisable
            const observerCallback = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Libérer la mémoire en arrêtant d'observer une fois visible
                        observer.unobserve(entry.target);
                    }
                });
            };
            
            const observer = new IntersectionObserver(observerCallback, {
                rootMargin: '0px 0px -10% 0px', // Déclencher un peu avant que l'élément soit totalement visible
                threshold: 0.1 // Déclencher quand 10% de l'élément est visible
            });
            
            // Définir les groupes d'éléments à observer
            const elementsToObserve = [
                '.section-title',
                '.timeline-item',
                '[data-animate]',
                '.title-underline',
                '.skill-progress-bar',
                '.certif-progress'
            ].join(', ');
            
            // Observer tous les éléments correspondants
            document.querySelectorAll(elementsToObserve).forEach(el => {
                observer.observe(el);
            });
        } else {
            // Fallback pour les navigateurs sans IntersectionObserver
            document.querySelectorAll('.section-title, .timeline-item, [data-animate], .title-underline')
                .forEach(el => {
                    el.classList.add('visible');
                });
        }
        
        // Gestion des éléments de chargement progressif
        function handleLazyLoad() {
            const lazyLoadElements = document.querySelectorAll('[data-src]');
            
            lazyLoadElements.forEach(element => {
                const src = element.getAttribute('data-src');
                
                if (element.tagName === 'IMG') {
                    element.src = src;
                } else {
                    element.style.backgroundImage = `url(${src})`;
                }
                
                element.removeAttribute('data-src');
            });
        }
        
        // Exécuter après un court délai pour la priorité de l'affichage initial
        setTimeout(handleLazyLoad, 1000);
    }

    // Initialiser le Scroll Observer
    setupScrollObserver();

    // Setup des "Voir plus" pour les projets
    function setupToggleButtons() {
        // Ajouter des boutons "Voir plus" à chaque projet
        const projets = document.querySelectorAll('.skill-card');
        
        projets.forEach(projet => {
            const description = projet.querySelector('.projet-description');
            const paragraph = projet.querySelector('.skill-content > p:not(.competence-tag)');
            
            if (description && paragraph) {
                // Créer un bouton toggle pour la description détaillée
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'toggle-description';
                toggleBtn.innerHTML = '<span>Voir plus</span> <i class="fas fa-chevron-down"></i>';
                
                // Insérer après le paragraphe principal
                paragraph.after(toggleBtn);
                
                // Retirer le bouton existant de la description
                const existingBtn = description.querySelector('.read-more-btn');
                if (existingBtn) {
                    existingBtn.remove();
                }
                
                // Ajouter l'événement de clic
                toggleBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); // Empêcher la propagation au header
                    
                    // Basculer la classe pour montrer/cacher la description
                    description.classList.toggle('visible');
                    
                    // Mettre à jour le texte du bouton
                    if (description.classList.contains('visible')) {
                        toggleBtn.innerHTML = '<span>Voir moins</span> <i class="fas fa-chevron-up"></i>';
                    } else {
                        toggleBtn.innerHTML = '<span>Voir plus</span> <i class="fas fa-chevron-down"></i>';
                    }
                });
            }
        });
    }

    // Initialiser les boutons toggle
    setupToggleButtons();

    // Initialiser les filtres de compétences
    function setupSkillFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const skillItems = document.querySelectorAll('.skill-item');
        const skillDescriptions = document.querySelectorAll('.competence-description');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Reset active state for buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter skill items
                skillItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category').split(' ').includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Update descriptions - hide all first
                skillDescriptions.forEach(desc => {
                    desc.classList.remove('active');
                });
                
                // Show matching description
                const targetDescription = document.getElementById(`${filterValue}-description`);
                if (targetDescription) {
                    targetDescription.classList.add('active');
                } else if (filterValue === 'all') {
                    // If "all" is selected, show the all-description
                    document.getElementById('all-description').classList.add('active');
                }
            });
        });
    }

    // Initialiser les filtres de compétences
    setupSkillFilters();

    // Animation des progress bars pour les certifications
    function setupCertificationProgress() {
        const certifProgress = document.querySelectorAll('.certif-progress');
        certifProgress.forEach(circle => {
            const percent = circle.getAttribute('data-percent');
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            
            // Calculer la longueur du stroke pour l'animation
            const strokeDashoffset = circumference - (percent / 100 * circumference);
            
            // Appliquer les styles
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;
            
            // Déclencher l'animation
            setTimeout(() => {
                circle.style.transition = 'stroke-dashoffset 2s ease';
                circle.style.strokeDashoffset = strokeDashoffset;
            }, 500);
        });
    }

    // Initialiser les animations de progress bars pour les certifications
    setupCertificationProgress();
    
    // Fonction pour charger l'image de fond
    function handleLazyLoad() {
        const lazyLoadElements = document.querySelectorAll('[data-src]');
        
        lazyLoadElements.forEach(element => {
            const src = element.getAttribute('data-src');
            
            if (element.tagName === 'IMG') {
                element.src = src;
            } else {
                element.style.backgroundImage = `url(${src})`;
            }
            
            element.removeAttribute('data-src');
        });
    }
    
    // Exécuter après un court délai pour la priorité de l'affichage initial
    setTimeout(handleLazyLoad, 1000);

    // Nouveau code pour gérer les cartes de projets
    initProjectCards();

    // Gestion du modal
    const modal = document.getElementById('example-modal');
    const modalContentContainer = document.getElementById('modal-content-container');
    const closeModalButton = document.querySelector('.close-modal');

    // Ouvrir le modal
    document.querySelectorAll('.preview-item').forEach(item => {
        item.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            const src = this.getAttribute('data-src');

            // Injecter l'image dans le modal
            if (type === 'image') {
                modalContentContainer.innerHTML = `<img src="${src}" alt="Image d'exemple" style="width: 100%; height: auto;">`;
            } else {
                modalContentContainer.innerHTML = `<p>Type de contenu non pris en charge.</p>`;
            }

            // Afficher le modal
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    // Fermer le modal
    closeModalButton.addEventListener('click', function () {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    });

    // Fermer le modal en cliquant en dehors du contenu
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    });
});

// Initialisation des cartes de projets
function initProjectCards() {
    // Gestion des boutons "Voir détails"
    const detailButtons = document.querySelectorAll('.project-details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project-card-inner');
            const detailsContent = card.querySelector('.project-details-content');
            
            if (detailsContent.style.display === 'block') {
                // Fermer les détails
                button.textContent = 'Voir détails';
                slideUp(detailsContent, 300);
            } else {
                // Ouvrir les détails
                button.textContent = 'Masquer détails';
                slideDown(detailsContent, 300);
            }
        });
    });
    
    // Gestion des aperçus (images et PDF)
    const previewItems = document.querySelectorAll('.preview-item');
    previewItems.forEach(item => {
        item.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const src = this.getAttribute('data-src');
            openModal(type, src);
        });
    });
    
    // Gestion du filtrage des projets
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Mise à jour de l'état actif des boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrage des projets
            projectCards.forEach(card => {
                if (filter === 'all') {
                    slideDown(card, 300);
                    card.classList.add('visible');
                } else {
                    if (card.getAttribute('data-category').includes(filter)) {
                        slideDown(card, 300);
                        card.classList.add('visible');
                    } else {
                        slideUp(card, 300);
                        card.classList.remove('visible');
                    }
                }
            });
            
            // Animation pour réorganiser la grille
            setTimeout(() => {
                animateGrid();
            }, 310);
        });
    });
    
    // Animation des descriptions de compétences
    const filterButtonsCompetences = document.querySelectorAll('.filter-btn');
    const competenceDescriptions = document.querySelectorAll('.competence-description');
    
    filterButtonsCompetences.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            competenceDescriptions.forEach(desc => {
                desc.style.display = 'none';
            });
            
            const targetDesc = document.getElementById(`${filter}-description`);
            if (targetDesc) {
                targetDesc.style.display = 'block';
            }
        });
    });
}

// Animation pour réorganiser la grille de projets
function animateGrid() {
    const visibleCards = document.querySelectorAll('.project-card.visible');
    visibleCards.forEach((card, index) => {
        card.style.animation = `cardAppear 0.5s ease forwards ${index * 0.1}s`;
    });
}

// Fonctions d'animation pour les slides
function slideDown(element, duration) {
    element.style.display = 'block';
    element.style.overflow = 'hidden';
    const height = element.scrollHeight;
    element.style.height = '0px';
    
    setTimeout(function() {
        element.style.transition = `height ${duration}ms ease`;
        element.style.height = height + 'px';
    }, 5);
    
    setTimeout(function() {
        element.style.height = '';
        element.style.overflow = '';
        element.style.transition = '';
    }, duration + 10);
}

function slideUp(element, duration) {
    element.style.overflow = 'hidden';
    element.style.height = element.scrollHeight + 'px';
    
    setTimeout(function() {
        element.style.transition = `height ${duration}ms ease`;
        element.style.height = '0px';
    }, 5);
    
    setTimeout(function() {
        element.style.display = 'none';
        element.style.height = '';
        element.style.overflow = '';
        element.style.transition = '';
    }, duration + 10);
}

// Fonction d'ouverture de modal pour les aperçus
function openModal(type, src) {
    const modal = document.getElementById('example-modal');
    const modalContent = document.getElementById('modal-content-container');
    
    // Vider le contenu précédent
    modalContent.innerHTML = '';
    
    // Ajouter un loader
    const loader = document.createElement('div');
    loader.className = 'loading-spinner';
    modalContent.appendChild(loader);
    
    // Afficher la modal avec le loader
    modal.style.display = 'block';
    
    if (type === 'image') {
        // Charger l'image
        const img = new Image();
        img.onload = function() {
            // Supprimer le loader
            modalContent.innerHTML = '';
            
            // Créer les contrôles de zoom
            const zoomControls = document.createElement('div');
            zoomControls.className = 'zoom-controls';
            zoomControls.innerHTML = `
                <button id="zoom-in"><i class="fas fa-search-plus"></i> Zoom +</button>
                <button id="zoom-out"><i class="fas fa-search-minus"></i> Zoom -</button>
                <button id="zoom-reset"><i class="fas fa-sync"></i> Réinitialiser</button>
            `;
            
            // Ajouter l'image
            img.className = 'image-viewer';
            img.alt = 'Aperçu du projet';
            
            // Ajouter au modal
            modalContent.appendChild(img);
            modalContent.appendChild(zoomControls);
            
            // Fonctionnalité de zoom
            let scale = 1;
            document.getElementById('zoom-in').addEventListener('click', function() {
                scale += 0.2;
                img.style.transform = `scale(${scale})`;
            });
            
            document.getElementById('zoom-out').addEventListener('click', function() {
                if (scale > 0.5) scale -= 0.2;
                img.style.transform = `scale(${scale})`;
            });
            
            document.getElementById('zoom-reset').addEventListener('click', function() {
                scale = 1;
                img.style.transform = `scale(${scale})`;
            });
        };
        
        img.onerror = function() {
            modalContent.innerHTML = '<div class="error-message">Impossible de charger l\'image</div>';
        };
        
        img.src = src;
    } else if (type === 'pdf') {
        // Charger le PDF avec PDF.js
        if (typeof pdfjsLib !== 'undefined') {
            const loadingTask = pdfjsLib.getDocument(src);
            let pdfDoc = null;
            let pageNum = 1;
            let pageRendering = false;
            let pageNumPending = null;
            
            loadingTask.promise.then(function(pdf) {
                pdfDoc = pdf;
                modalContent.innerHTML = '';
                
                // Créer les contrôles PDF
                const pdfControls = document.createElement('div');
                pdfControls.className = 'pdf-controls';
                pdfControls.innerHTML = `
                    <button id="prev-page"><i class="fas fa-arrow-left"></i> Page précédente</button>
                    <div class="page-info">Page <span id="page-num">1</span> / <span id="page-count">${pdf.numPages}</span></div>
                    <button id="next-page">Page suivante <i class="fas fa-arrow-right"></i></button>
                `;
                
                // Créer le canvas pour le PDF
                const canvas = document.createElement('canvas');
                canvas.className = 'pdf-viewer';
                
                // Ajouter au modal
                modalContent.appendChild(pdfControls);
                modalContent.appendChild(canvas);
                
                // Fonctions de rendu PDF
                const renderPage = function(num) {
                    pageRendering = true;
                    
                    pdf.getPage(num).then(function(page) {
                        const viewport = page.getViewport({ scale: 1.5 });
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        
                        const renderContext = {
                            canvasContext: canvas.getContext('2d'),
                            viewport: viewport
                        };
                        
                        const renderTask = page.render(renderContext);
                        
                        renderTask.promise.then(function() {
                            pageRendering = false;
                            if (pageNumPending !== null) {
                                renderPage(pageNumPending);
                                pageNumPending = null;
                            }
                        });
                    });
                    
                    document.getElementById('page-num').textContent = num;
                };
                
                const queueRenderPage = function(num) {
                    if (pageRendering) {
                        pageNumPending = num;
                    } else {
                        renderPage(num);
                    }
                };
                
                const prevPage = function() {
                    if (pageNum <= 1) return;
                    pageNum--;
                    queueRenderPage(pageNum);
                };
                
                const nextPage = function() {
                    if (pageNum >= pdfDoc.numPages) return;
                    pageNum++;
                    queueRenderPage(pageNum);
                };
                
                // Navigation dans le PDF
                document.getElementById('prev-page').addEventListener('click', prevPage);
                document.getElementById('next-page').addEventListener('click', nextPage);
                
                // Rendu initial
                renderPage(pageNum);
            }).catch(function(error) {
                modalContent.innerHTML = `<div class="error-message">Erreur lors du chargement du PDF: ${error.message}</div>`;
            });
        } else {
            modalContent.innerHTML = '<div class="error-message">PDF.js n\'est pas chargé. Impossible d\'afficher le PDF.</div>';
        }
    }
    
    // Fermeture de la modal
    const closeBtn = document.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Fermeture en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Animation des éléments timeline au défilement
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
});
