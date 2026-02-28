# 🔧 Technical Setup Guide

Your portfolio is a modern, responsive website built with vanilla technologies. This guide explains how everything works and how to customize it.

## 📋 Quick Navigation

- **[File Structure](#-file-structure)** - What each file does
- **[Data Structure](#-data-structure)** - How to edit content
- **[Customization Guide](#-customization-guide)** - How to make changes
- **[Deployment](#-deployment)** - How it's hosted
- **[Troubleshooting](#-troubleshooting)** - Common issues

---

## 📁 File Structure

```
portfolio/
│
├── index.html          ← Your portfolio page (main file)
├── style.css           ← All styling (Tailwind CSS)
├── script.js           ← All functionality (JavaScript)
│
├── assets/
│   └── profile.jpg     ← Your headshot (192x192 minimum)
│
├── data/
│   ├── experience.json ← Your work history
│   └── skills.json     ← Your technical skills
│
└── docs/
    ├── README.md       ← Getting started
    ├── SETUP.md        ← This file
    ├── CHANGELOG.md    ← Change history
    ├── FAQ.md          ← Common questions
    ├── SEO.md          ← SEO details
    └── archive/        ← Old documentation
```

---

## 🎨 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Structure** | HTML5 | Page markup |
| **Styling** | Tailwind CSS | Responsive design |
| **Logic** | JavaScript | Interactivity |
| **Data** | JSON | Content storage |
| **Hosting** | GitHub Pages | Free hosting |

### Key Libraries & Features

- **No build tools required** - Just open in browser
- **CDN-based Tailwind CSS** - No dependencies to install
- **Vanilla JavaScript** - No frameworks needed
- **Dynamic content loading** - GitHub API for projects
- **Responsive design** - Works on all devices
- **SEO optimized** - 65+ keywords, schema markup

---

## 📝 Data Structure

### experience.json

Stores your work history with achievements:

```json
{
  "title": "Senior Assistant Vice President",
  "company": "Wells Fargo",
  "period": "Dec 2024 - Present",
  "location": "Charlotte, NC",
  "highlights": [
    "Building fraud detection and transaction monitoring systems",
    "Processing millions of financial transactions daily",
    "Led Java and Spring Boot modernization initiatives",
    "Implemented event-driven microservices with Apache Kafka",
    "Designed scalable cloud-native applications on AWS",
    "Mentored junior engineers and code reviews",
    "Reduced system latency by 40% through optimization"
  ]
}
```

**What to edit:**
- `title` - Your job title
- `company` - Company name
- `period` - Employment dates
- `location` - City/location
- `highlights` - Array of 5-7 achievements (bullet points)

**How to add new experience:**
1. Open `data/experience.json`
2. Add a new object to the array
3. Fill in all fields
4. Save file
5. Refresh portfolio in browser

### skills.json

Organized technical skills:

```json
{
  "category": "Programming Languages",
  "skills": [
    "Java",
    "Python",
    "SQL",
    "JavaScript",
    "TypeScript",
    "Bash"
  ]
}
```

**What to edit:**
- `category` - Skill category name
- `skills` - Array of skill names

**Categories to include:**
- Programming Languages
- Frameworks & Libraries
- Cloud Platforms
- Databases & Messaging
- DevOps & Tools
- Other Skills

---

## ✏️ Customization Guide

### 1. Update Your Information

**Location:** `index.html` (~line 295-350)

Find the Professional Summary section and update:

```html
<p class="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
  Senior Software Engineer at <span class="accent-blue font-semibold">Wells Fargo</span> with 6+ years building...
</p>
```

Replace with your current role, company, and description.

### 2. Add Profile Photo

**Location:** `assets/profile.jpg`

**Requirements:**
- Size: At least 192x192 pixels (ideally 300x300+)
- Format: JPG, PNG, or WebP
- Style: Professional headshot

**Steps:**
1. Replace `assets/profile.jpg` with your photo
2. Keep the same filename
3. Refresh browser to see changes

**If no image available:**
- Portfolio will show "GV" initials instead
- This is automatic fallback (see line 227 in HTML)

### 3. Update Work Experience

**Location:** `data/experience.json`

```javascript
// Example: Add new job
{
  "title": "Software Engineer",
  "company": "Your Company",
  "period": "Jan 2025 - Present",
  "location": "Your City, State",
  "highlights": [
    "Achievement 1",
    "Achievement 2",
    "Achievement 3",
    "Achievement 4",
    "Achievement 5",
    "Achievement 6",
    "Achievement 7"
  ]
}
```

**Best practices:**
- Use 5-7 bullet points per job
- Start with action verbs: Built, Designed, Engineered, Led, Implemented
- Include metrics when possible: 40% improvement, millions of transactions
- Focus on impact, not tasks

### 4. Update Skills

**Location:** `data/skills.json`

```javascript
// Add or update skill categories
[
  {
    "category": "Programming Languages",
    "skills": ["Java", "Python", "SQL", "JavaScript"]
  },
  {
    "category": "Cloud Platforms",
    "skills": ["AWS", "GCP", "Kubernetes", "Docker"]
  }
]
```

### 5. Add Resume PDF

**Location:** `assets/resume.pdf` (optional)

**Steps:**
1. Create a PDF of your resume
2. Save as `assets/resume.pdf`
3. Update button in line 241:
   ```html
   <a href="assets/resume.pdf" download>📄 Download Resume</a>
   ```

### 6. Update Contact Information

**Location:** `index.html` (Contact section, ~line 700)

Update these links:
- Email: `ganeshvadlamuri.root@gmail.com` → your email
- Phone: `+1 980-320-0468` → your phone
- LinkedIn: `ganeshvadlamuri` → your username
- GitHub: `ganeshvadlamuri` → your username
- Calendly: `ganeshvadlamuri-root` → your calendar link

### 7. Customize Colors

**Location:** `style.css` (top section)

```css
:root {
  --accent: #10b981;        /* Primary green */
  --accent-blue: #3b82f6;   /* Secondary blue */
  --accent-purple: #8b5cf6; /* Secondary purple */
}
```

Change these hex colors to match your brand.

### 8. Update Social Links

Projects section **automatically loads** from your GitHub:
- Your 6 most recently updated repositories
- Shows stars ⭐ and forks 🔱
- Links to GitHub repo pages
- No manual setup needed!

**To manage projects:**
1. Create repos on GitHub
2. Add descriptions to each repo
3. Keep them updated
4. Portfolio refreshes automatically

---

## 🚀 Deployment

### Current Setup: GitHub Pages

**URL:** `https://ganeshvadlamuri.github.io`

**How it works:**
1. Portfolio is in a GitHub repository
2. GitHub automatically serves it as a website
3. No additional setup needed
4. Changes are live in ~30 seconds

### How to Deploy Changes

**Step 1:** Edit files locally
- Update HTML, CSS, JavaScript, or JSON

**Step 2:** Save changes

**Step 3:** Push to GitHub
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

**Step 4:** Wait 30 seconds
- GitHub Pages rebuilds automatically
- Your site is live!

### Custom Domain (Optional)

To use a custom domain like `yourname.com`:

1. Go to GitHub repository settings
2. Find "Pages" section
3. Add your custom domain
4. Update DNS records with your registrar

---

## 📊 Performance Tips

### 1. Optimize Profile Photo

Use a tool to compress your image:
- `tinypng.com` - Compress images
- `squoosh.app` - Google's compression tool
- Target: <100KB file size

### 2. Lazy Loading

Images already use `loading="lazy"` for better performance.

### 3. CDN Tailwind CSS

Already using CDN version for instant styling without build step.

### 4. Minimal JavaScript

Only 285 lines of JavaScript - very fast loading.

---

## 🔍 Customizing Specific Sections

### Hero Section

**File:** `index.html` (lines 220-290)

Elements to customize:
- Profile image
- Heading text
- Subtitle description
- Call-to-action buttons
- Tech stack logos

### Professional Summary

**File:** `index.html` (lines 295-350)

4 specialty cards:
- ⚡ Microservices Architecture
- ☁️ Cloud-Native Solutions
- 🔒 Fraud Detection Systems

Update text and add/remove cards as needed.

### Experience Section

**File:** Auto-loaded from `data/experience.json`
**Rendered by:** `script.js` (lines 100-120)

Each job shows:
- Title & Company
- Dates & Location
- 7 bullet points of achievements

### Skills Section

**File:** Auto-loaded from `data/skills.json`
**Rendered by:** `script.js` (lines 135-155)

Grouped by category with visual cards.

### Projects Section

**File:** Auto-loaded from GitHub API
**Rendered by:** `script.js` (lines 210-285)

Shows your latest 6 GitHub repositories with:
- Stars count
- Forks count
- Description
- Language tags

### Contact Section

**File:** `index.html` (lines 700-760)

Direct contact options:
- Email
- Phone
- Calendar booking
- LinkedIn
- GitHub
- Resume download

---

## 🎯 SEO Configuration

### Meta Tags Location

**File:** `index.html` (lines 1-80)

Update these for SEO:
- `<title>` - Page title (crucial)
- `<meta name="description">` - Search description
- `<meta name="keywords">` - Keywords for ranking
- `og:title` & `og:description` - Social sharing

### Schema Markup

**File:** `index.html` (lines 25-100+)

JSON-LD structured data for:
- Person schema (your profile)
- Work experience
- Certifications
- Education

Already optimized - no changes needed unless you update basic info.

### Hidden SEO Content

**File:** `index.html` (lines 715-750)

In `<div class="sr-only">` section:
- Extra keywords
- Full descriptions
- Crawlable but not visible

---

## 🔧 Troubleshooting

### Issue: Profile photo not showing

**Solution 1:** Check file exists
- Go to `assets/` folder
- Verify `profile.jpg` exists
- Check filename (case-sensitive)

**Solution 2:** Check file size
- Image must be at least 192x192 pixels
- Should be under 200KB
- Try compressing with tinypng.com

**Solution 3:** Browser cache
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Try different browser

### Issue: Projects not loading

**Possible causes:**
1. GitHub API rate limit (happens after 60 requests/hour)
2. GitHub account is private
3. No public repositories

**Solution:**
- Projects section shows "Projects data unavailable"
- Refresh page after 1 hour (rate limit resets)
- Make GitHub repos public if needed

### Issue: Mobile menu not working

**Troubleshooting:**
1. Check JavaScript console for errors
2. Try different mobile browser
3. Hard refresh on mobile device
4. Check `script.js` is loaded (should see activity)

### Issue: Styling looks broken

**Troubleshooting:**
1. Ensure CDN Tailwind CSS loaded
2. Check internet connection
3. Try disabling browser extensions
4. Try different browser
5. Check for JavaScript errors in console

### Issue: JSON files not loading

**Check:**
- Files are in `data/` folder
- Filenames are exact: `experience.json`, `skills.json`
- JSON syntax is valid (use JSONLint.com to validate)
- No typos in filenames

**Valid JSON example:**
```json
[
  {
    "title": "Senior Engineer",
    "company": "Company",
    "highlights": ["Point 1", "Point 2"]
  }
]
```

---

## 📚 File Reference

### index.html Structure

| Section | Lines | Purpose |
|---------|-------|---------|
| Head & Meta | 1-100 | SEO & styling |
| Navigation | 180-220 | Top nav menu |
| Hero | 220-290 | Main headline |
| Professional Summary | 295-350 | Expertise cards |
| Experience | 370-500 | Work history |
| Certifications | 550-620 | Credentials |
| Projects | 640-650 | GitHub repos |
| Contact | 700-770 | Contact section |
| Footer | 780-790 | Copyright |
| SEO Content | 795-850 | Hidden keywords |

### script.js Functions

| Function | Lines | Purpose |
|----------|-------|---------|
| Counter animation | 1-50 | Animated stat counters |
| Typing effect | 55-90 | Dynamic text typing |
| Experience loading | 100-120 | Load experience data |
| Skills loading | 135-155 | Load skills data |
| Projects loading | 210-285 | GitHub API fetch |
| Smooth scroll | 290-310 | Navigation scrolling |
| Mobile menu | 320-350 | Mobile hamburger menu |

### style.css Sections

| Section | Purpose |
|---------|---------|
| CSS Variables | Theme colors & sizes |
| Global Styles | Font, background setup |
| Components | Buttons, cards, glass effect |
| Animations | Transitions, gradients |
| Responsive | Media queries |

---

## 🎯 Best Practices

### 1. Keep It Updated
- Update experience within 1 week of job change
- Add new skills as you learn them
- Keep certifications current

### 2. Professional Photos
- Use high-quality headshot
- Professional attire
- Good lighting
- Friendly expression

### 3. Achievement-Focused
- Highlight impact and results
- Use metrics and numbers
- Show progression
- Demonstrate leadership

### 4. SEO Optimization
- Update keywords when changing roles
- Keep meta descriptions relevant
- Use industry terminology
- Include location for local search

### 5. Regular Maintenance
- Fix broken links
- Update project links
- Remove outdated projects
- Keep certifications fresh

---

## 💡 Next Steps

1. **Update your info** - Change name, title, company
2. **Add your photo** - Replace profile.jpg
3. **Update experience** - Edit data/experience.json
4. **Update skills** - Edit data/skills.json
5. **Test on mobile** - Check responsive design
6. **Share portfolio** - Send URL to recruiters

---

## 🔗 Useful Resources

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **JSON Validator:** https://jsonlint.com
- **Image Compressor:** https://tinypng.com
- **Markdown Guide:** https://www.markdownguide.org

---

## 📞 Questions?

Check the [FAQ](FAQ.md) for common questions or see [CHANGELOG](CHANGELOG.md) for recent updates.

**Last Updated:** February 27, 2026

---

**Ready to customize?** Start with updating `data/experience.json`! 🚀
