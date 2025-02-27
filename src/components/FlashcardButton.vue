<script setup>
  import { defineProps } from "vue";

  const props = defineProps({
    color: { required: true, type: String },
    text: { type: String }
  });
</script>
<template>
  <button :style="`background-color: ${props.color}`">{{ props.text }}</button>
</template>
<style scoped>
  button {
    width: 48%;
    height: 50px;
    border-radius: 10px;
    border: none;
    font-weight: bold;
  }
</style>
