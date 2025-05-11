<script lang="ts">
  import { formatSize } from '$lib/util';
  import type { ZNAPI } from 'znapi/dist/common';
  import SiteDiagnoseResult from './SiteDiagnoseResult.svelte';
  import { onMount } from 'svelte';

  interface Props {
    select: (addr: string) => void;
    isSelected: (addr: string) => boolean;
    site: any;
    baseAddr: string;
    znAPI: ZNAPI;
  }
  let { select, isSelected, site, baseAddr, znAPI }: Props = $props();

  const siteDetailsPromise = znAPI.getSiteDetails(site.address);
  let siteDetails = $state(undefined);
  let diagnoseResult = $state(undefined);

  onMount(async () => {
    siteDetails = await siteDetailsPromise;
  });

  const formatSiteTitle = (site) => {
    return site.content?.title ?? site.address;
  };

  const formatDate = (timestamp) => {
    return (new Date(timestamp * 1000)).toLocaleDateString();
  };

  const doDiagnose = async () => {
    diagnoseResult = await znAPI.siteDiagnose(site.address);
  };

  const doFix = async () => {
    for (let content of diagnoseResult.contents) {
      await znAPI.siteFixUserPermissions(
        site.address,
        content.inner_path,
        content.user_addresses.map((res) => res.user),
      );
    }
  };

  const doFavorite = async () => {
    siteDetails = await siteDetailsPromise;
    if (siteDetails.favorite) {
      await znAPI.siteUnfavorite(site.address);
      siteDetails.favorite = false;
    } else {
      await znAPI.siteFavorite(site.address);
      siteDetails.favorite = true;
    }
  };

  let favStyle = $derived(siteDetails.favorite ? "" : "filter: grayscale(100%)");
</script>

<div class="site">
  <button onclick={() => select(site.address)}>⚙️</button>
  <a href="{baseAddr}/{site.address}">{formatSiteTitle(site)}</a>
  {#if isSelected(site.address)}
    <div>
      <button onclick={doFavorite} style={favStyle}>⭐</button>
      <button>🗑️</button>
      <button onclick={doDiagnose}>diagnose</button>
      <!-- <button onclick={doFix}>fix</button> -->
      {#if diagnoseResult}
        <SiteDiagnoseResult {diagnoseResult} />
      {/if}
      <p>{formatDate(site.settings.modified)} ~ {site.peers} peers</p>
      <p>details:
        {#await siteDetailsPromise}
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
