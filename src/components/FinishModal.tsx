import React, { useState } from 'react';
import { X, Sparkles, Shield, Check, ArrowRight } from 'lucide-react';
import { FlooringFinish } from '../types';

interface FinishModalProps {
  finish: FlooringFinish | null;
  onClose: () => void;
  onSelectForQuote: (finishId: string) => void;
}

export const FinishModal: React.FC<FinishModalProps> = ({ finish, onClose, onSelectForQuote }) => {
  const [selectedSwatch, setSelectedSwatch] = useState(0);

  if (!finish) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-tenor font-bold uppercase tracking-wider text-slate-800">
              LUMEN Architectural Specification
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
          
          {/* Main Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Image & Texture Preview */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-950 group">
                <img
                  src={finish.image}
                  alt={finish.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-tenor uppercase text-cyan-300 font-bold tracking-wider">
                    {finish.texturePattern}
                  </div>
                  <div className="text-lg font-bold font-syne">{finish.title}</div>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2">
                <span className="text-xs font-tenor font-bold uppercase tracking-wider text-slate-400">
                  Available Pigment Formulas
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {finish.swatches.map((swatch, idx) => (
                    <button
                      key={swatch.name}
                      onClick={() => setSelectedSwatch(idx)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                        selectedSwatch === idx
                          ? 'border-cyan-500 bg-cyan-50/50 ring-1 ring-cyan-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full shadow-inner border border-white/60 shrink-0"
                        style={{
                          background: swatch.secondaryColor
                            ? `linear-gradient(135deg, ${swatch.colorHex}, ${swatch.secondaryColor})`
                            : swatch.colorHex,
                        }}
                      />
                      <span className="text-xs font-medium text-slate-800 truncate font-sans">{swatch.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content & Specs */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-tenor font-bold text-cyan-700 uppercase tracking-widest">
                  {finish.subtitle}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 font-syne">
                  {finish.title}
                </h3>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed font-sans">
                  {finish.longDescription}
                </p>
              </div>

              {/* Best For Tags */}
              <div className="space-y-2">
                <span className="text-xs font-tenor font-bold uppercase tracking-wider text-slate-400">
                  Ideal Applications
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {finish.bestFor.map((app) => (
                    <span
                      key={app}
                      className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md font-sans"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200">
                <div>
                  <div className="text-[10px] font-tenor text-slate-400 uppercase font-bold">Compressive Rating</div>
                  <div className="text-sm font-mono font-bold text-slate-950">{finish.specs.durability}</div>
                </div>
                <div>
                  <div className="text-[10px] font-tenor text-slate-400 uppercase font-bold">Gloss Reflection</div>
                  <div className="text-sm font-mono font-bold text-cyan-700">{finish.specs.glossLevel}</div>
                </div>
                <div>
                  <div className="text-[10px] font-tenor text-slate-400 uppercase font-bold">System Build</div>
                  <div className="text-sm font-mono font-bold text-slate-950">{finish.specs.thickness}</div>
                </div>
                <div>
                  <div className="text-[10px] font-tenor text-slate-400 uppercase font-bold">Cure Window</div>
                  <div className="text-sm font-mono font-bold text-slate-950">{finish.specs.cureTime}</div>
                </div>
              </div>

            </div>
          </div>

          {/* Key Advantages */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-tenor font-bold uppercase tracking-wider text-slate-950">
              System Engineering Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {finish.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-sans">
                  <div className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-[#F8FAFC] border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-sans">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Backed by LUMEN {finish.specs.warranty}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-tenor font-semibold text-slate-700 hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectForQuote(finish.id);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-tenor font-bold tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
            >
              <span>Get Free Quote for {finish.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
