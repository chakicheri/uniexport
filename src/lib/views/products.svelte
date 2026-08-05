<script>
  import { activeCategory, inquire } from '$lib/store.js';
  import { categories, products } from '$lib/data.js';

  // Svelte 5 Runes: $derived automatically recalculates when $activeCategory changes
  let catNames = $derived(['All', ...categories.map((c) => c.name)]);
  let filtered = $derived(
    $activeCategory === 'All' ? products : products.filter((p) => p.category === $activeCategory)
  );
</script>

<section class="page-head">
  <div class="container">
    <span class="eyebrow">OUR CATALOG</span>
    <h1>Products by Category</h1>
    <p>Export-spec goods with transparent MOQs, packaging and incoterms. Filter by division, then send an inquiry in one click.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <!-- Filter Chips -->
    <div class="filter-bar" role="tablist">
      {#each catNames as cat}
        <button
          class="chip"
          class:active={$activeCategory === cat}
          onclick={() => activeCategory.set(cat)}
        >
          {cat}
        </button>
      {/each}
    </div>

    <!-- Result Count -->
    <p class="result-count">
      {filtered.length} product{filtered.length === 1 ? '' : 's'}
      {$activeCategory === 'All' ? 'across all divisions' : `in ${$activeCategory}`}
    </p>

    <!-- Product Grid -->
    <div class="products-grid">
      {#each filtered as product (product.name)}
        <article class="product-card">
          <div class="pc-img">
            <img src={product.img} alt={product.name} loading="lazy" />
            <span class="pc-tag">{product.category}</span>
          </div>
          <div class="pc-body">
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <div class="pc-spec">{product.spec}</div>
            <button class="btn btn-gold btn-sm" onclick={() => inquire(product.name)}>
              Inquire
            </button>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>