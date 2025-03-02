<script setup>
  import { useFlashcard } from "../stores/flashcards";
  import { defineProps, ref } from "vue";
  const flashcard = useFlashcard();

  const red = ref({ "--r": 175, "--b": 1, "--g": 1 });
  const green = ref({ "--r": 0, "--b": 143, "--g": 0 });
  const yellow = ref({ "--r": 0, "--b": 143, "--g": 0 });

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
      <!-- Draws out all sessions progress -->
      <ul
        v-for="session in props.deck.stats.sessions"
        :key="session.id"
        class="dots"
      >
        <li v-for="card in session" :key="card.id">
          <div v-if="card.hasAnswer && card.needsPractice" class="dot green" />
          <div
            v-else-if="card.hasAnswer && !card.needsPractice"
            class="dot red"
          />
          <div v-else class="dot grey" />
        </li>
      </ul>
    </div>
    <div id="info">
      <ul>
        <li>
          <p class="stat-title">Average</p>
          <p class="stat" v-if="deck.stats.average < 50" :style="red">
            {{ deck.stats.average }}%
          </p>
          <p class="stat" v-else-if="deck.stats.average >= 75" :style="green">
            {{ deck.stats.average }}%
          </p>
          <p class="stat" v-else>{{ deck.stats.average }}%</p>
        </li>

        <li>
          <p class="stat-title">Latest</p>
          <p class="stat" v-if="deck.stats.latest < 50" :style="red">
            {{ deck.stats.latest }}%
          </p>
          <p class="stat" v-else-if="deck.stats.latest >= 75" :style="green">
            {{ deck.stats.latest }}%
          </p>
          <p class="stat" v-else>{{ deck.stats.latest }}%</p>
        </li>

        <li>
          <p class="stat-title">Tries</p>
          <p class="stat" v-if="deck.stats.practiceAmount < 5" :style="red">
            x{{ deck.stats.practiceAmount }}
          </p>
          <p
            class="stat"
            v-else-if="deck.stats.practiceAmount > 10"
            :style="green"
          >
            x{{ deck.stats.practiceAmount }}
          </p>
          <p class="stat" v-else>x{{ deck.stats.practiceAmount }}</p>
        </li>
      </ul>
    </div>
    <div id="cards">
      <div class="card" v-if="deck.stats.mastered[0]">
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
      <div class="card" v-if="deck.stats.practice[0]">
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
  * {
    /* border: solid; */
  }
  section {
    display: grid;
    grid-template-areas:
      "title info"
      "cards cards";
    padding: 0.9em;
    /* box-shadow: 0 0 hsl(0, 0%, 25%); */
    /* border: solid; */
    border-bottom: dotted var(--dark);
    border-radius: 1em;
    width: clamp(10em, 95%, 45em);
    grid-template-rows: 1fr 18em;
  }
  h1 {
    /* border-bottom: dashed var(--dark); */
    padding-bottom: 0.4em;
  }
  #title {
    grid-area: title;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 1em;
    /* border-bottom: solid 1px #707070; */
  }
  .dot {
    width: 2.3vw;
    height: 2.3vw;
    border-radius: 100px;
  }
  .dots {
    display: flex;
    justify-content: space-around;
    width: fit-content;
    gap: 0.3em;
    gap: 6px;
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
  .stat-title {
    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;
    grid-area: title;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
  .stat {
    /* Standard color are yellow, change rbg with :style="" in element to set customised color */
    --r: 172;
    --b: 91;
    --g: 44;
    --color: rgb(var(--r), var(--b), var(--g));
    --color-o: rgb(var(--r), var(--b), var(--g), 27%);
    padding: 0;
    margin: 0;
    grid-area: stat;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    width: clamp(13vw, 5em, 6em);
    height: clamp(13vw, 13vw, 15px);
    background-color: var(--color-o);
    border: double 0.4em var(--color);
    color: var(--color);
    border-radius: 1000px;
  }

  #info > ul > li {
    padding: 0;
    margin: 0;
    margin-left: 0.4em;
    display: grid;
    grid-template-areas:
      "stat"
      "title";
  }
  #info > ul {
    display: flex;
    flex-wrap: wrap;
    width: clamp(1em, 100%, 29em);
    height: 100%;
    align-items: center;
    justify-content: end;
  }
  #info {
    grid-area: info;
    display: flex;
    padding: 0 1em;
    justify-content: center;
  }
  #cards {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    grid-area: cards;
    /* height: clamp(10em, 100%, 16em);
    height: 17em;
    height: 20em; */
    height: 100%;
    gap: 1em;
    flex-grow: 1;
    padding-top: 1em;
  }

  .card:hover {
    /* transform: scale(1.1); */
    /* cursor: pointer; */
  }
  .card {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--light);
    border: none;
    box-shadow: 0 0 3px 0px hsl(0, 0%, 50%);
    height: 100%;
  }
  .stamp {
    position: absolute;
    bottom: 1em;
    right: 1em;
    transform: rotate(16deg);
  }
  .thumbs-up {
    color: rgb(0, 189, 0);
  }
  .thumbs-down {
    color: rgb(204, 1, 1);
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
      /* height: 21em; */
      grid-template-rows: 1fr 9em;
      grid-template-columns: 1fr 1.5fr;
    }
    #title {
      padding-bottom: 0;
      /* align-items: center; */
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
    .stat {
      width: 5em;
      height: 5em;
    }
    #info > ul {
      justify-content: space-around;
      align-items: center;
      height: ;
    }
    #info {
      display: flex;
      padding: 1em 0;
      /* border: solid; */
      grid-area: info;
    }
    .dot {
      width: 10px;
      height: 10px;
    }
  }
</style>
