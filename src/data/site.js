/*
  Site-wide content. Everything here is editable in one place.
  NOTE: MAYURA Department Store is a fictional brand. Figures, reviews, offers
  and contact details are demonstration content, not verified business claims.
*/

export const brand = {
  name: 'MAYURA',
  descriptor: 'Department Store',
  tagline: 'Everything your family needs, under one roof.',
  founded: 1986,
  description:
    'MAYURA is a family-run department store in Coimbatore. Six floors of sarees, menswear, kids, jewellery, home and electronics — with the same shop-floor service we started with in 1986.',
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'departments', label: 'Departments' },
  { id: 'picks', label: 'New In' },
  { id: 'offers', label: 'Offers' },
  { id: 'floors', label: 'Store Guide' },
  { id: 'visit', label: 'Visit Us' },
]

/* Announcement bar messages — rotate automatically. */
export const announcements = [
  'Wedding Season Edit is here · Up to 40% off on silk sarees till 30 November',
  'Free home delivery within Coimbatore on orders above ₹2,999',
  'MAYURA Circle members earn 5% back on every purchase',
]

/* Demo figures — edit freely. */
export const stats = [
  { value: 38, suffix: '', label: 'Years in Coimbatore' },
  { value: 6, suffix: '', label: 'Floors to explore' },
  { value: 120, suffix: '+', label: 'Brands under one roof' },
  { value: 3, suffix: '', label: 'Stores across the city' },
]

export const services = [
  {
    title: 'In-house tailoring',
    detail: 'Blouse stitching and alterations by our own tailors. Ready in 48 hours, express in 24.',
    icon: 'Scissors',
  },
  {
    title: 'Home delivery',
    detail: 'Free delivery within Coimbatore above ₹2,999. Same-day for orders placed before noon.',
    icon: 'Truck',
  },
  {
    title: 'Gift registry',
    detail: 'Weddings, housewarmings and baby showers. Guests choose from your list, we deliver.',
    icon: 'Gift',
  },
  {
    title: 'Easy exchange',
    detail: '15-day exchange on apparel and home. Jewellery buy-back at transparent day rates.',
    icon: 'RefreshCcw',
  },
]

export const loyalty = {
  name: 'MAYURA Circle',
  perks: [
    '5% back as Circle points on every bill',
    'Early access to wedding and festive edits',
    'Free blouse stitching on silk sarees',
    'Birthday month: double points',
  ],
}

/* Fictional demo reviews. */
export const reviews = [
  {
    quote:
      'We bought everything for my daughter’s wedding here in two Saturdays — sarees, the groom’s kurta, the jewellery and even the fridge for the new house. One bill, one parking spot.',
    name: 'Revathi Krishnan',
    detail: 'Shopping for a wedding · Saibaba Colony',
    rating: 5,
  },
  {
    quote:
      'The tailoring counter is the reason I keep coming back. The blouse was ready before the saree was even packed.',
    name: 'Nithya Rajendran',
    detail: 'Regular customer since 2014 · R.S. Puram',
    rating: 5,
  },
  {
    quote:
      'Staff on the electronics floor actually knew the products. No pushing the costliest model — they talked me down to the one I needed.',
    name: 'Arjun Balasubramaniam',
    detail: 'Bought a washing machine · Peelamedu',
    rating: 4,
  },
]

/* Placeholder contact details for the demo. */
export const contact = {
  phoneDisplay: '+91 422 230 0186',
  phoneHref: '+914222300186',
  whatsappNumber: '919000000000',
  whatsappMessage: 'Hello MAYURA, I would like to know about your current offers.',
  email: 'hello@mayurastores.example',
  hours: 'Open every day, 9.30 am – 9.30 pm',
}

/* Three demo store locations. */
export const stores = [
  {
    id: 'cross-cut',
    name: 'Cross-Cut Road',
    tag: 'Flagship · 6 floors',
    address: ['112 Cross-Cut Road, Gandhipuram', 'Coimbatore 641 012'],
    hours: '9.30 am – 9.30 pm',
    parking: 'Basement parking for 180 cars',
    phone: '+91 422 230 0186',
  },
  {
    id: 'rs-puram',
    name: 'R.S. Puram',
    tag: 'Sarees & jewellery',
    address: ['27 D.B. Road, R.S. Puram', 'Coimbatore 641 002'],
    hours: '10 am – 9 pm',
    parking: 'Valet parking at the entrance',
    phone: '+91 422 230 0187',
  },
  {
    id: 'saravanampatti',
    name: 'Saravanampatti',
    tag: 'Home & electronics',
    address: ['Sathy Road, Saravanampatti', 'Coimbatore 641 035'],
    hours: '10 am – 9.30 pm',
    parking: 'Open parking, 60 cars',
    phone: '+91 422 230 0188',
  },
]

/* Seasonal campaign shown in the Offers section. */
export const campaign = {
  eyebrow: 'The Wedding Season Edit',
  title: 'Up to 40% off silk sarees, 20% off gold making charges.',
  text: 'Our biggest edit of the year. Kanchipuram, Banarasi and Mysore silks on the second floor, with free blouse stitching for every silk saree bought this month.',
  endsAt: '2026-11-30T21:30:00+05:30',
  coupons: [
    { code: 'SILK40', detail: 'Up to 40% off on silk sarees' },
    { code: 'GOLD20', detail: '20% off making charges on gold' },
    { code: 'HOME15', detail: '15% off home & kitchen above ₹9,999' },
  ],
}

/* Unsplash photo IDs used outside the product catalogue. */
export const photos = {
  hero: '1610030469983-98e550d6193c',
  heroSmall: '1515562141207-7a88fb7ce338',
  offers: '1532453288672-3a27e9be9efd',
  story: '1441984904996-e0b6ba687e04',
  storyDetail: '1472851294608-062f824d29cc',
  visit: '1567401893414-76b7b1e5a7a5',
}
