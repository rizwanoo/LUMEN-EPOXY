import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Phone } from 'lucide-react';
import { HERO_IMAGE } from '../data/flooringData';

interface PremiumCtaSectionProps {
  onOpenQuote: () => void;
}

export const PremiumCtaSection: React.FC<PremiumCtaSectionProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-950 text-white">
      {/* Background High-Gloss Epoxy Texture with Overlay */}
      <img
        src={HERO_IMAGE}
        alt="Glossy showroom floor background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Modern Light Sheen and Gradient Mask */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Unboxed Metadata Kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-tenor font-bold tracking-[0.2em] uppercase text-cyan-300 bg-slate-900/90 border border-cyan-500/30 px-4 py-1.5 rounded-full backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Transform Your Concrete Slab</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-syne text-white leading-tight">
          Your Floor Deserves <span className="font-luxury italic text-cyan-300 font-normal underline decoration-cyan-400 decoration-2 underline-offset-8">Better.</span>
        </h2>

        {/* Supporting Text */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed font-sans">
          Let’s turn your ordinary concrete into something extraordinary. Seamless, mirror-reflective, and engineered to last decades.
        </p>

        {/* Action Button with animated glow */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto relative group px-10 py-5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs font-tenor tracking-widest uppercase shadow-[0_0_35px_rgba(6,182,212,0.35)] hover:shadow-[0_0_55px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-100 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-cyan-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>REQUEST A FREE QUOTE</span>
            <ArrowRight className="w-4 h-4 text-cyan-600 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="tel:18005863676"
            className="w-full sm:w-auto px-7 py-5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-tenor font-bold tracking-wider uppercase backdrop-blur-md flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>Call (800) 586-3676</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-sans">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>20-Year Lifetime Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Free On-Site Laser Assessment</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>100% Commercial Solids · Zero VOC</span>
          </div>
        </div>

      </div>
    </section>
  );
};
