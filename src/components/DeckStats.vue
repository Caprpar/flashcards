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
        <li
          v-for="deck in deck.stats.practice"
          :key="deck.id"
          class="dot red"
        />
        <li
          v-for="deck in deck.stats.neutral"
          :key="deck.id"
          class="dot grey"
        />
      </ul>
    </div>
    <div id="info">
      <ul>
        <li>latest: {{ deck.stats.latest }}</li>
        <li>times: {{ deck.stats.practiceAmount }}</li>
      </ul>
    </div>
    <div id="cards">
      <div class="card">
        {{ deck.stats.mastered[0].question }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-hand-thumbs-up-fill stamp thumbs-up"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
          />
        </svg>
      </div>
      <div class="card">
        {{ deck.stats.practice[0].question }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-hand-thumbs-down-fill stamp thumbs-down"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"
          />
        </svg>
      </div>
    </div>
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
    height: 30em;
    grid-template-rows: 1fr 1fr 3fr;
  }
  #title {
    grid-area: title;
  }
  #info {
    display: flex;
    align-items: end;
    /* border: solid; */
    grid-area: info;
  }
  #cards {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    grid-area: cards;
    gap: 1em;
  }

  .card {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--light);
    border: none;
    box-shadow: 0 0 5px 1px hsl(0, 0%, 50%);
    height: 100%;
  }
  .stamp {
    position: absolute;
    bottom: 1em;
    right: 1em;
    transform: rotate(16deg);
  }
  .thumbs-up {
    color: rgb(12, 155, 12);
  }
  .thumbs-down {
    color: rgb(182, 7, 7);
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
  .grey {
    background-color: var(--grey);
  }

  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style-type: none;
  }

  @media screen and (min-width: 768px) {
    * {
      /* border: solid; */
    }
    section {
      grid-template-areas:
        "title cards"
        "info cards";
      grid-template-columns: auto 1fr;
      grid-template-rows: none;
      height: 21em;
    }
    #cards {
      padding-left: 1em;
    }
    .stamp {
      position: absolute;
      bottom: 1em;
      right: 1em;
      transform: rotate(16deg);
    }
  }
</style>
