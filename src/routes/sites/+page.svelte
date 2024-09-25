<script>
  import { onMount } from 'svelte';
  import { getSiteDetails, send } from '$lib/zero';

  let siteList = $state([]);
  let selectedSite = $state(undefined);

  const base_ui_addr = 'http://127.0.0.1:43110';

  onMount(() => {
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
      selectedSite = site.address;
    }
  }

  const formatSiteTitle = (site) => {
    return site.content?.title ?? site.address;
  };

  const formatDate = (timestamp) => {
    return (new Date(timestamp * 1000)).toLocaleDateString();
  };

  const formatSize = (nbytes) => {
    if (nbytes === 0)
      return '0';
    if (nbytes < 1000)
      return nbytes.toString() + 'B';
    if (nbytes < 1000*1000)
      return (nbytes/1000).toFixed(1).toString() + 'K';
    if (nbytes < 1000*1000*1000)
      return (nbytes/1000/1000).toFixed(1).toString() + 'M';
    return (nbytes/1000/1000/1000).toFixed(1).toString() + 'G';
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
        <p>{formatDate(site.settings.modified)} ~ {site.peers} peers</p>
        <p>details:
          {#await getSiteDetails(site.address)}
            ...
          {:catch error}
            {error}
          {:then res}
            total size {formatSize(res.total_size)}
            optional size {formatSize(res.optional_size)}
            owned size {formatSize(res.owned_size)}
          {/await}
        </p>
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
