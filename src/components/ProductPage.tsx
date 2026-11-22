import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  FlaskConical,
  MapPin,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import {
  FLAVOURS,
  FlavourSlug,
  getFlavourBySlug,
  NUTRITION_FACTS,
  PACK_TIERS,
  PROMO_CODE,
} from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductVisual } from './ProductVisual';
import { ReelsCarousel } from './ReelsCarousel';
import { ScienceBreakdown } from './ScienceBreakdown';
import { ReviewsFaq } from './ReviewsFaq';

type DetailTab = 'description' | 'prepare' | 'nutrition';

const KEY_NUTRIENT_ORDER = [
  'Sodium',
  'Potassium',
  'Magnesium',
  'L-Theanine',
  'Added Sugar',
];

const KEY_NUTRITION_ROWS = KEY_NUTRIENT_ORDER.map((name) =>
  NUTRITION_FACTS.find((r) => r.nutrient === name)
).filter((r): r is (typeof NUTRITION_FACTS)[number] => Boolean(r));

const EXTRA_NUTRITION_ROWS = NUTRITION_FACTS.filter(
  (r) => !KEY_NUTRIENT_ORDER.includes(r.nutrient)
);

export const ProductPage: React.FC = () => {
  const {
    activeFlavour,
    navigateHome,
    navigateToProduct,
    navigateToBundle,
    addToCart,
    setIsCheckoutOpen,
    showToast,
  } = useStore();

  const flavour = getFlavourBySlug(activeFlavour);

  const [selectedShotIdx, setSelectedShotIdx] = useState(0);
  const [selectedPackSize, setSelectedPackSize] = useState<4 | 8 | 16 | 32>(16);
  const [copiedCode, setCopiedCode] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<{
    status: 'idle' | 'valid' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });
  const [activeTab, setActiveTab] = useState<DetailTab>('nutrition');
  const [showFullNutrition, setShowFullNutrition] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);

  const primaryCtaRef = useRef<HTMLDivElement>(null);

  // Reset gallery index when switching flavour
  useEffect(() => {
    setSelectedShotIdx(0);
  }, [activeFlavour]);

  // Show compact mobile sticky buy bar only when scrolled past primary CTA
  useEffect(() => {
    const target = primaryCtaRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const selectedTier =
    PACK_TIERS.find((p) => p.size === selectedPackSize) ?? PACK_TIERS[2];
  const perSachetPrice = Math.round(selectedTier.price / selectedTier.size);
  const activeShot = flavour.gallery[selectedShotIdx] ?? flavour.gallery[0];
  const visibleNutritionRows = showFullNutrition
    ? [...KEY_NUTRITION_ROWS, ...EXTRA_NUTRITION_ROWS]
    : KEY_NUTRITION_ROWS;

  const handleCopyPromo = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
    } catch {
      // Fallback still gives confirmation
    }
    setCopiedCode(true);
    showToast(`Copied code ${PROMO_CODE} — apply in cart for 10% off`, 'success');
    window.setTimeout(() => setCopiedCode(false), 2200);
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = pincode.trim();
    if (!/^[1-9][0-9]{5}$/.test(cleaned)) {
      setDeliveryResult({
        status: 'error',
        message: 'Enter a valid 6-digit Indian pincode (e.g. 400001 or 560001).',
      });
      return;
    }

    const firstDigit = Number(cleaned[0]);
    const isMetroHub = ['11', '40', '56', '60', '50', '70', '41', '12'].includes(
      cleaned.slice(0, 2)
    );
    const minDays = isMetroHub ? 2 : firstDigit <= 5 ? 3 : 4;
    const maxDays = minDays + 2;

    const estDate = new Date();
    estDate.setDate(estDate.getDate() + maxDays);
    const formattedDate = estDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

    setDeliveryResult({
      status: 'valid',
      message: `Estimated delivery to ${cleaned} in ${minDays}–${maxDays} business days (by ${formattedDate}). UPI & COD available.`,
    });
  };

  const handleAddToCart = () => {
    addToCart({
      flavourSlug: flavour.slug,
      packSize: selectedTier.size,
      openDrawer: true,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      flavourSlug: flavour.slug,
      packSize: selectedTier.size,
      openDrawer: false,
    });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="bg-[#FAFAFA]">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 py-3 flex items-center gap-1.5 text-[12px] text-[#111412]/60 overflow-x-auto whitespace-nowrap">
          <button
            type="button"
            onClick={() => navigateHome()}
            className="hover:text-[#111412] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <button
            type="button"
            onClick={() => navigateHome('shop-flavours')}
            className="hover:text-[#111412] transition-colors"
          >
            Electrolyte Hydration
          </button>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="font-medium text-[#111412]">{flavour.name}</span>
        </div>
      </div>

      {/* Main 2-Column Conversion PDP */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* LEFT COLUMN: Sticky 6-Image Studio Gallery */}
          <div className="lg:col-span-6 xl:col-span-7 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3.8] sm:aspect-[4/3.6] w-full rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white">
              <ProductVisual
                flavour={flavour}
                angle={activeShot.id}
                packSize={selectedTier.size}
                shotCode={activeShot.shotCode}
              />

              {/* Devils Circuit Official Partner Authority Overlay */}
              <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 rounded-md bg-[#111412]/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold text-white border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-[#A8C632] shrink-0" />
                <span>Official Electrolyte Partner – Devils Circuit</span>
              </div>
            </div>

            {/* 6-Thumbnail Strip */}
            <div
              role="tablist"
              aria-label="Product gallery views"
              className="mt-3.5 grid grid-cols-6 gap-2 sm:gap-2.5"
            >
              {flavour.gallery.map((shot, idx) => {
                const isSelected = idx === selectedShotIdx;
                return (
                  <button
                    key={shot.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedShotIdx(idx)}
                    className={`group flex flex-col rounded-lg overflow-hidden border transition-all text-left bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548530] ${
                      isSelected
                        ? 'border-[#111412] ring-1 ring-[#111412]'
                        : 'border-[#E5E7EB] hover:border-[#111412]/40'
                    }`}
                  >
                    <div className="aspect-square w-full overflow-hidden">
                      <ProductVisual
                        flavour={flavour}
                        angle={shot.id}
                        compact
                      />
                    </div>
                    <span className="hidden sm:block px-1.5 py-1 text-[10px] font-medium text-[#111412]/75 truncate text-center border-t border-[#E5E7EB] bg-white">
                      {shot.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Frido-Style Conversion Buy Box */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-5 sm:p-7">
              {/* Rating & Clean Meta */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-[#111412]/65">
                <span className="inline-flex items-center gap-1 font-semibold text-[#111412] tabular-nums">
                  <Star className="h-3.5 w-3.5 fill-[#548530] text-[#548530]" />
                  {flavour.rating.toFixed(1)}
                </span>
                <span>({flavour.reviewCount} verified reviews)</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#548530] font-medium">In Stock</span>
              </div>

              <h1 className="mt-2 font-display text-[26px] sm:text-[31px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#111412]">
                Ultrapeak™ {flavour.name}
              </h1>
              <p className="mt-1 text-[14px] text-[#111412]/65">
                Advanced Electrolyte Hydration Powder · {flavour.subtitle}
              </p>

              {/* Concise Unboxed Benefit Strip */}
              <div className="mt-4 py-2.5 border-y border-[#E5E7EB] flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-semibold text-[#111412]/80">
                <span>0g Sugar</span>
                <span className="text-[#111412]/30" aria-hidden="true">·</span>
                <span>100mg L-Theanine</span>
                <span className="text-[#111412]/30" aria-hidden="true">·</span>
                <span>5g Sachet</span>
                <span className="text-[#111412]/30" aria-hidden="true">·</span>
                <span>100% Vegan</span>
              </div>

              {/* Flavour Switcher */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-[13px] mb-2.5">
                  <span className="font-semibold text-[#111412]">
                    Flavour:{' '}
                    <span className="font-normal text-[#111412]/70">
                      {flavour.name}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={navigateToBundle}
                    className="text-[12px] font-semibold text-[#548530] hover:underline"
                  >
                    Mix &amp; Match Bundle →
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {FLAVOURS.map((item) => {
                    const isActive = item.slug === flavour.slug;
                    return (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => navigateToProduct(item.slug as FlavourSlug)}
                        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548530] ${
                          isActive
                            ? 'border-[#111412] bg-[#111412] text-white'
                            : 'border-[#E5E7EB] bg-white text-[#111412] hover:border-[#111412]/40'
                        }`}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.accentHex }}
                        />
                        <span>{item.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tiered One-Time Pack-Size Selector (Frido-Style) */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[13px] mb-2.5">
                  <span className="font-semibold text-[#111412]">
                    Choose Pack Size (One-Time Purchase)
                  </span>
                  <span className="text-[12px] text-[#548530] font-semibold tabular-nums">
                    ₹{perSachetPrice} / sachet
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {PACK_TIERS.map((tier) => {
                    const isSelected = tier.size === selectedPackSize;
                    const unitCost = Math.round(tier.price / tier.size);
                    return (
                      <button
                        key={tier.size}
                        type="button"
                        onClick={() => setSelectedPackSize(tier.size)}
                        className={`relative rounded-xl border p-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548530] ${
                          isSelected
                            ? 'border-[#548530] bg-[#F4F8EC]/60 ring-1 ring-[#548530]'
                            : 'border-[#E5E7EB] bg-white hover:border-[#111412]/40'
                        }`}
                      >
                        {tier.badge && (
                          <span
                            className={`absolute -top-2.5 right-3 rounded px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                              tier.badge === 'Best Value'
                                ? 'bg-[#111412] text-[#A8C632]'
                                : 'bg-[#548530] text-white'
                            }`}
                          >
                            {tier.badge}
                          </span>
                        )}

                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-display text-[15px] font-bold text-[#111412]">
                            {tier.label}
                          </span>
                          <span className="text-[11px] font-semibold text-[#548530]">
                            {tier.sublabel}
                          </span>
                        </div>

                        <div className="mt-2 flex items-baseline gap-2 tabular-nums">
                          <span className="text-[18px] font-extrabold text-[#111412]">
                            ₹{tier.price.toLocaleString('en-IN')}
                          </span>
                          {tier.mrp > tier.price && (
                            <span className="text-[12px] text-[#111412]/45 line-through">
                              ₹{tier.mrp.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-[11px] text-[#111412]/60 tabular-nums">
                          ₹{unitCost} per 5g sachet
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Click-to-Copy Promo Chip */}
              <div className="mt-4 rounded-lg bg-[#FAFAFA] border border-dashed border-[#548530]/45 px-3.5 py-2.5 flex items-center justify-between gap-3">
                <div className="text-[12px] text-[#111412]/80">
                  Extra <strong className="font-semibold text-[#111412]">10% OFF</strong> first order with code{' '}
                  <span className="font-bold text-[#548530]">{PROMO_CODE}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPromo}
                  className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#111412] hover:border-[#111412] transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3 w-3 text-[#548530]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Primary CTA Stack */}
              <div ref={primaryCtaRef} className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full rounded-lg brand-gradient py-3.5 px-5 text-[15px] font-bold text-white shadow-sm hover:opacity-95 transition-opacity tabular-nums"
                >
                  Add to Cart — ₹{selectedTier.price.toLocaleString('en-IN')}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full rounded-lg border border-[#111412] bg-white py-3 px-5 text-[14px] font-bold text-[#111412] hover:bg-[#111412] hover:text-white transition-colors"
                >
                  Buy Now · UPI / COD
                </button>
              </div>

              {/* Pincode Delivery Checker */}
              <div className="mt-5 pt-5 border-t border-[#E5E7EB]">
                <label
                  htmlFor="pdp-pincode"
                  className="flex items-center gap-1.5 text-[12px] font-semibold text-[#111412] mb-2"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#548530]" />
                  <span>Check Delivery Date</span>
                </label>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    id="pdp-pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ''));
                      if (deliveryResult.status !== 'idle') {
                        setDeliveryResult({ status: 'idle', message: '' });
                      }
                    }}
                    placeholder="Enter 6-digit Indian pincode"
                    className="flex-1 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2 text-[13px] tabular-nums text-[#111412] placeholder:text-[#111412]/40 focus:border-[#548530] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[13px] font-semibold text-[#111412] hover:border-[#111412] transition-colors whitespace-nowrap shrink-0"
                  >
                    Check
                  </button>
                </form>

                {deliveryResult.status !== 'idle' && (
                  <p
                    className={`mt-2 text-[12px] leading-snug ${
                      deliveryResult.status === 'valid'
                        ? 'text-[#3F6212] font-medium'
                        : 'text-[#B91C1C]'
                    }`}
                  >
                    {deliveryResult.message}
                  </p>
                )}
              </div>

              {/* Trust Row */}
              <div className="mt-5 pt-4 border-t border-[#E5E7EB] grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-[#548530]" />
                  <span className="text-[11px] font-medium text-[#111412]/75">
                    FSSAI Licensed
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <FlaskConical className="h-4 w-4 text-[#548530]" />
                  <span className="text-[11px] font-medium text-[#111412]/75">
                    Lab Tested
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="h-4 w-4 text-[#548530]" />
                  <span className="text-[11px] font-medium text-[#111412]/75">
                    Free Ship ₹499+
                  </span>
                </div>
              </div>

              {/* Clean Product Detail Tabs (Nutrition / Description / Prepare) */}
              <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
                <div
                  role="tablist"
                  className="grid grid-cols-3 gap-1 rounded-lg bg-[#F4F5F4] p-1"
                >
                  {(
                    [
                      { id: 'nutrition', label: 'Nutrition Facts' },
                      { id: 'description', label: 'Description' },
                      { id: 'prepare', label: 'How to Mix' },
                    ] as { id: DetailTab; label: string }[]
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-md py-2 px-2 text-[12px] font-semibold transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-white text-[#111412] shadow-xs'
                          : 'text-[#111412]/65 hover:text-[#111412]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  {activeTab === 'nutrition' && (
                    <div>
                      <div className="flex items-center justify-between text-[12px] text-[#111412]/65 mb-2.5">
                        <span className="font-semibold text-[#111412]">
                          Serving Size: 1 Sachet (5g)
                        </span>
                        <span>Key Active Highlights</span>
                      </div>

                      {/* Desktop Structured Table (md+) */}
                      <div className="hidden md:block rounded-xl border border-[#E5E7EB] overflow-hidden">
                        <table className="w-full text-left text-[12px] border-collapse">
                          <thead>
                            <tr className="bg-[#FAFAFA] border-b border-[#E5E7EB] text-[#111412]/60">
                              <th className="py-2.5 px-3.5 font-semibold">Nutrient</th>
                              <th className="py-2.5 px-3.5 font-semibold text-right">
                                Per 5g
                              </th>
                              <th className="py-2.5 px-3.5 font-semibold text-right">
                                % RDA*
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E5E7EB]">
                            {visibleNutritionRows.map((row) => (
                              <tr
                                key={row.nutrient}
                                className={row.highlight ? 'bg-[#F4F8EC]/45' : 'bg-white'}
                              >
                                <td className="py-2.5 px-3.5">
                                  <div className="font-semibold text-[#111412]">
                                    {row.nutrient}
                                  </div>
                                  <div className="text-[11px] text-[#111412]/55">
                                    {row.role}
                                  </div>
                                </td>
                                <td className="py-2.5 px-3.5 text-right font-bold tabular-nums text-[#111412] whitespace-nowrap">
                                  {row.amount}
                                </td>
                                <td className="py-2.5 px-3.5 text-right tabular-nums text-[#111412]/60 whitespace-nowrap">
                                  {row.rda || '—'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Stacked Flex-Row Card (<768px — Zero Horizontal Scroll) */}
                      <div className="md:hidden rounded-xl border border-[#E5E7EB] bg-white divide-y divide-[#E5E7EB] overflow-hidden">
                        {visibleNutritionRows.map((row) => (
                          <div
                            key={row.nutrient}
                            className={`px-3.5 py-3 flex items-start justify-between gap-3 ${
                              row.highlight ? 'bg-[#F4F8EC]/45' : 'bg-white'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="text-[13px] font-semibold text-[#111412]">
                                {row.nutrient}
                              </div>
                              <div className="text-[11px] text-[#111412]/55 leading-snug mt-0.5">
                                {row.role}
                              </div>
                            </div>
                            <div className="text-right shrink-0 tabular-nums">
                              <div className="text-[13px] font-bold text-[#111412]">
                                {row.amount}
                              </div>
                              <div className="text-[11px] text-[#111412]/55">
                                {row.rda && row.rda !== '—' ? `${row.rda} RDA` : 'Active'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Ingredients Panel when toggled */}
                      {showFullNutrition && (
                        <div className="mt-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] p-3.5 text-[12px] leading-[1.6] text-[#111412]/72">
                          <div className="font-semibold text-[#111412] mb-1">
                            Clean Ingredients ({flavour.shortName})
                          </div>
                          <p>
                            Potassium Citrate, Sodium Chloride (Pink Himalayan &amp; Sea Salt), Magnesium Citrate, L-Theanine (Green Tea Extract), Natural {flavour.shortName} Flavouring, Acidity Regulator (Citric Acid), Vitamin C (Ascorbic Acid), Vitamin B-Complex (B3, B5, B6, B12), Natural Plant Sweeteners (Steviol Glycosides &amp; Monk Fruit Extract).
                          </p>
                        </div>
                      )}

                      {/* Expand / Collapse Full Nutrition & Ingredients Button */}
                      <button
                        type="button"
                        onClick={() => setShowFullNutrition((prev) => !prev)}
                        aria-expanded={showFullNutrition}
                        className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] py-2.5 px-3.5 text-[12px] font-semibold text-[#111412] hover:border-[#111412] transition-colors"
                      >
                        <span>
                          {showFullNutrition
                            ? 'Hide Full Nutrition & Ingredients'
                            : 'View Full Nutrition & Ingredients'}
                        </span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            showFullNutrition ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <p className="mt-2.5 text-[11px] text-[#111412]/55">
                        *Percentage Recommended Dietary Allowance based on ICMR guidelines for active adults. Vegan, Gluten-Free, No Artificial Colours.
                      </p>
                    </div>
                  )}

                  {activeTab === 'description' && (
                    <div className="space-y-3 text-[13px] leading-[1.65] text-[#111412]/75">
                      <p>{flavour.description}</p>
                      <p>
                        <strong className="font-semibold text-[#111412]">
                          Tasting Profile:
                        </strong>{' '}
                        {flavour.tastingNotes}.
                      </p>
                      <p>
                        Formulated specifically for Indian heat, endurance races, and demanding workdays—Ultrapeak replaces lost Sodium, Potassium, and Magnesium while 100mg L-Theanine keeps mental focus sharp without caffeine jitters.
                      </p>
                    </div>
                  )}

                  {activeTab === 'prepare' && (
                    <ol className="space-y-2.5 text-[13px] leading-[1.6] text-[#111412]/75">
                      <li>
                        <strong className="font-semibold text-[#111412]">
                          1. Tear:
                        </strong>{' '}
                        Open one 5g race-bib ready sachet along the clean-tear notch.
                      </li>
                      <li>
                        <strong className="font-semibold text-[#111412]">
                          2. Pour:
                        </strong>{' '}
                        Empty into 150–200ml cold water (add ice for maximum crispness).
                      </li>
                      <li>
                        <strong className="font-semibold text-[#111412]">
                          3. Swirl &amp; Sip:
                        </strong>{' '}
                        Stir or shake for 5 seconds until dissolved. Enjoy before, during, or after training—or anytime focus dips.
                      </li>
                    </ol>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below the Fold on PDP: Reels + 3-Pillar Why Ultrapeak + Reviews */}
      <ReelsCarousel compactHeading />
      <ScienceBreakdown compact />
      <ReviewsFaq showFaq={false} />

      {/* Mobile Sticky Bottom Buy Bar (Only visible after scrolling past Buy Box) */}
      {showMobileBar && (
        <div className="fixed inset-x-0 bottom-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] px-4 py-2.5 shadow-[0_-8px_24px_rgba(17,20,18,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-[#111412] truncate">
                {flavour.shortName} · {selectedTier.label}
              </div>
              <div className="text-[15px] font-extrabold tabular-nums text-[#111412]">
                ₹{selectedTier.price.toLocaleString('en-IN')}{' '}
                <span className="text-[11px] font-medium text-[#548530]">
                  (₹{perSachetPrice}/stick)
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-lg brand-gradient px-5 py-2.5 text-[13px] font-bold text-white whitespace-nowrap shrink-0"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
