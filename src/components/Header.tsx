import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { ASSETS } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    view,
    cartCount,
    setIsCartOpen,
    navigateHome,
    navigateToBundle,
    navigateToJournal,
    navigateToAbout,
    navigateToContact,
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1320px] h-16 px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Single-Element Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigateHome()}
            aria-label="Ultrapeak Home"
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548530] rounded"
          >
            <img
              src={ASSETS.logo}
              alt="ultrapeak"
              className="h-6 sm:h-7 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-7 text-[14px] font-medium text-[#111412]/75"
          >
            <button
              type="button"
              onClick={() => navigateHome('shop-flavours')}
              className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#111412] py-1 border-b-2 ${
                view === 'home' || view === 'product'
                  ? 'border-[#548530] text-[#111412]'
                  : 'border-transparent'
              }`}
            >
              Shop Flavours
            </button>
            <button
              type="button"
              onClick={navigateToBundle}
              className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#111412] py-1 border-b-2 ${
                view === 'bundle'
                  ? 'border-[#548530] text-[#111412]'
                  : 'border-transparent'
              }`}
            >
              Build Your Bundle
            </button>
            <button
              type="button"
              onClick={() => navigateHome('why-ultrapeak')}
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#111412] py-1 border-b-2 border-transparent"
            >
              Why Ultrapeak
            </button>
            <button
              type="button"
              onClick={navigateToAbout}
              className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#111412] py-1 border-b-2 ${
                view === 'about'
                  ? 'border-[#548530] text-[#111412]'
                  : 'border-transparent'
              }`}
            >
              Our Story
            </button>
            <button
              type="button"
              onClick={navigateToJournal}
              className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#111412] py-1 border-b-2 ${
                view === 'journal' || view === 'article'
                  ? 'border-[#548530] text-[#111412]'
                  : 'border-transparent'
              }`}
            >
              Journal
            </button>
          </nav>

          {/* Zone 3: Single Primary Action (Cart + Mobile Menu Toggle) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping cart with ${cartCount} items`}
              className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#111412] hover:border-[#111412] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548530]"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <span
                className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold tabular-nums ${
                  cartCount > 0
                    ? 'bg-[#548530] text-white'
                    : 'bg-[#F3F4F6] text-[#111412]/70'
                }`}
              >
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#111412] hover:bg-[#F5F5F5]"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-[#111412]/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-[290px] max-w-[85vw] bg-white shadow-2xl flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E5E7EB]">
                <img
                  src={ASSETS.logo}
                  alt="ultrapeak"
                  className="h-6 w-auto"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#111412]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleNav(() => navigateHome('shop-flavours'))}
                  className="text-left px-3 py-3 rounded-lg text-[16px] font-semibold text-[#111412] hover:bg-[#FAFAFA]"
                >
                  Shop Flavours
                </button>
                <button
                  type="button"
                  onClick={() => handleNav(navigateToBundle)}
                  className="text-left px-3 py-3 rounded-lg text-[16px] font-semibold text-[#111412] hover:bg-[#FAFAFA]"
                >
                  Build Your Bundle
                </button>
                <button
                  type="button"
                  onClick={() => handleNav(() => navigateHome('why-ultrapeak'))}
                  className="text-left px-3 py-3 rounded-lg text-[16px] font-semibold text-[#111412] hover:bg-[#FAFAFA]"
                >
                  Why Ultrapeak
                </button>
                <button
                  type="button"
                  onClick={() => handleNav(navigateToAbout)}
                  className="text-left px-3 py-3 rounded-lg text-[16px] font-semibold text-[#111412] hover:bg-[#FAFAFA]"
                >
                  Our Story
                </button>
                <button
                  type="button"
                  onClick={() => handleNav(navigateToJournal)}
                  className="text-left px-3 py-3 rounded-lg text-[16px] font-semibold text-[#111412] hover:bg-[#FAFAFA]"
                >
                  Journal
                </button>
                <button
                  type="button"
                  onClick={() => handleNav(navigateToContact)}
                  className="text-left px-3 py-3 rounded-lg text-[15px] font-medium text-[#111412]/75 hover:bg-[#FAFAFA]"
                >
                  Contact &amp; Track Order
                </button>
              </nav>
            </div>

            <div className="pt-5 border-t border-[#E5E7EB] space-y-3">
              <p className="text-xs text-[#111412]/65">
                Use code <span className="font-semibold text-[#111412]">ULTRA10</span> for 10% off your first order.
              </p>
              <button
                type="button"
                onClick={() => handleNav(navigateToBundle)}
                className="w-full py-3 px-4 rounded-lg brand-gradient text-white text-sm font-semibold"
              >
                Build Custom Pack
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
