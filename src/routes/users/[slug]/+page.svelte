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
  {:else}
    <p>User has no profile</p>
  {/if}
  <p>Address: <a href="{baseAddr}/{address}">{address}</a></p>
  <p>Used space: {size ?? 0} out of <input type="number" min="0" max="1000000" /></p>
  <p>Used data: {dataLastWeek ?? 0} out of <input type="number" /></p>
</div>
