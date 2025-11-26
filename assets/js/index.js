// Cache for better performance
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function load() {
  const feed = document.getElementById('feed');
  const catEls = Array.from(document.querySelectorAll('#cats, #cats-top')).filter(Boolean);
  
  // Show loading state
  feed.innerHTML = '<div class="loading">Loading posts...</div>';
  
  try {
    const posts = await getPosts();
    feed.innerHTML = ''; // Clear loading

    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    
    posts.forEach(p => {
      const el = document.createElement('article');
      el.className = `post${p.slug === 'about-ganesh' ? ' about-card' : ''}${p.featured ? ' featured' : ''}`;
      const link = `post.html?slug=${encodeURIComponent(p.slug)}`;
      
      el.innerHTML = `
        <div class="meta">
          <img src="assets/profile.jpg" alt="Ganesh Vadlamuri" class="pfp" loading="lazy">
          <strong>Ganesh Vadlamuri</strong>
          <time datetime="${p.date}">${formatDate(p.date)}</time>
          ${p.featured ? '<span class="badge">Featured</span>' : ''}
          <span class="comments">${p.comments ?? 0} Comment${(p.comments||0)===1?'':'s'}</span>
        </div>
        <h2><a href="${link}">${escapeHtml(p.title)}</a></h2>
        <p>${escapeHtml(p.excerpt||'')}</p>
        <a class="btn" href="${link}" aria-label="Read ${p.title}">Continue Reading</a>
      `;
      fragment.appendChild(el);
    });
    
    feed.appendChild(fragment);
    renderCategories(posts, catEls);
    
  } catch(err) {
    feed.innerHTML = '<div class="error">Failed to load posts. <button onclick="load()">Retry</button></div>';
    console.error('Load error:', err);
  }

  updateFooter();
}

function renderCategories(posts, catEls) {
  if (!catEls.length) return;
  
  const categories = [...new Set(posts.flatMap(p => p.categories || []))].sort();
  const fragment = document.createDocumentFragment();
  
  categories.forEach(c => {
    const li = document.createElement('li');
    const href = c.toLowerCase() === 'about' ? 'post.html?slug=about-ganesh' : `#category-${c.toLowerCase()}`;
    li.innerHTML = `<a href="${href}">${escapeHtml(c)}</a>`;
    fragment.appendChild(li.cloneNode(true));
  });
  
  catEls.forEach(el => {
    el.innerHTML = '';
    el.appendChild(fragment.cloneNode(true));
  });
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateFooter() {
  const yearEl = document.getElementById('y');
  const olderEl = document.getElementById('older');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (olderEl) olderEl.href = '#older-posts';
}

document.addEventListener('DOMContentLoaded', load);

// Preload critical resources
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = './data/posts.json';
    document.head.appendChild(link);
  });
}

// Render experience list with better performance
document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('xp-list');
  if (!list) return;
  
  try {
    const items = await getExperience();
    const fragment = document.createDocumentFragment();
    
    items.slice(0, 4).forEach(xp => {
      const range = formatDateRange(xp.start, xp.end);
      const div = document.createElement('div');
      div.className = 'xp-item';
      div.innerHTML = `
        <a href="experience.html" aria-label="${xp.role} at ${xp.company}">
          <div class="xp-role">${escapeHtml(xp.role)}</div>
          <div class="xp-company">${escapeHtml(xp.company)}</div>
        </a>
        <div class="xp-small">${range}</div>
      `;
      fragment.appendChild(div);
    });
    
    list.appendChild(fragment);
  } catch(err) {
    console.error('Experience load error:', err);
    list.innerHTML = '<li class="error">Failed to load experience</li>';
  }
});

function formatDateRange(start, end) {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const startStr = s.toLocaleString(undefined, {month: 'short', year: 'numeric'});
  const endStr = end ? e.toLocaleString(undefined, {month: 'short', year: 'numeric'}) : 'Present';
  return `${startStr} - ${endStr}`;
}

// Render certifications with animation
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('certs');
  if (!el) return;
  
  const certs = [
    'Google Cloud Professional Architect',
    'AWS Solutions Architect Associate', 
    'Certified Kubernetes Administrator',
    'OSCP Security Professional'
  ];
  
  const fragment = document.createDocumentFragment();
  certs.forEach((cert, i) => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = cert;
    span.style.animationDelay = `${i * 0.1}s`;
    fragment.appendChild(span);
  });
  
  el.appendChild(fragment);
});

// Optimized data fetching with caching and retry logic
async function getPosts() {
  const cacheKey = 'posts';
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const res = await fetch('./data/posts.json', {
      cache: 'no-store',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    
    const data = await res.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
    
  } catch(e) {
    if (location.protocol === 'file:') {
      console.warn('Using fallback posts for file:// preview');
      return getFallbackPosts();
    }
    throw new Error(`Failed to load posts: ${e.message}`);
  }
}

function getFallbackPosts() {
  return [
    { slug: "about-ganesh", title: "About Ganesh Vadlamuri", date: "2025-11-10", featured: true, comments: 0, categories: ["Featured", "About"], excerpt: "Senior Software Engineer focused on fraud detection, cloud modernization, and secure systems." },
    { slug: "problems-to-solve", title: "I don't think we will ever run out of problems to solve", date: "2020-05-02", featured: true, comments: 1, categories: ["Featured"], excerpt: "AI and deep learning for payment security." },
    { slug: "ise-award-2017", title: "Winner of 2017 Information Security Executive Award", date: "2017-08-27", categories: ["TechNews"], excerpt: "ISE of the Year 2017 - San Francisco." },
    { slug: "security-shark-tank", title: "Participating in Security Shark Tank with Robert Herjavec", date: "2016-11-17", categories: ["TechNews"], excerpt: "Serving as a 'Shark' during RSA week and vendor pitches." },
    { slug: "global-big-data-2016", title: "Speaking at Global Big Data Conference 2016", date: "2016-11-12", categories: ["TechNews"], excerpt: "Securing Apache Kafka - notes, links, and interview." }
  ];
}

async function getExperience() {
  const cacheKey = 'experience';
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const res = await fetch('./data/experience.json', {
      cache: 'no-store',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
    
  } catch(e) {
    if (location.protocol === 'file:') {
      console.warn('Using fallback experience for file:// preview');
      return [
        { company: 'Wells Fargo', role: 'Senior Software Engineer', start: '2024-12-01', end: null },
        { company: 'Texas State University', role: 'Graduate Assistant', start: '2022-08-01', end: '2024-05-01' }
      ];
    }
    throw new Error(`Failed to load experience: ${e.message}`);
  }
}

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
    }, 0);
  });
}