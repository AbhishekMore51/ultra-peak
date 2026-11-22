import React, { useState } from 'react';
import { ArrowUpRight, Plus, Star } from 'lucide-react';
import { FLAVOURS, ProductFlavour } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductVisual } from './ProductVisual';

const FlavourCard: React.FC<{ flavour: ProductFlavour }> = ({ flavour }) => {
  const { navigateToProduct, addToCart } = useStore();
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col bg-white rounded-xl border border-[#E5E7EB] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#111412]/30"
    >
      {/* Visual container (68% visual weight, uniform aspect ratio across all 5 cards) */}
      <button
        type="button"
        onClick={() => navigateToProduct(flavour.slug)}
        aria-label={`View ${flavour.name}`}
        className="relative aspect-[4/4.3] w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#548530]"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            hovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <ProductVisual
            flavour={flavour}
            angle="front-sachet"
            compact
            shotCode={flavour.shotListCard}
          />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ProductVisual
            flavour={flavour}
            angle={flavour.isMixed ? 'sachet-fruit' : 'prepared-drink'}
            compact
            shotCode={flavour.gallery[1]?.shotCode}
          />
        </div>

        {/* Single quiet text tag when present */}
        {flavour.cardTag && (
          <span className="absolute top-3 left-3 z-10 rounded bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-[#111412] border border-[#E5E7EB]">
            {flavour.cardTag}
          </span>
        )}
      </button>

      {/* Card Body — Identical field order across all cards */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex items-center justify-between gap-2 text-[12px] text-[#111412]/60 mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: flavour.accentHex }}
                aria-hidden="true"
              />
              <span className="truncate">
                {flavour.isMixed ? '4-Flavour Starter' : '5g Electrolyte Sachet'}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0 tabular-nums font-medium text-[#111412]">
              <Star className="h-3.5 w-3.5 fill-[#111412] text-[#111412]" />
              <span>{flavour.rating.toFixed(1)}</span>
              <span className="text-[#111412]/45">({flavour.reviewCount})</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigateToProduct(flavour.slug)}
            className="text-left w-full group/title"
          >
            <h3 className="font-display text-[17px] font-bold tracking-tight text-[#111412] group-hover/title:text-[#548530] transition-colors">
              {flavour.name}
            </h3>
          </button>

          <p className="mt-1.5 text-[13px] leading-[1.5] text-[#111412]/65 line-clamp-2">
            {flavour.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-[#111412]/50">Starting at</div>
            <div className="text-[15px] font-bold tabular-nums text-[#111412]">
              ₹249
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              addToCart({
                flavourSlug: flavour.slug,
                packSize: 4,
                openDrawer: true,
              })
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#111412] px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-[#548530] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548530]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export const FlavourGrid: React.FC = () => {
  const { navigateToBundle } = useStore();

  return (
    <section
      id="shop-flavours"
      aria-labelledby="pick-flavour-heading"
      className="py-16 sm:py-24 bg-[#FAFAFA]"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
              Zero Sugar · 100mg L-Theanine · 4 Crisp Flavours
            </p>
            <h2
              id="pick-flavour-heading"
              className="font-display text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] text-[#111412] text-balance"
            >
              Pick Your Flavour
            </h2>
          </div>

          <button
            type="button"
            onClick={navigateToBundle}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#111412] hover:text-[#548530] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <span>Want a custom mix? Build Your Bundle</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* 5-card responsive grid: 1 col mobile, 2 col tablet, 3 col medium, 5 col wide or balanced 3+2 / 5-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {FLAVOURS.map((flavour) => (
            <FlavourCard key={flavour.slug} flavour={flavour} />
          ))}
        </div>
      </div>
    </section>
  );
};
