import React from 'react';
import { X } from 'lucide-react';
import { PolicyKey, useStore } from '../context/StoreContext';

interface PolicyDoc {
  key: PolicyKey;
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

const POLICIES: Record<PolicyKey, PolicyDoc> = {
  shipping: {
    key: 'shipping',
    title: 'Shipping Policy',
    updated: 'Last updated: May 2026',
    sections: [
      {
        heading: 'Pan-India Shipping & Free Delivery Threshold',
        body: 'Orders with a net cart value of ₹499 or above qualify for Free Express Shipping across serviceable Indian pincodes. Orders below ₹499 carry a flat ₹49 shipping fee.',
      },
      {
        heading: 'Dispatch & Estimated Delivery Timelines',
        body: 'All orders placed before 2:00 PM IST (Monday–Saturday) are dispatched the same business day from our Baddi or Mumbai fulfilment hubs. Metro cities typically receive delivery within 2–3 business days; rest of India within 3–5 business days.',
      },
      {
        heading: 'Cash on Delivery (COD) & Order Tracking',
        body: 'Both prepaid UPI/Cards and Cash on Delivery (COD) are available on serviceable pincodes. Once dispatched, your tracking ID is shared via SMS, WhatsApp, and email, and can be checked anytime on our Track Order page.',
      },
    ],
  },
  returns: {
    key: 'returns',
    title: 'Return & Refund Policy',
    updated: 'Last updated: May 2026',
    sections: [
      {
        heading: 'Consumable Safety & Replacement Guarantee',
        body: 'Because Ultrapeak electrolyte sachets are FSSAI-regulated food supplements, opened boxes cannot be returned for hygiene and safety reasons. However, if your order arrives damaged, leaked, tampered, or incorrect, we offer a 100% free replacement or full refund.',
      },
      {
        heading: '7-Day Claim Window',
        body: 'Report any transit damage or wrong-item issue within 7 days of delivery by emailing support@ultrapeak.in or messaging our WhatsApp support with your Order ID and a clear photo of the parcel.',
      },
      {
        heading: 'Refund Processing',
        body: 'Approved refunds for prepaid UPI/card orders are credited back to the original payment source within 5–7 business days. COD order refunds are processed directly via instant UPI or bank transfer.',
      },
    ],
  },
  privacy: {
    key: 'privacy',
    title: 'Privacy Policy',
    updated: 'Last updated: May 2026',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'We collect only the details needed to fulfil your orders and improve your storefront experience—such as your name, Indian delivery address, phone number, email, and order history. We never store raw UPI PINs or full payment card numbers.',
      },
      {
        heading: 'How We Use Your Data',
        body: 'Your contact details are used strictly for order confirmations, courier dispatch notifications, customer support, and—if you opt in—hydration newsletters and promo codes like ULTRA10. You may unsubscribe at any time.',
      },
      {
        heading: 'Data Protection & Security',
        body: 'Ultrapeak (HealthSphere Wellness Pvt. Ltd.) follows applicable Indian digital personal data protection practices. All checkout transmissions are encrypted via 256-bit SSL, and we never sell customer data to third-party brokers.',
      },
    ],
  },
  terms: {
    key: 'terms',
    title: 'Terms of Service',
    updated: 'Last updated: May 2026',
    sections: [
      {
        heading: 'Storefront Use & Pricing',
        body: 'All product prices on ultrapeak.in are listed in Indian Rupees (INR ₹) inclusive of applicable GST. Promotional codes such as ULTRA10 apply strictly to eligible orders and cannot be stacked with other coupon codes unless stated.',
      },
      {
        heading: 'Nutritional & Health Disclaimer',
        body: 'Ultrapeak Advanced Electrolyte Hydration Powder is a food/nutraceutical hydration supplement intended for healthy active adults. It is not intended to diagnose, treat, cure, or prevent any medical condition. Consult a physician if you are pregnant, nursing, or on sodium-restricted medical care.',
      },
      {
        heading: 'Governing Law',
        body: 'These terms are governed by the laws of India, with disputes subject to the jurisdiction of courts in India. For formal inquiries, contact support@ultrapeak.in.',
      },
    ],
  },
};

const POLICY_TABS: { key: PolicyKey; label: string }[] = [
  { key: 'shipping', label: 'Shipping' },
  { key: 'returns', label: 'Returns & Refunds' },
  { key: 'privacy', label: 'Privacy' },
  { key: 'terms', label: 'Terms' },
];

export const PolicyModal: React.FC = () => {
  const { activePolicy, setActivePolicy } = useStore();

  if (!activePolicy) return null;

  const doc = POLICIES[activePolicy];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111412]/70 backdrop-blur-sm p-4"
      onClick={() => setActivePolicy(null)}
    >
      <div
        className="relative w-full max-w-[640px] max-h-[85vh] rounded-2xl bg-white border border-[#E5E7EB] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-[20px] font-bold text-[#111412]">
              {doc.title}
            </h2>
            <p className="text-[12px] text-[#111412]/55">{doc.updated}</p>
          </div>
          <button
            type="button"
            onClick={() => setActivePolicy(null)}
            aria-label="Close policy dialog"
            className="h-9 w-9 rounded-lg border border-[#E5E7EB] inline-flex items-center justify-center text-[#111412] hover:border-[#111412]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Policy Switcher Bar */}
        <div className="px-6 py-2.5 bg-[#FAFAFA] border-b border-[#E5E7EB] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {POLICY_TABS.map((tab) => {
            const active = tab.key === activePolicy;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActivePolicy(tab.key)}
                className={`rounded-md px-3 py-1.5 text-[12px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#111412] text-white'
                    : 'text-[#111412]/65 hover:text-[#111412]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Readable Policy Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {doc.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="font-display text-[15px] font-bold text-[#111412] mb-1.5">
                {section.heading}
              </h3>
              <p className="text-[14px] leading-[1.68] text-[#111412]/72">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#E5E7EB] bg-[#FAFAFA] flex items-center justify-between gap-3">
          <span className="text-[12px] text-[#111412]/55">
            Questions? support@ultrapeak.in
          </span>
          <button
            type="button"
            onClick={() => setActivePolicy(null)}
            className="rounded-lg bg-[#111412] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#548530] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
