"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "./data/services";

interface ServiceMenuProps {
  activeId: string;
  setActiveId: (id: string) => void;
  setDirection: (direction: number) => void;
  onInteraction?: () => void;
}

export const ServiceMenu = ({
  activeId,
  setActiveId,
  setDirection,
  onInteraction,
}: ServiceMenuProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeIndex = SERVICES.findIndex((s) => s.id === activeId);

  const goTo = (index: number) => {
    const next = (index + SERVICES.length) % SERVICES.length;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveId(SERVICES[next].id);
    onInteraction?.();
  };

  return (
    <section
      className="relative mt-10 mb-8"
      onMouseEnter={onInteraction}
      onTouchStart={onInteraction}
    >
      {/* Section Label */}
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">
          Select a Service
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── DESKTOP GRID ── */}
      <div
        className="hidden md:grid grid-cols-4 xl:grid-cols-6 gap-3"
        role="tablist"
        aria-label="Services"
      >
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          const isActive = s.id === activeId;
          const isHovered = hoveredId === s.id;

          return (
            <button
              key={s.id}
              data-tab-id={s.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => goTo(i)}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-2xl border transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              style={{
                minHeight: "148px",
                borderColor: isActive
                  ? "rgba(220,38,38,0.45)"
                  : "rgba(255,255,255,0.055)",
                background: isActive
                  ? "rgba(220,38,38,0.07)"
                  : "rgba(255,255,255,0.025)",
              }}
            >
              {/* Background image with overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                style={{
                  backgroundImage: `url(${s.image})`,
                  transform: isHovered || isActive ? "scale(1.08)" : "scale(1)",
                  opacity: isActive ? 0.18 : isHovered ? 0.13 : 0.07,
                }}
              />

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: isActive
                    ? "linear-gradient(160deg, rgba(180,20,20,0.15) 0%, rgba(0,0,0,0.65) 100%)"
                    : "linear-gradient(160deg, rgba(20,20,30,0.3) 0%, rgba(0,0,0,0.72) 100%)",
                  transition: "background 0.4s ease",
                }}
              />

              {/* Active glow ring */}
              {isActive && (
                <motion.div
                  layoutId="desktop-ring"
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 1.5px rgba(220,38,38,0.5), 0 0 28px rgba(220,38,38,0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-4 justify-between">
                {/* Top — icon */}
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300"
                  style={{
                    borderColor: isActive
                      ? "rgba(220,38,38,0.4)"
                      : "rgba(255,255,255,0.08)",
                    background: isActive
                      ? "rgba(220,38,38,0.15)"
                      : "rgba(255,255,255,0.04)",
                  }}
                >
                  <Icon
                    className="h-4 w-4 transition-colors duration-300"
                    style={{ color: isActive ? "#ef4444" : "rgba(255,255,255,0.45)" }}
                  />
                </div>

                {/* Bottom — title */}
                <div className="mt-3">
                  <p
                    className="text-left text-[10px] uppercase leading-tight tracking-[0.12em] transition-colors duration-300"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      color: isActive
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.52)",
                    }}
                  >
                    {s.title}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── MOBILE LAYOUT — 3-column grid, all 11 visible ── */}
      <div
        className="md:hidden grid gap-2"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        role="tablist"
        aria-label="Services"
      >
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          const isActive = s.id === activeId;

          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                goTo(i);
                const cardSection = document.getElementById("service-card-section");
                if (cardSection) {
                  const y =
                    cardSection.getBoundingClientRect().top +
                    window.pageYOffset -
                    90;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="relative overflow-hidden rounded-2xl border transition-all duration-300"
              style={{
                height: "96px",
                borderColor: isActive
                  ? "rgba(220,38,38,0.45)"
                  : "rgba(255,255,255,0.06)",
                background: isActive
                  ? "rgba(220,38,38,0.07)"
                  : "rgba(255,255,255,0.025)",
              }}
            >
              {/* BG image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${s.image})`,
                  opacity: isActive ? 0.18 : 0.08,
                  transform: isActive ? "scale(1.06)" : "scale(1)",
                  transition: "all 0.4s ease",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(10,10,16,0.2) 0%, rgba(0,0,0,0.75) 100%)",
                }}
              />

              {/* Active ring */}
              {isActive && (
                <motion.div
                  layoutId="mobile-ring"
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 1.5px rgba(220,38,38,0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              <div className="relative z-10 flex flex-col h-full p-2.5 justify-between">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg border"
                  style={{
                    borderColor: isActive
                      ? "rgba(220,38,38,0.4)"
                      : "rgba(255,255,255,0.08)",
                    background: isActive
                      ? "rgba(220,38,38,0.15)"
                      : "rgba(255,255,255,0.04)",
                  }}
                >
                  <Icon
                    className="h-3 w-3"
                    style={{ color: isActive ? "#ef4444" : "rgba(255,255,255,0.45)" }}
                  />
                </div>
                <p
                  className="text-left text-[8.5px] uppercase leading-tight tracking-[0.08em]"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    color: isActive
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.5)",
                  }}
                >
                  {s.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};