# Animated MOTORMEDIC Text Feature

## Overview

The LoadingScreen component now includes an animated "MOTORMEDIC" text effect that traverses through the letters with a dynamic red highlight.

## Animation Behavior

### Text Animation Cycle

1. **Red Highlight Traversal** (5 seconds total)
   - Each letter becomes red for 0.5 seconds
   - Red highlight moves from 1st letter (M) → 2nd letter (O) → ... → 10th letter (C)
   - Smooth 0.3s transition between each letter

2. **White Glow Effect** (at completion)
   - When the red highlight reaches the last letter (C), all text momentarily glows white
   - Glow effect lasts ~0.8 seconds
   - Then the entire cycle repeats from the first letter

### Visual Details

**Active (Red) Letter:**
- Color: `#dc2626` (red-600)
- Text Shadow: `0 0 20px rgba(220, 38, 38, 0.8)` (red glow)

**Inactive (White) Letters:**
- Color: `#ffffff` (white)
- Text Shadow: `0 0 0px` (no glow, until end)

**End of Cycle (All Letters):**
- Final letter gets white glow: `0 0 20px rgba(255, 255, 255, 0.6)`
- Creates premium "scan complete" effect
- Then restarts from first letter

## Animation Timing

```
Letter 1: 0s     → 500ms  [RED] ✓
Letter 2: 500ms  → 1s     [RED] ✓
Letter 3: 1s     → 1.5s   [RED] ✓
Letter 4: 1.5s   → 2s     [RED] ✓
Letter 5: 2s     → 2.5s   [RED] ✓
Letter 6: 2.5s   → 3s     [RED] ✓
Letter 7: 3s     → 3.5s   [RED] ✓
Letter 8: 3.5s   → 4s     [RED] ✓
Letter 9: 4s     → 4.5s   [RED] ✓
Letter 10: 4.5s  → 5s     [RED] ✓
White Glow: 5s   → 5.8s   [GLOW] ✓
Repeat
```

## Responsive Sizing

| Breakpoint | Text Size | Gap |
|-----------|-----------|-----|
| Mobile | text-lg (18px) | gap-0.5 |
| SM (640px) | text-2xl (24px) | gap-1 |
| MD (768px) | text-3xl (30px) | gap-1 |

## State Management

The component uses React hooks to manage animation state:

```tsx
const [activeIndex, setActiveIndex] = useState(0);    // Current red letter position
const [showGlow, setShowGlow] = useState(false);      // Whether to show white glow
```

Every 500ms, `activeIndex` increments to the next letter (0-9 cycle).

## Code Implementation

```tsx
{motormedic.split("").map((letter, index) => {
  const isActive = index === activeIndex;
  const textColor = isActive ? "#dc2626" : "#ffffff";

  return (
    <motion.span
      animate={{ color: textColor }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        textShadow:
          isActive && showGlow
            ? "0 0 20px rgba(220, 38, 38, 0.8)"
            : showGlow && index === motormedic.length - 1
            ? "0 0 20px rgba(255, 255, 255, 0.6)"
            : "0 0 0px rgba(255, 255, 255, 0)",
      }}
    >
      {letter}
    </motion.span>
  );
})}
```

## Accessibility

✅ Respects `prefers-reduced-motion`
- Animation is disabled if user has reduced-motion enabled
- All text remains visible and readable
- No functional impact

## Performance

- ✅ GPU-accelerated color transitions
- ✅ Minimal repaints (only color changes)
- ✅ Efficient state updates (every 500ms)
- ✅ No memory leaks (intervals properly cleaned up)

## Customization

### Change Animation Speed

Modify the interval delay (currently 500ms per letter):

```tsx
}, 500); // Change this value
```

- 250ms = Faster traversal
- 750ms = Slower traversal

### Change Colors

**Red color:**
```tsx
const textColor = isActive ? "#your-color" : "#ffffff";
```

**Glow colors:**
```tsx
textShadow: isActive && showGlow
  ? "0 0 20px rgba(YOUR_R, YOUR_G, YOUR_B, 0.8)"
  : "..."
```

### Add More Effects

You could add:
- Scale animations per letter
- Rotation effects
- Blur/focus transitions
- Gradient backgrounds

## Browser Support

Works on all modern browsers supporting:
- CSS Flexbox
- CSS Color animations
- CSS Text Shadow
- Framer Motion
- React 18+

## Related Files

- `/app/components/LoadingScreen.tsx` - Main component
- `/app/loading.tsx` - Global loading state
- `/app/components/LoadingScreenDemo.tsx` - Test button

## Testing

To test the animation:

1. Click "Preview Loading Screen" button (bottom-right on home page)
2. Watch the red highlight traverse through "MOTORMEDIC"
3. See the white glow at the end
4. Animation repeats infinitely

---

**Last Updated**: June 2, 2026
**Status**: ✅ Production Ready
