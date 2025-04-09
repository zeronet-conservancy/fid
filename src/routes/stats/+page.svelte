<script lang="ts">
  import { onMount } from 'svelte';

  let { znAPI, baseAddr } = $props();

  let connections = $state([]);
</script>

<h1>Stats</h1>
<h2>Client info</h2>
<p>version:</p>
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
