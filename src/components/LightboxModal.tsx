import React from 'react';
import { X, MapPin, Calendar, Layers, ArrowRight } from 'lucide-react';
import { GalleryProject, FlooringFinishId } from '../types';

interface LightboxModalProps {
  project: GalleryProject | null;
  onClose: () => void;
  onOpenQuoteWithFinish: (finishId: FlooringFinishId) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ project, onClose, onOpenQuoteWithFinish }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-tenor font-bold uppercase tracking-wider text-cyan-900 bg-cyan-100/60 px-2.5 py-1 rounded">
              {project.categoryLabel}
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">{project.sqft.toLocaleString()} sq ft</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Close Project Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High Res Visual Viewport */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-none">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-syne drop-shadow-md">
              {project.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-200 mt-2 font-sans">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {project.location}
              </span>
              <span className="text-white/40">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {project.duration} Install
              </span>
              <span className="text-white/40">·</span>
              <span className="flex items-center gap-1 font-semibold text-cyan-300">
                <Layers className="w-3.5 h-3.5" /> {project.finishType}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Details & Action */}
        <div className="p-6 sm:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded font-sans"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenQuoteWithFinish(project.finishId);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-tenor font-bold tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>Request Similar Floor</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
