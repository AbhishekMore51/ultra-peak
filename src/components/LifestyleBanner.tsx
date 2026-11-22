import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SafeImage, ShootGuideTag } from './ProductVisual';

export const LifestyleBanner: React.FC = () => {
  const { navigateToBundle } = useStore();

  return (
    <section
      aria-label="Build Your Custom Hydration Pack"
      className="relative bg-[#111412] text-white overflow-hidden"
    >
      <div className="absolute inset-0">
        <SafeImage
          src={ASSETS.runnerBanner}
          alt="Indian marathon athlete running along coastal road at sunrise"
          fallbackTitle="Ultrapeak Athletic Campaign"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111412]/92 via-[#111412]/68 to-[#111412]/25" />
      </div>

      <ShootGuideTag
        label="Shot #02 · Athletic Lifestyle Runner Banner — Dawn Endurance Campaign"
        className="top-4 right-4"
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-[540px]">
          <p className="text-[12px] font-semibold tracking-wide text-[#A8C632] mb-3">
            Custom Hydration Box · Save up to 15%
          </p>
          <h2 className="font-display text-[30px] sm:text-[42px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white text-balance">
            Rotate Flavours. Never Hit Flavour Fatigue.
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-white/80">
            Mix Lemon Mint, Orange, Berry Blast, and Peach Mango in one custom Pack of 8, 16, or 32—tailored to your training week and workday routine.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={navigateToBundle}
              className="inline-flex items-center gap-2 rounded-lg brand-gradient px-6 py-3.5 text-[14px] font-semibold text-white hover:opacity-95 transition-opacity whitespace-nowrap shrink-0"
            >
              <span>Build Your Bundle</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="text-[13px] text-white/75 tabular-nums">
              From ₹53 / sachet on Pack of 32
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
