import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useFlashcard = defineStore("flashcard", {
  state: () => ({
    decks: [],
    currentDeck: {},
  }),
  actions: {
    async fetchDecks() {
      const response = await fetch("/decks.json");
      this.decks = await response.json();
    },
    createCard(title, question = "", answer) {
      return {
        title,
        question,
        answer,
        needsPractice: false,
        id: uuidv4(),
      };
    },
    addToDeck(card, deckId) {
      const deck = this.decks.filter((deck) => deck.id === deckId);
      deck[0].cards.push(card);
    },
    createDeck(title, cards = []) {
      const deck = {
        title,
        cards,
        id: uuidv4(),
      };
      this.decks.push(deck);
      return deck.id;
    },
    dummyDeck() {
      let decks = [];
      const tableAmounts = 10;
      const tableLimit = 12;

      for (let x = 1; x <= tableAmounts; x++) {
        const deckTitle = `${x}:ans gånger tabell`;
        const deckId = this.createDeck(deckTitle);

        for (let y = 1; y <= tableLimit; y++) {
          const title = `${x} x ${y} = ?`;
          const answer = x * y;
          const card = this.createCard(title, "", answer);
          this.addToDeck(card, deckId);
        }
      }
      return this.decks;
    },
  },
  getters: {
    getDecks() {
      return this.decks;
    },
  },
});
