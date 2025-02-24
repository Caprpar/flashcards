import { createApp } from "vue";
import router from "./router";
// import "../assets/style.css";
import { createPinia } from "pinia";

import "./assets/main.css";

import App from "./App.vue";
// import "./assets/main.scss";  //? configureras i vite.config.js
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
