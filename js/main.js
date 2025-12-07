/* ============================================
   Main JavaScript - Portfolio Website
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navbarMenu.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
  }
  
  // ============================================
  // Navbar Scroll Effect
  // ============================================
  const navbar = document.querySelector('.navbar');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // ============================================
  // Back to Top Button
  // ============================================
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ============================================
  // Set Active Navigation Link
  // ============================================
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  setActiveNavLink();
  
  // ============================================
  // Scroll Reveal Animation
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll('.card, .timeline-item, .contact-card, .glass-card, .feature-card, .portfolio-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
  
  // ============================================
  // Portfolio Card Modal (View Details)
  // ============================================
  const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
  
  viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.portfolio-card');
      const title = card.querySelector('h3')?.textContent || 'Project';
      const description = card.querySelector('p')?.textContent || '';
      
      // Toggle expanded state
      card.classList.toggle('expanded');
      
      // Update button text
      if (card.classList.contains('expanded')) {
        this.textContent = 'Close Details';
      } else {
        this.textContent = 'View Details';
      }
    });
  });
  
  // ============================================
  // Download CV Button Tracking
  // ============================================
  const downloadCVBtn = document.querySelector('.download-cv-btn');
  
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', function() {
      console.log('CV download initiated');
      // You can add analytics tracking here
    });
  }
  
  // ============================================
  // Instagram Link Handler
  // ============================================
  const instagramLinks = document.querySelectorAll('.instagram-link');
  
  instagramLinks.forEach(link => {
    link.addEventListener('click', function() {
      console.log('Instagram link clicked');
      // Opens in new tab by default with target="_blank"
    });
  });
  
  // ============================================
  // Year in Footer (Auto Update)
  // ============================================
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // ============================================
  // Toast/Notification System (for button feedback)
  // ============================================
  function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 30px;
      padding: 1rem 1.5rem;
      background: var(--color-primary);
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: fadeInUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  // Expose toast function globally
  window.showToast = showToast;
  
  // ============================================
  // Form Validation (if any forms exist)
  // ============================================
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (isValid) {
        showToast('Form submitted successfully!', 'success');
        form.reset();
      } else {
        showToast('Please fill in all required fields', 'error');
      }
    });
  });
  
});
