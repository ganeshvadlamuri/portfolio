// Matrix Code Rain & Advanced Animations
class MatrixEffects {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.drops = [];
    this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    this.init();
  }

  init() {
    this.createCanvas();
    this.setupDrops();
    this.animate();
    this.addInteractivity();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'matrix-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: -1;
      opacity: 0.1;
    `;
    document.body.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.setupDrops();
  }

  setupDrops() {
    const columns = Math.floor(this.canvas.width / 20);
    this.drops = Array(columns).fill(1);
  }

  animate() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#22c55e';
    this.ctx.font = '15px monospace';
    
    for (let i = 0; i < this.drops.length; i++) {
      const text = this.chars[Math.floor(Math.random() * this.chars.length)];
      this.ctx.fillText(text, i * 20, this.drops[i] * 20);
      
      if (this.drops[i] * 20 > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    
    requestAnimationFrame(() => this.animate());
  }

  addInteractivity() {
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create ripple effect
      this.createRipple(mouseX, mouseY);
    });
  }

  createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(34, 197, 94, 0.6);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 1000;
      animation: ripple 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }
}

// Network Topology Visualization
class NetworkTopology {
  constructor() {
    this.nodes = [];
    this.connections = [];
    this.canvas = null;
    this.ctx = null;
    this.init();
  }

  init() {
    this.createCanvas();
    this.generateNodes();
    this.animate();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'network-canvas';
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    `;
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.style.position = 'relative';
      heroSection.appendChild(this.canvas);
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  generateNodes() {
    const nodeCount = window.innerWidth > 768 ? 15 : 8;
    this.nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 2,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw nodes
    this.nodes.forEach((node, i) => {
      node.x += node.vx;
      node.y += node.vy;
      node.pulse += 0.02;
      
      // Bounce off edges
      if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
      
      // Draw connections
      this.nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.3;
            this.ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(node.x, node.y);
            this.ctx.lineTo(otherNode.x, otherNode.y);
            this.ctx.stroke();
          }
        }
      });
      
      // Draw node
      const pulseSize = node.radius + Math.sin(node.pulse) * 2;
      this.ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Terminal Typing Effect
class TerminalEffect {
  constructor() {
    this.commands = [
      'nmap -sS -O target.com',
      'sqlmap -u "http://target.com" --dbs',
      'burpsuite --proxy=127.0.0.1:8080',
      'metasploit > use exploit/multi/handler',
      'wireshark -i eth0 -f "tcp port 443"',
      'hashcat -m 0 hash.txt wordlist.txt',
      'john --wordlist=rockyou.txt shadow',
      'nikto -h http://target.com'
    ];
    this.init();
  }

  init() {
    this.createTerminal();
    this.startTyping();
  }

  createTerminal() {
    const terminal = document.createElement('div');
    terminal.id = 'terminal-effect';
    terminal.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      height: 200px;
      background: rgba(0, 0, 0, 0.9);
      border: 1px solid #22c55e;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      color: #22c55e;
      padding: 10px;
      z-index: 1000;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      overflow: hidden;
    `;
    
    terminal.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%; margin-right: 8px;"></div>
        <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%; margin-right: 8px;"></div>
        <div style="width: 12px; height: 12px; background: #27ca3f; border-radius: 50%;"></div>
        <span style="margin-left: 10px; font-size: 10px;">Security Terminal</span>
      </div>
      <div id="terminal-content"></div>
    `;
    
    document.body.appendChild(terminal);
    
    // Show terminal after delay
    setTimeout(() => {
      terminal.style.opacity = '1';
      terminal.style.transform = 'translateY(0)';
    }, 2000);
  }

  async startTyping() {
    const content = document.getElementById('terminal-content');
    if (!content) return;
    
    for (const command of this.commands) {
      await this.typeCommand(content, command);
      await this.wait(2000);
    }
    
    // Hide terminal
    const terminal = document.getElementById('terminal-effect');
    if (terminal) {
      terminal.style.opacity = '0';
      terminal.style.transform = 'translateY(20px)';
      setTimeout(() => terminal.remove(), 300);
    }
  }

  async typeCommand(container, command) {
    const line = document.createElement('div');
    line.innerHTML = '<span style="color: #22c55e;">root@security:~$ </span>';
    container.appendChild(line);
    
    const commandSpan = document.createElement('span');
    line.appendChild(commandSpan);
    
    for (let i = 0; i < command.length; i++) {
      commandSpan.textContent += command[i];
      await this.wait(50 + Math.random() * 50);
    }
    
    // Add cursor blink
    const cursor = document.createElement('span');
    cursor.textContent = '█';
    cursor.style.animation = 'blink 1s infinite';
    line.appendChild(cursor);
    
    await this.wait(500);
    cursor.remove();
    
    // Add result
    const result = document.createElement('div');
    result.style.color = '#888';
    result.style.fontSize = '10px';
    result.textContent = `[+] Scan completed successfully`;
    container.appendChild(result);
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Glitch Effect for Text
class GlitchEffect {
  constructor() {
    this.init();
  }

  init() {
    this.addGlitchToElements();
  }

  addGlitchToElements() {
    const targets = document.querySelectorAll('.hero-title, .brand h1');
    
    targets.forEach(element => {
      element.addEventListener('mouseenter', () => this.glitch(element));
    });
  }

  glitch(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let iterations = 0;
    
    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iterations) return originalText[index];
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        })
        .join('');
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
        element.textContent = originalText;
      }
      
      iterations += 1/3;
    }, 30);
  }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 768) {
    new MatrixEffects();
    new NetworkTopology();
    new TerminalEffect();
  }
  new GlitchEffect();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
    }
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
`;
document.head.appendChild(style);