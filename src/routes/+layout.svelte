<script lang="ts">
  import "../app.css";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { ModeWatcher } from "mode-watcher";
  import AppSidebar from "$lib/components/app-sidebar.svelte";

  import {decks} from "$lib/store.js";
    import {currentDeck} from "$lib/store.js";
  
  let { children } = $props();

  import { setMode } from 'mode-watcher';
  import { Separator } from "$lib/components/ui/separator";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
	setMode("dark");


	
</script>

<ModeWatcher />
 
<Sidebar.Provider>
	
	<AppSidebar />
	<Sidebar.Inset>
		<header
		class="h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex shrink-0 items-center gap-2  transition-[width,height] ease-linear"
		>
		<div class="flex w-full items-center gap-1 px-2 py-2 lg:gap-2 lg:px-6">
			<Sidebar.Trigger />
        <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Page class="line-clamp-1">
                {$currentDeck == -2 ? "No Deck Selected" : $decks[$currentDeck]?.name || "No Deck Selected"}
              </Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
		
	</div>
</header>
<main class=" h-full flex flex-col justify-center items-center">
	{@render children?.()}

</main>
</Sidebar.Inset>
</Sidebar.Provider>
