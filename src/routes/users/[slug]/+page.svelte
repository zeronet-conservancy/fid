<script>
  let { data } = $props();
  let {
    baseAddr,
    address,
    size,
    user,
    dataLastWeek,
  } = data;
</script>

<h2>User profile</h2>
<div>
  {#if user && !user.error}
    <p>@{user.username}</p>
    <p>{user.name}</p>
  {:else}
    <p>User has no profile</p>
  {/if}
  <p>Address: <a href="{baseAddr}/{address}">{address}</a></p>
  <p>Used space: {size ?? '?'} out of {'?'} <button>⚙️</button></p>
  <p>Used bandwidth last week: {dataLastWeek ?? '?'} out of {'?'} <button>⚙️</button></p>
</div>
