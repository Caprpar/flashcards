<script setup>
import { ref } from "vue";

async function getDecks() {
  const response = await fetch("/decks.json");
  let data = await response.json();
  decks.value = data;
}

const decks = ref([]);
getDecks();

console.log(decks.value);
</script>

<template>
  <h1>hej från flashcard</h1>
  <ol>
    <li v-for="deck in decks">{{ deck.deckName }}</li>
  </ol>
  <div class="swiper">
    <div class="swipe-wrapper">
      <div class="swiper-slide">hej</div>
      <div class="swiper-slide">hå</div>
    </div>
  </div>
</template>
