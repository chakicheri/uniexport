<script>
  import { fly } from 'svelte/transition';
  import { form as formData, formSubmitted, submitForm, resetForm } from '$lib/store.js';
  import { countryRegions, icons, L } from '$lib/data.js';
  import { t, locale } from '$lib/i18n.js';
  import { getContext } from 'svelte';

  const getProducts = getContext('products');
  const products = $derived(getProducts());

  const getCategories = getContext('categories');
  const categories = $derived(getCategories());

  let loading = $state(false);
  let errorMsg = $state('');

  async function handleSubmit(event) {
    event.preventDefault();
    loading = true;
    errorMsg = '';

    // Find the selected product name for the email subject line
    const selectedProduct = products.find(p => p.id === $formData.product);
    const productName = selectedProduct ? L(selectedProduct.name, 'en') : 'General Inquiry';

    const payload = {
      access_key: 'b84f8406-bcaf-4561-a0db-f4d3eed31fdf', // <--- PASTE YOUR KEY HERE
      name: $formData.name,
      company: $formData.company,
      email: $formData.email,
      country: $formData.country,
      product_interest: productName,
      message: $formData.message,
      subject: `New Export Inquiry: ${productName} from ${$formData.company || $formData.name}`,
      from_name: 'UniExport B2B Portal'
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      
      if (json.success) {
        submitForm(); // Triggers your beautiful success UI card
      } else {
        errorMsg = json.message || 'Failed to send. Please try again.';
      }
    } catch (err) {
      errorMsg = 'Network error. Please check your connection.';
    } finally {
      loading = false;
    }
  }
</script>
  

<!-- Page header -->
<section class="page-head">
  <div class="container">
    <span class="eyebrow">{$t('contact.eyebrow')}</span>
    <h1>{$t('contact.title')}</h1>
    <p>{$t('contact.text')}</p>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    <!-- Success state OR form -->
    {#if $formSubmitted}
      <div class="success-card" in:fly={{ y: 14, duration: 400 }}>
        <div class="success-icon">{@html icons.check}</div>
        <h3>{$t('form.successTitle')}</h3>
        <p>
          {$t('form.thanks')}{$formData.name ? `, ${$formData.name}` : ''}. {$t('form.successBody')}
          <strong>{$formData.email}</strong> {$t('form.successTail')}
        </p>
        <button type="submit" class="btn btn-gold" disabled={loading}>
          {#if loading}
            Sending...
          {:else}
            {$t('form.submit')}
          {/if}
        </button>

        {#if errorMsg}
          <p style="color: #d93025; margin-top: 1rem; font-weight: 600;">{errorMsg}</p>
        {/if}
      </div>
    {:else}
      <form class="contact-form" onsubmit={handleSubmit}>
        <div class="f-row">
          <div class="f-group">
            <label for="f-name">{$t('form.name')}</label>
            <input id="f-name" type="text" required placeholder="Jane Doe" bind:value={$formData.name} />
          </div>
          <div class="f-group">
            <label for="f-company">{$t('form.company')}</label>
            <input id="f-company" type="text" placeholder="Acme Imports GmbH" bind:value={$formData.company} />
          </div>
        </div>

        <div class="f-row">
          <div class="f-group">
            <label for="f-email">{$t('form.email')}</label>
            <input id="f-email" type="email" required placeholder="jane@acme.com" bind:value={$formData.email} />
          </div>
          <div class="f-group">
            <label for="f-country">{$t('form.country')}</label>
            <select id="f-country" required bind:value={$formData.country}>
              <option value="" disabled>{$t('form.selectCountry')}</option>
              {#each countryRegions as region (region.id)}
                <optgroup label={$t(`region.${region.id}`)}>
                  {#each region.countries as c (c.id)}
                    <option value={c.id}>{L(c.name, $locale)}</option>
                  {/each}
                </optgroup>
              {/each}
            </select>
          </div>
        </div>

        <div class="f-group">
          <label for="f-product">{$t('form.product')}</label>
          <select id="f-product" bind:value={$formData.product}>
            <option value="">{$t('form.general')}</option>
            {#each products as p (p.id)}
              <option value={p.id}>{L(p.name, $locale)}</option>
            {/each}
          </select>
        </div>

        <div class="f-group">
          <label for="f-message">{$t('form.message')}</label>
          <textarea
            id="f-message"
            required
            placeholder={$t('form.msgPlaceholder')}
            bind:value={$formData.message}
          ></textarea>
        </div>

        <button type="submit" class="btn btn-gold">{$t('form.submit')}</button>
      </form>
    {/if}

    <!-- Info panel -->
    <aside class="info-panel">
      <div class="info-item">
        <div class="info-icon">{@html icons.mail}</div>
        <div>
          <h4>{$t('info.desk')}</h4>
          <p>{$t('info.email1')}
            {#if $t('info.email2')}<br />{$t('info.email2')}{/if}</p>
        </div>
      </div>

      <div class="info-item">
        <div class="info-icon">{@html icons.phone}</div>
        <div>
          <h4>{$t('info.phone')}</h4>
          <p>{$t('info.phone1')}
            {#if $t('info.phone2')}<br />{$t('info.phone2')}{/if}</p>
        </div>
      </div>

      <div class="info-item">
        <div class="info-icon">{@html icons.pin}</div>
        <div>
          <h4>{$t('info.office')}</h4>
          <p>{$t('info.address1')}
            {#if $t('info.address2')}<br />{$t('info.address2')}{/if}</p>
        </div>
      </div>

      <div class="info-item">
        <div class="info-icon">{@html icons.clock}</div>
        <div>
          <h4>{$t('info.hours')}</h4>
          <p>{$t('info.hours1')}<br />{$t('info.hours2')}</p>
        </div>
      </div>

      <span class="export-badge">{$t('info.badge')}</span>
    </aside>
  </div>
</section>