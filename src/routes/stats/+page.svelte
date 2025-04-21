<script lang="ts">
  import { onMount } from 'svelte';

  let { data, baseAddr } = $props();
  let { znAPI } = data;

  let connections = $state([]);
  let lastPong = $state([]);
  let lastP = $derived(lastPong.length > 0 ? lastPong[lastPong.length-1] : undefined);
  let pongStyle = $derived(lastPong.length > 0 ? `color: rgb(${20+lastP}, ${220-lastP}, ${20+lastP})` : '');

  const serverInfoPromise = znAPI.getServerInfo();

  const doPing = () => {
    znAPI.ping().then((pong) => {
      lastPong.push(0);
    });
  };

  onMount(() => {
    setInterval(() => {
      let i = 0;
      while (i < lastPong.length) {
        if (++lastPong[i] > 120) {
          lastPong.shift();
        } else {
          ++i;
        }
      }
    }, 1000);
  });
</script>

<h1>Stats</h1>
<button onclick={doPing}>Ping</button>
{#if lastP !== undefined}
  <span style={pongStyle}>pong{'!'.repeat(lastPong.length - 1)}</span>
{/if}
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
