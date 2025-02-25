<script setup>
import FlashCard from "../components/FlashCard.vue";
import FlashcardButton from "../components/FlashcardButton.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFlashcard } from "../stores/flashcards";

// Define the navigation methods directly

const router = useRouter();
const cardNr = ref(1);
const flashcard = useFlashcard();
const currentDeck = ref(null)

function goPrevious() {
  if (cardNr.value > 1) {
    cardNr.value--;
  }
}

function goNext() {
  const cardAmount = currentDeck.value.cards.length
  if (cardNr.value < cardAmount) {
    cardNr.value++;
  }
}

function updateDeck(deck){
  currentDeck.value = deck
}

</script>
<template>
  <div class="flashcard">
    <router-link :to="`${cardNr}`">
      <button class="arrow" @click="goPrevious">⬅️</button>
    </router-link>

    <FlashCard @on-deck-update="updateDeck" />
    <router-link :to="`${cardNr}`">
      <button class="arrow" @click="goNext">➡️</button>
    </router-link>
  </div>
  <div class="center">
    <div class="buttons">
      <FlashcardButton color="var(--success)" text="Rätt" />
      <FlashcardButton color="var(--danger)" text="Fel" />
    </div>
  </div>
</template>

<style>
.center {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.buttons {
  display: flex;
  justify-content: space-between;
  width: clamp(9em, 95%, 33em);
  margin-top: 20px;
}
.flashcard {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow {
  font-size: 24px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px;
}
</style>
