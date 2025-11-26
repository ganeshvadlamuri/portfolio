// Advanced Search Functionality
class SearchSystem {
  constructor() {
    this.searchData = [];
    this.init();
  }

  init() {
    this.createSearchBar();
    this.loadSearchData();
  }

  createSearchBar() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
      <div class="search-box">
        <input type="text" class="search-input" placeholder="Search projects, skills, posts..." />
        <button class="search-btn">🔍</button>
      </div>
      <div class="search-results"></div>
    `;
    
    document.querySelector('.hero-section').appendChild(searchContainer);
    
    const input = searchContainer.querySelector('.search-input');
    input.addEventListener('input', (e) => this.handleSearch(e.target.value));
  }

  loadSearchData() {
    this.searchData = [
      { type: 'skill', title: 'Penetration Testing', content: 'Ethical hacking, vulnerability assessment, security auditing' },
      { type: 'skill', title: 'Application Security', content: 'SAST, DAST, code review, secure development' },
      { type: 'skill', title: 'Cloud Security', content: 'AWS, Azure, GCP security, infrastructure protection' },
      { type: 'project', title: 'Security Scanner', content: 'Automated vulnerability detection tool' },
      { type: 'project', title: 'Incident Response', content: 'Real-time threat detection and response system' },
      { type: 'certification', title: 'CISSP', content: 'Certified Information Systems Security Professional' },
      { type: 'certification', title: 'CEH', content: 'Certified Ethical Hacker certification' }
    ];
  }

  handleSearch(query) {
    const results = document.querySelector('.search-results');
    
    if (query.length < 2) {
      results.style.display = 'none';
      return;
    }

    const matches = this.searchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    );

    if (matches.length > 0) {
      results.innerHTML = matches.map(match => `
        <div class="search-result-item">
          <div class="result-type">${match.type}</div>
          <div class="result-title">${match.title}</div>
          <div class="result-content">${match.content}</div>
        </div>
      `).join('');
      results.style.display = 'block';
    } else {
      results.innerHTML = '<div class="no-results">No results found</div>';
      results.style.display = 'block';
    }
  }
}

// Search CSS
const style = document.createElement('style');
style.textContent = `
  .search-container {
    position: relative;
    max-width: 500px;
    margin: 0 auto 2rem;
  }
  
  .search-box {
    display: flex;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 25px;
    overflow: hidden;
    backdrop-filter: blur(10px);
  }
  
  .search-input {
    flex: 1;
    padding: 12px 20px;
    background: none;
    border: none;
    color: var(--ink);
    font-size: 14px;
    outline: none;
  }
  
  .search-input::placeholder {
    color: var(--muted);
  }
  
  .search-btn {
    padding: 12px 16px;
    background: var(--accent);
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
  
  .search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(15,21,32,0.95);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    margin-top: 8px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    display: none;
    backdrop-filter: blur(20px);
  }
  
  .search-result-item {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .search-result-item:hover {
    background: rgba(34,197,94,0.1);
  }
  
  .result-type {
    font-size: 11px;
    color: var(--accent);
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .result-title {
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 4px;
  }
  
  .result-content {
    font-size: 12px;
    color: var(--muted);
  }
  
  .no-results {
    padding: 16px;
    text-align: center;
    color: var(--muted);
    font-size: 14px;
  }
`;
document.head.appendChild(style);

// Simple search function
function handleSearch(query) {
  const results = document.getElementById('searchResults');
  const searchData = [
    { type: 'skill', title: 'Penetration Testing', content: 'Ethical hacking, vulnerability assessment' },
    { type: 'skill', title: 'Application Security', content: 'SAST, DAST, code review' },
    { type: 'project', title: 'Security Scanner', content: 'Automated vulnerability detection' },
    { type: 'cert', title: 'CISSP', content: 'Certified Information Systems Security Professional' }
  ];
  
  if (query.length < 2) {
    results.style.display = 'none';
    return;
  }
  
  const matches = searchData.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.content.toLowerCase().includes(query.toLowerCase())
  );
  
  if (matches.length > 0) {
    results.innerHTML = matches.map(match => `
      <div class="search-result-item">
        <div class="result-type">${match.type}</div>
        <div class="result-title">${match.title}</div>
        <div class="result-content">${match.content}</div>
      </div>
    `).join('');
    results.style.display = 'block';
  } else {
    results.innerHTML = '<div class="no-results">No results found</div>';
    results.style.display = 'block';
  }
}