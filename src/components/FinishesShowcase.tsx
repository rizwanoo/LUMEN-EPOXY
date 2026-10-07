import React, { useState } from 'react';
import { ArrowRight, Sparkles, Shield, Eye, Gauge } from 'lucide-react';
import { FLOORING_FINISHES } from '../data/flooringData';
import { FlooringFinish, FlooringFinishId } from '../types';
import { FinishModal } from './FinishModal';

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

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {FLOORING_FINISHES.map((finish) => {
            return (
              <div
                key={finish.id}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Image Viewport */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-950">
                  <img
                    src={finish.image}
                    alt={finish.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Reflection Sheen Layer on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent transition-opacity duration-300" />
                  
                  {/* Floating Top Tag */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="text-[10px] font-tenor font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-slate-950 px-3 py-1 rounded-md shadow-sm border border-slate-200">
                      {finish.texturePattern}
                    </span>
                  </div>

                  {/* Floating Gloss Rating */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[10px] font-mono font-bold text-cyan-900 bg-cyan-50/95 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-200/80 shadow-sm">
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
                    <h3 className="text-2xl font-bold text-slate-950 group-hover:text-cyan-700 transition-colors font-syne">
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
                      onClick={() => setActiveModalFinish(finish)}
                      className="flex-1 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-tenor font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>VIEW FINISH</span>
                    </button>

                    <button
                      onClick={() => onOpenQuoteWithFinish(finish.id)}
                      className="px-5 py-3 rounded-xl border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50/50 text-slate-800 hover:text-cyan-700 text-xs font-tenor font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5"
                    >
                      <span>Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
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
