"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown } from "lucide-react";

import Navbar from "../components/Navbar";
import { SERVICES } from "../components/services/data/services";
import { SectionHeader } from "../components/services/section-header";
import { ServiceMenu } from "../components/services/service-menu";
import { ServiceCard } from "../components/services/service-card";
import Footer from "../components/footer/Footer";
import { useBooking } from "@/app/hooks/useBooking";
import { BookingModal } from "@/app/components/services/booking-modal";

const AUTOSCROLL_INTERVAL = 5000;
const TOUCH_PAUSE_DURATION = 120000;

export default function ServicesPage() {
  // Scroll to service menu if hash is present
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash === '#service-menu') {
      setTimeout(() => {
        const menu = document.getElementById('service-menu');
        if (menu) {
          const y = menu.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100); // wait for DOM render
    }
  }, []);
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  

  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const booking = useBooking();
  const handleNext = useCallback(() => {
    const currentIndex = SERVICES.findIndex(
      (s) => s.id === activeId,
    );

    const nextIndex =
      (currentIndex + 1) % SERVICES.length;

    setDirection(1);
    setActiveId(SERVICES[nextIndex].id);
  }, [activeId]);

  useEffect(() => {
    if (isPaused || booking.isOpen) return;

    const interval = setInterval(
      handleNext,
      AUTOSCROLL_INTERVAL,
    );

    return () => clearInterval(interval);
  }, [handleNext, isPaused, booking.isOpen]);

  const handleUserInteraction = useCallback(() => {
    if (pauseTimerRef.current)
      clearTimeout(pauseTimerRef.current);

    setIsPaused(true);

    pauseTimerRef.current = setTimeout(
      () => setIsPaused(false),
      TOUCH_PAUSE_DURATION,
    );
  }, []);

  const handleMouseEnter = () => {
    if (pauseTimerRef.current)
      clearTimeout(pauseTimerRef.current);

    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleBookNow = (service: {
  id: string;
  title: string;
  tagline?: string;
}) => {
  if (pauseTimerRef.current)
    clearTimeout(pauseTimerRef.current);

  booking.openBooking(service);
};

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow overflow-x-hidden bg-background">

        {/* ───────────── FULL BLEED HEADER ───────────── */}
        <div
          style={{
            width: "100vw",
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
            overflow: "hidden",
          }}
        >
          <SectionHeader />
        </div>

        {/* ───────────── SCROLL INDICATOR BELOW HEADER ───────────── */}
        <div className="relative z-30 flex justify-center py-6 md:py-7">

          <div className="flex flex-col items-center gap-1 pointer-events-none">

            {/* text */}
            <span
              className="uppercase tracking-[0.32em] text-white/24"
              style={{
                fontSize: "10px",
                fontFamily:
                  "'Barlow Condensed', sans-serif",
                fontWeight: 600,
              }}
            >
              Scroll Down
            </span>

            {/* arrows */}
            <div className="flex flex-col items-center -space-y-3">

              <ChevronDown
                className="h-4 w-4 text-white/26 animate-bounce"
                style={{
                  animationDuration: "1.8s",
                }}
              />

              <ChevronDown
                className="h-4 w-4 text-white/14 animate-bounce"
                style={{
                  animationDuration: "1.8s",
                  animationDelay: "0.15s",
                }}
              />
            </div>
          </div>
        </div>

        {/* ───────────── CONTENT ───────────── */}
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 md:px-10">

          <div id="service-menu">
            <ServiceMenu
              activeId={activeId}
              setActiveId={setActiveId}
              setDirection={setDirection}
              onInteraction={handleUserInteraction}
            />
          </div>

          <div
            id="service-card-section"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleUserInteraction}
          >
            <ServiceCard
              activeId={activeId}
              direction={direction}
              setActiveId={setActiveId}
              setDirection={setDirection}
              onBookNow={handleBookNow}
              onInteraction={handleUserInteraction}
            />
          </div>
        </div>
      </main>

      <Footer showBrands={false} />
      <BookingModal
  isOpen={booking.isOpen}
  onClose={booking.closeBooking}
  service={booking.selectedService}
/>
    </div>
  );
}