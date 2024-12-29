<script lang="ts">
  interface Props {
    address: string;
  }
  let { address }: Props = $props();
</script>

<div>
  <a href="/users/{address}">{address}</a>
</div>
