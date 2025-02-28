<script setup>
  import { useFlashcard } from "../stores/flashcards";
  import { defineProps } from "vue";
  const flashcard = useFlashcard();

  const props = defineProps({
    deck: {
      required: true,
      type: Object
    }
  });
</script>

<template>
  <section>{{ deck.title }}</section>
</template>

<style scoped>
  section {
    padding: 1em;
    /* box-shadow: 0 0 hsl(0, 0%, 25%); */
    border: solid;
    border-radius: 1em;
    width: clamp(10em, 95%, 45em);
    height: 20em;
  }
</style>
