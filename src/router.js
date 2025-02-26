import { createRouter, createWebHashHistory } from "vue-router";

import CardView from "./views/CardView.vue";
import CollectionView from "./views/CollectionView.vue";
import CreateDeckView from "./views/CreateDeckView.vue";

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
    {
      component: CreateDeckView,
      path: "/createDeck",
    },
  ],
});
