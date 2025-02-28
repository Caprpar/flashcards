<script setup>
  import { useFlashcard } from "../stores/flashcards";
  import { ref } from "vue";
  const flashcard = useFlashcard();
  const stats = ref("in stats");
</script>

<template>
  <main>
    <h1>{{ stats }}</h1>
  </main>
</template>

<style scoped></style>
