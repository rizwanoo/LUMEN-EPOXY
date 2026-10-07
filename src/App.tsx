/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FinishesShowcase } from './components/FinishesShowcase';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { WhyEpoxySection } from './components/WhyEpoxySection';
import { ProjectGallery } from './components/ProjectGallery';
import { QuoteBookingSystem } from './components/QuoteBookingSystem';
import { PremiumCtaSection } from './components/PremiumCtaSection';
import { Footer } from './components/Footer';
import { FloatingQuoteTrigger } from './components/FloatingQuoteTrigger';
import { FlooringFinishId } from './types';

export default function App() {
  const [selectedFinishForQuote, setSelectedFinishForQuote] = useState<FlooringFinishId>('metallic');

  const scrollToQuote = (finishId?: FlooringFinishId) => {
    if (finishId) {
      setSelectedFinishForQuote(finishId);
    }
    const element = document.getElementById('quote-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToFinishes = () => {
    const element = document.getElementById('showcase');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 selection:bg-cyan-500 selection:text-white flex flex-col antialiased">
      {/* Top Bar Navigation */}
      <Navbar onOpenQuote={() => scrollToQuote()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Cinematic Background & Floating 3D Cards */}
        <Hero
          onOpenQuote={() => scrollToQuote()}
          onExploreFloors={scrollToFinishes}
        />

        {/* Finishes Showcase: Choose Your Finish */}
        <FinishesShowcase
          onOpenQuoteWithFinish={(finishId) => scrollToQuote(finishId)}
        />

        {/* Before & After Interactive Transformation Slider */}
        <BeforeAfterSection
          onOpenQuote={() => scrollToQuote()}
        />

        {/* Why Epoxy: Luxury Metric Cards */}
        <WhyEpoxySection />

        {/* Completed Projects Gallery with Lightbox */}
        <ProjectGallery
          onOpenQuoteWithFinish={(finishId) => scrollToQuote(finishId)}
        />

        {/* Premium CTA Section */}
        <PremiumCtaSection
          onOpenQuote={() => scrollToQuote()}
        />

        {/* Compact Single-Scroll Quote / Booking System */}
        <QuoteBookingSystem
          initialFinish={selectedFinishForQuote}
          key={selectedFinishForQuote}
        />
      </main>

      {/* Footer */}
      <Footer onOpenQuote={() => scrollToQuote()} />

      {/* Floating Quick Quote / Cost Estimator Pill */}
      <FloatingQuoteTrigger onOpenQuote={() => scrollToQuote()} />
    </div>
  );
}
