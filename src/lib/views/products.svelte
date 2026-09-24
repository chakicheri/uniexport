<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { inquire } from '$lib/store.js';
  import { categories, products } from '$lib/data.js';

  // Category is read from the URL: /products?cat=Seafood
  let activeCategory = $derived($page.url.searchParams.get('cat') ?? 'All');
  let catNames = $derived(['All', ...categories.map((c) => c.name)]);
  let filtered = $derived(
    activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory)
  );

  function selectCategory(cat) {
    const url = cat === 'All' ? '/products' : `/products?cat=${encodeURIComponent(cat)}`;
    goto(url, { replaceState: true });
  }
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
    <div class="filter-bar" role="tablist">
      {#each catNames as cat}
        <button class="chip" class:active={activeCategory === cat} onclick={() => selectCategory(cat)}>
          {cat}
        </button>
      {/each}
    </div>

    <p class="result-count">
      {filtered.length} product{filtered.length === 1 ? '' : 's'}
      {activeCategory === 'All' ? 'across all divisions' : `in ${activeCategory}`}
    </p>

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
            <button class="btn btn-gold btn-sm" onclick={() => inquire(product.name)}>Inquire</button>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>