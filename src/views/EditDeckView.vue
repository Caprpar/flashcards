<template>
  <div>
    <h1>Multiplikationsträning</h1>
    <div class="deck" v-for="(deck, index) in data" :key="index">
      {{ deck.deckName }}
      <div class="card" v-for="(card, i) in deck.flashcards" :key="i">
        <p>Q : {{ card.question }}</p>
        <p>A : {{ card.answer }}</p>
      </div>
      {{ console.log(deck.flashcards) }}
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  cardCount: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
const data = ref([]);
const router = useRouter();

function showCards() {
  // Navigation to the cards page
  router.push(props.link);
}
async function fetchDecks() {
  const response = await fetch("/decks.json");
  data.value = await response.json();
  console.log(data.value);
}
onMounted(fetchDecks);
</script>
<style></style>
