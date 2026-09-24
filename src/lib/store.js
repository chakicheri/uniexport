// src/lib/store.js — global state shared across all components
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { products } from '$lib/data.js';

// UI state
export const scrolled = writable(false);
export const mobileOpen = writable(false);

// Contact form state
export const emptyForm = { name: '', company: '', email: '', country: '', product: '', message: '' };
export const form = writable({ ...emptyForm });
export const formSubmitted = writable(false);

// Pre-fill the contact form with a product and navigate to /contact
export function inquire(productName) {
  form.set({ ...emptyForm, product: productName });
  formSubmitted.set(false);
  goto('/contact');
}

export function submitForm() { formSubmitted.set(true); }
export function resetForm() { form.set({ ...emptyForm }); formSubmitted.set(false); }

// Helper: how many products are in a category
export const countFor = (name) => products.filter((p) => p.category === name).length;