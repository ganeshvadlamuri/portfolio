// Credly API Integration for automatic certificate sync
class CredlySync {
  constructor(credlyProfileId) {
    this.profileId = credlyProfileId;
    this.apiBase = 'https://www.credly.com/users';
    this.cache = new Map();
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
  }

  async fetchCredlyBadges() {
    const cacheKey = `credly_${this.profileId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }

    try {
      // Try multiple endpoints for Credly data
      const endpoints = [
        `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.credly.com/users/${this.profileId}/badges.json`)}`,
        `https://corsproxy.io/?https://www.credly.com/users/${this.profileId}/badges.json`,
        `https://www.credly.com/users/${this.profileId}/badges.json`
      ];

      let data = null;
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            headers: { 'Accept': 'application/json' }
          });
          
          if (response.ok) {
            const result = await response.json();
            // Handle proxy response format
            data = result.contents ? JSON.parse(result.contents) : result;
            break;
          }
        } catch (e) {
          console.log(`Endpoint failed: ${endpoint}`);
          continue;
        }
      }

      if (!data) {
        throw new Error('All Credly endpoints failed');
      }

      const badges = this.transformCredlyData(data.data || []);
      this.cache.set(cacheKey, { data: badges, timestamp: Date.now() });
      return badges;
      
    } catch (error) {
      console.warn('Credly sync failed, using fallback data:', error);
      return this.getFallbackCertifications();
    }
  }

  transformCredlyData(credlyBadges) {
    return credlyBadges.map(badge => ({
      id: badge.id,
      name: badge.badge_template?.name || 'Unknown Certificate',
      issuer: badge.badge_template?.issuer?.name || 'Unknown Issuer',
      category: this.categorizeByIssuer(badge.badge_template?.issuer?.name),
      badge: this.generateBadgeCode(badge.badge_template?.name),
      description: badge.badge_template?.description || 'Professional certification',
      issued: badge.issued_at,
      expires: badge.expires_at,
      credlyUrl: badge.public_url,
      verifyUrl: badge.public_url,
      skills: this.extractSkills(badge.badge_template?.name, badge.badge_template?.description),
      imageUrl: badge.badge_template?.image_url,
      featured: this.isFeaturedCert(badge.badge_template?.name)
    }));
  }

  categorizeByIssuer(issuer) {
    if (!issuer) return 'other';
    
    const issuerLower = issuer.toLowerCase();
    if (issuerLower.includes('aws') || issuerLower.includes('amazon')) return 'cloud';
    if (issuerLower.includes('google') || issuerLower.includes('gcp')) return 'cloud';
    if (issuerLower.includes('microsoft') || issuerLower.includes('azure')) return 'cloud';
    if (issuerLower.includes('security') || issuerLower.includes('cissp') || issuerLower.includes('offensive')) return 'security';
    if (issuerLower.includes('kubernetes') || issuerLower.includes('docker') || issuerLower.includes('hashicorp')) return 'devops';
    if (issuerLower.includes('comptia')) return 'security';
    
    return 'other';
  }

  generateBadgeCode(certName) {
    if (!certName) return '?';
    
    const name = certName.toLowerCase();
    if (name.includes('aws')) return 'AWS';
    if (name.includes('google') || name.includes('gcp')) return 'GCP';
    if (name.includes('azure')) return 'AZ';
    if (name.includes('kubernetes')) return 'K8s';
    if (name.includes('terraform')) return 'TF';
    if (name.includes('cissp')) return 'CISSP';
    if (name.includes('oscp')) return 'OSCP';
    if (name.includes('security+')) return 'SEC+';
    
    // Generate from first letters
    return certName.split(' ')
      .filter(word => word.length > 2)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 4);
  }

  extractSkills(certName, description) {
    const skills = [];
    const text = `${certName} ${description}`.toLowerCase();
    
    const skillMap = {
      'aws': ['AWS', 'Cloud Architecture'],
      'google cloud': ['GCP', 'Cloud Architecture'],
      'azure': ['Azure', 'Cloud Architecture'],
      'kubernetes': ['Kubernetes', 'Container Orchestration'],
      'security': ['Cybersecurity', 'Risk Management'],
      'terraform': ['Infrastructure as Code', 'DevOps'],
      'penetration': ['Penetration Testing', 'Ethical Hacking'],
      'architect': ['Solution Architecture', 'System Design'],
      'devops': ['DevOps', 'CI/CD'],
      'compliance': ['Compliance', 'Governance']
    };

    Object.entries(skillMap).forEach(([keyword, relatedSkills]) => {
      if (text.includes(keyword)) {
        skills.push(...relatedSkills);
      }
    });

    return [...new Set(skills)].slice(0, 4); // Remove duplicates, max 4 skills
  }

  isFeaturedCert(certName) {
    if (!certName) return false;
    
    const featured = [
      'aws solutions architect',
      'google cloud professional',
      'azure security engineer',
      'cissp',
      'oscp',
      'kubernetes administrator'
    ];
    
    return featured.some(cert => certName.toLowerCase().includes(cert));
  }

  getFallbackCertifications() {
    return [
      {
        id: 'aws-saa',
        name: 'AWS Solutions Architect Associate',
        issuer: 'Amazon Web Services',
        category: 'cloud',
        badge: 'AWS',
        description: 'Validates expertise in designing distributed systems on AWS with focus on scalability, security, and cost optimization.',
        issued: '2024-03-15',
        expires: '2027-03-15',
        credlyUrl: 'https://www.credly.com/users/ganeshvadlamuri',
        verifyUrl: 'https://aws.amazon.com/verification',
        skills: ['AWS Architecture', 'Cloud Security', 'Cost Optimization', 'Scalability'],
        featured: true
      },
      {
        id: 'gcp-pca',
        name: 'Google Cloud Professional Architect',
        issuer: 'Google Cloud',
        category: 'cloud',
        badge: 'GCP',
        description: 'Demonstrates ability to design, develop, and manage robust, secure, scalable solutions on Google Cloud.',
        issued: '2024-01-20',
        expires: '2026-01-20',
        credlyUrl: 'https://www.credly.com/users/ganeshvadlamuri',
        verifyUrl: 'https://cloud.google.com/certification/verification',
        skills: ['GCP Architecture', 'Kubernetes', 'Data Analytics', 'ML/AI'],
        featured: true
      },
      {
        id: 'oscp',
        name: 'Offensive Security Certified Professional',
        issuer: 'Offensive Security',
        category: 'security',
        badge: 'OSCP',
        description: 'Hands-on penetration testing certification requiring practical exploitation of vulnerabilities.',
        issued: '2023-09-10',
        expires: null,
        credlyUrl: null,
        verifyUrl: 'https://www.offensive-security.com/verify',
        skills: ['Penetration Testing', 'Exploit Development', 'Network Security', 'Linux/Windows'],
        featured: true
      },
      {
        id: 'cka',
        name: 'Certified Kubernetes Administrator',
        issuer: 'Cloud Native Computing Foundation',
        category: 'devops',
        badge: 'CKA',
        description: 'Validates skills in Kubernetes administration including cluster management and networking.',
        issued: '2024-02-28',
        expires: '2027-02-28',
        credlyUrl: 'https://www.credly.com/users/ganeshvadlamuri',
        verifyUrl: 'https://training.linuxfoundation.org/certification/verify',
        skills: ['Kubernetes', 'Container Orchestration', 'DevOps', 'Cloud Native'],
        featured: true
      }
    ];
  }

  // Auto-refresh certifications
  startAutoSync(intervalHours = 24) {
    setInterval(() => {
      this.fetchCredlyBadges().then(badges => {
        console.log(`Auto-synced ${badges.length} certifications from Credly`);
        // Trigger UI update
        if (window.updateCertifications) {
          window.updateCertifications(badges);
        }
      });
    }, intervalHours * 60 * 60 * 1000);
  }
}

// Initialize Credly sync
const credlySync = new CredlySync('ganeshvadlamuri');

// Export for use in certifications page
window.CredlySync = CredlySync;
window.credlySync = credlySync;