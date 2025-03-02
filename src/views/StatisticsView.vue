<script setup>
  import { useFlashcard } from "../stores/flashcards";
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  import DeckStats from "../components/DeckStats.vue";

  const flashcard = useFlashcard();
  const decks = ref(flashcard.decks);
  const route = useRoute();
</script>

<template>
  <main>
    <!-- Picks deck from decks array by targeting index retrived from url (route.params.deckId) -->
    <DeckStats :deck="flashcard.decks[route.params.deckId - 1]" />
    <ul>
      <!-- Links to targeted deck by directing to decks index from url -->
      <router-link
        class="nodeco"
        v-for="deck in decks"
        :key="deck.id"
        :to="'/statistics/' + Number(decks.indexOf(deck) + 1)"
      >
        <li>{{ deck.title }}</li>
      </router-link>
    </ul>
  </main>
</template>

<style scoped>
  main {
    padding-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1em;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5em;
    padding: 0;
    justify-content: center;
    align-items: center;
    width: clamp(10em, 95%, 45em);
  }
  li:hover {
    background-color: var(--primary);
    /* outline: solid 6px var(--primary); */
    color: white;
  }
  li {
    border: solid 3px var(--primary);
    color: var(--primary);
    font-weight: bold;
    list-style-type: none;
    /* background-color: var(--primary); */
    width: fit-content;
    border-radius: 8px;
    padding: 0.1em;
    /* text-wrap: wrap; */
    overflow-wrap: anywhere;
    /* inline-size: 6em; */git
    width: 9em;
  }
  .nodeco {
    text-decoration: none;
  }
  DeckStats {
    grid-area: card;
  }
  @media screen and (min-width: 767px) {
    li {
      padding: 0.5em;
    }
  }
</style>
