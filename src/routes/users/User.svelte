<script lang="ts">
  interface Props {
    address: string;
    username: string;
    comment: string;
  }
  let {
    address,
    username,
    comment,
  }: Props = $props();

  let displayName = $derived(username ?? address);

  $effect(() => {
    if (address === '13oRBYqNeUr6Tvgt4KkAT9FT4XRiKFBjnE') {
      console.log(username, comment);
    }
  });
</script>

<div>
  <a href="/users/{address}">{displayName}</a>
</div>
