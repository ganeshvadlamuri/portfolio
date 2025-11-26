// Advanced Contact Form
class ContactForm {
  constructor() {
    this.init();
  }

  init() {
    this.replaceContactSection();
  }

  replaceContactSection() {
    const contactCard = document.querySelector('#contact');
    if (!contactCard) return;

    contactCard.innerHTML = `
      <h3 class="uline">Get In Touch</h3>
      <form class="contact-form" id="contactForm">
        <div class="form-group">
          <input type="text" id="name" required>
          <label for="name">Full Name</label>
        </div>
        <div class="form-group">
          <input type="email" id="email" required>
          <label for="email">Email Address</label>
        </div>
        <div class="form-group">
          <select id="subject" required>
            <option value="">Select Subject</option>
            <option value="security-audit">Security Audit</option>
            <option value="penetration-testing">Penetration Testing</option>
            <option value="consultation">Security Consultation</option>
            <option value="collaboration">Collaboration</option>
            <option value="other">Other</option>
          </select>
          <label for="subject">Subject</label>
        </div>
        <div class="form-group">
          <textarea id="message" rows="4" required></textarea>
          <label for="message">Message</label>
        </div>
        <button type="submit" class="submit-btn">
          <span class="btn-text">Send Message</span>
          <span class="btn-loader">Sending...</span>
        </button>
      </form>
      <div class="contact-links">
        <a href="tel:+15126653074">📞 +1 512 665 3074</a>
        <a href="mailto:ganeshvadlamuri.root@gmail.com">✉️ Email Direct</a>
        <a href="https://www.linkedin.com/in/ganeshvadlamuri/" target="_blank" rel="noopener">💼 LinkedIn</a>
      </div>
    `;

    this.setupFormHandling();
  }

  setupFormHandling() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Add floating label effects
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
      input.addEventListener('blur', () => {
        if (!input.value) input.parentElement.classList.remove('focused');
      });
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const btn = e.target.querySelector('.submit-btn');
    const formData = new FormData(e.target);
    
    btn.classList.add('loading');
    
    // Simulate form submission (replace with real endpoint)
    setTimeout(() => {
      btn.classList.remove('loading');
      btn.classList.add('success');
      btn.querySelector('.btn-text').textContent = 'Message Sent!';
      
      setTimeout(() => {
        btn.classList.remove('success');
        btn.querySelector('.btn-text').textContent = 'Send Message';
        e.target.reset();
      }, 3000);
    }, 2000);
  }
}

// Contact Form CSS
const style = document.createElement('style');
style.textContent = `
  .contact-form {
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 12px 16px 8px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: var(--ink);
    font-size: 14px;
    transition: all 0.3s ease;
    outline: none;
  }
  
  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    border-color: var(--accent);
    background: rgba(255,255,255,0.08);
  }
  
  .form-group label {
    position: absolute;
    left: 16px;
    top: 12px;
    color: var(--muted);
    font-size: 14px;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  .form-group.focused label,
  .form-group input:focus + label,
  .form-group textarea:focus + label,
  .form-group select:focus + label {
    top: -8px;
    left: 12px;
    font-size: 12px;
    color: var(--accent);
    background: var(--bg);
    padding: 0 4px;
  }
  
  .submit-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, var(--accent), #16a34a);
    border: none;
    border-radius: 8px;
    color: #000;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(34,197,94,0.3);
  }
  
  .submit-btn.loading .btn-text {
    opacity: 0;
  }
  
  .submit-btn.loading .btn-loader {
    opacity: 1;
  }
  
  .submit-btn.success {
    background: linear-gradient(135deg, #10b981, #059669);
  }
  
  .btn-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .contact-links a {
    padding: 8px 12px;
    background: rgba(255,255,255,0.05);
    border-radius: 6px;
    text-decoration: none;
    color: var(--ink);
    font-size: 14px;
    transition: all 0.3s ease;
  }
  
  .contact-links a:hover {
    background: rgba(34,197,94,0.1);
    color: var(--accent);
  }
`;
document.head.appendChild(style);

setTimeout(() => {
  new ContactForm();
}, 200);