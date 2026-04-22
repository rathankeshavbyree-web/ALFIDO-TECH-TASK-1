// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APP =====
function initializeApp() {
    setupSmoothScrolling();
    setupNavbarScroll();
    setupIntersectionObserver();
    setupSkillsAnimation();
    setupHeroAnimation();
    setupContactForm();
    addDynamicAnimations();
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// ===== NAVBAR BACKGROUND CHANGE =====
function setupNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== INTERSECTION OBSERVER =====
function setupIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it's the skills section, trigger skill animations
                if (entry.target.id === 'skills') {
                    animateSkills();
                }
            }
        });
    }, options);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section-reveal');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== SKILLS ANIMATION =====
function setupSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', progress + '%');
    });
}

function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.classList.add('animated');
        }, index * 200);
    });
}

// ===== HERO ANIMATION =====
function setupHeroAnimation() {
    // Create floating particles effect
    const heroParticles = document.querySelector('.hero-particles');
    
    // Create additional floating particles
    setInterval(() => {
        createFloatingParticle(heroParticles);
    }, 3000);
    
    // Setup scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        width: ${4 + Math.random() * 8}px;
        height: ${4 + Math.random() * 8}px;
        background: rgba(0, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: floatUp 8s linear forwards;
    `;
    
    container.appendChild(particle);
    
    // Remove element after animation
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// ===== ACTIVE NAVIGATION UPDATE =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== MOUSE MOVE PARALLAX EFFECT =====
document.addEventListener('mousemove', function(e) {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        heroBackground.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }
});

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
function setupTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid var(--neon-cyan)';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    }
}

// Initialize typing effect after page load
setTimeout(setupTypingEffect, 1000);

// ===== MOBILE MENU CLOSE ON CLICK =====
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// ===== PRELOAD IMAGES =====
function preloadImages() {
    const profileImage = new Image();
    profileImage.src = 'rathan-keshav.jpg';
}

preloadImages();

// ===== PERFORMANCE OPTIMIZATION =====
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Update any scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', requestTick);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// ===== CONTACT FORM =====
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Create mailto link with form data
            const subject = encodeURIComponent('Contact from Portfolio Website');
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from: ${window.location.href}`
            );
            
            const mailtoLink = `mailto:rathankeshavbyree@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showFormMessage('Opening your email client...', 'success');
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }
}

function showFormMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        padding: 15px;
        margin-top: 20px;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        animation: slideDown 0.3s ease;
        ${type === 'success' 
            ? 'background: rgba(0, 255, 0, 0.1); color: #00ff00; border: 1px solid rgba(0, 255, 0, 0.3);' 
            : 'background: rgba(255, 0, 0, 0.1); color: #ff6b6b; border: 1px solid rgba(255, 0, 0, 0.3);'
        }
    `;
    
    // Add to form
    const contactForm = document.getElementById('contactForm');
    contactForm.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 5000);
}

// ===== ADD CSS ANIMATIONS DYNAMICALLY =====
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) scale(0.3);
                opacity: 0;
            }
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(-20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c BYREE RATHAN KESHAV PORTFOLIO ', 'background: #00ffff; color: #0a2e2e; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Welcome to my portfolio! Built with HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript ', 'background: #008b8b; color: #ffffff; font-size: 12px; padding: 5px;');
