<script lang="ts">
  import type { ZNAPI } from 'znapi/dist/common';

  type Limit = {
    limit_id: number,
    address: string,
    source: string,
    is_private: number,
    rule: string,
    value: number,
    priority: number,
  };

  interface Props {
    limit: Limit;
    znAPI: ZNAPI;
  }
  let { limit, znAPI }: Props = $props();

  const removeRule = () => {
    if (limit.is_private) {
      znAPI.removePrivateSizeLimitRule(limit.limit_id);
    } else {
      console.warn("Not implemented deleting shared limit rules");
    }
  };
</script>

<span>
  <button onclick={removeRule}>🗑️</button>
  {limit.limit_id}:
  {limit.address}
  {limit.rule} {limit.value}
  @ {limit.source} {limit.priority}
</span>
