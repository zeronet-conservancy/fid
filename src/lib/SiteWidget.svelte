<script lang="ts">
  import { formatSize } from '$lib/util';
  import type { ZNAPI } from 'znapi/dist/common';
  import SiteDiagnoseResult from './SiteDiagnoseResult.svelte';

  interface Props {
    select: (addr: string) => void;
    isSelected: (addr: string) => boolean;
    site: any;
    baseAddr: string;
    znAPI: ZNAPI;
  }
  let { select, isSelected, site, baseAddr, znAPI }: Props = $props();

  let diagnoseResult = $state(undefined);

  const formatSiteTitle = (site) => {
    return site.content?.title ?? site.address;
  };

  const formatDate = (timestamp) => {
    return (new Date(timestamp * 1000)).toLocaleDateString();
  };

  const doDiagnose = async () => {
    const res = await znAPI.siteDiagnose(site.address);
    console.log(res);
    diagnoseResult = res;
  };
</script>

<div class="site">
  <button onclick={() => select(site.address)}>⚙️</button>
  <a href="{baseAddr}/{site.address}">{formatSiteTitle(site)}</a>
  {#if isSelected(site.address)}
    <div>
      <button>⭐</button>
      <button>🗑️</button>
      <button onclick={doDiagnose}>diagnose</button>
      <button>fix</button>
      {#if diagnoseResult}
        <SiteDiagnoseResult {diagnoseResult} />
      {/if}
      <p>{formatDate(site.settings.modified)} ~ {site.peers} peers</p>
      <p>details:
        {#await znAPI.getSiteDetails(site.address)}
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
