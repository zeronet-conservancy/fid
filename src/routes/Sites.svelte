<script>
  import { onMount } from 'svelte';
  import { connectWS, send } from '$lib/zero.ts';

  let siteList = $state([]);
  let selectedSite = $state(undefined);

  const base_ui_addr = 'http://127.0.0.1:43110';

  onMount(() => {
    connectWS();
    send({
      cmd: 'siteList',
      params: {},
    }, (sites) => {
      siteList = sites;
      console.log(sites[0]);
    });

  });

  const select = (site) => {
    if (selectedSite === site.address) {
      selectedSite = undefined;
    } else {
      selectedSite = site.address
    }
  }

  const formatSiteTitle = (site) => {
    return site.content?.title ?? site.address;
  };

  const formatDate = (timestamp) => {
    return (new Date(timestamp * 1000)).toLocaleDateString();
  };
</script>

<h1>Sites</h1>
{#each siteList as site}
  <div class="site">
    <button onclick={() => select(site)}>⚙️</button>
    <a href="{base_ui_addr}/{site.address}">{formatSiteTitle(site)}</a>
    {#if site.address === selectedSite}
      <div>
        <button>⭐</button>
        <button>🗑️</button>
        {formatDate(site.settings.modified)} ~ {site.peers} peers
      </div>
    {/if}
  </div>
{/each}

<style>
  .site {
    border: 2px black solid;
    border-radius: 2px;
    
  }
</style>
