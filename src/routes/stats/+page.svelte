<script lang="ts">
  import { onMount } from 'svelte';

  let { data, baseAddr } = $props();
  let { znAPI } = data;

  let connections = $state([]);

  const serverInfoPromise = znAPI.getServerInfo()
</script>

<h1>Stats</h1>
<h2>Client info</h2>
<div>
  {#await serverInfoPromise}
    ??
  {:then serverInfo}
    <p>version: {serverInfo.version} {serverInfo.platform}/{serverInfo.dist_type}</p>
    <p>listening on: {serverInfo.ui_ip}:{serverInfo.ui_port}</p>
    <p>tor status: {serverInfo.tor_status}</p>
  {:catch err}
    Error while fetching info: {err}
  {/await}
</div>
<h2>Connections</h2>
<table>
  <tbody>
    <tr>
      <th>ID</th>
      <th>dir</th>
      <th>address</th>
      <th>p open</th>
      <th>ping</th>
      <th>version</th>
    </tr>
    {#each connections as connection}
      <tr>
        <td>{connection.id}</td>
        <td>{connection.direction}</td>
        <td>{connection.address}</td>
        <td>{connection.port_open}</td>
        <td>{connection.ping?.toFixed(3)}s</td>
        <td>{connection.version}</td>
      </tr>
    {/each}
  </tbody>
</table>
