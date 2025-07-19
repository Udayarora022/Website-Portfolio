// Dark Theme Advanced Animations

/*===== TYPING ANIMATION =====*/
class TypeWriter {
    constructor(element, words, wait = 2000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
        this.isTyping = false;
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        // Enhanced HTML with neon effect
        this.element.innerHTML = `
            <span class="txt-cursor">${this.txt}</span>
            <span class="cursor">|</span>
        `;
        
        let typeSpeed = 80;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 800;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
    
    // Stop typing animation
    stop() {
        this.isTyping = false;
    }
    
    // Resume typing animation
    resume() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.type();
        }
    }
}

// Initialize typing animation with multiple element support
const initTypingAnimations = () => {
    const typingElements = document.querySelectorAll('#typing-text, .typing-animation, .typing-animation-3d');
    
    typingElements.forEach(element => {
        if (element && !element.dataset.typingInitialized) {
            element.dataset.typingInitialized = 'true';
            const words = [
                'Computer Engineer',
                'Web Developer',
                'Data Analyst', 
                'Problem Solver',
                'Tech Innovator',
                'Full Stack Developer',
                'UI/UX Enthusiast',
                'Code Artisan'
            ];
            new TypeWriter(element, words, 2500);
        }
    });
    
    // Enhanced cursor styling with neon effect
    if (!document.getElementById('typing-cursor-style')) {
        const style = document.createElement('style');
        style.id = 'typing-cursor-style';
        style.textContent = `
            .cursor {
                animation: neonBlink 1.2s infinite;
                color: var(--neon-cyan, #00f5ff);
                text-shadow: 
                    0 0 5px var(--neon-cyan, #00f5ff),
                    0 0 10px var(--neon-cyan, #00f5ff),
                    0 0 15px var(--neon-cyan, #00f5ff);
                font-weight: 300;
            }
            
            .txt-cursor {
                background: linear-gradient(45deg, var(--neon-cyan, #00f5ff), var(--neon-pink, #ff6b35));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
            }
            
            @keyframes neonBlink {
                0%, 45% { 
                    opacity: 1; 
                    text-shadow: 
                        0 0 5px var(--neon-cyan, #00f5ff),
                        0 0 10px var(--neon-cyan, #00f5ff),
                        0 0 15px var(--neon-cyan, #00f5ff);
                }
                50%, 100% { 
                    opacity: 0.3; 
                    text-shadow: 
                        0 0 2px var(--neon-cyan, #00f5ff);
                }
            }
        `;
        document.head.appendChild(style);
    }
};

document.addEventListener('DOMContentLoaded', initTypingAnimations);

/*===== ENHANCED SCROLL REVEAL ANIMATIONS =====*/
const initScrollReveal = () => {
    // Check if ScrollReveal is available
    if (typeof ScrollReveal === 'undefined') {
        console.warn('ScrollReveal not loaded, falling back to intersection observer');
        initFallbackAnimations();
        return;
    }

    ScrollReveal({
        reset: false,
        distance: '80px',
        duration: 1500,
        delay: 200,
        easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        mobile: true,
        cleanup: true
    });

    // Hero animations with enhanced stagger effect
    ScrollReveal().reveal('.greeting, .greeting-neon', {
        delay: 500,
        origin: 'left',
        distance: '100px',
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    });

    ScrollReveal().reveal('.hero-title, .hero-title-3d', {
        delay: 700,
        origin: 'left',
        distance: '100px',
        scale: 0.9
    });

    ScrollReveal().reveal('.hero-description, .hero-description-3d', {
        delay: 900,
        origin: 'left',
        distance: '50px'
    });

    ScrollReveal().reveal('.hero-actions, .hero-actions-3d', {
        delay: 1100,
        origin: 'bottom',
        distance: '50px'
    });

    ScrollReveal().reveal('.hero-stats, .hero-stats-3d', {
        delay: 1300,
        origin: 'bottom',
        distance: '30px'
    });

    ScrollReveal().reveal('.profile-container, .profile-3d-container', {
        delay: 800,
        origin: 'right',
        distance: '100px',
        scale: 0.8,
        rotate: { x: 10, y: 10, z: 0 }
    });

    // Section headers with enhanced effects
    ScrollReveal().reveal('.section-header, .section-header-3d', {
        delay: 300,
        origin: 'top',
        distance: '50px',
        scale: 0.9
    });

    // Skills animation with sequential reveal
    ScrollReveal().reveal('.skills-category, .skills-category-3d', {
        delay: 400,
        origin: 'bottom',
        distance: '80px',
        interval: 300,
        scale: 0.9
    });

    ScrollReveal().reveal('.skill-card, .skill-card-3d', {
        delay: 200,
        origin: 'bottom',
        distance: '50px',
        interval: 100,
        rotate: { x: 5, y: 0, z: 0 }
    });

    // Projects animation with 3D effects
    ScrollReveal().reveal('.project-card, .project-card-3d', {
        delay: 400,
        origin: 'bottom',
        distance: '80px',
        interval: 200,
        scale: 0.9,
        rotate: { x: 5, y: 5, z: 0 }
    });

    // About section with opposing animations
    ScrollReveal().reveal('.about-text, .about-text-3d, .about-card-3d', {
        delay: 400,
        origin: 'left',
        distance: '80px'
    });

    ScrollReveal().reveal('.about-image, .about-visual-3d', {
        delay: 600,
        origin: 'right',
        distance: '80px',
        scale: 0.9
    });

    // Contact section with staggered cards
    ScrollReveal().reveal('.contact-card, .contact-card-3d', {
        delay: 300,
        origin: 'left',
        distance: '60px',
        interval: 200,
        rotate: { x: 5, y: 0, z: 0 }
    });

    ScrollReveal().reveal('.contact-form-container, .contact-form-container-3d', {
        delay: 500,
        origin: 'right',
        distance: '80px',
        scale: 0.95
    });

    // Footer animations
    ScrollReveal().reveal('.footer-content, .footer-content-3d', {
        delay: 200,
        origin: 'bottom',
        distance: '30px'
    });
};

// Fallback animation system for when ScrollReveal is not available
const initFallbackAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(`
        .greeting, .greeting-neon,
        .hero-title, .hero-title-3d,
        .hero-description, .hero-description-3d,
        .hero-actions, .hero-actions-3d,
        .hero-stats, .hero-stats-3d,
        .profile-container, .profile-3d-container,
        .section-header, .section-header-3d,
        .skills-category, .skills-category-3d,
        .skill-card, .skill-card-3d,
        .project-card, .project-card-3d,
        .about-text, .about-text-3d, .about-card-3d,
        .about-image, .about-visual-3d,
        .contact-card, .contact-card-3d,
        .contact-form-container, .contact-form-container-3d
    `);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', initScrollReveal);

/*===== ENHANCED CONTACT FORM HANDLING =====*/
const initContactForm = () => {
    const contactForms = document.querySelectorAll('#contact-form, .contact-form, .contact-form-3d');
    
    contactForms.forEach(contactForm => {
        if (contactForm && !contactForm.dataset.formInitialized) {
            contactForm.dataset.formInitialized = 'true';
            
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('.btn-submit-3d, .submit-btn, .btn-primary');
                const originalText = submitBtn.innerHTML;
                
                // Enhanced loading state with 3D effect
                submitBtn.innerHTML = `
                    <div class="loading-spinner-3d"></div>
                    <span>Sending Message...</span>
                `;
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                
                // Get form data
                const formData = new FormData(contactForm);
                const data = {
                    name: formData.get('name')?.trim(),
                    email: formData.get('email')?.trim(),
                    subject: formData.get('subject')?.trim(),
                    message: formData.get('message')?.trim()
                };
                
                // Enhanced validation
                const validation = validateFormData(data);
                if (!validation.isValid) {
                    showNotification(validation.message, 'error');
                    resetSubmitButton();
                    return;
                }
                
                // Simulate API call with enhanced feedback
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    showNotification(
                        `Thanks ${data.name}! Your message has been sent successfully. I'll get back to you within 24 hours.`,
                        'success'
                    );
                    
                    contactForm.reset();
                    
                    // Enhanced success animation
                    submitBtn.classList.add('success');
                    submitBtn.innerHTML = `
                        <i class="bx bx-check"></i>
                        <span>Message Sent!</span>
                    `;
                    
                    setTimeout(() => {
                        submitBtn.classList.remove('success');
                        resetSubmitButton();
                    }, 3000);
                    
                    // Add confetti effect
                    createConfettiEffect();
                    
                } catch (error) {
                    showNotification('Oops! Something went wrong. Please try again or contact me directly via email.', 'error');
                    resetSubmitButton();
                }
                
                function resetSubmitButton() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading', 'success');
                }
            });
            
            // Real-time validation
            addRealTimeValidation(contactForm);
        }
    });
};

// Enhanced form validation
function validateFormData(data) {
    if (!data.name || data.name.length < 2) {
        return { isValid: false, message: 'Please enter a valid name (at least 2 characters)' };
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    
    if (!data.subject || data.subject.length < 5) {
        return { isValid: false, message: 'Please enter a subject (at least 5 characters)' };
    }
    
    if (!data.message || data.message.length < 10) {
        return { isValid: false, message: 'Please enter a message (at least 10 characters)' };
    }
    
    return { isValid: true };
}

// Real-time form validation
function addRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateInput(input);
            }
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type || input.tagName.toLowerCase();
    
    let isValid = true;
    let message = '';
    
    switch (input.name) {
        case 'name':
            isValid = value.length >= 2;
            message = 'Name must be at least 2 characters';
            break;
        case 'email':
            isValid = isValidEmail(value);
            message = 'Please enter a valid email address';
            break;
        case 'subject':
            isValid = value.length >= 5;
            message = 'Subject must be at least 5 characters';
            break;
        case 'message':
            isValid = value.length >= 10;
            message = 'Message must be at least 10 characters';
            break;
    }
    
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('success');
    } else {
        input.classList.remove('success');
        input.classList.add('error');
    }
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', initContactForm);

/*===== ENHANCED UTILITY FUNCTIONS =====*/
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-3d');
    existingNotifications.forEach(notif => {
        notif.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notif.remove(), 300);
    });
    
    // Create enhanced notification
    const notification = document.createElement('div');
    notification.className = `notification-3d notification-${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="bx ${getNotificationIcon(type)}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${getNotificationTitle(type)}</div>
            <div class="notification-message">${message}</div>
        </div>
        <div class="notification-close" onclick="this.parentElement.remove()">
            <i class="bx bx-x"></i>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Enhanced styles with 3D effects
    const styles = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationBackground(type)};
        border: 1px solid ${getNotificationBorder(type)};
        color: var(--text-primary);
        padding: 1.5rem;
        border-radius: 15px;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(20px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2), 0 0 25px ${getNotificationGlow(type)};
        max-width: 420px;
        min-width: 320px;
        transform-style: preserve-3d;
        transition: transform 0.3s ease;
    `;
    
    notification.style.cssText = styles;
    
    // Add hover effect
    notification.addEventListener('mouseenter', () => {
        notification.style.transform = 'translateZ(10px) scale(1.02)';
    });
    
    notification.addEventListener('mouseleave', () => {
        notification.style.transform = 'translateZ(0) scale(1)';
    });
    
    document.body.appendChild(notification);
    
    // Animate progress bar
    const progressBar = notification.querySelector('.notification-progress');
    if (progressBar) {
        progressBar.style.width = '100%';
        progressBar.style.transition = `width ${duration}ms linear`;
        setTimeout(() => {
            if (progressBar) progressBar.style.width = '0%';
        }, 100);
    }
    
    // Auto remove with enhanced animation
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.4s ease forwards';
            setTimeout(() => notification.remove(), 400);
        }
    }, duration);
    
    return notification;
}

// Helper functions for notifications
function getNotificationIcon(type) {
    const icons = {
        success: 'bx-check-circle',
        error: 'bx-error-circle',
        warning: 'bx-error',
        info: 'bx-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationTitle(type) {
    const titles = {
        success: 'Success!',
        error: 'Error!',
        warning: 'Warning!',
        info: 'Info'
    };
    return titles[type] || titles.info;
}

function getNotificationBackground(type) {
    const backgrounds = {
        success: 'rgba(57, 255, 20, 0.1)',
        error: 'rgba(255, 107, 53, 0.1)',
        warning: 'rgba(255, 255, 0, 0.1)',
        info: 'var(--gradient-glass)'
    };
    return backgrounds[type] || backgrounds.info;
}

function getNotificationBorder(type) {
    const borders = {
        success: 'var(--neon-green)',
        error: 'var(--neon-pink)',
        warning: 'var(--neon-yellow)',
        info: 'var(--neon-cyan)'
    };
    return borders[type] || borders.info;
}

function getNotificationGlow(type) {
    const glows = {
        success: 'rgba(57, 255, 20, 0.2)',
        error: 'rgba(255, 107, 53, 0.2)',
        warning: 'rgba(255, 255, 0, 0.2)',
        info: 'rgba(0, 245, 255, 0.2)'
    };
    return glows[type] || glows.info;
}

// Confetti effect for successful form submission
function createConfettiEffect() {
    const colors = ['#00f5ff', '#ff6b35', '#b33dff', '#39ff14', '#ffff00'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 10001;
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

/*===== ENHANCED EMAIL COPY FUNCTIONALITY =====*/
const initEmailCopyFunctionality = () => {
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = link.getAttribute('href').replace('mailto:', '');
            
            try {
                await navigator.clipboard.writeText(email);
                showNotification(`Email address ${email} copied to clipboard!`, 'success', 3000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    showNotification(`Email address ${email} copied to clipboard!`, 'success', 3000);
                } catch (fallbackErr) {
                    showNotification('Could not copy email. Please select and copy manually.', 'error');
                }
                
                document.body.removeChild(textArea);
            }
        });
        
        // Add tooltip on hover
        link.addEventListener('mouseenter', () => {
            link.title = 'Click to copy email address';
        });
    });
};

document.addEventListener('DOMContentLoaded', initEmailCopyFunctionality);

/*===== ENHANCED PERFORMANCE OPTIMIZATIONS =====*/
// Advanced debounce function with immediate execution option
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for high-frequency events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance monitoring
const performanceMonitor = {
    startTime: performance.now(),
    
    mark(name) {
        performance.mark(name);
    },
    
    measure(name, startMark, endMark) {
        performance.measure(name, startMark, endMark);
    },
    
    getLoadTime() {
        return performance.now() - this.startTime;
    }
};

/*===== ENHANCED STYLES =====*/
const addEnhancedStyles = () => {
    if (document.getElementById('dark-animations-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'dark-animations-styles';
    style.textContent = `
        /* Enhanced Notification Styles */
        @keyframes slideInRight {
            from {
                transform: translateX(100%) rotateY(90deg);
                opacity: 0;
            }
            to {
                transform: translateX(0) rotateY(0deg);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0) rotateY(0deg);
                opacity: 1;
            }
            to {
                transform: translateX(100%) rotateY(90deg);
                opacity: 0;
            }
        }
        
        .notification-3d {
            position: relative;
            overflow: hidden;
        }
        
        .notification-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--gradient-neon);
            color: var(--bg-primary);
            flex-shrink: 0;
            font-size: 1.2rem;
            box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
        }
        
        .notification-content {
            flex: 1;
        }
        
        .notification-title {
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 0.25rem;
            color: var(--text-primary);
        }
        
        .notification-message {
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.4;
        }
        
        .notification-close {
            cursor: pointer;
            opacity: 0.7;
            transition: all 0.3s ease;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 1rem;
        }
        
        .notification-close:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.1);
        }
        
        .notification-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: var(--gradient-neon);
            width: 100%;
            transform-origin: left;
        }
        
        /* Enhanced Loading Spinner */
        .loading-spinner-3d {
            width: 20px;
            height: 20px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin3D 1s linear infinite;
            transform-style: preserve-3d;
        }
        
        @keyframes spin3D {
            from { 
                transform: rotate(0deg) rotateY(0deg); 
            }
            to { 
                transform: rotate(360deg) rotateY(180deg); 
            }
        }
        
        /* Form Validation Styles */
        .form-input-3d.error,
        .form-textarea-3d.error,
        input.error,
        textarea.error {
            border-color: var(--neon-pink);
            box-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
            animation: shake 0.5s ease-in-out;
        }
        
        .form-input-3d.success,
        .form-textarea-3d.success,
        input.success,
        textarea.success {
            border-color: var(--neon-green);
            box-shadow: 0 0 10px rgba(57, 255, 20, 0.3);
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        /* Button States */
        .btn-submit-3d.loading {
            opacity: 0.8;
            transform: scale(0.98);
            pointer-events: none;
        }
        
        .btn-submit-3d.success {
            background: var(--neon-green) !important;
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(57, 255, 20, 0.4);
        }
        
        /* Confetti Animation */
        @keyframes confettiFall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        /* Enhanced Accessibility */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            .notification-3d {
                animation: none !important;
            }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
            .notification-3d {
                border-width: 2px;
                background: #000000;
                color: #ffffff;
            }
        }
    `;
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', addEnhancedStyles);

/*===== INITIALIZATION AND CLEANUP =====*/
// Initialize all dark theme animations
const initDarkAnimations = () => {
    performanceMonitor.mark('dark-animations-start');
    
    // Initialize all components
    initTypingAnimations();
    initScrollReveal();
    initContactForm();
    initEmailCopyFunctionality();
    addEnhancedStyles();
    
    performanceMonitor.mark('dark-animations-end');
    performanceMonitor.measure('dark-animations-duration', 'dark-animations-start', 'dark-animations-end');
    
    console.log('🚀 Dark Theme Animations Loaded Successfully!');
    console.log(`⚡ Load time: ${performanceMonitor.getLoadTime().toFixed(2)}ms`);
};

// Cleanup function for memory management
const cleanupDarkAnimations = () => {
    // Remove event listeners and clear timers
    const notifications = document.querySelectorAll('.notification-3d');
    notifications.forEach(notification => notification.remove());
    
    // Clear performance marks
    performance.clearMarks();
    performance.clearMeasures();
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initDarkAnimations);

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupDarkAnimations);

// Export functions for external use
window.darkAnimations = {
    TypeWriter,
    showNotification,
    initTypingAnimations,
    initContactForm,
    initEmailCopyFunctionality,
    performanceMonitor
};

