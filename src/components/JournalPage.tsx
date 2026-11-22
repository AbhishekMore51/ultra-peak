import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import {
  getFlavourBySlug,
  JOURNAL_ARTICLES,
  JournalCategory,
} from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductVisual, SafeImage, ShootGuideTag } from './ProductVisual';

const CATEGORIES: JournalCategory[] = [
  'All',
  'Hydration Science',
  'Endurance',
  'Recovery',
];

export const JournalPage: React.FC = () => {
  const {
    view,
    activeArticleSlug,
    navigateToJournal,
    navigateToArticle,
    navigateToProduct,
    addToCart,
  } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<JournalCategory>('All');

  // Clean Article Reader View
  if (view === 'article') {
    const article =
      JOURNAL_ARTICLES.find((a) => a.slug === activeArticleSlug) ??
      JOURNAL_ARTICLES[0];
    const recommended = getFlavourBySlug(article.recommendedFlavour);

    return (
      <article className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6">
          <button
            type="button"
            onClick={navigateToJournal}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#111412]/70 hover:text-[#111412] mb-7"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Journal</span>
          </button>

          {/* Clean Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#111412]/60 mb-3">
            <span className="font-semibold text-[#548530]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="font-display text-[28px] sm:text-[40px] font-extrabold leading-[1.12] tracking-[-0.025em] text-[#111412] text-balance">
            {article.title}
          </h1>

          <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.6] text-[#111412]/72">
            {article.excerpt}
          </p>

          <div className="mt-5 pb-7 border-b border-[#E5E7EB] text-[13px] text-[#111412]/70">
            By <strong className="font-semibold text-[#111412]">{article.author}</strong> — {article.authorRole}
          </div>

          {/* Feature Photo */}
          <div className="relative mt-8 aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#111412]">
            <SafeImage
              src={article.photo}
              alt={article.title}
              fallbackTitle={article.title}
              className="h-full w-full object-cover"
            />
            <ShootGuideTag label={article.shotCode} className="bottom-3 left-3" />
          </div>

          {/* Key Takeaways Summary Box */}
          <div className="mt-8 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] p-6">
            <h2 className="font-display text-[15px] font-bold text-[#111412] mb-3">
              Key Takeaways
            </h2>
            <ul className="space-y-2 text-[14px] text-[#111412]/80">
              {article.keyTakeaways.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-[#548530] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Body */}
          <div className="mt-10 space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading} className="space-y-3.5">
                <h2 className="font-display text-[22px] sm:text-[25px] font-bold tracking-tight text-[#111412]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-[15px] sm:text-[16px] leading-[1.75] text-[#111412]/78"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* Contextual Product Recommendation */}
          <div className="mt-14 pt-8 border-t border-[#E5E7EB]">
            <p className="text-[12px] font-semibold text-[#548530] mb-3">
              Recommended for This Protocol
            </p>
            <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-5 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-full sm:w-36 aspect-[4/3.5] rounded-lg overflow-hidden shrink-0 border border-[#E5E7EB]">
                <ProductVisual flavour={recommended} angle="front-sachet" compact />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-display text-[19px] font-bold text-[#111412]">
                  Ultrapeak {recommended.name}
                </h3>
                <p className="mt-1 text-[13px] text-[#111412]/68">
                  {recommended.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        flavourSlug: recommended.slug,
                        packSize: 16,
                        openDrawer: true,
                      })
                    }
                    className="rounded-lg brand-gradient px-4 py-2 text-[13px] font-semibold text-white"
                  >
                    Add Pack of 16 — ₹899
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToProduct(recommended.slug)}
                    className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[13px] font-semibold text-[#111412] hover:border-[#111412]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Journal Index View
  const filteredArticles =
    selectedCategory === 'All'
      ? JOURNAL_ARTICLES
      : JOURNAL_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <div className="bg-[#FAFAFA] py-12 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
          <div className="max-w-xl">
            <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
              Ultrapeak Field Notes
            </p>
            <h1 className="font-display text-[32px] sm:text-[42px] font-extrabold tracking-[-0.025em] text-[#111412]">
              The Hydration Journal
            </h1>
            <p className="mt-2.5 text-[15px] leading-[1.6] text-[#111412]/70">
              Evidence-based guides on sweat physiology, Indian summer racing, muscle recovery, and calm cognitive focus.
            </p>
          </div>

          {/* Interactive Filter Segmented Bar */}
          <div
            role="tablist"
            aria-label="Filter articles by topic"
            className="flex flex-wrap items-center gap-1.5 rounded-lg bg-white border border-[#E5E7EB] p-1 self-start md:self-auto"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-md px-3.5 py-1.5 text-[12px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#111412] text-white'
                      : 'text-[#111412]/70 hover:text-[#111412]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              onClick={() => navigateToArticle(article.slug)}
              className="group cursor-pointer rounded-xl bg-white border border-[#E5E7EB] overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#111412]/35"
            >
              <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-[#111412]">
                <SafeImage
                  src={article.photo}
                  alt={article.title}
                  fallbackTitle={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <ShootGuideTag label={article.shotCode} className="bottom-3 left-3" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[12px] text-[#111412]/60 mb-2.5">
                    <span className="font-semibold text-[#548530]">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-display text-[21px] font-bold tracking-tight text-[#111412] group-hover:text-[#548530] transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="mt-2.5 text-[14px] leading-[1.6] text-[#111412]/70">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-[13px]">
                  <span className="text-[#111412]/65">{article.author}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#111412] group-hover:text-[#548530]">
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
