import { defineStore } from "pinia";
export const useCounterStore = defineStore("counter", {
  actions: {
    function() {
      //global function here
    },
  },
  state: () => ({ variable: "global variables here", anotherVariable: null }),
});
