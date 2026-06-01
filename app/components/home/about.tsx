export default function AboutSnippet() {
  return (
<section className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 py-14 md:py-20">

  {/* Top hairline */}
  <div className="mb-12 md:mb-16 h-[1px] bg-gradient-to-r from-white/25 via-white/10 to-transparent" />

  {/* 3-col grid on desktop, stacked on mobile */}
  <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16 lg:gap-24">

    {/* ── COL 1: Label + Big headline + tagline ── */}
    <div>
      <p className="mb-5 text-[15px] tracking-[0.5em] font-medium text-primary">
        ABOUT US
      </p>
      <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
        25 YEARS.<br />
        <span className="text-[hsl(0_0%_72%)]">ONE<br />STANDARD.</span>
      </h2>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        From the workshop pits of India to the streets of Auckland —
        built on decades of doing, diagnosing, and never cutting corners.
      </p>
    </div>

    {/* ── COL 2: Stats ── */}
    <div className="flex flex-row gap-10 md:flex-col md:gap-8 md:justify-center">
      {[
        { value: "25+",  label: "Years experience",   color: "hsl(var(--primary))" },
        { value: "12K+", label: "Vehicles serviced",  color: "hsl(var(--primary))" },
        { value: "50+",  label: "Marques mastered",   color: "hsl(var(--primary))" },
      ].map((s) => (
        <div key={s.label}>
          <div className="font-display text-4xl lg:text-5xl leading-none" style={{ color: s.color }}>
            {s.value}
          </div>
          <div className="mt-1.5 text-[9px] tracking-[0.28em] text-muted-foreground uppercase">
            {s.label}
          </div>
        </div>
      ))}
    </div>

    {/* ── COL 3: Para + credentials + CTA ── */}
    <div className="flex flex-col justify-between gap-8">
      <p className="text-sm lg:text-base leading-relaxed text-muted-foreground">
        Motor Medic Automotive was founded on one belief — that honest,
        precise workmanship never goes out of fashion. Every vehicle is
        treated with the same care regardless of make, model, or age.
        Every quote is transparent. Every repair is photographed and
        guaranteed in writing.
      </p>

      {/* Credential tags */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: "MTA Qualified",     red: true },
          { label: "Factory Trained",   red: true },
          { label: "Written Guarantee", red: true },
        ].map((c) => (
          <span
            key={c.label}
            className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 border border-white/10 text-muted-foreground"
            style={c.red ? { borderColor: "hsl(0 84% 50% / 0.40)", color: "hsl(var(--primary))" } : {}}
          >
            {c.label}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href="/about"
        className="group inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-white/60 transition-colors duration-300 hover:text-white w-fit"
      >
        READ OUR STORY
        <span className="text-primary transition-transform duration-300 group-hover:translate-x-1 inline-block">
          →
        </span>
      </a>
    </div>

  </div>

  {/* Bottom hairline */}
  <div className="mt-12 md:mt-16 h-[1px] bg-gradient-to-r from-white/25 via-white/10 to-transparent" />

</section>
 
  );
}