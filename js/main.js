/* ============================================
   Main JavaScript - Portfolio Website
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navbarMenu.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
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
    backToTopBtn.addEventListener('click', function () {
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
    link.addEventListener('click', function (e) {
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
    btn.addEventListener('click', function (e) {
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
    downloadCVBtn.addEventListener('click', function () {
      console.log('CV download initiated');
      // You can add analytics tracking here
    });
  }

  // ============================================
  // Instagram Link Handler
  // ============================================
  const instagramLinks = document.querySelectorAll('.instagram-link');

  instagramLinks.forEach(link => {
    link.addEventListener('click', function () {
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
    form.addEventListener('submit', function (e) {
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

  // ============================================
  // Image/Video Lightbox / Modal
  // ============================================
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById("modalImage");
  const modalVideo = document.getElementById("modalVideo");
  const captionText = document.getElementById("caption");

  // Select both images and videos in portfolio cards
  const galleryItems = document.querySelectorAll('.portfolio-card .card-image');

  // Function to load YouTube Video
  const loadYouTubeVideo = (videoId) => {
    // Clear existing content
    if (modalImg) modalImg.style.display = "none";
    if (modalVideo) {
      modalVideo.style.display = "none";
      modalVideo.src = ""; // Stop previous video
    }

    // Check if iframe exists, if not create it
    let iframe = document.getElementById('modalIframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'modalIframe';
      iframe.className = 'modal-content';
      iframe.style.cssText = "width: 80%; height: 80vh; max-height: 80vh; margin: auto; display: block; border-radius: var(--radius-md); box-shadow: 0 5px 25px rgba(0,0,0,0.5); border: none;";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      // Insert after modalVideo
      if (modalVideo && modalVideo.parentNode) {
        modalVideo.parentNode.insertBefore(iframe, modalVideo.nextSibling);
      } else {
        modal.appendChild(iframe);
      }
    }

    iframe.style.display = "block";
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  // Function to close modal
  const closeModal = function () {
    modal.style.display = "none";
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = "";
    }
    const iframe = document.getElementById('modalIframe');
    if (iframe) {
      iframe.style.display = "none";
      iframe.src = "";
    }
  }

  // Close button
  const closeBtn = document.querySelector('.close');
  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }

  // Close on clicking outside
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  // Specific handler for Video Resume Button (YouTube: h6cEnnvY5cc)
  const videoResumeBtn = document.getElementById('videoResumeBtn');
  if (videoResumeBtn) {
    videoResumeBtn.addEventListener('click', function () {
      modal.style.display = "block";
      loadYouTubeVideo('h6cEnnvY5cc');
      if (captionText) captionText.textContent = "Video Resume";
    });
  }

  // Specific handler for Tutorial Video Button (YouTube: Jw7nXCdDqRY)
  const tutorialVideoBtn = document.getElementById('tutorialVideoBtn');
  if (tutorialVideoBtn) {
    tutorialVideoBtn.addEventListener('click', function () {
      modal.style.display = "block";
      loadYouTubeVideo('Jw7nXCdDqRY');
      if (captionText) captionText.textContent = "Tutorial Video";
    });
  }

  if (modal && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      // Add visual cue
      item.style.cursor = "zoom-in";

      item.addEventListener('click', function (e) {
        // Prevent default
        e.preventDefault();

        const isVideo = this.tagName === 'VIDEO';
        // Check for YouTube data attribute
        const youtubeId = this.getAttribute('data-youtube-id') ||
          (this.closest('.portfolio-card') ? this.closest('.portfolio-card').getAttribute('data-youtube-id') : null);

        modal.style.display = "block";

        if (youtubeId) {
          loadYouTubeVideo(youtubeId);
        } else if (isVideo) {
          // Fallback for local videos if any left
          if (modalImg) modalImg.style.display = "none";
          const iframe = document.getElementById('modalIframe');
          if (iframe) iframe.style.display = "none";

          if (modalVideo) {
            modalVideo.style.display = "block";
            const source = this.querySelector('source');
            if (source) {
              modalVideo.src = source.src;
              modalVideo.play();
            }
          }
        } else {
          // Image
          if (modalVideo) {
            modalVideo.style.display = "none";
            modalVideo.pause();
          }
          const iframe = document.getElementById('modalIframe');
          if (iframe) iframe.style.display = "none";

          if (modalImg) {
            modalImg.style.display = "block";
            modalImg.src = this.src;
          }
        }

        // Use alt text (for img) or title (from card) as caption
        const cardTitle = this.closest('.portfolio-card')?.querySelector('h3')?.textContent;
        if (cardTitle) {
          captionText.textContent = cardTitle;
        } else if (!isVideo && !youtubeId) {
          captionText.textContent = this.alt;
        } else {
          captionText.textContent = "Video Preview";
        }
      });
    });
  }

});
