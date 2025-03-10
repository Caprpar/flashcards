<script setup>
  // import FlashCard from '../components/FlashCard.vue';
  import CardCollection from "../components/CardCollection.vue";
  import CreateDeck from "../components/CreateDeck.vue";
  import { useFlashcard } from "../stores/flashcards";
  import { onMounted, ref } from "vue";
  import folderImg from "../assets/folder.svg";

  const flashcard = useFlashcard();
  const decks = ref(JSON.parse(localStorage.getItem("decks")));

  onMounted(() => {
    // const decks = ref(flashcard.dummyDeck());
  });

  async function fetchDecks() {
    const response = await fetch("/decks.json");
    decks.value = await response.json();
    console.log(decks.value);
  }
</script>

<template>
  <div class="container">
    <h1>Your Flashcard collection</h1>
    <!-- <FlashCard /> -->
    <router-link to="/createDeck">
      <CreateDeck />
    </router-link>
    <router-link
      :key="deck.id"
      id="nodeco"
      v-for="deck in decks"
      :to="`/collection/${deck.id}/1`"
    >
      <CardCollection :image="folderImg" :deck="deck" />
    </router-link>
  </div>
</template>

<style scoped>
  h1 {
    display: flex;
    font-family: sour gummy;
    color: var(--dark);
    padding-top: 0.5em;
    border-bottom: solid;
    width: 100%;
    justify-content: center;
  }
  #nodeco {
    text-decoration: none;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 35em;
  }
</style>
