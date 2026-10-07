import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex items-center justify-center bg-slate-900 rounded-lg border border-slate-800 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white stroke-[1.5]" fill="none" stroke="currentColor">
                  <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" className="stroke-cyan-400" />
                  <polyline points="2,8.5 12,14 22,8.5" className="stroke-white/80" />
                </svg>
              </div>
              <span className="text-lg font-syne font-extrabold tracking-tight text-white">
                LUMEN<span className="text-cyan-400 font-light">SURFACES</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              Engineering high-performance 100% solid commercial epoxy and polyaspartic flooring systems. Built for supercars, modern architectural residences, and cleanroom facilities.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold pt-1 font-sans">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Master Polymer Applicators</span>
            </div>
          </div>

          {/* Flooring Finishes */}
          <div className="space-y-3">
            <h4 className="text-xs font-tenor font-bold uppercase tracking-wider text-slate-200">
              Flooring Systems
            </h4>
            <ul className="space-y-2 font-sans">
              <li>
                <a href="#showcase" className="hover:text-cyan-400 transition-colors">Metallic Liquid Marble</a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-cyan-400 transition-colors">Full Flake Polyaspartic</a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-cyan-400 transition-colors">Commercial Quartz Aggregate</a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-cyan-400 transition-colors">High-Gloss Mirror Solid</a>
              </li>
            </ul>
          </div>

          {/* Spaces & Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-tenor font-bold uppercase tracking-wider text-slate-200">
              Applications
            </h4>
            <ul className="space-y-2 font-sans">
              <li>
                <a href="#gallery" className="hover:text-cyan-400 transition-colors">Luxury Garages & Vaults</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-cyan-400 transition-colors">Automotive Dealerships</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-cyan-400 transition-colors">Aviation & Aircraft Hangars</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-cyan-400 transition-colors">Commercial Research Labs</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-cyan-400 transition-colors">Modern Residential Living</a>
              </li>
            </ul>
          </div>

          {/* Contact & Consultation */}
          <div className="space-y-3">
            <h4 className="text-xs font-tenor font-bold uppercase tracking-wider text-slate-200">
              Direct Contact
            </h4>
            <div className="space-y-2.5 font-sans">
              <a href="tel:18005863676" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>(800) 586-3676</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>estimates@lumensurfaces.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Nationwide Installation Teams</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenQuote}
                  className="w-full py-2.5 px-4 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-tenor font-bold text-xs tracking-wider uppercase transition-colors shadow-xs"
                >
                  Schedule Laser Measure
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-sans">
          <div>
            © {new Date().getFullYear()} LUMEN SURFACES Inc. All rights reserved. 20-Year Lifetime Adhesion Warranty.
          </div>
          <div className="flex items-center gap-6">
            <span>ASTM F2170 Moisture Compliant</span>
            <span>·</span>
            <span>Zero VOC Low Odor</span>
            <span>·</span>
            <span>ICRI CSP Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
