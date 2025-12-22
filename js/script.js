// =====================
// Mobile Menu Toggle
// =====================

const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

// =====================
// Smooth Scrolling
// =====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================
// Form Submission
// =====================

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
        // You can add your form submission logic here
        // For now, we'll just show a success message
        alert(`Thank you, ${name}! I'll get back to you soon at ${email}`);
        this.reset();
    } else {
        alert('Please fill in all fields');
    }
});

// =====================
// Intersection Observer for Animations
// =====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe timeline items and project cards
const animatableElements = document.querySelectorAll('.timeline-item, .project-card, .skill-tag');
animatableElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// =====================
// Active Navigation Link
// =====================

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// =====================
// Typing Animation for Hero
// =====================

const typingTexts = [
    'Web Developer',
    'Full Stack Engineer',
    'UI/UX Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
const subtitle = document.querySelector('.hero-content .subtitle');

function typeText() {
    if (charIndex < typingTexts[textIndex].length) {
        subtitle.textContent = typingTexts[textIndex].substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(() => {
            charIndex = 0;
            textIndex = (textIndex + 1) % typingTexts.length;
            eraseText();
        }, 2000);
    }
}

function eraseText() {
    if (charIndex < typingTexts[textIndex].length) {
        charIndex++;
        subtitle.textContent = typingTexts[textIndex].substring(0, typingTexts[textIndex].length - charIndex);
        setTimeout(eraseText, 50);
    } else {
        charIndex = 0;
        typeText();
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// =====================
// Scroll to Top Button
// =====================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #0066cc;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 102, 204, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// =====================
// Counter Animation
// =====================

function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// =====================
// Lazy Loading Images
// =====================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// =====================
// Utility Functions
// =====================

// Add active state to nav links based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// =====================
// Page Load Animation
// =====================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Make sure page starts visible
document.body.style.opacity = '1';
