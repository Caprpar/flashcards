import { defineStore } from "pinia";

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
    createCard(title, question, answer) {
      return {
        title,
        question,
        answer,
        needsPractice: false,
        id: Date.now(),
      };
    },
    addToDeck(card, deckId) {
      this.decks.filter((deck) => deck.id === deckId).cards.push(card);
    },
    createDeck(title, cards) {
      this.decks.push({
        title,
        cards,
        id: Date.now(),
      });
    },
  },
  getters: {
    // getters
  },
});
