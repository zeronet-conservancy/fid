<script lang="ts">
  import { onMount } from 'svelte';

  let { data } = $props();
  let { znAPI } = data;

  let messages = $state([]);

  onMount(() => {
    znAPI.msgSubscribe(
      (message) => {
        messages.push(message);
      }
    );
  });
</script>

<h1>Debug</h1>

<div>
  {#each messages.slice().reverse() as message}
    <div>
      {JSON.stringify(message)}
    </div>
  {/each}
</div>

<style></style>
