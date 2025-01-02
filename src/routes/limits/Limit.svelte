<script lang="ts">
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
  }
  let { limit }: Props = $props();
</script>

<span>
  <button>🗑️</button>
  {limit.limit_id}:
  {limit.address}
</span>
