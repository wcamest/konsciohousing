// =================================================
// CHATBOT WHATSAPP - FUNCIONALIDAD
// =================================================

(function() {
    'use strict';

    // Configuración
    const CONFIG = {
        whatsappNumber: '34640386181', // WhatsApp: +34 640 38 61 81
        whatsappMessage: 'Hola, me gustaría obtener más información sobre Konscio3D Housing',
        showBadge: true, // Mostrar badge de notificación
        autoOpen: false, // Abrir automáticamente al cargar
        autoOpenDelay: 5000 // Milisegundos antes de auto-abrir
    };

    // FAQs del chatbot
    const FAQS = [
        {
            question: '¿Qué es Konscio3D Housing?',
            answer: 'Es un proyecto que explora nuevas formas de acceso a la vivienda mediante comunidades organizadas que utilizan tecnología 3D y modelos económicos colaborativos.'
        },
        {
            question: '¿Cuánto cuesta una vivienda?',
            answer: 'El objetivo es reducir costos mediante impresión 3D. Estimamos entre 500-700€/m², significativamente menos que la construcción tradicional.'
        },
        {
            question: '¿Cómo puedo participar?',
            answer: 'Puedes unirte como habitante, colaborador o inversor. Visita nuestra página "Únete" o contáctanos directamente por WhatsApp.'
        },
        {
            question: '¿Dónde se construirá el proyecto piloto?',
            answer: 'Estamos en fase de exploración. La ubicación se definirá con la participación de la comunidad que se forme.'
        },
        {
            question: '¿Qué es el cohousing?',
            answer: 'Es un modelo de vivienda colaborativa donde cada persona tiene su hogar privado pero comparte espacios comunes y recursos con la comunidad.'
        }
    ];

    // Crear HTML del chatbot
    function createChatbotHTML() {
        const widget = document.createElement('div');
        widget.className = 'chatbot-widget';
        widget.id = 'chatbotWidget';

        const faqsHTML = FAQS.map((faq, index) => `
            <div class="chatbot-faq-item" data-faq="${index}">
                <div class="chatbot-faq-question">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="chatbot-faq-answer">
                    <div class="chatbot-faq-answer-content">
                        ${faq.answer}
                    </div>
                </div>
            </div>
        `).join('');

        widget.innerHTML = `
            <button class="chatbot-toggle" id="chatbotToggle" aria-label="Abrir chat de ayuda">
                <i class="fab fa-whatsapp"></i>
                ${CONFIG.showBadge ? '<span class="chatbot-badge">!</span>' : ''}
            </button>
            
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    <div class="chatbot-header-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <div class="chatbot-header-text">
                        <h3>¿Necesitas ayuda?</h3>
                        <p>Estamos aquí para ti</p>
                    </div>
                </div>
                
                <div class="chatbot-body">
                    <div class="chatbot-intro">
                        <h4>👋 ¡Hola!</h4>
                        <p>Aquí encontrarás respuestas rápidas. Si necesitas más información, ¡contáctanos por WhatsApp!</p>
                    </div>
                    
                    <div class="chatbot-faqs">
                        ${faqsHTML}
                    </div>
                </div>
                
                <div class="chatbot-footer">
                    <a href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}" 
                       class="chatbot-whatsapp-btn" 
                       target="_blank"
                       rel="noopener noreferrer">
                        <i class="fab fa-whatsapp"></i>
                        Hablar con un humano
                    </a>
                </div>
            </div>
        `;

        return widget;
    }

    // Inicializar chatbot
    function initChatbot() {
        // Crear y añadir widget al DOM
        const widget = createChatbotHTML();
        document.body.appendChild(widget);

        // Elementos
        const toggle = document.getElementById('chatbotToggle');
        const window = document.getElementById('chatbotWindow');
        const faqItems = document.querySelectorAll('.chatbot-faq-item');

        // Toggle chatbot
        toggle.addEventListener('click', function() {
            const isOpen = window.classList.contains('show');
            
            if (isOpen) {
                window.classList.remove('show');
                toggle.classList.remove('open');
            } else {
                window.classList.add('show');
                toggle.classList.add('open');
                
                // Ocultar badge al abrir
                const badge = toggle.querySelector('.chatbot-badge');
                if (badge) {
                    badge.style.display = 'none';
                }
            }
        });

        // Toggle FAQs
        faqItems.forEach(item => {
            const question = item.querySelector('.chatbot-faq-question');
            question.addEventListener('click', function() {
                // Cerrar otros FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle actual
                item.classList.toggle('active');
            });
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function(e) {
            const widget = document.getElementById('chatbotWidget');
            if (!widget.contains(e.target) && window.classList.contains('show')) {
                window.classList.remove('show');
                toggle.classList.remove('open');
            }
        });

        // Auto-abrir si está configurado
        if (CONFIG.autoOpen) {
            setTimeout(() => {
                if (!window.classList.contains('show')) {
                    window.classList.add('show');
                    toggle.classList.add('open');
                }
            }, CONFIG.autoOpenDelay);
        }

        console.log('✅ Chatbot WhatsApp inicializado');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();

// =================================================
// FUNCIONES PÚBLICAS DE CONFIGURACIÓN
// =================================================

// Función para cambiar el número de WhatsApp dinámicamente
function setChatbotWhatsApp(number, message) {
    const btn = document.querySelector('.chatbot-whatsapp-btn');
    if (btn) {
        const encodedMessage = encodeURIComponent(message || 'Hola, me gustaría obtener más información sobre Konscio3D Housing');
        btn.href = `https://wa.me/${number}?text=${encodedMessage}`;
    }
}

// Función para abrir el chatbot programáticamente
function openChatbot() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    if (window && toggle) {
        window.classList.add('show');
        toggle.classList.add('open');
        const badge = toggle.querySelector('.chatbot-badge');
        if (badge) badge.style.display = 'none';
    }
}

// Función para cerrar el chatbot programáticamente
function closeChatbot() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    if (window && toggle) {
        window.classList.remove('show');
        toggle.classList.remove('open');
    }
}
