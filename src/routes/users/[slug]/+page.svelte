<script>
  import { formatSize } from '$lib/util.js';
  let { data } = $props();
  let {
    baseAddr,
    address,
    znAPI,
  } = data;

  let infoP = znAPI.getUserInfo(address);
</script>

<h2>User profile</h2>
<div>
  <p>Address: <a href="{baseAddr}/{address}">{address}</a></p>
  {#await infoP}
    ...
  {:then info}
    <p>@{info.username}</p>
    <p>Used space: {formatSize(info.size)} out of {formatSize(info.limit)}<button>⚙️</button></p>
    <!-- <p>Used bandwidth last week: {dataLastWeek ?? '?'} out of {'?'} <button>⚙️</button></p> -->
  {:catch err}
    {err}
  {/await}
</div>
