// Load Skills Accordion
async function loadSkills() {
  console.log('Loading skills...');
  const container = document.getElementById('skills-container');
  console.log('Container found:', container);
  if (!container) {
    console.error('Skills container not found!');
    return;
  }
  
  try {
    const res = await fetch('./data/skills.json');
    const skillsData = await res.json();
    
    skillsData.forEach((category, index) => {
      const accordion = document.createElement('div');
      accordion.className = 'skill-accordion';
      
      const header = document.createElement('div');
      header.className = 'accordion-header';
      header.innerHTML = `
        <span>${category.category}</span>
        <span class="accordion-icon">▼</span>
      `;
      
      const content = document.createElement('div');
      content.className = 'accordion-content';
      content.style.display = index === 0 ? 'block' : 'none';
      
      category.skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item-compact';
        skillDiv.innerHTML = `
          <div class="skill-name">
            <span>${skill.name}</span>
            <span class="skill-level">${skill.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" style="width: 0%;" data-width="${skill.level}%"></div>
          </div>
        `;
        content.appendChild(skillDiv);
      });
      
      header.addEventListener('click', () => {
        const isOpen = content.style.display === 'block';
        content.style.display = isOpen ? 'none' : 'block';
        header.querySelector('.accordion-icon').textContent = isOpen ? '▼' : '▲';
      });
      
      if (index === 0) {
        header.querySelector('.accordion-icon').textContent = '▲';
      }
      
      accordion.appendChild(header);
      accordion.appendChild(content);
      container.appendChild(accordion);
    });
    
    setTimeout(() => {
      document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 100);
    
  } catch(err) {
    console.error('Skills load error:', err);
  }
}

const style = document.createElement('style');
style.textContent = `
  .skill-accordion {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 12px;
    overflow: hidden;
  }
  
  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    cursor: pointer;
    font-weight: 600;
    color: var(--ink);
    transition: all 0.3s ease;
    user-select: none;
  }
  
  .accordion-header:hover {
    background: rgba(34,197,94,0.05);
  }
  
  .accordion-icon {
    color: var(--accent);
    font-size: 12px;
    transition: transform 0.3s ease;
  }
  
  .accordion-content {
    padding: 0 20px 16px 20px;
    display: grid;
    gap: 12px;
  }
  
  .skill-item-compact {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .skill-name {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  
  .skill-level {
    color: var(--accent);
    font-weight: 600;
  }
  
  .skill-bar {
    height: 6px;
    background: var(--border);
    border-radius: 3px;
    overflow: hidden;
  }
  
  .skill-progress {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), #16a34a);
    border-radius: 3px;
    transition: width 1s ease-out;
  }
  
  @media (max-width: 768px) {
    .accordion-header {
      padding: 14px 16px;
      font-size: 14px;
    }
    
    .accordion-content {
      padding: 0 16px 14px 16px;
    }
    
    .skill-name {
      font-size: 13px;
    }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', loadSkills);
