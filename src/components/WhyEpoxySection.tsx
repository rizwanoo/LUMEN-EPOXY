import React, { useState, useEffect, useRef } from 'react';
import { Award, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export const WhyEpoxySection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    years: 0,
    floors: 0,
    satisfaction: 0,
    warranty: 0,
  });

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            setCounts({
              years: Math.round(10 * easeOutProgress),
              floors: Math.round(500 * easeOutProgress),
              satisfaction: Math.round(100 * easeOutProgress),
              warranty: Math.round(20 * easeOutProgress),
            });

            if (frame === totalFrames) {
              clearInterval(timer);
              setCounts({
                years: 10,
                floors: 500,
                satisfaction: 100,
                warranty: 20,
              });
            }
          }, frameDuration);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats = [
    {
      value: `${counts.years}+`,
      label: 'Years Experience',
      desc: 'Master certified polymer applicators with over a decade of luxury floor engineering.',
      icon: Award,
      color: 'text-cyan-700 bg-cyan-50 border-cyan-200',
    },
    {
      value: `${counts.floors}+`,
      label: 'Floors Completed',
      desc: 'Commercial showrooms, aircraft hangars, and bespoke architectural spaces.',
      icon: CheckCircle2,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      value: `${counts.satisfaction}%`,
      label: 'Master Precision',
      desc: 'Zero solvent diluents, 100% solid commercial resin, and laser-calibrated leveling.',
      icon: ShieldCheck,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      value: `${counts.warranty}-Yr`,
      label: 'Lifetime Guarantee',
      desc: 'Full transferrable warranty against hot-tire delamination, peeling, and moisture failure.',
      icon: Sparkles,
      color: 'text-slate-900 bg-slate-100 border-slate-200',
    },
  ];

  return (
    <section ref={sectionRef} id="why-epoxy" className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-100">
      
      {/* Background Decorative Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-tenor font-bold uppercase tracking-[0.2em] text-slate-900 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-600" />
            <span>Proven Industrial Reliability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-syne">
            Built for Extreme Demands.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
            Our 100% solid epoxy and polyaspartic coatings are engineered for luxury spaces where durability, precision, and flawless aesthetics are non-negotiable.
          </p>
        </div>

        {/* 4 Luxury Animated Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-400 transition-all relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">0{i + 1}</span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-syne tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-900 font-tenor tracking-wider uppercase mt-1.5">{stat.label}</div>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-sans">{stat.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
