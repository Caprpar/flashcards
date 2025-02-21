import { createRouter, createWebHashHistory } from "vue-router";

import CardView from "./views/CardView.vue";
import CollectionView from "./views/CollectionView.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: CardView,
      path: "/collection/:deckId/:cardNr",
    },
    {
      component: CollectionView,
      path: "/",
    },
  ],
});
