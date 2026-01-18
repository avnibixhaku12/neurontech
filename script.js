// ===== Neuron Website JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initWaitlistForms();
});

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');

        // Animate hamburger to X
        const spans = menuBtn.querySelectorAll('span');
        if (menuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            const spans = menuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Scroll Animations (Fade In) =====
function initScrollAnimations() {
    // Add fade-in class to elements we want to animate
    const animatedElements = document.querySelectorAll(
        '.about-card, .feature-card, .app-card, .section-header'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    animatedElements.forEach(el => observer.observe(el));
}

// ===== Navbar Background on Scroll =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ===== Waitlist Form Handling =====
function initWaitlistForms() {
    const forms = document.querySelectorAll('.waitlist-form, .waitlist-form-large');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const emailInput = form.querySelector('input[type="email"]');
            const nameInput = form.querySelector('input[type="text"]');

            // Validate email
            if (!isValidEmail(emailInput.value)) {
                showFormError(emailInput, 'Please enter a valid email address');
                return;
            }

            // Show loading state
            submitBtn.textContent = 'Joining...';
            submitBtn.disabled = true;

            // Simulate API call (replace with actual API endpoint)
            try {
                await simulateApiCall({
                    email: emailInput.value,
                    name: nameInput ? nameInput.value : ''
                });

                // Show success message
                showFormSuccess(form);

            } catch (error) {
                // Show error message
                submitBtn.textContent = 'Try Again';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });
}

// ===== Helper Functions =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(input, message) {
    input.style.borderColor = '#ff4757';
    input.style.animation = 'shake 0.5s ease';

    setTimeout(() => {
        input.style.borderColor = '';
        input.style.animation = '';
    }, 2000);
}

function showFormSuccess(form) {
    const formParent = form.parentElement;
    form.style.display = 'none';

    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#51ff81" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h3>You're on the list!</h3>
        <p>We'll notify you when our apps are ready to launch.</p>
    `;

    formParent.appendChild(successMessage);

    // Animate success message
    setTimeout(() => {
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
    }, 100);
}

function simulateApiCall(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                console.log('Waitlist signup:', data);
                resolve({ success: true });
            } else {
                reject(new Error('Network error'));
            }
        }, 1500);
    });
}

// ===== Add shake animation to CSS dynamically =====
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
    }

    .form-success {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// ===== Parallax Effect for Hero (Optional Enhancement) =====
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ===== Typing Effect for Hero Title (Optional) =====
function initTypingEffect() {
    const highlight = document.querySelector('.hero-title .highlight');
    if (!highlight) return;

    const text = highlight.textContent;
    highlight.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            highlight.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===== Intersection Observer for Counter Animation (Future Use) =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ===== Console Easter Egg =====
console.log(`
%c  _   _
%c | \\ | | ___ _   _ _ __ ___  _ __
%c |  \\| |/ _ \\ | | | '__/ _ \\| '_ \\
%c | |\\  |  __/ |_| | | | (_) | | | |
%c |_| \\_|\\___|\\__,_|_|  \\___/|_| |_|
%c
%c Building AI-powered apps for a smarter world.
%c Want to join us? Visit neuron.com/careers
`,
'color: #0f84ff; font-weight: bold;',
'color: #0f84ff; font-weight: bold;',
'color: #0f84ff; font-weight: bold;',
'color: #0f84ff; font-weight: bold;',
'color: #0f84ff; font-weight: bold;',
'color: #51ff81;',
'color: #51ff81;',
'color: #888;'
);
