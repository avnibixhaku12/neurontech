// Neuron - Minimal JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initWaitlistForm();
});

// Mobile Menu
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.mobile-menu');
    const links = menu.querySelectorAll('a');

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.section h2, .section p.large, .feature, .update');

    elements.forEach(el => el.classList.add('fade-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

// Waitlist Form
function initWaitlistForm() {
    const form = document.getElementById('waitlist-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const input = form.querySelector('input[type="email"]');
        const btn = form.querySelector('button');
        const email = input.value;

        if (!email || !email.includes('@')) return;

        btn.textContent = 'Joining...';
        btn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        form.innerHTML = '<div class="form-success"><p>You\'re on the list. We\'ll be in touch.</p></div>';
    });
}
