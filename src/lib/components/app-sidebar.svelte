<script lang="ts">
  import NavDecks from "$lib/components/nav-decks.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { ComponentProps } from "svelte";
  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>
<Sidebar.Root bind:ref class="border-r-0" {...restProps}>

  <Sidebar.Content>
    <NavDecks />
  </Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>