<script>
  import { fade } from 'svelte/transition';
  import { view } from '$lib/store.js';
  import Home from '$lib/views/home.svelte';
  import Products from '$lib/views/products.svelte';
  import About from '$lib/views/about.svelte';
  import Contact from '$lib/views/contact.svelte';
</script>

{#if $view === 'home'}
  <div in:fade={{ duration: 300 }}><Home /></div>
{:else if $view === 'products'}
  <div in:fade={{ duration: 300 }}><Products /></div>
{:else if $view === 'about'}
  <div in:fade={{ duration: 300 }}><About /></div>
{:else if $view === 'contact'}
  <div in:fade={{ duration: 300 }}><Contact /></div>
{/if}