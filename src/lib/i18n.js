// src/lib/i18n.js — tiny translation engine (no dependencies)
import { writable, derived } from 'svelte/store';

export const locales = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ar', label: 'ع', name: 'العربية' }
];

// Pick saved language, or browser language, or English
export function browserLocale() {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('locale');
  if (saved && locales.some((l) => l.code === saved)) return saved;
  const nav = navigator.language.slice(0, 2);
  return locales.some((l) => l.code === nav) ? nav : 'en';
}

export const locale = writable('en');

export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.quote': 'Request a Quote',
    'footer.tagline': 'Premium export trading company delivering certified agricultural goods from origin to ports worldwide since 2013.',
    'footer.badge': '◆ Export only — we do not import',
    'footer.company': 'Company',
    'footer.categories': 'Categories',
    'footer.contact': 'Contact',
    'footer.home': 'Home',
    'footer.about': 'About us',
    'footer.contactLink': 'Contact',
    'footer.quote': 'Request a quote',
    'footer.hours': 'Mon – Sat · 08:00 – 18:00 CET',
    'footer.rights': '© 2026 Meridian Export Co. All rights reserved.',
    'footer.incoterms': 'Incoterms 2020 · FOB / CIF / CFR · Export only'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.quote': 'Demander un devis',
    'footer.tagline': 'Société de négoce export livrant des produits agricoles certifiés, de leur origine vers les ports du monde entier depuis 2013.',
    'footer.badge': '◆ Export uniquement — nous n’importons pas',
    'footer.company': 'Société',
    'footer.categories': 'Catégories',
    'footer.contact': 'Contact',
    'footer.home': 'Accueil',
    'footer.about': 'À propos',
    'footer.contactLink': 'Contact',
    'footer.quote': 'Demander un devis',
    'footer.hours': 'Lun – Sam · 08h00 – 18h00 CET',
    'footer.rights': '© 2026 Meridian Export Co. Tous droits réservés.',
    'footer.incoterms': 'Incoterms 2020 · FOB / CIF / CFR · Export uniquement'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.quote': 'طلب عرض سعر',
    'footer.tagline': 'شركة تصدير متخصصة في تسليم المنتجات الزراعية المعتمدة من منشئها إلى موانئ العالم منذ 2013.',
    'footer.badge': '◆ تصدير فقط — لا نستورد',
    'footer.company': 'الشركة',
    'footer.categories': 'الفئات',
    'footer.contact': 'اتصل بنا',
    'footer.home': 'الرئيسية',
    'footer.about': 'من نحن',
    'footer.contactLink': 'اتصل بنا',
    'footer.quote': 'طلب عرض سعر',
    'footer.hours': 'الاثنين – السبت · 08:00 – 18:00 CET',
    'footer.rights': '© 2026 Meridian Export Co. جميع الحقوق محفوظة.',
    'footer.incoterms': 'إنكوترمز 2020 · FOB / CIF / CFR · تصدير فقط'
  }
};

// $t('nav.home') → the translated string, with English fallback
export const t = derived(locale, ($locale) => (key) => translations[$locale][key] ?? translations.en[key] ?? key);