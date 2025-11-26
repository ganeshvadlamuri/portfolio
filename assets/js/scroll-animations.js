// Advanced Scroll Animations & Counter Effects
class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.counters = new Map();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.addCounterAnimations();
    this.addParallaxEffects();
    this.addRevealAnimations();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Trigger counter animation
          if (entry.target.hasAttribute('data-counter')) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, { threshold: 0.1 });
  }

  addCounterAnimations() {
    // Add counters to stats
    const statsData = [
      { selector: '.hero-section', text: '5+ Years Experience', count: 5 },
      { selector: '.hero-section', text: '50+ Projects Secured', count: 50 },
      { selector: '.hero-section', text: '99.9% Uptime', count: 99.9 },
      { selector: '.hero-section', text: '24/7 Monitoring', count: 24 }
    ];

    const statsContainer = document.querySelector('.stats-section');
    if (statsContainer) {
      statsContainer.innerHTML = statsData.map((stat, i) => `
        <div class="stat-item" data-counter="${stat.count}">
          <div class="stat-number">${stat.count}</div>
          <div class="stat-label">${stat.text.replace(/\d+[\.\d]*/, '')}</div>
        </div>
      `).join('');

      // Observe stat items
      document.querySelectorAll('.stat-item').forEach(item => {
        this.observer.observe(item);
      });
    }
  }

  animateCounter(element) {
    const target = parseFloat(element.dataset.counter);
    const numberEl = element.querySelector('.stat-number');
    const duration = 2000;
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;
      
      if (target % 1 === 0) {
        numberEl.textContent = Math.floor(current);
      } else {
        numberEl.textContent = current.toFixed(1);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  addParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.card, .project-card');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((element, index) => {
        const rate = scrolled * -0.1 * (index % 3 + 1);
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  addRevealAnimations() {
    // Add reveal animations to various elements
    const revealElements = document.querySelectorAll(`
      .card, .project-card, .nav-bar a, .hero-cta a, 
      .skills-grid > *, .experience-timeline > *
    `);
    
    revealElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = `all 0.6s ease ${index * 0.1}s`;
      
      this.observer.observe(element);
    });
  }
}

// Floating Animation System
class FloatingElements {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    this.addFloatingToCards();
    this.startAnimation();
  }

  addFloatingToCards() {
    const cards = document.querySelectorAll('.card, .fun-fact-item');
    
    cards.forEach((card, index) => {
      this.elements.push({
        element: card,
        baseY: 0,
        amplitude: 10 + (index % 3) * 5,
        frequency: 0.01 + (index % 3) * 0.005,
        phase: index * 0.5
      });
    });
  }

  startAnimation() {
    const animate = (time) => {
      this.elements.forEach(item => {
        const y = Math.sin(time * item.frequency + item.phase) * item.amplitude;
        item.element.style.transform = `translateY(${y}px)`;
      });
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }
}

// Cursor Trail Effect
class CursorTrail {
  constructor() {
    this.trail = [];
    this.maxTrail = 20;
    this.init();
  }

  init() {
    if (window.innerWidth <= 768) return; // Desktop only
    
    document.addEventListener('mousemove', (e) => {
      this.addTrailPoint(e.clientX, e.clientY);
    });
    
    this.animate();
  }

  addTrailPoint(x, y) {
    const point = document.createElement('div');
    point.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, rgba(34,197,94,0.8), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(point);
    this.trail.push({ element: point, life: 1 });
    
    if (this.trail.length > this.maxTrail) {
      const old = this.trail.shift();
      old.element.remove();
    }
  }

  animate() {
    this.trail.forEach((point, index) => {
      point.life -= 0.05;
      point.element.style.opacity = point.life;
      point.element.style.transform = `translate(-50%, -50%) scale(${point.life})`;
      
      if (point.life <= 0) {
        point.element.remove();
        this.trail.splice(index, 1);
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Morphing Skill Bars
class SkillBars {
  constructor() {
    this.skills = [
      { name: 'Penetration Testing', level: 95 },
      { name: 'Application Security', level: 90 },
      { name: 'Cloud Security', level: 85 },
      { name: 'Network Security', level: 88 },
      { name: 'Incident Response', level: 92 },
      { name: 'Security Architecture', level: 87 }
    ];
    this.init();
  }

  init() {
    this.createSkillBars();
  }

  createSkillBars() {
    const container = document.querySelector('.skills-grid');
    if (!container) return;
    
    container.innerHTML = this.skills.map(skill => `
      <div class="skill-item" data-skill="${skill.level}">
        <div class="skill-name">${skill.name}</div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: 0%"></div>
          <div class="skill-percentage">0%</div>
        </div>
      </div>
    `).join('');
    
    // Observe skill items for animation
    document.querySelectorAll('.skill-item').forEach(item => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateSkill(entry.target);
          }
        });
      });
      observer.observe(item);
    });
  }

  animateSkill(element) {
    const level = parseInt(element.dataset.skill);
    const progressBar = element.querySelector('.skill-progress');
    const percentage = element.querySelector('.skill-percentage');
    
    let current = 0;
    const duration = 2000;
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      current = level * progress;
      progressBar.style.width = `${current}%`;
      percentage.textContent = `${Math.floor(current)}%`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// Initialize all scroll animations
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
  new FloatingElements();
  new CursorTrail();
  new SkillBars();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  .stat-item {
    text-align: center;
    padding: 1rem;
    background: rgba(255,255,255,0.05);
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.1);
  }
  
  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: var(--muted);
  }
  
  .skill-item {
    padding: 1rem;
    background: rgba(255,255,255,0.05);
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.1);
  }
  
  .skill-name {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--ink);
  }
  
  .skill-bar {
    position: relative;
    height: 8px;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
    overflow: hidden;
  }
  
  .skill-progress {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), #16a34a);
    border-radius: 4px;
    transition: width 0.1s ease;
  }
  
  .skill-percentage {
    position: absolute;
    right: 0;
    top: -1.5rem;
    font-size: 0.8rem;
    color: var(--accent);
    font-weight: 600;
  }
`;
document.head.appendChild(style);