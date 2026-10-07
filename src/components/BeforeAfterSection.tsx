import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeftRight, Sparkles, Shield, AlertTriangle, Hammer } from 'lucide-react';
import { BEFORE_IMAGE, AFTER_IMAGE } from '../data/flooringData';

interface BeforeAfterSectionProps {
  onOpenQuote: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onOpenQuote }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section id="before-after" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-gradient-to-r from-cyan-100/20 via-blue-50/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-tenor font-bold uppercase tracking-[0.2em] text-slate-900 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
            <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-600" />
            <span>Interactive Transformation Slider</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-syne">
            From Concrete to Showpiece.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans">
            We don't simply cover your floor. We transform the entire space. Drag the slider below to reveal the dramatic difference diamond grinding and 100% solid epoxy make.
          </p>
        </div>

        {/* Interactive Comparison Viewport */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 cursor-ew-resize select-none bg-slate-950"
          >
            {/* AFTER Image */}
            <img
              src={AFTER_IMAGE}
              alt="Transformed garage floor with high-gloss epoxy finish"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* AFTER Label Tag */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 pointer-events-none bg-slate-950/85 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-xs font-tenor font-bold uppercase tracking-wider border border-cyan-400/50 shadow-lg flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>AFTER: LUMEN Epoxy System</span>
            </div>

            {/* BEFORE Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={BEFORE_IMAGE}
                alt="Worn, cracked concrete garage floor before transformation"
                className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                referrerPolicy="no-referrer"
              />

              {/* BEFORE Label Tag */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 bg-slate-950/85 backdrop-blur-md text-slate-200 px-4 py-1.5 rounded-xl text-xs font-tenor font-bold uppercase tracking-wider border border-slate-700 shadow-lg flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>BEFORE: Raw Cracked Concrete</span>
              </div>
            </div>

            {/* Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Vertical Glowing Hairline */}
              <div className="w-[3px] h-full bg-white shadow-[0_0_14px_rgba(6,182,212,0.9)] -translate-x-1/2" />
              
              {/* Center Handle Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-900 shadow-2xl border-2 border-cyan-500 flex items-center justify-center pointer-events-auto hover:scale-110 active:scale-95 transition-transform">
                <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
              </div>
            </div>

            {/* Bottom floating helper hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-sans font-medium px-4 py-1.5 rounded-full border border-white/20 shadow-md">
              Drag left or right to compare transformation
            </div>
          </div>

          {/* Key Improvements Comparison List */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950 font-syne">Diamond Ground & Healed</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-sans">
                  All oil stains, hairline fractures, and surface spalling permanently leveled and patched with high-tensile polyurea.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950 font-syne">Mirror Light Amplification</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-sans">
                  High-gloss light reflectivity amplifies ambient and fixture lighting by up to 300%, illuminating the entire space.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950 font-syne">Zero Concrete Dust</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-sans">
                  Raw concrete constantly generates fine silica powder. Epoxy seals the slab completely for a sterile, clean interior.
                </p>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="mt-8 text-center">
            <button
              onClick={onOpenQuote}
              className="px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-tenor font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all"
            >
              Get Transformation Estimate For Your Floor
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
