import React, { useState } from 'react';
import {
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD, PROMO_CODE } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    freeShippingRemaining,
    appliedPromo,
    promoError,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeItem,
    applyPromoCode,
    removePromoCode,
    navigateHome,
    navigateToBundle,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const shippingProgress = Math.min(
    100,
    Math.round(
      ((subtotal - discountAmount) / FREE_SHIPPING_THRESHOLD) * 100
    )
  );

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111412]/55 backdrop-blur-xs"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4.5 w-4.5 text-[#111412]" />
            <h2 className="font-display text-[17px] font-bold text-[#111412]">
              Your Cart{' '}
              <span className="font-normal text-[#111412]/55 tabular-nums">
                ({cartCount})
              </span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            className="h-9 w-9 rounded-lg border border-[#E5E7EB] inline-flex items-center justify-center text-[#111412] hover:border-[#111412]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Dynamic Free Shipping Progress Bar */}
        <div className="px-5 py-3 bg-[#FAFAFA] border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 text-[12px] font-medium text-[#111412] mb-2">
            <Truck className="h-4 w-4 text-[#548530] shrink-0" />
            {cart.length === 0 ? (
              <span>Free shipping on orders above ₹{FREE_SHIPPING_THRESHOLD}</span>
            ) : freeShippingRemaining === 0 ? (
              <span className="text-[#3F6212] font-semibold">
                You’ve unlocked Free Pan-India Shipping!
              </span>
            ) : (
              <span>
                Add{' '}
                <strong className="font-bold tabular-nums">
                  ₹{freeShippingRemaining.toLocaleString('en-IN')}
                </strong>{' '}
                more for Free Shipping
              </span>
            )}
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#E5E7EB] overflow-hidden">
            <div
              className="h-full brand-gradient transition-all duration-300"
              style={{ width: `${cart.length === 0 ? 0 : shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="h-14 w-14 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center text-[#111412]/40 mb-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="font-display text-[18px] font-bold text-[#111412]">
                Your hydration bag is empty
              </h3>
              <p className="mt-1.5 text-[13px] text-[#111412]/65 max-w-[260px]">
                Pick a crisp zero-sugar flavour or mix your own Pack of 8, 16, or 32.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 w-full max-w-[240px]">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateHome('shop-flavours');
                  }}
                  className="w-full rounded-lg brand-gradient py-2.5 px-4 text-[13px] font-semibold text-white"
                >
                  Shop Flavours
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateToBundle();
                  }}
                  className="w-full rounded-lg border border-[#E5E7EB] bg-white py-2.5 px-4 text-[13px] font-semibold text-[#111412] hover:border-[#111412]"
                >
                  Build Your Bundle
                </button>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-[#E5E7EB]">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex gap-3.5">
                  {/* Flavour Accent Thumbnail */}
                  <div
                    className="h-16 w-14 rounded-lg shrink-0 flex flex-col items-center justify-center text-white border border-black/10"
                    style={{ backgroundColor: item.accentHex }}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-85">
                      Pack
                    </span>
                    <span className="font-display text-[17px] font-extrabold tabular-nums leading-none mt-0.5">
                      {item.packSize}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-[14px] font-bold text-[#111412] leading-snug">
                        {item.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="text-[#111412]/40 hover:text-[#B91C1C] transition-colors p-0.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <p className="mt-0.5 text-[12px] text-[#111412]/60 leading-snug">
                      {item.subtitle}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-md border border-[#E5E7EB] bg-[#FAFAFA]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="h-7 w-7 inline-flex items-center justify-center text-[#111412] hover:bg-white rounded-l-md"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-[12px] font-bold tabular-nums text-[#111412]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="h-7 w-7 inline-flex items-center justify-center text-[#111412] hover:bg-white rounded-r-md"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="text-right tabular-nums">
                        <span className="text-[14px] font-bold text-[#111412]">
                          ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.mrp > item.unitPrice && (
                          <span className="ml-1.5 text-[11px] text-[#111412]/45 line-through">
                            ₹{(item.mrp * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Totals & Promo Input */}
        {cart.length > 0 && (
          <div className="border-t border-[#E5E7EB] bg-[#FAFAFA] p-5 space-y-4">
            {/* Promo Code Form */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between rounded-lg bg-[#F4F8EC] border border-[#548530]/35 px-3 py-2 text-[12px]">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#3F6212]">
                    <Check className="h-3.5 w-3.5" />
                    Code {appliedPromo} applied (10% off)
                  </span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-[#111412]/60 hover:text-[#111412] font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePromoSubmit} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="h-3.5 w-3.5 text-[#111412]/45 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder={`Promo code (${PROMO_CODE})`}
                        className="w-full rounded-lg border border-[#E5E7EB] bg-white pl-8 pr-3 py-2 text-[13px] text-[#111412] placeholder:text-[#111412]/40 focus:border-[#548530] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-lg border border-[#111412] bg-white px-4 py-2 text-[12px] font-semibold text-[#111412] hover:bg-[#111412] hover:text-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-[#B91C1C]">{promoError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-1.5 text-[13px] tabular-nums">
              <div className="flex justify-between text-[#111412]/70">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#3F6212] font-medium">
                  <span>Promo ({appliedPromo})</span>
                  <span>−₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#111412]/70">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5E7EB] text-[16px] font-extrabold text-[#111412]">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full rounded-lg brand-gradient py-3.5 px-5 text-[14px] font-bold text-white shadow-sm hover:opacity-95 transition-opacity"
            >
              Proceed to Checkout · ₹{grandTotal.toLocaleString('en-IN')}
            </button>
            <p className="text-[11px] text-center text-[#111412]/55">
              Taxes included · UPI, Cards &amp; Cash on Delivery supported
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
