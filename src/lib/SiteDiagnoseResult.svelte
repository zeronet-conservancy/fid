<script lang="ts">
  interface Props {
    diagnoseResult: any;
  }
  let { diagnoseResult }: Props = $props();
  const debugAll = false;
</script>

<div>
  {#if diagnoseResult.all_ok}
    <span class="ok">✅OK</span>
  {:else}
    <span class="not-ok">Issues:</span>
    <ul>
      {#each diagnoseResult.bad_user_permissions as perm}
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
  }
</style>
