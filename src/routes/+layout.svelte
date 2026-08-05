<script>
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';
  import Navbar from '$lib/components/navbar.svelte';
  import Footer from '$lib/components/footer.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Meridian Export Co. — Export Only</title>
</svelte:head>

<Navbar />

{@render children()}

<Footer />