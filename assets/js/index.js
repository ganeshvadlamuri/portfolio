async function load() {
  const feed = document.getElementById('feed');
  const catEls = Array.from(document.querySelectorAll('#cats, #cats-top')).filter(Boolean);
  try{
    const posts = await getPosts();

    // Render posts
    posts.forEach(p => {
      const el = document.createElement('article');
      el.className = 'post' + (p.slug === 'about-ganesh' ? ' about-card' : '');
      const link = `post.html?slug=${encodeURIComponent(p.slug)}`;
      const heroBlock = ''; // no images on homepage cards
      el.innerHTML = `
        <div class="meta">
          <img src="assets/profile.jpg" alt="Ganesh Vadlamuri avatar" class="pfp" style="width:36px;height:36px">
          <strong>Ganesh Vadlamuri</strong>
          <span class="sep">&middot;</span>
          <span>${new Date(p.date).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}</span>
          ${p.featured ? '<span class="badge">Featured</span>' : ''}
          <span class="sep">&middot;</span>
          <span>${p.comments ?? 0} Comment${(p.comments||0)===1?'':'s'}</span>
        </div>
        ${heroBlock}
        <h2><a href="${link}">${p.title}</a></h2>
        <p>${p.excerpt||''}</p>
        <a class="btn" href="${link}">CONTINUE READING</a>
      `;
      feed.appendChild(el);
    });

    // Categories from posts
    if(catEls.length){
      const set = new Set();
      posts.forEach(p => (p.categories||[]).forEach(c=>set.add(c)));
      [...set].sort().forEach(c => {
        const href = c.toLowerCase() === 'about' ? 'post.html?slug=about-ganesh' : '#';
        const li = document.createElement('li');
        li.innerHTML = `<a href="${href}">${c}</a>`;
        catEls.forEach(el => el.appendChild(li.cloneNode(true)));
      });
    }
  } catch(err){
    feed.innerHTML = '<p style="color:#ef4444">Failed to load posts.</p>';
    console.error(err);
  }

  document.getElementById('y').textContent = new Date().getFullYear();
  document.getElementById('older').href = '#older-posts';
}

document.addEventListener('DOMContentLoaded', load);

// Also render a compact experience list in the sidebar if present
document.addEventListener('DOMContentLoaded', async ()=>{
  const list = document.getElementById('xp-list');
  if(!list) return;
  try{
    const items = await getExperience();
    items.slice(0,4).forEach(xp => {
      const s = new Date(xp.start);
      const e = xp.end ? new Date(xp.end) : new Date();
      const range = `${s.toLocaleString(undefined,{month:'short',year:'numeric'})} - ${xp.end ? e.toLocaleString(undefined,{month:'short',year:'numeric'}) : 'Present'}`;
      const li = document.createElement('li');
      li.innerHTML = `<a href="experience.html">${xp.role} - ${xp.company}</a><div class="xp-small">${range}</div>`;
      list.appendChild(li);
    });
  }catch(err){ console.error(err); }
});

// Certifications (mock list) in sidebar if present
document.addEventListener('DOMContentLoaded', ()=>{
  const el = document.getElementById('certs');
  if(!el) return;
  const certs = [
    'Google Cloud – Professional Cloud Architect',
    'AWS – Solutions Architect Associate',
    'Certified Kubernetes Administrator (CKA)',
    'OSCP (Offensive Security Certified Professional)'
  ];
  certs.forEach(c => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = c;
    el.appendChild(span);
  });
});

// Helpers with offline fallback when opening via file://
async function getPosts(){
  try{
    const res = await fetch('./data/posts.json', {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    return await res.json();
  }catch(e){
    if(location.protocol === 'file:'){
      console.warn('Using fallback posts for file:// preview');
      return [
  { slug:"about-ganesh", title:"About Ganesh Vadlamuri", date:"2025-11-10", featured:true, comments:0, categories:["Featured","About"], img:"assets/hero-hacker.svg", excerpt:"Senior Software Engineer focused on fraud detection, cloud modernization, and secure systems." },
  { slug:"problems-to-solve", title:"I don't think we will ever run out of problems to solve", date:"2020-05-02", featured:true, comments:1, categories:["Featured"], img:"assets/hero-hacker.svg", excerpt:"AI and deep learning for payment security." },
  { slug:"ise-award-2017", title:"Winner of 2017 Information Security Executive Award", date:"2017-08-27", categories:["TechNews"], img:"assets/award.jpg", excerpt:"ISE of the Year 2017 - San Francisco." },
  { slug:"security-shark-tank", title:"Participating in Security Shark Tank with Robert Herjavec and CISOs", date:"2016-11-17", categories:["TechNews"], img:"assets/sharktank.jpg", excerpt:"Serving as a 'Shark' during RSA week and takeaways from rapid-fire vendor pitches." },
  { slug:"global-big-data-2016", title:"Speaking at Global Big Data Conference 2016", date:"2016-11-12", categories:["TechNews"], img:"assets/bigdata.jpg", excerpt:"Securing Apache Kafka - notes, links, and interview." }
]
    }
    throw e;
  }
}

async function getExperience(){
  try{
    const res = await fetch('./data/experience.json', {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    return await res.json();
  }catch(e){
    if(location.protocol === 'file:'){
      console.warn('Using fallback experience for file:// preview');
      return [
        {company:'Wells Fargo', role:'Senior Software Engineer', start:'2024-12-01', end:null},
        {company:'Texas State University', role:'Graduate Assistant', start:'2022-08-01', end:'2024-05-01'}
      ];
    }
    throw e;
  }
}
