<template>
  <div class="container my-4">
    <h1 class="text-center mb-4">Multiplikationsträning</h1>
    <div
      class="deck mb-5 p-3 border rounded shadow-sm"
      v-for="(deck, deckIndex) in flashcard.decks"
      :key="deckIndex"
    >
      <h2 class="text-center mb-3">{{ deck.title }}</h2>
      <div
        class="card mb-3 p-3 border rounded"
        v-for="(card, cardIndex) in deck.cards"
        :key="card.id"
      >
        <p class="mb-2">Card: {{ cardIndex + 1 }}</p>
        <div class="mb-3">
          <label for="question-{{ card.id }}" class="form-label"
            >Question</label
          >
          <input
            id="question-{{ card.id }}"
            v-model="card.question"
            @change="savedDecks"
            class="form-control"
            type="text"
          />
        </div>
        <div class="mb-3">
          <label for="answer-{{ card.id }}" class="form-label">Answer</label>
          <input
            id="answer-{{ card.id }}"
            v-model="card.answer"
            @change="savedDecks"
            class="form-control"
            type="text"
          />
        </div>
        <b-button
          variant="danger"
          class="w-100 w-sm-25"
          @click="removeCard(deckIndex, card.id)"
        >
          Delete
        </b-button>
      </div>
      <b-button
        variant="primary"
        class="w-100 mt-3"
        @click="addCard(deckIndex)"
      >
        Add New Card
      </b-button>
    </div>
  </div>
</template>

<!-- <template>
  <div>
    <h1>Multiplikationsträning</h1>
    <div
      class="deck"
      v-for="(deck, deckIndex) in flashcard.decks"
      :key="deckIndex"
    >
      <h2>{{ deck.title }}</h2>
      <div class="card" v-for="(card, cardIndex) in deck.cards" :key="card.id">
        <p>Card: {{ cardIndex + 1 }}</p>
        <input v-model="card.question" @change="savedDecks" />
        <input v-model="card.answer" @change="savedDecks" />
        <b-button
          variant="danger"
          class="w-25"
          @click="removeCard(deckIndex, card.id)"
        >
          Delete</b-button
        >
      </div>
      <b-button variant="primary" @click="addCard(deckIndex)">
        Add New Card
      </b-button>
    </div>
  </div>
</template> -->

<script setup>
  import { ref, onMounted } from "vue";
  import { useFlashcard } from "../stores/flashcards";

  const flashcard = useFlashcard();

  // Save decks to localStorage
  function savedDecks() {
    localStorage.setItem("decks", JSON.stringify(flashcard.decks));
  }

  // Fetch decks from localStorage or dummyDecks.json
  async function getDecks() {
    const savedDecks = localStorage.getItem("decks");
    if (savedDecks) {
      flashcard.decks = JSON.parse(savedDecks);
    } else {
      flashcard.decks = flashcard.dummyDeck();
      savedDecks();
    }
    console.log("flashcard.decks:", flashcard.decks);
    // console.log(flashcard.decks.cards);
  }

  // Add a new card to a deck
  function addCard(deckIndex) {
    const deck = flashcard.decks[deckIndex];
    if (deck) {
      const newCard = flashcard.createCard("New Question", 0);
      deck.cards.push(newCard); // Add new card to deck
      savedDecks(); // Save deck to localStorage

      // deck.cards.push({
      //   title: "Ny fråga",
      //   question: "",
      //   answer: 0,
      //   needsPractice: false,
      //   id: uuidv4(),
      // });
      // deck.cards.push(flashcard.createCard("", 0));
    }
  }

  // Remove a card from a deck
  function removeCard(deckIndex, cardId) {
    const deck = flashcard.decks[deckIndex];
    if (deck) {
      deck.cards = deck.cards.filter((card) => card.id !== cardId);
      savedDecks();
    }
  }

  // Fetch decks on component mount
  onMounted(getDecks);
</script>

<style>
  .deck {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  .card {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
  }
</style>
