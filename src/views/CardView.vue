<script setup>
import FlashCard from '../components/FlashCard.vue';
import FlashcardButton from '../components/FlashcardButton.vue';
</script>
<template>
  <main>
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
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.card-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  padding-top: 2em;
  width: clamp(9em, 95%, 43em);
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
