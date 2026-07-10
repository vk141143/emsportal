# People Hub Pro - Employee Management System

A modern, full-featured employee management portal built with React, TypeScript, and TanStack technologies.

## 🎯 Features

### Admin Dashboard
- **Attendance Management**: Detailed attendance tracking with date filters, location coordinates, and analytics
- **Payroll Management**: Employee salary management with components, grades, and detailed employee profiles
- **Performance Reviews**: Review cycles, goals tracking, KPIs, and rating distribution
- **Audit Logs**: Employee check-in/check-out logs with location mapping
- **Integrations**: Third-party service management and SMTP configuration

### Employee Portal
- Personal dashboard
- Leave management
- Attendance records
- Performance reviews
- Document management

### HR Portal
- Recruitment management
- Employee onboarding
- Leave approvals
- Performance management

### Manager Portal
- Team management
- Performance reviews
- Leave approvals
- Team analytics

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd people-hub-pro-main

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
# or
bun run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Shadcn UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
│   ├── mock-data.ts   # Mock data for development
│   ├── auth.tsx       # Authentication logic
│   └── utils.ts       # Utility functions
├── routes/            # Page components
│   ├── admin/         # Admin pages
│   ├── employee/      # Employee pages
│   ├── hr/            # HR pages
│   └── manager/       # Manager pages
├── styles.css         # Global styles
├── router.tsx         # Route configuration
└── start.ts           # Application entry point
```

## 🎨 UI Components

Built with Shadcn UI and Radix UI:
- Cards, Buttons, Inputs
- Dialogs, Dropdowns, Tabs
- Tables, Progress bars
- Badges, Tooltips
- And more...

## 📊 Charts & Visualization

- Recharts for data visualization
- Area charts, bar charts, and more
- Responsive and interactive

## 🔐 Authentication

Mock authentication system with role-based access:
- Admin
- HR
- Manager
- Employee

## 🌐 Deployment

### Netlify Deployment

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Set Environment Variables**
   - Add variables from `.env.example`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_APP_NAME=People Hub Pro
VITE_API_URL=https://api.example.com
VITE_ENVIRONMENT=production
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 📦 Dependencies

### Core
- React 19
- TypeScript
- TanStack Router
- TanStack Query
- TanStack Start

### UI & Styling
- Tailwind CSS
- Shadcn UI
- Radix UI
- Lucide Icons

### Forms & Validation
- React Hook Form
- Zod

### Charts
- Recharts

### Utilities
- date-fns
- clsx
- tailwind-merge

## 🔄 Recent Updates

### Attendance Page
- ✅ Removed graph visualization
- ✅ Added date filter
- ✅ Detailed table format
- ✅ View popup with analytics and leave history

### Payroll Page
- ✅ New Employees tab with filters
- ✅ Detailed employee view popup
- ✅ Salary components breakdown
- ✅ Assets and projects tracking

### Performance Page
- ✅ Employee performance table
- ✅ Detailed performance popup
- ✅ Goals and KPIs tracking
- ✅ Rating distribution

### Audit Page
- ✅ Employee check-in/check-out logs
- ✅ Location coordinates with Google Maps
- ✅ Distance calculation
- ✅ Separate tabs for events and logs

## 🎯 Website Icon

The application uses a professional company icon as the favicon. The icon is automatically served from the `public/favicon.ico` file.

## 📱 Responsive Design

- Mobile-first approach
- Fully responsive layouts
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🔒 Security

- HTTPS enabled on Netlify
- Security headers configured
- XSS protection
- CSRF protection
- Secure authentication

## 📈 Performance

- Optimized bundle size
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies

## 🐛 Troubleshooting

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`
- Check Node version: `node --version`

### Development Issues
- Clear browser cache
- Restart dev server
- Check console for errors

### Deployment Issues
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting

## 📞 Support

For issues or questions:
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review the [Netlify documentation](https://docs.netlify.com)
- Check [TanStack documentation](https://tanstack.com)

## 📄 License

This project is proprietary and confidential.

## 👥 Team

Developed for Inner Circle - Employee Management Solutions

---

**Ready to deploy?** Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide for step-by-step instructions.
