<script setup>
import FlashCard from "../components/FlashCard.vue";
import FlashcardButton from "../components/FlashcardButton.vue";
import { ref , watch, watchEffect} from "vue";
import { useRouter } from "vue-router";
import { useFlashcard } from "../stores/flashcards";

const route = useRouter()
const cardNr = ref(1);
const flashcard = useFlashcard();
const currentDeck = ref(flashcard.decks)

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

function dotStyle(currentCard, index){
  const cardIndex = 1 + currentDeck.value.cards.indexOf(currentDeck.value.cards.filter(card => card.id === currentCard.id))
  let styleSettings = "dot "
  if (cardIndex === route.param.cardNr) {
    styleSettings += "current "
  }
  if (currentCard.hasAnswer) {
    styleSettings += "correct "
  }
  else if (!currentCard.hasAnswer){
    styleSettings += "wrong "
  }
  return styleSettings
  // if cardIndex = urlIndex => +current
  // if answerd and correct + correct
  // if answerd and incorrect + incorrect
  // else +notAnswered

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
      <div v-for="(card, index) in currentDeck.cards" :class="dotStyle(card, index)"></div>
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
  width: 12px;
  height: 12px;
}
.correct {
  background-color: #47973e;
}
.wrong {
  background-color: #973e3e;
}


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
