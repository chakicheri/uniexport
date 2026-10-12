<script>
  import { login } from '$lib/auth.js';
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition';

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);

  async function handleLogin(e) {
    e.preventDefault();
    loading = true;
    error = '';
    try {
      await login(email, password);
      goto('/admin'); // Redirect to dashboard on success
    } catch (err) {
      error = 'Invalid email or password.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Admin Login — UniExport</title>
</svelte:head>

<div class="login-wrapper">
  <form class="login-card" onsubmit={handleLogin} in:fly={{ y: 20, duration: 400 }}>
    <div class="login-logo">
      <svg viewBox="0 0 32 32" width="40" height="40">
        <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M16 5.5l3.2 10.5L16 26.5l-3.2-10.5z" fill="currentColor" />
      </svg>
    </div>
    <h1>Admin Portal</h1>
    <p class="login-sub">UniExport B2B Command Center</p>

    {#if error}
      <div class="login-error">{error}</div>
    {/if}

    <div class="f-group">
      <label for="email">Email</label>
      <input id="email" type="email" bind:value={email} required autocomplete="username" />
    </div>

    <div class="f-group">
      <label for="password">Password</label>
      <input id="password" type="password" bind:value={password} required autocomplete="current-password" />
    </div>

    <button type="submit" class="btn btn-gold" disabled={loading} style="width: 100%; margin-top: 1rem;">
      {loading ? 'Authenticating...' : 'Login →'}
    </button>
  </form>
</div>

<style>
  .login-wrapper {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--navy); padding: 2rem;
  }
  .login-card {
    background: #fff; padding: 3rem; border-radius: 16px; width: 100%; max-width: 400px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3); text-align: center;
  }
  .login-logo { color: var(--gold); margin-bottom: 1rem; }
  h1 { margin: 0; font-size: 1.5rem; color: var(--navy); }
  .login-sub { color: var(--muted); font-size: 0.9rem; margin-bottom: 2rem; }
  .login-error {
    background: #ffebee; color: #c62828; padding: 0.75rem; border-radius: 8px;
    font-size: 0.85rem; margin-bottom: 1rem; font-weight: 600;
  }
  .f-group { text-align: left; margin-bottom: 1rem; }
  .f-group label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--navy); margin-bottom: 0.4rem; }
  .f-group input {
    width: 100%; padding: 0.8rem; border: 1px solid var(--line); border-radius: 8px;
    font-size: 1rem; box-sizing: border-box;
  }
  .f-group input:focus { outline: 2px solid var(--gold); border-color: var(--gold); }
</style>