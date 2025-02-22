<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect, onMounted, onBeforeUnmount} from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useFlashcard } from "../stores/flashcards";

const flashcard = useFlashcard()
const route = useRoute();
const decks = ref(flashcard.getDecks());
const currentDeck = ref([]);
const currentCard = ref([]);
const hideAnswer = ref(true);
let deckId = null;
let cardNr = null;

/** Fetch decks fron public/decks.json */
async function getDecks() {
  const response = await fetch("/decks.json");
  let data = await response.json();
  decks.value = data;
}

/** */
function revealAnswer(){
  hideAnswer.value = false
  console.log("reveal")
}

function handleKeyDown(event){
  if (event.code === "space" || event.key === " "){
    revealAnswer()
  }
}

// Update deckId and cardId when page refreshes
onMounted(async () => {
  await getDecks();

  watchEffect(
    () => [route.params.deckId, route.params.cardNr],
    (currentDeck.value = decks.value[route.params.deckId]),
    (currentCard.value = currentDeck.value.cards[route.params.cardNr]),
    console.log(currentDeck.value),
    console.log(currentCard.value)
  );

  // Create eventlistener to any keydown
  window.addEventListener("keydown", handleKeyDown)
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown)

})



// Update deckId and cardId when url changes
onBeforeRouteUpdate(async (to, from) => {
  deckId = to.params.deckId;
  cardNr = to.params.cardNr;
  currentDeck.value = decks.value[deckId];
  currentCard.value = currentDeck.value.cards[cardNr];
});

</script>
<template>
  <div id="center" tabindex="0">
    <!-- Get card from url parameters -->
    <h1>{{ currentDeck.title }}</h1>
    <div v-if="hideAnswer" class="card" id="front">fråga: {{ currentCard.question }}</div>
    <div v-else class="card" id="back">svar: {{ currentCard.answer }}</div>
  </div>
</template>

<style scoped lang="scss">
#center {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(9em, 95%, 33em);
  height: min(31em, 143vw);
  background-color: #f9ffef;
  // background-color: $light;
  box-shadow: 0 0 0 0 #000;
  border-radius: 10px;
}
</style>
