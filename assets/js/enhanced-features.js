// Dark/Light Mode Toggle
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.createToggle();
  }

  createToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
    toggle.addEventListener('click', () => this.toggleTheme());
    
    const nav = document.querySelector('.nav-bar ul');
    if (nav) {
      const li = document.createElement('li');
      li.appendChild(toggle);
      nav.appendChild(li);
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
    
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
    }
  }
}

// Skills Animation
function animateSkills() {
  const skills = [
    { name: 'Information Security', level: 95 },
    { name: 'Application Security', level: 90 },
    { name: 'Cloud Security', level: 88 },
    { name: 'Penetration Testing', level: 85 },
    { name: 'Vulnerability Assessment', level: 92 },
    { name: 'Security Architecture', level: 87 }
  ];

  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;

  skillsContainer.innerHTML = skills.map(skill => `
    <div class="skill-item">
      <div class="skill-name">
        <span>${skill.name}</span>
        <span class="skill-level">${skill.level}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress" data-level="${skill.level}"></div>
      </div>
    </div>
  `).join('');

  // Animate progress bars
  setTimeout(() => {
    document.querySelectorAll('.skill-progress').forEach(bar => {
      bar.style.width = bar.dataset.level + '%';
    });
  }, 500);
}

// Stats Counter Animation
function animateStats() {
  const stats = [
    { number: 50, label: 'Security Projects', suffix: '+' },
    { number: 5, label: 'Years Experience', suffix: '+' },
    { number: 15, label: 'Certifications', suffix: '' },
    { number: 99, label: 'Success Rate', suffix: '%' }
  ];

  const statsContainer = document.getElementById('stats-container');
  if (!statsContainer) return;

  statsContainer.innerHTML = stats.map(stat => `
    <div class="stat-item">
      <span class="stat-number" data-target="${stat.number}">${stat.suffix === '%' ? '0' : '0'}${stat.suffix}</span>
      <span class="stat-label">${stat.label}</span>
    </div>
  `).join('');

  // Animate counters
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + suffix;
      }
    }, 30);
  });
}

// Contact Form Enhancement
function enhanceContactForm() {
  const contactCard = document.getElementById('contact');
  if (!contactCard) return;

  const formHTML = `
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border);">
      <h4 style="margin-bottom: 15px; color: var(--accent);">Quick Contact</h4>
      <form id="contact-form" style="display: grid; gap: 12px;">
        <input type="text" placeholder="Your Name" required style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: var(--panel); color: var(--ink);">
        <input type="email" placeholder="Your Email" required style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: var(--panel); color: var(--ink);">
        <textarea placeholder="Your Message" rows="3" required style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: var(--panel); color: var(--ink); resize: vertical;"></textarea>
        <button type="submit" class="btn" style="justify-self: start;">Send Message</button>
      </form>
    </div>
  `;

  contactCard.insertAdjacentHTML('beforeend', formHTML);

  // Form submission
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = 'Sent!';
    btn.style.background = var('--accent');
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      e.target.reset();
    }, 2000);
  });
}

// Search Functionality
function addSearchFeature() {
  const searchHTML = `
    <div class="search-container" style="margin-bottom: 20px;">
      <input type="text" id="search-input" placeholder="Search posts..." style="width: 100%; padding: 10px 15px; border: 1px solid var(--border); border-radius: 25px; background: var(--panel); color: var(--ink);">
    </div>
  `;

  const feed = document.getElementById('feed');
  if (feed) {
    feed.insertAdjacentHTML('beforebegin', searchHTML);

    document.getElementById('search-input').addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const posts = document.querySelectorAll('.post');
      
      posts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const excerpt = post.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query) || excerpt.includes(query)) {
          post.style.display = 'block';
        } else {
          post.style.display = query ? 'none' : 'block';
        }
      });
    });
  }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  animateSkills();
  animateStats();
  enhanceContactForm();
  addSearchFeature();
});

// Performance monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`Page loaded in ${Math.round(loadTime)}ms`);
  
  if (loadTime > 3000) {
    console.warn('Page load time is above 3 seconds. Consider optimization.');
  }
});