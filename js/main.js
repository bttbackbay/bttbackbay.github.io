/**
 * BTT Back Bay BJJ - Main JavaScript
 * Handles mobile navigation, smooth scrolling, form submission,
 * scroll effects, schedule tabs, and UX interactions
 */

(function() {
  'use strict';

  // ===== Constants =====
  var SCROLL_THRESHOLD = 50;
  var NAV_OFFSET = 100;
  var OBSERVER_ROOT_MARGIN = '-100px 0px -70% 0px';
  var DAY_NAMES = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // ===== Copyright Year =====
  var yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Mobile Navigation =====
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      var expanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded);
    });

    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function(event) {
      if (!event.target.closest('.nav') && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.nav').offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });

  // ===== Schedule Day Tabs (Mobile) =====
  var scheduleTable = document.querySelector('.schedule-table');
  var scheduleTabs = document.querySelectorAll('.schedule-tab');
  var scheduleCardsContainer = document.querySelector('.schedule-cards');

  function parseScheduleData() {
    if (!scheduleTable) return [];
    var classes = [];
    var rows = scheduleTable.querySelectorAll('tbody tr');

    rows.forEach(function(row) {
      var timeCell = row.querySelector('.time-col');
      if (!timeCell) return;
      var time = timeCell.textContent.trim();
      var cells = row.querySelectorAll('td');

      // cells[0] is time, cells[1..7] are Mon..Sun
      for (var d = 1; d < cells.length; d++) {
        var info = cells[d].querySelector('.class-info');
        if (!info) continue;

        var nameEl = info.querySelector('.class-name');
        var metaEl = info.querySelector('span:last-child');
        var beltDot = info.querySelector('.belt-dot');
        var beltClass = '';
        if (beltDot) {
          beltDot.classList.forEach(function(c) {
            if (c.startsWith('belt-')) beltClass = c;
          });
        }

        classes.push({
          time: time,
          day: d,
          dayName: DAY_NAMES[d],
          name: nameEl ? nameEl.textContent.trim() : '',
          meta: metaEl ? metaEl.textContent.trim() : '',
          beltClass: beltClass
        });
      }
    });

    return classes;
  }

  var allClasses = parseScheduleData();

  function renderScheduleCards(dayFilter) {
    if (!scheduleCardsContainer) return;

    var filtered = dayFilter === 'all'
      ? allClasses
      : allClasses.filter(function(c) { return c.day === parseInt(dayFilter); });

    if (filtered.length === 0) {
      scheduleCardsContainer.innerHTML = '<div class="schedule-card-empty">No classes scheduled for this day.</div>';
      return;
    }

    // Sort by time
    filtered.sort(function(a, b) {
      return parseTime(a.time) - parseTime(b.time);
    });

    var html = filtered.map(function(c) {
      var dayTag = dayFilter === 'all'
        ? '<span class="schedule-card-day">' + c.dayName + '</span>'
        : '';
      return '<div class="schedule-card">' +
        '<div class="schedule-card-time">' + c.time + '</div>' +
        '<div class="schedule-card-info">' +
          '<div class="schedule-card-name">' + c.name + '</div>' +
          '<div class="schedule-card-meta">' +
            (c.beltClass ? '<span class="belt-dot ' + c.beltClass + '"></span>' : '') +
            '<span>' + c.meta + '</span>' +
            dayTag +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    scheduleCardsContainer.innerHTML = html;
  }

  function parseTime(str) {
    var parts = str.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!parts) return 0;
    var h = parseInt(parts[1]);
    var m = parseInt(parts[2]);
    var ampm = parts[3].toUpperCase();
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  }

  // Auto-select today's day on mobile
  function getTodayDayIndex() {
    var jsDay = new Date().getDay(); // 0=Sun, 1=Mon...6=Sat
    if (jsDay === 0) return 7; // our Sun = 7
    return jsDay;
  }

  if (scheduleTabs.length > 0) {
    // Set today's tab as default on mobile
    var todayIdx = getTodayDayIndex();
    var todayTab = document.querySelector('.schedule-tab[data-day="' + todayIdx + '"]');
    if (todayTab && window.innerWidth < 768) {
      scheduleTabs.forEach(function(t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      todayTab.classList.add('active');
      todayTab.setAttribute('aria-selected', 'true');
      renderScheduleCards(String(todayIdx));

      // Scroll tab into view
      todayTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      renderScheduleCards('all');
    }

    scheduleTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        scheduleTabs.forEach(function(t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        renderScheduleCards(this.dataset.day);
      });
    });
  }

  // ===== Form Submission (Netlify Forms) with Inline Validation =====
  var contactForm = document.querySelector('.contact-form');
  var formSuccess = document.querySelector('.form-success');
  var formContainer = document.querySelector('.form-container');

  function validateField(field) {
    var parent = field.closest('.form-field');
    if (!parent) return true;

    var errorEl = parent.querySelector('.field-error');
    var isRequired = field.hasAttribute('required');
    var value = field.value.trim();
    var valid = true;
    var message = '';

    if (isRequired && !value) {
      valid = false;
      message = 'This field is required';
    } else if (field.type === 'email' && value) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        valid = false;
        message = 'Please enter a valid email address';
      }
    } else if (field.type === 'tel' && value) {
      var phoneRegex = /^[\d\s\-().+]{7,}$/;
      if (!phoneRegex.test(value)) {
        valid = false;
        message = 'Please enter a valid phone number';
      }
    } else if (field.tagName === 'SELECT' && isRequired && !value) {
      valid = false;
      message = 'Please select a program';
    }

    if (!valid) {
      parent.classList.add('error');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        parent.appendChild(errorEl);
      }
      errorEl.textContent = message;
    } else {
      parent.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
    }

    return valid;
  }

  if (contactForm) {
    // Real-time validation on blur
    var formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        if (this.value.trim()) {
          validateField(this);
        }
      });
      // Clear error on input
      input.addEventListener('input', function() {
        var parent = this.closest('.form-field');
        if (parent && parent.classList.contains('error')) {
          validateField(this);
        }
      });
    });

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var submitButton = contactForm.querySelector('button[type="submit"]');
      var originalButtonText = submitButton.textContent;

      // Honeypot check
      var honeypot = contactForm.querySelector('input[name="bot-field"]');
      if (honeypot && honeypot.value) {
        if (formContainer) formContainer.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('active');
        return;
      }

      // Validate all required fields
      var allValid = true;
      var requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(function(field) {
        if (!validateField(field)) {
          allValid = false;
        }
      });

      if (!allValid) {
        // Focus the first error field
        var firstError = contactForm.querySelector('.form-field.error input, .form-field.error select, .form-field.error textarea');
        if (firstError) firstError.focus();
        return;
      }

      submitButton.disabled = true;
      submitButton.classList.add('loading');
      submitButton.textContent = 'Sending...';

      var formData = new FormData(contactForm);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(function(response) {
        if (response.ok) {
          if (formContainer) formContainer.style.display = 'none';
          if (formSuccess) formSuccess.classList.add('active');
        } else {
          throw new Error('submission_failed');
        }
      })
      .catch(function(error) {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.textContent = originalButtonText;
        alert('Something went wrong sending your message. Please try again, or contact us directly by phone or email.');
        console.error('Form submission error:', error);
      });
    });
  }

  // ===== Active Nav Link on Scroll =====
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link, .mobile-menu a');

  if (sections.length > 0 && navLinks.length > 0) {
    var observerOptions = {
      rootMargin: OBSERVER_ROOT_MARGIN,
      threshold: 0
    };

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function(section) { observer.observe(section); });
  }

  // ===== Scroll Header Enhancement =====
  var nav = document.querySelector('.nav');
  var scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', function() {
    if (nav) {
      if (window.scrollY > SCROLL_THRESHOLD) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      var sectionEls = document.querySelectorAll('section[id]');
      var currentColor = 'var(--color-nav-bg)';

      sectionEls.forEach(function(section) {
        var sectionTop = section.offsetTop - NAV_OFFSET;
        var sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentColor = section.dataset.navColor || 'var(--color-nav-bg)';
        }
      });

      nav.style.backgroundColor = currentColor;
    }

    // Scroll-to-top button visibility
    if (scrollTopBtn) {
      if (window.scrollY > 600) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  // Scroll-to-top click
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Scroll Reveal =====
  var revealEls = document.querySelectorAll('.section-title, .card, .instructor-card, .why-btt-feature, .why-btt-image, .contact-layout, .schedule-table-container, .schedule-cards');
  revealEls.forEach(function(el) { el.classList.add('reveal'); });

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  revealEls.forEach(function(el, i) {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    revealObserver.observe(el);
  });

  // ===== Skip Link Enhancement =====
  var skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function() {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }

})();
