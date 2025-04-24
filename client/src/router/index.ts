import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import HomeView from "../pages/HomeView.vue";
import UploadView from "../pages/UploadView.vue";
import LoginView from "../pages/LoginView.vue";
import SharingView from "../pages/SharingView.vue";
import GalleryView from "../pages/GalleryView.vue";

import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

const checkAuth = (
  _: RouteLocationNormalized,
  __: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const { isAdmin } = useUserStore();
  if (isAdmin) next();
  else next("/");
};

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
    {
      path: "/gallery",
      name: "gallery",
      component: GalleryView,
      beforeEnter: [checkAuth],
    },
  ],
});

export default router;
