"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "../ui/button";
import { gsap } from "gsap";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 0.9 },
      });

      tl.fromTo(".animate-badge", { opacity: 0, y: -25 }, { opacity: 1, y: 0 })
        .fromTo(
          ".animate-title-line",
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, stagger: 0.12 },
          "-=0.6"
        )
        .fromTo(".animate-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.6")
        .fromTo(
          ".animate-cta",
          { opacity: 0, scale: 0.93 },
          { opacity: 1, scale: 1, stagger: 0.1 },
          "-=0.55"
        )
        .fromTo(
          ".animate-feature",
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, stagger: 0.12 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 md:px-4 lg:px-5 xl:px-4"
    >
      <img
        src="/hero-workshop/hero-workshop.jpg"
        alt="MotorMedic Auckland workshop interior with mechanic servicing a sports car"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

      <div className="container relative z-10 pt-24 pb-12 md:pt-28 md:pb-14">
        <div className="max-w-3xl">

          <h1 className="
            font-display leading-[0.88]
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
            mb-4 sm:mb-5 overflow-hidden
          ">
            <span className="block animate-title-line opacity-0">DIAGNOSE</span>
            <span className="block text-gradient-primary animate-title-line opacity-0">REPAIR</span>
            <span className="block text-gradient-silver animate-title-line opacity-0">REVIVE.</span>
          </h1>
<p className="
  animate-desc opacity-0
  text-sm sm:text-base md:text-lg
  text-muted-foreground max-w-xl
  mb-6 sm:mb-8
  leading-[1.8]
  tracking-[0.03em]
  border-l-2 border-primary pl-4
  [font-family:'Georgia','Times_New_Roman',serif]
">
  Auckland's premium auto workshop. From routine servicing to performance tuning —
  we treat every vehicle like our own. Certified technicians, honest pricing, modern diagnostics.
</p>
 
          {/* ── CTAs ──
              Always a horizontal row. On mobile use size="md" (compact).
              From sm+ switch to size="xl" (original).
              gap-2.5 on mobile so both fit within ~320–360px viewports.
          */}
          <div className="flex flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-12">

  <div className="animate-cta opacity-0">
    <Button
  variant="hero"
  className="h-11 px-4 text-sm sm:h-14 sm:px-8 sm:text-base"
  asChild
>
  <a href="/services#service-menu">
    Book a Service
    <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
  </a>
</Button>
  </div>

  <div className="animate-cta opacity-0">
    <Button
  variant="outlineGlow"
  className="h-11 px-4 text-sm sm:h-14 sm:px-8 sm:text-base"
  asChild
>
  <a href="tel:0279165555">
    <PhoneCall className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
    Call Workshop
  </a>
</Button>
  </div>

</div>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-xl lg:max-w-3xl">
            {[
              { title: "EURO & JDM",   subtitle: "Specialist Care"     },
              { title: "NEXT-GEN",     subtitle: "Digital Diagnostics" },
              { title: "MASTER TECHS", subtitle: "Fully Certified"     },
            ].map((f) => (
              <div
                key={f.subtitle}
                className="animate-feature opacity-0 border-l-2 border-primary pl-2 sm:pl-4"
              >
                <div className="
                  font-display tracking-wide text-foreground leading-tight
                  text-sm sm:text-lg md:text-xl lg:text-2xl
                ">
                  {f.title}
                </div>
                <div className="
                  uppercase tracking-wider text-muted-foreground mt-0.5
                  text-[9px] sm:text-[10px] md:text-xs
                ">
                  {f.subtitle}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;