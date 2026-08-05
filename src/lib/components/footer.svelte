<script>
  import { go } from '$lib/store.js';
  import { categories, socials } from '$lib/data.js';
</script>

<footer class="footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <button class="logo" onclick={() => go('home')}>
        <svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M16 5.5l3.2 10.5L16 26.5l-3.2-10.5z" fill="currentColor" />
        </svg>
        <span class="logo-text">MERIDIAN<small>EXPORT CO.</small></span>
      </button>
      <p>Premium export trading company delivering certified agricultural goods from origin to ports worldwide since 2013.</p>
      <span class="export-badge">◆ Export only — we do not import</span>
      <div class="socials">
        {#each socials as s (s.label)}
          <button class="social" aria-label={s.label} title={s.label}>{@html s.svg}</button>
        {/each}
      </div>
    </div>

    <div>
      <h4>Company</h4>
      <button class="footer-link" onclick={() => go('home')}>Home</button>
      <button class="footer-link" onclick={() => go('about')}>About us</button>
      <button class="footer-link" onclick={() => go('contact')}>Contact</button>
      <button class="footer-link" onclick={() => go('contact')}>Request a quote</button>
    </div>

    <div>
      <h4>Categories</h4>
      {#each categories as cat (cat.name)}
        <button class="footer-link" onclick={() => go('products', cat.name)}>{cat.name}</button>
      {/each}
    </div>

    <div>
      <h4>Contact</h4>
      <p class="footer-p">Harbor Business Park, Terminal 4<br />08039 Barcelona, Spain</p>
      <p class="footer-p">exports@meridianexport.co<br />+34 910 555 214</p>
      <p class="footer-p">Mon – Sat · 08:00 – 18:00 CET</p>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <span>© 2026 Meridian Export Co. All rights reserved.</span>
      <span>Incoterms 2020 · FOB / CIF / CFR · Export only</span>
    </div>
  </div>
</footer>