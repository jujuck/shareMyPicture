import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import UploadView from "../pages/UploadView.vue";
import LoginView from "../pages/LoginView.vue";
import SharingView from "../pages/SharingView.vue";

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/ton-image",
      name: "upload",
      component: UploadView,
    },
    {
      path: "/mon-espace",
      name: "login",
      component: LoginView,
    },
    {
      path: "/mon-partage/:id",
      name: "sharing",
      component: SharingView,
    },
  ],
});

export default router;
