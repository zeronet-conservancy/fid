<script>
  let { data } = $props();

  const isFirstLaunch = true;

  $effect(() => {
    console.log('hahaha');
    console.log(data.serverInfo);
  });
</script>

<h1>Welcome to <code>zeronet-conservancy {data.serverInfo?.version}</code></h1>
{#if isFirstLaunch}
  <p>
    It looks like you're new here! Let's get you started:
  </p>
{/if}

