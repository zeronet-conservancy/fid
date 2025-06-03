<script>
  import { goto } from '$app/navigation';
  import Paginate from '$lib/Paginate.svelte';
  import User from './User.svelte';

  let { data } = $props();
  let { znAPI } = data;
  const usersPromise = znAPI.getSignerList();

  const createNewAccount = () => {
    // TODO
    send({
      cmd: 'registerNewUser',
    }, (result) => {
      console.log(result);
      // TODO: goto profile editing
      goto(`/users/${result.address}`);
    });
  };

  const sortOptions = {
    none: undefined,
    byAddress: (a, b) => a.address.localeCompare(b.address),
  };

  let sortBy = $state(sortOptions.none);
  let sortReverse = $state(false);

  const setSortBy = (func) => {
    sortBy = func;
  };
</script>

<h2>Your accounts</h2>
<button onclick={createNewAccount}>New account</button>
<h2>Following</h2>

<h2>Known users</h2>
<div>
  <span>Sort by:</span>
  {#each Object.entries(sortOptions) as [key, func]}
    <button onclick={() => setSortBy(func)}>{key}</button>
  {/each}
  <button onclick={() => sortReverse = !sortReverse}>reverse</button>
</div>
{#await usersPromise}
  (loading)
{:then users}
  <Paginate items={users} {sortBy} {sortReverse} Component={User} />
{/await}
