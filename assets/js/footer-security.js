// Add security badges to footer
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer');
  if (!footer) return;
  
  const securityBadge = document.createElement('div');
  securityBadge.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;font-size:12px;color:var(--muted);margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1);';
  securityBadge.innerHTML = `
    <span style="color:#22c55e;font-weight:600;">🔒 Fort Knox Security:</span>
    <span title="Content Security Policy">CSP ✓</span>
    <span title="No clickjacking">X-Frame-Options ✓</span>
    <span title="MIME sniffing blocked">X-Content-Type ✓</span>
    <span title="Secure referrer">Referrer-Policy ✓</span>
    <span title="External links secured">NoOpener ✓</span>
    <span title="API timeout protection">Timeout Controls ✓</span>
    <span style="color:#22c55e;">→ Relax, you're safer here than in your own browser! 😎</span>
  `;
  
  footer.appendChild(securityBadge);
});