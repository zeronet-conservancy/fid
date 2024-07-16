<script>
  import Home from './Home.svelte';
  import Sites from './Sites.svelte';
  import Users from './Users.svelte';
  import Stats from './Stats.svelte';
  import Config from './Config.svelte';
  import About from './About.svelte';

  const isAlpha = true;

  let selectedTab = 0;

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
  <svelte:component this={tabs[selectedTab].component}/>
</div>

