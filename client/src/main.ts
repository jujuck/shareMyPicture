import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVfm } from "vue-final-modal";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

import App from "./App.vue";
import router from "./router";

import "./style.css";
import "vue-final-modal/style.css";

const app = createApp(App);
const vfm = createVfm();

app.use(Vue3Toastify, {
  autoClose: 1500,
  theme: "colored",
  position: "bottom-right",
} as ToastContainerOptions);

app.use(createPinia());
app.use(router);
app.use(vfm).mount("#app");
