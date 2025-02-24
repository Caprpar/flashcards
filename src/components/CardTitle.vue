<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect, onMounted, onBeforeUnmount } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useFlashcard } from "../stores/flashcards";

const flashcard = useFlashcard();
const route = useRoute();
const currentDeck = ref([]);

function handleKeyDown(event) {

}

// Update deckId and cardId when page refreshes
onMounted(async () => {
  await flashcard.fetchDecks();

  watchEffect();
});

//  Prevent duplicates of event listener
onBeforeUnmount(() => {
});

// Update deckId and cardId when url changes
onBeforeRouteUpdate(async (to, from) => {});
</script>

<template>

</template>

<style scoped>

</style>
