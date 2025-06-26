<script lang="ts">
    import {decks} from "$lib/store.js";
    import {currentDeck} from "$lib/store.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
  import LinkIcon from "@lucide/svelte/icons/link";
  import StarOffIcon from "@lucide/svelte/icons/star-off";
  import Trash2Icon from "@lucide/svelte/icons/trash-2";
  import Separator from "./ui/separator/separator.svelte";
  const sidebar = useSidebar();

  function changeCurrentDeck(id: number){
    $currentDeck = id;
  }

  function deleteClicked(id: number) {
    decks.update(items => items.filter((deck: { id: number; }) => deck.id !== id));
  }
</script>
<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
  <Sidebar.GroupLabel>Decks</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each $decks as deck, index}
      <Sidebar.MenuItem  onclick={() => changeCurrentDeck(index)}>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a  href={`/decks/${deck.id}`} title={deck.name}>
              <span>{deck.name}</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuAction showOnHover {...props}>
                <EllipsisIcon />
                <span class="sr-only">More</span>
              </Sidebar.MenuAction>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            class="w-56 rounded-lg"
            side={sidebar.isMobile ? "bottom" : "right"}
            align={sidebar.isMobile ? "end" : "start"}
          >
            <DropdownMenu.Item>
              <StarOffIcon class="text-muted-foreground" />
              <span>Remove from Favorites</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <LinkIcon class="text-muted-foreground" />
              <span>Copy Link</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <ArrowUpRightIcon class="text-muted-foreground" />
              <span>Open in New Tab</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onclick={() => deleteClicked(deck.id)}>
              <Trash2Icon class="text-muted-foreground" />
              <span>Delete</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
      <Separator />
    {/each}

  </Sidebar.Menu>
</Sidebar.Group>