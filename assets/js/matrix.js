document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height, columns, drops = [];
    const chars = '01';
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / 20);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(11, 15, 22, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
        ctx.font = '16px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * 20;
            const y = drops[i] * 20;
            
            ctx.fillText(text, x, y);
            
            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    resize();
    window.addEventListener('resize', resize);
    setInterval(draw, 100);
});