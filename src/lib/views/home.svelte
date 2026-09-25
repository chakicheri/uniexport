<script>
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { countFor } from '$lib/store.js';
  import { t } from '$lib/i18n.js';
  import { IMG, categories, stats, values, ports } from '$lib/data.js';

  let counts = $state(stats.map(() => 0));

  onMount(() => {
    const start = performance.now();
    const duration = 1700;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      counts = stats.map((s) => Math.round(s.target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
</script>

<section class="hero">
  <div class="hero-bg" style="background-image:url('{IMG.hero}')"></div>
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <span class="eyebrow" in:fly={{ y: 16, duration: 600 }}>{$t('home.eyebrow')}</span>
    <h1 in:fly={{ y: 22, delay: 100, duration: 650 }}>{$t('home.title1')} <em>{$t('home.titleEm')}</em></h1>
    <p in:fly={{ y: 22, delay: 200, duration: 650 }}>{$t('home.text')}</p>
    <div class="hero-ctas" in:fly={{ y: 22, delay: 300, duration: 650 }}>
      <a class="btn btn-gold" href="/products">{$t('home.ctaProducts')}</a>
      <a class="btn btn-ghost" href="/contact">{$t('home.ctaContact')}</a>
    </div>
  </div>
</section>

<div class="ticker" aria-hidden="true">
  <div class="ticker-track">
    {#each [0, 1] as half}
      <div class="ticker-group">
        {#each ports as port}<span>{port}</span>{/each}
      </div>
    {/each}
  </div>
</div>

<section class="stats">
  <div class="container stats-grid">
    {#each stats as stat, i}
      <div class="stat">
        <div class="stat-num">{counts[i]}<span>{stat.suffix}</span></div>
        <div class="stat-label">{$t(stat.labelKey)}</div>
      </div>
    {/each}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow alt">{$t('home.divEyebrow')}</span>
      <h2>{$t('home.divTitle')}</h2>
      <p>{$t('home.divText')}</p>
    </div>
    <div class="cat-grid">
      {#each categories as cat (cat.id)}
        <a class="cat-card" href={`/products?cat=${cat.id}`}>
          <img src={cat.img} alt={$t(`cat.${cat.id}.name`)} loading="lazy" />
          <div class="cat-info">
            <h3>{$t(`cat.${cat.id}.name`)}</h3>
            <p>{$t(`cat.${cat.id}.tagline`)}</p>
            <span class="cat-count">{countFor(cat.id)} {$t('home.productsWord')}</span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<section class="section why">
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow">{$t('home.whyEyebrow')}</span>
      <h2>{$t('home.whyTitle')}</h2>
      <p>{$t('home.whyText')}</p>
    </div>
    <div class="feat-grid">
      {#each values as item (item.key)}
        <div class="feat-card dark">
          <div class="feat-icon">{@html item.icon}</div>
          <h3>{$t(`val.${item.key}.title`)}</h3>
          <p>{$t(`val.${item.key}.text`)}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta">
      <div>
        <h2>{$t('home.ctaTitle')}</h2>
        <p>{$t('home.ctaText')}</p>
      </div>
      <a class="btn btn-gold" href="/contact">{$t('home.ctaBtn')}</a>
    </div>
  </div>
</section>