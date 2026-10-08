/* ============================================
   SCRIPT.JS — Personal Portfolio
   Faul Cahyaditya Wijaya
   Vanilla JavaScript — No frameworks
   ============================================ */

(function () {
    'use strict';

    // ==============================
    // DOM Elements
    // ==============================
    const header    = document.getElementById('site-header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu   = document.getElementById('nav-menu');
    const navLinks  = document.querySelectorAll('.nav-link');
    const sections  = document.querySelectorAll('main > section');


    // ==============================
    // Mobile Navigation Toggle
    // ==============================
    function toggleMenu() {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when a nav link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });


    // ==============================
    // Header Shadow on Scroll
    // ==============================
    function updateHeaderShadow() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }


    // ==============================
    // Active Nav Link on Scroll
    // ==============================
    function updateActiveLink() {
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var top    = section.offsetTop;
            var height = section.offsetHeight;
            var id     = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }


    // ==============================
    // Certificate Image Fallback
    // ==============================
    var certImages = document.querySelectorAll('.certificate-image');

    certImages.forEach(function (img) {
        img.addEventListener('error', function () {
            this.style.display = 'none';

            var placeholder = this.parentElement.querySelector('.certificate-image-placeholder');

            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });
    });


    // ==============================
    // Profile Image Fallback
    // ==============================
    var heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.addEventListener('error', function () {
            // Show a styled placeholder when no profile image exists
            this.style.display = 'none';
            var placeholder = document.createElement('div');
            placeholder.className = 'hero-image-fallback';
            placeholder.textContent = 'FCW';
            placeholder.style.cssText =
                'width: 340px; height: 340px; border-radius: 24px; ' +
                'border: 3px solid #00BCC8; display: flex; align-items: center; ' +
                'justify-content: center; font-size: 4rem; font-weight: 800; ' +
                'color: #00BCC8; background: rgba(0, 188, 200, 0.08); ' +
                'letter-spacing: 4px;';
            this.parentElement.appendChild(placeholder);
        });
    }


    // ==============================
    // Scroll Event Listener (throttled)
    // ==============================
    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateHeaderShadow();
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial calls
    updateHeaderShadow();
    updateActiveLink();

})();
