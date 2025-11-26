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
      // Fetch all repositories with pagination
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
        .filter(repo => !repo.fork) // Include all non-fork repos
        .map(repo => ({
          name: repo.name,
          description: repo.description || 'No description available',
          url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updated: repo.updated_at
        }))
        .sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sort by most recent
        
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      this.projects = [
        {
          name: 'Security-Scanner',
          description: 'Advanced vulnerability scanner for web applications with automated reporting and comprehensive security analysis',
          url: '#',
          language: 'Python',
          stars: 45,
          forks: 12
        },
        {
          name: 'Cloud-Security-Tools',
          description: 'Collection of cloud security assessment tools for AWS, Azure, and GCP with automated compliance checking',
          url: '#',
          language: 'JavaScript',
          stars: 32,
          forks: 8
        },
        {
          name: 'Penetration-Testing-Framework',
          description: 'Comprehensive penetration testing framework with automated vulnerability detection and reporting',
          url: '#',
          language: 'Python',
          stars: 67,
          forks: 23
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
          <div class="project-icon">${project.name.charAt(0).toUpperCase()}</div>
          <h3 class="project-title">${project.name.replace(/-/g, ' ')}</h3>
        </div>
        <p class="project-description">${project.description}</p>
        <div class="project-stats">
          <div class="project-stat">
            <span>⭐</span>
            <span>${project.stars || 0}</span>
          </div>
          <div class="project-stat">
            <span>🍴</span>
            <span>${project.forks || 0}</span>
          </div>
        </div>
        <div class="project-languages">
          ${project.language ? `<span class="language-tag">${project.language}</span>` : ''}
        </div>
      </div>
    `;
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
      const translateX = -this.currentIndex * 100;
      track.style.transform = `translateX(${translateX}%)`;
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
  
  startAutoRefresh() {
    // Refresh projects every 5 minutes to sync new projects
    this.refreshInterval = setInterval(async () => {
      const oldCount = this.projects.length;
      await this.fetchProjects();
      
      if (this.projects.length !== oldCount) {
        this.renderCarousel();
        this.setupEventListeners();
        console.log('Projects updated: Found new repositories');
      }
    }, 300000); // 5 minutes
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GitHubProjectsCarousel();
});