<script>
  let { data } = $props();
  let { znAPI } = data;

  const isFirstLaunch = true;

  let serverInfoPromise = znAPI.getServerInfo()
</script>

<h1>Welcome to <code>zeronet-conservancy
  {#await serverInfoPromise}
    (?)
  {:then serverInfo}
    {serverInfo.version}
  {/await}
</code></h1>
{#if isFirstLaunch}
  <p>
    It looks like you're new here! Let's get you started:
  </p>
{/if}
