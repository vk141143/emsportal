# Deployment Guide - People Hub Pro

## Prerequisites
- Node.js 20+ installed
- npm or bun package manager
- Netlify account (https://netlify.com)
- Git repository (GitHub, GitLab, or Bitbucket)

## Local Setup

### 1. Install Dependencies
```bash
npm install
# or
bun install
```

### 2. Build Locally
```bash
npm run build
# or
bun run build
```

### 3. Preview Build
```bash
npm run preview
# or
bun run preview
```

## Netlify Deployment

### Option 1: Deploy via Git (Recommended)

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Select your Git provider (GitHub, GitLab, Bitbucket)
   - Authorize and select your repository
   - Click "Deploy site"

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20

4. **Set Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add variables from `.env.example`:
     - `VITE_APP_NAME=People Hub Pro`
     - `VITE_API_URL=your-api-url`
     - `VITE_ENVIRONMENT=production`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 3: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Drag and drop the `dist` folder**
   - Go to https://app.netlify.com/drop
   - Drag the `dist` folder to deploy

## Post-Deployment

### 1. Verify Deployment
- Check site URL in Netlify dashboard
- Test all pages and features
- Verify responsive design on mobile

### 2. Configure Custom Domain
- Go to Site settings → Domain management
- Add custom domain
- Update DNS records if needed

### 3. Enable HTTPS
- Automatically enabled by Netlify
- Verify SSL certificate in Site settings

### 4. Set Up Monitoring
- Enable Netlify Analytics (optional)
- Configure error tracking
- Set up performance monitoring

## Troubleshooting

### Build Fails
- Check Node version: `node --version` (should be 20+)
- Clear cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules && npm install`
- Check build logs in Netlify dashboard

### Site Not Loading
- Verify `netlify.toml` configuration
- Check redirect rules
- Clear browser cache
- Test in incognito mode

### Environment Variables Not Working
- Verify variables are set in Netlify dashboard
- Ensure variable names start with `VITE_`
- Redeploy after adding variables
- Check browser console for errors

### Performance Issues
- Enable Netlify Edge Caching
- Optimize images in public folder
- Check bundle size: `npm run build` and review dist folder
- Enable gzip compression (automatic)

## Continuous Deployment

### Automatic Deployments
- Every push to main branch triggers deployment
- Preview deployments for pull requests
- Rollback to previous version if needed

### Manual Rollback
1. Go to Deploys section
2. Select previous deployment
3. Click "Publish deploy"

## Security Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Security headers set (in netlify.toml)
- [ ] API endpoints secured
- [ ] Authentication configured
- [ ] CORS properly configured
- [ ] Sensitive data not in code
- [ ] Dependencies up to date

## Performance Optimization

### Recommended Settings
- Enable Netlify Edge Caching
- Use Netlify Functions for API calls
- Enable Brotli compression
- Minify CSS/JS (automatic)
- Optimize images

### Monitoring
- Set up error tracking
- Monitor Core Web Vitals
- Track deployment performance
- Set up alerts for failures

## Support

For issues or questions:
- Netlify Support: https://support.netlify.com
- Documentation: https://docs.netlify.com
- Community: https://community.netlify.com

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com)
- [TanStack Start Guide](https://tanstack.com/start/latest)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)
