import { createRouter, createWebHashHistory } from "vue-router";

import CardView from "./views/CardView.vue";
import CollectionView from "./views/CollectionView.vue";
import EditDeckView from "./views/EditDeckView.vue";
import CreateDeckView from "./views/CreateDeckView.vue";
import StatisticsView from "./views/StatisticsView.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: CardView,
      path: "/collection/:deckId/:cardNr",
      name: "/collection"
    },
    {
      component: CollectionView,
      path: "/"
    },
    {
      component: EditDeckView,
      path: "/edit"
    },
    {
      component: StatisticsView,
      path: "/statistics/:deckId"
    },
    {
      component: CreateDeckView,
      path: "/createDeck"
    }
  ]
});
