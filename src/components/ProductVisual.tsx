import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import {
  ASSETS,
  CORE_FLAVOURS,
  GalleryAngleType,
  NUTRITION_FACTS,
  ProductFlavour,
} from '../data/catalog';
import { useStore } from '../context/StoreContext';

export const ShootGuideTag: React.FC<{ label: string; className?: string }> = ({
  label,
  className = '',
}) => {
  const { showShootGuide } = useStore();
  if (!showShootGuide) return null;

  return (
    <div
      className={`pointer-events-none absolute z-20 inline-flex items-center gap-1.5 rounded bg-[#111412]/90 px-2.5 py-1 text-[11px] font-medium tracking-tight text-white shadow-sm backdrop-blur-sm border border-white/15 ${className}`}
    >
      <Camera className="h-3 w-3 text-[#A8C632] shrink-0" />
      <span className="truncate max-w-[260px]">{label}</span>
    </div>
  );
};

export const SafeImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  accentHex?: string;
}> = ({ src, alt, className = '', fallbackTitle, accentHex = '#548530' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F3F4F2] p-6 text-center ${className}`}
        style={{
          backgroundImage: `radial-gradient(circle at 30% 25%, ${accentHex}18 0%, transparent 60%)`,
        }}
      >
        <img
          src={ASSETS.logo}
          alt="Ultrapeak"
          className="h-5 w-auto opacity-75 mb-2"
          referrerPolicy="no-referrer"
        />
        {fallbackTitle && (
          <span className="text-xs font-medium text-[#111412]/70">{fallbackTitle}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

interface SachetMockupProps {
  flavour: ProductFlavour;
  compact?: boolean;
  angled?: boolean;
  backView?: boolean;
}

/**
 * Tactile 5g race-bib sachet studio mockup with matte dark foil finish,
 * Ultrapeak official wordmark, and flavour color coding.
 */
export const SachetMockup: React.FC<SachetMockupProps> = ({
  flavour,
  compact = false,
  angled = false,
  backView = false,
}) => {
  const widthClass = compact ? 'w-[126px] h-[238px]' : 'w-[172px] sm:w-[196px] h-[320px] sm:h-[364px]';

  if (backView) {
    return (
      <div
        className={`relative ${widthClass} rounded-[14px] bg-[#161917] text-white shadow-[0_24px_48px_-14px_rgba(17,20,18,0.42)] border border-white/10 overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 select-none`}
      >
        {/* Top crimp seal */}
        <div className="absolute inset-x-0 top-0 h-2.5 bg-gradient-to-b from-white/15 to-transparent border-b border-white/10" />
        <div className="pt-2">
          <div className="flex items-center justify-between border-b border-white/15 pb-1.5 mb-2">
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/90">
              Nutrition Facts
            </span>
            <span className="text-[9px] tabular-nums text-white/60">1 Sachet (5g)</span>
          </div>
          <div className="space-y-1">
            {NUTRITION_FACTS.slice(0, 7).map((row) => (
              <div
                key={row.nutrient}
                className="flex items-center justify-between text-[9px] sm:text-[10px] border-b border-white/8 pb-0.5"
              >
                <span className="text-white/75 truncate pr-2">{row.nutrient}</span>
                <span className="font-semibold tabular-nums text-white shrink-0">
                  {row.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-1.5 pt-2 border-t border-white/15">
          <p className="text-[8px] leading-relaxed text-white/60">
            Mix 1 sachet (5g) in 150–200ml chilled water. Zero added sugar · No artificial colours · 100% Vegan.
          </p>
          <div className="flex items-center justify-between text-[8px] font-medium text-white/75">
            <span>FSSAI Licensed</span>
            <span>Lab Tested · India</span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-2.5 bg-gradient-to-t from-white/15 to-transparent border-t border-white/10" />
      </div>
    );
  }

  return (
    <div
      className={`relative ${widthClass} rounded-[14px] bg-[#141715] text-white shadow-[0_26px_52px_-16px_rgba(17,20,18,0.45)] border border-white/12 overflow-hidden flex flex-col justify-between select-none transition-transform duration-300 ${
        angled ? '-rotate-[8deg] scale-[0.98]' : ''
      }`}
      style={{
        backgroundImage: `linear-gradient(155deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 36%, ${flavour.accentHex}26 100%)`,
      }}
    >
      {/* Matte foil crimp top & tear notch */}
      <div className="relative h-4 border-b border-white/10 bg-white/[0.04] flex items-center justify-between px-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="text-[7px] uppercase tracking-[0.18em] text-white/45">
          Tear Here
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      </div>

      {/* Flavour top accent rule */}
      <div className="h-1 w-full" style={{ backgroundColor: flavour.accentHex }} />

      {/* Main Sachet Front Face */}
      <div className="flex-1 flex flex-col justify-between p-3.5 sm:p-4">
        <div>
          <img
            src={ASSETS.logo}
            alt="Ultrapeak"
            className={`${compact ? 'h-4' : 'h-5 sm:h-6'} w-auto object-contain mb-2.5`}
            referrerPolicy="no-referrer"
          />
          <p className="text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.16em] text-white/60">
            Advanced Electrolytes
          </p>
          <div className="mt-3 pt-3 border-t border-white/12">
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: flavour.accentHex }}
              />
              <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/70">
                Hydration Powder
              </span>
            </div>
            <p
              className={`font-display font-extrabold tracking-tight text-white leading-tight ${
                compact ? 'text-base' : 'text-xl sm:text-2xl'
              }`}
            >
              {flavour.shortName}
            </p>
          </div>
        </div>

        {/* Formula Callout Strip */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1.5 border-t border-white/12 pt-2.5">
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold tabular-nums text-white">
                0g Sugar
              </div>
              <div className="text-[8px] text-white/55">Clean energy</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold tabular-nums text-[#A8C632]">
                100mg
              </div>
              <div className="text-[8px] text-white/55">L-Theanine</div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/12 pt-2 text-[8px] sm:text-[9px] text-white/65">
            <span>Na · K · Mg · B-Vit</span>
            <span className="font-semibold tabular-nums text-white">NET WT. 5g</span>
          </div>
        </div>
      </div>

      {/* Bottom foil crimp */}
      <div className="h-3 border-t border-white/10 bg-white/[0.04]" />
    </div>
  );
};

interface ProductVisualProps {
  flavour: ProductFlavour;
  angle: GalleryAngleType;
  packSize?: 4 | 8 | 16 | 32;
  shotCode?: string;
  compact?: boolean;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  flavour,
  angle,
  packSize,
  shotCode,
  compact = false,
  className = '',
}) => {
  // Mixed Variety Pack renders a crisp 4-sachet fanned studio arrangement on front/angled views
  if (flavour.isMixed && (angle === 'front-sachet' || angle === 'angled-sachet')) {
    return (
      <div
        className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-[#F4F5F3] ${className}`}
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 42%, #FFFFFF 0%, #EFEFEA 100%)',
        }}
      >
        <ShootGuideTag
          label={shotCode || flavour.shotListCard}
          className="bottom-3 left-3"
        />
        <div className="relative flex items-center justify-center py-6">
          {CORE_FLAVOURS.map((item, index) => {
            const offsets = ['-rotate-12 -mr-10 translate-y-2', '-rotate-4 -mr-10 -translate-y-1', 'rotate-4 -mr-10 -translate-y-1', 'rotate-12 translate-y-2'];
            return (
              <div
                key={item.slug}
                className={`transform transition-transform duration-300 ${offsets[index]}`}
                style={{ zIndex: index + 1 }}
              >
                <SachetMockup flavour={item} compact />
              </div>
            );
          })}
        </div>
        {packSize && (
          <div className="absolute bottom-4 right-4 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold tabular-nums text-[#111412] border border-[#E5E7EB]">
            Pack of {packSize} · 4 Flavours
          </div>
        )}
      </div>
    );
  }

  // Prepared Drink in Clear Glass (pure studio beverage photograph)
  if (angle === 'prepared-drink') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#F5F5F4] ${className}`}>
        <SafeImage
          src={flavour.photo}
          alt={`Prepared chilled glass of Ultrapeak ${flavour.name}`}
          fallbackTitle={flavour.name}
          accentHex={flavour.accentHex}
          className="w-full h-full object-cover"
        />
        <ShootGuideTag
          label={shotCode || `${flavour.name} · Prepared Drink`}
          className="bottom-3 left-3"
        />
      </div>
    );
  }

  // Sachet + Fruit Ingredients composite studio frame
  if (angle === 'sachet-fruit') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#F5F5F4] ${className}`}>
        <SafeImage
          src={flavour.photo}
          alt={`Ultrapeak ${flavour.name} with fresh ingredients`}
          fallbackTitle={flavour.name}
          accentHex={flavour.accentHex}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111412]/25 via-transparent to-transparent" />
        <div className="absolute left-5 sm:left-8 bottom-5 sm:bottom-8">
          <SachetMockup flavour={flavour} compact angled />
        </div>
        <ShootGuideTag
          label={shotCode || `${flavour.name} · Sachet + Ingredients`}
          className="top-3 left-3"
        />
      </div>
    );
  }

  // Macro Label Callout
  if (angle === 'macro-label') {
    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-[#111412] text-white flex flex-col justify-between p-6 sm:p-10 ${className}`}
        style={{
          backgroundImage: `radial-gradient(circle at 82% 20%, ${flavour.accentHex}38 0%, transparent 55%)`,
        }}
      >
        <div className="flex items-center justify-between border-b border-white/12 pb-4">
          <img
            src={ASSETS.logo}
            alt="Ultrapeak"
            className="h-5 w-auto"
            referrerPolicy="no-referrer"
          />
          <span className="text-xs font-medium text-white/60">
            5g Single-Serve Sachet · {flavour.shortName}
          </span>
        </div>

        <div className="my-auto py-4">
          <p className="text-xs font-medium text-[#A8C632] mb-2">
            Transparent Label · Zero Proprietary Blends
          </p>
          <h4 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-balance">
            0g Sugar. 100mg L-Theanine. Complete Sweat Minerals.
          </h4>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { val: '225 mg', label: 'Sodium' },
              { val: '376 mg', label: 'Potassium' },
              { val: '50 mg', label: 'Magnesium' },
              { val: '100 mg', label: 'L-Theanine' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-white/[0.05] border border-white/10 p-3"
              >
                <div className="font-display text-lg sm:text-xl font-bold tabular-nums text-white">
                  {stat.val}
                </div>
                <div className="text-[11px] text-white/65 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60 border-t border-white/12 pt-4">
          <span>FSSAI Licensed</span>
          <span aria-hidden="true">·</span>
          <span>Third-Party Lab Tested</span>
          <span aria-hidden="true">·</span>
          <span>100% Vegan</span>
          <span aria-hidden="true">·</span>
          <span>No Artificial Colours</span>
        </div>

        <ShootGuideTag
          label={shotCode || `${flavour.name} · Macro Label`}
          className="bottom-3 right-3"
        />
      </div>
    );
  }

  // Front Sachet, Angled Sachet, or Back Sachet on clean neutral stone studio backdrop
  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
      style={{
        backgroundColor: flavour.softBgHex,
        backgroundImage: `radial-gradient(circle at 50% 35%, #FFFFFF 0%, ${flavour.softBgHex} 78%)`,
      }}
    >
      {/* Subtle studio shadow pedestal */}
      <div className="absolute bottom-[14%] h-7 w-44 rounded-full bg-[#111412]/15 blur-xl" />
      <div className="relative z-10 py-6">
        <SachetMockup
          flavour={flavour}
          compact={compact}
          angled={angle === 'angled-sachet'}
          backView={angle === 'back-sachet'}
        />
      </div>
      {packSize && angle === 'front-sachet' && (
        <div className="absolute bottom-4 right-4 z-10 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold tabular-nums text-[#111412] border border-[#E5E7EB]">
          Pack of {packSize}
        </div>
      )}
      <ShootGuideTag
        label={shotCode || flavour.shotListCard}
        className="bottom-3 left-3"
      />
    </div>
  );
};
