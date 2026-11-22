import React from 'react';

const ITEMS = [
  '0G SUGAR',
  '100MG L-THEANINE FOR FOCUS',
  '5G RACE-BIB SACHET',
  'FSSAI LICENSED',
  'THIRD-PARTY LAB TESTED',
  '100% VEGAN',
  'NO ARTIFICIAL COLOURS',
];

export const MarqueeTicker: React.FC = () => {
  return (
    <div
      aria-label="Key product credentials"
      className="bg-white border-b border-[#E5E7EB] overflow-hidden py-3.5"
    >
      <div className="animate-marquee">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex items-center shrink-0"
          >
            {ITEMS.map((item) => (
              <div
                key={`${dup}-${item}`}
                className="flex items-center text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] text-[#111412]/80 whitespace-nowrap"
              >
                <span className="px-5 sm:px-7">{item}</span>
                <span className="text-[#548530]" aria-hidden="true">
                  •
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
