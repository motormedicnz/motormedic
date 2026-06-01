# MotorMedic Next.js Setup Guide

**Project**: Next.js 16 Landing Page for MotorMedic (Premium Car Workshop)  
**Framework**: Next.js 16.2.6 + React 19.2.4 + TypeScript + Tailwind CSS 4  
**Status**: Migration from Vite + React ➜ Next.js App Router

---

## 📋 Checkpoint 1: Analysis Complete ✓

**See `CHECKPOINT_1.md` for detailed file analysis and mapping**

---

## 🗺️ Project Structure (After Migration)

```
motor-medic/
├── app/
│   ├── layout.tsx                    # Root layout (metadata, html setup)
│   ├── page.tsx                      # Home page (/)
│   ├── globals.css                   # Global styles + CSS variables
│   ├── favicon.ico
│   ├── next-env.d.ts
│   └── components/
│       ├── Navbar.tsx                # Navigation bar (client component)
│       ├── home/
│       │   └── Hero.tsx              # Hero section (client component)
│       ├── services/
│       │   └── Services.tsx          # Services grid section
│       ├── footer/
│       │   └── Footer.tsx            # Footer with contact info
│       └── ui/
│           ├── button.tsx            # Reusable button with variants
│           ├── sonner.tsx            # Toast notifications
│           └── toaster.tsx           # Toast UI component
├── lib/
│   └── utils.ts                      # Utility functions (cn, etc)
├── public/
│   ├── hero-workshop/
│   │   └── hero-workshop.jpg
│   ├── file.svg
│   ├── globe.svg
│   └── ... (other assets)
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies & scripts
├── postcss.config.mjs                # PostCSS configuration
├── components.json                   # Shadcn CLI config
├── eslint.config.mjs                 # ESLint configuration
├── README.md
└── CHECKPOINT_1.md                   # Detailed analysis
```

---

## 📦 Dependencies Overview

### Core
- **next**: 16.2.6 - React framework
- **react**: 19.2.4 - UI library
- **react-dom**: 19.2.4 - DOM rendering

### Styling
- **tailwindcss**: ^4 - Utility-first CSS
- **@tailwindcss/postcss**: ^4 - Tailwind PostCSS
- **postcss**: (implicit) - CSS processing
- **tailwind-merge**: ^2.0.0 - Merge Tailwind classes
- **clsx**: ^2.0.0 - Conditional CSS classes

### Component Library
- **class-variance-authority**: ^0.7.0 - Component variants
- **lucide-react**: Latest - Icon library
- **@radix-ui/react-slot**: (for button asChild prop)

### Development
- **typescript**: ^5 - Type safety
- **@types/node**: ^20 - Node types
- **@types/react**: ^19 - React types
- **@types/react-dom**: ^19 - React DOM types
- **eslint**: ^9 - Linting
- **eslint-config-next**: 16.2.6 - Next.js ESLint config

---

## 🎨 Design System

### Color Scheme (CSS Variables)
Located in `app/globals.css`:

**Light Mode:**
- Background: #ffffff
- Foreground: #171717
- Primary: [Gradient color - red/orange]
- Secondary: [Neutral gray]
- Muted: [Light gray]

**Dark Mode:**
- Background: #0a0a0a
- Foreground: #ededed
- (Other colors adjust accordingly)

### Custom Utilities (Tailwind)
- `container`: Centered, max-width 1400px
- `font-display`: 'Bebas Neue' for headings
- `text-gradient-primary`: Primary gradient text
- `bg-gradient-primary`: Primary gradient background
- `shadow-glow`: Custom glow shadow
- `animate-fade-up`: Fade up animation
- `animate-pulse-glow`: Pulsing glow effect

### Responsive Breakpoints (Standard Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px (custom: 1400px)

---

## 🛠️ Key Components

### 1. **Navbar** (`app/components/Navbar.tsx`)
- Fixed header with scroll effect
- Mobile hamburger menu
- Navigation links: Home, Services, About, Contact
- "Book Now" CTA button
- **Client Component**: Yes (useState, useEffect)

### 2. **Hero Section** (`app/components/home/Hero.tsx`)
- Full-screen hero with background image
- Large heading with gradient text
- Location badge with glow effect
- Two CTA buttons (primary + outline)
- Stats display (15+ years, 4.9★, 12k+ cars)
- **Client Component**: No (can be Server Component)

### 3. **Services** (`app/components/services/Services.tsx`)
- 8-service grid layout
- Service cards with icons (from lucide-react)
- Hover animations
- Responsive: 2 cols (sm), 4 cols (lg)
- **Client Component**: No (can be Server Component)

### 4. **Footer** (`app/components/footer/Footer.tsx`)
- Brand/Logo section with social links
- Visit Us section with address
- Contact section (phone, email)
- Hours of operation
- Trusted brands strip
- Copyright footer
- **Client Component**: No (can be Server Component)

### 5. **Button** (`app/components/ui/button.tsx`)
- Reusable button component with variants:
  - `default`: Standard button
  - `hero`: Red gradient with glow
  - `silver`: Silver gradient
  - `outlineGlow`: Outline with glow
  - `ghost`: Transparent on hover
  - etc.
- Sizes: `sm`, `default`, `lg`, `xl`, `icon`
- Supports `asChild` for rendering as link or other element

### 6. **Utility Function** (`lib/utils.ts`)
```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
Merges and deduplicates Tailwind CSS classes.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

### 4. Linting
```bash
npm run lint
```

---

## 📝 Key Files Explanation

### `app/layout.tsx` - Root Layout
- Sets up HTML document structure
- Imports Google fonts (Geist Sans, Geist Mono)
- Applies CSS variables for fonts
- Wraps children with body element
- Contains metadata (title, description)

### `app/page.tsx` - Home Page
- Imports all main components
- Renders: Navbar → Hero → Services → Footer
- Uses main element with responsive background classes

### `app/globals.css` - Global Styles
- Imports Tailwind CSS
- Defines CSS custom properties (colors, gradients, shadows)
- Sets up light/dark mode
- Base typography and body styling

### `tailwind.config.ts` - Tailwind Configuration
- Extends default colors with custom variables
- Adds custom animations (fade-up, pulse-glow)
- Defines gradient backgrounds
- Sets custom border radius and fonts
- Includes tailwindcss-animate plugin

### `tsconfig.json` - TypeScript Config
- Target: ES2017
- Module resolution: bundler
- Path aliases: `@/*` → root directory
- Strict mode enabled
- Supports JSX: react-jsx

---

## 🎯 Development Workflow

### Adding New Pages
1. Create new file in `app/` folder (e.g., `app/about/page.tsx`)
2. Next.js automatically creates route (`/about`)
3. Use layout inheritance for consistent styling

### Adding New Components
1. Create in `app/components/` folder
2. Use `"use client"` directive for interactive components
3. Import in pages or other components

### Updating Styles
- Global: Edit `app/globals.css`
- Components: Add `className` to JSX elements
- Tailwind classes apply automatically

### Adding Dependencies
```bash
npm install <package-name>
```
Then import and use in components.

---

## ✨ Special Features

### Image Optimization
- Use `next/image` Image component for automatic optimization
- Currently using standard `<img>` tag (can upgrade)
- Images in `public/` folder served as static assets

### Dark Mode
- Configured in Tailwind via `darkMode: ["class"]`
- Automatically switches based on OS preference or manual toggle
- CSS variables adjust in `@media (prefers-color-scheme: dark)`

### Performance
- Next.js automatic code splitting
- Server-side rendering by default
- Client components only where needed
- Static optimization for images and fonts

### Animations
- Custom Tailwind keyframes for fade-up and pulse-glow
- Hardware-accelerated transforms
- GPU-optimized transitions

---

## 🔍 Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript: `npm run build`

### Styling Issues
- Verify Tailwind paths in `tailwind.config.ts`
- Check CSS variable names in `globals.css`
- Use browser DevTools to inspect computed styles

### Component Import Issues
- Use `@/` path alias for imports
- Ensure file extensions `.tsx` or `.ts` are correct
- Check `"use client"` directive on client components

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)

---

## 📋 Checklist for Completion

### Phase 1: File Cleanup ✓
- [ ] Delete unused files (App.tsx, index.html, vite.config.ts, etc.)
- [ ] Create `lib/utils.ts`
- [ ] Rename `serices/` → `services/`
- [ ] Remove duplicate config files

### Phase 2: Component Updates ✓
- [ ] Add `"use client"` to Navbar.tsx
- [ ] Fix image imports in Hero.tsx
- [ ] Verify all component imports
- [ ] Remove unused UI components

### Phase 3: Configuration ✓
- [ ] Update package.json dependencies
- [ ] Verify CSS variables in globals.css
- [ ] Test tailwind.config.ts
- [ ] Verify tsconfig.json paths

### Phase 4: Testing ✓
- [ ] Run `npm run dev`
- [ ] Check all pages load
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify all links work
- [ ] Test dark mode toggle

### Phase 5: Deployment Ready ✓
- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] Performance optimized

---

## 📞 Support

For issues or questions:
1. Check `CHECKPOINT_1.md` for detailed analysis
2. Review file mappings and component structure
3. Consult the troubleshooting section
4. Check Next.js and Tailwind documentation

---

**Last Updated**: May 2026  
**Status**: Ready for Phase 2 - Component Updates  

