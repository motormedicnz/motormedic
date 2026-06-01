"use client";

import {
  Wrench,
  Cpu,
  Disc3,
  Car,
  Battery,
  Cog,
  PaintBucket,
  LifeBuoy,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Wrench,
    title: "Mechanical Repairs",
    desc: "Complete mechanical repairs carried out by experienced technicians.",
  },
  {
    icon: Car,
    title: "Engine Repair",
    desc: "Engine repair and replacement services for reliable performance.",
  },
  {
    icon: Cog,
    title: "Transmission Repair",
    desc: "Transmission diagnostics, repair and replacement solutions.",
  },
  {
    icon: Disc3,
    title: "Brake Service",
    desc: "Professional brake inspections, repairs and servicing.",
  },
  {
    icon: Car,
    title: "Suspension Work",
    desc: "Suspension repairs and maintenance for a smoother drive.",
  },
  {
    icon: Battery,
    title: "Hybrid System Repairs",
    desc: "Specialised repair services for hybrid vehicle systems.",
  },
  {
    icon: Cpu,
    title: "Computer Diagnostics",
    desc: "Advanced diagnostic tools to quickly identify vehicle issues.",
  },
  {
    icon: PaintBucket,
    title: "Panel Beating & Painting",
    desc: "Quality bodywork restoration and professional paint finishes.",
  },
];

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: false,
          once: true,
        },
        defaults: { ease: "power4.out", duration: 0.8 },
      });

      tl.fromTo(
        ".service-label",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0 }
      )
        .fromTo(
          ".service-heading",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1 },
          "-=0.6"
        )
        .fromTo(
          ".service-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=0.6"
        )
        .fromTo(
          ".service-card",
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.08 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative py-28 bg-gradient-dark" ref={containerRef}>
      <div className="container mx-auto flex flex-col items-center">
        <div className="max-w-3xl mb-20 text-center">
          <div className="service-label text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
            What we do
          </div>
          <h2 className="service-heading font-display text-5xl md:text-7xl leading-none mb-6">
            OFFERED <span className="text-gradient-primary">SERVICES</span>
          </h2>
          <p className="service-description text-muted-foreground text-lg">
            Every job is backed by certified technicians, genuine parts and a 12-month workmanship guarantee.
          </p>
        </div>

        <div
  className="
    grid
    grid-cols-2
    sm:grid-cols-2
    lg:grid-cols-4

    gap-3 sm:gap-5 md:gap-6

    w-full
    max-w-[1400px]

    px-4 sm:px-6 md:px-8

    justify-items-center
    mx-auto
  "
>
  {services.map((s, i) => (
    <div
      key={s.title}
      className="service-card
      
        group relative
        w-full 
        max-w-[170px]
sm:max-w-[240px]
lg:max-w-[320px]

min-h-[180px]
sm:min-h-[220px]
lg:min-h-[250px]

p-4 sm:p-6 md:p-7

        p-6 sm:p-7 md:p-8

        rounded-2xl
        bg-card
        border border-border

        hover:border-primary/60
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[var(--shadow-glow)]

        overflow-hidden
      "
      style={{ animationDelay: `${i * 60}ms` }}
    >
      {/* Glow */}
      <div
        className="
          absolute
          left-1/2
          bottom-0
          -translate-x-1/2
          translate-y-1/2

          w-40 h-40
          rounded-full
          blur-3xl

          bg-primary/0
          group-hover:bg-primary/20

          transition-all duration-700
        "
      />

      <div className="relative z-10 flex flex-col h-full">
        <div
          className="
            w-10 h-10 sm:w-12 sm:h-12
            rounded-xl
            bg-secondary
            border border-border

            flex items-center justify-center

            mb-5

            group-hover:bg-gradient-primary
            group-hover:border-transparent

            transition-all
          "
        >
          <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-silver group-hover:text-primary-foreground transition-colors" />
        </div>

        <h3 className="text-sm sm:text-lg md:text-xl mb-3 tracking-wide">
          {s.title}
        </h3>

        <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {s.desc}
        </p>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default Services;