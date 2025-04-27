<script lang="ts">
  interface Props {
    items: any[],
    Component: any,
  }
  let { items, Component }: Props = $props();
  const pageSize = 100;
  let pageN = $state(0);
  let pageCount = $derived(Math.ceil(items.length / pageSize));
  let itemsPage = $derived(items.slice(pageN*pageSize, (pageN+1)*pageSize));
</script>

<div>
  <input type="number" bind:value={pageN} /> of {pageCount}
  <ul>
    {#each itemsPage as item}
      <Component {...item} />
    {/each}
  </ul>
</div>
