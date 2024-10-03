<script>
  import SiteWidget from '$lib/SiteWidget.svelte';

  let { data } = $props();

  let selectedSite = $state(undefined);

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
{#each data.sites as site}
  <SiteWidget {site} {select} {isSelected} baseAddr={data.baseAddr} />
{/each}
