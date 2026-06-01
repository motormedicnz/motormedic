# MotorMedic Next.js Migration - Checkpoint 1: File & Component Analysis

## Project Overview
This is a MotorMedic (car workshop) landing page built with React + Vite that needs to be migrated to Next.js 16. Currently mixing React patterns with Next.js structure.

---

## 📊 CURRENT STATE ANALYSIS

### Directory Issues Found:
1. **Multiple tsconfig files** (redundant):
   - `tsconfig.json` ✓ (keep)
   - `tsconfig.json` (backup) → DELETE
   - `tsconfig.app.json` → DELETE
   - `tsconfig.node.json` → DELETE

2. **Multiple package files** (redundant):
   - `package.json` ✓ (keep)
   - `package (1).json` → DELETE

3. **Multiple postcss configs** (redundant):
   - `postcss.config.js` or `postcss.config.mjs` → keep ONE
   - Remove duplicates

4. **Unused Vite/React files**:
   - `index.html` → DELETE (Next.js generates this)
   - `vite.config.ts` → DELETE (not needed for Next.js)
   - `vitest.config.ts` → DELETE (not needed currently)
   - `App.tsx` in `/app` → MERGE INTO `page.tsx`
   - `main.tsx` → DELETE (Next.js entry is automatic)
   - `vite-env.d.ts` → DELETE
   - `App.css` → MERGE INTO `globals.css`
   - `index.css` → MERGE INTO `globals.css`

---

## 🎯 REQUIRED FILES & COMPONENTS

### Core Next.js Files (Already Exist):
- ✅ `app/layout.tsx` - Root layout (GOOD, needs metadata update)
- ✅ `app/page.tsx` - Home page (GOOD, imports are correct)
- ✅ `next.config.ts` - Next config (GOOD)
- ✅ `tailwind.config.ts` - Tailwind config (GOOD)
- ✅ `tsconfig.json` - TypeScript config (GOOD, needs cleanup)

### Missing Core Files (Need to Create):
- ❌ `lib/utils.ts` - Utility functions (cn(), etc.) - **REQUIRED**

### Page Components (Ready to Use):
1. **Navigation**
   - `app/components/Navbar.tsx` ✓ (uses React hooks, needs client directive)
   - `app/components/NavLink.tsx` ✓ (utility component)

2. **Hero Section**
   - `app/components/home/Hero.tsx` ✓ (uses image from @/assets)
   - **Issue**: Image import path `@/assets/hero-workshop.jpg` → needs adjustment

3. **Services Section**
   - `app/components/serices/Services.tsx` ✓ (note: typo in folder "serices")
   - **Fix**: Rename to `services/Services.tsx`

4. **Footer**
   - `app/components/footer/Footer.tsx` ✓

### UI Component Library (Shadcn/UI):
Only **3 needed** for this project:
- ✅ `app/components/ui/button.tsx` - Used in Hero, Navbar, Footer
- ❌ `sonner.tsx` - imported but not used visually (keep for potential use)
- ❌ `toaster.tsx` - imported but not used visually (keep for potential use)

**Remove all other unused UI components** (accordion, alert, avatar, badge, breadcrumb, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input-otp, input, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, switch, table, tabs, textarea, toggle-group, toggle, tooltip, use-toast)

### CSS Files:
- ✅ `app/globals.css` - Global styles (GOOD structure, needs theme variables)
- ❌ `app/App.css` - DELETE (merge into globals.css)
- ❌ `app/index.css` - DELETE (merge into globals.css)

### Public Assets:
- ✅ `public/hero-workshop/hero-workshop.jpg` - Hero background image

---

## 🛠️ DEPENDENCY ANALYSIS

### Current package.json:
```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### REQUIRED Additions:
```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.0",  // for button variants
    "clsx": "^2.0.0",                       // for cn() utility
    "tailwind-merge": "^2.0.0",             // for cn() utility
    "lucide-react": "^latest"                // already used, verify installed
  }
}
```

### REMOVE (React-specific):
- ❌ `@tanstack/react-query` - in old App.tsx (remove)
- ❌ `react-router-dom` - in old App.tsx (remove)
- ❌ `@radix-ui/*` - unused in UI components (remove)

---

## 📁 FILE MAPPING & MIGRATION PLAN

### DELETE (Cleanup):
```
- app/App.tsx
- app/App.css
- app/index.css
- app/main.tsx
- app/vite-env.d.ts
- index.html
- vite.config.ts
- vitest.config.ts
- tsconfig.app.json
- tsconfig.node.json
- tsconfig (1).json
- package (1).json
- postcss.config.js OR postcss.config.mjs (keep ONE)
- app/components/ui/* (all except button.tsx, sonner.tsx, toaster.tsx)
- app/components/NavLink.tsx (if not used)
```

### RENAME/RESTRUCTURE:
```
- app/serices/ → app/components/services/
- @/assets/ path → @/public/ (use Next.js public folder)
```

### CREATE:
```
- lib/utils.ts (cn() function)
```

### COMPONENTS REQUIRED FOR UI:
```
app/
├── layout.tsx              ✓ Root layout
├── page.tsx               ✓ Home page (index)
├── globals.css            ✓ Global styles
├── components/
│   ├── Navbar.tsx         ✓ Navigation (add "use client")
│   ├── home/
│   │   └── Hero.tsx       ✓ Hero section (add "use client")
│   ├── services/
│   │   └── Services.tsx   ✓ Services section
│   ├── footer/
│   │   └── Footer.tsx     ✓ Footer
│   └── ui/
│       ├── button.tsx     ✓ Button component
│       ├── sonner.tsx     ✓ Toast notifications
│       └── toaster.tsx    ✓ Toast notifications
├── favicon.ico            ✓ Favicon
└── next-env.d.ts          ✓ Next env types
```

---

## 🔑 KEY CHANGES NEEDED

### 1. **Client vs Server Components**:
   - Components with `useState`, `useEffect` need `"use client"` directive
   - Affected: Navbar.tsx, Hero.tsx (if any hooks)

### 2. **Import Paths**:
   - `@/assets/` → Use `public/` folder directly in Next.js
   - Update image imports to use Next.js Image component (optional, can use img)

### 3. **Missing Utility File**:
   - Create `lib/utils.ts` with `cn()` function:
   ```typescript
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```

### 4. **Theme Variables**:
   - Verify `globals.css` has all CSS custom properties:
   - `--background`, `--foreground`, `--primary`, `--primary-foreground`, etc.

### 5. **Remove React-specific Patterns**:
   - Remove BrowserRouter, Routes setup
   - Remove QueryClient setup
   - All routing handled by Next.js App Router

---

## 📋 SUMMARY TABLE

| File | Status | Action | Priority |
|------|--------|--------|----------|
| app/layout.tsx | ✓ Good | Minor metadata update | HIGH |
| app/page.tsx | ✓ Good | No changes needed | HIGH |
| app/components/Navbar.tsx | ⚠️ Needs directive | Add "use client" | HIGH |
| app/components/home/Hero.tsx | ⚠️ Image import | Fix path to public | HIGH |
| app/components/services/Services.tsx | ✓ Good | Rename folder | MEDIUM |
| app/components/footer/Footer.tsx | ✓ Good | No changes | HIGH |
| app/components/ui/button.tsx | ✓ Good | No changes | HIGH |
| app/globals.css | ✓ Good | Verify variables | MEDIUM |
| lib/utils.ts | ❌ Missing | Create file | HIGH |
| tailwind.config.ts | ✓ Good | Verify paths | LOW |
| package.json | ⚠️ Incomplete | Add missing deps | HIGH |
| Other tsconfig files | ❌ Duplicates | Delete | LOW |
| index.html, vite.config.ts, etc | ❌ Unused | Delete | LOW |

---

## ✅ CHECKPOINT 1 COMPLETE

**Next Steps (Checkpoint 2):**
1. Delete unused files
2. Create `lib/utils.ts`
3. Update imports and component directives
4. Fix image paths
5. Verify CSS variables
6. Update package.json with missing dependencies
7. Test build and run

