// Dark/Light Mode Toggle
class ThemeToggle {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.createToggle();
    this.applyTheme(this.currentTheme);
  }

  createToggle() {
    const btn = document.querySelector('.theme-btn');
    if (btn) {
      btn.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }
}

// Global function for HTML onclick
function toggleTheme() {
  const themeToggle = window.themeToggleInstance;
  if (themeToggle) {
    themeToggle.toggleTheme();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
}

// Theme CSS
const style = document.createElement('style');
style.textContent = `
  [data-theme="light"] {
    --bg: #ffffff;
    --ink: #1a1a1a;
    --ink-soft: #4a4a4a;
    --muted: #666666;
    --accent: #22c55e;
  }
  
  .theme-toggle {
    display: flex;
    align-items: center;
  }
  
  .theme-btn {
    background: none;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .theme-btn:hover {
    background: rgba(34,197,94,0.1);
    border-color: var(--accent);
  }
  
  .theme-icon {
    font-size: 18px;
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  window.themeToggleInstance = new ThemeToggle();
});