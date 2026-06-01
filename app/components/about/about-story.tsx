"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const milestones = [
  { year: "Early Career", label: "Spent years in busy Indian workshops, learning every system on trucks, vans, pickups and commercial fleets." },
  { year: "The Craft",    label: "Mastered diagnostics, engine rebuilds and drivetrain work across 50+ marques before most shops had computers." },
  { year: "New Chapter",  label: "Brought that hands-on discipline to New Zealand — same standards, new workshop, different roads." },
  { year: "Today",        label: "12K+ vehicles serviced. Auckland's most trusted independent. Still learning. Never cutting corners." },
];

const pillars = [
  {
    num: "01",
    title: "Heritage",
    body: "Over 25 years of hands-on experience across two countries — built in workshops where precision wasn't optional, it was survival.",
  },
  {
    num: "02",
    title: "Precision",
    body: "Factory-grade diagnostics, OEM-spec tooling and a discipline that treats every vehicle like the only one in the bay.",
  },
  {
    num: "03",
    title: "Trust",
    body: "Transparent quotes, photographed findings, written guarantees. No upsells. No guesswork. Just honest work done right.",
  },
];

const trustPoints = [
  { label: "MTA Qualified",      sub: "Fully certified" },
  { label: "Factory Trained",    sub: "OEM programmes" },
  { label: "12K+ Vehicles",      sub: "Serviced & repaired" },
  { label: "Written Guarantee",  sub: "Every single job" },
];

const RED     = "hsl(var(--primary))";          // 0 84% 50%
const RED_60  = "hsl(0 84% 50% / 0.60)";
const RED_70  = "hsl(0 84% 50% / 0.70)";
const RED_20  = "hsl(0 84% 50% / 0.20)";
const RED_30  = "hsl(0 84% 50% / 0.30)";
const RED_80  = "hsl(0 84% 50% / 0.80)";

// Blue accent tokens — used sparingly for that red/blue/silver premium mix
const BLUE    = "hsl(217 91% 60%)";             // matches your blue-400
const BLUE_15 = "hsl(217 91% 60% / 0.15)";
const BLUE_30 = "hsl(217 91% 60% / 0.30)";
const BLUE_50 = "hsl(217 91% 60% / 0.50)";

// Silver — --silver: 0 0% 78%
const SILVER_40 = "hsl(0 0% 78% / 0.40)";
const SILVER_20 = "hsl(0 0% 78% / 0.20)";

export default function AboutStory() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".as-img", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".as-story", start: "top 72%" },
      });
      gsap.from(".as-story-text > *", {
        opacity: 0, y: 28, duration: 0.85, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".as-story", start: "top 72%" },
      });
      gsap.from(".as-tl-item", {
        opacity: 0, x: -20, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".as-timeline", start: "top 80%" },
      });
      gsap.from(".as-pillar", {
        opacity: 0, y: 24, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".as-pillars", start: "top 75%" },
      });
      gsap.from(".as-team-line", {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".as-team", start: "top 75%" },
      });
      gsap.from(".as-cta-el", {
        opacity: 0, y: 30, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".as-cta", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>

      {/* ── OUR STORY ──────────────────────────────────────────── */}
      <section className="as-story mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 py-16 md:grid-cols-12 md:py-24">

        {/* Image */}
        <div className="md:col-span-5 md:-mt-20 relative z-10">
          <div className="as-img relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
            <img
              src="/about/about-workshop.jpg"
              alt="Workshop experience"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" />
          </div>
        </div>

        {/* Text */}
        <div className="as-story-text md:col-span-7 md:pl-12 flex flex-col justify-center">
          {/* label — red */}
          <p className="mb-5 text-[15px] tracking-[0.45em] font-medium" style={{ color: RED }}>
             OUR STORY
          </p>
          <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            Built in workshops.{" "}
            <br className="hidden sm:block" />
            Proven on the{" "}
            {/* "road." — blue instead of red for variety */}
            <span style={{ color: RED }}>road.</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Our founder didn't start behind a desk. He started under a chassis — working
              his way through some of India's busiest commercial garages, where every job
              was a lesson and every vehicle told a different story.
            </p>
            <p>
              Trucks, mini-trucks, vans, pickups — over 25 years he worked on them all.
              That kind of breadth doesn't come from a training manual. It comes from
              decades of doing, diagnosing, and refusing to guess.
            </p>
            <p className="font-medium" style={{ color: "hsl(var(--foreground) / 0.90)" }}>
              He brought every one of those years to New Zealand. The workshop changed. The standard didn't.
            </p>
          </div>

          {/* Timeline */}
          <div className="as-timeline mt-10 border-l border-white/10 pl-5">
            {milestones.map((t, i) => (
              <div key={t.year} className="as-tl-item relative pb-5 last:pb-0 group">
                <div
                  className="absolute -left-[21px] top-[6px] h-[9px] w-[9px] rounded-full border bg-background transition-all duration-300 group-hover:scale-110"
                  // alternate dot border: red / blue / silver / red
                  style={{ borderColor: RED_60 }}
                />
                {/* year label — first two red, last two blue */}
                <span className="font-display text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: RED }}>
                  {t.year}
                </span>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE STAND FOR ──────────────────────────────────── */}
      <section className="as-pillars relative overflow-hidden border-t border-white/5 py-24 md:py-32">
           <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] blur-[140px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top, hsl(217 91% 30% / 0.30) 0%, hsl(0 0% 0% / 0) 70%)",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        {/* Top hairline — red fading to transparent (unchanged) */}
        <div className="absolute top-0 left-0 right-0 h-[1px]"
             style={{ background: `linear-gradient(to right, ${RED_70}, ${RED_20}, transparent)` }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

          {/* Header */}
          <div className="mb-20 md:mb-28 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              {/* section label — blue here for contrast vs red top hairline */}
              <p className="mb-4 text-[15px] tracking-[0.5em] font-medium" style={{ color: BLUE }}>
                 WHAT WE STAND FOR
              </p>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
                No shortcuts. No surprises.
              </h2>
            </div>
            <div className="hidden md:block h-[1px] w-40 self-center" />
          </div>

          {/* Editorial 3-col */}
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-3 sm:gap-0">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`as-pillar group relative
                  ${i > 0 ? "sm:border-l sm:border-white/10 sm:pl-12 md:pl-20" : ""}
                  ${i < 2 ? "sm:pr-12 md:pr-20" : ""}
                `}
              >
                {/* pillar numbers: 01 red, 02 blue, 03 silver */}
                <p className="font-display text-[11px] tracking-[0.4em] mb-8 opacity-80"
                   style={{ color: SILVER_40 }}>
                  {p.num}
                </p>

                <div className="inline-block mb-7">
                  <h3 className="font-display text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.0] transition-all duration-300 group-hover:text-white"
                      style={{ textShadow: "none" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textShadow = "0 0 24px rgba(255,255,255,0.35)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textShadow = "none"; }}>
                    {p.title}
                  </h3>
                  {/* underline: Heritage=red, Precision=blue, Trust=silver */}
                  <div className="mt-3 h-[2px] w-0 transition-all duration-500 ease-out group-hover:w-full"
                       style={{
                         background: RED,
                         boxShadow: i === 0
                           ? `0 0 10px ${RED_80}`
                           : i === 1
                           ? `0 0 10px ${BLUE_30}`
                           : `0 0 8px ${SILVER_20}`,
                       }} />
                </div>

                <p className="text-sm leading-[1.8] text-muted-foreground max-w-xs">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Bottom divider — silver fade */}
          <div className="mt-24 md:mt-32 h-[1px]"
               style={{ background: `linear-gradient(to right, ${SILVER_20}, transparent)` }} />
        </div>
      </section>

      {/* ── WHO WORKS HERE ─────────────────────────────────────── */}
      <section className="as-team mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          {/* label — blue */}
          <p className="as-team-line mb-5 text-[15px] tracking-[0.45em] font-medium" style={{ color: BLUE }}>
             THE PEOPLE
          </p>
          <h2 className="as-team-line font-display text-3xl sm:text-4xl md:text-6xl leading-[1.05]">
            Certified master techs.
            <br />
            {/* "Real" — red to pull it back */}
            <span style={{ color: BLUE }}>Real</span> car people.
          </h2>
          <p className="as-team-line mt-6 max-w-xl text-muted-foreground text-sm md:text-base leading-relaxed">
            Behind every repair is a team of factory-trained technicians,
            diagnostic specialists, and genuine enthusiasts who treat every
            vehicle as if it were their own.
          </p>
        </div>

        {/* Team photo */}
        <div className="as-team-line mt-12 mb-20 overflow-hidden">
          <Image
            src="/about/group_photo.png"
            alt="Motor Medic Team"
            width={1800}
            height={1000}
            className="h-[300px] sm:h-[420px] md:h-[560px] w-full object-cover object-top"
          />
        </div>

        {/* Trust strip — sub labels alternate red / blue / silver / blue */}
        <div className="as-team-line mt-0 grid grid-cols-2 md:grid-cols-4 border-white/10">
          {trustPoints.map((item, i) => (
            <div
              key={item.label}
              className={`py-6 px-4 sm:px-6 ${i < 3 ? "border-r border-white/10" : ""} ${i >= 2 ? "border-t border-white/5 md:border-t-0" : ""}`}
            >
              <p className="text-sm font-medium tracking-wide text-foreground">{item.label}</p>
              <p className="mt-1 text-[9px] tracking-[0.25em] uppercase"
                 style={{ color: i === 0 ? BLUE : i === 2 ? BLUE : BLUE }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="as-cta relative overflow-hidden border-t border-white/5 py-20 md:py-28">

        {/* Top hairline — blue, same as your original */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        {/* Ambient glow — blue top fades to pure black at bottom */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] blur-[140px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top, hsl(217 91% 30% / 0.30) 0%, hsl(0 0% 0% / 0) 70%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">

          {/* label — blue */}
          <p className="as-cta-el text-[15px] tracking-[0.45em] font-medium mb-6" style={{ color: BLUE }}>
            BOOK A SERVICE
          </p>

          <h2 className="as-cta-el font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.0]">
            YOUR CAR ALWAYS{" "}
            {/* "DESERVES" — silver for that premium mid-tone */}
            <span style={{ color: SILVER_40 }}>
              DESERVES
            </span>{" "}
            THE BEST.
          </h2>

          {/* Silver divider — unchanged */}
          <div className="as-cta-el mx-auto mt-8 mb-10 h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Bullet dots — blue (unchanged) */}
          <ul className="as-cta-el max-w-lg mx-auto space-y-4 text-left text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: BLUE }} />
              <span>Book a diagnostic. Know what's wrong before any repair starts.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: BLUE }} />
              <span>Speak directly with a master technician — not a sales script.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: BLUE }} />
              <span>Get a written quote. Then decide. No pressure.</span>
            </li>
          </ul>

          {/* Buttons — unchanged structure, only hover border color */}
          {/* Buttons */}
<div className="as-cta-el mt-12 flex flex-wrap justify-center gap-4">
  <a
    href="/services#service-menu"
    className="inline-flex items-center gap-3 rounded-sm bg-red-600 px-8 py-4 text-sm font-semibold tracking-widest text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_8px_30px_rgba(220,38,38,0.35)]"
  >
    BOOK A SERVICE
    <span className="text-white/60">→</span>
  </a>

  <a
    href="tel:0279165555"
    className="inline-flex items-center gap-3 rounded-sm border border-white/15 px-8 py-4 text-sm font-semibold tracking-widest text-foreground transition-all duration-300 hover:border-blue-400/40 hover:bg-white/5"
  >
    CALL THE WORKSHOP
  </a>
</div>
        </div>
      </section>

    </div>
  );
}