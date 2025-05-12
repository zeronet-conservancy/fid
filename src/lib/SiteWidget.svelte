<script lang="ts">
  import { formatSize } from '$lib/util';
  import type { ZNAPI } from 'znapi/dist/common';
  import SiteDiagnoseResult from './SiteDiagnoseResult.svelte';
  import { onMount } from 'svelte';

  interface Props {
    site: any;
    baseAddr: string;
    znAPI: ZNAPI;
  }
  let { site, baseAddr, znAPI }: Props = $props();

  const siteDetailsPromise = znAPI.getSiteDetails(site.address);
  let siteDetails = $state(undefined);
  let diagnoseResult = $state(undefined);

  let isSelected = $state(false);
  const flipSelect = () => {
    isSelected = !isSelected;
  };

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
    if (site.settings.favorite) {
      await znAPI.siteUnfavorite(site.address);
      site.settings.favorite = false;
    } else {
      await znAPI.siteFavorite(site.address);
      site.settings.favorite = true;
    }
  };

  const doFlipUseForLimits = async () => {
    if (useForLimits) {
      await znAPI.siteLimitsUnsubscribe(site.address);
      useForLimitsPriority = undefined;
      site.settings.use_limit_priority = undefined;
    } else {
      setPriority(inputPriority);
    }
  };

  const setPriority = async (priority: number) => {
    await znAPI.siteLimitsSubscribe(site.address, inputPriority);
    useForLimitsPriority = inputPriority;
    site.settings.use_limit_priority = inputPriority;
  };

  let useForLimitsPriority = $state(site.settings.use_limit_priority);
  let useForLimits = $derived(typeof useForLimitsPriority === 'number');
  let useForLimitsStyle = $derived(useForLimits ? "" : "filter: grayscale(100%)");
  let inputPriority = $state(useForLimitsPriority ?? 0);

  const onInput = async (ev) => {
    await setPriority(inputPriority);
  };

  let favStyle = $derived(site.settings.favorite ? "" : "filter: grayscale(100%)");
</script>

<div class="site">
  <button onclick={() => flipSelect(site.address)}>⚙️</button>
  <a href="{baseAddr}/{site.address}">{formatSiteTitle(site)}</a>
  {#if isSelected}
    <div>
      <button onclick={doFavorite} style={favStyle}>⭐</button>
      <button>🗑️</button>
      <button onclick={doDiagnose}>diagnose</button>
      <!-- <button onclick={doFix}>fix</button> -->
      {#if diagnoseResult}
        <SiteDiagnoseResult {diagnoseResult} />
      {/if}
      <p>
        <button style={useForLimitsStyle} onclick={doFlipUseForLimits}>✅</button>
        Use as source for user limits
        {#if useForLimits}
          wwith priority <input type="number" bind:value={inputPriority} onchange={onInput} />
        {/if}
      </p>
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
