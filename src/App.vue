<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <h1>hej</h1>
  </div>
  <RouterView />
</template>

<style lang="scss" scoped>
// @use "sass:map";

div {
  background-color: $secondary;

  h1 {
    color: $warning;
  }
}
</style>
