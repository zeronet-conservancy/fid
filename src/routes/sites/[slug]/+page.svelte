<script lang="ts">
    import { sanitizeName } from '$lib/util.js';
  import { onMount } from 'svelte';

  let { data } = $props();
  let { address, baseAddr, znAPI } = data;

  const siteDetailsPromise = znAPI.getSiteDetails(address);
  let siteDetails = $state(undefined);
  onMount(async () => {
    siteDetails = await siteDetailsPromise;
  });
</script>

<h1>Site details</h1>
<h2>{sanitizeName(siteDetails?.title ?? "")}</h2>
<div>Address: <a href="{baseAddr}/{address}">{address}</a></div>
<div>
  Permissions:
  <ul>
    {#each siteDetails?.permissions ?? [] as permission}
      <li>{permission}</li>
    {/each}
  </ul>
</div>
