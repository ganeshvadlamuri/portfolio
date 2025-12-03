// Kali Terminal - Compact
(async function() {
  const container = document.getElementById('skills-container');
  if (!container) return;
  
  const res = await fetch('./data/skills.json');
  const skillsData = await res.json();
  
  const terminal = document.createElement('div');
  terminal.style.cssText = 'background:#0a0e14;color:#00ff00;padding:16px;border-radius:0;font-family:"Courier New",monospace;font-size:13px;line-height:1.5;border:2px solid #1a1a1a;box-shadow:inset 0 0 20px rgba(0,255,0,0.1);max-width:1000px;margin:0 auto';
  
  let output = '<span style="color:#00ff00">┌──(</span><span style="color:#0080ff">ganesh㉿kali</span><span style="color:#00ff00">)-[</span><span style="color:#fff">~/skills</span><span style="color:#00ff00">]</span><br>';
  output += '<span style="color:#00ff00">└─$ </span>cat skills.txt<br><br>';
  
  skillsData.forEach(cat => {
    output += `<span style="color:#0080ff;font-weight:700">[${cat.category}]</span> `;
    output += cat.skills.map(s => s.name).join(', ');
    output += '<br>';
  });
  
  output += '<br><span style="color:#00ff00">└─$ </span><span style="color:#00ff00">█</span>';
  
  terminal.innerHTML = output;
  container.appendChild(terminal);
})();
