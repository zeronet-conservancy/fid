<script lang="ts">
  import { onMount } from 'svelte';

  let { data } = $props();
  let { znAPI, conn_id } = data;

  const siteListPromise = znAPI.connectionSiteList(conn_id);
</script>

<p>ID: {conn_id}</p>
{#await siteListPromise}
  ...
{:then sites}
  <ul>
    {#each sites as site}
      <li>{site}</li>
    {/each}
  </ul>
{/await}
