import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Plus,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { getFlavourBySlug, REELS, ReelItem } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SafeImage, ShootGuideTag } from './ProductVisual';

interface ReelsCarouselProps {
  compactHeading?: boolean;
}

export const ReelsCarousel: React.FC<ReelsCarouselProps> = ({
  compactHeading = false,
}) => {
  const { addToCart, navigateToProduct } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeReelIdx, setActiveReelIdx] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeReel: ReelItem | null =
    activeReelIdx !== null ? REELS[activeReelIdx] : null;

  // Simulated smooth playback progress inside the open reel modal
  useEffect(() => {
    if (activeReelIdx === null || !isPlaying) return;
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveReelIdx((curr) =>
            curr === null ? null : (curr + 1) % REELS.length
          );
          return 0;
        }
        return prev + 1.5;
      });
    }, 150);
    return () => window.clearInterval(interval);
  }, [activeReelIdx, isPlaying]);

  const openReel = (idx: number) => {
    setActiveReelIdx(idx);
    setIsPlaying(true);
    setProgress(0);
  };

  const scrollTrack = (direction: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction * 300,
      behavior: 'smooth',
    });
  };

  return (
    <section
      aria-labelledby="reels-heading"
      className="py-16 sm:py-24 bg-[#FAFAFA]"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
              Real Athletes · Real Indian Heat
            </p>
            <h2
              id="reels-heading"
              className={`font-display font-extrabold tracking-[-0.02em] text-[#111412] ${
                compactHeading
                  ? 'text-[24px] sm:text-[30px]'
                  : 'text-[28px] sm:text-[36px]'
              }`}
            >
              See Ultrapeak in Action
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollTrack(-1)}
              aria-label="Scroll reels left"
              className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#111412] hover:border-[#111412] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack(1)}
              aria-label="Scroll reels right"
              className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#111412] hover:border-[#111412] transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable 9:16 Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
        >
          {REELS.map((reel, idx) => {
            const flavour = getFlavourBySlug(reel.flavourSlug);
            return (
              <div
                key={reel.id}
                className="relative flex-none w-[248px] sm:w-[264px] aspect-[9/16] rounded-xl overflow-hidden bg-[#111412] border border-[#E5E7EB] snap-start group"
              >
                {/* Clickable video preview surface */}
                <button
                  type="button"
                  onClick={() => openReel(idx)}
                  aria-label={`Play reel by ${reel.creatorName}`}
                  className="absolute inset-0 w-full h-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A8C632]"
                >
                  <SafeImage
                    src={reel.photo}
                    alt={`${reel.creatorName} using Ultrapeak ${flavour.name}`}
                    fallbackTitle={reel.creatorName}
                    accentHex={flavour.accentHex}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111412]/90 via-[#111412]/20 to-[#111412]/35" />

                  {/* Top metadata & duration */}
                  <div className="absolute top-3 left-3 right-12 flex items-center gap-2 text-[11px] font-medium text-white/90">
                    <span className="truncate">{reel.handle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums text-white/75 shrink-0">
                      {reel.views}
                    </span>
                  </div>

                  {/* Center subtle play indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="h-12 w-12 rounded-full bg-[#111412]/65 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110">
                      <Play className="h-5 w-5 fill-white ml-0.5" />
                    </span>
                  </div>

                  {/* Caption above pinned product card */}
                  <div className="absolute inset-x-3 bottom-[84px] text-white">
                    <p className="text-[12px] leading-[1.45] text-white/90 line-clamp-2">
                      {reel.caption}
                    </p>
                  </div>
                </button>

                {/* Mute Toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted((m) => !m);
                  }}
                  aria-label={isMuted ? 'Unmute preview' : 'Mute preview'}
                  className="absolute top-2.5 right-2.5 z-10 h-8 w-8 rounded-full bg-[#111412]/65 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#111412]"
                >
                  {isMuted ? (
                    <VolumeX className="h-3.5 w-3.5" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5" />
                  )}
                </button>

                <ShootGuideTag label={reel.shotCode} className="top-12 left-3" />

                {/* Pinned Mini Product Card at bottom of reel */}
                <div className="absolute inset-x-2.5 bottom-2.5 z-10 rounded-lg bg-white/95 backdrop-blur-md p-2.5 flex items-center justify-between gap-2.5 shadow-sm border border-white/40">
                  <button
                    type="button"
                    onClick={() => navigateToProduct(flavour.slug)}
                    className="flex items-center gap-2.5 min-w-0 text-left"
                  >
                    <span
                      className="h-9 w-9 rounded-md shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: flavour.accentHex }}
                    >
                      5g
                    </span>
                    <div className="min-w-0">
                      <div className="text-[12px] font-bold text-[#111412] truncate">
                        {flavour.shortName}
                      </div>
                      <div className="text-[11px] font-medium tabular-nums text-[#111412]/65">
                        Pack of 4 · ₹249
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        flavourSlug: flavour.slug,
                        packSize: 4,
                        openDrawer: true,
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-md bg-[#111412] px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#548530] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Vertical Reel Modal */}
      {activeReel && activeReelIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Reel by ${activeReel.creatorName}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111412]/85 backdrop-blur-sm p-4"
          onClick={() => setActiveReelIdx(null)}
        >
          <div
            className="relative w-full max-w-[380px] aspect-[9/16] max-h-[88vh] rounded-2xl overflow-hidden bg-[#111412] shadow-2xl border border-white/15 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={activeReel.photo}
              alt={activeReel.creatorName}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111412]/95 via-[#111412]/15 to-[#111412]/65" />

            {/* Top Progress Bar + Controls */}
            <div className="relative z-10 p-4">
              <div className="grid grid-cols-5 gap-1 mb-3">
                {REELS.map((r, i) => (
                  <div
                    key={r.id}
                    className="h-1 rounded-full bg-white/25 overflow-hidden"
                  >
                    <div
                      className="h-full bg-[#A8C632] transition-all duration-150"
                      style={{
                        width:
                          i < activeReelIdx
                            ? '100%'
                            : i === activeReelIdx
                              ? `${progress}%`
                              : '0%',
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 text-white">
                  <div className="text-[13px] font-bold truncate">
                    {activeReel.creatorName}
                  </div>
                  <div className="text-[11px] text-white/70 truncate">
                    {activeReel.role}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    aria-label={isPlaying ? 'Pause reel' : 'Play reel'}
                    className="h-8 w-8 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25"
                  >
                    {isPlaying ? (
                      <Pause className="h-3.5 w-3.5" />
                    ) : (
                      <Play className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMuted((m) => !m)}
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    className="h-8 w-8 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25"
                  >
                    {isMuted ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveReelIdx(null)}
                    aria-label="Close reel preview"
                    className="h-8 w-8 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Prev / Next Tap Zones */}
            <div className="relative z-10 flex items-center justify-between px-3">
              <button
                type="button"
                onClick={() => {
                  setActiveReelIdx(
                    (activeReelIdx - 1 + REELS.length) % REELS.length
                  );
                  setProgress(0);
                }}
                aria-label="Previous reel"
                className="h-9 w-9 rounded-full bg-[#111412]/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#111412]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveReelIdx((activeReelIdx + 1) % REELS.length);
                  setProgress(0);
                }}
                aria-label="Next reel"
                className="h-9 w-9 rounded-full bg-[#111412]/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#111412]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Bottom Transcript & Pinned Product CTA */}
            {(() => {
              const featured = getFlavourBySlug(activeReel.flavourSlug);
              return (
                <div className="relative z-10 p-4 space-y-3">
                  <div className="text-white space-y-1">
                    <p className="text-[13px] font-medium leading-snug text-white">
                      {activeReel.transcriptSnippet}
                    </p>
                    <p className="text-[11px] text-white/65">
                      {isMuted ? 'Audio muted · Captions on' : 'Audio active · Studio preview'} · {activeReel.duration}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveReelIdx(null);
                        navigateToProduct(featured.slug);
                      }}
                      className="flex items-center gap-2.5 min-w-0 text-left"
                    >
                      <span
                        className="h-10 w-10 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: featured.accentHex }}
                      >
                        5g
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-bold text-[#111412] truncate">
                          Ultrapeak {featured.name}
                        </div>
                        <div className="text-[12px] tabular-nums text-[#111412]/65">
                          Pack of 4 · ₹249
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveReelIdx(null);
                        addToCart({
                          flavourSlug: featured.slug,
                          packSize: 4,
                          openDrawer: true,
                        });
                      }}
                      className="rounded-lg brand-gradient px-3.5 py-2 text-[12px] font-semibold text-white whitespace-nowrap shrink-0"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};
