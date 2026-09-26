<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  let visible = $state(false);
  
  onMount(() => {
    const onScroll = () => {
      visible = window.scrollY > 400;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

{#if visible}
  <button
    class="back-to-top"
    onclick={scrollToTop}
    aria-label="Back to top"
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }}
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  </button>
{/if}