import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Star } from 'lucide-react';
import { FAQS, REVIEWS } from '../data/catalog';

interface ReviewsFaqProps {
  showFaq?: boolean;
}

export const ReviewsFaq: React.FC<ReviewsFaqProps> = ({ showFaq = true }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#E5E7EB]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* Verified Reviews */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
                Verified Athletes &amp; Daily Hydrators
              </p>
              <h2 className="font-display text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] text-[#111412]">
                Trusted Across India’s Toughest Courses
              </h2>
            </div>

            <div className="flex items-center gap-2 text-[14px] font-semibold tabular-nums text-[#111412]">
              <div className="flex items-center gap-0.5 text-[#548530]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span>4.9 / 5</span>
              <span className="font-normal text-[#111412]/55">· 1,800+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((review) => (
              <article
                key={review.id}
                className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-0.5 text-[#548530]">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#111412]/60">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#548530]" />
                      Verified
                    </span>
                  </div>

                  <h3 className="font-display text-[15px] font-bold text-[#111412] leading-snug">
                    “{review.title}”
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-[1.6] text-[#111412]/72">
                    {review.body}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5E7EB]">
                  <div className="text-[13px] font-semibold text-[#111412]">
                    {review.name} · {review.location}
                  </div>
                  <div className="text-[12px] text-[#111412]/55 mt-0.5">
                    {review.context} · {review.flavour}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Clean Expandable FAQ Accordion */}
        {showFaq && (
          <div
            id="faq-section"
            className="mt-20 pt-16 border-t border-[#E5E7EB] grid grid-cols-1 lg:grid-cols-12 gap-10 scroll-mt-20"
          >
            <div className="lg:col-span-4">
              <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
                Straight Answers
              </p>
              <h2 className="font-display text-[26px] sm:text-[32px] font-extrabold tracking-[-0.02em] text-[#111412] text-balance">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#111412]/65">
                Everything you need to know about our zero-sugar formula, L-Theanine dosage, ORS comparison, and pan-India shipping.
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
              {FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full py-5 flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:text-[#548530]"
                    >
                      <span className="font-display text-[16px] font-bold text-[#111412]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-[#111412]/60 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#548530]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 pr-8 text-[14px] leading-[1.65] text-[#111412]/72">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
