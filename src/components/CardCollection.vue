<template>
  <div class="cardcollection" @click="handleClick">
    <h2>{{ title }}</h2>
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
.cardcollection {
  background-color: #f0f0f0;
  background-image: url();
}
</style>
