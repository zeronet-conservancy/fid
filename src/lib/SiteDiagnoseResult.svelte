<script lang="ts">
  interface Props {
    diagnoseResult: any;
  }
  let { diagnoseResult }: Props = $props();
  const debugAll = false;
  const badAddresses = $derived(
    diagnoseResult.contents.map(
      (content) => content.user_addresses.map(
        (res) => {
          return {
            ...res,
            inner_path: content.inner_path,
          };
        }
      )
    ).flat(1)
  );
</script>

<div>
  {#if diagnoseResult.is_ok}
    <span class="ok">✅OK</span>
  {:else}
    <span class="not-ok">Issues:</span>
    <ul>
      {#each badAddresses as perm}
        <li>{perm.error} {perm.user}</li>
      {/each}
    </ul>
  {/if}
  {#if debugAll}
    {JSON.stringify(diagnoseResult)}
  {/if}
</div>

<style>
  .ok {
  }
  .not-ok {
    background-color: #f335;
  }
</style>
