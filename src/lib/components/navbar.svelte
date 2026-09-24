<script>
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { scrolled, mobileOpen } from '$lib/store.js';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  // Close the mobile menu automatically after any navigation
  afterNavigate(() => mobileOpen.set(false));
</script>

<header class="nav" class:solid={$scrolled || $page.url.pathname !== '/' || $mobileOpen}>
  <div class="container nav-inner">
    <a class="logo" href="/" aria-label="Meridian Export Co. — home">
      <svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M16 5.5l3.2 10.5L16 26.5l-3.2-10.5z" fill="currentColor" />
      </svg>
      <span class="logo-text">MERIDIAN<small>EXPORT CO.</small></span>
    </a>

    <nav class="nav-links" aria-label="Primary">
      {#each navLinks as link (link.href)}
        <a class="nav-link" class:active={$page.url.pathname === link.href} href={link.href}>{link.label}</a>
      {/each}
    </nav>

    <a class="btn btn-gold btn-sm nav-cta" href="/contact">Request a Quote</a>

    <button class="hamburger" class:open={$mobileOpen} onclick={() => mobileOpen.update((v) => !v)} aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>

  {#if $mobileOpen}
    <div class="mobile-panel" transition:slide={{ duration: 260 }}>
      {#each navLinks as link (link.href)}
        <a class="nav-link m-link" class:active={$page.url.pathname === link.href} href={link.href}>{link.label}</a>
      {/each}
      <a class="btn btn-gold" href="/contact">Request a Quote</a>
    </div>
  {/if}
</header>