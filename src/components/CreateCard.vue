<script setup>
  import { ref } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import { useFlashcard } from "../stores/flashcards";

  const flashcards = useFlashcard();

  const deckCreated = ref(false);
  const newDeck = ref(null);
  const deckName = ref("");
  const nameTaken = ref(false);
  const question = ref("");
  const answer = ref("");
  const cards = ref([]);

  // creates a deck without cards
  function nameDeck() {
    if (nameAvailable(deckName.value)) {
      newDeck.value = flashcards.createDeck(deckName.value);
      deckCreated.value = true;
      nameTaken.value = false;
      deckName.value = "";
    } else nameTaken.value = true;
  }

  // check if deck name is taken

  function nameAvailable(name) {
    const decks = JSON.parse(localStorage.getItem("decks"));

    for (const deck of decks) {
      console.log("deck: ", deck);
      console.log("deck.title: ", deck.title);

      if (deck.title === name) {
        console.log(deck.title);

        return false;
      }
    }
    return true;
  }

  // add a card to cards if there´s a question and answer
  function createCard() {
    if (question.value && answer.value) {
      const card = flashcards.createCard(question.value, answer.value);
      cards.value.push(card);
      question.value = "";
      answer.value = "";
    } else {
      // flash border on empty textarea
    }
  }

  // adds cards to deck and add it to localStorage
  function createDeck() {
    if (cards.value) {
      newDeck.value.cards = cards.value;
    }
    cards.value = [];
    let decks = localStorage.getItem("decks");
    decks = JSON.parse(decks);
    flashcards.decks = decks; // sets decks to pinia variable, otherwise card wont show up
    decks.push(newDeck.value);
    localStorage.setItem("decks", JSON.stringify(decks));
    deckCreated.value = false;
  }
</script>

<template>
  <section>
    <div v-if="!deckCreated">
      <div class="flex-container">
        <input v-model="deckName" placeholder="deck name here" />
        <button @click="nameDeck" :disabled="!deckName">
          Start building deck
        </button>
      </div>
      <p class="taken" v-show="nameTaken">
        A deck with that name already exists!
      </p>
    </div>
    <form action="" v-if="deckCreated">
      <div class="flex-container">
        <div class="text-div">
          <h2>Question</h2>
          <textarea v-model="question" placeholder="Type question here" />
        </div>

        <div class="text-div">
          <h2>Answer</h2>
          <textarea v-model="answer" placeholder="Type answer here" />
        </div>
      </div>
      <div class="button-center">
        <button @click="createCard" :disabled="!question || !answer">
          Add card
        </button>
        <button @click="createDeck" :disabled="!cards.length">
          Compile deck
        </button>
      </div>
      <p>
        "{{ newDeck.title }}" deck has <b>{{ cards.length }}</b> cards
      </p>
    </form>
  </section>
</template>

<style scoped>
  section {
    margin-top: 40px;
  }
  .flex-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  input {
    box-sizing: border-box;
    border: 2px solid var(--secondary);
    border-radius: 10px;
    background-color: var(--light);
  }
  input:focus {
    outline: none;
    border: 2px solid var(--primary);
  }
  .taken {
    color: var(--warning);
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
    width: 150px;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: var(--success);
    border: none;
  }
  p {
    color: var(--light);
    background-color: var(--info);
    margin-top: 20px;
    text-align: center;
    font-size: 1.2em;
  }
  b {
    background-color: var(--light);
    color: var(--dark);
    border-radius: 2px;
    padding: 0 5px;
  }
</style>
