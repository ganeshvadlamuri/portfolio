// SEO Enhancements - Add Open Graph and Twitter Cards dynamically
(function() {
  const meta = [
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://ganeshvadlamuri.github.io/' },
    { property: 'og:title', content: 'Ganesh Vadlamuri | Senior Software Engineer' },
    { property: 'og:description', content: 'Senior Software Engineer specializing in Java, Spring Boot, Cloud (AWS/Azure/GCP), and Generative AI' },
    { property: 'og:image', content: 'https://ganeshvadlamuri.github.io/assets/profile.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@ganeshxploit' },
    { name: 'twitter:title', content: 'Ganesh Vadlamuri | Senior Software Engineer' },
    { name: 'twitter:description', content: 'Senior Software Engineer specializing in Java, Spring Boot, Cloud, and Generative AI' },
    { name: 'twitter:image', content: 'https://ganeshvadlamuri.github.io/assets/profile.jpg' },
    { name: 'author', content: 'Ganesh Vadlamuri' }
  ];
  
  meta.forEach(m => {
    const tag = document.createElement('meta');
    if (m.property) tag.setAttribute('property', m.property);
    if (m.name) tag.setAttribute('name', m.name);
    tag.setAttribute('content', m.content);
    document.head.appendChild(tag);
  });
  
  // Add canonical link
  const canonical = document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = 'https://ganeshvadlamuri.github.io/';
  document.head.appendChild(canonical);
})();
