// src/lib/store.js — global state shared across all components
import { writable } from 'svelte/store';
import { products } from '$lib/data.js';

// Navigation & UI state
export const view = writable('home');           // 'home' | 'products' | 'about' | 'contact'
export const scrolled = writable(false);        // navbar solid background
export const mobileOpen = writable(false);      // mobile hamburger menu
export const activeCategory = writable('All');  // products filter

// Contact form state
export const emptyForm = { name: '', company: '', email: '', country: '', product: '', message: '' };
export const form = writable({ ...emptyForm });
export const formSubmitted = writable(false);

// Navigate to a view (optionally pre-selecting a product category)
export function go(target, category = null) {
  view.set(target);
  mobileOpen.set(false);
  if (category) activeCategory.set(category);
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Pre-fill the contact form with a product and open the contact view
export function inquire(productName) {
  form.set({ ...emptyForm, product: productName });
  formSubmitted.set(false);
  go('contact');
}

export function submitForm() { formSubmitted.set(true); }
export function resetForm() { form.set({ ...emptyForm }); formSubmitted.set(false); }

// Helper: how many products are in a category
export const countFor = (name) => products.filter((p) => p.category === name).length;