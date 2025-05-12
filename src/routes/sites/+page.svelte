<script>
  import SiteWidget from '$lib/SiteWidget.svelte';
  import { onMount } from 'svelte';

  let { data } = $props();
  let { znAPI } = data;

  let selectedSite = $state(undefined);
  const sitesPromise = znAPI.getSiteList();
  let sites = $state(undefined);
  onMount(async () => {
    try {
      sites = await sitesPromise;
    } catch (error) {
      sites = {
        error,
      };
    }
  });

  let sitesFav = $derived(sites?.error ? [] :
                          sites?.filter((site) => site.settings.favorite) ?? []);

  const select = (address) => {
    if (selectedSite === address) {
      selectedSite = undefined;
    } else {
      selectedSite = address;
    }
  }

  const isSelected = (address) => {
    return address === selectedSite;
  }
</script>

<h1>Sites</h1>
<h2>Favorite</h2>
{#each sitesFav as site}
  <SiteWidget {znAPI} {site} {select} {isSelected} baseAddr={data.baseAddr} />
{/each}
<h2>Other</h2>
{#if sites === undefined}
  (loading)
{:else if sites === []}
  (no sites yet!)
{:else if sites.error}
  {sites.error}
{:else}
  {#each sites as site}
    <SiteWidget {znAPI} {site} {select} {isSelected} baseAddr={data.baseAddr} />
  {/each}
{/if}
