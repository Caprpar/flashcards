<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const question = ref("");
const answer = ref("");
const deck = ref([]);

function createCard() {
  if (question.value && answer.value) {
    const card = {
      question: question.value,
      answer: answer.value,
      needsPractice: true,
      id: uuidv4(),
    };
    deck.value.push(card);
    question.value = "";
    answer.value = "";
    console.log(deck.value);
  } else {
    // flash border on empty textarea
  }
}
function createDeck() {}
</script>
<template>
  <form action="">
    <div class="flex-container">
      <div class="text-div">
        <h2>Question</h2>
        <textarea v-model="question"></textarea>
      </div>

      <div class="text-div">
        <h2>Answer</h2>
        <textarea v-model="answer"></textarea>
      </div>
    </div>
    <div class="button-center">
      <button @click="createCard">+</button>
      <button @click="createDeck">Done</button>
    </div>
  </form>
</template>
<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
h2 {
  text-align: center;
}
textarea {
  width: 300px;
  height: 200px;
  box-sizing: border-box;
  border: 2px solid var(--secondary);
  border-radius: 10px;
  background-color: var(--light);
  resize: none;
  text-align: center;
}
textarea:focus {
  outline: none;
  border: 2px solid var(--primary);
}
.button-center {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  border-radius: 10px;
  background-color: var(--success);
}
</style>
