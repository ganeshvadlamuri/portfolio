function q(key){return new URLSearchParams(location.search).get(key)}

function md(src){
  if(!src) return '';
  // escape HTML
  src = src.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // code fences
  src = src.replace(/```([\s\S]*?)```/g,(m,code)=>`<pre><code>${code}</code></pre>`);
  // headings
  src = src.replace(/^### (.*)$/gm,'<h3>$1</h3>');
  src = src.replace(/^## (.*)$/gm,'<h2>$1</h2>');
  src = src.replace(/^# (.*)$/gm,'<h1>$1</h1>');
  // bold / italic
  src = src.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  src = src.replace(/\*(.*?)\*/g,'<em>$1</em>');
  // links
  src = src.replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1<\/a>');
  // paragraphs
  src = src.split(/\n\n+/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('');
  return src;
}

async function load(){
  const slug=q('slug');
  const elTitle=document.getElementById('title');
  const elContent=document.getElementById('content');
  const elMeta=document.getElementById('meta');
  const elHero=document.getElementById('hero');
  if(!slug){ elTitle.textContent='Post not found'; return; }
  try{
    const posts=await getPosts();
    const p = posts.find(x=>x.slug===slug);
    if(!p){ elTitle.textContent='Post not found'; return; }
    elTitle.textContent=p.title;
    elMeta.textContent = `${new Date(p.date).toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'})}`;
    if(p.img){ elHero.src=p.img; elHero.alt=p.title; elHero.style.display='block'; }
    elContent.innerHTML = md(p.content);
    document.title = `${p.title} • Ganesh Vadlamuri`;
  }catch(e){
    elTitle.textContent='Failed to load post';
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', load);

async function getPosts(){
  try{
    const res = await fetch('data/posts.json', {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    return await res.json();
  }catch(e){
    if(location.protocol === 'file:'){
      console.warn('Using fallback posts for file:// preview');
      return [
        { slug:'about-ganesh', title:'About Ganesh Vadlamuri', date:'2025-11-10', featured:true, comments:0, categories:['Featured','About'], img:'assets/hero-hacker.svg', content:'Brief about Ganesh.' },
        { slug:'problems-to-solve', title:"I don’t think we will ever run out of problems to solve", date:'2020-05-02', featured:true, comments:1, categories:['Featured'], img:'assets/hero-hacker.svg', content:'Sample content.' }
      ];
    }
    throw e;
  }
}

