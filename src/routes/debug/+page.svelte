<script lang="ts">
  import { onMount } from 'svelte';
  import { JSONEditor } from 'svelte-jsoneditor';

  let { data } = $props();
  let { znAPI } = data;

  let messages = $state([]);

  onMount(() => {
    znAPI.msgSubscribe(
      (message) => {
        if (message.cmd === 'newMessage') {
          messages.push(message.params);
        }
      }
    );
  });
</script>

<h1>Debug</h1>

<div>
  {#each messages.slice().reverse() as message}
    <div>
      <JSONEditor content={{json: message}} />
    </div>
  {/each}
</div>

<style></style>
