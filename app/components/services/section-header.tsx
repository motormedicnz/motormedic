import { useEffect, useRef } from "react";
import { Shield, Zap } from "lucide-react";
import gsap from "gsap";

export const SectionHeader = () => {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h1OurRef = useRef<HTMLSpanElement>(null);
  const h1SvcRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7 }
      )
        .fromTo(
          h1OurRef.current,
          { opacity: 0, y: 60, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.75 },
          "-=0.3"
        )
        .fromTo(
          h1SvcRef.current,
          { opacity: 0, y: 70, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.75 },
          "-=0.55"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.35"
        )
        .fromTo(
          chipsRef.current ? Array.from(chipsRef.current.children) : [],
          { opacity: 0, y: 20, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15 },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="svc-header">

      {/* ── BACKGROUND ── */}
      <div className="svc-header-bg">
        <div className="svc-header-img-wrap">
          <img
            src="/service/rotary-car-engine-details-combustion.png"
            alt=""
            aria-hidden="true"
            className="svc-header-img"
          />
          <div className="svc-header-blend-left" />
          <div className="svc-header-blend-tb" />
          <div className="svc-header-blend-right" />
        </div>

        <div className="svc-header-blue-glow" />
        <div className="svc-header-blue-streak" />
        <div className="svc-header-vignette" />
        <div className="svc-header-red-ambient" />
      </div>

      {/* ── CONTENT ── */}
      <div className="svc-header-content">
        <div className="svc-header-inner">

          {/* Eyebrow */}
          <div className="svc-header-eyebrow" ref={eyebrowRef}>
            <div className="svc-header-eyebrow-line" />
            <p className="svc-header-eyebrow-text">Service Menu</p>
          </div>

          {/* Headline */}
          <h1 className="svc-header-h1">
            <span className="svc-header-h1-our" ref={h1OurRef}>OUR</span>
            <span className="svc-header-h1-services" ref={h1SvcRef}>SERVICES</span>
          </h1>

          {/* Description */}
          <p className="svc-header-desc" ref={descRef}>
            Advanced automotive engineering and clinical diagnostics
            for the modern performance vehicle.
          </p>

          {/* Chips */}
          <div className="svc-header-chips" ref={chipsRef}>
            <div className="svc-header-chip svc-header-chip-1">
              <Shield className="svc-header-chip-icon-red" />
              <span className="svc-header-chip-label-1">Master Techs</span>
            </div>
            <div className="svc-header-chip svc-header-chip-2">
              <Zap className="svc-header-chip-icon-blue" />
              <span className="svc-header-chip-label-2">Engineered to Win</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="svc-header-bottom-blend" />
    </header>
  );
};