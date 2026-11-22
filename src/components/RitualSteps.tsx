import React, { useState } from 'react';
import { RITUAL_STEPS } from '../data/catalog';
import { SafeImage, ShootGuideTag } from './ProductVisual';

export const RitualSteps: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      aria-labelledby="ritual-heading"
      className="py-16 sm:py-24 bg-white border-y border-[#E5E7EB]"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
              5 Seconds to Clean Hydration
            </p>
            <h2
              id="ritual-heading"
              className="font-display text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] text-[#111412] text-balance"
            >
              How It Works
            </h2>
          </div>
          <p className="text-[14px] text-[#111412]/65 max-w-sm">
            No sticky scoops, no chalky residue. Just cold water and one precision-dosed 5g sachet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RITUAL_STEPS.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={`cursor-pointer rounded-xl border transition-colors overflow-hidden flex flex-col bg-[#FAFAFA] ${
                  isActive
                    ? 'border-[#548530] bg-white'
                    : 'border-[#E5E7EB] hover:border-[#111412]/30'
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111412]">
                  <SafeImage
                    src={item.photo}
                    alt={`${item.step}. ${item.title}`}
                    fallbackTitle={item.title}
                    className="h-full w-full object-cover"
                  />
                  <ShootGuideTag label={item.shotCode} className="bottom-2.5 left-2.5" />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-display text-[13px] font-extrabold tabular-nums text-[#548530]">
                        {item.step}.
                      </span>
                      <span className="text-[12px] text-[#111412]/50">
                        {item.detail}
                      </span>
                    </div>
                    <h3 className="font-display text-[17px] font-bold tracking-tight text-[#111412]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.55] text-[#111412]/68">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
