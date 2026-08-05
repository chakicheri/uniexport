<script>
  import { slide } from 'svelte/transition';
  import { view, scrolled, mobileOpen, go } from '$lib/store.js';
  import { navLinks } from '$lib/data.js';
</script>

<header class="nav" class:solid={$scrolled || $view !== 'home' || $mobileOpen}>
  <div class="container nav-inner">
    <button class="logo" onclick={() => go('home')} aria-label="Meridian Export Co. — home">
      <svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M16 5.5l3.2 10.5L16 26.5l-3.2-10.5z" fill="currentColor" />
      </svg>
      <span class="logo-text">UNI-EXPORT<small>By TRS industrie.</small></span>
    </button>

    <nav class="nav-links" aria-label="Primary">
      {#each navLinks as link (link.id)}
        <button class="nav-link" class:active={$view === link.id} onclick={() => go(link.id)}>{link.label}</button>
      {/each}
    </nav>

    <button class="btn btn-gold btn-sm nav-cta" onclick={() => go('contact')}>Request a Quote</button>

    <button class="hamburger" class:open={$mobileOpen} onclick={() => mobileOpen.update((v) => !v)} aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>

  {#if $mobileOpen}
    <div class="mobile-panel" transition:slide={{ duration: 260 }}>
      {#each navLinks as link (link.id)}
        <button class="nav-link m-link" class:active={$view === link.id} onclick={() => go(link.id)}>{link.label}</button>
      {/each}
      <button class="btn btn-gold" onclick={() => go('contact')}>Request a Quote</button>
    </div>
  {/if}
</header>