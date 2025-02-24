<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect, onMounted, onBeforeUnmount } from "vue";
import { onBeforeRouteUpdate } from "vue-router";

import { useFlashcard } from "../stores/flashcards";

const flashcard = useFlashcard();
const dummyDeck = flashcard.dummyDeck();
console.log(dummyDeck);
const route = useRoute();
const currentDeck = ref([]);
const currentCard = ref([]);
const hideAnswer = ref(true);
let deckId = null;
let cardNr = null;

/** */
function revealAnswer() {
  hideAnswer.value = false;
  console.log("reveal");
}

function handleKeyDown(event) {
  if (event.code === "space" || event.key === " ") {
    revealAnswer();
  }
}

// Update deckId and cardId from url when page refreshes
onMounted(async () => {
  // await flashcard.fetchDecks();

  watchEffect(
    () => [route.params.deckId, route.params.cardNr],
    (currentDeck.value = flashcard.decks[route.params.deckId]),
    (currentCard.value = currentDeck.value.cards[route.params.cardNr]),
    console.log(currentDeck.value),
    console.table("card:",currentCard.value)
  );

  // Create eventlistener to any keydown
  window.addEventListener("keydown", handleKeyDown);
});

//  Prevent duplicates of event listener
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

// Update deckId and cardId when url changes
onBeforeRouteUpdate(async (to, from) => {
  deckId = to.params.deckId;
  cardNr = to.params.cardNr;
  currentDeck.value = flashcard.decks[deckId];
  currentCard.value = currentDeck.value.cards[cardNr];
});
</script>
<template>
  <div id="center" tabindex="0">
    <!-- Get card from url parameters -->
    <h1>{{ currentDeck.title }}</h1>
    <div v-if="hideAnswer" class="card" id="front">
      {{ currentCard.title }} <span id="count">1/3</span>
    </div>
    <div v-else class="card" id="back">
      {{ currentCard.answer }} <span id="count">1/3</span>
    </div>
  </div>
</template>

<style scoped>
#center {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(9em, 95%, 33em);
  height: min(31em, 143vw);
  background-color: var(--light);
  border-radius: 10px;
  box-shadow: 0px 5px 11px 4px hsl(0, 0%, 84%);
}
#count {
  position: absolute;
  top: 3%;
  right: 4%;
}
</style>
