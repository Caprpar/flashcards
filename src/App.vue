<script setup>
import { RouterView } from "vue-router";
import FlashCard from "./components/FlashCard.vue";

import CardCollection from "./components/CardCollection.vue";
import CardView from "./views/CardView.vue";

import { useFlashcard } from "./stores/flashcards";
const flashcards = useFlashcard()

// Inits all decks
// Skapa kortlekar => [] dummy
flashcards.decks = flashcards.dummyDeck()

console.log(flashcards.decks)





</script>

<template>
  <RouterView />
  <!-- <CardCollection />> -->
</template>

<style scoped>


</style>
