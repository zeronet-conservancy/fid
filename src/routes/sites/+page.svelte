<script>
  import SiteWidget from '$lib/SiteWidget.svelte';
  import { onMount } from 'svelte';

  let { data } = $props();
  let { znAPI } = data;

  let selectedSite = $state(undefined);
  let sitesPromise = $state(undefined);

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

  onMount(() => {
    sitesPromise = znAPI.getSiteList();
  });
</script>

<h1>Sites</h1>
{#await sitesPromise}
  (loading)
{:catch err}
  {err}
{:then sites}
  {#each sites as site}
    <SiteWidget {znAPI} {site} {select} {isSelected} baseAddr={data.baseAddr} />
  {/each}
{/await}
