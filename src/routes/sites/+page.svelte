<script>
  import { getSiteDetails, send } from '$lib/zero';
  import { formatSize } from '$lib/util';

  let { data } = $props();

  let selectedSite = $state(undefined);

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
</script>

<h1>Sites</h1>
{#each data.sites as site}
  <div class="site">
    <button onclick={() => select(site)}>⚙️</button>
    <a href="{data.baseAddr}/{site.address}">{formatSiteTitle(site)}</a>
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
