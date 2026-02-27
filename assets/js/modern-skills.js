// Modern Skills Display - Clean & Simple
(async function() {
  const container = document.getElementById('skills-container');
  if (!container) return;
  
  try {
    const res = await fetch('./data/skills.json');
    const skillsData = await res.json();
    
    skillsData.forEach(cat => {
      const section = document.createElement('div');
      section.style.cssText = 'margin-bottom:32px';
      
      const title = document.createElement('h4');
      title.textContent = cat.category;
      title.style.cssText = 'color:var(--accent);font-size:18px;margin-bottom:16px;font-weight:700;border-bottom:2px solid var(--border);padding-bottom:8px';
      
      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px';
      
      cat.skills.forEach(skill => {
        const card = document.createElement('div');
        card.textContent = skill.name;
        card.style.cssText = 'padding:12px 16px;background:var(--panel);border:1px solid var(--border);border-radius:8px;text-align:center;font-weight:600;font-size:14px;transition:all 0.3s';
        
        card.onmouseover = () => {
          card.style.background = 'linear-gradient(135deg,var(--accent),#16a34a)';
          card.style.color = '#000';
          card.style.transform = 'translateY(-4px)';
          card.style.boxShadow = '0 8px 20px rgba(34,197,94,0.3)';
        };
        
        card.onmouseout = () => {
          card.style.background = 'var(--panel)';
          card.style.color = 'var(--ink)';
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = 'none';
        };
        
        grid.appendChild(card);
      });
      
      section.appendChild(title);
      section.appendChild(grid);
      container.appendChild(section);
    });
  } catch(e) {
    console.error('Skills load error:', e);
  }
})();
