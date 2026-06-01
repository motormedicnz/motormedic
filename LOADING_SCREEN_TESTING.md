# LoadingScreen - When & How It Appears

## Quick Answer

You're not seeing it on localhost because **`loading.tsx` only shows during route transitions and data fetching with Suspense**, not on direct page load.

## Testing on Localhost

### Option 1: Demo Button (Easiest) ✅ **RECOMMENDED**

A demo button is now added to your home page!

1. Visit `http://localhost:3000`
2. Look for "**Preview Loading Screen**" button in the **bottom-right corner**
3. Click it to see the loading screen
4. Click anywhere on the loading screen to close it

**To remove this button:**
- Delete `/app/components/LoadingScreenDemo.tsx`
- Remove the import and component from `/app/page.tsx`

### Option 2: Navigate Between Routes

The loading screen will appear when you navigate between pages:

1. Visit `http://localhost:3000`
2. Click "Book a Service" button
3. Loading screen should appear briefly before the services page loads
4. Click browser back button - loading screen appears again

### Option 3: Manual Testing with Slow Network

1. Open DevTools (F12)
2. Go to Network tab
3. Set throttling to "Slow 3G"
4. Navigate between pages to see loading screen

## When Does It Appear in Production?

### ✅ Will Show
- **Route transitions** - Navigating from one page to another
- **Slow networks** - On poor connections
- **Large data fetching** - When loading page data takes time
- **Suspense boundaries** - When wrapped with `<Suspense>`

### ❌ Won't Show
- **Initial page load** - Direct URL visit (next.js optimizes this)
- **Client-side only navigation** - If using client components
- **Fast cached pages** - Already in memory

## File Locations

| File | Purpose |
|------|---------|
| `app/components/LoadingScreen.tsx` | Main component |
| `app/loading.tsx` | Global loading for all routes |
| `app/components/LoadingScreenDemo.tsx` | Test button for localhost |
| `app/page.tsx` | Home page with demo integration |

## How to Use in Different Scenarios

### 1. Route Group Loading

Create `app/(dashboard)/loading.tsx`:

```tsx
import { LoadingScreen } from "@/app/components/LoadingScreen";

export default function DashboardLoading() {
  return <LoadingScreen />;
}
```

This shows the loading screen for all routes under `/dashboard`.

### 2. Specific Page Loading

Create `app/services/loading.tsx`:

```tsx
import { LoadingScreen } from "@/app/components/LoadingScreen";

export default function ServicesLoading() {
  return <LoadingScreen />;
}
```

This shows only for the `/services` route.

### 3. With Suspense (Recommended for Data Fetching)

```tsx
import { Suspense } from "react";
import { LoadingScreen } from "@/app/components/LoadingScreen";

async function SlowData() {
  // Simulate slow fetch
  await new Promise(resolve => setTimeout(resolve, 2000));
  return <div>Data loaded!</div>;
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SlowData />
    </Suspense>
  );
}
```

### 4. Custom Loading States (Client Component)

```tsx
"use client";

import { useState } from "react";
import { LoadingScreen } from "@/app/components/LoadingScreen";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await fetch('/api/something');
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <button onClick={handleClick}>Click me</button>
    </>
  );
}
```

## Production Deployment

### Vercel

The loading screen works automatically with Vercel:
1. Appears during route transitions
2. Appears on slow networks
3. Works with ISR (Incremental Static Regeneration)

### Self-Hosted

Just deploy as normal - `loading.tsx` is automatically picked up by Next.js.

## Removing the Demo Button

When you're done testing, remove the demo button:

```bash
# Delete the demo component
rm app/components/LoadingScreenDemo.tsx
```

Update `app/page.tsx`:

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import AboutSnippet from "./components/home/about";
import Footer from "./components/footer/Footer";
// ❌ Remove this line
// import LoadingScreenDemo from "./components/LoadingScreenDemo";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <AboutSnippet />
      <Services />
      <Footer />
      {/* ❌ Remove this component */}
      {/* <LoadingScreenDemo /> */}
    </main>
  );
};

export default Index;
```

## Performance Impact

- ✅ No impact on initial page load
- ✅ Only loads when needed
- ✅ Cached after first visit
- ✅ Minimal JS bundle size (~2KB gzipped)

## Troubleshooting

### Q: Still not seeing it?
**A:** Try the demo button approach or navigate between pages.

### Q: It appears too briefly?
**A:** That means your connection is fast. Use DevTools throttling or slow network simulation.

### Q: How to make it show longer for testing?
**A:** Add artificial delay in your page component:

```tsx
async function getPageData() {
  await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second delay
  return { /* data */ };
}
```

### Q: Does it work on mobile?
**A:** Yes, fully responsive for all screen sizes.

## Next Steps

1. ✅ Test with the demo button (already added)
2. ✅ Test navigation between pages
3. ✅ Deploy to production (Vercel recommended)
4. ✅ Remove demo button when satisfied
5. ✅ Monitor analytics for load times

---

**TL;DR:** Click "Preview Loading Screen" button in bottom-right corner of the home page to see it in action!
