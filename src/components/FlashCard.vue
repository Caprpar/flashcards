<script setup>
import { useRoute } from 'vue-router';
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { useRouter } from 'vue-router';
import { useFlashcard } from '../stores/flashcards';

const flashcard = useFlashcard();
// const dummyDeck = flashcard.dummyDeck();
console.table(flashcard.decks);
const route = useRoute();
const currentDeck = ref([]);
const currentCard = ref([]);
const hideAnswer = ref(true);

// Variables for count
const cardIndex = ref(0);
const cardAmount = ref(0);
const cardNr = ref(1);

//
const router = useRouter();

// function revealAnswer() {
//   hideAnswer.value = !hideAnswer.value;
//   console.log("reveal");
// }

function handleKeyDown(event) {
  if (event.code === 'space' || event.key === ' ') {
    hideAnswer.value = !hideAnswer.value; // toggle
    console.log('reveal');
    // revealAnswer();
  }
}

/** When page reloads or new url is given, use this to update current card
 *
 * @param deckId - current active deck
 * @param cardIndex - current card index
 */
function updateCurrentCard(deckId, cardIndex) {
  currentDeck.value = flashcard.decks[deckId];
  currentCard.value = currentDeck.value.cards[cardIndex];
  updateCount(flashcard.decks[deckId], cardIndex);
}

function updateCount(deck, cardNumber) {
  cardAmount.value = deck.cards.length;
  cardIndex.value = cardNumber + 1;
  console.log(cardIndex);
}

// Update deckId and cardId from url when page refreshes
onMounted(async () => {
  watchEffect(
    () => [route.params.deckId, route.params.cardNr],
    updateCurrentCard(route.params.deckId - 1, route.params.cardNr - 1)
  );

  // Create eventlistener to any keydown
  window.addEventListener('keydown', handleKeyDown);
});

//  Prevent duplicates of event listener
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

// Update deckId and cardId when url changes
onBeforeRouteUpdate(async (to, from) => {
  const deckId = to.params.deckId - 1;
  const cardNr = to.params.cardNr - 1;
  updateCurrentCard(deckId, cardNr);
});

// Switch between cards
function goPrevious() {
  if (cardNr.value > 1) {
    cardNr.value--;
    console.log('Previous');
  }
}

function goNext() {
  if (cardNr.value < 10) {
    cardNr.value++;
    console.log('Next');
  }
  S;
}
</script>
<template>
  <h1>{{ currentDeck.title }}</h1>
  <div class="flashcard">
    <router-link :to="`${cardNr}`">
      <button
        class="arrow-button left-arrow"
        @click="goPrevious"
      >
        &#9664;
      </button>
    </router-link>
    <div
      v-if="hideAnswer"
      class="flashcard-content"
      id="front"
    >
      {{ currentCard.title }}
    </div>

    <div
      v-else
      class="flashcard-content"
      id="back"
    >
      {{ currentCard.answer }}
    </div>
    <span id="count">{{ cardIndex }}/{{ cardAmount }}</span>

    <router-link :to="`${cardNr}`">
      <button
        class="arrow-button right-arrow"
        @click="goNext"
      >
        &#9654;
      </button>
    </router-link>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flashcard {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--light);
  border-radius: 10px;
  box-shadow: 0px 5px 11px 4px hsl(0, 0%, 84%);
  flex-grow: 1;
}
.flashcard-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
#count {
  position: absolute;
  top: 15px;
  right: 20px;
}

.arrow-button {
  background-color: var(--light);
  color: #5f5f5f;
  border: none;
  padding: 2em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 24px;
}

.arrow-button:hover {
  color: #a1a1a1;
}
</style>
