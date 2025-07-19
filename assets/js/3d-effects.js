// 3D Effects and Interactions

/*===== NAVIGATION FUNCTIONALITY =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            toggle.classList.toggle('active');
        });
    }
};

// Support both nav IDs
showMenu('nav-toggle', 'nav-menu');
showMenu('nav-toggle-3d', 'nav-menu-3d');

/*===== ACTIVE LINK MANAGEMENT =====*/
const navLinks = document.querySelectorAll('.nav-link, .nav-link-3d');

function linkAction() {
    navLinks.forEach(n => n.classList.remove('active'));
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
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        // Support both navigation versions
        const sectionsClass = document.querySelector(`.nav-menu a[href*=${sectionId}], .nav-menu-3d a[href*=${sectionId}]`);

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active');
        } else {
            sectionsClass?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', scrollActive);

/*===== HEADER SCROLL EFFECT =====*/
const scrollHeader = () => {
    const headers = ['header', 'header-3d'];
    
    headers.forEach(headerId => {
        const header = document.getElementById(headerId);
        if (header) {
            if (window.scrollY >= 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
};

window.addEventListener('scroll', scrollHeader);

/*===== LOADING SCREEN =====*/
window.addEventListener('load', () => {
    const loadingScreens = ['loading-screen', 'loading-screen-3d'];
    
    loadingScreens.forEach(screenId => {
        const loadingScreen = document.getElementById(screenId);
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2000);
        }
    });
});

/*===== 3D MOUSE PARALLAX EFFECT =====*/
let mouseParallaxEnabled = true;

document.addEventListener('mousemove', (e) => {
    if (!mouseParallaxEnabled) return;
    
    const shapes = document.querySelectorAll('.shape, .shape-3d');
    const techOrbs = document.querySelectorAll('.floating-icon, .tech-orb');
    const profileCards = document.querySelectorAll('.profile-card-3d');
    
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    
    // Animate geometric shapes with reset
    shapes.forEach((shape, index) => {
        const intensity = (index + 1) * 0.5;
        const xPos = x * intensity * 30;
        const yPos = y * intensity * 30;
        const rotation = (x + y) * intensity * 5;
        
        shape.style.transform = `translate(${xPos}px, ${yPos}px) rotateZ(${rotation}deg)`;
    });
    
    // Animate tech orbs with reset
    techOrbs.forEach((orb, index) => {
        const intensity = (index + 1) * 0.3;
        const xPos = x * intensity * 20;
        const yPos = y * intensity * 20;
        
        orb.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
    
    // Animate profile cards
    profileCards.forEach(profileCard => {
        const rotateX = y * 8;
        const rotateY = x * 8;
        profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

/*===== 3D SCROLL PARALLAX =====*/
let scrollParallaxEnabled = true;

window.addEventListener('scroll', () => {
    if (!scrollParallaxEnabled) return;
    
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape, .shape-3d');
    const heroBackground = document.querySelector('.hero-background, .hero-background-3d');
    
    // Background parallax
    if (heroBackground) {
        const speed = scrolled * 0.3;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
    
    // Shape parallax with performance optimization
    requestAnimationFrame(() => {
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = scrolled * speed;
            const rotation = scrolled * 0.05;
            
            shape.style.transform = `translateY(${yPos}px) rotateZ(${rotation}deg)`;
        });
    });
});

/*===== PARTICLE SYSTEM =====*/
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = window.innerWidth < 768 ? 40 : 80; // Responsive particle count
        this.animationId = null;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Adjust particle count based on screen size
        this.numberOfParticles = window.innerWidth < 768 ? 40 : 80;
    }
    
    init() {
        this.particles = []; // Clear existing particles
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = ['#00f5ff', '#ff6b35', '#b33dff', '#39ff14'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx = -particle.vx;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy = -particle.vy;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
            this.ctx.fill();
            
            // Connect nearby particles
            this.particles.slice(i + 1).forEach(particle2 => {
                const dx = particle.x - particle2.x;
                const dy = particle.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    const opacity = (1 - distance / 120) * 0.3;
                    this.ctx.strokeStyle = particle.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize particle system
let particleSystem = null;
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        particleSystem = new ParticleSystem(canvas);
    }
});

/*===== TECH ORB INTERACTIONS =====*/
const initTechOrbInteractions = () => {
    const techOrbs = document.querySelectorAll('.floating-icon, .tech-orb');
    
    techOrbs.forEach((orb, index) => {
        // Mouse enter effect
        orb.addEventListener('mouseenter', () => {
            const currentTransform = orb.style.transform || '';
            orb.style.transform = currentTransform + ' scale(1.3) translateZ(20px)';
            orb.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 245, 255, 0.6)';
            
            // Add rotation based on index
            const rotation = index * 90;
            orb.style.transform += ` rotateZ(${rotation}deg)`;
        });
        
        // Mouse leave effect
        orb.addEventListener('mouseleave', () => {
            orb.style.transform = '';
            orb.style.boxShadow = '';
        });
        
        // Click effect
        orb.addEventListener('click', () => {
            orb.style.animation = 'none';
            orb.offsetHeight; // Trigger reflow
            orb.style.animation = 'floatOrb 0.5s ease';
        });
        
        // Touch support for mobile
        orb.addEventListener('touchstart', (e) => {
            e.preventDefault();
            orb.dispatchEvent(new Event('mouseenter'));
        });
        
        orb.addEventListener('touchend', (e) => {
            e.preventDefault();
            setTimeout(() => {
                orb.dispatchEvent(new Event('mouseleave'));
            }, 200);
        });
    });
};

// Initialize tech orb interactions
document.addEventListener('DOMContentLoaded', initTechOrbInteractions);

/*===== MAGNETIC BUTTON EFFECT =====*/
const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.btn-3d, .btn-primary, .btn-secondary, .cta-button, .cta-button-3d');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const intensity = 0.1;
            button.style.transform = `translate(${x * intensity}px, ${y * intensity}px) translateZ(5px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
};

// Initialize magnetic buttons
document.addEventListener('DOMContentLoaded', initMagneticButtons);

/*===== SKILL PROGRESS ANIMATION =====*/
const animateSkillBars = () => {
    const skillCards = document.querySelectorAll('.skill-card, .skill-card-3d');
    
    skillCards.forEach(card => {
        const progressBar = card.querySelector('.progress-bar, .progress-bar-3d');
        const progressText = card.querySelector('.progress-text, .progress-text-3d');
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0 && !card.classList.contains('animated')) {
            card.classList.add('animated');
            
            if (progressBar) {
                const progress = progressBar.getAttribute('data-progress');
                
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
                
                // Animate counter
                if (progressText) {
                    let currentProgress = 0;
                    const increment = progress / 60; // 60 frames animation
                    
                    const counter = setInterval(() => {
                        currentProgress += increment;
                        progressText.textContent = Math.floor(currentProgress) + '%';
                        
                        if (currentProgress >= progress) {
                            progressText.textContent = progress + '%';
                            clearInterval(counter);
                        }
                    }, 16);
                }
            }
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

/*===== COUNTER ANIMATION =====*/
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number, .stat-number-3d');
    
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0 && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            
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

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

/*===== SMOOTH SCROLL =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/*===== BACK TO TOP BUTTON =====*/
const initBackToTop = () => {
    const backToTopButtons = document.querySelectorAll('#back-to-top, .back-to-top, .back-to-top-3d');
    
    const toggleBackToTop = () => {
        backToTopButtons.forEach(button => {
            if (window.scrollY > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });
    };

    window.addEventListener('scroll', toggleBackToTop);

    backToTopButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    });
};

// Initialize back to top
document.addEventListener('DOMContentLoaded', initBackToTop);

/*===== INTERSECTION OBSERVER FOR SECTIONS =====*/
const initIntersectionObserver = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('.section, .section-3d');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        sectionObserver.observe(section);
    });
};

// Initialize intersection observer
document.addEventListener('DOMContentLoaded', initIntersectionObserver);

/*===== PROJECT CARD HOVER EFFECTS =====*/
const initProjectCardEffects = () => {
    const projectCards = document.querySelectorAll('.project-card, .project-card-3d');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
            const glow = card.querySelector('.project-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const glow = card.querySelector('.project-glow');
            if (glow) {
                glow.style.opacity = '0.3';
            }
        });
    });
};

// Initialize project card effects
document.addEventListener('DOMContentLoaded', initProjectCardEffects);

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
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = `<span class="txt-cursor">${this.txt}</span><span class="cursor">|</span>`;
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing animation
const initTypingAnimation = () => {
    const typingElements = document.querySelectorAll('#typing-text, .typing-animation, .typing-animation-3d');
    
    typingElements.forEach(element => {
        if (element && !element.dataset.initialized) {
            element.dataset.initialized = 'true';
            const words = [
                'Computer Engineer',
                'Web Developer',
                'Data Analyst', 
                'Problem Solver',
                'Tech Innovator',
                'Full Stack Developer'
            ];
            new TypeWriter(element, words, 2500);
        }
    });
    
    // Add cursor styling
    if (!document.getElementById('typing-cursor-style')) {
        const style = document.createElement('style');
        style.id = 'typing-cursor-style';
        style.textContent = `
            .cursor {
                animation: blink 1s infinite;
                color: var(--neon-cyan, #00f5ff);
                text-shadow: 0 0 5px var(--neon-cyan, #00f5ff);
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
};

// Initialize typing animation
document.addEventListener('DOMContentLoaded', initTypingAnimation);

/*===== PERFORMANCE OPTIMIZATION =====*/
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
const debouncedAnimateSkillBars = debounce(animateSkillBars, 100);
const debouncedAnimateCounters = debounce(animateCounters, 100);

// Replace original scroll listeners with debounced versions
window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', animateSkillBars);
window.removeEventListener('scroll', animateCounters);

window.addEventListener('scroll', debouncedScrollActive);
window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedAnimateSkillBars);
window.addEventListener('scroll', debouncedAnimateCounters);

/*===== REDUCED MOTION SUPPORT =====*/
const checkReducedMotion = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        mouseParallaxEnabled = false;
        scrollParallaxEnabled = false;
        
        // Disable particle system
        if (particleSystem) {
            particleSystem.destroy();
        }
        
        // Remove animations from CSS
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
};

// Check reduced motion on load
document.addEventListener('DOMContentLoaded', checkReducedMotion);

/*===== RESIZE HANDLER =====*/
const handleResize = debounce(() => {
    // Reinitialize particle system if it exists
    if (particleSystem) {
        particleSystem.resize();
        particleSystem.init();
    }
    
    // Trigger skill bars animation again for new viewport
    document.querySelectorAll('.skill-card, .skill-card-3d').forEach(card => {
        card.classList.remove('animated');
    });
    
    // Trigger counter animation again for new viewport
    document.querySelectorAll('.stat-number, .stat-number-3d').forEach(counter => {
        counter.classList.remove('animated');
    });
}, 250);

window.addEventListener('resize', handleResize);

/*===== ERROR HANDLING =====*/
window.addEventListener('error', (e) => {
    console.warn('3D Effects Error:', e.error);
    // Gracefully degrade if 3D effects fail
});

/*===== CLEANUP ON PAGE UNLOAD =====*/
window.addEventListener('beforeunload', () => {
    if (particleSystem) {
        particleSystem.destroy();
    }
});

/*===== CONSOLE LOG =====*/
console.log('🚀 3D Dark Theme Portfolio Effects Loaded Successfully!');

// Export functions for external use if needed
window.portfolioEffects = {
    initTechOrbInteractions,
    initMagneticButtons,
    initBackToTop,
    initIntersectionObserver,
    initProjectCardEffects,
    initTypingAnimation,
    animateSkillBars,
    animateCounters,
    TypeWriter,
    ParticleSystem
};
