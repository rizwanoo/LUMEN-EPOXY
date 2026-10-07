import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Shield, Droplets, CheckCircle2, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { HERO_BRIGHT_LUXURY_IMAGE } from '../data/flooringData';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreFloors: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onExploreFloors }) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const sideLeftRef = useRef<HTMLDivElement>(null);
  const sideRightRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Image: Cinematic lens focus and zoom settle
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.12, filter: 'blur(6px)', opacity: 0.8 },
          {
            scale: 1.0,
            filter: 'blur(0px)',
            opacity: 1,
            duration: 1.8,
            ease: 'power2.out',
          }
        );
      }

      // Master Timeline for Text Elements
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        kickerRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, delay: 0.15 }
      )
        .fromTo(
          headlineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.05 },
          '-=0.45'
        )
        .fromTo(
          paragraphRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          '-=0.65'
        )
        .fromTo(
          ctaGroupRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.55'
        )
        .fromTo(
          metricsRef.current ? Array.from(metricsRef.current.children) : [],
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.12 },
          '-=0.5'
        )
        .fromTo(
          [sideLeftRef.current, sideRightRef.current, scrollCueRef.current],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 text-white"
    >
      {/* 100% FULL-BLEED FULLSCREEN HERO BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgImageRef}
          src={HERO_BRIGHT_LUXURY_IMAGE}
          alt="Luxury architectural showroom with high-gloss mirror epoxy floor"
          className="w-full h-full object-cover object-center will-change-transform"
          referrerPolicy="no-referrer"
          loading="eager"
        />

        {/* Cinematic Soft Gradient for Flawless Pure Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/40" />
      </div>

      {/* Left Vertical Side Indicator */}
      <div
        ref={sideLeftRef}
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 items-center gap-3 -rotate-90 origin-left text-[11px] font-tenor font-bold tracking-[0.3em] uppercase text-white/60 select-none"
      >
        <span className="w-8 h-[1px] bg-white/40" />
        <span>SCROLL DOWN</span>
      </div>

      {/* Right Vertical Side Indicator */}
      <div
        ref={sideRightRef}
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 items-center gap-3 rotate-90 origin-right text-[11px] font-tenor font-bold tracking-[0.3em] uppercase text-white/60 select-none"
      >
        <span>ARCHITECTURAL EPOXY</span>
        <span className="w-8 h-[1px] bg-white/40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-20 my-auto text-center sm:text-left">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          
          {/* Kicker Badge */}
          <div
            ref={kickerRef}
            className="inline-flex items-center gap-2.5 text-xs font-tenor tracking-[0.25em] uppercase text-cyan-300 bg-black/40 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-white font-bold">2026 ARCHITECTURAL COATING</span>
            <span className="text-white/40">·</span>
            <span className="text-cyan-300 font-semibold">100% COMMERCIAL SOLIDS</span>
          </div>

          {/* Editorial Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-tight leading-[1.04] font-luxury text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          >
            Floors That Make Every Space <span className="italic text-cyan-300 font-normal">Shine.</span>
          </h1>

          {/* Supporting Text */}
          <p
            ref={paragraphRef}
            className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Premium epoxy flooring engineered for durability, beauty, and a finish that commands attention. Monolithic mirror reflections for luxury showrooms, exotic garages, and architectural spaces.
          </p>

          {/* Action Buttons */}
          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row items-center sm:items-center gap-4 pt-2"
          >
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-tenor font-bold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:shadow-[0_0_45px_rgba(6,182,212,0.8)] hover:scale-105 active:scale-100 transition-all flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>GET A FREE QUOTE</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={onExploreFloors}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-tenor font-bold tracking-[0.16em] uppercase backdrop-blur-md flex items-center justify-center gap-2 hover:border-white transition-all"
            >
              <span>EXPLORE OUR FLOORS</span>
              <ChevronDown className="w-4 h-4 text-cyan-300" />
            </button>
          </div>

          {/* Metrics Directly on Background */}
          <div
            ref={metricsRef}
            className="pt-8 border-t border-white/20 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl text-left"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-white font-mono font-bold text-lg sm:text-2xl drop-shadow-md">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>20-Year</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-tenor uppercase tracking-widest">
                Lifetime Adhesion
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-white font-mono font-bold text-lg sm:text-2xl drop-shadow-md">
                <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>10,200</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-tenor uppercase tracking-widest">
                PSI Strength
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-white font-mono font-bold text-lg sm:text-2xl drop-shadow-md">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>98+ GU</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-tenor uppercase tracking-widest">
                Mirror Gloss
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Subtle Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="relative z-10 w-full pb-8 flex items-center justify-center gap-3 text-xs font-tenor tracking-[0.25em] uppercase text-white/60"
      >
        <span className="w-12 h-[1px] bg-white/30" />
        <span>BEGIN SCROLLING</span>
        <span className="w-12 h-[1px] bg-white/30" />
      </div>

    </section>
  );
};
