<script setup>
  import FlashCard from "../components/FlashCard.vue";
  import FlashcardButton from "../components/FlashcardButton.vue";
  import { ref, watch, watchEffect } from "vue";
  import { useRoute } from "vue-router";
  import { useFlashcard } from "../stores/flashcards";

  const route = useRoute();
  const flashcard = useFlashcard();
  const currentDeck = ref(flashcard.decks);

  function goPrevious() {
    if (cardNr.value > 1) {
      cardNr.value--;
    }
  }

  function goNext() {
    const cardAmount = currentDeck.value.cards.length;
    if (cardNr.value < cardAmount) {
      cardNr.value++;
    }
  }

  function updateDeck(deck) {
    currentDeck.value = deck;
  }

  function dotStyle(currentCard, index) {
    const cardIndex = 1 + currentDeck.value.cards.indexOf(currentCard);
    let styleSettings = "dot ";
    watchEffect(() => {
      const cardNr = parseInt(route.params.cardNr);
      if (cardIndex === cardNr) {
        styleSettings += "current ";
      }
    });
    if (currentCard.hasAnswer && !currentCard.needsPractice) {
      styleSettings += "correct ";
    } else if (currentCard.hasAnswer && currentCard.needsPractice) {
      styleSettings += "wrong ";
    }
    return styleSettings;
  }
  import FlashCard from "../components/FlashCard.vue";
  import FlashcardButton from "../components/FlashcardButton.vue";
</script>
<template>
  <main>
    <div class="card-view-container">
      <FlashCard @on-deck-update="updateDeck" />
      <div id="answer-indicator">
        <!-- <div v-for="card in currentDeck.cards" :class="card.hasAnswer == true ? 'dot wrong' : 'dot current'"></div> -->
        <div
          v-for="(card, index) in currentDeck.cards"
          :key="card.id"
          :class="dotStyle(card, index)"
        />
      </div>
      <div class="buttons-container">
        <FlashcardButton color="var(--success)" text="Rätt" />
        <FlashcardButton color="var(--danger)" text="Fel" />
      </div>
    </div>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    flex-direction: column;
  }

  .card-view-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    padding-top: 2em;
    width: clamp(9em, 95%, 43em);
  }
  .buttons-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    gap: 10px; /* Adds space between buttons */
    width: 100%; /* Ensures it fills the container */
    max-width: 700px; /* Adjust this as needed */
  }
  #answer-indicator {
    margin-top: 1em;
    justify-content: space-around;
    align-items: center;
    display: flex;
    width: 28em;
  }

  .dot {
    height: 10px;
    width: 10px;
    background-color: #adadad;
    border-radius: 100px;
  }

  .current {
    width: 15px;
    height: 15px;
  }
  .correct {
    /* background-color: #47973e; */
    background-color: var(--success);
  }
  .wrong {
    background-color: #973e3e;
    background-color: var(--danger);
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
  <style scoped > main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }

  .card-view-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    padding-top: 2em;
    width: clamp(9em, 95%, 43em);
  }
  .buttons-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    gap: 10px; /* Adds space between buttons */
    width: 100%; /* Ensures it fills the container */
    max-width: 700px; /* Adjust this as needed */
  }
</style>
