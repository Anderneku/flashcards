<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import '@fontsource/inter'; // Defaults to 400 weight


    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  import {decks} from "$lib/store.js";
    import {currentDeck} from "$lib/store.js";
    import {onMount} from 'svelte';


    onMount(() => {
        $currentDeck = -2;
    })

   let openDeckDialog = false;
   function handleDeckDialogChange(open: boolean) {
    openDeckDialog = open;
    if (!open) {
        openDeckDialog = false;
      // You can also run cleanup or trigger effects here
    }
  }
   let openCardDialog = false;
   function handleCardDialogChange(open: boolean) {
    openCardDialog = open;
    if (!open) {
        openCardDialog = false;
      // You can also run cleanup or trigger effects here
    }
  }

  function openCardDialogBox() {
    openCardDialog = true;
  }
  function openDeckDialogBox() {
    openDeckDialog = true;
  }

  let newCardTxt = "";
  let newDeckTxt = "";

  function handleCardSubmit(){
    
  }
  function handleDeckSubmit(){
    if (newDeckTxt.trim() == ""){
        return
    }else{
        decks.update(decksArray => [...decksArray, {id: crypto.randomUUID(), name: newDeckTxt, cards: []}]);
        openDeckDialog = false;
    }
  }
  
</script>

<!-- Your app content -->
<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props}
  class="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-secondary text-white hover:bg-primary cursor-pointer size-14 p-0 flex items-center justify-center text-xl"
>
  +
</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56" align="start">
    {#if $currentDeck == -2}
        <DropdownMenu.Item disabled onclick={openCardDialogBox}>
            Add a New Card
        </DropdownMenu.Item>
    {:else}
        <DropdownMenu.Item onclick={openCardDialogBox}>
            Add a New Card
        </DropdownMenu.Item>
    {/if}
    <DropdownMenu.Item onclick={openDeckDialogBox}>
        Add a New Deck
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>


  <Dialog.Root open={openDeckDialog} onOpenChange={handleDeckDialogChange}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Add a New Deck</Dialog.Title>
      <Dialog.Description>
        Create a New Deck for New Cards
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input id="name" bind:value={newDeckTxt} class="col-span-3" />
      </div>
    </div>
    <Dialog.Footer>
      <Button onclick={handleDeckSubmit} class="cursor-pointer bg-secondary text-white hover:bg-primary hover:text-black">Add</Button>
    </Dialog.Footer>
  </Dialog.Content>

</Dialog.Root>
  <Dialog.Root open={openCardDialog} onOpenChange={handleCardDialogChange}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Add a New Card</Dialog.Title>
      <Dialog.Description>
        Create a New Card for your Deck
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input id="name" bind:value={newCardTxt} class="col-span-3" />
      </div>
    </div>
    <Dialog.Footer>
      <Button onclick={handleCardSubmit} >Add</Button>
      
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>



<div class="flex w-200 h-100 border-dotted border-8 rounded-[60px] border-secondary justify-center items-center">

    <h1 class="text-primary font-[Inter] text-6xl">Select a Deck</h1>
</div>

