<script setup>
import { ref, onMounted } from "vue";

import Swiper from "swiper";
import "swiper/css";

async function getDecks() {
  const response = await fetch("/decks.json");
  let data = await response.json();
  decks.value = data
}

const decks = ref([]);
getDecks()

console.log(decks.value);
</script>

<template>
  <h1>hej från flashcard</h1>
  <ol>
    <li v-for="deck in decks">{{ deck.deckName }}</li>
  </ol>
</template>
