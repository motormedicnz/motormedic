"use client";

import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SERVICES } from "./data/services";

interface ServiceCardProps {
  activeId: string;
  direction: number;
  setActiveId: (id: string) => void;
  setDirection: (direction: number) => void;
  onBookNow?: (service: { id: string; title: string }) => void;
  onInteraction?: () => void;
}

export const ServiceCard = ({
  activeId,
  direction,
  setActiveId,
  setDirection,
  onBookNow,
  onInteraction,
}: ServiceCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const activeIndex = SERVICES.findIndex((s) => s.id === activeId);
  const active = SERVICES[activeIndex];

  const goTo = (index: number) => {
    const next = (index + SERVICES.length) % SERVICES.length;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveId(SERVICES[next].id);
    setExpanded(false);
    onInteraction?.();
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 60;
    if (info.offset.x < -threshold) goTo(activeIndex + 1);
    else if (info.offset.x > threshold) goTo(activeIndex - 1);
  };

  // Truncate description to ~120 chars for mobile collapsed state
  const shortDesc = active.description.length > 115
    ? active.description.slice(0, 115).trimEnd() + "…"
    : active.description;

  return (
    <div id="service-card-section" className="mt-2">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.article
          key={active.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 48 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -48 }}
          transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          onDragStart={onInteraction}
          className="relative overflow-hidden rounded-3xl border border-white/[0.06]"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          {/* ── MOBILE LAYOUT: compact single-column ── */}
          <div className="lg:hidden">
            {/* Image — short fixed height */}
            <div className="relative overflow-hidden" style={{ height: "140px" }}>
              <motion.div
                key={active.id + "-img-m"}
                initial={{ scale: 1.06, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${active.image})` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.82) 100%)",
                }}
              />

              {/* Counter top-left */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full border text-[9px] font-bold text-white/60"
                  style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.55)" }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </div>
                <div
                  className="h-px w-8"
                  style={{ background: "linear-gradient(to right, rgba(255,255,255,0.2), transparent)" }}
                />
              </div>

              {/* Title + icon overlaid bottom of image */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end gap-2.5">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: "rgba(220,38,38,0.4)",
                    background: "rgba(220,38,38,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <active.icon className="h-3.5 w-3.5 text-red-500" />
                </div>
                <h3
                  className="text-[1.35rem] font-black uppercase italic leading-[0.9] tracking-tight text-white"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {active.title}
                </h3>
              </div>
            </div>

            {/* Content below image */}
            <div className="px-4 pt-3 pb-4">
              {/* Red divider */}
              <div
                className="mb-2.5 h-px w-10"
                style={{ background: "linear-gradient(to right, rgba(220,38,38,0.7), transparent)" }}
              />

              {/* Short description (red accent) — always visible */}
              <p
                className="text-[10px] font-semibold uppercase tracking-wider leading-snug mb-2"
                style={{ color: "rgba(220,38,38,0.85)" }}
              >
                {active.shortDescription}
              </p>

              {/* Full description — collapsed/expanded */}
              <p
                className="text-[11.5px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {expanded ? active.description : shortDesc}
              </p>

              {active.description.length > 115 && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest transition-colors"
                  style={{ color: "rgba(220,38,38,0.75)" }}
                >
                  {expanded ? "Show less" : "Read more"}
                  <ChevronDown
                    className="h-3 w-3 transition-transform duration-300"
                    style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
              )}

              {/* Features — compact 2-col, first 4 only on mobile */}
              <div className="mt-3">
                <p
                  className="mb-2 text-[8px] font-bold uppercase tracking-[0.3em] pb-1.5 border-b inline-block"
                  style={{ color: "rgba(255,255,255,0.28)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  What's included
                </p>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {active.features.slice(0, expanded ? undefined : 4).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-[10.5px] leading-snug font-medium"
                      style={{ color: "rgba(255,255,255,0.68)" }}
                    >
                      <span
                        className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                        style={{ background: "rgba(220,38,38,0.7)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() => onBookNow?.({ id: active.id, title: active.title })}
                className="group mt-4 flex w-full items-center justify-center gap-2.5 rounded-full py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-300 active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                  boxShadow: "0 3px 20px rgba(220,38,38,0.25)",
                }}
              >
                <span>Book This Service</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* ── DESKTOP LAYOUT: unchanged side-by-side ── */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1.1fr]">
            {/* Left — Image */}
            <div className="relative overflow-hidden" style={{ minHeight: "420px" }}>
              <motion.div
                key={active.id + "-img"}
                initial={{ scale: 1.06, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${active.image})` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, transparent 55%, rgba(0,0,0,0.9) 100%)",
                }}
              />

              {/* Counter */}
              <div className="absolute top-5 left-5 flex items-center gap-2.5">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold text-white/60"
                  style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.5)" }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </div>
                <div
                  className="h-px w-10"
                  style={{ background: "linear-gradient(to right, rgba(255,255,255,0.25), transparent)" }}
                />
              </div>

              {/* Icon badge bottom-left */}
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: "rgba(220,38,38,0.4)",
                    background: "rgba(220,38,38,0.12)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <active.icon className="h-5 w-5 text-red-500" />
                </div>
              </div>

              {/* Nav arrows */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                <button
                  onClick={() => goTo(activeIndex - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/50 transition-all duration-200 hover:border-white/25 hover:text-white backdrop-blur-sm"
                  aria-label="Previous service"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => goTo(activeIndex + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/50 transition-all duration-200 hover:border-white/25 hover:text-white backdrop-blur-sm"
                  aria-label="Next service"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right — Content */}
            <div
              className="relative flex flex-col justify-between px-12 py-12"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute top-0 right-0 h-48 w-48 opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 100% 0%, rgba(220,38,38,0.14) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <h3
                  className="text-4xl xl:text-5xl font-black uppercase italic leading-[0.92] tracking-tight text-white"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {active.title}
                </h3>

                <div
                  className="mt-5 mb-5 h-px w-16"
                  style={{ background: "linear-gradient(to right, rgba(220,38,38,0.7), transparent)" }}
                />

                <p
                  className="text-sm font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(220,38,38,0.8)" }}
                >
                  {active.shortDescription}
                </p>

                <p
                  className="mt-4 text-[15px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.58)" }}
                >
                  {active.description}
                </p>

                <div className="mt-8">
                  <p
                    className="mb-4 text-[9px] font-bold uppercase tracking-[0.35em] pb-3 border-b inline-block"
                    style={{ color: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    What's included
                  </p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {active.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-[13px] leading-snug font-medium"
                        style={{ color: "rgba(255,255,255,0.72)" }}
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                          style={{ background: "rgba(220,38,38,0.7)" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative z-10 mt-10 flex items-center gap-4">
                <button
                  onClick={() => onBookNow?.({ id: active.id, title: active.title })}
                  className="group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                  style={{
                    background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                    boxShadow: "0 4px 28px rgba(220,38,38,0.28)",
                  }}
                >
                  <span>Book This Service</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.22)" }}
                >
                  {activeIndex + 1} / {SERVICES.length} Services
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>

      {/* Mobile dot pager */}
      <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to ${s.title}`}
            className="rounded-full transition-all duration-300"
            style={{
              height: "3px",
              width: i === activeIndex ? "28px" : "10px",
              background:
                i === activeIndex
                  ? "rgba(220,38,38,0.85)"
                  : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
};