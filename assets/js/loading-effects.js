// Premium Loading & Page Transition Effects
class LoadingEffects {
  constructor() {
    this.init();
  }

  init() {
    this.createLoadingScreen();
    this.addPageTransitions();
    this.addSkeletonLoaders();
  }

  createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'premium-loader';
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #0f1520, #0b0f16);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
      <div class="loader-content">
        <div class="cyber-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="loading-percentage">0%</div>
        </div>
        <div class="loading-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="loading-text">Initializing</div>
      </div>
    `;
    
    document.body.appendChild(loader);
    
    // Simulate loading
    this.simulateLoading(loader);
  }

  simulateLoading(loader) {
    const percentage = loader.querySelector('.loading-percentage');
    const text = loader.querySelector('.loading-text');
    const messages = ['Initializing', 'Loading Assets', 'Preparing Interface', 'Almost Ready'];
    
    let currentProgress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 10;
      const finalProgress = Math.min(currentProgress, 100);
      
      percentage.textContent = `${Math.floor(finalProgress)}%`;
      
      if (finalProgress >= 25 * (messageIndex + 1) && messageIndex < messages.length - 1) {
        messageIndex++;
        text.textContent = messages[messageIndex];
      }
      
      if (finalProgress >= 100) {
        clearInterval(interval);
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
      }
    }, 50);
  }

  addPageTransitions() {
    // Add smooth transitions between sections
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        
        if (target) {
          this.smoothScrollTo(target);
        }
      });
    });
  }

  smoothScrollTo(target) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }

  easeInOutQuart(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t * t + b;
    t -= 2;
    return -c / 2 * (t * t * t * t - 2) + b;
  }

  addSkeletonLoaders() {
    // Add skeleton loading for dynamic content
    const containers = document.querySelectorAll('#feed, #projects-container');
    
    containers.forEach(container => {
      this.createSkeleton(container);
    });
  }

  createSkeleton(container) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-loader';
    skeleton.innerHTML = `
      <div class="skeleton-item">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-content">
          <div class="skeleton-line skeleton-title"></div>
          <div class="skeleton-line skeleton-text"></div>
          <div class="skeleton-line skeleton-text short"></div>
        </div>
      </div>
    `.repeat(3);
    
    container.appendChild(skeleton);
    
    // Remove skeleton when content loads
    setTimeout(() => {
      skeleton.style.opacity = '0';
      setTimeout(() => skeleton.remove(), 300);
    }, 2000);
  }
}

// Magnetic Button Effects
class MagneticButtons {
  constructor() {
    this.init();
  }

  init() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .btn');
    
    buttons.forEach(button => {
      this.addMagneticEffect(button);
    });
  }

  addMagneticEffect(button) {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  }
}

// 3D Tilt Effects
class TiltEffects {
  constructor() {
    this.init();
  }

  init() {
    const cards = document.querySelectorAll('.card, .project-card, .fun-fact-item');
    
    cards.forEach(card => {
      this.addTiltEffect(card);
    });
  }

  addTiltEffect(element) {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -10;
      const rotateY = (x - centerX) / centerX * 10;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
}

// Initialize loading screen immediately
(function() {
  const loader = document.createElement('div');
  loader.id = 'premium-loader';
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #0f1520, #0b0f16);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  loader.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 3rem; color: #22c55e; font-weight: 700; margin-bottom: 1rem;" id="percent">0%</div>
      <div style="color: #888; font-size: 0.9rem;">Loading...</div>
    </div>
  `;
  
  document.body.appendChild(loader);
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
      }, 200);
    }
    document.getElementById('percent').textContent = Math.floor(progress) + '%';
  }, 100);
})();

document.addEventListener('DOMContentLoaded', () => {
  new MagneticButtons();
  new TiltEffects();
});

// Add CSS for loading effects
const style = document.createElement('style');
style.textContent = `
  .loader-content {
    text-align: center;
  }
  
  .cyber-spinner {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 2rem;
  }
  
  .spinner-ring {
    position: absolute;
    border: 2px solid transparent;
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }
  
  .spinner-ring:nth-child(1) {
    width: 120px;
    height: 120px;
    border-top-color: var(--accent);
    animation-duration: 1.5s;
  }
  
  .spinner-ring:nth-child(2) {
    width: 90px;
    height: 90px;
    top: 15px;
    left: 15px;
    border-right-color: #16a34a;
    animation-duration: 2s;
    animation-direction: reverse;
  }
  
  .spinner-ring:nth-child(3) {
    width: 60px;
    height: 60px;
    top: 30px;
    left: 30px;
    border-bottom-color: #059669;
    animation-duration: 1s;
  }
  
  .loading-percentage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent);
    font-family: 'Courier New', monospace;
  }
  
  .loading-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 1rem;
  }
  
  .loading-dots .dot {
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    animation: dotPulse 1.4s ease-in-out infinite;
  }
  
  .loading-dots .dot:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots .dot:nth-child(3) { animation-delay: 0.4s; }
  .loading-dots .dot:nth-child(4) { animation-delay: 0.6s; }
  .loading-dots .dot:nth-child(5) { animation-delay: 0.8s; }
  
  .loading-text {
    color: var(--muted);
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes dotPulse {
    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
    40% { transform: scale(1.2); opacity: 1; }
  }
  
  .loading-bar {
    width: 300px;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin: 2rem auto;
  }
  
  .loading-progress {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), #16a34a);
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 2px;
  }
  
  .loading-text {
    color: var(--muted);
    font-size: 0.9rem;
    margin-top: 1rem;
  }
  
  .skeleton-loader {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  .skeleton-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
  }
  
  .skeleton-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2), rgba(255,255,255,0.1));
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }
  
  .skeleton-content {
    flex: 1;
  }
  
  .skeleton-line {
    height: 12px;
    background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2), rgba(255,255,255,0.1));
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 6px;
    margin-bottom: 8px;
  }
  
  .skeleton-title {
    width: 70%;
    height: 16px;
  }
  
  .skeleton-text {
    width: 100%;
  }
  
  .skeleton-text.short {
    width: 60%;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
document.head.appendChild(style);