# MotorMedic Project - Visual Component Architecture

## 🏗️ COMPONENT HIERARCHY

```
┌─────────────────────────────────────────────────────────────┐
│                    app/page.tsx (HOME)                       │
│                    ================                           │
│  Renders complete landing page with 4 main sections         │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    ┌────────┐          ┌────────┐         ┌────────┐
    │ Navbar │          │ Hero   │         │Services│
    │ "use   │          │        │         │        │
    │client" │          │        │         │        │
    └────────┘          └────────┘         └────────┘
        │                   │                   │
        │ imports:          │ imports:          │ imports:
        ├─ Button           ├─ Button           ├─ lucide-react
        ├─ lucide-react     ├─ lucide-react     │  icons (8)
        │ (Menu, X)         │ (Arrow, Phone,
        │                   │  MapPin)
        │                   └─ hero-workshop.jpg
        │
        └─ Hook: useState, useEffect
           (For menu toggle, scroll detection)
```

---

## 📄 PAGE LAYOUT BREAKDOWN

### Full Page Structure:
```
┌────────────────────────────────────────────────────┐
│                   HEADER/NAVBAR                     │
│  Fixed • Scroll sensitive • Mobile menu            │
│  MotorMedic Logo | Nav Links | Book Now Button    │
├────────────────────────────────────────────────────┤
│                                                    │
│                  HERO SECTION                      │
│  Full viewport height                             │
│  Background image: hero-workshop.jpg              │
│  Left overlay with content:                       │
│  - Location badge with glow                       │
│  - Large headline (PRECISION CAR CARE REDEFINED)  │
│  - Descriptive text                               │
│  - 2 CTA Buttons (Book / Call)                    │
│  - 3 Stats boxes (15+, 4.9★, 12k+)               │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│              SERVICES SECTION                      │
│  Dark background (gradient-dark)                  │
│  Section Header:                                  │
│  "WHAT WE DO" + "OFFERED SERVICES"               │
│                                                    │
│  8-Service Grid (2 cols mobile → 4 cols desktop): │
│  ┌─────────┬─────────┬─────────┬─────────┐        │
│  │ Service │ Service │ Service │ Service │        │
│  │ Card 1  │ Card 2  │ Card 3  │ Card 4  │        │
│  ├─────────┼─────────┼─────────┼─────────┤        │
│  │ Service │ Service │ Service │ Service │        │
│  │ Card 5  │ Card 6  │ Card 7  │ Card 8  │        │
│  └─────────┴─────────┴─────────┴─────────┘        │
│                                                    │
├────────────────────────────────────────────────────┤
│                   FOOTER                           │
│  Background: background color                     │
│  4 Columns (responsive):                          │
│  1. Brand info + Social icons                     │
│  2. Visit Us (address)                            │
│  3. Contact (phone, email)                        │
│  4. Hours (Mon-Fri, Sat, Sun)                    │
│  Brands strip: TOYOTA, BMW, AUDI, FORD, MAZDA... │
│  Copyright: © 2026 MotorMedic. All rights...     │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 🧩 COMPONENT DETAILS

### 1️⃣ NAVBAR COMPONENT

```
Navbar.tsx (CLIENT COMPONENT - "use client")
├── State:
│   ├── scrolled (boolean) - for background blur effect
│   └── open (boolean) - for mobile menu toggle
│
├── Hooks:
│   └── useEffect() - listens to window scroll event
│
├── Structure:
│   ├── <header> - Fixed position, changes on scroll
│   │   ├── <nav>
│   │   │   ├── Logo + Brand name
│   │   │   │   └── Wrench icon in gradient circle
│   │   │   │
│   │   │   ├── Desktop nav menu
│   │   │   │   ├── Home link
│   │   │   │   ├── Services link
│   │   │   │   ├── About link
│   │   │   │   └── Contact link
│   │   │   │
│   │   │   ├── Book Now button (desktop)
│   │   │   │
│   │   │   └── Mobile hamburger icon
│   │   │
│   │   └── Mobile menu (shown only when open=true)
│   │       ├── All nav links
│   │       └── Book Now button
│   │
│   └── Styling:
│       ├── Transition effects
│       ├── Backdrop blur on scroll
│       ├── Gradient button effect
│       └── Mobile responsive hidden/visible states

Classes Used:
- fixed, top-0, inset-x-0, z-50 (positioning)
- transition-all, duration-500 (animations)
- backdrop-blur-xl (glass effect)
- md:flex, hidden (responsive)
- px-4, py-2, rounded-full (spacing)
```

### 2️⃣ HERO COMPONENT

```
Hero.tsx (SERVER COMPONENT - no "use client" needed)
├── No State/Hooks (pure presentation)
│
├── Imports:
│   ├── lucide-react icons (ArrowRight, PhoneCall, MapPin)
│   ├── Button component
│   └── Hero image
│
├── Structure:
│   └── <section id="home">
│       ├── Background image layer
│       ├── Dark gradient overlays (2 layers)
│       │   └── Darkens image, creates text contrast
│       │
│       └── Content container
│           ├── Location badge
│           │   ├── Pulsing red dot
│           │   ├── MapPin icon
│           │   └── "AUCKLAND, NEW ZEALAND" text
│           │
│           ├── Main heading
│           │   └── "PRECISION CAR CARE REDEFINED"
│           │       (with gradient text effect)
│           │
│           ├── Description paragraph
│           │   └── Premium auto workshop info
│           │
│           ├── Button group
│           │   ├── "Book a Service" (primary)
│           │   └── "Call Workshop" (outline)
│           │
│           └── Stats grid (3 columns)
│               ├── 15+ | YEARS EXPERIENCE
│               ├── 4.9★ | GOOGLE REVIEWS
│               └── 12k+ | CARS SERVICED

Animation:
- animate-fade-up (entry animation)
- hover effects on buttons
- gradient text shimmer

Responsive:
- h1: text-6xl (sm) → text-9xl (lg)
- Button sizes scale with viewport
```

### 3️⃣ SERVICES COMPONENT

```
Services.tsx (SERVER COMPONENT)
├── Data:
│   └── Array of 8 services:
│       [
│         {
│           icon: Lucide Icon,
│           title: "Service Name",
│           desc: "Description"
│         },
│         ... x8
│       ]
│
├── Structure:
│   └── <section id="services">
│       ├── Container
│       │   ├── Section header
│       │   │   ├── "WHAT WE DO" (small label)
│       │   │   ├── "OFFERED SERVICES" (gradient text)
│       │   │   └── Description paragraph
│       │   │
│       │   └── Services grid
│       │       └── Grid: sm:2 cols → lg:4 cols
│       │           └── 8x Service Cards
│       │               ├── Icon (in colored box)
│       │               ├── Title
│       │               ├── Description
│       │               └── Hover effects:
│       │                   ├── Border color change
│       │                   ├── -translate-y (lift up)
│       │                   ├── Glow shadow
│       │                   └── Background glow

Style Classes:
- bg-card, border, rounded-2xl (card)
- group-hover:* (interaction states)
- gap-5, sm:grid-cols-2, lg:grid-cols-4 (grid)
- transition-all, duration-500 (smooth effects)
- p-7 (padding)
```

### 4️⃣ FOOTER COMPONENT

```
Footer.tsx (SERVER COMPONENT)
├── Data:
│   └── Array of 10 brand names
│
├── Structure:
│   └── <footer id="contact">
│       ├── Brands strip (separator)
│       │   ├── "TRUSTED BY DRIVERS OF"
│       │   └── Horizontal scrolling brands:
│       │       TOYOTA, BMW, AUDI, FORD, MAZDA,
│       │       HOLDEN, TESLA, MERCEDES, SUBARU, HYUNDAI
│       │
│       ├── Main footer content (4-column grid)
│       │   ├── Column 1: Brand info
│       │   │   ├── Logo + "MOTORMEDIC"
│       │   │   ├── Description
│       │   │   └── Social icons (Instagram, Facebook)
│       │   │
│       │   ├── Column 2: VISIT US
│       │   │   ├── MapPin icon
│       │   │   ├── 142 Great South Road,
│       │   │   ├── Penrose, Auckland 1061
│       │   │   └── New Zealand
│       │   │
│       │   ├── Column 3: CONTACT
│       │   │   ├── Phone icon + "+64 9 900 0000"
│       │   │   └── Mail icon + "hello@motormedic.co.nz"
│       │   │
│       │   └── Column 4: HOURS
│       │       ├── Clock icon + "Mon – Fri: 7:30 – 18:00"
│       │       ├── Clock icon + "Sat: 8:00 – 14:00"
│       │       └── Clock icon + "Sun: Closed"
│       │
│       └── Copyright section
│           ├── © Year MotorMedic Auckland
│           └── "Built with precision in Tāmaki Makaurau"

Responsive:
- md:grid-cols-4 on desktop → stacked on mobile
- Flexbox for horizontal layouts
```

### 5️⃣ BUTTON COMPONENT (UI Primitive)

```
button.tsx (Generic UI Component)
├── CVA Variants:
│   └── buttonVariants = {
│       variants: {
│         variant: {
│           default: "standard button style",
│           hero: "red gradient + glow",      ← USED
│           silver: "silver gradient",        ← USED
│           outlineGlow: "outline + glow",    ← USED
│           ghost: "transparent",
│           link: "text link",
│           destructive: "red/danger",
│           secondary: "secondary color",
│           outline: "outline only"
│         },
│         size: {
│           sm: "h-9, px-3",
│           default: "h-10, px-4",
│           lg: "h-11, px-8",
│           xl: "h-14, px-10",  ← USED (large CTA)
│           icon: "h-10 w-10"
│         }
│       }
│     }
│
├── Props:
│   └── ButtonProps extends:
│       ├── HTMLButtonAttributes
│       ├── VariantProps
│       └── asChild?: boolean (render as <a>, <Link>, etc)
│
└── Usage Examples:
    ├── <Button variant="hero" size="xl">
    ├── <Button variant="outlineGlow" asChild>
    ├── <Button variant="secondary" size="sm">
```

---

## 🎨 STYLING LAYERS

### Layer 1: Global (globals.css)
```css
- CSS Custom Properties (variables)
  ├── --background
  ├── --foreground
  ├── --primary, --primary-foreground
  ├── --secondary
  ├── --gradient-primary
  ├── --shadow-glow
  └── ... (theme colors)

- Dark mode media query
- Base element styles
```

### Layer 2: Tailwind Config (tailwind.config.ts)
```js
- Extended colors (using CSS vars)
- Custom animations
  ├── fade-up
  ├── pulse-glow
  ├── accordion-down/up
- Custom backgrounds
  ├── gradient-primary
  ├── gradient-silver
  ├── gradient-dark
- Custom fonts
  └── font-display: 'Bebas Neue'
```

### Layer 3: Component Classes (JSX)
```tsx
// Example from Hero:
<h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
  PRECISION <br />
  <span className="text-gradient-primary">CAR CARE</span>
</h1>

// Composition:
- font-display: Custom font for headings
- text-6xl md:text-8xl: Responsive sizing
- leading-[0.9]: Tight line height
- text-gradient-primary: Gradient text effect
```

---

## 📊 DATA FLOW

```
                    ┌──────────────────┐
                    │   page.tsx       │
                    │  (ROOT PAGE)     │
                    └──────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    ┌────────┐          ┌────────┐         ┌────────┐
    │ Navbar │          │ Hero   │         │Services│
    │ (CLIENT)          │(SERVER)         │(SERVER)│
    └────────┘          └────────┘         └────────┘
        ▲                   │                   │
        │                   │                   │
    scroll event      imported image      static data
    useState/         (public folder)     (array)
    useEffect         lucide icons        lucide icons
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                       HTML rendered
                       by Next.js
                            │
                            ▼
                      ┌──────────────┐
                      │  Browser     │
                      │  (Static     │
                      │   HTML +     │
                      │   CSS +      │
                      │   Client JS) │
                      └──────────────┘
```

---

## 🔄 EVENT FLOW (Interactive)

### Navbar Scroll Effect:
```
User scrolls page
    ↓
window scroll event fired
    ↓
useEffect listener triggered
    ↓
Check: window.scrollY > 20?
    ↓
    YES → setScrolled(true)
    │       ↓
    │   Navbar re-renders with:
    │   - bg-background/80 (semitransparent)
    │   - backdrop-blur-xl
    │   - border-b border-border/60
    │   - py-3 (smaller padding)
    │
    NO → setScrolled(false)
        ↓
    Navbar re-renders with:
    - bg-transparent
    - no blur
    - py-5 (larger padding)
```

### Mobile Menu Toggle:
```
User clicks hamburger icon
    ↓
onClick={() => setOpen(!open)}
    ↓
    open = true?
    ↓
    YES → Show mobile menu div
    │       - animate-fade-up
    │       - All nav links + button
    │
    NO → Hide mobile menu

User clicks nav link
    ↓
onClick={() => setOpen(false)}
    ↓
Menu closes
Link navigates (browser default)
```

---

## 🎯 IMAGE & ASSET MAP

### Images Used:
```
public/
├── hero-workshop/
│   └── hero-workshop.jpg
│       ├── Used in: Hero.tsx
│       ├── Size: 1920x1280px
│       ├── Display: Full background
│       └── Alt text: "MotorMedic Auckland workshop..."
│
└── Other static assets (SVGs, logos)
    └── Not directly rendered in components
```

### Icons Used (from lucide-react):
```
Navbar:
- Menu (hamburger)
- X (close)

Hero:
- ArrowRight
- PhoneCall
- MapPin

Services:
- Wrench, Gauge, Cog, Battery, Disc3, ShieldCheck, Sparkles, Car

Footer:
- MapPin, Phone, Mail, Clock, Wrench, Instagram, Facebook
```

---

## ✅ READY FOR NEXT PHASE

All components are properly analyzed and mapped.
Ready to proceed with actual code modifications.

**Next Checkpoint**: PHASE 2 - Actual Code Changes

