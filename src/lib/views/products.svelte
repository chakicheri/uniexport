<script>
  import { page } from '$app/state'; // FIX: use state instead of stores
  import { goto } from '$app/navigation';
  import { inquire } from '$lib/store.js';
  import { t } from '$lib/i18n.js';
  import { categories, products } from '$lib/data.js';

  // FIX: removed $ before page.url
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
      {#each filtered as product (product.name)}
        <article class="product-card">
          <div class="pc-img">
            <img src={product.img} alt={product.name} loading="lazy" />
            <span class="pc-tag">{$t(`cat.${product.category}.name`)}</span>
          </div>
          <div class="pc-body">
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <div class="pc-spec">{product.spec}</div>
            <button class="btn btn-gold btn-sm" onclick={() => inquire(product.name)}>{$t('products.inquire')}</button>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>