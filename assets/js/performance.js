// Performance optimizations and resource hints
(function() {
  'use strict';

  // Critical resource preloading
  const preloadResources = [
    { href: './data/posts.json', as: 'fetch', crossorigin: 'anonymous' },
    { href: './data/experience.json', as: 'fetch', crossorigin: 'anonymous' },
    { href: './assets/profile.jpg', as: 'image' }
  ];

  // Preload critical resources
  preloadResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
    document.head.appendChild(link);
  });

  // DNS prefetch for external resources
  const dnsPrefetch = [
    'https://api.github.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  dnsPrefetch.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });

  // Intersection Observer for lazy loading
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    // Observe images with data-src
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    });
  }

  // Connection type optimization
  if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      document.documentElement.classList.add('slow-connection');
    }
  }

  // Memory usage monitoring
  if ('memory' in performance) {
    const checkMemory = () => {
      const memory = performance.memory;
      if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
        console.warn('High memory usage detected');
        // Clear caches if needed
        if (window.cache && typeof window.cache.clear === 'function') {
          window.cache.clear();
        }
      }
    };

    // Check memory every 30 seconds
    setInterval(checkMemory, 30000);
  }

  // Page visibility optimization
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pause animations and timers when page is hidden
      document.documentElement.classList.add('page-hidden');
    } else {
      document.documentElement.classList.remove('page-hidden');
    }
  });

  // Service Worker registration
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration.scope);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    });
  }

  // Critical CSS inlining check
  const criticalCSS = `
    body { font-family: Inter, system-ui, sans-serif; }
    .loading { text-align: center; padding: 2rem; }
  `;

  if (!document.querySelector('style[data-critical]')) {
    const style = document.createElement('style');
    style.setAttribute('data-critical', 'true');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  }

})();