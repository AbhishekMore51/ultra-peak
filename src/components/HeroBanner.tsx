import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SafeImage, ShootGuideTag } from './ProductVisual';

export const HeroBanner: React.FC = () => {
  const { navigateToBundle } = useStore();

  const scrollToFlavours = () => {
    const el = document.getElementById('shop-flavours');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      aria-label="Ultrapeak Hero"
      className="relative bg-[#111412] text-white overflow-hidden"
    >
      {/* Full-bleed dark athletic studio photograph */}
      <div className="absolute inset-0">
        <SafeImage
          src={ASSETS.heroBanner}
          alt="Chilled glass of Ultrapeak citrus-lime electrolyte drink with fresh lime and mint splash on dark studio stone"
          fallbackTitle="Ultrapeak Hero Campaign"
          className="h-full w-full object-cover object-center lg:object-right opacity-90"
        />
        {/* Measured scrim ensuring >= 4.5:1 text contrast on the left focal zone */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111412]/95 via-[#111412]/72 to-[#111412]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111412]/75 via-transparent to-transparent sm:hidden" />
      </div>

      <ShootGuideTag
        label="Shot #01 · Homepage Hero Banner — High-Contrast Product & Splash"
        className="top-4 right-4"
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
        <div className="max-w-[600px]">
          {/* Devils Circuit Official Partner Authority Callout */}
          <div className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-medium text-[#A8C632] tracking-wide mb-5">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Official Electrolyte Partner – Devils Circuit</span>
          </div>

          <h1 className="font-display font-extrabold text-[clamp(2.35rem,4.4vw,3.9rem)] leading-[1.06] tracking-[-0.025em] text-white text-balance">
            Hydration Built for the Last Stretch.
          </h1>

          <p className="mt-5 text-[15px] sm:text-[17px] leading-[1.65] text-white/80 max-w-[510px]">
            5g race-bib ready electrolyte sachets with <strong className="font-semibold text-white">0g sugar</strong>,
            balanced Sodium, Potassium &amp; Magnesium, plus <strong className="font-semibold text-white">100mg L-Theanine</strong> for calm focus when heat and fatigue peak.
          </p>

          {/* Primary + Secondary CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={scrollToFlavours}
              className="inline-flex items-center justify-center gap-2 rounded-lg brand-gradient px-6 py-3.5 text-[14px] font-semibold text-white shadow-sm hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C632] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111412]"
            >
              <span>Shop Flavours</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={navigateToBundle}
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/[0.06] px-6 py-3.5 text-[14px] font-semibold text-white hover:bg-white/12 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Build Your Pack
            </button>
          </div>

          {/* Unboxed Clean Proof Line */}
          <div className="mt-9 pt-6 border-t border-white/12 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] sm:text-[13px] text-white/65">
            <span className="tabular-nums font-medium text-white/90">4.9 ★ (1,800+ athletes)</span>
            <span aria-hidden="true">·</span>
            <span>Starting at ₹249</span>
            <span aria-hidden="true">·</span>
            <span>FSSAI Licensed &amp; Lab Tested</span>
          </div>
        </div>
      </div>
    </section>
  );
};
