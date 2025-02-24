<script setup>
import FlashCard from '../components/FlashCard.vue';

// Define the navigation methods directly
function goPrevious() {
    console.log('Previous');
    // Add your logic for going to the previous item
}

function goNext() {
    console.log('Next');
    // Add your logic for going to the next item
}
</script>

<template>
    <div class="flashcard">
        <button @click="goPrevious">⬅️</button>
        <FlashCard />
        <button @click="goNext">➡️</button>
    </div>
</template>

<style>
.flashcard {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
button {
    font-size: 24px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 8px;
}
</style>
