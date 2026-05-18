/**
 * ========================================
 * ITHUB - Main JavaScript File
 * ========================================
 * Optimized and cleaned version
 * Contains only active and necessary code
 */

(function () {
  "use strict";

  // ==================== INITIALIZATION ====================
  document.addEventListener("DOMContentLoaded", function () {
    initNavbar();
    initHeroSlider();
    initStickyHeader();
    initSmoothScroll();
    initServiceItems();
  });

  // ==================== NAVBAR FUNCTIONALITY ====================
  /**
   * Initialize navbar toggle and responsive behavior
   */
  function initNavbar() {
    const navbarCollapse = document.querySelector(".navbar-collapse");

    if (!navbarCollapse) return;

    // Close menu when clicking on regular nav links (not dropdowns)
    const navLinks = navbarCollapse.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (!this.classList.contains("dropdown-toggle")) {
          navbarCollapse.classList.remove("show");
        }
      });
    });

    // Desktop dropdown hover (only for screens >= 992px)
    if (window.innerWidth >= 992) {
      initDropdownHover();
    }
  }

  /**
   * Enable hover for dropdown menus on desktop
   */
  function initDropdownHover() {
    const dropdowns = document.querySelectorAll(".nav-item.dropdown");

    dropdowns.forEach(function (dropdown) {
      dropdown.addEventListener("mouseenter", function () {
        const menu = this.querySelector(".dropdown-menu");
        const toggle = this.querySelector(".dropdown-toggle");

        if (menu && toggle) {
          toggle.classList.add("show");
          menu.classList.add("show");
        }
      });

      dropdown.addEventListener("mouseleave", function () {
        const menu = this.querySelector(".dropdown-menu");
        const toggle = this.querySelector(".dropdown-toggle");

        if (menu && toggle) {
          toggle.classList.remove("show");
          menu.classList.remove("show");
        }
      });
    });
  }

  // ==================== HERO SLIDER ====================
  /**
   * Hero Slider Class - Manages the main hero section slideshow
   */
  class HeroSlider {
    constructor() {
      this.currentSlide = 0;
      this.isAnimating = false;
      this.autoPlayInterval = null;

      // Slide content data
      this.slides = [
        {
          badge: "Unleash Digital Potential",
          title:
            'Delivering Tech<br><span class="title-outline">Solutions </span> <span>For</span><br> Your Startups',
        },
        {
          badge: "Innovation & Growth",
          title:
            'Building Digital<br><span class="title-outline">Products </span> <span>That</span><br> Scale Fast',
        },
        {
          badge: "Transform Your Business",
          title:
            'Creating Smart<br><span class="title-outline">Experiences </span> <span>For</span><br> Modern Users',
        },
      ];

      this.init();
    }

    init() {
      this.cacheElements();
      if (!this.validateElements()) return;

      this.bindEvents();
      this.setActiveSlide(0);
      this.startAutoPlay();
    }

    cacheElements() {
      this.slideElements = document.querySelectorAll(".slide");
      this.navDots = document.querySelectorAll(".nav-dot");
      this.badgeText = document.getElementById("badgeText");
      this.mainTitle = document.getElementById("mainTitle");
    }

    validateElements() {
      return (
        this.slideElements.length > 0 &&
        this.navDots.length > 0 &&
        this.badgeText &&
        this.mainTitle
      );
    }

    bindEvents() {
      // Navigation dots click events
      this.navDots.forEach((dot, index) => {
        dot.addEventListener("click", () => this.changeSlide(index));
      });

      // Pause autoplay when tab is hidden
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          this.stopAutoPlay();
        } else {
          this.startAutoPlay();
        }
      });
    }

    changeSlide(index) {
      if (this.isAnimating || index === this.currentSlide) return;

      this.isAnimating = true;
      this.currentSlide = index;

      this.setActiveSlide(index);
      this.updateContent();

      setTimeout(() => {
        this.isAnimating = false;
      }, 600);

      this.resetAutoPlay();
    }

    setActiveSlide(index) {
      // Update slide backgrounds
      this.slideElements.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });

      // Update navigation dots
      this.navDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    updateContent() {
      const slide = this.slides[this.currentSlide];

      // Remove animation classes
      this.badgeText.parentElement.parentElement.classList.remove("animate-in");
      this.mainTitle.parentElement.classList.remove("animate-in");

      // Update content
      this.badgeText.textContent = slide.badge;
      this.mainTitle.innerHTML = slide.title;

      // Trigger animation
      setTimeout(() => {
        this.badgeText.parentElement.parentElement.classList.add("animate-in");
        this.mainTitle.parentElement.classList.add("animate-in");
      }, 10);
    }

    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.changeSlide((this.currentSlide + 1) % this.slides.length);
      }, 5000);
    }

    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }

    resetAutoPlay() {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  /**
   * Initialize Hero Slider
   */
  function initHeroSlider() {
    new HeroSlider();
  }

  // ==================== STICKY HEADER ====================
  /**
   * Make header sticky on scroll with hide/show top bar
   */
  function initStickyHeader() {
    const headerMain = document.querySelector(".header-main");
    const headerTop = document.querySelector(".header-top");

    if (!headerMain) return;

    const scrollThreshold = 100;

    window.addEventListener("scroll", function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold) {
        headerMain.classList.add("sticky");
        if (headerTop) {
          headerTop.style.display = "none";
        }
      } else {
        headerMain.classList.remove("sticky");
        if (headerTop) {
          headerTop.style.display = "";
        }
      }
    });
  }

  // ==================== SMOOTH SCROLL ====================
  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // Skip if it's just "#" or empty
        if (href === "#" || href === "") return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          // Calculate offset for sticky header
          const header = document.querySelector(".header-main");
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // ==================== SERVICE ITEMS INTERACTION ====================
  /**
   * Interactive service items with image switching
   */
  function initServiceItems() {
    const services = document.querySelectorAll(".service-item");
    const images = document.querySelectorAll(".services-main-img");

    if (!services.length || !images.length) return;

    services.forEach((service) => {
      service.addEventListener("mouseenter", () => {
        const index = Number(service.dataset.image);

        if (!images[index]) return;

        // Remove active class from all
        services.forEach((s) => s.classList.remove("active"));
        images.forEach((img) => img.classList.remove("active"));

        // Add active class to current
        service.classList.add("active");
        images[index].classList.add("active");
      });
    });

    // Prevent anchor jump for service arrows
    const serviceArrows = document.querySelectorAll(".service-arrow");
    serviceArrows.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }

  // ==================== LAZY LOADING ====================
  /**
   * Lazy load images for better performance
   */
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  }

  // ==================== RESIZE HANDLER ====================
  /**
   * Handle window resize events
   */
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const header = document.querySelector(".header-main");
      if (header && header.classList.contains("sticky")) {
        header.style.transition = "none";
        setTimeout(function () {
          header.style.transition = "";
        }, 100);
      }
    }, 250);
  });
})();
