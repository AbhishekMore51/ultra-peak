import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  CoreFlavourSlug,
  FlavourSlug,
  FREE_SHIPPING_THRESHOLD,
  getFlavourBySlug,
  PACK_TIERS,
  PackTier,
  PROMO_CODE,
  PROMO_DISCOUNT_PERCENT,
} from '../data/catalog';

export type PageView =
  | 'home'
  | 'product'
  | 'bundle'
  | 'journal'
  | 'article'
  | 'about'
  | 'contact';

export type PolicyKey = 'shipping' | 'returns' | 'privacy' | 'terms';

export interface CartItem {
  id: string;
  flavourSlug: FlavourSlug | 'custom-bundle';
  title: string;
  subtitle: string;
  packSize: 4 | 8 | 16 | 32;
  unitPrice: number;
  mrp: number;
  quantity: number;
  accentHex: string;
  bundleBreakdown?: Partial<Record<CoreFlavourSlug, number>>;
}

export interface TrackedOrderRecord {
  orderId: string;
  customerName: string;
  email: string;
  pincode: string;
  city: string;
  total: number;
  itemSummary: string;
  paymentMethod: 'upi' | 'cod';
  placedDate: string;
  estimatedDelivery: string;
  statusStep: 1 | 2 | 3 | 4;
}

export interface ToastMessage {
  id: number;
  text: string;
  tone?: 'default' | 'success';
}

interface StoreContextValue {
  // Navigation
  view: PageView;
  activeFlavour: FlavourSlug;
  activeArticleSlug: string;
  navigateHome: (scrollToId?: string) => void;
  navigateToProduct: (slug: FlavourSlug) => void;
  navigateToBundle: () => void;
  navigateToJournal: () => void;
  navigateToArticle: (slug: string) => void;
  navigateToAbout: () => void;
  navigateToContact: () => void;

  // Cart & Promo
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  grandTotal: number;
  freeShippingRemaining: number;
  appliedPromo: string | null;
  promoError: string | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (params: {
    flavourSlug: FlavourSlug;
    packSize?: 4 | 8 | 16 | 32;
    openDrawer?: boolean;
  }) => void;
  addCustomBundleToCart: (params: {
    packSize: 8 | 16 | 32;
    breakdown: Record<CoreFlavourSlug, number>;
    openDrawer?: boolean;
  }) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyPromoCode: (rawCode: string) => boolean;
  removePromoCode: () => void;

  // Checkout & Order Tracking
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  recentOrders: TrackedOrderRecord[];
  recordPlacedOrder: (order: TrackedOrderRecord) => void;

  // Policy Modal
  activePolicy: PolicyKey | null;
  setActivePolicy: (policy: PolicyKey | null) => void;

  // Client 60-Shot Guide Toggle
  showShootGuide: boolean;
  setShowShootGuide: (show: boolean) => void;

  // Toast
  toast: ToastMessage | null;
  showToast: (text: string, tone?: 'default' | 'success') => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_STORAGE_KEY = 'ultrapeak_store_cart_v1';
const PROMO_STORAGE_KEY = 'ultrapeak_store_promo_v1';

const SAMPLE_ORDERS: TrackedOrderRecord[] = [
  {
    orderId: 'UP-4821',
    customerName: 'Aarav Kulkarni',
    email: 'aarav@example.com',
    pincode: '411004',
    city: 'Pune, Maharashtra',
    total: 899,
    itemSummary: '1× Ultrapeak Lemon Mint (Pack of 16)',
    paymentMethod: 'upi',
    placedDate: 'Nov 20, 2026',
    estimatedDelivery: 'Nov 23, 2026',
    statusStep: 3,
  },
];

const getPackTier = (size: 4 | 8 | 16 | 32): PackTier =>
  PACK_TIERS.find((p) => p.size === size) ?? PACK_TIERS[0];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<PageView>('home');
  const [activeFlavour, setActiveFlavour] = useState<FlavourSlug>('lemon-mint');
  const [activeArticleSlug, setActiveArticleSlug] = useState<string>(
    'electrolytes-l-theanine-indian-summer-races'
  );

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved) as CartItem[];
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState<TrackedOrderRecord[]>(SAMPLE_ORDERS);
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);
  const [showShootGuide, setShowShootGuide] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [appliedPromo]);

  const showToast = useCallback((text: string, tone: 'default' | 'success' = 'default') => {
    const id = Date.now();
    setToast({ id, text, tone });
    window.setTimeout(() => {
      setToast((curr) => (curr && curr.id === id ? null : curr));
    }, 3200);
  }, []);

  // Sync URL hash for browser back/forward support
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === 'home') {
        setView('home');
        return;
      }
      if (hash.startsWith('product/')) {
        const slug = hash.replace('product/', '') as FlavourSlug;
        setActiveFlavour(getFlavourBySlug(slug).slug);
        setView('product');
        return;
      }
      if (hash === 'bundle') {
        setView('bundle');
        return;
      }
      if (hash === 'journal') {
        setView('journal');
        return;
      }
      if (hash.startsWith('journal/')) {
        setActiveArticleSlug(hash.replace('journal/', ''));
        setView('article');
        return;
      }
      if (hash === 'our-story' || hash === 'about') {
        setView('about');
        return;
      }
      if (hash === 'contact' || hash === 'track-order') {
        setView('contact');
        return;
      }
    };
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = useCallback((scrollToId?: string) => {
    window.location.hash = '#/home';
    setView('home');
    if (scrollToId) {
      window.setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else {
      scrollToTop();
    }
  }, []);

  const navigateToProduct = useCallback((slug: FlavourSlug) => {
    setActiveFlavour(slug);
    window.location.hash = `#/product/${slug}`;
    setView('product');
    scrollToTop();
  }, []);

  const navigateToBundle = useCallback(() => {
    window.location.hash = '#/bundle';
    setView('bundle');
    scrollToTop();
  }, []);

  const navigateToJournal = useCallback(() => {
    window.location.hash = '#/journal';
    setView('journal');
    scrollToTop();
  }, []);

  const navigateToArticle = useCallback((slug: string) => {
    setActiveArticleSlug(slug);
    window.location.hash = `#/journal/${slug}`;
    setView('article');
    scrollToTop();
  }, []);

  const navigateToAbout = useCallback(() => {
    window.location.hash = '#/our-story';
    setView('about');
    scrollToTop();
  }, []);

  const navigateToContact = useCallback(() => {
    window.location.hash = '#/contact';
    setView('contact');
    scrollToTop();
  }, []);

  const recordPlacedOrder = useCallback((order: TrackedOrderRecord) => {
    setRecentOrders((prev) => [order, ...prev]);
  }, []);

  const addToCart = useCallback(
    ({
      flavourSlug,
      packSize = 4,
      openDrawer = true,
    }: {
      flavourSlug: FlavourSlug;
      packSize?: 4 | 8 | 16 | 32;
      openDrawer?: boolean;
    }) => {
      const flavour = getFlavourBySlug(flavourSlug);
      const tier = getPackTier(packSize);
      const itemId = `${flavour.slug}-${tier.size}`;

      setCart((prev) => {
        const existing = prev.find((item) => item.id === itemId);
        if (existing) {
          return prev.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [
          ...prev,
          {
            id: itemId,
            flavourSlug: flavour.slug,
            title: flavour.isMixed
              ? 'Ultrapeak Mixed-Flavour Pack'
              : `Ultrapeak ${flavour.name}`,
            subtitle: `${tier.label} · ${tier.size} × 5g sachets`,
            packSize: tier.size,
            unitPrice: tier.price,
            mrp: tier.mrp,
            quantity: 1,
            accentHex: flavour.accentHex,
          },
        ];
      });

      if (openDrawer) {
        setIsCartOpen(true);
      } else {
        showToast(`Added ${flavour.shortName} (${tier.label}) to cart`, 'success');
      }
    },
    [showToast]
  );

  const addCustomBundleToCart = useCallback(
    ({
      packSize,
      breakdown,
      openDrawer = true,
    }: {
      packSize: 8 | 16 | 32;
      breakdown: Record<CoreFlavourSlug, number>;
      openDrawer?: boolean;
    }) => {
      const tier = getPackTier(packSize);
      const signature = Object.entries(breakdown)
        .filter(([, qty]) => qty > 0)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}:${v}`)
        .join('|');
      const itemId = `custom-${packSize}-${signature}`;

      const parts = Object.entries(breakdown)
        .filter(([, qty]) => qty > 0)
        .map(([slug, qty]) => `${qty}× ${getFlavourBySlug(slug as FlavourSlug).shortName}`);

      setCart((prev) => {
        const existing = prev.find((item) => item.id === itemId);
        if (existing) {
          return prev.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [
          ...prev,
          {
            id: itemId,
            flavourSlug: 'custom-bundle',
            title: `Custom Mix Box (${tier.label})`,
            subtitle: parts.join(' · '),
            packSize,
            unitPrice: tier.price,
            mrp: tier.mrp,
            quantity: 1,
            accentHex: '#548530',
            bundleBreakdown: breakdown,
          },
        ];
      });

      if (openDrawer) {
        setIsCartOpen(true);
      }
      showToast(`Custom ${tier.label} added to cart`, 'success');
    },
    [showToast]
  );

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedPromo(null);
    setPromoError(null);
  }, []);

  const applyPromoCode = useCallback((rawCode: string): boolean => {
    const cleaned = rawCode.trim().toUpperCase();
    if (!cleaned) {
      setPromoError('Enter a promo code (try ULTRA10).');
      return false;
    }
    if (cleaned === PROMO_CODE) {
      setAppliedPromo(PROMO_CODE);
      setPromoError(null);
      return true;
    }
    setPromoError(`Code "${cleaned}" is not valid. Use ULTRA10 for 10% off.`);
    return false;
  }, []);

  const removePromoCode = useCallback(() => {
    setAppliedPromo(null);
    setPromoError(null);
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cart]
  );

  const discountAmount = useMemo(() => {
    if (appliedPromo === PROMO_CODE && subtotal > 0) {
      return Math.round((subtotal * PROMO_DISCOUNT_PERCENT) / 100);
    }
    return 0;
  }, [appliedPromo, subtotal]);

  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const shippingFee = subtotal === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : 49;
  const grandTotal = afterDiscount + shippingFee;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount);

  const value: StoreContextValue = {
    view,
    activeFlavour,
    activeArticleSlug,
    navigateHome,
    navigateToProduct,
    navigateToBundle,
    navigateToJournal,
    navigateToArticle,
    navigateToAbout,
    navigateToContact,
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
    addToCart,
    addCustomBundleToCart,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromoCode,
    removePromoCode,
    isCheckoutOpen,
    setIsCheckoutOpen,
    recentOrders,
    recordPlacedOrder,
    activePolicy,
    setActivePolicy,
    showShootGuide,
    setShowShootGuide,
    toast,
    showToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): StoreContextValue => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
};
