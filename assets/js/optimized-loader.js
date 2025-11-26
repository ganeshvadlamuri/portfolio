// Ultra-fast optimized loader
(function() {
  const loader = document.createElement('div');
  loader.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0f1520;z-index:10000;display:flex;align-items:center;justify-content:center;';
  loader.innerHTML = '<div style="font-size:3rem;color:#22c55e;font-weight:700;" id="p">0%</div>';
  document.body.appendChild(loader);
  
  let p = 0;
  const i = setInterval(() => {
    p += Math.random() * 25 + 10;
    if (p >= 100) {
      p = 100;
      clearInterval(i);
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.3s';
        setTimeout(() => loader.remove(), 300);
      }, 100);
    }
    document.getElementById('p').textContent = Math.floor(p) + '%';
  }, 80);
})();