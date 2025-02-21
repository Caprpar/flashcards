import { createApp } from "vue";
import router from "./router";
// import "../assets/style.css";


// import "../assets/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
// import "swiper/css";


import App from "./App.vue";

createApp(App).use(router).mount("#app");
