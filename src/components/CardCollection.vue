<template>
  <div class="card-collection">
    <div class="cardcollection">
      <h2 v-if="deck">{{ deck.title }}</h2>
      <p v-if="deck">{{ deck.cards.length }} cards</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits, onMounted } from "vue";
  import { useRouter } from "vue-router";

  // Define props
  const props = defineProps({
    deck: {
      type: Object,
      required: false,
      default: null
    },
    image: {
      type: String,
      required: false,
      default: null
    }
  });

  const decksCard = ref([]);
  const router = useRouter();

  // Define emits to send events to the parent
  const emit = defineEmits(["getStart"]);

  // Function to navigate to a new page
  function handleClick() {
    // Emit an event to the parent
    emit("getStart", console.log("User want to start", props.title));
    router.push(`/collection/:deckId/:cardNr`); // Navigera till en dynamisk sida
  }
</script>

<style scoped>
  .cardcollection > h2 {
    padding: 30px 0px 0px 10px;
    font-size: 1rem;
  }

  .cardcollection > p {
    padding-left: 10px;
  }

  .cardcollection:hover {
    transform: scale(1.05);
  }
  .cardcollection {
    transition: 0.3s;
    background-image: url("../assets/folder.svg");
    background-repeat: no-repeat;
    background-size: contain; /* Ensures the image fits */
    background-position: center; /* Centers the image */
    width: 150px; /* Set a width */
    height: 150px; /* Set a height */
    color: #e1faf9;
  }
</style>
