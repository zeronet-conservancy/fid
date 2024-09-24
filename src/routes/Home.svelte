<script>
  import { } from '$lib/zero';

  let { serverInfo } = $props();

  const isFirstLaunch = true;

  $effect(() => {
    console.log(serverInfo);
  });
</script>

<h1>Welcome to <code>zeronet-conservancy {serverInfo?.version}</code></h1>
{#if isFirstLaunch}
  <p>
    It looks like you're new here! Let's get you started:
  </p>
{/if}
