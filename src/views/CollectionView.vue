<script setup>
// import FlashCard from '../components/FlashCard.vue';
import CardCollection from "../components/CardCollection.vue";
import CreateDeck from "../components/CreateDeck.vue";
import { useFlashcard } from "../stores/flashcards";
import { onMounted, ref } from "vue";

const flashcard = useFlashcard();
// Gives deck a dummyDeck with multiplication 1-12
// flashcard.decks = flashcard.dummyDeck();
const decks = ref(flashcard.decks);

onMounted(() => {
  // const decks = ref(flashcard.dummyDeck());
});

async function fetchDecks() {
  const response = await fetch("/decks.json");
  decks.value = await response.json();
  console.log(decks.value);
}
</script>

<template>
  <div class="container">
    <!-- <FlashCard /> -->
    <router-link to="/createDeck">
      <CreateDeck />
    </router-link>
    <router-link
      :key="deck.id"
      id="nodeco"
      v-for="(deck, index) in decks"
      :to="`/collection/${index + 1}/1`"
    >
      <CardCollection :image="'../assets/folder.svg'" :deck="deck" />
    </router-link>
  </div>
</template>

<style scoped>
#nodeco {
  text-decoration: none;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 35em;
}
</style>
