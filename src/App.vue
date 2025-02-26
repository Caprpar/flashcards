<script setup>
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
import FlashCard from "./components/FlashCard.vue";

import CardCollection from "./components/CardCollection.vue";
import CardView from "./views/CardView.vue";

import { useFlashcard } from "./stores/flashcards";
const flashcards = useFlashcard();

// Inits all decks
// Skapa kortlekar => [] dummy
flashcards.decks = flashcards.dummyDeck();

// console.log(flashcards.decks);
// console.log(flashcards.decks);console.log(flashcards.decks);
// If localstorage is empty, give it dummyDecks
if (!localStorage.getItem("decks")) {
  localStorage.setItem("decks", JSON.stringify(flashcards.dummyDeck()));
  alert("Gave localstorage dummydeck");
}
</script>

<template>
  <Navbar />
  <RouterView />
  <!-- <CardCollection />> -->
</template>

<style scoped></style>
