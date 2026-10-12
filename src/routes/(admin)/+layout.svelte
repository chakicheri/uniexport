<script>
  import { supabase } from '$lib/supabase.js';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  let { children } = $props();   // <-- THIS was missing. The whole crash.

  let loading = $state(true);
  let user = $state(null);

  $effect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (cancelled) return;
        user = session?.user ?? null;
        loading = false;
        if (!user && !page.url.pathname.endsWith('/login')) goto('/login');
      } catch (e) {
        console.error('Auth check failed:', e);
        if (!cancelled) { loading = false; user = null; }
      }
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_ev, session) => {
      if (cancelled) return;
      user = session?.user ?? null;
      loading = false;
      if (!user && !page.url.pathname.endsWith('/login')) goto('/login');
    });

    return () => { cancelled = true; subscription.unsubscribe(); };
  });
</script>

{#if loading}
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--navy);color:#fff;">
    Securing connection…
  </div>
{:else if user || page.url.pathname.endsWith('/login')}
  {@render children()}
{/if}