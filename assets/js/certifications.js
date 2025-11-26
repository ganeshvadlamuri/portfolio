// Auto-fetch from Credly profile
let certifications = [];

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
  showLoading();
  
  try {
    certifications = await fetchCredlyBadges();
    updateStats();
  } catch (error) {
    console.error('Failed to load certifications:', error);
    showError();
  }
  
  hideLoading();
  animateStats();
  renderCertifications('all');
  setupFilters();
});

// Fetch from Credly
async function fetchCredlyBadges() {
  const username = 'ganeshvadlamuri';
  
  try {
    // Try direct fetch first
    const response = await fetch(`https://www.credly.com/users/${username}.json`);
    
    if (response.ok) {
      const data = await response.json();
      return transformCredlyData(data.badges || []);
    }
    
    // Fallback: scrape public profile
    const profileResponse = await fetch(`https://www.credly.com/users/${username}`);
    if (profileResponse.ok) {
      const html = await profileResponse.text();
      return parseCredlyHTML(html);
    }
    
    throw new Error('All methods failed');
    
  } catch (error) {
    console.warn('Credly fetch failed:', error);
    return [];
  }
}

// Transform Credly data
function transformCredlyData(badges) {
  return badges.map(badge => ({
    id: badge.id || Math.random().toString(36),
    name: badge.badge_template?.name || 'Unknown Certificate',
    issuer: badge.badge_template?.issuer?.name || 'Unknown Issuer',
    category: categorizeByName(badge.badge_template?.name),
    badge: generateBadgeCode(badge.badge_template?.name),
    description: badge.badge_template?.description || 'Professional certification',
    issued: badge.issued_at,
    expires: badge.expires_at,
    credlyUrl: badge.public_url || `https://www.credly.com/users/ganeshvadlamuri`,
    verifyUrl: badge.public_url || `https://www.credly.com/users/ganeshvadlamuri`,
    skills: extractSkills(badge.badge_template?.name)
  }));
}

// Parse HTML fallback
function parseCredlyHTML(html) {
  // Simple regex to find badge names in HTML
  const badgeMatches = html.match(/data-badge-name="([^"]+)"/g) || [];
  
  return badgeMatches.map((match, index) => {
    const name = match.match(/data-badge-name="([^"]+)"/)[1];
    return {
      id: `badge-${index}`,
      name: name,
      issuer: extractIssuer(name),
      category: categorizeByName(name),
      badge: generateBadgeCode(name),
      description: `Professional certification in ${name}`,
      issued: '2024-01-01',
      expires: null,
      credlyUrl: `https://www.credly.com/users/ganeshvadlamuri`,
      verifyUrl: `https://www.credly.com/users/ganeshvadlamuri`,
      skills: extractSkills(name)
    };
  });
}

// Helper functions
function categorizeByName(name) {
  if (!name) return 'other';
  const n = name.toLowerCase();
  if (n.includes('aws') || n.includes('azure') || n.includes('google') || n.includes('cloud')) return 'cloud';
  if (n.includes('security') || n.includes('cissp') || n.includes('oscp')) return 'security';
  if (n.includes('kubernetes') || n.includes('docker') || n.includes('devops')) return 'devops';
  return 'other';
}

function generateBadgeCode(name) {
  if (!name) return '?';
  const n = name.toLowerCase();
  if (n.includes('aws')) return 'AWS';
  if (n.includes('azure')) return 'AZ';
  if (n.includes('google')) return 'GCP';
  if (n.includes('kubernetes')) return 'K8s';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 4);
}

function extractIssuer(name) {
  if (name.toLowerCase().includes('aws')) return 'Amazon Web Services';
  if (name.toLowerCase().includes('azure')) return 'Microsoft';
  if (name.toLowerCase().includes('google')) return 'Google Cloud';
  return 'Professional Organization';
}

function extractSkills(name) {
  const skills = [];
  if (name?.toLowerCase().includes('aws')) skills.push('AWS', 'Cloud Architecture');
  if (name?.toLowerCase().includes('security')) skills.push('Cybersecurity', 'Risk Management');
  if (name?.toLowerCase().includes('kubernetes')) skills.push('Kubernetes', 'DevOps');
  return skills.length ? skills : ['Professional Skills'];
}

function updateStats() {
  const total = certifications.length;
  const cloud = certifications.filter(c => c.category === 'cloud').length;
  const security = certifications.filter(c => c.category === 'security').length;
  
  document.querySelector('[data-count]').dataset.count = total;
  document.querySelectorAll('[data-count]')[1].dataset.count = cloud;
  document.querySelectorAll('[data-count]')[2].dataset.count = security;
}

function showLoading() {
  document.getElementById('certs-container').innerHTML = '<div style="text-align:center;padding:3rem;color:var(--muted)">Loading certifications from Credly...</div>';
}

function hideLoading() {
  // Loading will be replaced by renderCertifications
}

function showError() {
  document.getElementById('certs-container').innerHTML = '<div style="text-align:center;padding:3rem;color:#ef4444">Failed to load certifications. Please check your Credly profile.</div>';
}

// Animate statistics counters
function animateStats() {
  const counters = document.querySelectorAll('.cert-count');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    let current = 0;
    const increment = target / 30;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 50);
  });
}

// Render certifications
function renderCertifications(filter) {
  const container = document.getElementById('certs-container');
  const filtered = filter === 'all' ? certifications : certifications.filter(cert => cert.category === filter);
  
  container.innerHTML = '';
  
  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--muted)">No certifications found. Make sure your Credly profile is public.</div>';
    return;
  }
  
  filtered.forEach((cert, index) => {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const expiryText = cert.expires ? formatDate(cert.expires) : 'No Expiration';
    
    card.innerHTML = `
      <div class="cert-header">
        <div class="cert-badge">${cert.badge}</div>
        <div class="cert-info">
          <h3>${cert.name}</h3>
          <div class="cert-issuer">${cert.issuer}</div>
        </div>
      </div>
      
      <p class="cert-description">${cert.description}</p>
      
      <div class="cert-meta">
        <div class="cert-meta-item">
          <div class="cert-meta-label">Issued</div>
          <div class="cert-meta-value">${formatDate(cert.issued)}</div>
        </div>
        <div class="cert-meta-item">
          <div class="cert-meta-label">Expires</div>
          <div class="cert-meta-value">${expiryText}</div>
        </div>
      </div>
      
      <div class="cert-skills">
        ${cert.skills.map(skill => `<span class="cert-skill">${skill}</span>`).join('')}
      </div>
      
      <div class="cert-actions">
        <a href="${cert.verifyUrl}" class="cert-verify" target="_blank" rel="noopener">View on Credly</a>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  // Trigger animation
  setTimeout(() => {
    container.querySelectorAll('.cert-card').forEach(card => {
      card.style.animation = 'fadeInUp 0.6s ease-out forwards';
    });
  }, 100);
}

// Setup filter buttons
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      renderCertifications(filter);
    });
  });
}

// Format date helper
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .cert-card { opacity: 0; }
`;
document.head.appendChild(style);