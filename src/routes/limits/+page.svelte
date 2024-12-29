<script>
  import { onMount } from 'svelte';

  // getSizeLimitRules
  let { data } = $props();
  let { znAPI } = data;

  let limitRules = $state([]);

  let ruleTypes = $state([
    'limit',
    'allow',
  ]);

  let newRuleAddress = $state();
  let newRuleType = $state();
  let newValue = $state();
  let newPriority = $state(0);

  onMount(() => {
    znAPI.getSizeLimitRules().then(rules => {
      limitRules = rules;
    });
  });

  const addNewPrivateLimit = () => {
    znAPI.addPrivateSizeLimitRule(newRuleAddress, newRuleType, newValue, newPriority);
  };
</script>

<h2>Limits</h2>

<div>
  <input type="text" placeholder="Site address" bind:value={newRuleAddress} />
  <select bind:value={newRuleType}>
    {#each ruleTypes as ruleType}
      <option value={ruleType}>{ruleType}</option>
    {/each}
  </select>
  <input type="text" placeholder={newRuleType} bind:value={newValue} />
  <input type="number" bind:value={newPriority} />
  <button onclick={addNewPrivateLimit}>Add</button>
</div>

{#each limitRules as rule}
  <div>{JSON.stringify(limitRules)}</div>
{/each}
