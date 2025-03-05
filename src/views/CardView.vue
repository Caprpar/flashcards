<script setup>
  import FlashCard from "../components/FlashCard.vue";
  import { ref, watchEffect } from "vue";
  import { useRoute } from "vue-router";
  import { useFlashcard } from "../stores/flashcards";

  const route = useRoute();
  const cardNr = ref(1); // Används? Se rad 21.
  const flashcard = useFlashcard();
  const currentDeck = ref(flashcard.decks);
  const hideAnswer = ref(true);

  function updateDeck(deck) {
    currentDeck.value = deck;
  }

  // Dots under flashcard
  function dotStyle(currentCard) {
    const cardIndex = 1 + currentDeck.value.cards.indexOf(currentCard);
    let styleSettings = "dot ";
    watchEffect(() => {
      const cardNr = parseInt(route.params.cardNr); // cardNr igen?
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

  // Question first when going between cards
  function resetAnswer() {
    hideAnswer.value = true;
  }

  // Toggle answer button
  function toggleAnswer() {
    hideAnswer.value = !hideAnswer.value;
  }

  // Correct and practice toggle
  function markAsCorrect(card) {
    card.hasAnswer = true;
    card.needsPractice = false;
  }

  function markAsPractice(card) {
    card.hasAnswer = true;
    card.needsPractice = true;
  }

  // Show question toggle
  function showQuestion() {
    hideAnswer.value = true; // Göm svaret och visa frågan igen
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
      />
      <div id="answer-indicator">
        <!-- <div v-for="card in currentDeck.cards" :class="card.hasAnswer == true ? 'dot wrong' : 'dot current'"></div> -->
        <div
          v-for="card in currentDeck.cards"
          :key="card.id"
          :class="dotStyle(card)"
        />
      </div>
      <div id="button-style">
        <!-- Show answer button -->
        <b-button
          v-if="hideAnswer"
          @click="toggleAnswer"
          style="background-color: var(--secondary)"
        >
          Show Answer
        </b-button>

        <!-- Correct/practice buttons -->
        <div v-else class="answer-buttons">
          <b-button
            @click="markAsCorrect(currentDeck.cards[route.params.cardNr - 1])"
            style="background-color: var(--success)"
          >
            Correct
          </b-button>
          <b-button
            @click="showQuestion"
            style="background-color: var(--secondary); min-width: 125px"
          >
            Show Question
          </b-button>
          <b-button
            @click="markAsPractice(currentDeck.cards[route.params.cardNr - 1])"
            style="background-color: var(--danger)"
          >
            Practice
          </b-button>
        </div>
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
  }

  #button-style button {
    flex: 1;
    padding: 0.5em 0.1em;
    font-size: 1em;
    text-align: center;
    border: none !important;
  }

  .answer-buttons {
    display: flex;
    gap: 0.5em;
    width: 100%;
  }

  @media (max-width: 375px) {
    .card-view-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 90vh;
      padding-top: 2em;
      width: clamp(9em, 95%, 43em);
      font: 1em Arial, sans-serif;
    }
  }

  @media (min-width: 600px) {
    #button-style {
      margin-top: 1em;
      width: clamp(9em, 95%, 43em);
      display: flex;
      justify-content: center;
    }

    #button-style button {
      flex: 1;
      padding: 0.5em 1.5em;
      font-size: 1.1em;
      text-align: center;
      border: none !important;
    }

    .answer-buttons {
      display: flex;
      gap: 0.5em;
      width: 100%;
    }
  }
</style>
