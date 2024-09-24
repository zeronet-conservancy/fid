<script>
  import Home from './Home.svelte';
  import Sites from './Sites.svelte';
  import Users from './Users.svelte';
  import Stats from './Stats.svelte';
  import Config from './Config.svelte';
  import About from './About.svelte';
  import { onMount } from 'svelte';
  import { connectWS, send } from '$lib/zero';

  const isAlpha = true;

  let serverInfo = $state({});

  let selectedTab = $state(0);

  const tabs = [
    {
      label: "Home",
      component: Home,
    },
    {
      label: "Sites",
      component: Sites,
    },
    {
      label: "Users",
      component: Users,
    },
    {
      label: "Stats",
      component: Stats,
    },
    {
      label: "Config",
      component: Config,
    },
    {
      label: "About",
      component: About,
    },
  ];

  onMount(() => {
    connectWS();
    send({
      cmd: 'serverInfo',
      params: {},
    }, (info) => {
      console.log(info);
      console.log(`version is ${info.version}`);
      serverInfo.version = info.version;
    });
  });
</script>

{#if isAlpha}
  <p>UNDER CONSTRUCTION</p>
{/if}

<h2>User</h2>
<p>
  Your acc:
</p>

<div>
  {#each tabs as tab, i}
    {#if selectedTab === i}
      <button><b>{tab.label}</b></button>
    {:else}
      <button onclick={() => selectedTab = i}>{tab.label}</button>
    {/if}
  {/each}
</div>

<div>
  <svelte:component this={tabs[selectedTab].component} {serverInfo} />
</div>

