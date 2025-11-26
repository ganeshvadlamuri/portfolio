// SEO Schema Markup
const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ganesh Vadlamuri",
  "url": "https://ganeshvadlamuri.github.io",
  "image": "https://ganeshvadlamuri.github.io/assets/profile.jpg",
  "jobTitle": "Senior Software Engineer - Cybersecurity Expert",
  "worksFor": {
    "@type": "Organization",
    "name": "Wells Fargo"
  },
  "alumniOf": "Texas State University",
  "knowsAbout": ["Cybersecurity", "Application Security", "Cloud Security", "Fraud Detection", "AWS", "GCP", "OpenShift", "DevSecOps", "Penetration Testing"],
  "sameAs": [
    "https://www.linkedin.com/in/ganeshvadlamuri/",
    "https://github.com/ganeshvadlamuri",
    "https://x.com/ganeshxploit",
    "https://medium.com/@ganeshvadlamuri",
    "https://www.credly.com/users/ganeshvadlamuri"
  ],
  "email": "ganeshvadlamuri.root@gmail.com",
  "telephone": "+15126653074"
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(schema);
document.head.appendChild(script);

// Update page title and meta
document.title = "Ganesh Vadlamuri - Cybersecurity Expert | Application Security | Cloud Security Architect";

const metaTags = [
  { name: 'keywords', content: 'Ganesh Vadlamuri, cybersecurity expert, application security, cloud security, fraud detection, AWS, GCP, OpenShift, DevSecOps, Wells Fargo, security architect, penetration testing' },
  { name: 'author', content: 'Ganesh Vadlamuri' },
  { name: 'robots', content: 'index, follow' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: 'https://ganeshvadlamuri.github.io/' },
  { property: 'og:title', content: 'Ganesh Vadlamuri - Cybersecurity Expert' },
  { property: 'og:description', content: 'Senior Software Engineer specializing in cybersecurity, fraud detection, and cloud architecture.' },
  { property: 'og:image', content: 'https://ganeshvadlamuri.github.io/assets/profile.jpg' },
  { property: 'twitter:card', content: 'summary_large_image' },
  { property: 'twitter:url', content: 'https://ganeshvadlamuri.github.io/' },
  { property: 'twitter:title', content: 'Ganesh Vadlamuri - Cybersecurity Expert' },
  { property: 'twitter:description', content: 'Senior Software Engineer specializing in cybersecurity, fraud detection, and cloud architecture.' },
  { property: 'twitter:image', content: 'https://ganeshvadlamuri.github.io/assets/profile.jpg' },
  { name: 'twitter:creator', content: '@ganeshxploit' }
];

metaTags.forEach(tag => {
  const meta = document.createElement('meta');
  if (tag.name) meta.setAttribute('name', tag.name);
  if (tag.property) meta.setAttribute('property', tag.property);
  meta.setAttribute('content', tag.content);
  document.head.appendChild(meta);
});

const canonical = document.createElement('link');
canonical.rel = 'canonical';
canonical.href = 'https://ganeshvadlamuri.github.io/';
document.head.appendChild(canonical);

const descMeta = document.querySelector('meta[name="description"]');
if (descMeta) {
  descMeta.content = 'Ganesh Vadlamuri is a Senior Software Engineer specializing in cybersecurity, application security, fraud detection, and cloud architecture. Expert in AWS, GCP, OpenShift, Kafka, and DevSecOps at Wells Fargo.';
}
