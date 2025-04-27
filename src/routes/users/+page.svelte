<script>
  import { goto } from '$app/navigation';
  import Paginate from '$lib/Paginate.svelte';
  import User from './User.svelte';

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
<Paginate items={userList} Component={User} />
