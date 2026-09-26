<script>
  import { IMG, values, timeline, certifications } from '$lib/data.js';
  import { t } from '$lib/i18n.js';
</script>

<section class="page-head">
  <div class="container">
    <span class="eyebrow">{$t('about.eyebrow')}</span>
    <h1>{$t('about.title')}</h1>
    <p>{$t('about.text')}</p>
  </div>
</section>

<section class="section">
  <div class="container about-grid">
    <div class="about-img">
      <img src={IMG.about} alt="Quality inspector checking a sack of export coffee" loading="lazy" />
    </div>
    <div class="about-text">
      <span class="eyebrow alt">{$t('about.since')}</span>
      <h2>{$t('about.storyTitle')}</h2>
      <p>{$t('about.p1')}</p>
      <p>{$t('about.p2')}</p>
      <p>{$t('about.p3')}</p>
    </div>
  </div>

  <div class="container">
    <div class="mission">
      <blockquote>{$t('about.quote')}</blockquote>
      <cite>{$t('about.cite')}</cite>
    </div>
  </div>
</section>

<section class="section values-sec">
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow alt">{$t('about.valEyebrow')}</span>
      <h2>{$t('about.valTitle')}</h2>
    </div>
    <div class="feat-grid">
      {#each values as item (item.key)}
        <div class="feat-card light">
          <div class="feat-icon">{@html item.icon}</div>
          <h3>{$t(`val.${item.key}.title`)}</h3>
          <p>{$t(`val.${item.key}.text`)}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="section">
  <div class="container two-col">
    <div>
      <div class="sec-head">
        <span class="eyebrow alt">{$t('about.compEyebrow')}</span>
        <h2>{$t('about.compTitle')}</h2>
      </div>
      <div class="certs">
        {#each certifications as cert}
          <span class="cert">{cert}</span>
        {/each}
      </div>
    </div>
    <div>
      <div class="sec-head">
        <span class="eyebrow alt">{$t('about.milEyebrow')}</span>
        <h2>{$t('about.milTitle')}</h2>
      </div>
      <div class="timeline">
        {#each timeline as item (item.year)}
          <div class="t-item">
            <div class="t-year">{item.year}</div>
            <p>{$t(item.key)}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>