/* ============================================
   KLINIK PERGIGIAN IMPLEX TAPAH
   Website Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Navbar scroll effect ----
  const navbar = document.querySelector('.navbar');
  const stickyBtn = document.querySelector('.sticky-cta');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Sticky CTA (mobile)
    if (stickyBtn) {
      if (scrollY > 600) {
        stickyBtn.classList.add('visible');
      } else {
        stickyBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();

      const target = document.querySelector(targetId);
      if (target) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }

      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  // ---- Mobile Menu ----
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

  const activateNavLink = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateNavLink, { passive: true });

  // ---- Gallery Lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ---- Counter animation for hero stats ----
  const statNumbers = document.querySelectorAll('.hero-stat-number');

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;

      el.textContent = current.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ---- Service cards stagger animation ----
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        serviceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  serviceCards.forEach(card => {
    card.classList.add('reveal');
    serviceObserver.observe(card);
  });

  // ---- Testimonial cards stagger ----
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150);
        testimonialObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  testimonialCards.forEach(card => {
    card.classList.add('reveal');
    testimonialObserver.observe(card);
  });

  // ---- Why-us cards stagger ----
  const whyCards = document.querySelectorAll('.why-card');
  const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        whyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  whyCards.forEach(card => {
    card.classList.add('reveal');
    whyObserver.observe(card);
  });
});
