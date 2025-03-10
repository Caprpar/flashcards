<script setup>
  import FlashCard from "../components/FlashCard.vue";
  import { onMounted, ref, watchEffect } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useFlashcard } from "../stores/flashcards";

  const router = useRouter();
  const route = useRoute();
  const flashcard = useFlashcard();
  const currentDeck = ref(flashcard.decks);
  const hideAnswer = ref(true);
  const showAlert = ref(false);
  const maxPracticeRepeat = 3;
  // Check if device is a phone to determen if buttons shall contain keybind tooltip
  const isMobile = () => {
    return window.innerWidth < 768;
  };

  const correctButtonText = isMobile()
    ? "I know this one"
    : "I know this one (a)";
  const practiceButtonText = isMobile()
    ? "Practice needed"
    : "Practice needed (s)";
  const showAnswerText = isMobile() ? "Show answer" : "Show answer (space)";
  const showQuestionText = isMobile()
    ? "Show question"
    : "Show question (space)";
  let deckId = route.params.deckId;

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
    if (currentCard.isClone) {
      styleSettings += "clone ";
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

  /**
   * check if all cards hasAnswer = true
   */
  function allIsAnswered() {
    let allIsAnswer = true;
    currentDeck.value.cards.forEach((card) => {
      if (!card.hasAnswer) {
        allIsAnswer = false;
      }
    });
    return allIsAnswer;
  }

  // if session is filled and user happens to cancel alert, deck will be frozen and user will be unalbed to save the current session. so if a deck is filled when page is loaded, automaticly save that session to stats.
  onMounted(() => {
    if (allIsAnswered()) {
      exportDeckToStats();
    }
  });
  /**
   * Push current session to decks session
   * */
  function exportDeckToStats() {
    const cardsCopy = JSON.parse(
      JSON.stringify(currentDeck.value.cards.filter((card) => !card.isClone))
    );
    currentDeck.value.stats.sessions.push(cardsCopy);
    flashcard.updateStats(currentDeck.value);
    currentDeck.value.cards = currentDeck.value.cards.filter(
      (card) => !card.isClone
    );
    currentDeck.value.cards.forEach((card) => (card.hasAnswer = false));
    showAlert.value = false;
  }

  function playAgain() {
    exportDeckToStats();
  }

  // Correct toggle
  function markAsCorrect(card) {
    if (!card.hasAnswer) {
      card.hasAnswer = true;
      card.needsPractice = false;
    }
    if (allIsAnswered()) {
      showAlert.value = true;
    }
  }

  function markAsPractice(card) {
    if (!card.hasAnswer) {
      const copy = JSON.parse(JSON.stringify(card));
      copy.isClone = true;
      if (
        currentDeck.value.cards.filter((card) => card.id === copy.id).length <
        maxPracticeRepeat
      ) {
        currentDeck.value.cards.push(copy);
      }
      card.hasAnswer = true;
      card.needsPractice = true;
    }
    if (allIsAnswered()) {
      showAlert.value = true;
    }
  }

  function showStats() {
    exportDeckToStats();
    router.push(`/statistics/${deckId}`);
  }
  function goToCollection() {
    exportDeckToStats();
    router.push(`/`);
  }

  // Show question toggle
  function showQuestion() {
    hideAnswer.value = true;
  }
</script>
<template>
  <main>
    <div v-if="showAlert" class="alert alert-success" role="alert">
      <h4 class="alert-heading">Well done!</h4>
      <p>You completed your deck</p>
      <hr />
      <div class="button-style">
        <b-button style="background-color: var(--success)" @click="playAgain()">
          Play Again
        </b-button>
        <b-button
          style="background-color: var(--secondary)"
          @click="showStats()"
        >
          Go to Stats
        </b-button>
        <b-button
          style="background-color: var(--danger)"
          @click="goToCollection()"
        >
          Collection
        </b-button>
      </div>
    </div>
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
      <div class="button-style">
        <!-- Correct button -->
        <b-button
          :disabled="currentDeck?.cards?.[route.params.cardNr - 1]?.hasAnswer"
          @click="markAsCorrect(currentDeck.cards[route.params.cardNr - 1])"
          style="background-color: var(--success)"
        >
          {{ correctButtonText }}
        </b-button>
        <!-- Show answer button -->
        <b-button
          v-if="hideAnswer"
          @click="toggleAnswer"
          style="background-color: var(--secondary); min-width: 125px"
        >
          {{ showAnswerText }}
        </b-button>
        <!-- Show question button -->
        <b-button
          v-else
          @click="showQuestion"
          style="background-color: var(--secondary); min-width: 125px"
        >
          {{ showQuestionText }}
        </b-button>
        <!-- Practice button -->
        <b-button
          :disabled="currentDeck?.cards?.[route.params.cardNr - 1]?.hasAnswer"
          @click="markAsPractice(currentDeck.cards[route.params.cardNr - 1])"
          style="background-color: var(--danger)"
        >
          {{ practiceButtonText }}
        </b-button>
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
    width: clamp(9em, 92%, 43em);
    font: Arial, sans-serif;
    padding-bottom: 1.5em;
  }

  .alert {
    width: clamp(9em, 98%, 50em);
    position: fixed;
    z-index: 2;
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

  .correct {
    background-color: var(--success);
  }
  .wrong {
    background-color: var(--danger);
  }

  .clone {
    opacity: 0.5;
    border: solid 2px var(--grey);
  }
  .current {
    width: 15px;
    height: 15px;
  }

  .button-style {
    margin-top: 1em;
    width: clamp(9em, 95%, 43em);
    display: flex;
    justify-content: center;
    gap: 0.5em;
    width: 100%;
  }

  .button-style button {
    flex: 1;
    padding: 0.5em 0.1em;
    font-size: 1em;
    text-align: center;
    border: none;
  }
</style>
