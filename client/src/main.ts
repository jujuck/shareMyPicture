import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

const app = createApp(App);
app.use(Vue3Toastify, {
  autoClose: 1500,
  theme: "colored",
  position: "bottom-right",
} as ToastContainerOptions);

app.use(createPinia());
app.use(router);
app.mount("#app");
