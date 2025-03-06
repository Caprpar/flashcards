<script setup>
  import FlashCard from "../components/FlashCard.vue";
  import { ref, watchEffect } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useFlashcard } from "../stores/flashcards";

  const router = useRouter();
  const route = useRoute();
  const flashcard = useFlashcard();
  const currentDeck = ref(flashcard.decks);
  const hideAnswer = ref(true);
  let deckId = route.params.deckId;
  const cardNr = ref(route.params.cardNr - 1);

  function updateDeck(deck) {
    currentDeck.value = deck;
  }

  // Dots under flashcards
  function dotStyle(currentCard) {
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

  function goToCard(cardIndex) {
    router.push(`/collection/${deckId}/${cardIndex + 1}`);
  }

  // Question first when going between cards
  function resetAnswer() {
    hideAnswer.value = true;
  }

  // Answer button toggle
  function toggleAnswer() {
    hideAnswer.value = !hideAnswer.value;
  }

  // Correct toggle
  function markAsCorrect(card) {
    if (!card.hasAnswer) {
      card.hasAnswer = true;
      card.needsPractice = false;
    }
  }

  function markAsPractice(card) {
    if (!card.hasAnswer) {
      card.hasAnswer = true;
      card.needsPractice = true;
    }
  }

  // Show question toggle
  function showQuestion() {
    hideAnswer.value = true;
  }
</script>
<template>
  <main>
    <div class="card-view-container">
      <FlashCard
        @on-deck-update="updateDeck"
        :hide-answer="hideAnswer"
        @toggle-answer="toggleAnswer"
        @on-reset-answer="resetAnswer"
        @mark-as-correct="markAsCorrect"
        @mark-as-practice="markAsPractice"
      />
      <div id="answer-indicator">
        <!-- <div v-for="card in currentDeck.cards" :class="card.hasAnswer == true ? 'dot wrong' : 'dot current'"></div> -->
        <div
          v-for="card in currentDeck.cards"
          :key="card.id"
          :class="dotStyle(card)"
          @click="goToCard(currentDeck.cards.indexOf(card))"
          :title="card.question"
        />
      </div>
      <!-- Button -->
      <div id="button-style">
        <!-- Correct button -->
        <b-button
          :disabled="currentDeck?.cards?.[route.params.cardNr - 1]?.hasAnswer"
          @click="markAsCorrect(currentDeck.cards[route.params.cardNr - 1])"
          style="background-color: var(--success)"
        >
          Correct
        </b-button>
        <!-- Show answer button -->
        <b-button
          v-if="hideAnswer"
          @click="toggleAnswer"
          style="background-color: var(--secondary); min-width: 125px"
        >
          Show Answer
        </b-button>
        <!-- Show question button -->
        <b-button
          v-else
          @click="showQuestion"
          style="background-color: var(--secondary); min-width: 125px"
        >
          Show Question
        </b-button>
        <!-- Practice button -->
        <b-button
          :disabled="currentDeck?.cards?.[route.params.cardNr - 1]?.hasAnswer"
          @click="markAsPractice(currentDeck.cards[route.params.cardNr - 1])"
          style="background-color: var(--danger)"
        >
          Practice
        </b-button>
      </div>
    </div>
  </main>
</template>

<style>
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
    font: Arial, sans-serif;
  }

  #answer-indicator {
    margin-top: 1em;
    justify-content: space-around;
    align-items: center;
    display: flex;
    width: 100%;
    cursor: pointer;
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
    background-color: var(--success);
  }
  .wrong {
    background-color: var(--danger);
  }

  #button-style {
    margin-top: 1em;
    width: clamp(9em, 95%, 43em);
    display: flex;
    justify-content: center;
    gap: 0.5em;
    width: 100%;
  }

  #button-style button {
    flex: 1;
    padding: 0.5em 0.1em;
    font-size: 1em;
    text-align: center;
    border: none;
  }

  @media (min-width: 375px) {
    .card-view-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 90vh;
      padding-top: 2em;
      width: clamp(9em, 95%, 43em);
    }
  }
</style>
