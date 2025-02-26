import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useFlashcard = defineStore("flashcard", {
  state: () => ({
    /** The global variable that contains all current user decks*/
    decks: [],
  }),
  actions: {
    async fetchDecks() {
      const response = await fetch("/decks.json");
      this.decks = await response.json();
    },
    /** Creates a card
     * @param {String} title - Title to card question
     * @param {String} question - The actual question
     * @param {String} answer - Flashcards answer
     * @returns Card object
     */
    createCard(question, answer) {
      return {
        question,
        answer,
        needsPractice: false,
        isAnswerd: false,
        id: uuidv4(),
      };
    },
    /** Add new card object to a deck using deck ID
     * @param {Object} card - has keys question, answer, needsPractice, id
     * @param {*} deckId - Deck id to which deck the card should be added to
     */
    addToDeck(card, deckId) {
      const deck = this.decks.filter((deck) => deck.id === deckId);
      deck[0].cards.push(card);
    },
    /** Creates a deck from array of cards with title
     * @param {String} title The name of the deck
     * @param {Array} cards Array of card objects
     * @returns deck object.
     */
    createDeck(title, cards = []) {
      const deck = {
        title,
        cards,
        id: uuidv4(),
      };
      // this.decks.push(deck);
      return deck;
    },
    /** Generates a multiplication dummydeck 10 decks with 12 cards in each deck
     * @returns deck object
     */
    dummyDeck() {
      let decks = [];
      const tableAmounts = 10;
      const tableLimit = 12;

      for (let x = 1; x <= tableAmounts; x++) {
        const deckTitle = `${x}:ans gånger tabell`;
        const deck = this.createDeck(deckTitle);

        for (let y = 1; y <= tableLimit; y++) {
          const question = `${x} x ${y} = ?`;
          const answer = x * y;
          const card = this.createCard(question, answer);
          deck.cards.push(card);
        }
        decks.push(deck);
      }
      return decks;
    },
  },
  getters: {
    /** Get the updated deck object
     * @returns Object - current user decks
     */
    getDecks() {
      return this.decks;
    },
  },
});
