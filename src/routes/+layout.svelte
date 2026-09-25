<script>
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';
  import Navbar from '$lib/components/navbar.svelte';
  import Footer from '$lib/components/footer.svelte';
  import { onMount } from 'svelte';
  import { locale, browserLocale } from '$lib/i18n.js';

  let { children } = $props();

  onMount(() => {
    locale.set(browserLocale());
    // Keep <html lang> and <html dir> in sync (dir=rtl for Arabic)
    const unsub = locale.subscribe((code) => {
      localStorage.setItem('locale', code);
      document.documentElement.lang = code;
      document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    });
    return unsub;
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Meridian Export Co. — Export Only</title>
</svelte:head>

<Navbar />

{@render children()}

<Footer />