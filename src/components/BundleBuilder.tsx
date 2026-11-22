import React, { useMemo, useState } from 'react';
import { Check, Minus, Plus, RotateCcw, Sparkles } from 'lucide-react';
import { BUNDLE_TIERS, CORE_FLAVOURS, CoreFlavourSlug } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductVisual } from './ProductVisual';

const EMPTY_COUNTS: Record<CoreFlavourSlug, number> = {
  'lemon-mint': 0,
  orange: 0,
  'berry-blast': 0,
  'peach-mango': 0,
};

export const BundleBuilder: React.FC = () => {
  const { addCustomBundleToCart } = useStore();
  const [packSize, setPackSize] = useState<8 | 16 | 32>(16);
  const [counts, setCounts] = useState<Record<CoreFlavourSlug, number>>({
    'lemon-mint': 4,
    orange: 4,
    'berry-blast': 4,
    'peach-mango': 4,
  });

  const activeTier =
    BUNDLE_TIERS.find((t) => t.size === packSize) ?? BUNDLE_TIERS[1];

  const totalSelected = useMemo(
    () => Object.values(counts).reduce((sum, n) => sum + n, 0),
    [counts]
  );

  const remaining = Math.max(0, packSize - totalSelected);
  const isFull = totalSelected === packSize;
  const savingsAmount = activeTier.mrp - activeTier.price;
  const perSachet = Math.round(activeTier.price / activeTier.size);

  const handlePackChange = (newSize: 8 | 16 | 32) => {
    setPackSize(newSize);
    // Proportionally adjust or keep clean if current total exceeds new size
    if (totalSelected > newSize) {
      const even = newSize / 4;
      setCounts({
        'lemon-mint': even,
        orange: even,
        'berry-blast': even,
        'peach-mango': even,
      });
    }
  };

  const adjustFlavour = (slug: CoreFlavourSlug, delta: number) => {
    setCounts((prev) => {
      const curr = prev[slug];
      if (delta > 0 && totalSelected >= packSize) return prev;
      const next = Math.max(0, curr + delta);
      return { ...prev, [slug]: next };
    });
  };

  const fillEvenly = () => {
    const each = packSize / 4;
    setCounts({
      'lemon-mint': each,
      orange: each,
      'berry-blast': each,
      'peach-mango': each,
    });
  };

  const clearSelection = () => {
    setCounts({ ...EMPTY_COUNTS });
  };

  const handleAddBundle = () => {
    if (!isFull) return;
    addCustomBundleToCart({
      packSize,
      breakdown: counts,
      openDrawer: true,
    });
  };

  return (
    <div className="bg-[#FAFAFA] pb-28">
      {/* Header Band */}
      <section className="bg-white border-b border-[#E5E7EB] py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
              Build Your Own Hydration Box · Save Up to 15%
            </p>
            <h1 className="font-display text-[30px] sm:text-[42px] font-extrabold tracking-[-0.025em] text-[#111412] text-balance">
              Mix &amp; Match Your Ultrapeak Pack
            </h1>
            <p className="mt-3 text-[15px] leading-[1.6] text-[#111412]/70">
              Choose your box capacity and dial in the exact sachet count for each flavour—one-time purchase, zero sugar, free shipping above ₹499.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 py-10 space-y-12">
        {/* STEP 1: Choose Box Size */}
        <section aria-labelledby="bundle-step-1">
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-display text-[13px] font-extrabold text-[#548530]">
              01.
            </span>
            <h2
              id="bundle-step-1"
              className="font-display text-[20px] sm:text-[22px] font-bold text-[#111412]"
            >
              Choose Your Box Size
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BUNDLE_TIERS.map((tier) => {
              const isSelected = tier.size === packSize;
              const unitCost = Math.round(tier.price / tier.size);
              return (
                <button
                  key={tier.size}
                  type="button"
                  onClick={() => handlePackChange(tier.size as 8 | 16 | 32)}
                  className={`relative rounded-xl border p-5 text-left transition-all bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548530] ${
                    isSelected
                      ? 'border-[#548530] ring-1 ring-[#548530] bg-[#F4F8EC]/45'
                      : 'border-[#E5E7EB] hover:border-[#111412]/40'
                  }`}
                >
                  {tier.badge && (
                    <span
                      className={`absolute -top-2.5 right-4 rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        tier.badge === 'Best Value'
                          ? 'bg-[#111412] text-[#A8C632]'
                          : 'bg-[#548530] text-white'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="font-display text-[18px] font-extrabold text-[#111412]">
                      {tier.label}
                    </span>
                    <span className="text-[12px] font-semibold text-[#548530]">
                      {tier.sublabel}
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2 tabular-nums">
                    <span className="text-[24px] font-extrabold text-[#111412]">
                      ₹{tier.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[13px] text-[#111412]/45 line-through">
                      ₹{tier.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="mt-1 text-[12px] text-[#111412]/60 tabular-nums">
                    ₹{unitCost} per 5g sachet · {tier.size >= 16 ? 'Free Shipping Included' : 'Add ₹30 more for Free Shipping'}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* STEP 2: Mix Flavours */}
        <section aria-labelledby="bundle-step-2">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[13px] font-extrabold text-[#548530]">
                02.
              </span>
              <h2
                id="bundle-step-2"
                className="font-display text-[20px] sm:text-[22px] font-bold text-[#111412]"
              >
                Pick {packSize} Sachets Across Flavours
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fillEvenly}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#111412] hover:border-[#111412] transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#548530]" />
                <span>Fill Evenly ({packSize / 4} each)</span>
              </button>
              <button
                type="button"
                onClick={clearSelection}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#111412]/70 hover:text-[#111412] transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_FLAVOURS.map((flavour) => {
              const count = counts[flavour.slug];
              return (
                <div
                  key={flavour.slug}
                  className={`rounded-xl bg-white border overflow-hidden flex flex-col justify-between transition-colors ${
                    count > 0 ? 'border-[#111412]/35' : 'border-[#E5E7EB]'
                  }`}
                >
                  <div>
                    <div className="relative aspect-[4/3.6] w-full overflow-hidden">
                      <ProductVisual
                        flavour={flavour}
                        angle="sachet-fruit"
                        compact
                        shotCode={flavour.gallery[3]?.shotCode}
                      />
                      {count > 0 && (
                        <div
                          className="absolute top-3 right-3 z-10 rounded-md px-2.5 py-1 text-[12px] font-bold tabular-nums text-white shadow-sm"
                          style={{ backgroundColor: flavour.accentHex }}
                        >
                          {count} selected
                        </div>
                      )}
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: flavour.accentHex }}
                        />
                        <h3 className="font-display text-[17px] font-bold text-[#111412]">
                          {flavour.name}
                        </h3>
                      </div>
                      <p className="text-[12px] leading-relaxed text-[#111412]/65">
                        {flavour.tastingNotes}
                      </p>
                    </div>
                  </div>

                  {/* Stepper Controls */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-1">
                      <button
                        type="button"
                        onClick={() => adjustFlavour(flavour.slug, -1)}
                        disabled={count === 0}
                        aria-label={`Remove one ${flavour.name} sachet`}
                        className="h-9 w-9 rounded-md bg-white border border-[#E5E7EB] flex items-center justify-center text-[#111412] disabled:opacity-35 hover:border-[#111412] transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="font-display text-[16px] font-extrabold tabular-nums text-[#111412]">
                        {count}
                      </span>

                      <button
                        type="button"
                        onClick={() => adjustFlavour(flavour.slug, 1)}
                        disabled={totalSelected >= packSize}
                        aria-label={`Add one ${flavour.name} sachet`}
                        className="h-9 w-9 rounded-md bg-[#111412] text-white flex items-center justify-center disabled:opacity-30 hover:bg-[#548530] transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Quick +4 helper for larger boxes */}
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        disabled={remaining < 2}
                        onClick={() => adjustFlavour(flavour.slug, 2)}
                        className="text-[11px] font-semibold text-[#111412]/60 hover:text-[#548530] disabled:opacity-30"
                      >
                        +2 sticks
                      </button>
                      <span className="text-[#E5E7EB]" aria-hidden="true">|</span>
                      <button
                        type="button"
                        disabled={remaining < 4}
                        onClick={() => adjustFlavour(flavour.slug, 4)}
                        className="text-[11px] font-semibold text-[#111412]/60 hover:text-[#548530] disabled:opacity-30"
                      >
                        +4 sticks
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Sticky Bottom Summary Bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] shadow-[0_-8px_28px_rgba(17,20,18,0.08)]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0 max-w-xl">
            <div className="flex items-center justify-between gap-3 text-[13px] mb-1.5">
              <span className="font-bold tabular-nums text-[#111412]">
                {totalSelected} / {packSize} sachets selected
              </span>
              <span className="text-[12px] font-semibold text-[#548530] tabular-nums">
                {isFull ? (
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" />
                    Unlocked ₹{savingsAmount} savings (₹{perSachet}/stick)
                  </span>
                ) : (
                  `Add ${remaining} more to complete box`
                )}
              </span>
            </div>

            {/* Segmented flavour color distribution progress bar */}
            <div className="h-2 w-full rounded-full bg-[#ECEEEB] overflow-hidden flex">
              {CORE_FLAVOURS.map((flavour) => {
                const qty = counts[flavour.slug];
                if (qty === 0) return null;
                return (
                  <div
                    key={flavour.slug}
                    className="h-full transition-all duration-200"
                    style={{
                      width: `${(qty / packSize) * 100}%`,
                      backgroundColor: flavour.accentHex,
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            <div className="text-left sm:text-right tabular-nums">
              <div className="text-[11px] text-[#111412]/55">
                {activeTier.label} · Save {activeTier.savingsPercent}%
              </div>
              <div className="text-[18px] font-extrabold text-[#111412]">
                ₹{activeTier.price.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              type="button"
              disabled={!isFull}
              onClick={handleAddBundle}
              className={`rounded-lg px-5 py-3 text-[14px] font-bold transition-all whitespace-nowrap shrink-0 ${
                isFull
                  ? 'brand-gradient text-white shadow-sm hover:opacity-95'
                  : 'bg-[#E5E7EB] text-[#111412]/45 cursor-not-allowed'
              }`}
            >
              {isFull
                ? 'Add Custom Pack to Cart'
                : `Select ${remaining} More`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
