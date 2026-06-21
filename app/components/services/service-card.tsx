"use client";

import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SERVICES } from "./data/services";
import { ServiceGallery } from "./service-gallery";

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
    if (info.offset.x < -60) goTo(activeIndex + 1);
    else if (info.offset.x > 60) goTo(activeIndex - 1);
  };

  const shortDesc =
    active.description.length > 115
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
          className="relative overflow-hidden rounded-3xl border border-white/[0.06] lg:grid lg:grid-cols-[1fr_1.1fr]"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          {/* ── Gallery column ── */}
          <div
            className="relative overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none h-[220px] lg:h-auto lg:min-h-full"
          >
            {/* On desktop, gallery fills column via absolute inset */}
            <div className="absolute inset-0">
              <ServiceGallery images={active.images} serviceName={active.title} />
            </div>

            {/* Counter badge */}
            <div className="absolute top-3 left-3 lg:top-5 lg:left-5 z-10 flex items-center gap-2 lg:gap-2.5">
              <div
                className="flex h-6 w-6 lg:h-7 lg:w-7 items-center justify-center rounded-full border text-[9px] lg:text-[10px] font-bold text-white/60"
                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.55)" }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </div>
              <div
                className="h-px w-8 lg:w-10"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.2), transparent)" }}
              />
            </div>

            {/* Icon badge — desktop only (bottom-left of gallery) */}
            <div className="hidden lg:flex absolute bottom-5 left-5 z-10 items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl border"
                style={{ borderColor: "rgba(220,38,38,0.4)", background: "rgba(220,38,38,0.12)", backdropFilter: "blur(12px)" }}
              >
                <active.icon className="h-5 w-5 text-red-500" />
              </div>
            </div>

            {/* Nav arrows — desktop only */}
            <div className="hidden lg:flex absolute bottom-5 right-5 z-10 items-center gap-2">
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

          {/* ── Content column ── */}
          <div
            className="relative flex flex-col justify-between px-4 pt-3 pb-4 lg:px-12 lg:py-12"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%)" }}
          >
            {/* Decorative radial — desktop only */}
            <div
              className="pointer-events-none absolute top-0 right-0 h-48 w-48 opacity-30 hidden lg:block"
              style={{ background: "radial-gradient(circle at 100% 0%, rgba(220,38,38,0.14) 0%, transparent 70%)" }}
            />

            <div className="relative z-10">
              {/* Title row — icon inline on mobile, icon in gallery on desktop */}
              <div className="flex items-center gap-2.5 mb-2 lg:mb-0 lg:block">
                {/* Icon shown inline on mobile only */}
                <div
                  className="flex lg:hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border"
                  style={{ borderColor: "rgba(220,38,38,0.4)", background: "rgba(220,38,38,0.15)", backdropFilter: "blur(10px)" }}
                >
                  <active.icon className="h-3.5 w-3.5 text-red-500" />
                </div>
                <h3
                  className="text-[1.35rem] lg:text-4xl xl:text-5xl font-black uppercase italic leading-[0.9] lg:leading-[0.92] tracking-tight text-white"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {active.title}
                </h3>
              </div>

              {/* Red divider */}
              <div
                className="mb-2.5 lg:mt-5 lg:mb-5 h-px w-10 lg:w-16"
                style={{ background: "linear-gradient(to right, rgba(220,38,38,0.7), transparent)" }}
              />

              {/* Short description */}
              <p
                className="text-[10px] lg:text-sm font-semibold uppercase tracking-wider lg:tracking-widest leading-snug"
                style={{ color: "rgba(220,38,38,0.85)" }}
              >
                {active.shortDescription}
              </p>

              {/* Full description */}
              <p
                className="mt-2 lg:mt-4 text-[11.5px] lg:text-[15px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {expanded ? active.description : shortDesc}
              </p>

              {/* Read more — mobile only */}
              {active.description.length > 115 && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="lg:hidden mt-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest transition-colors"
                  style={{ color: "rgba(220,38,38,0.75)" }}
                >
                  {expanded ? "Show less" : "Read more"}
                  <ChevronDown
                    className="h-3 w-3 transition-transform duration-300"
                    style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
              )}

              {/* Features */}
              <div className="mt-3 lg:mt-8">
                <p
                  className="mb-2 lg:mb-4 text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.3em] lg:tracking-[0.35em] pb-1.5 lg:pb-3 border-b inline-block"
                  style={{ color: "rgba(255,255,255,0.28)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  What's included
                </p>
                <ul className="grid grid-cols-2 gap-x-3 lg:gap-x-6 gap-y-1.5 lg:gap-y-3">
                  {active.features
                    .slice(0, expanded ? undefined : 4) // collapse on mobile; desktop always shows all
                    .map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 lg:gap-3 text-[10.5px] lg:text-[13px] leading-snug font-medium"
                        style={{ color: "rgba(255,255,255,0.68)" }}
                      >
                        <span
                          className="mt-1.5 h-1 w-1 lg:h-1.5 lg:w-1.5 flex-shrink-0 rounded-full"
                          style={{ background: "rgba(220,38,38,0.7)" }}
                        />
                        {f}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-4 lg:mt-10 flex items-center gap-4">
              <button
                onClick={() => onBookNow?.({ id: active.id, title: active.title })}
                className="group flex w-full lg:w-auto items-center justify-center lg:justify-start gap-2.5 lg:gap-3 rounded-full px-0 lg:px-8 py-3 lg:py-4 text-[11px] lg:text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", boxShadow: "0 4px 28px rgba(220,38,38,0.28)" }}
              >
                <span>Book This Service</span>
                <ArrowRight className="h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <span
                className="hidden lg:inline text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                {activeIndex + 1} / {SERVICES.length} Services
              </span>
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
              background: i === activeIndex ? "rgba(220,38,38,0.85)" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
};