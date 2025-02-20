import { createRouter, createWebHashHistory } from "vue-router";

import CardView from "./views/CardView.vue";
import DeckView from "./views/DeckView.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: CardView,
      path: "/collection/:deckId/:cardNr",
      // path: "/:deck",
    },
    {
      component: DeckView,
      path: "/collection",
    },
  ],
});
