# File & Component Mapping Reference

## 🎯 QUICK REFERENCE - Components Used in UI

### Dependency Tree

```
page.tsx (HOME PAGE)
├── Navbar.tsx ⭐ CLIENT
│   └── Button (variant: "hero", "outlineGlow")
│
├── Hero.tsx (home/)
│   ├── Image: public/hero-workshop/hero-workshop.jpg
│   ├── Button (variant: "hero", "outlineGlow")
│   └── Lucide Icons: ArrowRight, PhoneCall, MapPin
│
├── Services.tsx (services/)
│   └── Lucide Icons: Wrench, Gauge, Cog, Battery, Disc3, ShieldCheck, Sparkles, Car
│       └── Service Cards (8 total)
│
└── Footer.tsx (footer/)
    ├── Lucide Icons: MapPin, Phone, Mail, Clock, Wrench, Instagram, Facebook
    └── Brand logos (text)
```

---

## 📁 FILE STATUS MATRIX

### ✅ KEEP (Core Next.js Files)

| File | Type | Location | Status | Changes |
|------|------|----------|--------|---------|
| `layout.tsx` | Page | `app/` | ✅ Ready | Update metadata title |
| `page.tsx` | Page | `app/` | ✅ Ready | No changes |
| `Navbar.tsx` | Component | `app/components/` | ⚠️ Update | Add `"use client"` |
| `Hero.tsx` | Component | `app/components/home/` | ⚠️ Update | Fix image import path |
| `Services.tsx` | Component | `app/components/services/` | ✅ Ready | Rename folder `serices/→services/` |
| `Footer.tsx` | Component | `app/components/footer/` | ✅ Ready | No changes |
| `button.tsx` | UI Comp | `app/components/ui/` | ✅ Ready | No changes |
| `sonner.tsx` | UI Comp | `app/components/ui/` | ✅ Ready | Keep for notifications |
| `toaster.tsx` | UI Comp | `app/components/ui/` | ✅ Ready | Keep for notifications |
| `globals.css` | Styles | `app/` | ✅ Ready | Verify CSS vars |
| `tailwind.config.ts` | Config | `root` | ✅ Ready | No changes |
| `next.config.ts` | Config | `root` | ✅ Ready | No changes |
| `tsconfig.json` | Config | `root` | ✅ Ready | Verify paths |
| `package.json` | Config | `root` | ⚠️ Update | Add missing deps |
| `postcss.config.mjs` | Config | `root` | ✅ Ready | Keep ONE only |

### ❌ DELETE (Unused Files)

| File | Reason | Safety |
|------|--------|--------|
| `App.tsx` | React app entry (not needed in Next.js) | SAFE |
| `main.tsx` | Vite entry point (not needed) | SAFE |
| `index.html` | Vite HTML (Next.js generates this) | SAFE |
| `vite.config.ts` | Vite config (not used) | SAFE |
| `vitest.config.ts` | Vitest config (not used) | SAFE |
| `vite-env.d.ts` | Vite types (not needed) | SAFE |
| `App.css` | Merge into globals.css | SAFE |
| `index.css` | Merge into globals.css | SAFE |
| `tsconfig.app.json` | Redundant | SAFE |
| `tsconfig.node.json` | Redundant | SAFE |
| `tsconfig (1).json` | Backup file | SAFE |
| `package (1).json` | Backup file | SAFE |
| `postcss.config.js` | Keep only .mjs | SAFE |
| **All other UI components** | Not used in design | SAFE |

### 🆕 CREATE (Missing Essential Files)

| File | Purpose | Content |
|------|---------|---------|
| `lib/utils.ts` | Utility functions | `cn()` class merger |

---

## 🎨 UI COMPONENTS - WHAT'S USED

### ✅ IN USE:
- `button.tsx` - All buttons in navbar, hero, services, footer
- `sonner.tsx` - Toast notifications (can be used)
- `toaster.tsx` - Toast UI (can be used)

### ❌ NOT USED (Can Remove):
```
accordion.tsx          - Not needed
alert.tsx              - Not needed
alert-dialog.tsx       - Not needed
avatar.tsx             - Not needed
badge.tsx              - Not needed
breadcrumb.tsx         - Not needed
calendar.tsx           - Not needed
card.tsx               - Not needed
carousel.tsx           - Not needed
chart.tsx              - Not needed
checkbox.tsx           - Not needed
collapsible.tsx        - Not needed
command.tsx            - Not needed
context-menu.tsx       - Not needed
dialog.tsx             - Not needed
drawer.tsx             - Not needed
dropdown-menu.tsx      - Not needed
form.tsx               - Not needed
hover-card.tsx         - Not needed
input.tsx              - Not needed
input-otp.tsx          - Not needed
label.tsx              - Not needed
menubar.tsx            - Not needed
navigation-menu.tsx    - Not needed
pagination.tsx         - Not needed
popover.tsx            - Not needed
progress.tsx           - Not needed
radio-group.tsx        - Not needed
resizable.tsx          - Not needed
scroll-area.tsx        - Not needed
select.tsx             - Not needed
separator.tsx          - Not needed
sheet.tsx              - Not needed
sidebar.tsx            - Not needed
skeleton.tsx           - Not needed
slider.tsx             - Not needed
switch.tsx             - Not needed
table.tsx              - Not needed
tabs.tsx               - Not needed
textarea.tsx           - Not needed
toggle.tsx             - Not needed
toggle-group.tsx       - Not needed
tooltip.tsx            - Not needed
use-toast.ts           - Not needed
```

---

## 🔄 IMPORT PATH MAPPING

### Current (React/Vite):
```typescript
import { cn } from "@/lib/utils";        // ❌ MISSING FILE
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-workshop.jpg";  // ❌ PATH ERROR
```

### New (Next.js):
```typescript
import { cn } from "@/lib/utils";        // ✅ CREATE THIS
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// Image in public folder, use:
// <img src="/hero-workshop/hero-workshop.jpg" />
// OR use Next.js Image component:
// import Image from "next/image";
```

---

## 🎯 CLIENT vs SERVER COMPONENTS

### Client Components (Need `"use client"`):
- `Navbar.tsx` - Uses `useState`, `useEffect` for scroll & menu
- Any component with hooks, event listeners, browser APIs

### Server Components (Default - No directive needed):
- `Hero.tsx` - Pure presentation
- `Services.tsx` - Pure presentation
- `Footer.tsx` - Pure presentation
- Layout files

---

## 📦 PACKAGE.JSON DEPENDENCIES NEEDED

### ✅ Currently Have:
```json
{
  "next": "16.2.6",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.2.6",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

### ⚠️ NEED TO ADD:
```json
{
  "class-variance-authority": "^0.7.0",  // For button variants
  "clsx": "^2.0.0",                       // For conditional classes
  "tailwind-merge": "^2.0.0",             // For cn() utility
  "lucide-react": "^0.263.0"              // For icons (verify version)
}
```

### ❌ MUST REMOVE (React-specific):
```json
{
  "@tanstack/react-query": "DELETE",
  "react-router-dom": "DELETE",
  "@radix-ui/*": "DELETE (NOT USED IN PROJECT)"
}
```

---

## 📊 FOLDER STRUCTURE - BEFORE & AFTER

### BEFORE (Mixed React + Next.js):
```
app/
├── App.tsx                          ← DELETE
├── App.css                          ← DELETE (merge)
├── index.css                        ← DELETE (merge)
├── main.tsx                         ← DELETE
├── vite-env.d.ts                    ← DELETE
├── layout.tsx                       ✓ KEEP
├── page.tsx                         ✓ KEEP
├── globals.css                      ✓ KEEP
├── components/
│   ├── Navbar.tsx                   ✓ UPDATE
│   ├── NavLink.tsx                  ? UNUSED
│   ├── home/
│   │   └── Hero.tsx                 ✓ UPDATE
│   ├── serices/                     ← TYPO! Rename to "services"
│   │   └── Services.tsx             ✓ KEEP
│   ├── footer/
│   │   └── Footer.tsx               ✓ KEEP
│   └── ui/
│       ├── button.tsx               ✓ KEEP
│       ├── sonner.tsx               ✓ KEEP
│       ├── toaster.tsx              ✓ KEEP
│       └── [40+ unused components]  ← DELETE ALL
└── NotFound.tsx                     ? CHECK

index.html                           ← DELETE
vite.config.ts                       ← DELETE
vitest.config.ts                     ← DELETE
tsconfig.json                        ✓ KEEP
tsconfig.app.json                    ← DELETE (redundant)
tsconfig.node.json                   ← DELETE (redundant)
tsconfig (1).json                    ← DELETE (backup)
package.json                         ✓ UPDATE (add deps)
package (1).json                     ← DELETE (backup)
```

### AFTER (Clean Next.js):
```
app/
├── layout.tsx                       ✓
├── page.tsx                         ✓
├── globals.css                      ✓
├── favicon.ico                      ✓
├── next-env.d.ts                    ✓
├── components/
│   ├── Navbar.tsx                   ✓ + "use client"
│   ├── home/
│   │   └── Hero.tsx                 ✓
│   ├── services/                    ✓ RENAMED
│   │   └── Services.tsx             ✓
│   ├── footer/
│   │   └── Footer.tsx               ✓
│   └── ui/
│       ├── button.tsx               ✓
│       ├── sonner.tsx               ✓
│       └── toaster.tsx              ✓

lib/
└── utils.ts                         ✓ NEW

public/
├── hero-workshop/
│   └── hero-workshop.jpg            ✓
├── file.svg                         ✓
├── globe.svg                        ✓
└── ...

next.config.ts                       ✓
tailwind.config.ts                   ✓
tsconfig.json                        ✓
package.json                         ✓ UPDATED
postcss.config.mjs                   ✓
components.json                      ✓
eslint.config.mjs                    ✓
```

---

## 🚦 PRIORITY ORDER FOR CHANGES

### 🔴 CRITICAL (Do First):
1. Create `lib/utils.ts` file
2. Update `package.json` - add missing dependencies
3. Delete `App.tsx` and merge its styles
4. Add `"use client"` to `Navbar.tsx`
5. Fix image paths in `Hero.tsx`

### 🟡 IMPORTANT (Do Second):
6. Delete all unused UI components
7. Rename `serices/` folder to `services/`
8. Delete duplicate config files
9. Verify CSS variables in `globals.css`

### 🟢 OPTIONAL (Do Last):
10. Delete unused support files (vite, vitest configs)
11. Update metadata in `layout.tsx`
12. Optimize images with Next.js Image component
13. Test build and run

---

## ✨ SUMMARY

**Total Files to Keep**: ~15  
**Total Files to Delete**: ~50+  
**Total Files to Create**: 1  
**Total Files to Update**: 3-4

**Result**: Clean, optimized Next.js 16 project with zero bloat!

