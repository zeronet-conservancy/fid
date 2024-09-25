<script>
  let { children } = $props();
 
  const isAlpha = true;
</script>

{#if isAlpha}
  <p>UNDER CONSTRUCTION</p>
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
  <a href="/about">About</a>
</div>

{@render children()}
