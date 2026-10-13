<script>
  import { getContext } from 'svelte';
  import { socials, L } from '$lib/data.js';
  import { t, locale } from '$lib/i18n.js';
  import LangSwitcher from '$lib/components/lang-switcher.svelte';

  const getCategories = getContext('categories');
  const categories = $derived(getCategories());
</script>

<footer class="footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="logo" href="/">
        <svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M16 5.5l3.2 10.5L16 26.5l-3.2-10.5z" fill="currentColor" />
        </svg>
        <span class="logo-text">{$t('brand.name')}<small>{$t('brand.sub')}</small></span>
      </a>
      <p>{$t('footer.tagline')}</p>
      <span class="export-badge">{$t('footer.badge')}</span>
      <div class="socials">
        {#each socials as s (s.label)}
          <button class="social" aria-label={s.label} title={s.label}>{@html s.svg}</button>
        {/each}
      </div>
      <LangSwitcher />
    </div>

    <div>
      <h4>{$t('footer.company')}</h4>
      <a class="footer-link" href="/">{$t('footer.home')}</a>
      <a class="footer-link" href="/about">{$t('footer.about')}</a>
      <a class="footer-link" href="/contact">{$t('footer.contactLink')}</a>
      <a class="footer-link" href="/contact">{$t('footer.quote')}</a>
    </div>

    <div>
      <h4>{$t('footer.categories')}</h4>
      {#each categories as cat (cat.id)}
        <a class="footer-link" href={`/products?cat=${cat.id}`}>{L(cat.name, $locale)}</a>
      {/each}
    </div>

    <div>
      <h4>{$t('footer.contact')}</h4>
      <p class="footer-p">{$t('info.address1')}
        {#if $t('info.address2')}<br />{$t('info.address2')}{/if}</p>
      <p class="footer-p">{$t('info.email1')}<br />{$t('info.phone1')}</p>
      <p class="footer-p">{$t('footer.hours')}</p>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <span>{$t('footer.rights')}</span>
      <span>{$t('footer.incoterms')}</span>
    </div>
  </div>
</footer>