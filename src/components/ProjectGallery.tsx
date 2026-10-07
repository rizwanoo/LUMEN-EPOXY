import React, { useState } from 'react';
import { Sparkles, ArrowRight, MapPin, Layers, Maximize2 } from 'lucide-react';
import { GALLERY_PROJECTS } from '../data/flooringData';
import { GalleryProject, FlooringFinishId } from '../types';
import { LightboxModal } from './LightboxModal';

interface ProjectGalleryProps {
  onOpenQuoteWithFinish: (finishId: FlooringFinishId) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onOpenQuoteWithFinish }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'showrooms' | 'garages' | 'aviation' | 'commercial' | 'residential'>('all');
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'showrooms', label: 'Showrooms' },
    { id: 'garages', label: 'Luxury Garages' },
    { id: 'aviation', label: 'Aviation & Hangars' },
    { id: 'commercial', label: 'Commercial Labs' },
    { id: 'residential', label: 'Residential' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-tenor font-bold uppercase tracking-[0.2em] text-slate-900 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Completed Client Commissions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-syne">
              Masterwork Portfolio.
            </h2>
            <p className="text-base text-slate-600 max-w-xl font-sans">
              From exotic car collectors to aerospace hangars, view our recent architectural transformations.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl shadow-xs self-start md:self-auto">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3.5 py-2 text-xs font-tenor font-semibold tracking-wider rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Viewport */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Floating Category Tag */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="text-[10px] font-tenor font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-slate-950 px-2.5 py-1 rounded-md shadow-xs">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md text-white flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Overlay Project Title & Location */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-white">
                  <div className="text-base font-bold font-syne leading-tight drop-shadow-sm group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 mt-1 font-sans">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" /> {project.location}
                    </span>
                    <span className="font-mono tabular-nums">{project.sqft.toLocaleString()} sq ft</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between text-xs bg-white font-sans">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Layers className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="truncate max-w-[200px]">{project.finishType}</span>
                </div>
                <span className="text-cyan-700 font-tenor font-bold tracking-wider uppercase group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <LightboxModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenQuoteWithFinish={onOpenQuoteWithFinish}
        />
      )}
    </section>
  );
};
