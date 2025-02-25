<script setup>
import FlashCard from '../components/FlashCard.vue';
import FlashcardButton from '../components/FlashcardButton.vue';
</script>
<template>
  <div class="card-view-container">
    <FlashCard />
    <div class="buttons-container">
      <FlashcardButton
        color="var(--success)"
        text="Rätt"
      />
      <FlashcardButton
        color="var(--danger)"
        text="Fel"
      />
    </div>
  </div>
</template>

<style scoped>
.card-view-container {
  padding-top: 2em;
  /* width: clamp(9em, 95%, 33em); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
}
.buttons-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
