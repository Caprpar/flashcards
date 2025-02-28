<script setup>
  import { useFlashcard } from "../stores/flashcards";
  import { ref } from "vue";
  const flashcard = useFlashcard();
  const deck = ref(flashcard.decks[0]);
  const stats = ref("in stats");
</script>

<template>
  <main>
    <h1>{{ deck.title }}</h1>
    <ul>
      <li>{{ deck.stats.average }}</li>
      <li>{{ deck.stats.latest }}</li>
      <li>Are mastered</li>
      <li v-for="card in deck.stats.mastered" :key="card.id">{{ card }}</li>
      <li>need practice</li>
      <li v-for="card in deck.stats.practice" :key="card.id">{{ card }}</li>
    </ul>
    <ul>
      <li v-for="deck in deck.stats.sessions[0]" :key="deck.id">{{ deck }}</li>
    </ul>
  </main>
</template>

<style scoped></style>
