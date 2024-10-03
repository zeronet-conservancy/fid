<script>
  import { formatSize } from '$lib/util';
  import { getSiteDetails } from './zero';

  let { select, isSelected, site, baseAddr } = $props();

  const formatSiteTitle = (site) => {
    return site.content?.title ?? site.address;
  };

  const formatDate = (timestamp) => {
    return (new Date(timestamp * 1000)).toLocaleDateString();
  };
</script>

<div class="site">
  <button onclick={() => select(site.address)}>⚙️</button>
  <a href="{baseAddr}/{site.address}">{formatSiteTitle(site)}</a>
  {#if isSelected(site.address)}
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
