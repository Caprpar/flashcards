import { createRouter, createWebHashHistory } from "vue-router";

import CardView from "./views/CardView.vue";
import DeckView from "./views/DeckView.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: CardView,
      path: "/collection/:deckId/:cardNr",
    },
    {
      component: DeckView,
      path: "/collection",
    },
  ],
});
