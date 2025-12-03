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
    const a = document.createElement('a');
    a.href = href;
    a.textContent = c;
    a.style.cssText = 'display:flex;align-items:center;gap:8px;padding:12px 16px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);border-radius:8px;text-decoration:none!important;color:var(--ink-soft);font-weight:600;transition:all 0.3s;font-size:14px;position:relative;overflow:hidden;min-height:44px';
    a.innerHTML = `<span style="position:absolute;inset:0;background:linear-gradient(135deg,var(--accent),#16a34a);opacity:0;transition:opacity 0.3s;border-radius:8px"></span><span style="position:relative;z-index:1">${c}</span>`;
    a.onmouseover = function() {
      this.children[0].style.opacity = '1';
      this.children[1].style.color = '#000';
      this.style.transform = 'translateY(-2px)';
      this.style.borderColor = 'var(--accent)';
      this.style.boxShadow = '0 4px 12px rgba(34,197,94,0.3)';
    };
    a.onmouseout = function() {
      this.children[0].style.opacity = '0';
      this.children[1].style.color = 'var(--ink-soft)';
      this.style.transform = 'translateY(0)';
      this.style.borderColor = 'rgba(34,197,94,0.2)';
      this.style.boxShadow = 'none';
    };
    a.onfocus = function() {
      this.style.outline = '2px solid var(--accent)';
      this.style.outlineOffset = '2px';
    };
    a.onblur = function() {
      this.style.outline = 'none';
    };
    li.appendChild(a);
    fragment.appendChild(li);
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
      
      const logos = {
        'Wells Fargo': 'https://logo.clearbit.com/wellsfargo.com',
        'Texas State University': 'https://logo.clearbit.com/txstate.edu',
        'Amazon Web Services': 'https://logo.clearbit.com/aws.amazon.com',
        'KSR Marine Exports': 'https://via.placeholder.com/40/22c55e/000?text=KSR',
        'GNR Health Care': 'https://via.placeholder.com/40/22c55e/000?text=GNR'
      };
      
      div.innerHTML = `
        <img src="${xp.logo || logos[xp.company] || 'https://via.placeholder.com/40'}" alt="${xp.company}" class="xp-logo" onerror="this.style.display='none';this.nextElementSibling.style.display='inline-block'">
        <span class="xp-fallback" style="display:none">${xp.company.charAt(0)}</span>
        <div class="xp-body">
          <div class="xp-role">${escapeHtml(xp.role)}</div>
          <div class="xp-company">${escapeHtml(xp.company)}</div>
          <div class="xp-meta">${range}</div>
        </div>
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
    'Google Cloud Digital Leader',
    'Google Gen AI Certified',
    'AWS Cloud Architecting',
    'HackerRank Python & SQL'
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
      const logos = {
        'Wells Fargo': 'https://logo.clearbit.com/wellsfargo.com',
        'Texas State University': 'https://logo.clearbit.com/txstate.edu',
        'Amazon Web Services': 'https://logo.clearbit.com/aws.amazon.com',
        'KSR Marine Exports': 'https://via.placeholder.com/40/22c55e/000?text=KSR',
        'GNR Health Care': 'https://via.placeholder.com/40/22c55e/000?text=GNR'
      };
      return [
        { company: 'Wells Fargo', role: 'Senior Software Engineer', start: '2024-12-01', end: null, logo: logos['Wells Fargo'] },
        { company: 'Texas State University', role: 'Graduate Software Engineer', start: '2022-08-01', end: '2024-05-01', logo: logos['Texas State University'] },
        { company: 'Amazon Web Services', role: 'Cloud Engineer', start: '2022-03-01', end: '2022-05-01', logo: logos['Amazon Web Services'] },
        { company: 'KSR Marine Exports', role: 'Software Engineer', start: '2021-01-01', end: '2022-02-01', logo: logos['KSR Marine Exports'] },
        { company: 'GNR Health Care', role: 'Software Engineer', start: '2018-08-01', end: '2020-12-01', logo: logos['GNR Health Care'] }
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