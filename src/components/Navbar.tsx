import React, { useState, useEffect } from 'react';
import { Phone, ArrowUpRight, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'showcase', 'before-after', 'why-epoxy', 'gallery', 'quote-calculator'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero', id: 'hero' },
    { label: 'FINISHES', href: '#showcase', id: 'showcase' },
    { label: 'BEFORE & AFTER', href: '#before-after', id: 'before-after' },
    { label: 'WHY EPOXY', href: '#why-epoxy', id: 'why-epoxy' },
    { label: 'PORTFOLIO', href: '#gallery', id: 'gallery' },
    { label: 'ESTIMATOR', href: '#quote-calculator', id: 'quote-calculator' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Wordmark (Exact match to reference style) */}
          <a
            href="#hero"
            className="flex items-center gap-2 group text-white focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-luxury tracking-[0.2em] font-normal uppercase text-white drop-shadow-md">
              LUMEN<span className="font-semibold text-cyan-300">EPOXY</span>
            </span>
          </a>

          {/* Center Capsule Nav (Exact match to reference screenshot) */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-tenor font-bold tracking-[0.12em] transition-all ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Zone (Exact match to reference pill button) */}
          <div className="flex items-center gap-3">
            <a
              href="tel:18005863676"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-tenor font-bold tracking-wider text-white/90 hover:text-cyan-300 transition-colors px-3 py-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>(800) 586-3676</span>
            </a>

            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-cyan-300 font-tenor font-bold text-xs tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>GET A QUOTE</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/70 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 w-full max-w-xs bg-slate-950 h-full p-6 flex flex-col justify-between text-white border-l border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6 pt-16">
              <div className="text-xl font-luxury tracking-widest text-white border-b border-white/10 pb-4">
                LUMEN EPOXY
              </div>
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-xs font-tenor font-bold tracking-widest uppercase text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href="tel:18005863676"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white/10 text-white text-xs font-tenor font-bold tracking-wider"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call (800) 586-3676</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3.5 rounded-full bg-white text-slate-950 text-xs font-tenor font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <span>Request Free Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
