# 🚀 Deployment Commands - Quick Reference

## Pre-Deployment

### Install Dependencies
```bash
npm install
```

### Verify Build
```bash
npm run build
npm run preview
```

### Check Code Quality
```bash
npm run lint
npm run format
```

---

## Deployment to Netlify

### Option 1: Git-Based Deployment (Recommended)

```bash
# 1. Commit all changes
git add .
git commit -m "Ready for Netlify deployment - Google icon added"

# 2. Push to main branch
git push origin main

# 3. Go to https://app.netlify.com
# 4. Click "New site from Git"
# 5. Select your repository
# 6. Netlify auto-detects build settings
# 7. Add environment variables
# 8. Deploy!
```

### Option 2: Netlify CLI

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Deploy to production
netlify deploy --prod
```

### Option 3: Manual Deployment

```bash
# 1. Build the project
npm run build

# 2. Go to https://app.netlify.com/drop
# 3. Drag and drop the 'dist' folder
# 4. Your site is live!
```

---

## Environment Variables to Add

In Netlify Dashboard → Site settings → Build & deploy → Environment:

```
VITE_APP_NAME=People Hub Pro
VITE_API_URL=https://api.example.com
VITE_ENVIRONMENT=production
VITE_ENABLE_ANALYTICS=true
```

---

## Post-Deployment Verification

### Test Live Site
```bash
# Visit your Netlify URL
# Check:
# ✅ Google icon displays in sidebar
# ✅ All pages load
# ✅ Navigation works
# ✅ Filters work
# ✅ Popups open
# ✅ Responsive on mobile
```

### Monitor Performance
```bash
# Check Netlify dashboard for:
# ✅ Build status
# ✅ Deployment logs
# ✅ Performance metrics
# ✅ Error tracking
```

---

## Troubleshooting Commands

### Clear Cache and Reinstall
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run build
```

### Check Node Version
```bash
node --version
# Should be 20 or higher
```

### View Build Logs
```bash
# In Netlify Dashboard:
# Deploys → Select deployment → View logs
```

### Rollback to Previous Version
```bash
# In Netlify Dashboard:
# Deploys → Select previous deployment → Publish deploy
```

---

## Development Commands

### Start Dev Server
```bash
npm run dev
# Visit http://localhost:5173
```

### Build for Production
```bash
npm run build
# Output: dist/
```

### Preview Production Build
```bash
npm run preview
# Visit http://localhost:4173
```

### Format Code
```bash
npm run format
```

### Lint Code
```bash
npm run lint
```

---

## Git Commands

### Check Status
```bash
git status
```

### Add All Changes
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Your message here"
```

### Push to Repository
```bash
git push origin main
```

### View Commit History
```bash
git log --oneline
```

---

## Netlify CLI Commands

### Login
```bash
netlify login
```

### Deploy to Production
```bash
netlify deploy --prod
```

### Deploy Preview
```bash
netlify deploy
```

### View Site Info
```bash
netlify sites:list
```

### Open Site
```bash
netlify open:site
```

---

## Quick Deployment Workflow

```bash
# 1. Make changes to code
# 2. Test locally
npm run dev

# 3. Build and verify
npm run build
npm run preview

# 4. Format and lint
npm run format
npm run lint

# 5. Commit and push
git add .
git commit -m "Feature: Add Google icon"
git push origin main

# 6. Netlify automatically deploys!
# 7. Visit your Netlify URL to verify
```

---

## Environment Setup

### Create .env File
```bash
# Copy from template
cp .env.example .env

# Edit with your values
nano .env
# or
code .env
```

### Required Variables
```env
VITE_APP_NAME=People Hub Pro
VITE_API_URL=https://api.example.com
VITE_ENVIRONMENT=production
```

---

## Performance Optimization

### Check Bundle Size
```bash
npm run build
# Check dist/ folder size
ls -lh dist/
```

### Analyze Bundle
```bash
# Use Vite's built-in analyzer
npm run build -- --analyze
```

---

## Monitoring & Maintenance

### View Netlify Logs
```bash
netlify logs:functions
```

### Check Site Status
```bash
netlify status
```

### View Environment Variables
```bash
netlify env:list
```

---

## Useful Links

- 📖 [Netlify Docs](https://docs.netlify.com)
- 🆘 [Netlify Support](https://support.netlify.com)
- 💬 [Netlify Community](https://community.netlify.com)
- 📚 [TanStack Docs](https://tanstack.com)
- 🎨 [React Docs](https://react.dev)

---

## Common Issues & Solutions

### Build Fails
```bash
# Solution 1: Clear cache
npm cache clean --force

# Solution 2: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Solution 3: Check Node version
node --version  # Should be 20+
```

### Site Shows 404
```bash
# Check netlify.toml
cat netlify.toml

# Verify dist folder exists
ls -la dist/
```

### Environment Variables Not Working
```bash
# 1. Verify in Netlify dashboard
# 2. Ensure names start with VITE_
# 3. Redeploy after adding variables
netlify deploy --prod
```

### Icon Not Showing
```bash
# 1. Clear browser cache
# Ctrl+Shift+Delete (Windows/Linux)
# Cmd+Shift+Delete (Mac)

# 2. Hard refresh
# Ctrl+F5 (Windows/Linux)
# Cmd+Shift+R (Mac)

# 3. Check URL is accessible
curl "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6ae8sAY6zsQcO3SQoRg24Zf712ePeqvGJq0lrOZAHg&s"
```

---

## Deployment Checklist

```bash
# Pre-deployment
[ ] npm install
[ ] npm run build
[ ] npm run preview
[ ] npm run lint
[ ] npm run format
[ ] git status (no uncommitted changes)

# Deployment
[ ] git add .
[ ] git commit -m "message"
[ ] git push origin main
[ ] Netlify build starts automatically
[ ] Check Netlify dashboard for build status

# Post-deployment
[ ] Visit live URL
[ ] Check Google icon displays
[ ] Test all pages
[ ] Verify responsive design
[ ] Check console for errors
```

---

## Quick Start (5 Minutes)

```bash
# 1. Install (1 min)
npm install

# 2. Build & Test (2 min)
npm run build
npm run preview

# 3. Deploy (2 min)
git add .
git commit -m "Ready for deployment"
git push origin main
# Then connect to Netlify via dashboard
```

---

**Ready to deploy? Start with the Quick Start above! 🚀**
