<script>
  import { fly } from 'svelte/transition';
  import { form as contactForm, formSubmitted, submitForm, resetForm } from '$lib/store.js';
  import { countryOptions, products, icons } from '$lib/data.js';

  function handleSubmit(event) {
    event.preventDefault(); // fake submission — show success state
    submitForm();
  }
</script>

<section class="page-head">
  <div class="container">
    <span class="eyebrow">GET IN TOUCH</span>
    <h1>Let's talk export</h1>
    <p>Request pricing, samples or a full quote. Our export desk responds within 24 business hours.</p>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    {#if $formSubmitted}
      <div class="success-card" in:fly={{ y: 14, duration: 400 }}>
        <div class="success-icon">{@html icons.check}</div>
        <h3>Inquiry received!</h3>
        <p>
          Thank you{$contactForm.name ? `, ${$contactForm.name}` : ''}. Our export desk will reply to
          <strong>{$contactForm.email}</strong> within 24 business hours.
        </p>
        <button class="btn btn-gold" onclick={resetForm}>Send another inquiry</button>
      </div>
    {:else}
      <form class="contact-form" onsubmit={handleSubmit}>
        <div class="f-row">
          <div class="f-group">
            <label for="f-name">Full name *</label>
            <input id="f-name" type="text" required placeholder="Jane Doe" bind:value={$contactForm.name} />
          </div>
          <div class="f-group">
            <label for="f-company">Company</label>
            <input id="f-company" type="text" placeholder="Acme Imports GmbH" bind:value={$contactForm.company} />
          </div>
        </div>
        <div class="f-row">
          <div class="f-group">
            <label for="f-email">Email *</label>
            <input id="f-email" type="email" required placeholder="jane@acme.com" bind:value={$contactForm.email} />
          </div>
          <div class="f-group">
            <label for="f-country">Country *</label>
            <select id="f-country" required bind:value={$contactForm.country}>
              <option value="" disabled>Select country…</option>
              {#each countryOptions as c}
                <option value={c}>{c}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="f-group">
          <label for="f-product">Product of interest</label>
          <select id="f-product" bind:value={$contactForm.product}>
            <option value="">General inquiry</option>
            {#each products as p}
              <option value={p.name}>{p.name}</option>
            {/each}
          </select>
        </div>
        <div class="f-group">
          <label for="f-message">Message *</label>
          <textarea id="f-message" required placeholder="Product, estimated volume, destination port…" bind:value={$contactForm.message}></textarea>
        </div>
        <button type="submit" class="btn btn-gold">Send Inquiry →</button>
      </form>
    {/if}

    <aside class="info-panel">
      <div class="info-item">
        <div class="info-icon">{@html icons.mail}</div>
        <div>
          <h4>Export desk</h4>
          <p>contact@uni-export.com<br />infos@uni-export.com</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">{@html icons.phone}</div>
        <div>
          <h4>Phone / WhatsApp</h4>
          <p>+213 770 603 930<br />+213 773 789 041</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">{@html icons.pin}</div>
        <div>
          <h4>Head office</h4>
          <p>Rue Chehat Rabah<br />Staouali Algiers 16000, Algeria</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">{@html icons.clock}</div>
        <div>
          <h4>Export hours</h4>
          <p>Mon – Sat · 08:00 – 18:00 CET<br />Replies within 24 business hours</p>
        </div>
      </div>
      <span class="export-badge">◆ Export only — no importation</span>
    </aside>
  </div>
</section>