import React, { useState } from 'react';
import {
  ArrowRight,
  Camera,
  Check,
  Instagram,
  Linkedin,
  ShieldCheck,
  Twitter,
  Youtube,
} from 'lucide-react';
import { ASSETS, FLAVOURS, PROMO_CODE } from '../data/catalog';
import { PolicyKey, useStore } from '../context/StoreContext';

const SOCIALS = [
  { label: 'Instagram', handle: '@ultrapeak.in', icon: Instagram },
  { label: 'YouTube', handle: 'Ultrapeak India', icon: Youtube },
  { label: 'X / Twitter', handle: '@ultrapeak_in', icon: Twitter },
  { label: 'LinkedIn', handle: 'Ultrapeak Hydration', icon: Linkedin },
];

const POLICY_LINKS: { key: PolicyKey; label: string }[] = [
  { key: 'shipping', label: 'Shipping Policy' },
  { key: 'returns', label: 'Return & Refund Policy' },
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'terms', label: 'Terms of Service' },
];

export const Footer: React.FC = () => {
  const {
    navigateHome,
    navigateToProduct,
    navigateToBundle,
    navigateToJournal,
    navigateToAbout,
    navigateToContact,
    setActivePolicy,
    showShootGuide,
    setShowShootGuide,
    showToast,
  } = useStore();

  const [email, setEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
      setNewsletterError('Enter a valid email address.');
      return;
    }
    setNewsletterError(null);
    setSubscribed(true);
    setEmail('');
    showToast(`Welcome! Use code ${PROMO_CODE} for 10% off your first order.`, 'success');
  };

  return (
    <footer className="bg-[#111412] text-white border-t border-white/10">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 py-14 sm:py-16">
        {/* 4-Column Dark Charcoal Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Logo + Tagline + Social Icons */}
          <div className="lg:col-span-3 space-y-4">
            <button
              type="button"
              onClick={() => navigateHome()}
              className="inline-flex items-center"
            >
              <img
                src={ASSETS.logo}
                alt="ultrapeak"
                className="h-7 w-auto"
                referrerPolicy="no-referrer"
              />
            </button>
            <p className="text-[13px] leading-[1.65] text-white/65 max-w-xs">
              Advanced Indian sports &amp; daily electrolyte hydration powder. 0g sugar, Sodium, Potassium, Magnesium &amp; 100mg L-Theanine in every 5g sachet.
            </p>
            <div className="inline-flex items-center gap-2 text-[12px] font-medium text-[#A8C632]">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Official Electrolyte Partner – Devils Circuit</span>
            </div>

            {/* Social Links */}
            <div className="pt-1 flex items-center gap-2">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.label}
                    type="button"
                    aria-label={`${social.label} (${social.handle})`}
                    onClick={() =>
                      showToast(`Follow ${social.handle} on ${social.label}`)
                    }
                    className="h-9 w-9 rounded-lg border border-white/15 bg-white/[0.04] inline-flex items-center justify-center text-white/75 hover:border-[#A8C632] hover:text-[#A8C632] transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-[13px] font-bold text-white mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5 text-[13px] text-white/65">
              {FLAVOURS.map((flavour) => (
                <li key={flavour.slug}>
                  <button
                    type="button"
                    onClick={() => navigateToProduct(flavour.slug)}
                    className="hover:text-white transition-colors"
                  >
                    {flavour.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={navigateToBundle}
                  className="text-[#A8C632] hover:underline font-medium"
                >
                  Build Your Bundle
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Help */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-[13px] font-bold text-white mb-4">
              Company &amp; Help
            </h3>
            <ul className="space-y-2.5 text-[13px] text-white/65">
              <li>
                <button
                  type="button"
                  onClick={navigateToAbout}
                  className="hover:text-white transition-colors"
                >
                  Our Story (About Us)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={navigateToJournal}
                  className="hover:text-white transition-colors"
                >
                  Journal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={navigateToContact}
                  className="hover:text-white transition-colors"
                >
                  Contact &amp; Track Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateHome('faq-section')}
                  className="hover:text-white transition-colors"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Box ("Get 10% off with ULTRA10") + Shoot Guide Toggle */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h3 className="font-display text-[14px] font-bold text-white mb-1.5">
                Get 10% off with {PROMO_CODE}
              </h3>
              <p className="text-[12px] leading-[1.6] text-white/60">
                Join the Ultrapeak endurance club for hydration guides, Devils Circuit race drops, and 10% off your first box.
              </p>
            </div>

            {subscribed ? (
              <div className="rounded-xl bg-[#548530]/20 border border-[#A8C632]/40 p-3.5 text-[12px] text-white">
                <div className="flex items-center gap-1.5 font-semibold text-[#A8C632]">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>You’re on the list!</span>
                </div>
                <p className="mt-1 text-white/80">
                  Apply code <strong className="text-white">{PROMO_CODE}</strong> in your cart for 10% off.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (newsletterError) setNewsletterError(null);
                    }}
                    placeholder="Enter your email"
                    aria-label="Email address for newsletter"
                    className="flex-1 min-w-0 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:border-[#A8C632] focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe for 10% off"
                    className="inline-flex items-center gap-1.5 rounded-lg brand-gradient px-4 py-2.5 text-[13px] font-semibold text-white hover:opacity-95 transition-opacity whitespace-nowrap shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-[11px] text-[#FCA5A5]">{newsletterError}</p>
                )}
              </form>
            )}

            {/* Toggleable 60-Shot Photoshoot Overlay */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowShootGuide(!showShootGuide)}
                aria-pressed={showShootGuide}
                className={`w-full inline-flex items-center justify-between gap-2 rounded-lg border px-3.5 py-2 text-[12px] font-semibold transition-colors ${
                  showShootGuide
                    ? 'border-[#A8C632] bg-[#548530]/25 text-[#A8C632]'
                    : 'border-white/15 bg-white/[0.04] text-white/75 hover:border-white/35'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Camera className="h-3.5 w-3.5" />
                  <span>60-Shot Shoot Guide Overlay</span>
                </span>
                <span className="text-[11px] uppercase tracking-wider">
                  {showShootGuide ? 'On' : 'Off'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Clickable Policy Modals */}
        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[12px] text-white/50">
          <p>
            © {new Date().getFullYear()} Ultrapeak Hydration · HealthSphere Wellness Pvt. Ltd. · FSSAI Licensed
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {POLICY_LINKS.map((policy) => (
              <button
                key={policy.key}
                type="button"
                onClick={() => setActivePolicy(policy.key)}
                className="hover:text-white transition-colors"
              >
                {policy.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
