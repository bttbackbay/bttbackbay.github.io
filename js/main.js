/**
 * BTT Back Bay BJJ - Main JavaScript
 * Handles mobile navigation, smooth scrolling, and form submission
 */

(function() {
  'use strict';

  // ===== Mobile Navigation =====
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');

      // Accessibility: update aria-expanded
      const expanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.nav') && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Keyboard navigation for hamburger
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Account for sticky nav height
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Set focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });

  // ===== Form Submission (Netlify Forms) =====
  const contactForm = document.querySelector('.contact-form');
  const formSuccess = document.querySelector('.form-success');
  const formContainer = document.querySelector('.form-container');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      // Check honeypot field — if filled, a bot likely submitted the form
      const honeypot = contactForm.querySelector('input[name="bot-field"]');
      if (honeypot && honeypot.value) {
        // Silently pretend success to avoid tipping off bots
        if (formContainer) formContainer.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('active');
        return;
      }

      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      // Submit via Netlify Forms (native HTML submission)
      const formData = new FormData(contactForm);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(response => {
        if (response.ok) {
          // Success: hide form, show success message
          if (formContainer) {
            formContainer.style.display = 'none';
          }
          if (formSuccess) {
            formSuccess.classList.add('active');
            formSuccess.setAttribute('role', 'alert');
          }
        } else {
          throw new Error('submission_failed');
        }
      })
      .catch(error => {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;

        alert('Something went wrong sending your message. Please try again, or contact us directly by phone or email.');

        console.error('Form submission error:', error);
      });
    });
  }

  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu a');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          // Remove active class from all links
          navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // ===== Scroll Header Enhancement =====
  const nav = document.querySelector('.nav');
  let lastScrollY = window.scrollY;

  // Section colors for nav background
  const sectionColors = {
    'home': 'var(--color-deep-blue)',
    'programs': 'var(--color-green-dark)',
    'schedule': 'var(--color-deep-blue)',
    'instructors': 'var(--color-deep-blue)',
    'why-btt': 'var(--color-blue-dark)',
    'contact': 'var(--color-deep-blue)'
  };

  window.addEventListener('scroll', function() {
    if (nav) {
      // Change shadow on scroll
      if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        nav.classList.add('scrolled');
      } else {
        nav.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        nav.classList.remove('scrolled');
      }

      // Change nav color based on current section
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      const color = sectionColors[currentSection] || 'var(--color-deep-blue)';
      nav.style.backgroundColor = color;
    }
    lastScrollY = window.scrollY;
  }, { passive: true });

  // ===== Skip Link Enhancement =====
  const skipLink = document.querySelector('.skip-link');

  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        // Ensure target is focusable
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }

})();
