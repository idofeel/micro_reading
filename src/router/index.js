import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/center",
    name: "center",
    component: () => import("@/views/serviceCenter/serviceCenter.vue"),
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import("@/views/rank/rank.vue"),
  },
];

const router = createRouter({
  mode: "hash",
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
