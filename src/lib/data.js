// src/lib/data.js — all site content lives here

export const IMG = {
  hero: '/images/hero.jpg',
  about: '/images/about.jpg',
  coffee: '/images/coffee.jpg',
  coffee2: '/images/coffee2.jpg',
  cacao: '/images/cacao.jpg',
  mango: '/images/mango.jpg',
  pineapple: '/images/pineapple.jpg',
  passion: '/images/passion.jpg',
  pepper: '/images/pepper.jpg',
  vanilla: '/images/vanilla.jpg',
  chili: '/images/chili.jpg',
  shrimp: '/images/shrimp.jpg',
  tuna: '/images/tuna.jpg',
  cashew: '/images/cashew.jpg',
  quinoa: '/images/quinoa.jpg',
  oliveOil: '/images/olive-oil.jpg'
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

export const categories = [
  { name: 'Coffee & Cacao', tagline: 'High-altitude lots, cupped and graded at origin', img: IMG.coffee2 },
  { name: 'Tropical Fruits', tagline: 'Fresh and dried, cold-chain ready worldwide', img: IMG.mango },
  { name: 'Spices & Herbs', tagline: 'Steam-sterilized with full lot traceability', img: IMG.pepper },
  { name: 'Seafood', tagline: 'Sashimi-grade handling across the cold chain', img: IMG.shrimp },
  { name: 'Nuts & Grains', tagline: 'Lab-tested, packed to export specification', img: IMG.cashew },
  { name: 'Olive Oil', tagline: 'The best olive oil for your culinary needs', img: IMG.oliveOil }
];

export const products = [
  { name: 'Arabica Coffee — Grade AA', category: 'Coffee & Cacao', desc: 'High-altitude washed arabica with bright citrus acidity and a long chocolate finish.', spec: 'MOQ 19.2 t · 60 kg jute bags · FOB', img: IMG.coffee2 },
  { name: 'Fine-Flavor Cacao Beans', category: 'Coffee & Cacao', desc: 'Fermented and sun-dried criollo-trinitario beans, 7% moisture maximum.', spec: 'MOQ 12 t · 62.5 kg bags · FOB', img: IMG.cacao },
  { name: 'Golden Dried Mango', category: 'Tropical Fruits', desc: 'No-sulphur dried mango slices from fully ripe fruit, naturally sweet.', spec: 'MOQ 5 t · 10 kg cartons · CIF', img: IMG.mango },
  { name: 'Fresh MD2 Pineapple', category: 'Tropical Fruits', desc: 'Extra-sweet golden pineapples, reefer or air-freight ready, export grade.', spec: 'MOQ 1 pallet · 12-count boxes · CIF', img: IMG.pineapple },
  { name: 'Frozen Passion Fruit Pulp', category: 'Tropical Fruits', desc: 'IQF pulp from ripe fruit, Brix 14+, no additives, aseptic packed.', spec: 'MOQ 10 t · 20 kg aseptic bags · FOB', img: IMG.passion },
  { name: 'Black Peppercorns 5.5 mm', category: 'Spices & Herbs', desc: 'Bold, oil-rich peppercorns, steam-sterilized and hand-graded.', spec: 'MOQ 6 t · 25 kg PP bags · FOB', img: IMG.pepper },
  { name: 'Bourbon Vanilla Pods', category: 'Spices & Herbs', desc: 'Hand-cured gourmet vanilla, 30%+ moisture, vacuum-tin packed.', spec: 'MOQ 250 kg · Vacuum tins · CIF air', img: IMG.vanilla },
  { name: 'Sun-Dried Red Chili', category: 'Spices & Herbs', desc: 'Vibrant whole dried chilies, sun-dried, sorted and de-stemmed.', spec: 'MOQ 8 t · 10 kg cartons · FOB', img: IMG.chili },
  { name: 'Whiteleg Shrimp — HLSO', category: 'Seafood', desc: 'Farm-raised vannamei, IQF headless shell-on, sushi-grade handling.', spec: 'MOQ 10 t · 2 kg IQF blocks · CIF', img: IMG.shrimp },
  { name: 'Yellowfin Tuna Loins', category: 'Seafood', desc: 'Sashimi-grade loins, blast-frozen at −60 °C within hours of catch.', spec: 'MOQ 4 t · Vacuum packs · Air freight', img: IMG.tuna },
  { name: 'Cashew Kernels W320', category: 'Nuts & Grains', desc: 'Creamy whole white kernels, 5% moisture, aflatoxin-tested lots.', spec: 'MOQ 7 t · 11.34 kg vacuum tins · FOB', img: IMG.cashew },
  { name: 'Royal White Quinoa', category: 'Nuts & Grains', desc: 'Pre-washed low-saponin quinoa, 99.9% purity, glyphosate-free.', spec: 'MOQ 12 t · 25 kg bags · FOB', img: IMG.quinoa },
  { name: 'Olive Oil', category: 'Olive Oil', desc: 'The best olive oil for your culinary needs', spec: 'MOQ 19 t · several quantities bottles · FOB', img: IMG.oliveOil }
];

export const stats = [
  { target: 25, suffix: '+', label: 'Countries served' },
  { target: 500, suffix: '+', label: 'Containers / year' },
  { target: 12, suffix: '+', label: 'Years of expertise' },
  { target: 98, suffix: '%', label: 'On-time delivery' }
];

export const icons = {
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8L12 3z"/><path d="M9 12l2.2 2.2 4.3-4.5"/></svg>`,
  ship: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16l-1.5-4.5h19L20 16"/><path d="M7 11.5V8h3V5.5h4V8h3v3.5"/><path d="M2 19.5c1.7 1.5 3.3 1.5 5 0 1.7 1.5 3.3 1.5 5 0 1.7 1.5 3.3 1.5 5 0 1.7 1.5 3.3 1.5 5 0"/></svg>`,
  tag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1.5"/></svg>`,
  route: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="5" r="2.2"/><path d="M8.2 19h7.3a4 4 0 000-8H8.5a4 4 0 010-8h7.3"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.13.96.36 1.9.7 2.8a2 2 0 01-.45 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0122 16.9z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.1V12a10 10 0 11-5.9-9.1"/><path d="M22 4L12 14l-3-3"/></svg>`
};

export const values = [
  { icon: icons.shield, title: 'Certified Quality', text: 'Every lot is sampled, lab-tested and certified before it reaches the port. No exceptions, no shortcuts.' },
  { icon: icons.ship, title: 'Global Logistics', text: 'Reefer, dry and break-bulk — we manage bookings, customs paperwork and cargo insurance door-to-port.' },
  { icon: icons.tag, title: 'Competitive Pricing', text: 'Direct origin relationships remove middlemen, keeping our FOB and CIF prices sharp season after season.' },
  { icon: icons.route, title: 'Full Traceability', text: 'From farm registry to bill of lading, every shipment carries a transparent, auditable paper trail.' }
];

export const timeline = [
  { year: '2013', text: 'Founded as a single-origin coffee exporter. First container shipped to Rotterdam.' },
  { year: '2016', text: 'HACCP certified. Spices & herbs division opens with three partner cooperatives.' },
  { year: '2019', text: '500th container delivered. First long-term retail contracts signed across the EU.' },
  { year: '2022', text: 'Cold-chain seafood program launches with −60 °C blast-freezing capability.' },
  { year: '2026', text: 'Serving 25+ countries across four continents — export only, by design.' }
];

export const certifications = ['ISO 22000', 'HACCP', 'BRCGS', 'Fair Trade', 'Organic EU', 'Rainforest Alliance'];

export const ports = ['ROTTERDAM', 'HAMBURG', 'ANTWERP', 'FELIXSTOWE', 'NEW YORK', 'MIAMI', 'SANTOS', 'ALGECIRAS', 'DUBAI', 'SINGAPORE', 'SHANGHAI', 'YOKOHAMA'];

export const countryOptions = ['United States', 'Canada', 'Germany', 'Netherlands', 'United Kingdom', 'France', 'Spain', 'Italy', 'United Arab Emirates', 'Japan', 'South Korea', 'Australia', 'Other'];

export const socials = [
  { label: 'LinkedIn', svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>` },
  { label: 'Instagram', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>` },
  { label: 'X', svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></svg>` },
  { label: 'WhatsApp', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.6L3 21l1.9-5.4A8.5 8.5 0 1121 11.5z"/></svg>` }
];