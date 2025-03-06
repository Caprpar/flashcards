import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@vueuse/core";

export const useFlashcard = defineStore("flashcard", {
  state: () => ({
    /** The global variable that contains all current user decks*/
    decks: useLocalStorage("decks", []),
    dummySessions: true, // fill sessions with dummysessions
    sessionsRange: { start: 5, end: 20 }, // generates between start to end amounts of sessions
    cardRange: { start: 5, end: 20 } // generates between start to end amounts of cards when creating deck
  }),
  actions: {
    random(start, end) {
      return Math.floor(Math.random() * end + start);
    },
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
      const highestId = this.decks.length > 0 
      ? Math.max(...this.decks.map(deck => deck.id)) 
      : 0;
      const deck = {
        title,
        cards,
        id: highestId + 1,
        stats: {
          average: 0, // Total average score 1-100%
          mastered: null, // mastered cards
          practice: null, // cards need practice
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
    // saveToLocal() {
    //   localStorage.setItem("decks", JSON.stringify(this.decks));
    // },
    pushStats(deckId, session) {
      const deck = this.getDeck(deckId);
      deck.stats.sessions.push(session);
    },
    /** Generates a multiplication dummydeck 10 decks with 12 cards in each deck
     * @returns deck object
     */
    dummyDeck() {
      // let decks = [];
      const tableAmounts = 10;
      const tableLimit = 12;

      for (
        let x = 1;
        x <= this.random(this.cardRange.start, this.cardRange.end);
        x++
      ) {
        const deckTitle = `${x}:ans multiplikationstabell`;
        const deck = this.createDeck(deckTitle);

        for (
          let y = 1;
          y <= this.random(this.cardRange.start, this.cardRange.end);
          y++
        ) {
          const question = `${x} x ${y} = ?`;
          const answer = x * y;
          const card = this.createCard(question, answer);
          deck.cards.push(card);
        }
        if (this.dummySessions) {
          this.fillDummyData(deck);
        }
        this.decks.push(deck);
      }
    },
    /** Fill deck.stat.sessions with given amount of random sessions
     * @param {Object} deck deck object from createDeck()
     * @param {Number} amount amount of dummy session to generate
     */
    fillDummySessions(deck, amount) {
      const cards = deck.cards;
      let sessions = [];
      for (let index = 0; index < amount; index++) {
        let session = [];
        for (const card of cards) {
          const cardCopy = { ...card }; // duplicate card, otherwise all sessions ends up looking the same
          cardCopy.hasAnswer = true;
          // 25% to answer wrong
          cardCopy.needsPractice =
            Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
          session.push(cardCopy);
        }
        sessions.push(session);
      }
      deck.stats.sessions = sessions;
    },
    /** fill deck.stats with information using stats.sessions data
     * @param {Object} deck deck object from createDeck()
     */
    fillDummyData(deck) {
      this.fillDummySessions(
        deck,
        this.random(this.sessionsRange.start, this.sessionsRange.end)
      );
      deck.stats.practice = this.getFlashcardsByStatus(deck, "practice");
      deck.stats.mastered = this.getFlashcardsByStatus(deck, "mastered");
      deck.stats.practiceAmount = deck.stats.sessions.length;
      deck.stats.latest = this.getSessionAverage(
        deck.stats.sessions.slice(-1)[0]
      );
      deck.stats.average = this.getTotalAverage(deck.stats.sessions);
    },
    /** Returns either the cards that needs practice or cards that are masterd from latest sessions
     *
     * @param {Object} deck from createDeck()
     * @param {String} status practice / mastered
     * @param {Number} latestSessionAmount if latestSessionAmount = 2 it will only compare the last two sessions
     * @returns Card array of either mastered or cards that needs practice
     */
    getFlashcardsByStatus(deck, status = "practice", latestSessionAmount = 2) {
      // Fill masteredCardIds with all card ids, then remove id if card dont need pracice
      let flashcardIds = deck.cards.map((card) => card.id);
      for (const session of deck.stats.sessions.slice(
        latestSessionAmount * -1
      )) {
        for (const card of session) {
          if (status === "practice") {
            if (!card.needsPractice) {
              flashcardIds = flashcardIds.filter((id) => id != card.id);
            }
          } else if (status === "mastered") {
            if (card.needsPractice) {
              flashcardIds = flashcardIds.filter((id) => id != card.id);
            }
          } else {
            throw new Error(
              `status has to be either practice or mastered not: ${status} `
            );
          }
        }
      }

      flashcardIds = new Set(flashcardIds); // Remove duplicate ids
      // retrive cards with ids from needsPractice
      let filteredCards = [];

      // save cards with ids from masteredCardIds to array
      Array.from(flashcardIds).map((id) => {
        deck.cards.filter((card) => {
          if (card.id === id) {
            filteredCards.push(card);
          }
        });
      });

      return filteredCards;
    },
    /**Get sessions average score
     *
     * @param {Array} session array of cards with data from a session
     * @returns average precentage score from session
     */
    getSessionAverage(session) {
      let questions = session.length;
      let score = 0;
      session.forEach((card) => {
        score += card.needsPractice ? 0 : 1;
      });
      let average = (score / questions) * 100;
      return average.toFixed();
    },
    /** Get total average score from multiple sessions
     *
     * @param {Array} sessions Array containng multiple sessions
     * @returns average precentage score from all sessions
     */
    getTotalAverage(sessions) {
      let score = 0;
      for (const session of sessions) {
        score += Number(this.getSessionAverage(session));
      }
      return (score / sessions.length).toFixed();
    }
  },
  getters: {
    /** Get the updated deck object
     * @returns Object - current user decks
     */
    getDecks() {
      return this.decks;
    },
    getDeck: (state) => {
      (deckId) => this.decks.filter((deck) => deck.id === deckId);
    }
  }
});
