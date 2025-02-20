<script setup>
import { ref, watch} from "vue";
import { useRoute } from "vue-router"
import { onBeforeRouteUpdate } from "vue-router"

const route = useRoute()
const decks = ref([]);
const currentDeck = ref([])
const currentCard= ref([])
let deckId = 1
let cardId = 3

async function getDecks() {
  const response = await fetch("/decks.json");
  let data = await response.json();
  decks.value = data;
}
getDecks();

onBeforeRouteUpdate(async (to, from) => {
  deckId = to.params.deckId
  cardId = to.params.cardNr
  currentDeck.value = decks.value[deckId]
  currentCard.value = currentDeck.value.cards[cardId]

  console.log(currentDeck.value, currentCard.value)

})


</script>

<template>
  <!-- Get card from url parameters -->
   <h1>{{currentDeck.title}}</h1>
  <div class="card" id="front">
    fråga: {{currentCard.question}}
  </div>
  <div class="card" id="back">
    svar: {{currentCard.answer}}
  </div>
</template>

<style scoped>
  .card {
    width: 90%;
    height: 200px;
    background-color: #f9ffef;
    box-shadow: 0 0 0 0 #000;
    border-radius: 10px;
  }
</style>
