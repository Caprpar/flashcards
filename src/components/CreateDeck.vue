<script></script>
<template>
  <div class="cardcollection" />
</template>
<style scoped>
  .cardcollection:hover {
    transform: scale(1.05);
  }
  .cardcollection {
    transition: 0.3s;
    background-image: url("../assets/addDeck.svg");
    background-repeat: no-repeat;
    background-size: contain; /* Ensures the image fits */
    background-position: center; /* Centers the image */
    width: 150px; /* Set a width */
    height: 150px; /* Set a height */
  }
  img {
    color: var(--secondary);
    justify-self: center;
    align-self: center;
    background-color: #e1faf9;
    border-radius: 45px;
    margin-top: 40%;
  }
</style>
