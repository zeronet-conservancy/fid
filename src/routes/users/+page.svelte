<script>
  import { send } from '$lib/zero';
  import { goto } from '$app/navigation';

  let { data } = $props();
  let userList = $derived(data.users);

  let selectedUser = $state(undefined);

  const createNewAccount = () => {
    send({
      cmd: 'registerNewUser',
    }, (result) => {
      console.log(result);
      // TODO: goto profile editing
      goto(`/users/${result.address}`);
    });
  };

</script>

<h2>Your accounts</h2>
<button onclick={createNewAccount}>New account</button>
<h2>Following</h2>

<h2>Known users</h2>
{#each userList as user}
  {#if !user.has_content_record || user.has_profile_content}
    <div class="user">
      <a href="/users/{user.address}">{user.address}</a>
    </div>
  {/if}
{/each}
