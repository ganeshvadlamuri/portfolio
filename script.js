// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const menuLinks = mobileMenu.querySelectorAll('a');

mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.add('active'));
closeMenu.addEventListener('click', () => mobileMenu.classList.remove('active'));
menuLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('active')));

// Back to Top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Typing Effect
const roles = ['Senior Software Engineer', 'Full Stack Developer', 'Cloud Architect', 'Microservices Expert'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typing');

function type() {
  const current = roles[roleIndex];
  typingEl.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
  
  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => isDeleting = true, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  
  setTimeout(type, isDeleting ? 50 : 100);
}
type();

// Counter Animation
document.querySelectorAll('[data-count]').forEach(el => {
  const target = +el.dataset.count;
  let count = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    count += increment;
    if (count >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.ceil(count);
    }
  }, 30);
});

document.getElementById('year').textContent = new Date().getFullYear();

// Load Experience with Error Handling
fetch('./data/experience.json')
  .then(r => {
    if (!r.ok) throw new Error('Failed to load experience');
    return r.json();
  })
  .then(data => {
    const container = document.getElementById('exp-container');
    container.innerHTML = '';
    
    // Create timeline
    const timeline = document.createElement('div');
    timeline.className = 'relative space-y-6';
    
    data.forEach((exp, idx) => {
      const isPresent = !exp.end;
      const startDate = new Date(exp.start).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      const endDate = exp.end ? new Date(exp.end).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';
      const duration = exp.end ? 
        Math.round((new Date(exp.end) - new Date(exp.start)) / (1000 * 60 * 60 * 24 * 30)) + ' mos' : 
        'Current';
      
      const div = document.createElement('div');
      div.className = 'relative pb-12 group';
      div.innerHTML = `
        <!-- Content card -->
        <div class="glass rounded-2xl p-8 hover:glow transition-all duration-300 ${isPresent ? 'ring-2 ring-accent' : ''}">
          <div class="flex items-start justify-between mb-4 flex-wrap gap-4">
            <div class="flex-1">
              <h3 class="text-2xl font-bold gradient-rainbow mb-1">${exp.role}</h3>
              <p class="text-lg accent font-semibold">${exp.company}</p>
              <p class="text-sm text-gray-500 mt-1">📍 ${exp.location}</p>
            </div>
            ${isPresent ? '<span class="px-4 py-2 bg-accent text-black font-bold rounded-full text-sm">CURRENT</span>' : ''}
          </div>
          
          <!-- Duration badge -->
          <div class="flex gap-3 mb-4 flex-wrap">
            <span class="px-3 py-1 bg-accent/20 border border-accent rounded-full text-xs font-semibold text-accent">
              📅 ${startDate} → ${endDate}
            </span>
            <span class="px-3 py-1 bg-blue/20 border border-blue-400 rounded-full text-xs font-semibold text-blue-300">
              ⏱️ ${duration}
            </span>
          </div>
          
          <!-- Highlights as bullet points -->
          <ul class="mb-5 space-y-2">
            ${exp.highlights.map(highlight => `
              <li class="flex items-start gap-3 text-gray-300">
                <span class="text-accent font-bold mt-0.5">▸</span>
                <span>${highlight}</span>
              </li>
            `).join('')}
          </ul>
          
          <!-- Tech Stack -->
          <div class="flex flex-wrap gap-2">
            ${exp.technologies.map(tech => `
              <span class="px-2.5 py-1 bg-gradient-to-r from-accent/10 to-blue/10 border border-accent/30 rounded-lg text-xs font-medium text-gray-200 hover:border-accent/50 transition-colors">
                ${tech}
              </span>
            `).join('')}
          </div>
        </div>
      `;
      timeline.appendChild(div);
    });
    
    container.appendChild(timeline);
  })
  .catch(err => {
    document.getElementById('exp-container').innerHTML = '<p class="text-center text-gray-500">Experience data unavailable</p>';
    console.error(err);
  });

// Load Skills with Error Handling
fetch('./data/skills.json')
  .then(r => {
    if (!r.ok) throw new Error('Failed to load skills');
    return r.json();
  })
  .then(data => {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';
    
    // Define colors for each category
    const categoryColors = {
      'Programming Languages': { bg: 'from-pink-500 to-rose-500', text: 'accent-pink' },
      'Cloud Platforms': { bg: 'from-blue-500 to-cyan-500', text: 'accent-blue' },
      'Databases': { bg: 'from-green-500 to-emerald-500', text: 'accent' },
      'DevOps & CI/CD': { bg: 'from-orange-500 to-red-500', text: 'accent-orange' },
      'Frameworks & Tools': { bg: 'from-purple-500 to-indigo-500', text: 'accent-purple' },
      'Data & Analytics': { bg: 'from-yellow-500 to-amber-500', text: 'accent-orange' },
      'AI & Machine Learning': { bg: 'from-violet-500 to-purple-500', text: 'accent-purple' }
    };
    
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
    container.style.gap = '1.5rem';
    
    data.forEach((category) => {
      const colors = categoryColors[category.category] || { bg: 'from-accent to-blue-400', text: 'accent' };
      
      const div = document.createElement('div');
      div.className = 'glass rounded-2xl p-8 hover:glow transition-all duration-300 h-full';
      
      // Category header with gradient
      let header = `
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white font-bold text-lg">
              ${category.category.charAt(0)}
            </div>
            <h3 class="text-xl font-bold ${colors.text}">${category.category}</h3>
          </div>
          <div class="h-1 bg-gradient-to-r ${colors.bg} rounded-full w-full opacity-70"></div>
        </div>
        
        <div class="flex flex-wrap gap-3">
      `;
      
      // Skills as tags
      category.skills.forEach(skill => {
        header += `
          <span class="px-4 py-2 bg-gradient-to-r ${colors.bg} rounded-full text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default">
            ${skill.name}
          </span>
        `;
      });
      
      header += `</div>`;
      div.innerHTML = header;
      container.appendChild(div);
    });
    
    // Add animation keyframe
    if (!document.getElementById('skill-animation')) {
      const style = document.createElement('style');
      style.id = 'skill-animation';
      style.textContent = `
        @keyframes slideIn {
          from { width: 0; opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  })
  .catch(err => {
    document.getElementById('skills-container').innerHTML = '<p class="text-center text-gray-500">Skills data unavailable</p>';
    console.error(err);
  });

// Load Projects with Error Handling
fetch('https://api.github.com/users/ganeshvadlamuri/repos?sort=updated&per_page=6')
  .then(r => {
    if (!r.ok) throw new Error('Failed to load projects');
    return r.json();
  })
  .then(data => {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    const colors = [
      { bg: 'from-blue-500 to-cyan-500', text: 'text-blue-300', border: 'border-blue-400' },
      { bg: 'from-purple-500 to-pink-500', text: 'text-purple-300', border: 'border-purple-400' },
      { bg: 'from-green-500 to-emerald-500', text: 'text-green-300', border: 'border-green-400' },
      { bg: 'from-orange-500 to-red-500', text: 'text-orange-300', border: 'border-orange-400' },
      { bg: 'from-indigo-500 to-violet-500', text: 'text-indigo-300', border: 'border-indigo-400' },
      { bg: 'from-pink-500 to-rose-500', text: 'text-pink-300', border: 'border-pink-400' }
    ];
    
    data.forEach((repo, idx) => {
      const color = colors[idx % colors.length];
      const a = document.createElement('a');
      a.href = repo.html_url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'group';
      a.innerHTML = `
        <div class="glass rounded-2xl p-8 hover:glow transition-all duration-300 h-full relative overflow-hidden">
          <!-- Top gradient border -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color.bg}"></div>
          
          <!-- Header with icon and stats -->
          <div class="flex items-start justify-between mb-6">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br ${color.bg} flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
              📦
            </div>
            <div class="flex gap-3">
              <span class="px-2 py-1 bg-yellow-500/20 border border-yellow-400/50 rounded text-xs font-bold text-yellow-300 flex items-center gap-1">
                ⭐ ${repo.stargazers_count}
              </span>
              <span class="px-2 py-1 bg-purple-500/20 border border-purple-400/50 rounded text-xs font-bold text-purple-300 flex items-center gap-1">
                🔱 ${repo.forks_count}
              </span>
            </div>
          </div>
          
          <!-- Title -->
          <h3 class="text-xl font-bold mb-3 ${color.text} group-hover:scale-105 transition-transform origin-left">${repo.name}</h3>
          
          <!-- Description -->
          <p class="text-sm text-gray-400 mb-6 line-clamp-2">${repo.description || 'No description available'}</p>
          
          <!-- Language tag -->
          ${repo.language ? `<div class="flex gap-2 flex-wrap">
            <span class="px-3 py-1.5 bg-gradient-to-r ${color.bg} rounded-full text-xs font-semibold text-white shadow-lg">
              ${repo.language}
            </span>
          </div>` : ''}
          
          <!-- View button -->
          <div class="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="inline-block px-4 py-2 bg-gradient-to-r ${color.bg} text-white font-bold rounded-lg text-sm">
              View Project →
            </span>
          </div>
        </div>
      `;
      container.appendChild(a);
    });
  })
  .catch(err => {
    document.getElementById('projects-container').innerHTML = '<p class="text-center text-gray-500">Projects data unavailable</p>';
    console.error(err);
  });
