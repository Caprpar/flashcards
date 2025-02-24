<script setup>
import FlashCard from "../components/FlashCard.vue";
import FlashcardButton from "../components/FlashcardButton.vue";
</script>

<template>
  <FlashCard />
  <div class="center">
    <div class="buttons">
      <FlashcardButton color="var(--success)" text="Rätt" />
      <FlashcardButton color="var(--danger)" text="Fel" />
    </div>
  </div>
</template>

<style>
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
</style>
