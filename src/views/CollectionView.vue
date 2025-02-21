<script setup>
// import FlashCard from '../components/FlashCard.vue';
import CardCollection from "../components/CardCollection.vue";
import { onMounted, ref } from "vue";

const decks = ref([]);
async function fetchDecks() {
  const response = await fetch("/decks.json");
  decks.value = await response.json();
  console.log(decks.value);
}
onMounted(fetchDecks);
</script>

<template>
  <div class="container">
    <!-- <FlashCard /> -->
    <router-link
      :key="deck.id"
      id="nodeco"
      v-for="(deck, index) in decks"
      :to="`/collection/${index}/0`"
    >
      <CardCollection :deck="deck" />
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
  justify-content: center;
  max-width: 20em;
}
</style>
:
