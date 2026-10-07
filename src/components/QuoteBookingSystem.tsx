import React, { useState } from 'react';
import { Sparkles, Check, Calculator, FileText, CheckCircle2, AlertCircle, Phone, Calendar, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FlooringFinishId } from '../types';

interface QuoteBookingSystemProps {
  initialFinish?: FlooringFinishId;
}

export const QuoteBookingSystem: React.FC<QuoteBookingSystemProps> = ({ initialFinish = 'metallic' }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [spaceType, setSpaceType] = useState<string>('garage');
  const [sqft, setSqft] = useState<number>(650);
  const [finish, setFinish] = useState<FlooringFinishId>(initialFinish);
  const [condition, setCondition] = useState<string>('minor_cracks');
  const [includeVaporBarrier, setIncludeVaporBarrier] = useState<boolean>(true);
  const [includeTopcoatShield, setIncludeTopcoatShield] = useState<boolean>(true);

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [preferredTimeline, setPreferredTimeline] = useState<string>('within_month');
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  // Calculate live estimate
  const finishRates: Record<FlooringFinishId, number> = {
    metallic: 9.5,
    flake: 6.8,
    quartz: 8.2,
    highgloss: 8.5,
  };

  const conditionRates: Record<string, number> = {
    new: 0.5,
    minor_cracks: 1.0,
    heavy_damage: 2.2,
    existing_coating: 1.8,
  };

  const baseRate = finishRates[finish] || 7.5;
  const prepRate = conditionRates[condition] || 1.0;
  const addonRate = (includeVaporBarrier ? 1.2 : 0) + (includeTopcoatShield ? 0.8 : 0);
  const pricePerSqFt = baseRate + prepRate + addonRate;
  const total = Math.round(sqft * pricePerSqFt);
  const minTotal = Math.round(total * 0.95);
  const maxTotal = Math.round(total * 1.08);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!phone.trim() || phone.length < 7) newErrors.phone = 'Please enter a valid phone number.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please enter a valid email address.';
    if (!address.trim()) newErrors.address = 'Please enter your project address or city.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const code = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmationCode(code);
      setIsSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#0284c7', '#2563eb', '#10b981', '#f59e0b'],
        });
      } catch (err) {
        // Safe fallback
      }
    }, 700);
  };

  const finishNames: Record<FlooringFinishId, string> = {
    metallic: 'Metallic Liquid Marble Epoxy',
    flake: 'Full Flake Polyaspartic System',
    quartz: 'Commercial Quartz Aggregate System',
    highgloss: 'High-Gloss Solid Mirror Epoxy',
  };

  return (
    <section id="quote-calculator" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-widest text-amber-900 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Instant Estimator & Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-display">
            Get Your Instant Floor Quote.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans">
            Select your space options below for an immediate cost calculation and free laser measure booking.
          </p>
        </div>

        {/* Small, Compact Single-Scroll Card */}
        <div className="bg-[#FAF9F6] border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative">
          
          {submitted ? (
            /* Compact Success State */
            <div className="text-center py-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                  Estimate & Booking Confirmed
                </span>
                <h3 className="text-2xl font-bold text-slate-950 font-display mt-2">
                  Thank You, {fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  Your estimate code is <strong className="font-mono text-slate-900">{confirmationCode}</strong>. Our senior estimator will reach out within 2 hours.
                </p>
              </div>

              {/* Compact Ticket */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5 max-w-md mx-auto text-left space-y-2.5 text-xs shadow-xs">
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Finish:</span>
                  <span className="font-bold text-slate-900">{finishNames[finish]}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Surface Area:</span>
                  <span className="font-bold text-slate-900 font-mono">{sqft} sq ft</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Estimated Total:</span>
                  <span className="font-bold text-amber-700 font-mono text-sm">${minTotal.toLocaleString()} – ${maxTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Location:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[200px]">{address}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Summary</span>
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Edit Options
                </button>
              </div>
            </div>
          ) : (
            /* Scroll Down Options Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Option 1: Space Type Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-cinzel tracking-wider text-slate-800 uppercase">
                    1. Space Type
                  </label>
                  <select
                    value={spaceType}
                    onChange={(e) => setSpaceType(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-stone-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs cursor-pointer"
                  >
                    <option value="garage">Luxury Residential Garage (1–6 Cars)</option>
                    <option value="showroom">Automotive Showroom / Dealership</option>
                    <option value="residential">Modern Residential Living / Basement</option>
                    <option value="commercial">Commercial Retail / Restaurant</option>
                    <option value="industrial">Industrial Facility / Warehouse</option>
                    <option value="aviation">Aviation & Aircraft Hangar</option>
                    <option value="other">Custom Architectural Project</option>
                  </select>
                </div>

                {/* Option 2: Epoxy Finish Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-cinzel tracking-wider text-slate-800 uppercase">
                    2. Desired Finish System
                  </label>
                  <select
                    value={finish}
                    onChange={(e) => setFinish(e.target.value as FlooringFinishId)}
                    className="w-full px-3.5 py-3 rounded-xl border border-stone-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs cursor-pointer"
                  >
                    <option value="metallic">Metallic Liquid Marble (98+ GU Mirror Gloss)</option>
                    <option value="flake">Full Flake Polyaspartic (Anti-Slip & Tough)</option>
                    <option value="quartz">Commercial Quartz Aggregate (14,000+ PSI)</option>
                    <option value="highgloss">High-Gloss Solid Epoxy (Monolithic Glass)</option>
                  </select>
                </div>
              </div>

              {/* Option 3: Square Footage Slider & Quick Presets */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200/90 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold font-cinzel tracking-wider text-slate-800 uppercase">
                    3. Floor Area (Square Feet)
                  </label>
                  <div className="flex items-center gap-1 font-mono font-bold text-slate-950 text-sm bg-stone-100 px-3 py-1 rounded-lg border border-stone-200">
                    <span>{sqft}</span>
                    <span className="text-xs text-stone-500 font-sans font-normal">sq ft</span>
                  </div>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="25"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: '400 sq ft (2-Car)', val: 400 },
                    { label: '650 sq ft (3-Car)', val: 650 },
                    { label: '1,000 sq ft', val: 1000 },
                    { label: '2,500 sq ft', val: 2500 },
                    { label: '5,000 sq ft', val: 5000 },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setSqft(preset.val)}
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                        sqft === preset.val
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 4: Concrete Condition Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-cinzel tracking-wider text-slate-800 uppercase">
                    4. Current Concrete Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-stone-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs cursor-pointer"
                  >
                    <option value="new">New / Bare Clean Concrete</option>
                    <option value="minor_cracks">Minor Hairline Cracks & Stains</option>
                    <option value="heavy_damage">Heavy Damage / Pitted & Spalled Concrete</option>
                    <option value="existing_coating">Existing Peeling Paint or Old Epoxy</option>
                  </select>
                </div>

                {/* Option 5: Installation Timeline Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-cinzel tracking-wider text-slate-800 uppercase">
                    5. Target Installation Window
                  </label>
                  <select
                    value={preferredTimeline}
                    onChange={(e) => setPreferredTimeline(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-stone-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs cursor-pointer"
                  >
                    <option value="asap">Immediate Priority (Within 1–2 Weeks)</option>
                    <option value="within_month">Within 30 Days</option>
                    <option value="1_3_months">1 to 3 Months</option>
                    <option value="planning">Budget Planning / Feasibility</option>
                  </select>
                </div>
              </div>

              {/* Contact Information Fields */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 space-y-4 shadow-xs">
                <div className="text-xs font-bold font-cinzel tracking-wider text-slate-800 uppercase pb-1 border-b border-stone-100">
                  6. Contact & Project Location
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-600">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                    {errors.phone && <p className="text-[11px] text-rose-600">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                    {errors.email && <p className="text-[11px] text-rose-600">{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Project Address / City *"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                    {errors.address && <p className="text-[11px] text-rose-600">{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Live Estimate Strip & Action Button */}
              <div className="bg-slate-950 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div>
                  <div className="text-[11px] font-cinzel font-bold text-amber-300 uppercase tracking-widest">
                    Live Projected Investment
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-0.5">
                    ${minTotal.toLocaleString()} – ${maxTotal.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    ${pricePerSqFt.toFixed(2)}/sq ft · Diamond Grind & 20-Yr Warranty Included
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm font-cinzel tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Request Laser Measure & Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
