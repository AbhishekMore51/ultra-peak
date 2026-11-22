export const ASSETS = {
  logo: '/assets/aistudio/ultrapeak-logo_36c4849b.webp',
  heroBanner: '/src/assets/images/hero_athletic_hydration_1795339803786.jpg',
  lemonMint: '/src/assets/images/flavour_lemon_mint_1795339803183.jpg',
  orange: '/src/assets/images/flavour_orange_1795339803839.jpg',
  berryBlast: '/src/assets/images/flavour_berry_blast_1795339803606.jpg',
  peachMango: '/src/assets/images/flavour_peach_mango_1795339802766.jpg',
  runnerBanner: '/src/assets/images/lifestyle_runner_banner_1795339803850.jpg',
  gymFocus: '/src/assets/images/usecase_gym_focus_1795339803492.jpg',
  reelPour: '/src/assets/images/reel_electrolyte_pour_1795339803124.jpg',
} as const;

export type FlavourSlug =
  | 'lemon-mint'
  | 'orange'
  | 'berry-blast'
  | 'peach-mango'
  | 'mixed-pack';

export type CoreFlavourSlug = Exclude<FlavourSlug, 'mixed-pack'>;

export type GalleryAngleType =
  | 'front-sachet'
  | 'prepared-drink'
  | 'angled-sachet'
  | 'sachet-fruit'
  | 'macro-label'
  | 'back-sachet';

export interface GalleryShot {
  id: GalleryAngleType;
  label: string;
  shotCode: string;
  alt: string;
}

export interface ProductFlavour {
  slug: FlavourSlug;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  tastingNotes: string;
  accentHex: string;
  softBgHex: string;
  darkAccentHex: string;
  rating: number;
  reviewCount: number;
  photo: string;
  isMixed?: boolean;
  cardTag?: string;
  shotListCard: string;
  gallery: GalleryShot[];
}

export interface PackTier {
  size: 4 | 8 | 16 | 32;
  label: string;
  price: number;
  mrp: number;
  savingsPercent: number;
  badge?: string;
  sublabel: string;
  shotCode: string;
}

export const FREE_SHIPPING_THRESHOLD = 499;
export const PROMO_CODE = 'ULTRA10';
export const PROMO_DISCOUNT_PERCENT = 10;

export const PACK_TIERS: PackTier[] = [
  {
    size: 4,
    label: 'Pack of 4',
    price: 249,
    mrp: 249,
    savingsPercent: 0,
    sublabel: 'Starter trial',
    shotCode: 'Shot #34 · Pack of 4 Closed Studio Box',
  },
  {
    size: 8,
    label: 'Pack of 8',
    price: 469,
    mrp: 498,
    savingsPercent: 6,
    sublabel: 'Save 6%',
    shotCode: 'Shot #37 · Pack of 8 Open Box Flat-Lay',
  },
  {
    size: 16,
    label: 'Pack of 16',
    price: 899,
    mrp: 996,
    savingsPercent: 10,
    badge: 'Most Popular',
    sublabel: 'Save 10%',
    shotCode: 'Shot #40 · Pack of 16 Hero Stack',
  },
  {
    size: 32,
    label: 'Pack of 32',
    price: 1699,
    mrp: 1992,
    savingsPercent: 15,
    badge: 'Best Value',
    sublabel: 'Save 15%',
    shotCode: 'Shot #43 · Pack of 32 Monthly Vault',
  },
];

export const BUNDLE_TIERS = PACK_TIERS.filter((p) => p.size >= 8);

const buildGallery = (
  name: string,
  baseShotNum: number,
  isMixed = false
): GalleryShot[] => [
  {
    id: 'front-sachet',
    label: isMixed ? 'Variety Box' : 'Front Sachet',
    shotCode: `Shot #${String(baseShotNum).padStart(2, '0')} · ${name} ${isMixed ? '4-Flavour Starter Box' : 'Front Sachet'}`,
    alt: `Ultrapeak ${name} 5g electrolyte sachet front view`,
  },
  {
    id: 'prepared-drink',
    label: 'Prepared Drink',
    shotCode: `Shot #${String(baseShotNum + 1).padStart(2, '0')} · ${name} Prepared Drink in Clear Glass`,
    alt: `Chilled glass of Ultrapeak ${name} electrolyte drink with fresh ingredients`,
  },
  {
    id: 'angled-sachet',
    label: 'Angled View',
    shotCode: `Shot #${String(baseShotNum + 2).padStart(2, '0')} · ${name} 45° Angled Studio Sachet`,
    alt: `Ultrapeak ${name} angled sachet showing matte finish and race-bib silhouette`,
  },
  {
    id: 'sachet-fruit',
    label: 'With Ingredients',
    shotCode: `Shot #${String(baseShotNum + 3).padStart(2, '0')} · ${name} Sachet + Fresh Fruit Composition`,
    alt: `Ultrapeak ${name} sachet styled with natural fruit notes and crystal powder`,
  },
  {
    id: 'macro-label',
    label: 'Formula Macro',
    shotCode: `Shot #${String(baseShotNum + 4).padStart(2, '0')} · ${name} Macro 0g Sugar & L-Theanine Callout`,
    alt: `Close-up macro label of Ultrapeak ${name} highlighting 0g sugar and 100mg L-Theanine`,
  },
  {
    id: 'back-sachet',
    label: 'Nutrition Back',
    shotCode: `Shot #${String(baseShotNum + 5).padStart(2, '0')} · ${name} Back Sachet Nutrition Panel`,
    alt: `Back panel of Ultrapeak ${name} sachet showing transparent electrolyte facts`,
  },
];

export const FLAVOURS: ProductFlavour[] = [
  {
    slug: 'lemon-mint',
    name: 'Lemon Mint',
    shortName: 'Lemon Mint',
    subtitle: 'Crisp Citrus & Cooling Garden Mint',
    description:
      'Zesty lemon cooled with fresh mint for a crisp, clean taste that cuts through Indian summer humidity without any syrupy aftertaste.',
    tastingNotes: 'Bright nimbu zest · Cool crushed mint · Clean mineral finish',
    accentHex: '#65A30D',
    softBgHex: '#F4F8EC',
    darkAccentHex: '#3F6212',
    rating: 4.9,
    reviewCount: 418,
    photo: ASSETS.lemonMint,
    cardTag: 'Bestseller',
    shotListCard: 'Shot #04 · Lemon Mint Hero Sachet & Glass',
    gallery: buildGallery('Lemon Mint', 4),
  },
  {
    slug: 'orange',
    name: 'Orange',
    shortName: 'Orange',
    subtitle: 'Bright Juicy Valencia Citrus Burst',
    description:
      'Bright, juicy citrus burst built for hot Indian workouts, mid-run aid stations, and instant post-sweat replenishment.',
    tastingNotes: 'Ripe Valencia orange · Subtle peel brightness · Zero chalkiness',
    accentHex: '#EA580C',
    softBgHex: '#FFF5EE',
    darkAccentHex: '#9A3412',
    rating: 4.8,
    reviewCount: 312,
    photo: ASSETS.orange,
    shotListCard: 'Shot #10 · Orange Hero Sachet & Glass',
    gallery: buildGallery('Orange', 10),
  },
  {
    slug: 'berry-blast',
    name: 'Berry Blast',
    shortName: 'Berry Blast',
    subtitle: 'Bold Mixed-Berry Refreshment',
    description:
      'Bold mixed-berry refreshment without syrupy sweetness—engineered for heavy strength sessions, late-day lifts, and clean daily sipping.',
    tastingNotes: 'Wild blueberry · Tart raspberry · Smooth blackberry finish',
    accentHex: '#7E22CE',
    softBgHex: '#F7F1FC',
    darkAccentHex: '#581C87',
    rating: 4.8,
    reviewCount: 249,
    photo: ASSETS.berryBlast,
    shotListCard: 'Shot #16 · Berry Blast Hero Sachet & Glass',
    gallery: buildGallery('Berry Blast', 16),
  },
  {
    slug: 'peach-mango',
    name: 'Peach Mango',
    shortName: 'Peach Mango',
    subtitle: 'Smooth Tropical Peach & Ripe Mango',
    description:
      'Smooth tropical peach and ripe mango finish crafted for effortless all-day hydration at your desk, in transit, or post-run recovery.',
    tastingNotes: 'Orchard white peach · Sun-ripened mango · Light refreshing body',
    accentHex: '#D97706',
    softBgHex: '#FEF8EC',
    darkAccentHex: '#92400E',
    rating: 4.9,
    reviewCount: 287,
    photo: ASSETS.peachMango,
    cardTag: 'Fan Favourite',
    shotListCard: 'Shot #22 · Peach Mango Hero Sachet & Glass',
    gallery: buildGallery('Peach Mango', 22),
  },
  {
    slug: 'mixed-pack',
    name: 'Mixed-Flavour Variety Pack',
    shortName: 'Variety Pack',
    subtitle: 'All 4 Signature Flavours in One Box',
    description:
      'Experience every Ultrapeak flavour in one balanced starter box—equal sachets of Lemon Mint, Orange, Berry Blast, and Peach Mango.',
    tastingNotes: 'Lemon Mint · Orange · Berry Blast · Peach Mango',
    accentHex: '#548530',
    softBgHex: '#F2F6EE',
    darkAccentHex: '#2F4D1A',
    rating: 4.9,
    reviewCount: 534,
    photo: ASSETS.lemonMint,
    isMixed: true,
    cardTag: 'All 4 Flavours',
    shotListCard: 'Shot #28 · Mixed-Flavour 4-Sachet Variety Box',
    gallery: buildGallery('Mixed-Flavour Variety Pack', 28, true),
  },
];

export const CORE_FLAVOURS = FLAVOURS.filter(
  (f): f is ProductFlavour & { slug: CoreFlavourSlug } => !f.isMixed
);

export const getFlavourBySlug = (slug: FlavourSlug): ProductFlavour =>
  FLAVOURS.find((f) => f.slug === slug) ?? FLAVOURS[0];

export interface NutritionRow {
  nutrient: string;
  amount: string;
  rda?: string;
  role: string;
  highlight?: boolean;
}

export const NUTRITION_FACTS: NutritionRow[] = [
  { nutrient: 'Energy', amount: '9 kcal', rda: '<1%', role: 'Clean hydration without glucose spikes' },
  { nutrient: 'Added Sugar', amount: '0 g', rda: '0%', role: 'Naturally sweetened (Stevia & Monk Fruit)', highlight: true },
  { nutrient: 'Sodium', amount: '225 mg', rda: '11%', role: 'Restores primary sweat mineral & fluid retention', highlight: true },
  { nutrient: 'Potassium', amount: '376 mg', rda: '11%', role: 'Supports muscle contraction & cramp prevention', highlight: true },
  { nutrient: 'Magnesium', amount: '50 mg', rda: '14%', role: 'Aids neuromuscular recovery & nerve signalling' },
  { nutrient: 'L-Theanine', amount: '100 mg', rda: '—', role: 'Promotes calm, jitter-free focus late in sessions', highlight: true },
  { nutrient: 'Vitamin C', amount: '40 mg', rda: '50%', role: 'Antioxidant & immune defence under heat stress' },
  { nutrient: 'Vitamin B-Complex (B3, B5, B6, B12)', amount: '100% Daily Blend', rda: '50–100%', role: 'Cellular energy metabolism without caffeine crash' },
];

export interface UseCaseItem {
  id: string;
  title: string;
  subtitle: string;
  recommendedFlavour: FlavourSlug;
  ctaLabel: string;
  photo: string;
  shotCode: string;
  accentHex: string;
}

export const USE_CASES: UseCaseItem[] = [
  {
    id: 'running',
    title: 'Running & Races',
    subtitle: '5g race-bib ready sachets engineered for Devils Circuit obstacles, half marathons, and humid morning long runs.',
    recommendedFlavour: 'lemon-mint',
    ctaLabel: 'Shop Lemon Mint',
    photo: ASSETS.runnerBanner,
    shotCode: 'Shot #46 · Usecase — Endurance Runner in Action',
    accentHex: '#65A30D',
  },
  {
    id: 'gym',
    title: 'Gym & Strength',
    subtitle: 'Keep muscles firing through heavy compound sets with bioavailable Potassium & Magnesium—zero bloating or sugar crash.',
    recommendedFlavour: 'berry-blast',
    ctaLabel: 'Shop Berry Blast',
    photo: ASSETS.gymFocus,
    shotCode: 'Shot #48 · Usecase — Gym Athlete Intra-Workout',
    accentHex: '#7E22CE',
  },
  {
    id: 'travel',
    title: 'Travel & Heat',
    subtitle: 'Slip four 5g sticks into your cabin pouch or commuter bag for instant cabin-air and Indian summer heat recovery.',
    recommendedFlavour: 'orange',
    ctaLabel: 'Shop Orange',
    photo: ASSETS.orange,
    shotCode: 'Shot #50 · Usecase — Travel & Indian Heat Citrus Pour',
    accentHex: '#EA580C',
  },
  {
    id: 'work',
    title: 'Daily Work & Focus',
    subtitle: '100mg L-Theanine + balanced electrolytes turn your 3 PM slump into steady, calm focus—without another cup of coffee.',
    recommendedFlavour: 'peach-mango',
    ctaLabel: 'Shop Peach Mango',
    photo: ASSETS.peachMango,
    shotCode: 'Shot #52 · Usecase — Desk Hydration & Calm Focus',
    accentHex: '#D97706',
  },
];

export interface ReelItem {
  id: string;
  creatorName: string;
  handle: string;
  role: string;
  caption: string;
  views: string;
  duration: string;
  flavourSlug: CoreFlavourSlug;
  photo: string;
  shotCode: string;
  transcriptSnippet: string;
}

export const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    creatorName: 'Rohan Deshmukh',
    handle: '@rohan.runs',
    role: 'Devils Circuit Finisher · Pune',
    caption: 'Km 14 in 36°C heat—one 5g Lemon Mint sachet in cold water brings my legs back online.',
    views: '48.2K',
    duration: '0:24',
    flavourSlug: 'lemon-mint',
    photo: ASSETS.reelPour,
    shotCode: 'Shot #54 · Reel 01 — High-Speed Powder Pour & Dissolve',
    transcriptSnippet: '“Zero sticky sugar mouthfeel mid-race—just crisp cold nimbu-mint that dissolves in five seconds.”',
  },
  {
    id: 'reel-2',
    creatorName: 'Ananya Nair',
    handle: '@ananya.lifts',
    role: 'Strength Coach · Bengaluru',
    caption: 'Swapped my neon pre-workout for Berry Blast + L-Theanine. Dialed-in focus, zero jitters.',
    views: '31.9K',
    duration: '0:19',
    flavourSlug: 'berry-blast',
    photo: ASSETS.gymFocus,
    shotCode: 'Shot #55 · Reel 02 — Strength Session Shaker Ritual',
    transcriptSnippet: '“Potassium + Magnesium keeps my calves from cramping on heavy leg days and tastes clean.”',
  },
  {
    id: 'reel-3',
    creatorName: 'Kabir Malhotra',
    handle: '@kabir.endurance',
    role: 'Sub-1:35 Half Marathoner · Mumbai',
    caption: 'Marine Drive 6 AM humidity check. Two race-bib sachets tucked in my half-tights.',
    views: '62.4K',
    duration: '0:28',
    flavourSlug: 'orange',
    photo: ASSETS.runnerBanner,
    shotCode: 'Shot #56 · Reel 03 — Dawn Road Run Bib-Ready Sachet',
    transcriptSnippet: '“Orange tastes like chilled Valencia citrus—not hospital ORS—and packs 225mg sodium per stick.”',
  },
  {
    id: 'reel-4',
    creatorName: 'Meera Krishnan',
    handle: '@meera.moves',
    role: 'Triathlete & Product Lead · Chennai',
    caption: 'From 5:30 AM brick workout straight to 10 AM product reviews—Peach Mango on my desk.',
    views: '27.6K',
    duration: '0:21',
    flavourSlug: 'peach-mango',
    photo: ASSETS.peachMango,
    shotCode: 'Shot #57 · Reel 04 — Athlete-to-Desk Transition',
    transcriptSnippet: '“That 100mg of L-Theanine is a quiet superpower when you need sharp afternoon focus.”',
  },
  {
    id: 'reel-5',
    creatorName: 'Vikram Singhania',
    handle: '@vikram.hybrid',
    role: 'Hybrid Athlete · Delhi NCR',
    caption: 'Four flavours, zero artificial colours, third-party lab tested. What stays in my gym bag.',
    views: '39.1K',
    duration: '0:26',
    flavourSlug: 'lemon-mint',
    photo: ASSETS.lemonMint,
    shotCode: 'Shot #58 · Reel 05 — Gym Bag Unpack & Taste Test',
    transcriptSnippet: '“I rotate Lemon Mint post-run and Berry Blast during evening circuits—never get flavour fatigue.”',
  },
];

export interface RitualStep {
  step: string;
  title: string;
  description: string;
  detail: string;
  shotCode: string;
  photo: string;
}

export const RITUAL_STEPS: RitualStep[] = [
  {
    step: '01',
    title: 'Tear It Open',
    description: 'Clean-tear 5g race-bib sachet fits effortlessly in running pockets, gym kits, or laptop sleeves.',
    detail: '5g precision dose',
    shotCode: 'Shot #44 · Action Ritual — Tear Open Sachet',
    photo: ASSETS.lemonMint,
  },
  {
    step: '02',
    title: 'Pour into 150–200ml Cold Water',
    description: 'Empty into chilled water—adjust water volume for sharper citrus punch or a lighter daily sip.',
    detail: '150–200ml cold water',
    shotCode: 'Shot #45 · Action Ritual — Pour Powder Stream',
    photo: ASSETS.reelPour,
  },
  {
    step: '03',
    title: 'Give It a Swirl',
    description: 'Micro-milled electrolyte crystals dissolve cleanly in seconds with zero grit or residue at the bottom.',
    detail: 'Instant clean dissolve',
    shotCode: 'Shot #46 · Action Ritual — Swirl & Dissolve',
    photo: ASSETS.orange,
  },
  {
    step: '04',
    title: 'Sip. Repeat. Go Ultra.',
    description: 'Replenish sweat minerals and engage calm L-Theanine focus built for the hardest final stretch.',
    detail: 'Zero sugar crash',
    shotCode: 'Shot #47 · Action Ritual — Chilled Sip & Go',
    photo: ASSETS.runnerBanner,
  },
];

export interface ComparisonRow {
  metric: string;
  ultrapeak: string;
  sportsDrink: string;
  standardOrs: string;
  plainWater: string;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    metric: 'Added Sugar',
    ultrapeak: '0 g (Stevia & Monk Fruit)',
    sportsDrink: '20–34 g refined sugar',
    standardOrs: '13.5 g dextrose',
    plainWater: '0 g',
  },
  {
    metric: 'Balanced Electrolytes',
    ultrapeak: 'Sodium + Potassium + Magnesium',
    sportsDrink: 'Low sodium, minimal Mg',
    standardOrs: 'High salt, medical taste',
    plainWater: 'None',
  },
  {
    metric: 'Calm Focus (L-Theanine)',
    ultrapeak: '100 mg per 5g sachet',
    sportsDrink: 'None',
    standardOrs: 'None',
    plainWater: 'None',
  },
  {
    metric: 'Artificial Colours',
    ultrapeak: 'None · Clean Vegan Formula',
    sportsDrink: 'Synthetic dyes (E102/E133)',
    standardOrs: 'Often artificial flavours',
    plainWater: 'None',
  },
  {
    metric: 'Portability',
    ultrapeak: '5g pocket & race-bib sachet',
    sportsDrink: 'Bulky 500ml plastic bottle',
    standardOrs: '21g heavy pouch',
    plainWater: 'Needs refill',
  },
];

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  context: string;
  flavour: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Siddharth Rao',
    location: 'Bengaluru',
    context: 'Devils Circuit & Half Marathoner',
    flavour: 'Lemon Mint · Pack of 16',
    rating: 5,
    title: 'Finally an electrolyte without the sticky sugar film',
    body: 'I used to dread standard sports drinks past kilometre 12 in Bangalore humidity. Ultrapeak Lemon Mint dissolves clean in cold water, keeps calf cramps away, and the L-Theanine keeps my head clear through the finish.',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Priya Menon',
    location: 'Mumbai',
    context: 'Product Manager & 6 AM Runner',
    flavour: 'Peach Mango · Pack of 32',
    rating: 5,
    title: 'Replaced my 4 PM iced coffee completely',
    body: 'Bought the Variety Pack first for runs, ended up keeping Peach Mango on my work desk. Zero sugar, tastes genuinely crisp, and gives me steady afternoon focus without ruining my sleep.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Arjun Kapoor',
    location: 'Gurugram',
    context: 'Strength & Conditioning Athlete',
    flavour: 'Berry Blast · Pack of 16',
    rating: 5,
    title: 'No artificial neon colours, actually dissolves fast',
    body: 'Most Indian hydration powders clump at the bottom of a shaker or taste like cough syrup. Berry Blast mixes in two swirls and hits that sweet spot between refreshing and functional.',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Devika Sharma',
    location: 'Hyderabad',
    context: 'Badminton & Hot-Weather Commuter',
    flavour: 'Orange · Pack of 8',
    rating: 5,
    title: 'Game changer for 40°C summer sessions',
    body: 'Two hours on a humid indoor court used to leave me with an evening dehydration headache. One chilled sachet of Orange right after play fixes it within 20 minutes.',
    verified: true,
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-sugar',
    question: 'Does Ultrapeak really contain 0g sugar? How is it sweetened?',
    answer:
      'Yes—every 5g sachet contains 0g added sugar and only 9 kcal. We use natural plant-based stevia and monk fruit extracts paired with crisp fruit aromatics so you get rapid electrolyte absorption without blood-glucose spikes or syrupy mouthfeel.',
  },
  {
    id: 'faq-daily',
    question: 'Can I drink Ultrapeak daily even on non-workout days?',
    answer:
      'Absolutely. Ultrapeak is formulated for both intense training and everyday Indian heat, travel, and desk fatigue. One sachet in 150–200ml cold water daily supports fluid balance, muscle comfort, and calm mental clarity without excess sodium overload.',
  },
  {
    id: 'faq-ors',
    question: 'How is Ultrapeak different from standard medical ORS?',
    answer:
      'Medical ORS packs high dextrose (13.5g+ sugar) and heavy salt designed for clinical illness rehydration, which tastes overly salty and spikes blood sugar. Ultrapeak pairs balanced sweat minerals (Sodium, Potassium, Magnesium) with 100mg L-Theanine and B-Vitamins in a zero-sugar, genuinely crisp flavour profile built for active performance.',
  },
  {
    id: 'faq-theanine',
    question: 'Why is L-Theanine included in an electrolyte powder?',
    answer:
      'Late-stage fatigue is both physical and cognitive. Each sachet includes 100mg of L-Theanine—an amino acid naturally found in green tea—to promote calm, steady focus and reaction sharpness during the last stretch of a race, heavy set, or workday without caffeine jitters.',
  },
  {
    id: 'faq-shipping',
    question: 'What are your shipping timelines, COD availability, and FSSAI credentials?',
    answer:
      'Orders above ₹499 ship free across India (₹49 flat shipping below ₹499). Metro pincodes typically deliver in 2–3 business days and pan-India in 3–5 business days, with UPI and Cash on Delivery (COD) supported. Ultrapeak is FSSAI licensed, 100% vegan, free from artificial colours, and third-party lab tested for purity.',
  },
];

export type JournalCategory = 'All' | 'Hydration Science' | 'Endurance' | 'Recovery';

export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<JournalCategory, 'All'>;
  readTime: string;
  publishedDate: string;
  author: string;
  authorRole: string;
  photo: string;
  shotCode: string;
  recommendedFlavour: FlavourSlug;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  keyTakeaways: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: 'electrolytes-l-theanine-indian-summer-races',
    title: 'Why Electrolytes + L-Theanine Beat Plain Water in Indian Summer Races',
    excerpt:
      'At 34°C and 75% humidity, losing just 2% body weight in sweat degrades pacing and decision-making. Here is why pairing core minerals with 100mg L-Theanine transforms your final 5K.',
    category: 'Endurance',
    readTime: '5 min read',
    publishedDate: 'May 14, 2026',
    author: 'Dr. Kavita Iyer',
    authorRole: 'Sports Nutrition Advisor',
    photo: ASSETS.runnerBanner,
    shotCode: 'Shot #59 · Journal Feature — Summer Endurance Runner',
    recommendedFlavour: 'lemon-mint',
    sections: [
      {
        heading: 'The hidden cost of chugging plain water in high humidity',
        paragraphs: [
          'Indian road races and obstacle courses like Devils Circuit rarely happen in cool European marathon weather. When ambient humidity crosses 70%, evaporative cooling slows down and your sweat rate climbs sharply—often exceeding 1.2 litres per hour.',
          'Replacing heavy sweat exclusively with plain water dilutes extracellular sodium concentrations, leaving you feeling sloshy while still cramping and losing neuromuscular drive.',
        ],
      },
      {
        heading: 'Why cognitive sharpness fades before your legs do',
        paragraphs: [
          'Ask any endurance athlete where races are won or lost: it is almost always the final 20% when perceived exertion spikes. Dehydration elevates cortisol and makes every stride feel mentally heavier than your heart rate suggests.',
          'Pairing Sodium (225mg), Potassium (376mg), and Magnesium (50mg) with 100mg of L-Theanine supports alpha-wave calm alertness—helping you hold form, execute pacing discipline, and stay composed without the heart-rate spike of heavy stimulants.',
        ],
      },
      {
        heading: 'A practical race-day hydration blueprint',
        paragraphs: [
          'Pre-load one 5g sachet in 200ml cold water 45 minutes before the start horn so you cross the start line topped up. Carry a slim 5g sachet clipped beside your bib for mid-course aid stations, and follow up within 20 minutes of finishing to accelerate plasma volume recovery.',
        ],
      },
    ],
    keyTakeaways: [
      'Sweat in Indian summer humidity depletes electrolytes faster than plain water can restore fluid balance.',
      '100mg L-Theanine promotes calm, focused endurance late in races without caffeine jitters.',
      'Zero-sugar formulations prevent GI distress during high-heart-rate efforts.',
    ],
  },
  {
    slug: 'sodium-vs-sugar-what-you-lose-in-sweat',
    title: 'Sodium vs. Sugar: What Your Body Actually Loses in Sweat',
    excerpt:
      'Legacy sports drinks convinced a generation that hydration requires 30 grams of refined sugar. Breaking down real sweat chemistry and clean osmotic absorption.',
    category: 'Hydration Science',
    readTime: '4 min read',
    publishedDate: 'May 02, 2026',
    author: 'Arnav Kulkarni',
    authorRole: 'Formulation Lead, Ultrapeak Lab',
    photo: ASSETS.lemonMint,
    shotCode: 'Shot #60 · Journal Feature — Studio Electrolyte Science',
    recommendedFlavour: 'orange',
    sections: [
      {
        heading: 'What is actually inside a drop of sweat?',
        paragraphs: [
          'Human sweat is roughly 99% water, with the remaining 1% dominated by Sodium, Chloride, Potassium, and Magnesium. Notably absent from sweat? Refined table sugar.',
          'While elite multi-hour marathoners utilize targeted carbohydrates as fuel, everyday 45-to-75-minute gym sessions, 10K runs, and humid commutes do not require 6 teaspoons of liquid sugar every time you want to rehydrate.',
        ],
      },
      {
        heading: 'Decoupling hydration from sugar overload',
        paragraphs: [
          'When hydration and sugar are fused inside a single bottled sports drink, athletes end up consuming unwanted calories and experiencing mid-afternoon energy crashes just to replace sweat salts.',
          'A clean zero-sugar electrolyte sachet lets you control your fuel separately from your hydration—delivering bioavailable minerals at 9 kcal per serving.',
        ],
      },
    ],
    keyTakeaways: [
      'Sweat primarily depletes Sodium, Potassium, and Magnesium—not refined sugar.',
      'Keeping electrolytes sugar-free lets you hydrate daily without blood-glucose spikes.',
      'Balanced potassium-to-sodium ratios support cellular fluid retention and muscle firing.',
    ],
  },
  {
    slug: 'post-training-muscle-recovery-magnesium-potassium',
    title: 'Stopping Late-Session Cramps: The Potassium & Magnesium Equation',
    excerpt:
      'Why sodium alone is only half the story for heavy lifters and hybrid athletes—and how intracellular minerals protect muscle firing through your final sets.',
    category: 'Recovery',
    readTime: '4 min read',
    publishedDate: 'April 21, 2026',
    author: 'Ananya Nair',
    authorRole: 'Strength & Conditioning Coach',
    photo: ASSETS.gymFocus,
    shotCode: 'Shot #53 · Journal Feature — Strength Recovery',
    recommendedFlavour: 'berry-blast',
    sections: [
      {
        heading: 'How nerve signals trigger clean contractions',
        paragraphs: [
          'Every repetition in the gym relies on the sodium-potassium pump firing smoothly across muscle cell membranes. When intracellular Potassium and Magnesium run low after successive sweaty sessions, muscles become hyper-excitable—resulting in twitching, early fatigue, and abrupt cramping.',
          'Ultrapeak delivers 376mg Potassium alongside 50mg Magnesium in every 5g serving to help muscle fibres contract powerfully and relax cleanly between working sets.',
        ],
      },
      {
        heading: 'Building an effortless intra-workout habit',
        paragraphs: [
          'Mix one Berry Blast sachet into 200ml chilled water at the start of your warm-up and sip steadily through your working sets. Athletes consistently report steadier grip endurance and noticeably fresher legs the next morning.',
        ],
      },
    ],
    keyTakeaways: [
      'Potassium (376mg) and Magnesium (50mg) partner with Sodium to regulate muscle firing and relaxation.',
      'Consistent intra-workout sipping outperforms chugging water only after cramps start.',
      'Zero artificial dyes and clean vegan ingredients keep digestion light during heavy lifts.',
    ],
  },
  {
    slug: 'desk-hydration-calm-focus-without-third-coffee',
    title: 'The 3 PM Hydration Fix: Replacing Your Third Coffee With Clean Focus',
    excerpt:
      'Mild afternoon dehydration mimics mental exhaustion. Discover how chilled electrolytes plus L-Theanine restore clarity without wrecking your deep sleep.',
    category: 'Hydration Science',
    readTime: '3 min read',
    publishedDate: 'April 09, 2026',
    author: 'Rhea Sengupta',
    authorRole: 'Performance & Habit Editor',
    photo: ASSETS.peachMango,
    shotCode: 'Shot #51 · Journal Feature — Calm Focus Desk Hydration',
    recommendedFlavour: 'peach-mango',
    sections: [
      {
        heading: 'Why afternoon brain fog is often dehydration in disguise',
        paragraphs: [
          'Air-conditioned offices and back-to-back calls quietly drain hydration levels. Studies show even a 1.5% fluid deficit impairs working memory, mood, and reaction time—triggers most professionals mistakenly treat with a late-afternoon espresso.',
          'Caffeine taken after 2 PM lingers in your system for 8–10 hours, fragmenting sleep architecture and creating a cycle of groggy mornings.',
        ],
      },
      {
        heading: 'Calm alertness with 100mg L-Theanine',
        paragraphs: [
          'A chilled glass of Ultrapeak Peach Mango restores cellular hydration within minutes while 100mg of L-Theanine smooths stress reactivity and sustains crisp focus—letting you close out your workday sharp and still sleep deeply at night.',
        ],
      },
    ],
    keyTakeaways: [
      'Even mild air-conditioned dehydration triggers afternoon brain fog and headaches.',
      '100mg L-Theanine delivers jitter-free clarity without disrupting nighttime sleep.',
      'Zero sugar keeps afternoon energy smooth and crash-free.',
    ],
  },
];
