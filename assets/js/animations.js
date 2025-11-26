// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-on-scroll');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.card, .post, .project-card');
  animateElements.forEach((el, index) => {
    el.classList.add(`animate-delay-${Math.min(index % 3 + 1, 3)}`);
    observer.observe(el);
  });
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Smooth Loading States
function showLoadingSkeleton(container) {
  container.innerHTML = `
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text" style="width: 80%"></div>
    <div class="skeleton skeleton-text" style="width: 60%"></div>
  `;
}

// Enhanced Button Interactions
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn, .nav-bar a');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Typing Animation for Taglines
document.addEventListener('DOMContentLoaded', () => {
  const taglines = document.querySelectorAll('.tagline');
  taglines.forEach((tagline, index) => {
    setTimeout(() => {
      tagline.classList.add('typing');
    }, index * 1000);
  });
});

// Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});