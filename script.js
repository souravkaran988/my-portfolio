/* ================================================
   1. HAMBURGER MENU
================================================ */
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');
const overlay  = document.createElement('div');

overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

if (menuIcon) {
    menuIcon.addEventListener('click', function() {
        menuIcon.classList.toggle('open');
        navbar.classList.toggle('open');
        overlay.classList.toggle('open');
    });
}

overlay.addEventListener('click', function() {
    menuIcon.classList.remove('open');
    navbar.classList.remove('open');
    overlay.classList.remove('open');
});

document.querySelectorAll('.navbar a').forEach(function(link) {
    link.addEventListener('click', function() {
        menuIcon.classList.remove('open');
        navbar.classList.remove('open');
        overlay.classList.remove('open');
    });
});


/* ================================================
   2. SCROLL SECTIONS — ACTIVE LINK + STICKY HEADER
================================================ */
const header = document.querySelector('header');

// Sticky header on scroll
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Active nav link using IntersectionObserver (most reliable)
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('header nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-80px 0px -60% 0px'
});

document.querySelectorAll('section').forEach(sec => {
    navObserver.observe(sec);
});


/* ================================================
   3. TYPED.JS
================================================ */
window.addEventListener('DOMContentLoaded', () => {
    const typedEl = document.querySelector('.multiple-text');
    if (typedEl) {
        new Typed('.multiple-text', {
            strings: ['CS Undergraduate', 'Web Developer', 'Data Analyst Enthusiast', 'Problem Solver'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }
});


/* ================================================
   4. SCROLL REVEAL — Intersection Observer
================================================ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skills')) {
                entry.target.classList.add('in-view');
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach(el => {
    revealObserver.observe(el);
});

document.querySelectorAll('.heading').forEach(el => {
    revealObserver.observe(el);
});

const skillsSection = document.querySelector('.skills');
if (skillsSection) revealObserver.observe(skillsSection);

document.querySelectorAll('.contact-box').forEach(el => {
    revealObserver.observe(el);
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.home .reveal-left, .home .reveal-right').forEach(el => {
            el.classList.add('visible');
        });
    }, 200);
});


/* ================================================
   5. PARTICLE BACKGROUND (Hero Section)
================================================ */
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 60;
    const COLOR = '0, 238, 255';

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x:    Math.random() * canvas.width,
        y:    Math.random() * canvas.height,
        r:    Math.random() * 2 + 0.5,
        dx:   (Math.random() - 0.5) * 0.4,
        dy:   (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2,
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height)  p.dy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + COLOR + ', ' + p.alpha + ')';
            ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(' + COLOR + ', ' + (0.12 * (1 - dist / 120)) + ')';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
})();


/* ================================================
   6. CUSTOM CURSOR (desktop only)
================================================ */
(function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.classList.add('cursor-dot');
    ring.classList.add('cursor-ring');
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
    });

    (function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, .btn, .btn-sm, .hamburger').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width   = '50px';
            ring.style.height  = '50px';
            ring.style.opacity = '1';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width   = '32px';
            ring.style.height  = '32px';
            ring.style.opacity = '0.6';
        });
    });
})();