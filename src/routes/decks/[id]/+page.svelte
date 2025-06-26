<script lang="ts">
    import Flashcard from "$lib/components/flashcard.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import '@fontsource/inter'; // Defaults to 400 weight
    import { page } from '$app/stores';
    

    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    import {decks} from "$lib/store.js";
    import {currentDeck} from "$lib/store.js";


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

  let newDeckTxt = "";

  let newQuestionTxt = "";
  let newAnswerTxt = "";

  function handleCardSubmit(){
    if (newQuestionTxt.trim() !== ""){
        if (newAnswerTxt.trim() !== ""){
            const id = $page.params.id;
            decks.update(decksArray => decksArray.map(deck => deck.id === id ? {...deck, cards: [...deck.cards, {question: newQuestionTxt, answer: newAnswerTxt}]} : deck));
            openCardDialog = false;
            newQuestionTxt = "";
            newAnswerTxt = "";
            console.log("both")
        }
     } 
        
    }

  function handleDeckSubmit(){
    if (newDeckTxt.trim() == ""){
        return
    }else{
        decks.update(decksArray => [...decksArray, {id: crypto.randomUUID(), name: newDeckTxt, cards: []}]);
        openDeckDialog = false;
        newDeckTxt = "";
    }
  }

  //flashcard logic
    let flashcardIndex = 0;
    $: question = $decks[$currentDeck].cards[flashcardIndex]?.question ?? "Nope";
    $: answer = $decks[$currentDeck].cards[flashcardIndex]?.answer ?? "Nope";
	
	let showCardBack = false;	
	const toggleShowBack = () => showCardBack = !showCardBack;
	
	const prevCard = () => {
		showCardBack = false;
        if (flashcardIndex === 0) {
			flashcardIndex =  $decks[$currentDeck].cards.length - 1;
		} else {
			flashcardIndex -= 1;
		}
	}
	
	const nextCard = () => {
		showCardBack = false;
        if (flashcardIndex === $decks[$currentDeck].cards.length - 1) {
			flashcardIndex = 0;
		} else {
			flashcardIndex += 1;
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
        <Label for="question" class="text-right">Question</Label>
        <Input id="question" bind:value={newQuestionTxt} class="col-span-3" />
      </div>
    </div>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="answer" class="text-right">Answer</Label>
        <Input id="answer" bind:value={newAnswerTxt} class="col-span-3" />
      </div>
    </div>
    <Dialog.Footer>
      <Button onclick={handleCardSubmit} class="cursor-pointer bg-secondary text-white hover:bg-primary hover:text-black">Add</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>


 <!-- FLASHCARD -->
  <div class="h-[800px] rounded-4xl w-[800px] flex flex-col justify-center items-center bg-violet-600 shadow-2xs">
<div class="p-5">
    <h1 class="text-2xl font-mono">{question == "Nope" ? 0 : flashcardIndex + 1} / {$decks[$currentDeck].cards.length}</h1>
</div>

	<div class="flip-box">
		<div class="flip-box-inner" class:flip-it={showCardBack}>
			<Flashcard 
								 {answer} 
                                 {question}
								 {showCardBack} 
								 />
		</div>
	</div>
	<!-- ButtonS -->
	<div id="btn-cont" class="flex flex-row gap-5 p-5">
		<Button class="w-20 h-10 text-1xl text-center rounded-[50px] bg-secondary text-white cursor-pointer hover:text-black" onclick={prevCard}>&#8592;</Button>
		
		<Button class="w-50 h-10 rounded-[50px] bg-secondary text-white cursor-pointer hover:text-black" onclick={toggleShowBack}>
			{showCardBack ? "Hide Answer" : "Show Answer"}
		</Button>
		
		<Button class="w-20 h-10 rounded-[50px] bg-secondary text-white cursor-pointer hover:text-black" onclick={nextCard}>&#8594;</Button>
	</div>
  </div>



<style>
	
	/* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
	.flip-box {
		background-color: transparent;
		width: 600px;
		height: 400px;
        border-radius: 30px;
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
	}

	/* This container is needed to position the front and back side */
	.flip-box-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.4s;
		transform-style: preserve-3d;
        
	}

	/* Do an horizontal flip on Buttonclick */
	.flip-it {
		transform: rotateY(180deg);
	}
	

</style>