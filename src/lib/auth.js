import { supabase } from '$lib/supabase.js';
import { writable } from 'svelte/store';

export const user = writable(null);

// Listen for login/logout events
supabase.auth.onAuthStateChange((event, session) => {
  user.set(session?.user ?? null);
});

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function logout() {
  await supabase.auth.signOut();
}