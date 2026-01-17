# Deployment Instructions for GitHub Pages

## Quick Setup Guide

### 1. Fork & Clone
```bash
# Fork this repository on GitHub, then clone it
git clone https://github.com/YOURUSERNAME/my-first-job.git
cd my-first-job
```

### 2. Customize Content
- Update `index.html` with your personal information
- Replace placeholder email/social links in `contact.html`
- Modify project descriptions and skills
- Update README.md with your GitHub username

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select "Deploy from a branch"
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### 4. Access Your Site
Your portfolio will be available at:
```
https://YOURUSERNAME.github.io/my-first-job/
```

## File Structure for GitHub Pages

```
my-first-job/
├── index.html          # Main portfolio page (required)
├── about.html          # About page
├── contact.html        # Contact page  
├── demo.html           # Demo application
├── README.md           # Project documentation
├── public/
│   ├── css/style.css   # Custom styles
│   ├── js/app.js       # JavaScript functionality
│   └── js/main.js      # Additional scripts
└── views/              # EJS templates (for local Node.js demo)
```

## Important Notes

### ✅ Correct Paths for GitHub Pages
- Use relative paths: `href="about.html"` ✅
- Not absolute paths: `href="/about.html"` ❌

### ✅ Working Links
- All navigation links point to existing files
- External CDN resources (Bootstrap, Font Awesome) load correctly
- CSS and JS files use relative paths

### ✅ Responsive Design
- Mobile-friendly navigation
- Bootstrap grid system
- Tested on multiple screen sizes

## Troubleshooting

### Site Not Loading?
1. Check that `index.html` exists in root directory
2. Verify GitHub Pages is enabled in Settings
3. Wait 5-10 minutes for deployment

### Broken Links?
1. Ensure all linked files exist
2. Use relative paths (no leading `/`)
3. Check file names match exactly (case-sensitive)

### CSS/JS Not Loading?
1. Verify files exist in `public/` folder
2. Check paths in HTML files
3. Ensure no typos in file names

## Customization Checklist

- [ ] Update personal information in `index.html`
- [ ] Replace email/social links in `contact.html`
- [ ] Modify project descriptions
- [ ] Update skills and technologies
- [ ] Replace placeholder GitHub username in README
- [ ] Test all links and navigation
- [ ] Verify responsive design on mobile

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all file paths are correct
3. Ensure GitHub Pages is properly configured
4. Test locally first using a simple HTTP server

---

**Ready to deploy? Your portfolio will showcase your web development skills!** 🚀