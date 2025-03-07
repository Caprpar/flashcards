<script setup>
  import { useRoute, useRouter } from "vue-router";
  import {
    ref,
    watchEffect,
    onMounted,
    onBeforeUnmount,
    defineEmits,
    computed
  } from "vue";
  import { onBeforeRouteUpdate } from "vue-router";

  import { useFlashcard } from "../stores/flashcards";

  const emit = defineEmits([
    "on-deck-update",
    "toggle-answer",
    "on-reset-answer",
    "mark-as-correct",
    "mark-as-practice"
  ]);

  const flashcard = useFlashcard();
  // console.table(flashcard.decks);
  const debug = ref(false); // When true, reveal all debug features
  const router = useRouter();
  const route = useRoute();
  const currentDeck = ref([]);
  const currentCard = ref([]);
  const cardNr = computed(() => route.params.cardNr);
  const successfulShuffle = ref(false);

  let deckId = route.params.deckId;

  let show = ref(true);

  // Variables for count
  const cardIndex = ref(0);
  const cardAmount = ref(0);

  // Key press event
  function handleKeyDown(event) {
    if (event.code === "space" || event.key === " ") {
      emit("toggle-answer");
    }
    if (event.code === "ArrowLeft" || event.key === "ArrowLeft") {
      goPrevious();
    }
    if (event.code === "ArrowRight" || event.key === "ArrowRight") {
      goNext();
    }
    if (event.code === "KeyA" || event.key === "a") {
      if (!currentCard.value.hasAnswer) {
        emit("mark-as-correct", currentCard.value);
      }
    }
    if (event.code === "KeyS" || event.key === "s") {
      if (!currentCard.value.hasAnswer) {
        emit("mark-as-practice", currentCard.value);
      }
    }
  }

  function shuffleDeck() {
    // Shuffle the deck using Fisher-Yates algorithm
    // let shuffledDeck = flashcard.decks.filter((deck) => deck.id === deckId)[0];
    let shuffledDeck;

    for (const deck of flashcard.decks) {
      if (deck.id === Number(deckId)) {
        shuffledDeck = deck;
      }
    }

    for (let i = shuffledDeck.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck.cards[i], shuffledDeck.cards[j]] = [
        shuffledDeck.cards[j],
        shuffledDeck.cards[i]
      ];
    }

    for (const deck in flashcard.decks) {
      if (deck.id === deckId) {
        deck = shuffledDeck;
      }
    }

    router.push(`/collection/${deckId}/1`);
    successfulShuffle.value = true;

    setTimeout(() => {
      successfulShuffle.value = false;
    }, 2000);
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
    emit("on-reset-answer");

    const deckId = to.params.deckId;
    const cardIndex = to.params.cardNr - 1;

    updateCurrentCard(deckId, cardIndex);

    // Send current deck to parrent
    emit("on-deck-update", currentDeck.value);
  });

  // Switch between cards
  function goPrevious() {
    if (cardNr.value > 1) {
      // change url to collection/deckId/cardNr.value
      router.push(`/collection/${deckId}/${Number(cardNr.value) - 1}`);

      // Removes focus from arrow, so that when user press space it wont flip to next card
      document.querySelectorAll(".arrow-button").forEach((button) => {
        button.blur();
      });
    }
  }

  function goNext() {
    const cardAmount = currentDeck.value.cards.length;

    if (cardNr.value < cardAmount) {
      // change url to collection/deckId/cardNr.value
      router.push(`/collection/${deckId}/${Number(cardNr.value) + 1}`);

      // Removes focus from arrow, so that when user press space it wont flip to next card
      document.querySelectorAll(".arrow-button").forEach((button) => {
        button.blur();
      });
    }
  }

  // Props show/hide buttons
  defineProps({
    hideAnswer: Boolean
  });
</script>
<template>
  <div
    v-if="successfulShuffle"
    class="shuffle-alert alert alert-success"
    role="alert"
  >
    Deck successfully shuffled!
  </div>
  <h1>{{ currentDeck.title }}</h1>
  <button v-if="debug" @click="show = !show">toggle</button>
  <!-- Reveal button to toggle animation on stats button -->
  <div class="flashcard">
    <transition name="show-stats">
      <div v-show="show" id="stats" title="Stats">
        <router-link :to="`/statistics/${deckId}`">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-bar-chart-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"
            />
          </svg>
        </router-link>
      </div>
    </transition>
    <div @click="shuffleDeck" id="shuffle" title="Shuffle Deck">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-shuffle"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
        />
        <path
          d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"
        />
      </svg>
    </div>
    <router-link :to="`${cardNr}`" tabindex="-1">
      <button
        class="arrow-button left-arrow"
        @click="goPrevious()"
        title="Previous Card"
      >
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
      <button class="arrow-button" @click="goNext" title="Next Card">
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
    font-size: 1.4em;
    font-family: sour gummy;
  }
  .show-stats-enter-active {
    transition: all 0.3s ease;
  }
  .show-stats-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .show-stats-enter, .show-stats-leave-to
  /* .show-stats-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  #stats > a:hover,
  #shuffle:hover,
  .arrow-button:hover {
    color: var(--dark);
  }
  #stats > a,
  #shuffle,
  .arrow-button,
  #count {
    color: var(--grey);
  }
  #stats {
    position: absolute;
    top: 15px;
    left: 20px;
  }
  #shuffle {
    position: absolute;
    top: 15px;
    left: 50px;
    cursor: pointer;
  }

  .shuffle-alert {
    position: absolute;
    top: 100px;
    z-index: 2;
  }
  #count {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.1em;
  }

  .arrow-button {
    background-color: var(--light);
    border: none;
    padding: 0.5em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 24px;
  }

  @media (min-width: 768px) {
    #front,
    #back {
      padding: 0 4rem;
    }
    .flashcard-content {
      font-size: 1.7em;
    }
  }
</style>
