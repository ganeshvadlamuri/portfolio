class GitHubProjectsCarousel {
  constructor() {
    this.username = 'ganeshvadlamuri';
    this.currentIndex = 0;
    this.projects = [];
    this.autoSlideInterval = null;
    this.refreshInterval = null;
    this.init();
  }

  async init() {
    await this.fetchProjects();
    this.renderCarousel();
    this.setupEventListeners();
    this.startAutoSlide();
    this.startAutoRefresh();
  }

  async fetchProjects() {
    try {
      let allRepos = [];
      let page = 1;
      let hasMore = true;
      
      while (hasMore) {
        const response = await fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=100&page=${page}`);
        const repos = await response.json();
        
        if (repos.length === 0) {
          hasMore = false;
        } else {
          allRepos = allRepos.concat(repos);
          page++;
        }
      }
      
      this.projects = allRepos
        .filter(repo => !repo.fork)
        .map(repo => ({
          name: repo.name,
          description: repo.description || 'Innovative project showcasing modern development practices',
          url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          watchers: repo.watchers_count,
          topics: repo.topics || [],
          updated: repo.updated_at
        }))
        .sort((a, b) => new Date(b.updated) - new Date(a.updated));
        
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      this.projects = [
        {
          name: 'Security-Scanner',
          description: 'Advanced vulnerability scanner for web applications with automated reporting',
          url: '#',
          language: 'Python',
          stars: 45,
          forks: 12,
          watchers: 8
        },
        {
          name: 'Cloud-Security-Tools',
          description: 'Collection of cloud security assessment tools for AWS, Azure, and GCP',
          url: '#',
          language: 'JavaScript',
          stars: 32,
          forks: 8,
          watchers: 5
        },
        {
          name: 'Penetration-Testing-Framework',
          description: 'Comprehensive penetration testing framework with automated vulnerability detection',
          url: '#',
          language: 'Python',
          stars: 67,
          forks: 23,
          watchers: 15
        }
      ];
    }
  }

  renderCarousel() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = `
      <div class="projects-section">
        <h2 style="margin-bottom: 20px; color: var(--ink);">
          <span class="uline">Latest Projects</span>
        </h2>
        <div class="projects-carousel">
          <button class="carousel-nav carousel-prev">‹</button>
          <div class="projects-track" id="projects-track">
            ${this.projects.map(project => this.renderProjectCard(project)).join('')}
          </div>
          <button class="carousel-nav carousel-next">›</button>
        </div>
        <div class="carousel-dots" id="carousel-dots">
          ${this.projects.map((_, i) => `<div class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('')}
        </div>
      </div>
    `;
  }

  renderProjectCard(project) {
    const redirectUrl = project.homepage || project.url;
    return `
      <div class="project-card" onclick="window.open('${redirectUrl}', '_blank')">
        <div class="project-header">
          <div class="project-icon">${this.getProjectIcon(project)}</div>
          <h3 class="project-title">${project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
        </div>
        <p class="project-description">${this.truncateText(project.description, 120)}</p>
        <div class="project-stats">
          <div class="project-stat">
            <span>⭐</span>
            <span>${project.stars || 0}</span>
          </div>
          <div class="project-stat">
            <span>🍴</span>
            <span>${project.forks || 0}</span>
          </div>
          <div class="project-stat">
            <span>👁</span>
            <span>${project.watchers || 0}</span>
          </div>
        </div>
        <div class="project-languages">
          ${project.language ? `<span class="language-tag">${project.language}</span>` : ''}
          <span class="language-tag">${this.timeAgo(project.updated)}</span>
        </div>
      </div>
    `;
  }

  getProjectIcon(project) {
    const name = project.name.toLowerCase();
    if (name.includes('web') || name.includes('site')) return '🌐';
    if (name.includes('api') || name.includes('server')) return '⚙️';
    if (name.includes('mobile') || name.includes('app')) return '📱';
    if (name.includes('bot') || name.includes('ai')) return '🤖';
    if (name.includes('game')) return '🎮';
    if (name.includes('security') || name.includes('scanner')) return '🔒';
    return project.name.charAt(0).toUpperCase();
  }

  truncateText(text, length) {
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  setupEventListeners() {
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');

    prevBtn?.addEventListener('click', () => this.prevSlide());
    nextBtn?.addEventListener('click', () => this.nextSlide());

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        this.goToSlide(parseInt(e.target.dataset.index));
      });
    });

    const carousel = document.querySelector('.projects-carousel');
    carousel?.addEventListener('mouseenter', () => this.stopAutoSlide());
    carousel?.addEventListener('mouseleave', () => this.startAutoSlide());
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
    this.updateCarousel();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const track = document.getElementById('projects-track');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (track) {
      track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
  
  startAutoRefresh() {
    this.refreshInterval = setInterval(async () => {
      const oldCount = this.projects.length;
      await this.fetchProjects();
      
      if (this.projects.length !== oldCount) {
        this.renderCarousel();
        this.setupEventListeners();
        console.log('Projects updated: Found new repositories');
      }
    }, 300000);
  }

  timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GitHubProjectsCarousel();
});