import React from 'react';
import {
  ArrowRight,
  Award,
  Brain,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import { ASSETS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SafeImage, ShootGuideTag } from './ProductVisual';

const QUALITY_PILLARS = [
  {
    icon: ShieldCheck,
    title: 'FSSAI Licensed',
    subtitle: 'Manufactured under strict Indian food-safety standards',
    body: 'Produced at GMP-compliant facilities in India with full batch traceability, clean allergen controls, and transparent per-5g nutritional declarations.',
  },
  {
    icon: FlaskConical,
    title: 'Third-Party Lab Tested',
    subtitle: 'Independent verification for purity & active potency',
    body: 'Every batch is independently assayed for exact Sodium, Potassium, Magnesium, and L-Theanine dosages alongside heavy-metal and microbial screening.',
  },
  {
    icon: Leaf,
    title: '0g Sugar & 100% Vegan',
    subtitle: 'Zero artificial colours, zero syrupy crash',
    body: 'Naturally sweetened with plant-based stevia and monk fruit extracts. Completely free of synthetic food dyes, maltodextrin fillers, and preservatives.',
  },
];

export const AboutPage: React.FC = () => {
  const { navigateHome, navigateToBundle } = useStore();

  return (
    <div className="bg-[#FAFAFA]">
      {/* Clean Editorial Hero */}
      <section className="bg-[#111412] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <SafeImage
            src={ASSETS.runnerBanner}
            alt="Indian endurance athlete running at dawn"
            fallbackTitle="Ultrapeak Our Story"
            className="h-full w-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111412] via-[#111412]/88 to-[#111412]/55" />
        </div>

        <ShootGuideTag
          label="Shot #03 · Brand Story Hero — Indian Heat & Endurance Editorial"
          className="top-4 right-4"
        />

        <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold tracking-wide text-[#A8C632] mb-3">
              Our Story · Ultrapeak India
            </p>
            <h1 className="font-display text-[32px] sm:text-[48px] font-extrabold leading-[1.08] tracking-[-0.025em] text-white text-balance">
              Engineered for Indian Heat &amp; Endurance.
            </h1>
            <p className="mt-5 text-[15px] sm:text-[17px] leading-[1.65] text-white/80 max-w-xl">
              Ultrapeak started with a simple frustration on humid 6 AM training runs: Indian athletes were forced to choose between sugary neon sports drinks or chalky medical ORS packets. We built the cleaner third path.
            </p>
          </div>
        </div>
      </section>

      {/* The Story Behind Electrolytes + L-Theanine */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-[12px] font-semibold tracking-wide text-[#548530]">
                Why Electrolytes + L-Theanine
              </p>
              <h2 className="font-display text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] text-[#111412] leading-[1.15] text-balance">
                Fatigue Hits Your Head Before It Stops Your Legs.
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#111412]/72">
                Sweating through 35°C heat, obstacle courses, or back-to-back strength sets drains two systems simultaneously: your mineral fluid balance and your cognitive composure. Most hydration mixes only address half the equation—or overload you with 25 grams of refined sugar and harsh caffeine.
              </p>
              <p className="text-[15px] leading-[1.7] text-[#111412]/72">
                We formulated Ultrapeak around a crisp 5g sachet: bioavailable{' '}
                <strong className="font-semibold text-[#111412]">
                  Sodium (225mg), Potassium (376mg), and Magnesium (50mg)
                </strong>{' '}
                paired with{' '}
                <strong className="font-semibold text-[#111412]">
                  100mg of L-Theanine
                </strong>{' '}
                and essential B-Vitamins. The result is rapid rehydration with steady, jitter-free mental clarity—built equally for the final 5K and a demanding 3 PM workday.
              </p>

              <div className="pt-3 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                  <Droplets className="h-5 w-5 text-[#548530] mb-2" />
                  <div className="font-display text-[15px] font-bold text-[#111412]">
                    Sweat-Matched Minerals
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#111412]/65">
                    Balanced Na, K &amp; Mg without heavy salty aftertaste or refined sugar spikes.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                  <Brain className="h-5 w-5 text-[#548530] mb-2" />
                  <div className="font-display text-[15px] font-bold text-[#111412]">
                    Calm Focus Late
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#111412]/65">
                    100mg green-tea L-Theanine sustains clear decision-making with zero caffeine crash.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3.4] w-full rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#111412]">
                <SafeImage
                  src={ASSETS.gymFocus}
                  alt="Indian athlete hydrating during strength training"
                  fallbackTitle="Ultrapeak Formulation Story"
                  className="h-full w-full object-cover"
                />
                <ShootGuideTag
                  label="Shot #49 · About Story — Athlete Training Hydration Moment"
                  className="bottom-3 left-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Electrolyte Partner – Devils Circuit Spotlight Card */}
      <section className="py-16 sm:py-20 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="rounded-2xl bg-[#111412] text-white border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#A8C632] tracking-wide mb-4">
                  <Award className="h-4 w-4 shrink-0" />
                  <span>Official Electrolyte Partner – Devils Circuit</span>
                </div>

                <h2 className="font-display text-[26px] sm:text-[36px] font-extrabold tracking-[-0.02em] leading-[1.12] text-balance">
                  Proven on India’s Toughest Obstacle Race Course.
                </h2>

                <p className="mt-4 text-[14px] sm:text-[15px] leading-[1.7] text-white/75 max-w-xl">
                  Across mud pits, high walls, and relentless heat across India’s premier obstacle racing cities, tens of thousands of Devils Circuit athletes rely on Ultrapeak aid stations and race-bib sachets to cross the finish line strong.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/12 grid grid-cols-3 gap-4 tabular-nums">
                <div>
                  <div className="font-display text-[22px] sm:text-[26px] font-extrabold text-white">
                    5g
                  </div>
                  <div className="text-[12px] text-white/60 mt-0.5">
                    Race-bib ready stick
                  </div>
                </div>
                <div>
                  <div className="font-display text-[22px] sm:text-[26px] font-extrabold text-[#A8C632]">
                    0g
                  </div>
                  <div className="text-[12px] text-white/60 mt-0.5">
                    Added sugar per serve
                  </div>
                </div>
                <div>
                  <div className="font-display text-[22px] sm:text-[26px] font-extrabold text-white">
                    5 sec
                  </div>
                  <div className="text-[12px] text-white/60 mt-0.5">
                    Clean cold dissolve
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-[#191D1A]">
              <SafeImage
                src={ASSETS.heroBanner}
                alt="Ultrapeak chilled electrolyte splash"
                fallbackTitle="Devils Circuit Official Partner"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111412]/80 via-transparent to-transparent" />
              <ShootGuideTag
                label="Shot #31 · Devils Circuit Partner Spotlight"
                className="bottom-3 right-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3-Pillar Quality & Testing Strip */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
              Quality &amp; Transparency Standards
            </p>
            <h2 className="font-display text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] text-[#111412]">
              Nothing Hidden. Every Milligram Verified.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {QUALITY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-11 w-11 rounded-lg bg-[#F4F8EC] text-[#548530] flex items-center justify-center mb-5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-[20px] font-bold text-[#111412]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-[13px] font-medium text-[#548530]">
                      {pillar.subtitle}
                    </p>
                    <p className="mt-3 text-[14px] leading-[1.65] text-[#111412]/70">
                      {pillar.body}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#E5E7EB] inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#111412]/70">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#548530]" />
                    <span>Verified on every production batch</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editorial Bottom CTA */}
          <div className="mt-14 pt-10 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <h3 className="font-display text-[22px] font-bold text-[#111412]">
                Ready to taste clean zero-sugar hydration?
              </h3>
              <p className="text-[14px] text-[#111412]/65 mt-1">
                Start with a 4-sachet trial pack at ₹249 or customize your mix-and-match box.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigateHome('shop-flavours')}
                className="inline-flex items-center gap-2 rounded-lg brand-gradient px-5 py-3 text-[14px] font-semibold text-white hover:opacity-95 transition-opacity"
              >
                <span>Shop Flavours</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={navigateToBundle}
                className="rounded-lg border border-[#111412] bg-white px-5 py-3 text-[14px] font-semibold text-[#111412] hover:bg-[#111412] hover:text-white transition-colors"
              >
                Build Your Bundle
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
