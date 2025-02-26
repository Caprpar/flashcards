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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
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
        class="arrow-button"
        @click="goNext"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
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
  width: 100%;
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
  padding: 1.5em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 24px;
}

.arrow-button:hover {
  color: #a1a1a1;
}
</style>
