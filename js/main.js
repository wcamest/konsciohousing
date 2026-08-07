// ================================
// KONSCIO3D HOUSING - JAVASCRIPT
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // MENÚ MÓVIL
    // ================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animación hamburguesa
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ================================
    // NAVBAR AL HACER SCROLL
    // ================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        
        // Ocultar/mostrar navbar al hacer scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        
        // ================================
        // EFECTO PARALLAX EN HERO
        // ================================
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // ================================
    // SMOOTH SCROLL
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ================================
    // ANIMACIONES AL HACER SCROLL
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos con data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // ================================
    // FORMULARIOS - Feedback Visual al Enviar
    // ================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Solo añadir feedback visual, no prevenir envío
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
            }
            // El formulario se enviará al servidor PHP
        });
    });
    
    // ================================
    // SELECTOR DE PERFIL EN ÚNETE
    // ================================
    const profileButtons = document.querySelectorAll('.profile-selector-btn');
    const profileForms = document.querySelectorAll('.profile-form');
    
    profileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const profile = this.dataset.profile;
            
            // Actualizar botones activos
            profileButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar formulario correspondiente
            profileForms.forEach(form => {
                if (form.id === `form-${profile}`) {
                    form.classList.add('active');
                    form.style.display = 'block';
                    
                    // Animación de entrada
                    setTimeout(() => {
                        form.style.opacity = '1';
                        form.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    form.classList.remove('active');
                    form.style.opacity = '0';
                    form.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        form.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Detectar perfil desde URL hash
    const hash = window.location.hash.substring(1);
    if (hash && ['habitante', 'colaborador', 'inversor'].includes(hash)) {
        const targetButton = document.querySelector(`[data-profile="${hash}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
    
    // ================================
    // ESTADÍSTICAS ANIMADAS
    // ================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Animar contadores cuando son visibles
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('[data-target]').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ================================
    // LAZY LOADING DE IMÁGENES
    // ================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ================================
    // BOTÓN VOLVER ARRIBA
    // ================================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollToTopBtn);
    
    // Estilos del botón
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #2ECC71;
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
            z-index: 999;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: #27AE60;
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(46, 204, 113, 0.4);
        }
    `;
    document.head.appendChild(style);
    
    // Mostrar/ocultar botón
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Funcionalidad del botón
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ================================
    // PRELOADER (opcional)
    // ================================
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });
    
    console.log('🏡 Konscio3D Housing - Web cargada correctamente');
});

// ================================
// MANIFIESTO EXPANDIBLE
// ================================
function toggleManifesto() {
    const toggle = document.querySelector('.manifesto-toggle');
    const content = document.getElementById('manifestoContent');
    
    if (toggle && content) {
        toggle.classList.toggle('active');
        content.classList.toggle('active');
    }
}