<script>
  import { categories, socials } from '$lib/data.js';
  import { t } from '$lib/i18n.js';
</script>

<footer class="footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="logo" href="/">
        <svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M16 5.5l3.2 10.5L16 26.5l-3.2-10.5z" fill="currentColor" />
        </svg>
        <span class="logo-text">MERIDIAN<small>EXPORT CO.</small></span>
      </a>
      <p>{$t('footer.tagline')}</p>
      <span class="export-badge">{$t('footer.badge')}</span>
      <div class="socials">
        {#each socials as s (s.label)}
          <button class="social" aria-label={s.label} title={s.label}>{@html s.svg}</button>
        {/each}
      </div>
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
        <a class="footer-link" href={`/products?cat=${cat.id}`}>{$t(`cat.${cat.id}.name`)}</a>
      {/each}
    </div>
    
    <div>
      <h4>{$t('footer.contact')}</h4>
      <p class="footer-p">Harbor Business Park, Terminal 4<br />08039 Barcelona, Spain</p>
      <p class="footer-p">exports@meridianexport.co<br />+34 910 555 214</p>
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