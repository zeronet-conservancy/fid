<script>
  import { onMount } from 'svelte';
  import { send } from '$lib/zero';

  let userList = $state([]);
  let selectedUser = $state(undefined);

  onMount(() => {
    send({
      cmd: 'signerList',
      params: {},
    }, (users) => {
      userList = users;
    });

  });

  const createNewAccount = () => {
    send({
      cmd: 'registerNewUser',
    }, (result) => {
      console.log(result);
      // TODO: goto profile editing
    });
  };

</script>

<h2>Your accounts</h2>
<button onclick={createNewAccount}>New account</button>
<h2>Following</h2>

<h2>Users</h2>
{#each userList as user}
  {#if !user.has_content_record || user.has_profile_content}
    <div>{JSON.stringify(user)}</div>
  {/if}
{/each}
