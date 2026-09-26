<script>
  import { fly } from 'svelte/transition';
  import { form as formData, formSubmitted, submitForm, resetForm } from '$lib/store.js';
  import { countryRegions, products, icons, L } from '$lib/data.js';  import { t, locale } from '$lib/i18n.js';
  

  function handleSubmit(event) {
    event.preventDefault(); // fake submission — show success state
    submitForm();
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
        <button class="btn btn-gold" onclick={resetForm}>{$t('form.again')}</button>
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
          <p>exports@meridianexport.co<br />quotes@meridianexport.co</p>
        </div>
      </div>

      <div class="info-item">
        <div class="info-icon">{@html icons.phone}</div>
        <div>
          <h4>{$t('info.phone')}</h4>
          <p>+34 910 555 214<br />+34 600 555 890</p>
        </div>
      </div>

      <div class="info-item">
        <div class="info-icon">{@html icons.pin}</div>
        <div>
          <h4>{$t('info.office')}</h4>
          <p>Harbor Business Park, Terminal 4<br />08039 Barcelona, Spain</p>
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