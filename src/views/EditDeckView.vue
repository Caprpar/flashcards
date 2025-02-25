<template>
  <div>
    <h1>Multiplikationsträning</h1>
    <div class="deck" v-for="(deck, deckIndex) in data" :key="deckIndex">
      <h2>{{ deck.title }}</h2>
      <div class="card" v-for="(card, cardIndex) in deck.cards" :key="card.id">
        <input v-model="card.question" @change="savedDecks" />
        <input v-model="card.answer" @change="savedDecks" />
        <button @click="removeCard(deckIndex, card.id)">Delete</button>
      </div>
      <button @click="addCard(deckIndex)">Add new card</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useFlashcard } from "../stores/flashcards";

const flashcard = useFlashcard();

const card = flashcard.createCard();

const data = ref([]);

// Save decks to localStorage
function savedDecks() {
  localStorage.setItem("decks", JSON.stringify(data.value));
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
}

// Add a new card to a deck
function addCard(deckIndex) {
  const deck = data.value[deckIndex];
  if (deck) {
    // deck.cards.push({
    //   title: "Ny fråga",
    //   question: "",
    //   answer: 0,
    //   needsPractice: false,
    //   id: uuidv4(),
    // });
    deck.cards.push(flashcard.createCard("", 0));
    savedDecks();
  }
}

// Remove a card from a deck
function removeCard(deckIndex, cardId) {
  const deck = data.value[deckIndex];
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
