import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

const app = createApp(App);
app.use(Vue3Toastify, {
  autoClose: 1500,
  theme: "colored",
  position: "bottom-right",
} as ToastContainerOptions);

app.use(router);
app.mount("#app");
