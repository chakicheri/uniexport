<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase.js';
  import { logout } from '$lib/auth.js';

  let cats = $state([]);
  let prodCount = $state({});          // { categoryId: number }
  let q = $state('');
  let editing = $state(null);
  let pendingDelete = $state(null);
  let saving = $state(false);
  let uploading = $state(false);
  let msg = $state('');

  let visible = $derived(
    cats.filter((c) => (c.name_en || '').toLowerCase().includes(q.toLowerCase()))
  );

  const slug = (s) =>
    (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'cat-' + Date.now();

  async function load() {
    const [{ data: c }, { data: p }] = await Promise.all([
      supabase.from('categories').select('*').order('sort'),
      supabase.from('products').select('id, category')
    ]);
    cats = c || [];
    const counts = {};
    (p || []).forEach((row) => { counts[row.category] = (counts[row.category] || 0) + 1; });
    prodCount = counts;
  }

  onMount(load);

  function startAdd() {
    const nextSort = cats.length ? Math.max(...cats.map((x) => x.sort || 0)) + 10 : 100;
    editing = {
      isNew: true, id: '', image_url: '', sort: nextSort,
      name_en: '', name_fr: '', name_ar: '',
      tagline_en: '', tagline_fr: '', tagline_ar: ''
    };
    msg = '';
  }

  function startEdit(row) {
    editing = { ...row, isNew: false };
    msg = '';
  }

  async function uploadImage(file) {
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(path, file, {
      cacheControl: '3600', upsert: false, contentType: file.type
    });
    if (error) throw error;
    return supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
  }

  async function onPick(e) {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f || !editing) return;
    uploading = true; msg = '';
    try { editing.image_url = await uploadImage(f); }
    catch (err) { msg = 'Upload failed: ' + err.message; }
    finally { uploading = false; }
  }

  async function save() {
    if (!editing) return;
    if (!editing.name_en?.trim()) { msg = 'English name is required.'; return; }
    saving = true; msg = '';
    const row = {
      id: editing.isNew ? slug(editing.name_en) : editing.id,
      image_url: editing.image_url || '',
      sort: Number(editing.sort) || 100,
      name_en: editing.name_en, name_fr: editing.name_fr || '', name_ar: editing.name_ar || '',
      tagline_en: editing.tagline_en || '', tagline_fr: editing.tagline_fr || '', tagline_ar: editing.tagline_ar || ''
    };
    const { error } = editing.isNew
      ? await supabase.from('categories').insert(row)
      : await supabase.from('categories').update(row).eq('id', row.id);
    saving = false;
    if (error) { msg = error.code === '23505' ? 'A category with that ID already exists — tweak the English name.' : error.message; return; }
    msg = 'Saved ✓';
    editing = null;
    load();
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    const { error } = await supabase.from('categories').delete().eq('id', pendingDelete);
    if (error) msg = error.message;
    pendingDelete = null;
    load();
  }

  async function handleLogout() { await logout(); goto('/login'); }
</script>

<svelte:head><title>Category Manager — UniExport Admin</title></svelte:head>

<div class="adm">
  <header class="adm-bar">
    <div class="adm-brand">MERIDIAN <small>ADMIN</small></div>
    <nav class="adm-nav">
      <a class="adm-tab" href="/admin">Products</a>
      <a class="adm-tab active" href="/admin/categories">Categories</a>
    </nav>
    <div class="adm-actions">
      <a class="adm-link" href="/" target="_blank" rel="noopener">View site ↗</a>
      <button class="adm-btn ghost" onclick={handleLogout}>Logout</button>
    </div>
  </header>

  <main class="adm-main">
    <div class="adm-head">
      <h1>Categories <span class="adm-count">{cats.length}</span></h1>
      <button class="adm-btn gold" onclick={startAdd}>+ Add category</button>
    </div>

    {#if msg}<div class="adm-msg" class:ok={msg.startsWith('Saved')}>{msg}</div>{/if}

    {#if editing}
      <section class="adm-form">
        <h2>{editing.isNew ? 'New category' : 'Edit · ' + editing.id}</h2>

        <div class="adm-grid2">
          <div class="adm-field">
            <label>Cover image</label>
            <div class="adm-imgbox">
              {#if editing.image_url}
                <img src={editing.image_url} alt="preview" />
              {:else}
                <span class="adm-imgph">no image</span>
              {/if}
            </div>
            <input type="file" accept="image/*" onchange={onPick} disabled={uploading} />
            {#if uploading}<small class="adm-hint">Uploading…</small>{/if}
            {#if editing.image_url}
              <button class="adm-btn tiny ghost" onclick={() => (editing.image_url = '')}>Remove image</button>
            {/if}
          </div>

          <div class="adm-col">
            {#if !editing.isNew}
              <div class="adm-field">
                <label>ID (permanent — used in URLs)</label>
                <input readonly value={editing.id} />
                <small class="adm-hint">Products reference this ID, so it can't be changed.</small>
              </div>
            {:else}
              <div class="adm-field">
                <label>ID</label>
                <small class="adm-hint">Auto‑generated from the English name (e.g. “Building Materials” → <code>building-materials</code>).</small>
              </div>
            {/if}
            <div class="adm-field"><label>Sort order</label><input type="number" bind:value={editing.sort} /></div>
          </div>
        </div>

        <h3>Name — 3 languages</h3>
        <div class="adm-row3">
          <div class="adm-field"><label>EN *</label><input bind:value={editing.name_en} /></div>
          <div class="adm-field"><label>FR</label><input bind:value={editing.name_fr} /></div>
          <div class="adm-field"><label>AR</label><input dir="rtl" bind:value={editing.name_ar} /></div>
        </div>

        <h3>Tagline — 3 languages</h3>
        <div class="adm-row3">
          <div class="adm-field"><label>EN</label><textarea rows="2" bind:value={editing.tagline_en}></textarea></div>
          <div class="adm-field"><label>FR</label><textarea rows="2" bind:value={editing.tagline_fr}></textarea></div>
          <div class="adm-field"><label>AR</label><textarea rows="2" dir="rtl" bind:value={editing.tagline_ar}></textarea></div>
        </div>

        <div class="adm-formfoot">
          <button class="adm-btn gold" onclick={save} disabled={saving || uploading}>{saving ? 'Saving…' : 'Save category'}</button>
          <button class="adm-btn ghost" onclick={() => (editing = null)}>Cancel</button>
        </div>
      </section>
    {/if}

    <input class="adm-search" placeholder="Search categories…" bind:value={q} />

    <ul class="adm-list">
      {#each visible as row (row.id)}
        <li class="adm-row">
          <div class="adm-thumb">{#if row.image_url}<img src={row.image_url} alt="" />{:else}<span class="adm-imgph sm">—</span>{/if}</div>
          <div class="adm-meta">
            <strong>{row.name_en}</strong>
            <span class="adm-sub">{row.tagline_en || 'no tagline'} · {prodCount[row.id] || 0} product{prodCount[row.id] === 1 ? '' : 's'}</span>
          </div>
          <div class="adm-rowbtns">
            {#if pendingDelete === row.id}
              {#if prodCount[row.id] > 0}
                <span class="adm-warn">⚠ {prodCount[row.id]} product(s) will lose their category</span>
              {/if}
              <button class="adm-btn tiny danger" onclick={confirmDelete}>Confirm</button>
              <button class="adm-btn tiny ghost" onclick={() => (pendingDelete = null)}>Keep</button>
            {:else}
              <button class="adm-btn tiny" onclick={() => startEdit(row)}>Edit</button>
              <button class="adm-btn tiny ghost" onclick={() => (pendingDelete = row.id)}>Delete</button>
            {/if}
          </div>
        </li>
      {:else}
        <li class="adm-empty">No categories match “{q}”.</li>
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
  .adm-btn.danger { background: #d93025; }
  .adm-form { background: #fff; border: 1px solid #e3e8ef; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 10px 30px rgba(11,29,58,.06); }
  .adm-form h2 { margin: 0 0 1rem; font-size: 1.1rem; }
  .adm-form h3 { margin: 1.25rem 0 .5rem; font-size: .78rem; letter-spacing: .12em; text-transform: uppercase; color: #5b6b82; }
  .adm-grid2 { display: grid; grid-template-columns: 240px 1fr; gap: 1.25rem; }
  .adm-col { display: flex; flex-direction: column; gap: .25rem; }
  .adm-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: .75rem; }
  .adm-field { display: flex; flex-direction: column; gap: .3rem; margin-bottom: .5rem; }
  .adm-field label { font-size: .72rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #5b6b82; }
  .adm-field input, .adm-field select, .adm-field textarea { border: 1px solid #d6dde6; border-radius: 9px; padding: .6rem .7rem; font: inherit; font-size: .92rem; background: #fbfcfe; width: 100%; box-sizing: border-box; }
  .adm-field input:focus, .adm-field select:focus, .adm-field textarea:focus { outline: 2px solid #e8a33d; border-color: #e8a33d; }
  .adm-field input[readonly] { background: #eef1f6; color: #5b6b82; }
  .adm-field textarea { resize: vertical; }
  .adm-field code { background: #eef1f6; padding: .05rem .3rem; border-radius: 4px; font-size: .8em; }
  .adm-imgbox { width: 100%; aspect-ratio: 4/3; border-radius: 12px; overflow: hidden; background: #eef1f6; display: flex; align-items: center; justify-content: center; border: 1px dashed #cdd5e0; margin-bottom: .5rem; }
  .adm-imgbox img { width: 100%; height: 100%; object-fit: cover; }
  .adm-imgph { color: #9aa6b6; font-size: .8rem; }
  .adm-imgph.sm { font-size: 1.2rem; }
  .adm-hint { color: #5b6b82; font-size: .78rem; }
  .adm-formfoot { display: flex; gap: .6rem; margin-top: 1.25rem; }
  .adm-search { width: 100%; box-sizing: border-box; border: 1px solid #d6dde6; border-radius: 10px; padding: .7rem .9rem; font: inherit; margin-bottom: 1rem; background: #fff; }
  .adm-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .5rem; }
  .adm-row { display: flex; align-items: center; gap: 1rem; background: #fff; border: 1px solid #e3e8ef; border-radius: 12px; padding: .6rem .8rem; }
  .adm-thumb { width: 56px; height: 56px; border-radius: 9px; overflow: hidden; background: #eef1f6; flex: 0 0 56px; display: flex; align-items: center; justify-content: center; }
  .adm-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .adm-meta { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .adm-meta strong { font-size: .98rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .adm-sub { font-size: .78rem; color: #5b6b82; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .adm-rowbtns { display: flex; gap: .4rem; align-items: center; flex: 0 0 auto; }
  .adm-warn { font-size: .72rem; color: #b3261e; font-weight: 600; max-width: 160px; }
  .adm-empty { text-align: center; color: #5b6b82; padding: 2rem; }
  @media (max-width: 860px) {
    .adm-bar { flex-wrap: wrap; }
    .adm-nav { order: 3; width: 100%; justify-content: center; }
  }
  @media (max-width: 760px) {
    .adm-grid2 { grid-template-columns: 1fr; }
    .adm-row3 { grid-template-columns: 1fr; }
  }
</style>