<script>
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { go, countFor } from '$lib/store.js';
  import { IMG, categories, stats, values, ports } from '$lib/data.js';

  let counts = $state(stats.map(() => 0));

  onMount(() => {
    const start = performance.now();
    const duration = 1700;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      counts = stats.map((s) => Math.round(s.target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
</script>

<section class="hero">
  <div class="hero-bg" style="background-image:url('{IMG.hero}')"></div>
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <span class="eyebrow" in:fly={{ y: 16, duration: 600 }}>◆ EXPORT ONLY · EST. 2013</span>
    <h1 in:fly={{ y: 22, delay: 100, duration: 650 }}>The world's finest harvests, <em>shipped with certainty.</em></h1>
    <p in:fly={{ y: 22, delay: 200, duration: 650 }}>Meridian Export Co. sources, certifies and delivers premium agricultural goods to 25+ countries. We export — and only export — so every container meets the highest international standard.</p>
    <div class="hero-ctas" in:fly={{ y: 22, delay: 300, duration: 650 }}>
      <button class="btn btn-gold" onclick={() => go('products')}>Explore Products →</button>
      <button class="btn btn-ghost" onclick={() => go('contact')}>Contact Us</button>
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
        <div class="stat-label">{stat.label}</div>
      </div>
    {/each}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow alt">OUR DIVISIONS</span>
      <h2>What we export</h2>
      <p>Five specialist divisions, one uncompromising export standard. Select a category to open the current catalog.</p>
    </div>
    <div class="cat-grid">
      {#each categories as cat (cat.name)}
        <button class="cat-card" onclick={() => go('products', cat.name)}>
          <img src={cat.img} alt={cat.name} loading="lazy" />
          <div class="cat-info">
            <h3>{cat.name}</h3>
            <p>{cat.tagline}</p>
            <span class="cat-count">{countFor(cat.name)} products →</span>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>

<section class="section why">
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow">WHY MERIDIAN</span>
      <h2>Built for export. Focused by choice.</h2>
      <p>Four reasons importers on four continents renew with us season after season.</p>
    </div>
    <div class="feat-grid">
      {#each values as item (item.title)}
        <div class="feat-card dark">
          <div class="feat-icon">{@html item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta">
      <div>
        <h2>Ready to move your next container?</h2>
        <p>Tell us the product, volume and destination port — our export desk replies within 24 business hours.</p>
      </div>
      <button class="btn btn-gold" onclick={() => go('contact')}>Request a Quote →</button>
    </div>
  </div>
</section>