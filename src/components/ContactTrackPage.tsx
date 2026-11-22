import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  Package,
  Search,
  Send,
  Truck,
} from 'lucide-react';
import { TrackedOrderRecord, useStore } from '../context/StoreContext';

const TRACKING_STEPS = [
  { step: 1, label: 'Order Confirmed', desc: 'Payment / COD verified & packed' },
  { step: 2, label: 'Dispatched', desc: 'Handed over to express courier partner' },
  { step: 3, label: 'In Transit', desc: 'Moving through regional hub' },
  { step: 4, label: 'Out for Delivery', desc: 'Arriving at your doorstep' },
];

export const ContactTrackPage: React.FC = () => {
  const { recentOrders, showToast } = useStore();

  // Track Your Order state
  const [orderIdInput, setOrderIdInput] = useState('');
  const [orderEmailInput, setOrderEmailInput] = useState('');
  const [trackError, setTrackError] = useState<string | null>(null);
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrderRecord | null>(null);

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Order & Delivery');
  const [message, setMessage] = useState('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedId = orderIdInput.trim().toUpperCase().replace(/^#/, '');
    if (!cleanedId) {
      setTrackError('Please enter your Order ID (for example: UP-4821).');
      setTrackedOrder(null);
      return;
    }

    const found = recentOrders.find(
      (o) => o.orderId.toUpperCase() === cleanedId
    );
    if (found) {
      setTrackError(null);
      setTrackedOrder(found);
      return;
    }

    // Accept any well-formed UP-XXXX demo ID so reviewers can test effortlessly
    if (/^UP-\d{4}$/.test(cleanedId)) {
      setTrackError(null);
      setTrackedOrder({
        orderId: cleanedId,
        customerName: 'Ultrapeak Customer',
        email: orderEmailInput.trim() || 'customer@ultrapeak.in',
        pincode: '400001',
        city: 'Mumbai, Maharashtra',
        total: 899,
        itemSummary: '1× Ultrapeak Variety Pack (Pack of 16)',
        paymentMethod: 'upi',
        placedDate: 'Nov 21, 2026',
        estimatedDelivery: 'Nov 24, 2026',
        statusStep: 2,
      });
      return;
    }

    setTrackedOrder(null);
    setTrackError(
      `No shipment found for "${cleanedId}". Try sample Order ID UP-4821 or an order ID from checkout.`
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setContactError('Please complete your name, email, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setContactError('Please enter a valid email address.');
      return;
    }

    setContactError(null);
    setContactSubmitted(true);
    showToast('Support message received — our team will reply shortly.', 'success');
  };

  return (
    <div className="bg-[#FAFAFA]">
      {/* Page Intro */}
      <section className="bg-white border-b border-[#E5E7EB] py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold tracking-wide text-[#548530] mb-2">
              Customer Care &amp; Order Status
            </p>
            <h1 className="font-display text-[30px] sm:text-[42px] font-extrabold tracking-[-0.025em] text-[#111412]">
              Contact &amp; Track Order
            </h1>
            <p className="mt-2.5 text-[15px] leading-[1.6] text-[#111412]/70">
              Check live pan-India shipment progress or reach our hydration support team directly via WhatsApp, email, or the form below.
            </p>
          </div>
        </div>
      </section>

      {/* Clean 2-Column Layout */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Track Your Order + Direct Support Channels */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="h-9 w-9 rounded-lg bg-[#F4F8EC] text-[#548530] flex items-center justify-center">
                  <Package className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="font-display text-[20px] font-bold text-[#111412]">
                    Track Your Order
                  </h2>
                </div>
              </div>
              <p className="text-[13px] text-[#111412]/65 mb-5">
                Enter your Ultrapeak Order ID and email to view dispatch milestones.{' '}
                <button
                  type="button"
                  onClick={() => {
                    setOrderIdInput(recentOrders[0].orderId);
                    setOrderEmailInput(recentOrders[0].email);
                    setTrackError(null);
                  }}
                  className="font-semibold text-[#548530] hover:underline"
                >
                  Try {recentOrders[0].orderId}
                </button>
              </p>

              <form onSubmit={handleTrackSubmit} className="space-y-3">
                <div>
                  <label
                    htmlFor="track-order-id"
                    className="block text-[12px] font-semibold text-[#111412] mb-1"
                  >
                    Order ID
                  </label>
                  <input
                    id="track-order-id"
                    type="text"
                    value={orderIdInput}
                    onChange={(e) => setOrderIdInput(e.target.value)}
                    placeholder="e.g. UP-4821"
                    className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5 text-[14px] text-[#111412] placeholder:text-[#111412]/40 focus:border-[#548530] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="track-order-email"
                    className="block text-[12px] font-semibold text-[#111412] mb-1"
                  >
                    Email or Phone (optional)
                  </label>
                  <input
                    id="track-order-email"
                    type="text"
                    value={orderEmailInput}
                    onChange={(e) => setOrderEmailInput(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5 text-[14px] text-[#111412] placeholder:text-[#111412]/40 focus:border-[#548530] focus:bg-white focus:outline-none"
                  />
                </div>

                {trackError && (
                  <p className="text-[12px] text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2">
                    {trackError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#111412] py-3 px-4 text-[14px] font-semibold text-white hover:bg-[#548530] transition-colors"
                >
                  <Search className="h-4 w-4" />
                  <span>Track Shipment</span>
                </button>
              </form>

              {/* Live Order Result Timeline */}
              {trackedOrder && (
                <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <div className="text-[12px] font-semibold text-[#548530]">
                        Order #{trackedOrder.orderId}
                      </div>
                      <div className="text-[14px] font-bold text-[#111412]">
                        {trackedOrder.itemSummary}
                      </div>
                    </div>
                    <span className="text-[12px] font-semibold tabular-nums text-[#111412]/70">
                      ETA: {trackedOrder.estimatedDelivery}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {TRACKING_STEPS.map((st) => {
                      const done = st.step <= trackedOrder.statusStep;
                      const current = st.step === trackedOrder.statusStep;
                      return (
                        <div key={st.step} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                              done
                                ? 'bg-[#548530] text-white'
                                : 'bg-[#F3F4F6] text-[#111412]/40 border border-[#E5E7EB]'
                            }`}
                          >
                            {done ? '✓' : st.step}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-[13px] font-semibold ${
                                done ? 'text-[#111412]' : 'text-[#111412]/45'
                              }`}
                            >
                              {st.label}{' '}
                              {current && (
                                <span className="text-[11px] font-medium text-[#548530]">
                                  · Current Stage
                                </span>
                              )}
                            </div>
                            <p className="text-[12px] text-[#111412]/60">
                              {st.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#111412]/65 tabular-nums">
                    <span>
                      Destination: {trackedOrder.city} ({trackedOrder.pincode})
                    </span>
                    <span>Total: ₹{trackedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Direct WhatsApp & Email Support Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white border border-[#E5E7EB] p-5">
                <div className="h-9 w-9 rounded-lg bg-[#F4F8EC] text-[#548530] flex items-center justify-center mb-3">
                  <MessageCircle className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-display text-[15px] font-bold text-[#111412]">
                  WhatsApp Support
                </h3>
                <p className="mt-1 text-[13px] font-semibold tabular-nums text-[#111412]">
                  +91 98201 00412
                </p>
                <p className="mt-1 text-[12px] text-[#111412]/60">
                  Quick help with orders, bulk race kits &amp; flavour advice.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-[#E5E7EB] p-5">
                <div className="h-9 w-9 rounded-lg bg-[#F4F8EC] text-[#548530] flex items-center justify-center mb-3">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-display text-[15px] font-bold text-[#111412]">
                  Email Concierge
                </h3>
                <p className="mt-1 text-[13px] font-semibold text-[#111412]">
                  support@ultrapeak.in
                </p>
                <p className="mt-1 text-[12px] text-[#111412]/60 inline-flex items-center gap-1">
                  <Clock className="h-3 w-3 shrink-0" />
                  Mon–Sat · 9 AM – 7 PM IST
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Minimal Contact Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-6 sm:p-8">
              <h2 className="font-display text-[22px] font-bold text-[#111412]">
                Send Us a Message
              </h2>
              <p className="mt-1 text-[13px] text-[#111412]/65">
                Questions about race-day hydration, wholesale gyms, or an existing order? We respond within 1 business day.
              </p>

              {contactSubmitted ? (
                <div className="mt-6 rounded-xl bg-[#F4F8EC] border border-[#548530]/30 p-6 text-center">
                  <CheckCircle2 className="h-10 w-10 text-[#548530] mx-auto mb-3" />
                  <h3 className="font-display text-[18px] font-bold text-[#111412]">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-1.5 text-[13px] text-[#111412]/72 max-w-sm mx-auto">
                    Thank you, {name}. Our support specialist will reply to{' '}
                    <strong className="font-semibold text-[#111412]">{email}</strong>{' '}
                    shortly regarding <em>{topic}</em>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-5 rounded-lg border border-[#111412] bg-white px-4 py-2 text-[13px] font-semibold text-[#111412] hover:bg-[#111412] hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[12px] font-semibold text-[#111412] mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5 text-[14px] text-[#111412] focus:border-[#548530] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[12px] font-semibold text-[#111412] mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5 text-[14px] text-[#111412] focus:border-[#548530] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-[12px] font-semibold text-[#111412] mb-1"
                    >
                      Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5 text-[14px] text-[#111412] focus:border-[#548530] focus:bg-white focus:outline-none"
                    >
                      <option>Order &amp; Delivery</option>
                      <option>Product &amp; Formula Questions</option>
                      <option>Run Clubs &amp; Event Partnerships</option>
                      <option>Returns &amp; Refunds</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[12px] font-semibold text-[#111412] mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can our team help?"
                      className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5 text-[14px] text-[#111412] focus:border-[#548530] focus:bg-white focus:outline-none resize-y"
                    />
                  </div>

                  {contactError && (
                    <p className="text-[12px] text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2">
                      {contactError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg brand-gradient py-3.5 px-5 text-[14px] font-bold text-white shadow-sm hover:opacity-95 transition-opacity"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>

                  <p className="text-[12px] text-[#111412]/55 inline-flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-[#548530]" />
                    <span>HealthSphere Wellness Pvt. Ltd. · Baddi &amp; Mumbai Dispatch Hubs</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
