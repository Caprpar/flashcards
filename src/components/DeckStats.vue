<script setup>
  import { useFlashcard } from "../stores/flashcards";
  import { defineProps, ref, watch } from "vue";
  import { useRoute } from "vue-router";
  const flashcard = useFlashcard();

  // css variables r, b, g to give stat circles color depending on stat score
  const red = ref({ "--r": 175, "--b": 1, "--g": 1 });
  const green = ref({ "--r": 0, "--b": 143, "--g": 0 });
  const yellow = ref({ "--r": 0, "--b": 143, "--g": 0 });
  const route = useRoute();

  function toggleAnswer(type) {
    if (type === "best") {
      hideCardAnswer.value.best = !hideCardAnswer.value.best;
    } else if (type === "worst") {
      hideCardAnswer.value.worst = !hideCardAnswer.value.worst;
    }
  }

  const hideCardAnswer = ref({
    best: true,
    worst: true
  });

  const sessions = ref();

  const props = defineProps({
    deck: {
      required: true,
      type: Object
    }
  });

  // Let dot graph max show 10 latest sessions
  let dotsGraph =
    props.deck.stats.sessions.length < 10
      ? props.deck.stats.sessions
      : props.deck.stats.sessions.slice(-10);

  // Update dotgraph to current decks sessions when url changes
  watch(
    () => route.params.deckId,
    (newId, oldId) => {
      sessions.value = flashcard.decks[newId - 1].stats.sessions;
      // Let dot graph max show 10 latest sessions
      dotsGraph =
        sessions.value.length < 10 ? sessions.value : sessions.value.slice(-10);
    }
  );
</script>

<template>
  <section>
    <div id="title">
      <h1>
        {{ deck.title }}
      </h1>
      <router-link
        id="practice-link"
        :to="`/collection/${route.params.deckId}/1`"
        >Practice this deck</router-link
      >
      <!-- Draws out all sesssion history where a card answer represent a dot red or green  -->
      <div id="dots-container" v-if="deck.stats.sessions">
        <p v-if="!deck.stats.sessions[0]">Study this deck to gather data</p>
        <ul v-for="session in dotsGraph" :key="session.id" class="dots">
          <li v-for="card in session" :key="card.id" :title="card.question">
            <div v-if="card.hasAnswer && card.needsPractice" class="dot red" />
            <div
              v-else-if="card.hasAnswer && !card.needsPractice"
              class="dot green"
            />
            <div v-else class="dot grey" />
          </li>
        </ul>
      </div>
    </div>
    <!-- Displays three circles average, latest session and amount of tries,
     circles color turns either red, yellow or green depending on score-->

    <div id="info">
      <ul v-if="deck.stats.sessions[0]">
        <!-- Average: red when score < 50, yellow: score < 75, else green -->
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

        <!-- Latest session score: red when score < 50, yellow: score < 75, else green -->
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

        <!-- Tries: red when score < 5, yellow: score < 10, else green -->
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
    <!-- Displays one of players mastered card one of players toughest card -->
    <div id="cards" v-if="deck.stats.sessions[0]">
      <div
        class="card"
        v-if="deck.stats.mastered[0] && hideCardAnswer.best"
        @click="toggleAnswer('best')"
      >
        <p class="stamp thumbs-up">BRAVO!</p>
        {{ deck.stats.mastered[0].question }}
      </div>
      <div
        class="card"
        @click="toggleAnswer('best')"
        v-else-if="deck.stats.mastered[0] && !hideCardAnswer.best"
      >
        <p class="stamp thumbs-up">BRAVO!</p>
        {{ deck.stats.mastered[0].answer }}
      </div>
      <div
        class="card"
        @click="toggleAnswer('worst')"
        v-if="deck.stats.practice[0] && hideCardAnswer.worst"
      >
        <p class="stamp thumbs-down">PRACTICE NEEDED..</p>
        {{ deck.stats.practice[0].question }}
<<<<<<< HEAD
      </div>
      <div
        class="card"
        @click="toggleAnswer('worst')"
        v-if="deck.stats.practice[0] && !hideCardAnswer.worst"
      >
        <p class="stamp thumbs-down">PRACTICE NEEDED..</p>
        {{ deck.stats.practice[0].answer }}
=======
>>>>>>> 3d2d90c (replace thumbs up and down with text 'bravo' and 'practice needed')
      </div>
      <div
        class="card"
        @click="toggleAnswer('worst')"
        v-if="deck.stats.practice[0] && !hideCardAnswer.worst"
      >
        <p class="stamp thumbs-down">PRACTICE NEEDED..</p>
        {{ deck.stats.practice[0].answer }}
      </div>
    </div>
  </section>
</template>

<style scoped>
  /* * {
    border: solid;
  } */
  section {
    display: grid;
    grid-template-areas:
      "title info"
      "cards cards"; /* padding: 0.9em; */
    /* box-shadow: 0 0 hsl(0, 0%, 25%); */
    /* border: solid; */
    border-bottom: dotted var(--dark);
    border-radius: 1em;
    width: clamp(1em, 86%, 49em);
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }
  h1 {
    /* border-bottom: dashed var(--dark); */
    padding-bottom: 0.4em;
    text-wrap: wrap;
    overflow-wrap: anywhere;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  #practice-link {
    margin: 1em 0;
  }
  #title {
    grid-area: title;
    display: flex;
    flex-direction: column;
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

  .card {
    font-family: sour gummy;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--light);
    border: none;
    box-shadow: 0 0 3px 0px hsl(0, 0%, 50%);
    height: 100%;
    font-size: 1.3em;
    user-select: none;
  }
  .stamp {
    font-weight: bold;
    position: absolute;
    display: flex;
    justify-content: center;
    /* border: solid; */
    top: 0em;
    right: 0em;
    opacity: 0.7;
    font-family: tourney;
    font-size: 1.5em;
    /* transform: rotate(-28deg); */
  }
  .thumbs-up {
    color: #166200;
  }
  .thumbs-down {
    color: #b00012;
  }

  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style-type: none;
  }

  @media screen and (min-width: 768px) {
    /* * {
      border: solid;
    } */

    h1 {
      /* border-bottom: dashed var(--dark); */
      inline-size: 10em;
    }

    button {
      height: 4em;
      width: 11em;
    }
    section {
      grid-template-areas:
        "title cards"
        "info cards";
      grid-template-columns: auto 1fr;
      grid-template-rows: none;
      /* height: 21em; */
      /* grid-template-rows: 1fr 9em; */
      grid-template-columns: 1fr 1.5fr;
      grid-template-rows: 1fr 10em;
      padding-bottom: 1em;
    }
    #title {
      padding-bottom: 0;
      /* align-items: center; */
    }
    #cards {
      padding-left: 1em;
    }
    .stamp {
      left: 0;
      /* transform: rotate(16deg); */
    }
    .stat {
      width: 5em;
      height: 5em;
    }
    #info > ul {
      justify-content: space-around;
      align-items: center;
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
