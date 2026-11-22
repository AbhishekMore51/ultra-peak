import React, { useState } from 'react';
import {
  Banknote,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import { ASSETS } from '../data/catalog';
import { useStore } from '../context/StoreContext';

type PaymentMethod = 'upi' | 'cod';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    appliedPromo,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    recordPlacedOrder,
    navigateToContact,
    showToast,
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiApp, setUpiApp] = useState<'GPay' | 'PhonePe' | 'Paytm'>('GPay');
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    method: PaymentMethod;
    customerName: string;
    pincode: string;
    itemCount: number;
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
    setError(null);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!address.trim() || !city.trim()) {
      setError('Please enter your street address and city.');
      return;
    }
    if (!/^[1-9]\d{5}$/.test(pincode.trim())) {
      setError('Enter a valid 6-digit Indian pincode.');
      return;
    }

    setError(null);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `UP-${randomNum}`;
    const count = cart.reduce((s, i) => s + i.quantity, 0);
    const itemSummary = cart
      .map((i) => `${i.quantity}× ${i.title}`)
      .join(', ');
    const est = new Date();
    est.setDate(est.getDate() + 3);

    recordPlacedOrder({
      orderId,
      customerName: fullName.trim(),
      email: phone.trim(),
      pincode: pincode.trim(),
      city: city.trim(),
      total: grandTotal,
      itemSummary: itemSummary || `${count} pack(s)`,
      paymentMethod,
      placedDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      estimatedDelivery: est.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      statusStep: 1,
    });

    setConfirmedOrder({
      orderId,
      total: grandTotal,
      method: paymentMethod,
      customerName: fullName.trim(),
      pincode: pincode.trim(),
      itemCount: count,
    });
    clearCart();
    showToast(`Order #${orderId} confirmed!`, 'success');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopify Checkout Preview"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111412]/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[780px] rounded-2xl bg-white shadow-2xl border border-[#E5E7EB] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Checkout Header */}
        <div className="px-6 py-4 bg-[#111412] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ASSETS.logo}
              alt="ultrapeak"
              className="h-5 w-auto"
              referrerPolicy="no-referrer"
            />
            <span className="text-[12px] text-white/60 border-l border-white/20 pl-3">
              Shopify Express Checkout Preview
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close checkout"
            className="h-8 w-8 rounded-lg bg-white/10 inline-flex items-center justify-center text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Post-Order Confirmed Receipt State */}
        {confirmedOrder ? (
          <div className="p-8 sm:p-10 text-center max-w-md mx-auto">
            <div className="h-14 w-14 rounded-full bg-[#F4F8EC] text-[#548530] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="text-[12px] font-semibold text-[#548530] uppercase tracking-wider">
              Order #{confirmedOrder.orderId} Confirmed
            </p>
            <h2 className="mt-1 font-display text-[26px] font-extrabold text-[#111412]">
              Thank you, {confirmedOrder.customerName}!
            </h2>
            <p className="mt-2 text-[14px] text-[#111412]/70">
              Your Ultrapeak order is confirmed and preparing for dispatch to pincode{' '}
              <strong className="font-semibold text-[#111412] tabular-nums">
                {confirmedOrder.pincode}
              </strong>
              .
            </p>

            <div className="mt-6 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] p-4 text-left space-y-2 text-[13px] tabular-nums">
              <div className="flex justify-between">
                <span className="text-[#111412]/60">Items Ordered</span>
                <span className="font-semibold text-[#111412]">
                  {confirmedOrder.itemCount} pack(s)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#111412]/60">Payment Method</span>
                <span className="font-semibold text-[#111412]">
                  {confirmedOrder.method === 'upi'
                    ? `UPI Instant Pay (${upiApp})`
                    : 'Cash on Delivery (COD)'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5E7EB]">
                <span className="font-bold text-[#111412]">Amount Payable</span>
                <span className="font-extrabold text-[#548530]">
                  ₹{confirmedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  navigateToContact();
                }}
                className="flex-1 rounded-lg border border-[#111412] bg-white py-3 px-4 text-[13px] font-semibold text-[#111412] hover:bg-[#FAFAFA] transition-colors"
              >
                Track Order
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-lg bg-[#111412] py-3 px-4 text-[13px] font-semibold text-white hover:bg-[#548530] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="grid grid-cols-1 md:grid-cols-12"
          >
            {/* Left: Shipping & Payment Form */}
            <div className="md:col-span-7 p-6 space-y-5 border-b md:border-b-0 md:border-r border-[#E5E7EB]">
              <div>
                <h3 className="font-display text-[15px] font-bold text-[#111412] mb-3">
                  1. Delivery Details (India)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name *"
                    className="rounded-lg border border-[#E5E7EB] px-3.5 py-2.5 text-[13px] text-[#111412] focus:border-[#548530] focus:outline-none"
                  />
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit Mobile Number *"
                    className="rounded-lg border border-[#E5E7EB] px-3.5 py-2.5 text-[13px] tabular-nums text-[#111412] focus:border-[#548530] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Flat, Street Address *"
                    className="sm:col-span-2 rounded-lg border border-[#E5E7EB] px-3.5 py-2.5 text-[13px] text-[#111412] focus:border-[#548530] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City & State *"
                    className="rounded-lg border border-[#E5E7EB] px-3.5 py-2.5 text-[13px] text-[#111412] focus:border-[#548530] focus:outline-none"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="6-digit Pincode *"
                    className="rounded-lg border border-[#E5E7EB] px-3.5 py-2.5 text-[13px] tabular-nums text-[#111412] focus:border-[#548530] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Toggle: UPI vs COD */}
              <div>
                <h3 className="font-display text-[15px] font-bold text-[#111412] mb-3">
                  2. Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      paymentMethod === 'upi'
                        ? 'border-[#548530] bg-[#F4F8EC]/60 ring-1 ring-[#548530]'
                        : 'border-[#E5E7EB] hover:border-[#111412]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#111412]">
                      <Smartphone className="h-4 w-4 text-[#548530]" />
                      <span>UPI Instant Pay</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#111412]/60">
                      GPay, PhonePe, Paytm
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#548530] bg-[#F4F8EC]/60 ring-1 ring-[#548530]'
                        : 'border-[#E5E7EB] hover:border-[#111412]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#111412]">
                      <Banknote className="h-4 w-4 text-[#548530]" />
                      <span>Cash on Delivery</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#111412]/60">
                      Pay at doorstep · ₹0 fee
                    </p>
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] p-3 space-y-2.5">
                    <div className="flex gap-2">
                      {(['GPay', 'PhonePe', 'Paytm'] as const).map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setUpiApp(app)}
                          className={`flex-1 rounded-md border py-1.5 text-[12px] font-semibold transition-colors ${
                            upiApp === app
                              ? 'border-[#111412] bg-[#111412] text-white'
                              : 'border-[#E5E7EB] bg-white text-[#111412]'
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Optional UPI ID (e.g. name@okaxis)"
                      className="w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-[12px] text-[#111412] focus:border-[#548530] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {error && (
                <p className="text-[12px] font-medium text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
            </div>

            {/* Right: Order Summary */}
            <div className="md:col-span-5 bg-[#FAFAFA] p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-[15px] font-bold text-[#111412] mb-3">
                  Order Summary
                </h3>

                <ul className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start justify-between gap-2 text-[12px]"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-[#111412] truncate">
                          {item.quantity}× {item.title}
                        </div>
                        <div className="text-[#111412]/55 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                      <span className="font-semibold tabular-nums text-[#111412] shrink-0">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-4 border-t border-[#E5E7EB] space-y-1.5 text-[13px] tabular-nums">
                  <div className="flex justify-between text-[#111412]/65">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#3F6212] font-medium">
                      <span>Discount ({appliedPromo})</span>
                      <span>−₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#111412]/65">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between pt-2.5 border-t border-[#E5E7EB] text-[16px] font-extrabold text-[#111412]">
                    <span>Total</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  type="submit"
                  className="w-full rounded-lg brand-gradient py-3.5 px-5 text-[14px] font-bold text-white shadow-sm hover:opacity-95 transition-opacity"
                >
                  {paymentMethod === 'upi'
                    ? `Pay ₹${grandTotal.toLocaleString('en-IN')} via ${upiApp}`
                    : `Place COD Order · ₹${grandTotal.toLocaleString('en-IN')}`}
                </button>
                <div className="flex items-center justify-center gap-3 text-[11px] text-[#111412]/55">
                  <span className="inline-flex items-center gap-1">
                    <Lock className="h-3 w-3" /> 256-bit SSL
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-[#548530]" /> Simulated Preview
                  </span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
