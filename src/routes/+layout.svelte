<script>
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';
  import Navbar from '$lib/components/navbar.svelte';
  import Footer from '$lib/components/footer.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/state';                 // <-- add
  import { locale, browserLocale, overrides } from '$lib/i18n.js';   // extend existing import
  import { scrolled } from '$lib/store.js';
  import { setContext } from 'svelte';

  let { data, children } = $props();

  setContext('products', () => data.products);
  setContext('categories', () => data.categories);
  
  overrides.set(data.translationsOverrides ?? {});

  // Hide the public chrome on the admin / login zone
  let isAdmin = $derived(
    page.url.pathname.startsWith('/login') || page.url.pathname.startsWith('/admin')
  );

  onMount(() => {
    locale.set(browserLocale());
    const unsub = locale.subscribe((code) => {
      localStorage.setItem('locale', code);
      document.documentElement.lang = code;
      document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    });
    const onScroll = () => scrolled.set(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { unsub(); window.removeEventListener('scroll', onScroll); };
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Meridian Export Co. — Export Only</title>
</svelte:head>

{#if !isAdmin}<Navbar />{/if}

{@render children()}

{#if !isAdmin}
  <Footer />
  <BackToTop />
{/if}