<script>
  let { children } = $props();
 
  const isAlpha = true;
</script>

{#if isAlpha}
  <div class="under-construction">🏗️🚧UNDER CONSTRUCTION🚧</div>
{/if}

<h2>User</h2>
<p>
  Your acc:
</p>

<div>
  <a href="/">Home</a>
  <a href="/sites">Sites</a>
  <a href="/users">Users</a>
  <a href="/config">Config</a>
  <a href="/limits">Limits</a>
  <a href="/stats">Stats</a>
  <a href="/debug">Debug</a>
  <a href="/about">About</a>
</div>

{@render children()}

<style>
  .under-construction {
    font-size: 24pt;
    text-align: center;
    background-color: #222;
    color: #f22;
  }
</style>
