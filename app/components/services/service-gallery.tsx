"use client";

import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   CONFIG
   MAX_VISIBLE: how many cells to show before "+N more" tile.
   Both desktop and mobile use the same collage logic — just
   different pixel heights via a CSS custom property.
───────────────────────────────────────────────────────────── */
const MAX_VISIBLE = 6; // show up to 6 tiles; 7th+ become "+N"

/* ─────────────────────────────────────────────────────────────
   COLLAGE GRID LAYOUTS
   Each layout is a CSS grid-template-areas string + row defs
   that perfectly fills a rectangular container with no gaps.
   We pick by number of VISIBLE tiles (capped at MAX_VISIBLE).
───────────────────────────────────────────────────────────── */
type Layout = {
  areas: string;
  cols: string;
  rows: string;
};

// Maps visibleCount → CSS grid definition
// Every layout is designed to tile-fill the full container
const LAYOUTS: Record<number, Layout> = {
  1: {
    areas: `"a"`,
    cols: "1fr",
    rows: "1fr",
  },
  2: {
    areas: `"a b"`,
    cols: "1fr 1fr",
    rows: "1fr",
  },
  3: {
    areas: `"a b" "a c"`,
    cols: "1fr 1fr",
    rows: "1fr 1fr",
  },
  4: {
    areas: `"a b" "c d"`,
    cols: "1fr 1fr",
    rows: "1fr 1fr",
  },
  5: {
    areas: `"a b c" "a d e"`,
    cols: "1fr 1fr 1fr",
    rows: "1fr 1fr",
  },
  6: {
    areas: `"a b c" "d e f"`,
    cols: "1fr 1fr 1fr",
    rows: "1fr 1fr",
  },
};

// Area name letters in order
const AREA_LETTERS = ["a", "b", "c", "d", "e", "f"];

/* ─────────────────────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────────────────────── */
interface LightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const [dir, setDir] = useState(0);

  const go = useCallback(
    (delta: number) => {
      setDir(delta);
      setIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) go(1);
    else if (info.offset.x > 50) go(-1);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(16px)" }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/60 transition-colors hover:text-white"
        aria-label="Close gallery"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Counter */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-[0.3em]"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {index + 1} / {images.length}
      </div>

      {/* Image */}
      <div className="relative flex h-full w-full items-center justify-center px-14 py-16">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={onDragEnd}
            className="flex h-full w-full items-center justify-center"
          >
            <img
              src={images[index]}
              alt={`Gallery image ${index + 1}`}
              className="max-h-full max-w-full rounded-2xl object-contain select-none"
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/60 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/60 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 hidden sm:flex justify-center gap-2 px-6">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
              className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200"
              style={{
                outline: i === index ? "2px solid rgba(220,38,38,0.85)" : "2px solid transparent",
                outlineOffset: "2px",
                opacity: i === index ? 1 : 0.4,
              }}
              aria-label={`Jump to image ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE GALLERY  (pure collage, no dominant hero)
───────────────────────────────────────────────────────────── */
interface ServiceGalleryProps {
  images: string[];
  /** Optional service name for accessible alt text */
  serviceName?: string;
}

/**
 * ServiceGallery renders a gap-free CSS Grid collage.
 * It fills 100% of its parent's height — wrap it in a fixed-height div.
 */
export function ServiceGallery({ images, serviceName = "Service" }: ServiceGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  // Cap visible tiles at MAX_VISIBLE
  const visibleCount = Math.min(images.length, MAX_VISIBLE);
  const visibleImages = images.slice(0, visibleCount);
  const hiddenCount = images.length - visibleCount; // images beyond the cap

  // Pick layout (clamp to max defined = 6)
  const layoutKey = Math.min(visibleCount, 6) as keyof typeof LAYOUTS;
  const layout = LAYOUTS[layoutKey];

  return (
    <>
      {/*
        The gallery fills 100% of whatever container wraps it.
        ServiceCard controls the height by wrapping this in a fixed-height div.
        `overflow-hidden` + `rounded-2xl` clips all tile edges at once.
      */}
      <div className="h-full w-full overflow-hidden rounded-2xl">
        <CollageGrid
          visibleImages={visibleImages}
          hiddenCount={hiddenCount}
          layout={layout}
          serviceName={serviceName}
          onOpen={setLightboxIndex}
        />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   COLLAGE GRID — renders the CSS grid with no gaps
───────────────────────────────────────────────────────────── */
function CollageGrid({
  visibleImages,
  hiddenCount,
  layout,
  serviceName,
  onOpen,
}: {
  visibleImages: string[];
  hiddenCount: number;
  layout: Layout;
  serviceName: string;
  onOpen: (i: number) => void;
}) {
  return (
    <div
      className="h-full w-full"
      style={{
        display: "grid",
        gridTemplateAreas: layout.areas,
        gridTemplateColumns: layout.cols,
        gridTemplateRows: layout.rows,
        gap: "3px",
      }}
    >
      {visibleImages.map((src, i) => {
        const area = AREA_LETTERS[i];
        const isLastVisible = i === visibleImages.length - 1;
        // Show overflow tile if this is the last visible slot AND there are hidden images
        const showOverflow = isLastVisible && hiddenCount > 0;

        return showOverflow ? (
          <OverflowTile
            key={i}
            src={src}
            // +1 because the last visible image is also "hidden" behind the overlay
            count={hiddenCount + 1}
            area={area}
            onClick={() => onOpen(i)}
          />
        ) : (
          <CollageTile
            key={i}
            src={src}
            alt={`${serviceName} — photo ${i + 1}`}
            area={area}
            onClick={() => onOpen(i)}
          />
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TILE PRIMITIVES
───────────────────────────────────────────────────────────── */
function CollageTile({
  src,
  alt,
  area,
  onClick,
}: {
  src: string;
  alt: string;
  area: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`View photo: ${alt}`}
      className="group relative overflow-hidden"
      style={{ gridArea: area }}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
        draggable={false}
      />
      {/* Subtle hover scrim */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(0,0,0,0.22)" }}
      />
    </button>
  );
}

function OverflowTile({
  src,
  count,
  area,
  onClick,
}: {
  src: string;
  count: number;
  area: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`View all photos (+${count} more)`}
      className="group relative overflow-hidden"
      style={{ gridArea: area }}
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
        draggable={false}
      />
      {/* Dark veil */}
      <div
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
        style={{ background: "rgba(0,0,0,0.58)" }}
      />
      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span
          className="text-2xl font-black leading-none text-white"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}
        >
          +{count}
        </span>
        <span
          className="text-[9px] font-bold uppercase tracking-[0.25em]"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          more
        </span>
      </div>
    </button>
  );
}