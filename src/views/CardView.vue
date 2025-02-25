<script setup>
import FlashCard from "../components/FlashCard.vue";
import FlashcardButton from "../components/FlashcardButton.vue";

// Define the navigation methods directly
function goPrevious() {
  console.log("Previous");
  // Add your logic for going to the previous item
}

function goNext() {
  console.log("Next");
  // Add your logic for going to the next item
}
</script>
<template>
  <div class="flashcard">
    <button class="arrow" @click="goPrevious">⬅️</button>
    <FlashCard />
    <button class="arrow" @click="goNext">➡️</button>
  </div>
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
.flashcard {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow {
  font-size: 24px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px;
}
</style>
