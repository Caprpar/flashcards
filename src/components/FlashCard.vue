<script setup>
  import { useRoute, useRouter } from "vue-router";
  import {
    ref,
    watchEffect,
    onMounted,
    onBeforeUnmount,
    defineEmits
  } from "vue";
  import { onBeforeRouteUpdate } from "vue-router";

  import { useFlashcard } from "../stores/flashcards";

  const emit = defineEmits(["on-deck-update"]);

  const flashcard = useFlashcard();
  // console.table(flashcard.decks);
  const router = useRouter();
  const route = useRoute();
  const currentDeck = ref([]);
  const currentCard = ref([]);
  const hideAnswer = ref(true);
  const cardNr = ref(route.params.cardNr - 1);
  let deckId = route.params.deckId;

  // Variables for count
  const cardIndex = ref(0);
  const cardAmount = ref(0);

  function handleKeyDown(event) {
    if (event.code === "space" || event.key === " ") {
      hideAnswer.value = !hideAnswer.value; // toggle
    }
    if (event.code === "ArrowLeft" || event.key === "ArrowLeft") {
      goPrevious();
    }
    if (event.code === "ArrowRight" || event.key === "ArrowRight") {
      goNext();
    }
  }

  /** When page reloads or new url is given, use this to update current card
   *
   * @param deckId - current active deck
   * @param cardIndex - current card index
   */
  function updateCurrentCard(deckId, cardIndex) {
    deckId = Number(deckId);
    cardIndex = Number(cardIndex);
    currentDeck.value = flashcard.decks.filter((deck) => deck.id === deckId)[0];
    // currentDeck.value = JSON.parse(localStorage.getItem("decks"))[deckId];
    currentCard.value = currentDeck.value.cards[cardIndex];
    updateCount(currentDeck.value, cardIndex);
  }

  function updateCount(deck, cardNumber) {
    cardAmount.value = deck.cards.length;
    cardIndex.value = cardNumber + 1;
  }

  // Update deckId and cardId from url when page refreshes
  onMounted(async () => {
    watchEffect(
      () => [route.params.deckId, route.params.cardNr],
      updateCurrentCard(route.params.deckId, route.params.cardNr - 1),

      // Send current deck to parrent
      emit("on-deck-update", currentDeck.value)
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
    // Hides answer when player press next or previous button
    hideAnswer.value = true;

    deckId = to.params.deckId;
    const cardNr = to.params.cardNr - 1;
    updateCurrentCard(deckId, cardNr);

    // Send current deck to parrent
    emit("on-deck-update", currentDeck.value);
  });

  // Switch between cards
  function goPrevious(previous) {
    if (cardNr.value > 1) {
      cardNr.value--;
      // change url to collection/deckId/cardNr.value
      router.push({
        name: "/collection",
        params: {
          deckId,
          cardNr: cardNr.value
        }
      });
      // Removes focus from arrow, so that when user press space it wont flip to next card
      document.querySelectorAll(".arrow-button").forEach((button) => {
        button.blur();
      });
    }
  }

  function goNext() {
    const cardAmount = currentDeck.value.cards.length;
    if (cardNr.value < cardAmount) {
      cardNr.value++;
      // change url to collection/deckId/cardNr.value
      router.push({
        name: "/collection",
        params: {
          deckId,
          cardNr: cardNr.value
        }
      });
      // Removes focus from arrow, so that when user press space it wont flip to next card
      document.querySelectorAll(".arrow-button").forEach((button) => {
        button.blur();
      });
    }
  }
</script>
<template>
  <h1>{{ currentDeck.title }}</h1>
  <div class="flashcard">
    <router-link :to="`${cardNr}`" tabindex="-1">
      <button class="arrow-button left-arrow" @click="goPrevious(cardNr)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="24"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
      </button>
    </router-link>
    <div v-if="hideAnswer" class="flashcard-content" id="front">
      {{ currentCard.question }}
    </div>

    <div v-else class="flashcard-content" id="back">
      {{ currentCard.answer }}
    </div>
    <span id="count">{{ cardIndex }}/{{ cardAmount }}</span>

    <router-link :to="`${cardNr}`" tabindex="-1">
      <button class="arrow-button" @click="goNext">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="24"
          fill="currentColor"
          class="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
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
    font-size: 1em;
  }
  #count {
    position: absolute;
    top: 15px;
    right: 20px;
    color: var(--grey);
    font-size: 1.1em;
  }

  .arrow-button {
    background-color: var(--light);
    color: var(--grey);
    border: none;
    padding: 0.5em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 24px;
  }

  .arrow-button:hover {
    color: var(--grey-hover);
  }
  @media (min-width: 768px) {
    #front,
    #back {
      padding: 0 4rem;
    }
    .flashcard-content {
      font-size: 1.3em;
    }
  }
</style>
