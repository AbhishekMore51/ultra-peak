import React from 'react';
import { ArrowRight } from 'lucide-react';
import { USE_CASES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SafeImage, ShootGuideTag } from './ProductVisual';

export const UseCaseGrid: React.FC = () => {
  const { navigateToProduct } = useStore();

  return (
    <section
      aria-labelledby="usecase-heading"
      className="py-16 sm:py-24 bg-white border-y border-[#E5E7EB]"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="max-w-xl mb-10">
          <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
            Engineered for Real Indian Conditions
          </p>
          <h2
            id="usecase-heading"
            className="font-display text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] text-[#111412] text-balance"
          >
            Shop by When You Sweat or Focus
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USE_CASES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateToProduct(item.recommendedFlavour)}
              className="group relative aspect-[4/4.8] w-full rounded-xl overflow-hidden text-left border border-[#E5E7EB] bg-[#111412] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548530]"
            >
              <SafeImage
                src={item.photo}
                alt={item.title}
                fallbackTitle={item.title}
                accentHex={item.accentHex}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Measured dark contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111412]/92 via-[#111412]/38 to-transparent" />

              <ShootGuideTag label={item.shotCode} className="top-3 left-3" />

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-display text-[20px] font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-white/80 line-clamp-3">
                  {item.subtitle}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#A8C632] group-hover:gap-2.5 transition-all">
                  <span>{item.ctaLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
