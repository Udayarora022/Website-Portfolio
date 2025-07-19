/*===== MODERN PORTFOLIO MAIN FUNCTIONALITY =====*/

/*===== MENU SHOW & HIDE =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            toggle.classList.toggle('active');
            
            // Add body scroll lock for mobile menu
            if (nav.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
};

// Support both traditional and 3D navigation
showMenu('nav-toggle', 'nav-menu');
showMenu('nav-toggle-3d', 'nav-menu-3d');

/*===== ACTIVE AND REMOVE MENU =====*/
const navLinks = document.querySelectorAll('.nav-link, .nav-link-3d');

function linkAction() {
    // Remove active class from all links
    navLinks.forEach(n => n.classList.remove('active'));
    
    // Add active class to clicked link
    this.classList.add('active');
    
    // Close mobile menu (support both versions)
    const navMenus = ['nav-menu', 'nav-menu-3d'];
    const navToggles = ['nav-toggle', 'nav-toggle-3d'];
    
    navMenus.forEach((menuId, index) => {
        const navMenu = document.getElementById(menuId);
        const navToggle = document.getElementById(navToggles[index]);
        if (navMenu && navToggle) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

navLinks.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        
        // Support both navigation systems
        const sectionsClass = document.querySelector(
            `.nav-menu a[href*=${sectionId}], .nav-menu-3d a[href*=${sectionId}]`
        );

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active');
        } else {
            sectionsClass?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', scrollActive);

/*===== CHANGE BACKGROUND HEADER =====*/ 
const scrollHeader = () => {
    const headers = document.querySelectorAll('#header, .header-modern, .header-3d');
    
    headers.forEach(header => {
        if (header) {
            // When the scroll is greater than 200 viewport height, add the scroll-header class
            if (window.scrollY >= 200) {
                header.classList.add('scrolled', 'scroll-header');
            } else {
                header.classList.remove('scrolled', 'scroll-header');
            }
        }
    });
};

window.addEventListener('scroll', scrollHeader);

/*===== SHOW SCROLL UP =====*/ 
const scrollUp = () => {
    const scrollUpButtons = document.querySelectorAll('#back-to-top, .back-to-top, .back-to-top-3d');
    
    scrollUpButtons.forEach(scrollUp => {
        // When the scroll is higher than 560 viewport height, add the show-scroll class
        if (window.scrollY >= 560) {
            scrollUp.classList.add('show', 'show-scroll');
        } else {
            scrollUp.classList.remove('show', 'show-scroll');
        }
    });
};

window.addEventListener('scroll', scrollUp);

/*===== BACK TO TOP FUNCTIONALITY =====*/
const initBackToTop = () => {
    const backToTopButtons = document.querySelectorAll('#back-to-top, .back-to-top, .back-to-top-3d');
    
    backToTopButtons.forEach(backToTop => {
        if (backToTop) {
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    });
};

// Initialize back to top on DOM load
document.addEventListener('DOMContentLoaded', initBackToTop);

/*===== LOADING SCREEN =====*/
const initLoadingScreen = () => {
    window.addEventListener('load', () => {
        const loadingScreens = document.querySelectorAll('#loading-screen, .loading-screen, .loading-screen-3d');
        
        loadingScreens.forEach(loadingScreen => {
            if (loadingScreen) {
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.visibility = 'hidden';
                    
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 1500);
            }
        });
    });
};

initLoadingScreen();

/*===== SKILLS PROGRESS ANIMATION =====*/
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.progress-bar, .progress-bar-3d');
    const skillCards = document.querySelectorAll('.skill-card, .skill-card-3d');
    
    // Animate progress bars
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const rect = bar.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0 && !bar.classList.contains('animated')) {
            bar.classList.add('animated');
            bar.style.width = progress + '%';
            
            // Animate progress text if exists
            const progressText = bar.parentElement.querySelector('.progress-text, .progress-text-3d');
            if (progressText) {
                animateCounter(progressText, parseInt(progress), 1500);
            }
        }
    });
    
    // Animate skill cards
    skillCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0 && !card.classList.contains('skill-animated')) {
            card.classList.add('skill-animated');
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }
    });
};

// Animate skills on scroll and load
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

/*===== COUNTER ANIMATION =====*/
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start) + '%';
        
        if (start >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        }
    }, 16);
};

/*===== STATS COUNTER ANIMATION =====*/
const animateStatsCounters = () => {
    const counters = document.querySelectorAll('.stat-number, .stat-number-3d');
    
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0 && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            
            const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
            let current = 0;
            const increment = target / 60;
            
            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        }
    });
};

window.addEventListener('scroll', animateStatsCounters);
window.addEventListener('load', animateStatsCounters);

/*===== CONTACT FORM =====*/
const initContactForm = () => {
    const contactForms = document.querySelectorAll('#contact-form, .contact-form, .contact-form-3d');
    
    contactForms.forEach(contactForm => {
        if (contactForm && !contactForm.dataset.initialized) {
            contactForm.dataset.initialized = 'true';
            
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
                // Simple validation
                if (!name || !email || !subject || !message) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn, .btn-submit-3d, .btn-primary');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    showNotification(`Thank you ${name}! Your message has been sent successfully!`, 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    });
};

document.addEventListener('DOMContentLoaded', initContactForm);

/*===== PROJECT FILTER (OPTIONAL) =====*/
const initProjectFilter = () => {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('[data-category], .project-card, .project-card-3d');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter || !category) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', initProjectFilter);

/*===== SMOOTH SCROLL FOR ANCHOR LINKS =====*/
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header-modern, .header-3d')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', initSmoothScroll);

/*===== INTERSECTION OBSERVER FOR ANIMATIONS =====*/
const initIntersectionObserver = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    const sections = document.querySelectorAll('.section, .section-3d');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });

    // Observe cards and elements
    const animatedElements = document.querySelectorAll(`
        .skill-card, .skill-card-3d,
        .project-card, .project-card-3d,
        .contact-card, .contact-card-3d,
        .about-card-3d,
        .expertise-item
    `);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
};

document.addEventListener('DOMContentLoaded', initIntersectionObserver);

/*===== COPY EMAIL TO CLIPBOARD =====*/
const initEmailCopy = () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.getAttribute('href').replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                showNotification(`Email ${email} copied to clipboard!`, 'success');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification(`Email ${email} copied to clipboard!`, 'success');
            });
        });
    });
};

document.addEventListener('DOMContentLoaded', initEmailCopy);

/*===== PARALLAX EFFECT FOR HERO BACKGROUND =====*/
const initParallaxEffect = () => {
    const heroSections = document.querySelectorAll('.hero-section, .hero-section-3d');
    
    if (heroSections.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            heroSections.forEach(heroSection => {
                const parallax = heroSection.querySelector('.hero-background, .hero-background-3d');
                if (parallax) {
                    const speed = scrolled * 0.5;
                    parallax.style.transform = `translateY(${speed}px)`;
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', initParallaxEffect);

/*===== THEME TOGGLE (OPTIONAL) =====*/
const initThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            showNotification(`Switched to ${newTheme} theme`, 'success');
        });
    }
};

document.addEventListener('DOMContentLoaded', initThemeToggle);

/*===== UTILITY FUNCTIONS =====*/
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification, .notification-3d');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="bx ${type === 'success' ? 'bx-check' : type === 'error' ? 'bx-x' : 'bx-info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: auto;">
            <i class="bx bx-x"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(57, 255, 20, 0.1)' : type === 'error' ? 'rgba(255, 107, 53, 0.1)' : 'rgba(0, 245, 255, 0.1)'};
        border: 1px solid ${type === 'success' ? 'var(--neon-green, #39ff14)' : type === 'error' ? 'var(--neon-pink, #ff6b35)' : 'var(--neon-cyan, #00f5ff)'};
        color: var(--text-primary, #ffffff);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        max-width: 400px;
        font-family: var(--font-primary, 'Inter', sans-serif);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

/*===== 3D HOVER EFFECTS =====*/
const init3DHoverEffects = () => {
    // Card hover effects
    const cards = document.querySelectorAll(`
        .skill-card, .skill-card-3d,
        .project-card, .project-card-3d,
        .contact-card, .contact-card-3d
    `);
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll(`
        .btn-primary, .btn-secondary, .btn-3d,
        .btn-primary-3d, .btn-secondary-3d,
        .cta-button, .cta-button-3d
    `);
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
};

document.addEventListener('DOMContentLoaded', init3DHoverEffects);

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debouncing to scroll handlers
const debouncedScrollActive = debounce(scrollActive, 10);
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollUp = debounce(scrollUp, 10);
const debouncedAnimateSkills = debounce(animateSkills, 100);
const debouncedAnimateStatsCounters = debounce(animateStatsCounters, 100);

// Replace original scroll listeners with debounced versions
window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollUp);
window.removeEventListener('scroll', animateSkills);
window.removeEventListener('scroll', animateStatsCounters);

window.addEventListener('scroll', debouncedScrollActive);
window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollUp);
window.addEventListener('scroll', debouncedAnimateSkills);
window.addEventListener('scroll', debouncedAnimateStatsCounters);

/*===== LAZY LOADING IMAGES =====*/
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

document.addEventListener('DOMContentLoaded', initLazyLoading);

/*===== KEYBOARD NAVIGATION =====*/
const initKeyboardNavigation = () => {
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const navMenus = document.querySelectorAll('#nav-menu, #nav-menu-3d');
            const navToggles = document.querySelectorAll('#nav-toggle, #nav-toggle-3d');
            
            navMenus.forEach((menu, index) => {
                if (menu.classList.contains('show')) {
                    menu.classList.remove('show');
                    navToggles[index]?.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Home key to scroll to top
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // End key to scroll to bottom
        if (e.key === 'End' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
};

document.addEventListener('DOMContentLoaded', initKeyboardNavigation);

/*===== ERROR HANDLING =====*/
window.addEventListener('error', (e) => {
    console.warn('Portfolio Error:', e.error);
    // Show user-friendly error message if needed
    if (e.error && e.error.message.includes('critical')) {
        showNotification('Something went wrong. Please refresh the page.', 'error');
    }
});

/*===== RESIZE HANDLER =====*/
const handleResize = debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 968) {
        const navMenus = document.querySelectorAll('#nav-menu, #nav-menu-3d');
        const navToggles = document.querySelectorAll('#nav-toggle, #nav-toggle-3d');
        
        navMenus.forEach((menu, index) => {
            menu.classList.remove('show');
            navToggles[index]?.classList.remove('active');
        });
        
        document.body.style.overflow = 'auto';
    }
    
    // Recalculate animations
    const skillCards = document.querySelectorAll('.skill-card, .skill-card-3d');
    const statCounters = document.querySelectorAll('.stat-number, .stat-number-3d');
    
    skillCards.forEach(card => card.classList.remove('skill-animated'));
    statCounters.forEach(counter => counter.classList.remove('counted'));
}, 250);

window.addEventListener('resize', handleResize);

/*===== ADD NOTIFICATION ANIMATIONS =====*/
const addNotificationStyles = () => {
    if (document.getElementById('notification-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification {
            font-family: var(--font-primary, 'Inter', sans-serif);
            font-weight: 500;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        /* Lazy loading placeholder */
        img.lazy {
            filter: blur(5px);
            transition: filter 0.3s;
        }
        
        img.lazy.loaded {
            filter: blur(0);
        }
    `;
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', addNotificationStyles);

/*===== PORTFOLIO INITIALIZATION =====*/
const initPortfolio = () => {
    console.log('🚀 Portfolio Main Script Loaded Successfully!');
    console.log('💫 All interactive features are now active');
    
    // Initialize all components
    initBackToTop();
    initContactForm();
    initProjectFilter();
    initSmoothScroll();
    initIntersectionObserver();
    initEmailCopy();
    initParallaxEffect();
    initThemeToggle();
    init3DHoverEffects();
    initLazyLoading();
    initKeyboardNavigation();
    addNotificationStyles();
    
    // Mark portfolio as loaded
    document.body.classList.add('portfolio-loaded');
};

// Initialize portfolio when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}

/*===== EXPORT FUNCTIONS FOR EXTERNAL USE =====*/
window.portfolioMain = {
    showMenu,
    linkAction,
    scrollActive,
    scrollHeader,
    scrollUp,
    animateSkills,
    animateStatsCounters,
    showNotification,
    isValidEmail,
    debounce
};

/*===== ANALYTICS TRACKING (OPTIONAL) =====*/
const trackUserInteraction = (action, element) => {
    // Add your analytics tracking code here
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'Portfolio Interaction',
            event_label: element
        });
    }
};

// Track important interactions
document.addEventListener('click', (e) => {
    const element = e.target.closest('a, button');
    if (element) {
        const text = element.textContent.trim() || element.getAttribute('aria-label') || 'Unknown';
        trackUserInteraction('click', text);
    }
});

