<template>
  <div class="cardcollection" @click="handleClick">
    <h2>test{{ title }}</h2>
    <p>{{ count }} cards</p>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
// Define props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

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
  /* margin-top: 10px; */
  /* padding-top: 40px;
  padding-bottom: 0; */
  padding: 30px 0px 0px 10px;
}
.cardcollection > p {
  /* padding-top: 0; */
  padding-left: 10px;
}

.cardcollection {
  background-image: url("../assets/folder.svg");
  background-repeat: no-repeat;
  background-size: contain; /* Ensures the image fits */
  background-position: center; /* Centers the image */
  width: 150px; /* Set a width */
  height: 150px; /* Set a height */
  color: red;
  margin-left: 20px;
}
</style>
