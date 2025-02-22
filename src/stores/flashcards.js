import { defineStore } from "pinia";

export const useFlashcard = defineStore("flashcard", {
  state: () => ({
    decks: this.getDecks(),
  }),
  actions: {},
  getters: {
    async getDecks() {
      const response = await fetch("decks.json");
      this.decks = await response.json();
    },
  },
});
