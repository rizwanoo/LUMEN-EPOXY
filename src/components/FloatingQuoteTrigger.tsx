import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

interface FloatingQuoteTriggerProps {
  onOpenQuote: () => void;
}

export const FloatingQuoteTrigger: React.FC<FloatingQuoteTriggerProps> = ({ onOpenQuote }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={onOpenQuote}
        className="group relative flex items-center gap-2 px-5 py-3 rounded-full bg-slate-950/90 hover:bg-slate-950 text-white text-xs font-tenor font-bold tracking-widest uppercase shadow-2xl border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <Calculator className="w-4 h-4 text-cyan-300" />
        <span className="hidden sm:inline">Instant Floor Cost Calculator</span>
        <span className="sm:hidden">Get Quote</span>
      </button>
    </div>
  );
};
