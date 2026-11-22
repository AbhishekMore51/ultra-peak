import React, { useState } from 'react';
import { Check, Droplets, Brain, Zap } from 'lucide-react';
import { COMPARISON_ROWS } from '../data/catalog';

const PILLARS = [
  {
    icon: Droplets,
    eyebrow: '225 mg Sodium · Zero Sugar',
    title: 'Replace What You Sweat',
    body: 'Restores primary sweat electrolytes in a clean osmotic balance so your body retains fluid instead of flushing plain water straight through.',
  },
  {
    icon: Zap,
    eyebrow: '376 mg Potassium · 50 mg Magnesium',
    title: 'Keep Muscles Firing',
    body: 'Intracellular Potassium and Magnesium work alongside Sodium to sustain crisp muscle contractions and ward off late-kilometre cramping.',
  },
  {
    icon: Brain,
    eyebrow: '100 mg L-Theanine · B-Complex',
    title: 'Stay Sharp Late with L-Theanine',
    body: 'Pairs hydration with calm, alpha-wave cognitive clarity—keeping pacing, form, and focus locked in without caffeine jitters or crash.',
  },
];

type CompetitorKey = 'sportsDrink' | 'standardOrs' | 'plainWater';

const COMPETITOR_TABS: { key: CompetitorKey; label: string }[] = [
  { key: 'sportsDrink', label: 'Sports Drinks' },
  { key: 'standardOrs', label: 'Regular ORS' },
  { key: 'plainWater', label: 'Plain Water' },
];

interface ScienceBreakdownProps {
  compact?: boolean;
}

export const ScienceBreakdown: React.FC<ScienceBreakdownProps> = ({
  compact = false,
}) => {
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<CompetitorKey>('sportsDrink');

  const activeCompetitorLabel =
    COMPETITOR_TABS.find((t) => t.key === selectedCompetitor)?.label ??
    'Sports Drinks';

  return (
    <section
      id="why-ultrapeak"
      aria-labelledby="science-heading"
      className="py-16 sm:py-24 bg-[#FAFAFA]"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
            Formulation Science · Transparent 5g Label
          </p>
          <h2
            id="science-heading"
            className="font-display text-[28px] sm:text-[38px] font-extrabold tracking-[-0.025em] text-[#111412] text-balance"
          >
            Built for the Last Stretch
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-[#111412]/70">
            Every milligram inside Ultrapeak has a measurable physiological job—no synthetic colours, no refined sugar, and no proprietary filler blends.
          </p>
        </div>

        {/* 3-Pillar Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-xl bg-white border border-[#E5E7EB] p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-lg bg-[#F4F8EC] text-[#548530] flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-[12px] font-semibold tabular-nums text-[#548530] mb-1.5">
                    {pillar.eyebrow}
                  </p>
                  <h3 className="font-display text-[20px] font-bold tracking-tight text-[#111412]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-[#111412]/70">
                    {pillar.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsive Electrolyte Comparison Section (Zero Horizontal Scroll on Mobile) */}
        {!compact && (
          <div className="mt-12 rounded-xl bg-white border border-[#E5E7EB] overflow-hidden">
            <div className="px-5 sm:px-6 py-5 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-[19px] font-bold text-[#111412]">
                  How Ultrapeak Compares
                </h3>
                <p className="text-[13px] text-[#111412]/60 mt-0.5">
                  Per serving comparison against common Indian hydration alternatives
                </p>
              </div>
              <span className="text-[12px] font-medium text-[#111412]/60">
                Third-party lab verified · FSSAI Licensed
              </span>
            </div>

            {/* DESKTOP (md+): Clean 4-Column Comparison Matrix */}
            <div className="hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-[12px] font-semibold text-[#111412]/60 bg-[#FAFAFA]">
                    <th className="py-3.5 px-6 w-[21%]">Formula Factor</th>
                    <th className="py-3.5 px-5 bg-[#F4F8EC] text-[#111412] w-[25%]">
                      Ultrapeak (5g)
                    </th>
                    <th className="py-3.5 px-5 w-[18%]">Sports Drinks</th>
                    <th className="py-3.5 px-5 w-[18%]">Regular ORS</th>
                    <th className="py-3.5 px-5 w-[18%]">Plain Water</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-[13px]">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.metric}>
                      <td className="py-4 px-6 font-semibold text-[#111412]">
                        {row.metric}
                      </td>
                      <td className="py-4 px-5 bg-[#F4F8EC]/65 font-semibold text-[#111412]">
                        <span className="inline-flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#548530] shrink-0 mt-0.5" />
                          <span className="tabular-nums">{row.ultrapeak}</span>
                        </span>
                      </td>
                      <td className="py-4 px-5 text-[#111412]/65 tabular-nums">
                        {row.sportsDrink}
                      </td>
                      <td className="py-4 px-5 text-[#111412]/65 tabular-nums">
                        {row.standardOrs}
                      </td>
                      <td className="py-4 px-5 text-[#111412]/65 tabular-nums">
                        {row.plainWater}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE (<768px): Interactive 2-Column Pinned Comparison Card */}
            <div className="md:hidden">
              {/* Segmented Pill Selector for Right Column */}
              <div className="px-4 py-3.5 bg-[#FAFAFA] border-b border-[#E5E7EB]">
                <p className="text-[11px] font-semibold text-[#111412]/60 mb-2">
                  Compare Ultrapeak vs:
                </p>
                <div
                  role="tablist"
                  aria-label="Compare Ultrapeak against"
                  className="grid grid-cols-3 gap-1 rounded-full bg-[#ECEEEB] p-1"
                >
                  {COMPETITOR_TABS.map((tab) => {
                    const isActive = tab.key === selectedCompetitor;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedCompetitor(tab.key)}
                        className={`rounded-full py-2 px-2 text-[11px] font-semibold transition-colors whitespace-nowrap ${
                          isActive
                            ? 'bg-[#111412] text-white shadow-xs'
                            : 'text-[#111412]/70 hover:text-[#111412]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2-Column Pinned Header */}
              <div className="grid grid-cols-2 border-b border-[#E5E7EB] text-[12px] font-bold">
                <div className="px-4 py-3 bg-[#F4F8EC] text-[#111412] border-r border-[#E5E7EB]">
                  Ultrapeak (5g)
                </div>
                <div className="px-4 py-3 bg-[#FAFAFA] text-[#111412]/75">
                  {activeCompetitorLabel}
                </div>
              </div>

              {/* Stacked Metric Comparison Rows */}
              <div className="divide-y divide-[#E5E7EB]">
                {COMPARISON_ROWS.map((row) => (
                  <div key={row.metric}>
                    <div className="px-4 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#111412]/50 bg-white">
                      {row.metric}
                    </div>
                    <div className="grid grid-cols-2 text-[12px]">
                      <div className="px-4 py-2.5 bg-[#F4F8EC]/55 border-r border-[#E5E7EB] font-semibold text-[#111412] flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 text-[#548530] shrink-0 mt-0.5" />
                        <span className="tabular-nums leading-snug">
                          {row.ultrapeak}
                        </span>
                      </div>
                      <div className="px-4 py-2.5 bg-white text-[#111412]/68 tabular-nums leading-snug">
                        {row[selectedCompetitor]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
