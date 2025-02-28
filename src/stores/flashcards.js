import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useFlashcard = defineStore("flashcard", {
  state: () => ({
    /** The global variable that contains all current user decks*/
    decks: []
  }),
  actions: {
    async fetchDecks() {
      const response = await fetch("/decks.json");
      this.decks = await response.json();
    },
    /** Creates a card
     * @param {String} question - The actual question
     * @param {String} answer - Flashcards answer
     * @returns Card object containing keys: question, answer, needsPractice, id
     * */
    createCard(question, answer) {
      return {
        question,
        answer,
        needsPractice: true,
        hasAnswer: false,
        id: uuidv4()
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
        stats: {
          average: 0, // Total average score 1-100%
          easiest: null, // easiest card
          hardest: null, // hardest card
          latest: 0, // latest score 1-100%
          practiceAmount: 0, // total practice amount
          sessions: [] // use sessions data to declare rest of stats
        }
      };
      // this.decks.push(deck);
      return deck;
    },
    retriveFromLocal() {
      this.decks = JSON.parse(localStorage.getItem("decks"));
    },
    saveToLocal() {
      localStorage.setItem("decks", JSON.stringify(this.decks));
    },
    pushStats(deckId, session) {
      const deck = this.getDeck(deckId);
      deck.stats.sessions.push(session);
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
        this.fillDummyData(deck);
        decks.push(deck);
      }
      return decks;
    },
    fillDummySessions(deck, amount) {
      const cards = deck.cards;
      for (let index = 0; index < amount; index++) {
        const session = [];
        for (const card of cards) {
          card.hasAnswer = true;
          card.needsPractice =
            Math.floor(Math.random() * 4) + 1 === 1 ? true : false;
          session.push(card);
        }
        deck.stats.sessions.push(session);
      }
    },
    fillDummyData(deck) {
      this.fillDummySessions(deck, 5);
      deck.stats.hardest = this.getRequiresPracticeCards(deck);
      deck.stats.easiest = this.getMasteredFlashcards(deck);
    },
    getRequiresPracticeCards(deck) {
      // return array of cards that needs practice
      let needsPracticeIds = [];
      for (const session of deck.stats.sessions) {
        for (const card of session) {
          if (card.needsPractice) {
            needsPracticeIds.push(card.id);
          }
        }
      }
      needsPracticeIds = new Set(needsPracticeIds); // Remove duplicate ids
      // retrive cards with ids from needsPractice
      let requiresPractice = [];
      Array.from(needsPracticeIds).map((id) => {
        deck.cards.filter((card) => {
          if (card.id === id) {
            requiresPractice.push(card);
          }
        });
      });
      return requiresPractice;
    },
    getMasteredFlashcards(deck) {
      // return array of cards that needs practice
      const requiresPractice = this.getRequiresPracticeCards(deck);
      // filter out cards that dont needs practice
      const masteredCards = requiresPractice.map((practiceCard) => {
        deck.cards.filter((deckCard) => practiceCard.id != deckCard.id);
      });
      return masteredCards;
    }
  },
  getters: {
    /** Get the updated deck object
     * @returns Object - current user decks
     */
    getDecks() {
      return this.decks;
    },
    getDeck(deckId) {
      return this.decks.filter((deck) => deck.id === deckId);
    },
    getEasiestCard(deck) {
      // return easiest card from sessions
    },
    getHardestCard(deck) {
      // return easiest card from sessions
    }
  }
});
