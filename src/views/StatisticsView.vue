<script setup>
  import { useFlashcard } from "../stores/flashcards";
  import { ref } from "vue";
  import DeckStats from "../components/DeckStats.vue";
  const flashcard = useFlashcard();
  const decks = ref(flashcard.decks);
  const stats = ref("in stats");
</script>

<template>
  <main>
    <DeckStats :deck="flashcard.decks[0]" />
    <ul>
      <li v-for="deck in decks" :key="deck.id">{{ deck.title }}</li>
    </ul>
  </main>
</template>

<style scoped>
  main {
    padding-top: 1em;
    display: flex;
    grid-template-areas:
      "links"
      "card";
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    gap: 1em;
  }
  ul {
    display: inline-grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5em;
    padding: 0;
    justify-content: center;
    align-items: center;
    width: clamp(10em, 95%, 45em);
  }
  li {
    color: var(--light);
    font-weight: bold;
    list-style-type: none;
    background-color: var(--primary);
    width: fit-content;

    padding: 0.3em;
  }
  DeckStats {
    grid-area: card;
  }
</style>
