// Page Transition Effect
(function() {
  'use strict';
  const overlay = document.createElement('div');
  overlay.id = 'page-transition';
  overlay.style.cssText = 'position:fixed;inset:0;background:#0b0f16;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:48px;color:#22c55e;font-weight:700;opacity:0;pointer-events:none;transition:opacity 0.15s';
  document.body.appendChild(overlay);
  
  let counter = 0;
  let interval;
  
  function startTransition() {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
    counter = 0;
    
    interval = setInterval(() => {
      counter += Math.floor(Math.random() * 25) + 15;
      if (counter > 100) counter = 100;
      overlay.textContent = counter + '%';
      
      if (counter >= 100) {
        clearInterval(interval);
      }
    }, 20);
  }
  
  function endTransition() {
    clearInterval(interval);
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  }
  
  // Intercept all internal links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.target === '_blank') return;
    
    e.preventDefault();
    startTransition();
    
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
  
  // End transition on page load
  window.addEventListener('load', () => {
    setTimeout(endTransition, 150);
  });
})();
