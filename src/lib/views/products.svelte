<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { inquire } from '$lib/store.js';
  import { t, locale } from '$lib/i18n.js';
  import { categories, products, L } from '$lib/data.js';

  let activeCategory = $derived(page.url.searchParams.get('cat') ?? 'All');
  let filtered = $derived(
    activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory)
  );

  function selectCategory(id) {
    goto(id === 'All' ? '/products' : `/products?cat=${id}`, { replaceState: true });
  }
</script>

<section class="page-head">
  <div class="container">
    <span class="eyebrow">{$t('products.eyebrow')}</span>
    <h1>{$t('products.title')}</h1>
    <p>{$t('products.text')}</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="filter-bar" role="tablist">
      <button class="chip" class:active={activeCategory === 'All'} onclick={() => selectCategory('All')}>
        {$t('products.all')}
      </button>
      {#each categories as cat (cat.id)}
        <button class="chip" class:active={activeCategory === cat.id} onclick={() => selectCategory(cat.id)}>
          {$t(`cat.${cat.id}.name`)}
        </button>
      {/each}
    </div>

    <p class="result-count">
      {#if activeCategory === 'All'}
        {filtered.length} {$t('products.countAll')}
      {:else}
        {filtered.length} {$t('products.countIn')} {$t(`cat.${activeCategory}.name`)}
      {/if}
    </p>

    <div class="products-grid">
      {#each filtered as product (product.id)}
        <article class="product-card">
          <div class="pc-img">
            <img src={product.img} alt={L(product.name, $locale)} loading="lazy" />
            <span class="pc-tag">{$t(`cat.${product.category}.name`)}</span>
          </div>
          <div class="pc-body">
            <h3>{L(product.name, $locale)}</h3>
            <p>{L(product.desc, $locale)}</p>
            <div class="pc-spec">{product.spec}</div>
            <button class="btn btn-gold btn-sm" onclick={() => inquire(product.id)}>{$t('products.inquire')}</button>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>