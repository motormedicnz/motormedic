"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const metrics = [
  { value: "25+", label: "Years\nIn Business" },
  { value: "12K+", label: "Vehicles\nServiced" },
  { value: "50+", label: "Marques\nMastered" },
];

export default function AboutHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".ah-line", {
        yPercent: 115,
        duration: 1.15,
        ease: "expo.out",
        stagger: 0.1,
      });
      gsap.from([".ah-meta", ".ah-sub"], {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.55,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".ah-metric", {
        opacity: 0,
        x: 30,
        duration: 0.9,
        delay: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".ah-redline", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        delay: 0.4,
        ease: "expo.out",
      });
      gsap.to(".ah-parallax", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ".ah-wrap",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="ah-wrap relative overflow-hidden border-b border-white/5 min-h-[92vh] flex flex-col justify-end">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/about/about-garage.jpg"
            alt="Motor Medic workshop"
            className="ah-parallax h-[115%] w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />
          {/* Red atmospheric glow — use primary HSL directly */}
          <div className="absolute top-0 right-0 w-[200px] h-full blur-[80px] pointer-events-none"
               style={{ background: "hsl(0 84% 50% / 0.05)" }} />
        </div>

        {/* Corner accents — primary red */}
        {/* Content */}
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16 md:pb-24">

          <p className="ah-meta mb-6 text-[15px] sm:text-[13px] tracking-[0.4em] font-medium"
             style={{ color: "white" }}>
            ABOUT MOTOR MEDIC
          </p>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            {/* Headline */}
            <div className="flex-1 min-w-0">
              <h1 className="font-display leading-[0.95] tracking-tight text-[clamp(1.9rem,6.5vw,6rem)]">
                <span className="block overflow-hidden">
                  <span className="ah-line block">25 YEARS OF</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="ah-line block" style={{ color: "hsl(var(--primary))" }}>
                    EXPERTISE.
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="ah-line block">DRIVEN BY PASSION.</span>
                </span>
              </h1>

              <div className="ah-redline mt-6 h-[2px] w-20"
                   style={{ background: "hsl(var(--primary))" }} />

              <p className="ah-sub mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-white/60 md:text-base">
                Twenty-five years in the trade. One philosophy — treat every car
                like it's parked in our own garage.
              </p>
            </div>

            {/* Metrics */}
            <div className="w-full md:w-auto overflow-hidden rounded-sm border border-white/10 bg-black/30 backdrop-blur-sm
                            flex divide-x divide-white/10
                            md:flex-col md:divide-x-0 md:divide-y md:min-w-[220px]">
              {metrics.map((m) => (
                <div key={m.value} className="flex-1 min-w-0 px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
                  <div className="font-display text-xl sm:text-2xl md:text-4xl leading-none"
                       style={{ color: "white" }}>
                    {m.value}
                  </div>
                  <div className="mt-1 text-[8px] sm:text-[9px] tracking-[0.2em] text-white/50 uppercase whitespace-pre-line leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}