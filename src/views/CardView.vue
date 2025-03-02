<script setup>
  import FlashCard from "../components/FlashCard.vue";
  import FlashcardButton from "../components/FlashcardButton.vue";
  import { ref, watchEffect } from "vue";
  import { useRoute } from "vue-router";
  import { useFlashcard } from "../stores/flashcards";

  const route = useRoute();
  const cardNr = ref(1);
  const flashcard = useFlashcard();
  const currentDeck = ref(flashcard.decks);

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
    <div id="answer-indicator">
      <!-- <div v-for="card in currentDeck.cards" :class="card.hasAnswer == true ? 'dot wrong' : 'dot current'"></div> -->
      <div
        v-for="(card, index) in currentDeck.cards"
        :key="card.id"
        :class="dotStyle(card, index)"
      />
    </div>
    <div class="buttons">
      <FlashcardButton color="var(--success)" text="Rätt" />
      <FlashcardButton color="var(--danger)" text="Fel" />
    </div>
  </div>
</template>

<style>
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
    background-color: var(--success);
  }
  .wrong {
    background-color: var(--danger);
  }
</style>
