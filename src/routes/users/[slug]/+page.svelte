<script>
  let { data } = $props();
  let {
    baseAddr,
    address,
    size,
    dataLastWeek,
    znAPI,
  } = data;

  let userPromise = fetch(`${baseAddr}/${address}/profile/profile.json`);
</script>

<h2>User profile</h2>
<div>
  {#await userPromise}
    ...
  {:then response}
    {#await response.json()}
      ...
    {:then user}
      <p>@{user.username}</p>
      <p>{user.name}</p>
    {:catch err}
      {err}
    {/await}
  {:catch err}
    {err}
  {/await}
  <p>Address: <a href="{baseAddr}/{address}">{address}</a></p>
  <p>Used space: {size ?? '?'} out of {'?'} <button>⚙️</button></p>
  <p>Used bandwidth last week: {dataLastWeek ?? '?'} out of {'?'} <button>⚙️</button></p>
</div>
