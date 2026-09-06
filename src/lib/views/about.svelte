<script>
  import { IMG, values, timeline, certifications, icons } from '$lib/data.js';
</script>

<section class="page-head">
  <div class="container">
    <span class="eyebrow">OUR STORY</span>
    <h1>One direction: outward.</h1>
    <p>A trading company built exclusively around exporting — no importing, ever — so every process, partnership and habit points the same way.</p>
  </div>
</section>

<section class="section">
  <div class="container about-grid">
    <div class="about-img">
      <img src={IMG.about} alt="Quality inspector checking a sack of export coffee" loading="lazy" />
    </div>
    <div class="about-text">
      <span class="eyebrow alt">SINCE 2013</span>
      <h2>From one container to four continents</h2>
      <p>Universal Export. began with a single container of high-altitude coffee and a simple conviction: origin deserves a direct seat at the world's table. Today we run five specialist divisions and ship more than 500 containers a year.</p>
      <p>We made a deliberate decision early on — no importing. Focusing on one direction of trade lets us go deeper: stronger farm relationships, tighter quality control and logistics tuned to a single, demanding flow of goods.</p>
      <p>Every lot we ship is sampled, lab-tested and certified at origin, then tracked from farm registry to bill of lading. That is the Meridian standard.</p>
    </div>
  </div>

  <div class="container">
    <div class="mission">
      <blockquote>“Our promise is simple: we only move goods out into the world — never in. That single direction is where all our expertise, relationships and obsession with quality live.”</blockquote>
      <cite>— The Meridian Export Co. founding charter</cite>
    </div>
  </div>
</section>

<section class="section values-sec">
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow alt">WHAT WE STAND FOR</span>
      <h2>Values that ship with every container</h2>
    </div>
    <div class="feat-grid">
      {#each values as item (item.title)}
        <div class="feat-card light">
          <div class="feat-icon">{@html item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="section">
  <div class="container two-col">
    <div>
      <div class="sec-head">
        <span class="eyebrow alt">COMPLIANCE</span>
        <h2>Certifications & audits</h2>
      </div>
      <div class="certs">
        {#each certifications as cert}
          <span class="cert">{cert}</span>
        {/each}
      </div>
    </div>
    <div>
      <div class="sec-head">
        <span class="eyebrow alt">MILESTONES</span>
        <h2>The road so far</h2>
      </div>
      <div class="timeline">
        {#each timeline as item (item.year)}
          <div class="t-item">
            <div class="t-year">{item.year}</div>
            <p>{item.text}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>