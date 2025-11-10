function fmtRange(start, end){
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const range = `${s.toLocaleString(undefined,{month:'short',year:'numeric'})} - ${end ? e.toLocaleString(undefined,{month:'short',year:'numeric'}) : 'Present'}`;
  let months = (e.getFullYear()-s.getFullYear())*12 + (e.getMonth()-s.getMonth());
  if(months < 0) months = 0;
  const yrs = Math.floor(months/12);
  const mos = months%12;
  const parts = [];
  if(yrs>0) parts.push(`${yrs} yr${yrs>1?'s':''}`);
  if(mos>0) parts.push(`${mos} mo${mos>1?'s':''}`);
  const dur = parts.join(' ');
  return {range, dur};
}

async function renderFull(){
  const el = document.getElementById('xp-full');
  if(!el) return;
  try{
    const items = await getExperience();
    items.forEach(xp => {
      const {range, dur} = fmtRange(xp.start, xp.end);
      const row = document.createElement('div');
      row.className = 'xp-item';
      row.innerHTML = `
        ${xp.logo ? `<img class="xp-logo" src="${xp.logo}" alt="${xp.company} logo">` : '<div class="xp-logo xp-fallback"></div>'}
        <div class="xp-body">
          <div class="xp-role">${xp.role}</div>
          <div class="xp-company">${xp.company}${xp.type?` · ${xp.type}`:''}</div>
          <div class="xp-meta">${range} · ${dur}</div>
          <div class="xp-meta">${xp.location}${xp.workMode?` · ${xp.workMode}`:''}</div>
        </div>`;
      el.appendChild(row);
    });
  }catch(err){
    el.innerHTML = '<p style="color:#ef4444">Failed to load experience.</p>';
    console.error(err);
  }
}

async function renderSidebar(){
  const el = document.getElementById('xp-list');
  if(!el) return;
  try{
    const items = await getExperience();
    items.slice(0,4).forEach(xp => {
      const {range} = fmtRange(xp.start, xp.end);
      const li = document.createElement('li');
      li.innerHTML = `<a href="experience.html">${xp.role} · ${xp.company}</a><div class="xp-small">${range}</div>`;
      el.appendChild(li);
    });
  }catch(err){
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderFull();
  renderSidebar();
});

async function getExperience(){
  try{
    const res = await fetch('data/experience.json', {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    return await res.json();
  }catch(e){
    if(location.protocol === 'file:'){
      console.warn('Using fallback experience for file:// preview');
      return [
        {company:'Wells Fargo', role:'Senior Software Engineer', type:'Full-time', location:'Charlotte, North Carolina, United States', workMode:'Hybrid', start:'2024-12-01', end:null, logo:'assets/logos/wells-fargo.svg'},
        {company:'Texas State University', role:'Graduate Assistant', type:'', location:'San Marcos, Texas, United States', workMode:'On-site', start:'2022-08-01', end:'2024-05-01', logo:'assets/logos/txst.svg'},
        {company:'Amazon Web Services (AWS)', role:'Cloud Engineer', type:'Full-time', location:'India', workMode:'Remote', start:'2022-03-01', end:'2022-05-31', logo:'assets/logos/aws.svg'},
        {company:'KSR MARINE EXPORTS', role:'Software Engineer', type:'Full-time', location:'Andhra Pradesh, India', workMode:'Hybrid', start:'2021-01-01', end:'2022-02-28', logo:'assets/logos/ksr.svg'},
        {company:'GNR Health Care', role:'Software Engineer - Data Systems', type:'Full-time', location:'Andhra Pradesh, India', workMode:'Hybrid', start:'2018-08-01', end:'2020-12-31', logo:'assets/logos/gnr.svg'}
      ];
    }
    throw e;
  }
}

