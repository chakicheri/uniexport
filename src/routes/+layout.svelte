<script>
  import { setContext } from 'svelte'; // ADD THIS
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';
  import Navbar from '$lib/components/navbar.svelte';
  import Footer from '$lib/components/footer.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';
  import { onMount } from 'svelte';
  import { locale, browserLocale } from '$lib/i18n.js';
  import { scrolled } from '$lib/store.js';

  let { data, children } = $props(); // data comes from +layout.server.js
  
  // Share the Supabase products with ALL child components
  // Share a LIVE getter instead of a frozen snapshot
  setContext('products', () => data.products);

  onMount(() => {
    locale.set(browserLocale());
    const unsub = locale.subscribe((code) => {
      localStorage.setItem('locale', code);
      document.documentElement.lang = code;
      document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    });
    const onScroll = () => scrolled.set(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener('scroll', onScroll);
    };
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Meridian Export Co. — Export Only</title>
</svelte:head>

<Navbar />
{@render children()}
<Footer />
<BackToTop />