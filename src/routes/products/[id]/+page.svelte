<script>
  import { page } from '$app/state';
  import { L } from '$lib/data.js';
  import { t, locale } from '$lib/i18n.js';
  import { inquire } from '$lib/store.js';
  import { getContext } from 'svelte';

  const products = getContext('products');
  let product = $derived(products.find((p) => p.id === page.params.id));

  // Build the spec rows — missing fields are simply hidden
  let specs = $derived.by(() => {
    if (!product) return [];
    const rows = [];
    if (product.availability) rows.push({ key: 'product.availability', value: L(product.availability, $locale) });
    if (product.season) rows.push({ key: 'product.season', value: L(product.season, $locale) });
    if (product.origin) rows.push({ key: 'product.origin', value: L(product.origin, $locale) });
    if (product.packaging) rows.push({ key: 'product.packaging', value: L(product.packaging, $locale) });
    if (product.shelfLife) rows.push({ key: 'product.shelfLife', value: L(product.shelfLife, $locale) });
    if (product.hsCode) rows.push({ key: 'product.hsCode', value: product.hsCode });
    return rows;
  });
</script>

<svelte:head>
  {#if product}
    <title>{L(product.name, $locale)} — Meridian Export Co.</title>
    <meta name="description" content={L(product.desc, $locale)} />
  {/if}
</svelte:head>

{#if product}
  <section class="page-head">
    <div class="container">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/products">{$t('nav.products')}</a>
        <span>/</span>
        <span>{L(product.name, $locale)}</span>
      </nav>
      <h1>{L(product.name, $locale)}</h1>
      <p>{$t(`cat.${product.category}.name`)}</p>
    </div>
  </section>

  <section class="section">
    <div class="container pd-grid">
      <div class="pd-img">
        <img src={product.img} alt={L(product.name, $locale)} />
        <span class="pc-tag">{$t(`cat.${product.category}.name`)}</span>
      </div>

      <div class="pd-info">
        <p class="pd-desc">{L(product.desc, $locale)}</p>
        {#if product.details}
          <p class="pd-desc">{L(product.details, $locale)}</p>
        {/if}

        {#if specs.length}
          <div class="pd-specs">
            {#each specs as row (row.key)}
              <div class="pd-spec">
                <h4>{$t(row.key)}</h4>
                <p>{row.value}</p>
              </div>
            {/each}
          </div>
        {/if}

        <div class="pd-export">
          <div class="pc-spec">{product.spec}</div>
        </div>

        <div class="pd-ctas">
          <button class="btn btn-gold" onclick={() => inquire(product.id)}>{$t('product.inquireCta')}</button>
          <a class="btn btn-outline" href="/products">{$t('product.back')}</a>
        </div>
      </div>
    </div>
  </section>
{:else}
  <section class="section" style="padding-top: 10rem; text-align: center;">
    <div class="container">
      <h2>{$t('product.notFound')}</h2>
      <a class="btn btn-gold" href="/products" style="margin-top: 1.5rem;">{$t('product.back')}</a>
    </div>
  </section>
{/if}