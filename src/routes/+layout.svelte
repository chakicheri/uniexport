<script>
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';
  import Navbar from '$lib/components/navbar.svelte';
  import Footer from '$lib/components/footer.svelte';
  import { onMount } from 'svelte';
  import { locale, browserLocale } from '$lib/i18n.js';
  import { scrolled } from '$lib/store.js';

  let { children } = $props();

  onMount(() => {
    locale.set(browserLocale());
    const unsub = locale.subscribe((code) => {
      localStorage.setItem('locale', code);
      document.documentElement.lang = code;
      document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    });
    // Solid navbar on scroll (restored)
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