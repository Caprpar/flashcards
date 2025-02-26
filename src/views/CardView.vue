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
  width: clamp(9em, 95%, 43em);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  margin: 0 auto;
}
.buttons-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px; /* Adds space between buttons */
  width: 100%; /* Ensures it fills the container */
  max-width: 700px; /* Adjust this as needed */
}
</style>
