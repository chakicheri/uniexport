<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase.js';
  import { logout } from '$lib/auth.js';
  import { translations as defaults } from '$lib/i18n.js';

  const LOCS = ['en', 'fr', 'ar'];

  let items = $state([]);
  let q = $state('');
  let group = $state('all');
  let savingKey = $state('');
  let msg = $state('');

  let groups = $derived([...new Set(items.map((i) => i.group))].sort());
  let visible = $derived(
    items.filter((i) =>
      (group === 'all' || i.group === group) &&
      (!q ||
        i.key.includes(q.toLowerCase()) ||
        LOCS.some((l) => (i.edit[l] || '').toLowerCase().includes(q.toLowerCase())))
    )
  );
  let dirtyCount = $derived(items.filter((i) => isDirty(i)).length);

  function eff(i, l) { return i.ov?.[l] ?? i.def[l] ?? ''; }
  function isDirty(i) { return LOCS.some((l) => (i.edit[l] ?? '') !== eff(i, l)); }

  async function load() {
    const { data } = await supabase.from('translations').select('*');
    const ovMap = {};
    (data || []).forEach((r) => (ovMap[r.key] = r));
    items = Object.keys(defaults.en).map((key) => {
      const def = { en: defaults.en[key] ?? '', fr: defaults.fr?.[key] ?? '', ar: defaults.ar?.[key] ?? '' };
      const r = ovMap[key];
      const ov = r ? { en: r.en, fr: r.fr, ar: r.ar } : null;
      return {
        key,
        group: key.split('.')[0],
        def,
        ov,
        edit: { en: ov?.en ?? def.en, fr: ov?.fr ?? def.fr, ar: ov?.ar ?? def.ar }
      };
    });
  }

  onMount(load);

  async function saveRow(i) {
    savingKey = i.key; msg = '';
    const row = { key: i.key };
    let any = false;
    for (const l of LOCS) {
      const v = (i.edit[l] ?? '').trim();
      row[l] = v && v !== i.def[l] ? v : null;   // store only real overrides
      if (row[l]) any = true;
    }
    const { error } = any
      ? await supabase.from('translations').upsert(row, { onConflict: 'key' })
      : await supabase.from('translations').delete().eq('key', i.key);
    savingKey = '';
    if (error) { msg = error.message; return; }
    msg = 'Saved ✓ ' + i.key;
    load();
  }

  async function resetRow(i) {
    savingKey = i.key; msg = '';
    const { error } = await supabase.from('translations').delete().eq('key', i.key);
    savingKey = '';
    if (error) { msg = error.message; return; }
    msg = 'Reset ✓ ' + i.key;
    load();
  }

  async function handleLogout() { await logout(); goto('/login'); }
</script>

<svelte:head><title>Text Manager — UniExport Admin</title></svelte:head>

<div class="adm">
  <header class="adm-bar">
    <div class="adm-brand">MERIDIAN <small>ADMIN</small></div>
    <nav class="adm-nav">
      <a class="adm-tab" href="/admin">Products</a>
      <a class="adm-tab" href="/admin/categories">Categories</a>
      <a class="adm-tab active" href="/admin/translations">Texts</a>
    </nav>
    <div class="adm-actions">
      <a class="adm-link" href="/" target="_blank" rel="noopener">View site ↗</a>
      <button class="adm-btn ghost" onclick={handleLogout}>Logout</button>
    </div>
  </header>

  <main class="adm-main">
    <div class="adm-head">
      <h1>Site texts <span class="adm-count">{items.length}</span></h1>
      {#if dirtyCount}<span class="adm-hint">{dirtyCount} unsaved change{dirtyCount === 1 ? '' : 's'}</span>{/if}
    </div>

    {#if msg}<div class="adm-msg" class:ok={/^(Saved|Reset)/.test(msg)}>{msg}</div>{/if}

    <div class="tr-tools">
      <input class="adm-search" style="margin-bottom:0" placeholder="Search key or text…" bind:value={q} />
      <select class="adm-select" bind:value={group}>
        <option value="all">All groups</option>
        {#each groups as g}<option value={g}>{g}</option>{/each}
      </select>
    </div>

    <p class="adm-hint">
      Values shown = DB override if present, else built‑in default. Saving stores only what differs from the default;
      <strong>Reset</strong> deletes the override and restores the code default. Empty FR/AR falls back to English on the site.
    </p>

    <ul class="tr-list">
      {#each visible as i (i.key)}
        <li class="tr-row" class:dirty={isDirty(i)}>
          <div class="tr-key">{i.key}{#if i.ov}<span class="tr-badge">DB</span>{/if}</div>
          <div class="adm-row3">
            <div class="adm-field"><label>EN</label><input bind:value={i.edit.en} /></div>
            <div class="adm-field"><label>FR</label><input bind:value={i.edit.fr} /></div>
            <div class="adm-field"><label>AR</label><input dir="rtl" bind:value={i.edit.ar} /></div>
          </div>
          <div class="adm-rowbtns">
            <button class="adm-btn tiny gold" disabled={!isDirty(i) || savingKey === i.key} onclick={() => saveRow(i)}>
              {savingKey === i.key ? '…' : 'Save'}
            </button>
            {#if i.ov}
              <button class="adm-btn tiny ghost" disabled={savingKey === i.key} onclick={() => resetRow(i)}>Reset</button>
            {/if}
          </div>
        </li>
      {:else}
        <li class="adm-empty">No keys match.</li>
      {/each}
    </ul>
  </main>
</div>

<style>
  .adm { min-height: 100vh; background: #f4f6fa; color: #0b1d3a; font-family: 'Inter', system-ui, sans-serif; }
  .adm-bar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.5rem; background: #0b1d3a; color: #fff; position: sticky; top: 0; z-index: 5; }
  .adm-brand { font-weight: 800; letter-spacing: .12em; white-space: nowrap; }
  .adm-brand small { color: #e8a33d; font-weight: 600; letter-spacing: .2em; margin-left: .4rem; }
  .adm-nav { display: flex; gap: .25rem; }
  .adm-tab { color: rgba(255,255,255,.6); text-decoration: none; font-size: .9rem; font-weight: 600; padding: .4rem .85rem; border-radius: 8px; transition: all .15s; }
  .adm-tab:hover { color: #fff; background: rgba(255,255,255,.08); }
  .adm-tab.active { color: #0b1d3a; background: #e8a33d; }
  .adm-actions { display: flex; gap: .6rem; align-items: center; }
  .adm-link { color: rgba(255,255,255,.75); font-size: .85rem; text-decoration: none; white-space: nowrap; }
  .adm-link:hover { color: #e8a33d; }
  .adm-main { max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem 5rem; }
  .adm-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .adm-head h1 { margin: 0; font-size: 1.6rem; }
  .adm-count { background: #e8a33d; color: #0b1d3a; font-size: .8rem; font-weight: 800; padding: .1rem .55rem; border-radius: 999px; vertical-align: middle; margin-left: .4rem; }
  .adm-msg { padding: .7rem 1rem; border-radius: 10px; background: #fdecea; color: #b3261e; font-weight: 600; font-size: .9rem; margin-bottom: 1rem; }
  .adm-msg.ok { background: #e6f4ea; color: #1e7e34; }
  .adm-btn { border: 0; border-radius: 9px; padding: .6rem 1rem; font-weight: 700; font-size: .9rem; cursor: pointer; background: #0b1d3a; color: #fff; transition: transform .15s, filter .15s; }
  .adm-btn:hover { transform: translateY(-1px); filter: brightness(1.08); }
  .adm-btn:disabled { opacity: .55; cursor: not-allowed; transform: none; }
  .adm-btn.gold { background: #e8a33d; color: #0b1d3a; }
  .adm-btn.ghost { background: transparent; color: inherit; border: 1.5px solid rgba(11,29,58,.25); }
  .adm-bar .adm-btn.ghost { color: #fff; border-color: rgba(255,255,255,.35); }
  .adm-btn.tiny { padding: .35rem .7rem; font-size: .78rem; }
  .adm-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: .75rem; }
  .adm-field { display: flex; flex-direction: column; gap: .3rem; margin-bottom: .5rem; }
  .adm-field label { font-size: .72rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #5b6b82; }
  .adm-field input { border: 1px solid #d6dde6; border-radius: 9px; padding: .6rem .7rem; font: inherit; font-size: .92rem; background: #fbfcfe; width: 100%; box-sizing: border-box; }
  .adm-field input:focus { outline: 2px solid #e8a33d; border-color: #e8a33d; }
  .adm-hint { color: #5b6b82; font-size: .8rem; margin-bottom: 1rem; }
  .adm-search { width: 100%; box-sizing: border-box; border: 1px solid #d6dde6; border-radius: 10px; padding: .7rem .9rem; font: inherit; background: #fff; }
  .adm-select { border: 1px solid #d6dde6; border-radius: 10px; padding: .7rem .9rem; font: inherit; background: #fff; }
  .adm-rowbtns { display: flex; gap: .4rem; align-items: center; flex: 0 0 auto; }
  .adm-empty { text-align: center; color: #5b6b82; padding: 2rem; list-style: none; }
  .tr-tools { display: flex; gap: .75rem; margin-bottom: .75rem; }
  .tr-tools .adm-search { flex: 1; margin-bottom: 0; }
  .tr-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .6rem; }
  .tr-row { background: #fff; border: 1px solid #e3e8ef; border-radius: 12px; padding: .8rem 1rem; }
  .tr-row.dirty { border-color: #e8a33d; box-shadow: 0 0 0 2px rgba(232,163,61,.15); }
  .tr-key { font-family: ui-monospace, monospace; font-size: .8rem; color: #5b6b82; margin-bottom: .5rem; display: flex; gap: .5rem; align-items: center; }
  .tr-badge { background: #0b1d3a; color: #e8a33d; font-size: .62rem; font-weight: 800; padding: .1rem .4rem; border-radius: 4px; letter-spacing: .08em; }
  @media (max-width: 860px) {
    .adm-bar { flex-wrap: wrap; }
    .adm-nav { order: 3; width: 100%; justify-content: center; }
    .adm-row3 { grid-template-columns: 1fr; }
    .tr-tools { flex-direction: column; }
  }
</style>