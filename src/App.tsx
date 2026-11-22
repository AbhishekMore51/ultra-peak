/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, CheckCircle2, X } from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MarqueeTicker } from './components/MarqueeTicker';
import { FlavourGrid } from './components/FlavourGrid';
import { UseCaseGrid } from './components/UseCaseGrid';
import { ReelsCarousel } from './components/ReelsCarousel';
import { RitualSteps } from './components/RitualSteps';
import { ScienceBreakdown } from './components/ScienceBreakdown';
import { LifestyleBanner } from './components/LifestyleBanner';
import { ReviewsFaq } from './components/ReviewsFaq';
import { ProductPage } from './components/ProductPage';
import { BundleBuilder } from './components/BundleBuilder';
import { JournalPage } from './components/JournalPage';
import { AboutPage } from './components/AboutPage';
import { ContactTrackPage } from './components/ContactTrackPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PolicyModal } from './components/PolicyModal';
import { Footer } from './components/Footer';

const StorefrontShell: React.FC = () => {
  const { view, toast, showShootGuide, setShowShootGuide } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111412] overflow-x-clip">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {view === 'home' && (
          <>
            <HeroBanner />
            <MarqueeTicker />
            <FlavourGrid />
            <UseCaseGrid />
            <ReelsCarousel />
            <RitualSteps />
            <ScienceBreakdown />
            <LifestyleBanner />
            <ReviewsFaq />
          </>
        )}

        {view === 'product' && <ProductPage />}
        {view === 'bundle' && <BundleBuilder />}
        {(view === 'journal' || view === 'article') && <JournalPage />}
        {view === 'about' && <AboutPage />}
        {view === 'contact' && <ContactTrackPage />}
      </main>

      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <PolicyModal />

      {/* Active Shoot Guide quick-dismiss pill (only shown when user toggles Shoot Guide ON) */}
      {showShootGuide && (
        <div className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-lg bg-[#111412] text-white px-3.5 py-2 text-[12px] font-medium shadow-lg border border-white/15">
          <Camera className="h-3.5 w-3.5 text-[#A8C632]" />
          <span>60-Shot Shoot Guide Active</span>
          <button
            type="button"
            onClick={() => setShowShootGuide(false)}
            aria-label="Turn off 60-shot shoot guide"
            className="ml-1 rounded p-0.5 text-white/60 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Subtle Action Confirmation Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 rounded-xl bg-[#111412] text-white px-4 py-3 text-[13px] font-medium shadow-xl border border-white/10 max-w-[90vw]"
        >
          <CheckCircle2 className="h-4 w-4 text-[#A8C632] shrink-0" />
          <span>{toast.text}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StorefrontShell />
    </StoreProvider>
  );
}
