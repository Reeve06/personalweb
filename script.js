/* ============================================
   REEVE PORTFOLIO — Interactive Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {




    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('main-nav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateNav() {
        const scrollY = window.scrollY;

        // Add scrolled class
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Update active link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();


    // ---- Mobile Nav Toggle ----
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('open');
        });

        // Close mobile nav when a link is clicked
        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinksContainer.classList.remove('open');
            });
        });
    }


    // ---- Typewriter Effect ----
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'web applications.',
        'user experiences.',
        'scalable APIs.',
        'clean code.',
        'digital products.',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeWriter() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 300; // Brief pause before next word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter();


    // ---- Scroll Reveal Animations ----
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ---- Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }


    // ---- Testimonials Carousel ----
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('carousel-dots');
    const cards = track.querySelectorAll('.testimonial-card');
    let currentSlide = 0;

    // Create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${index * 100}%)`;

        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + cards.length) % cards.length;
        goToSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % cards.length;
        goToSlide(currentSlide);
    });

    // Auto-play carousel
    let carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % cards.length;
        goToSlide(currentSlide);
    }, 5000);

    // Pause on hover
    const carouselContainer = document.querySelector('.testimonials-carousel');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carouselContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % cards.length;
            goToSlide(currentSlide);
        }, 5000);
    });


    // ---- Contact Form ----
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <span>Message Sent!</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #10b981)';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);
    });


    // ---- Footer Year ----
    document.getElementById('current-year').textContent = new Date().getFullYear();


    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const offset = 80;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    // ---- Skill Tags Hover Ripple ----
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });


    // ---- Tilt Effect on Project Cards ----
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

});
