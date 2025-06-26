import { writable } from "svelte/store";

const isBrowser = typeof window !== "undefined";

let initialDecks =[{}]

let initialCurrentDeck = -2;

if (isBrowser) {
    const stored = localStorage.getItem("decks");
    const storedCurrentDeck = localStorage.getItem("currentDeck");

    if (stored) {
        initialDecks = JSON.parse(stored);
    }
    if (storedCurrentDeck) {
        initialCurrentDeck = JSON.parse(storedCurrentDeck);
    }
}

export const decks = writable(initialDecks);
export const currentDeck = writable(initialCurrentDeck);
if (isBrowser){

    decks.subscribe(value => {localStorage.setItem("decks", JSON.stringify(value));});
    currentDeck.subscribe(value => {localStorage.setItem("currentDeck", value.toString())})
}