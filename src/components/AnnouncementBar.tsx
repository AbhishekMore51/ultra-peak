import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  'Extra 10% off your first order — Use code ULTRA10',
  'Free Shipping on Orders Above ₹499 across India',
  'Official Electrolyte Partner – Devils Circuit',
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const step = (dir: number) => {
    setIndex((prev) => (prev + dir + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  return (
    <div className="bg-[#111412] text-white h-9 border-b border-white/10">
      <div className="mx-auto max-w-[1320px] h-full px-4 sm:px-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous announcement"
          className="p-1 text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A8C632] rounded"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        <p className="text-[12px] sm:text-[13px] font-medium tracking-[0.01em] text-center truncate text-white/95">
          {ANNOUNCEMENTS[index]}
        </p>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next announcement"
          className="p-1 text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A8C632] rounded"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
