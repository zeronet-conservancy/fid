<script lang="ts">
  interface Props<T> {
    items: T[],
    sortBy?: (a: T, b: T) => number,
    sortReverse: boolean,
    Component: any,
  }
  let {
    items,
    sortBy,
    sortReverse,
    Component,
  }: Props<unknown> = $props();
  const pageSize = 100;
  let pageN = $state(0);
  let pageCount = $derived(Math.ceil(items.length / pageSize));
  let sortReverseSign = $derived(sortReverse ? -1 : 1);
  let sortedItems = $derived(sortBy ? items.slice().sort((a, b) => sortReverseSign * sortBy(a, b)) : items);
  let itemsPage = $derived(sortedItems.slice(pageN*pageSize, (pageN+1)*pageSize));
</script>

<div>
  <input type="number" bind:value={pageN} /> of {pageCount}
  <ul>
    {#each itemsPage as item}
      <Component {...item} />
    {/each}
  </ul>
</div>
