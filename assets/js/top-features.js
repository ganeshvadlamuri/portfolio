// Top 5 High-Impact Features

// 1. Typing Animation for Hero Title
class TypingAnimation {
  constructor() {
    this.text = 'Cybersecurity Expert & Security Architect';
    this.element = document.querySelector('.hero-title');
    this.index = 0;
    this.init();
  }

  init() {
    if (!this.element) return;
    this.element.textContent = '';
    this.type();
  }

  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), 50);
    }
  }
}

// 2. Scroll Progress Bar
class ScrollProgress {
  constructor() {
    this.createBar();
    this.updateProgress();
  }

  createBar() {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#22c55e,#16a34a);width:0%;z-index:9999;transition:width 0.1s;';
    document.body.appendChild(bar);
  }

  updateProgress() {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById('scroll-progress').style.width = scrolled + '%';
    });
  }
}

// 3. Copy Email on Click
class CopyEmail {
  constructor() {
    this.setupCopyButtons();
  }

  setupCopyButtons() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      link.style.cursor = 'pointer';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const email = link.href.replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
          this.showNotification('Email copied to clipboard!');
        });
      });
    });
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#22c55e;color:#000;padding:12px 20px;border-radius:8px;font-weight:600;z-index:10000;animation:slideUp 0.3s ease;';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }
}

// 4. Live Visitor Counter
class VisitorCounter {
  constructor() {
    this.count = this.getVisitorCount();
    this.displayCounter();
  }

  getVisitorCount() {
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    return count;
  }

  displayCounter() {
    const counter = document.createElement('div');
    counter.style.cssText = 'position:fixed;bottom:20px;left:20px;background:rgba(15,21,32,0.9);border:1px solid rgba(34,197,94,0.3);padding:10px 16px;border-radius:8px;font-size:12px;color:#22c55e;z-index:1000;backdrop-filter:blur(10px);';
    counter.innerHTML = `👁️ Visitors: <strong>${this.count.toLocaleString()}</strong>`;
    document.body.appendChild(counter);
  }
}

// 5. Back to Top Button
class BackToTop {
  constructor() {
    this.createButton();
    this.setupScroll();
  }

  createButton() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '↑';
    btn.style.cssText = 'position:fixed;bottom:80px;right:20px;width:50px;height:50px;background:linear-gradient(135deg,#22c55e,#16a34a);border:none;border-radius:50%;color:#000;font-size:24px;font-weight:700;cursor:pointer;opacity:0;transition:all 0.3s;z-index:1000;box-shadow:0 4px 15px rgba(34,197,94,0.3);';
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);
  }

  setupScroll() {
    window.addEventListener('scroll', () => {
      const btn = document.getElementById('back-to-top');
      if (window.pageYOffset > 300) {
        btn.style.opacity = '1';
        btn.style.transform = 'scale(1)';
      } else {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.8)';
      }
    });
  }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  new TypingAnimation();
  new ScrollProgress();
  new CopyEmail();
  new VisitorCounter();
  new BackToTop();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  #back-to-top:hover {
    transform: scale(1.1) !important;
    box-shadow: 0 6px 20px rgba(34,197,94,0.4);
  }
  
  .hero-title {
    border-right: 2px solid #22c55e;
    animation: blink 0.7s infinite;
  }
  
  @keyframes blink {
    0%, 50% { border-color: #22c55e; }
    51%, 100% { border-color: transparent; }
  }
`;
document.head.appendChild(style);