<script>
  import { locale, locales } from '$lib/i18n.js';
</script>

<div class="lang-switcher" role="group" aria-label="Language">
  {#each locales as l (l.code)}
    <button
      class="lang-btn"
      class:active={$locale === l.code}
      onclick={() => locale.set(l.code)}
      title={l.name}
    >
      {l.label}
    </button>
  {/each}
</div>