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
  <section>
    <div id="title">
      <h1>
        {{ deck.title }}
      </h1>
      <span>average: {{ deck.stats.average }}%</span>
      <ul class="dots">
        <li
          v-for="deck in deck.stats.mastered"
          :key="deck.id"
          class="dot green"
        />
      </ul>
      <ul class="dots">
        <li
          v-for="deck in deck.stats.practice"
          :key="deck.id"
          class="dot red"
        />
      </ul>
    </div>
    <div id="info">
      <ul>
        <li>latest: {{ deck.stats.latest }}</li>
        <li>times: {{ deck.stats.practiceAmount }}</li>
      </ul>
    </div>
    <div id="cards">cards</div>
  </section>
</template>

<style scoped>
  section {
    display: grid;
    grid-template-areas:
      "title"
      "info"
      "cards";
    padding: 0.5em;
    /* box-shadow: 0 0 hsl(0, 0%, 25%); */
    border: solid;
    border-radius: 1em;
    width: clamp(10em, 95%, 45em);
    height: 20em;
  }
  #title {
    grid-area: title;
  }
  #info {
    grid-area: info;
  }
  #cards {
    grid-area: cards;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 100px;
  }
  .dots {
    display: flex;
    gap: 0.3em;
    margin-bottom: 0.2em;
  }
  .green {
    background-color: var(--success);
  }

  .red {
    background-color: var(--danger);
  }

  ul {
    padding: 0;
  }
  li {
    list-style-type: none;
  }
</style>
