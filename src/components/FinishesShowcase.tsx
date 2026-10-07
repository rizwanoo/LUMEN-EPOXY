import React, { useState, useRef } from 'react';
import { ArrowRight, Sparkles, Shield, Eye, Gauge } from 'lucide-react';
import { gsap } from 'gsap';
import { FLOORING_FINISHES } from '../data/flooringData';
import { FlooringFinish, FlooringFinishId } from '../types';
import { FinishModal } from './FinishModal';

interface FinishCardProps {
  finish: FlooringFinish;
  onView: (finish: FlooringFinish) => void;
  onQuote: (finishId: FlooringFinishId) => void;
}

const FinishCard: React.FC<FinishCardProps> = ({ finish, onView, onQuote }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const quoteArrowRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;

    // Tactile card lift and glow
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.015,
      boxShadow:
        '0 25px 50px -12px rgba(6, 182, 212, 0.22), 0 12px 24px -6px rgba(15, 23, 42, 0.08)',
      borderColor: 'rgba(6, 182, 212, 0.5)',
      duration: 0.45,
      ease: 'power2.out',
    });

    // Deep texture zoom
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.08,
        duration: 0.65,
        ease: 'power2.out',
      });
    }

    // Specular light sheen wipe
    if (sheenRef.current) {
      gsap.fromTo(
        sheenRef.current,
        { x: '-120%', opacity: 0.55 },
        { x: '220%', opacity: 0, duration: 0.9, ease: 'power2.out' }
      );
    }

    // Floating badges micro-elevation
    if (tagRef.current && badgeRef.current) {
      gsap.to([tagRef.current, badgeRef.current], {
        y: -3,
        scale: 1.04,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    // Button arrow slide
    if (quoteArrowRef.current) {
      gsap.to(quoteArrowRef.current, {
        x: 4,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotationY: x * 5,
      rotationX: -y * 5,
      transformPerspective: 1000,
      duration: 0.25,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      y: 0,
      scale: 1.0,
      rotationY: 0,
      rotationX: 0,
      boxShadow:
        '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      borderColor: 'rgba(226, 232, 240, 0.9)',
      duration: 0.45,
      ease: 'power2.out',
    });

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.0,
        duration: 0.55,
        ease: 'power2.out',
      });
    }

    if (tagRef.current && badgeRef.current) {
      gsap.to([tagRef.current, badgeRef.current], {
        y: 0,
        scale: 1.0,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    if (quoteArrowRef.current) {
      gsap.to(quoteArrowRef.current, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm transition-colors flex flex-col justify-between will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Visual Image Viewport */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-950">
        <img
          ref={imageRef}
          src={finish.image}
          alt={finish.title}
          className="w-full h-full object-cover will-change-transform"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Specular Liquid Sheen Overlay */}
        <div
          ref={sheenRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent skew-x-12 pointer-events-none opacity-0 will-change-transform"
        />

        {/* Subtle Ambient Contrast Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

        {/* Floating Top Tag */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span
            ref={tagRef}
            className="text-[10px] font-tenor font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-slate-950 px-3 py-1 rounded-md shadow-sm border border-slate-200 will-change-transform"
          >
            {finish.texturePattern}
          </span>
        </div>

        {/* Floating Gloss Rating */}
        <div className="absolute top-4 right-4 z-10">
          <span
            ref={badgeRef}
            className="text-[10px] font-mono font-bold text-cyan-900 bg-cyan-50/95 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-200/80 shadow-sm will-change-transform"
          >
            {finish.specs.glossLevel}
          </span>
        </div>

        {/* Floating Overlay Info Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white font-sans">
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-cyan-300" /> {finish.specs.durability}
            </span>
            <span className="text-white/40">·</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-cyan-300" /> {finish.specs.warranty}
            </span>
          </div>
        </div>
      </div>

      {/* Card Information Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          <div className="text-xs font-tenor font-bold text-cyan-700 uppercase tracking-widest">
            {finish.subtitle}
          </div>
          <h3 className="text-2xl font-bold text-slate-950 font-syne">
            {finish.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            {finish.description}
          </p>
        </div>

        {/* Best for tags */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[10px] font-tenor font-bold text-slate-400 uppercase tracking-wider">
            Recommended Applications
          </div>
          <div className="flex flex-wrap gap-1.5">
            {finish.bestFor.map((item) => (
              <span
                key={item}
                className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md font-sans"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={() => onView(finish)}
            className="flex-1 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 active:scale-98 text-white text-xs font-tenor font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>VIEW FINISH</span>
          </button>

          <button
            onClick={() => onQuote(finish.id)}
            className="px-5 py-3 rounded-xl border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50/50 active:scale-98 text-slate-800 hover:text-cyan-700 text-xs font-tenor font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5"
          >
            <span>Quote</span>
            <ArrowRight ref={quoteArrowRef} className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface FinishesShowcaseProps {
  onOpenQuoteWithFinish: (finishId: FlooringFinishId) => void;
}

export const FinishesShowcase: React.FC<FinishesShowcaseProps> = ({ onOpenQuoteWithFinish }) => {
  const [activeModalFinish, setActiveModalFinish] = useState<FlooringFinish | null>(null);

  return (
    <section id="showcase" className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-100">
      {/* Subtle ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-tenor font-bold uppercase tracking-[0.2em] text-slate-900 bg-white px-4 py-1.5 rounded-full border border-slate-200/90 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Curated Architectural Finishes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-syne">
            Choose Your Finish.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans">
            From fluid metallic marble to resilient commercial quartz, explore our bespoke 100% solid flooring systems precision-engineered for beauty and performance.
          </p>
        </div>

        {/* 4 Cards Grid with GSAP Tactile Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {FLOORING_FINISHES.map((finish) => (
            <FinishCard
              key={finish.id}
              finish={finish}
              onView={(f) => setActiveModalFinish(f)}
              onQuote={(id) => onOpenQuoteWithFinish(id)}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activeModalFinish && (
        <FinishModal
          finish={activeModalFinish}
          onClose={() => setActiveModalFinish(null)}
          onSelectForQuote={(id) => onOpenQuoteWithFinish(id as FlooringFinishId)}
        />
      )}
    </section>
  );
};
