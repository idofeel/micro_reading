import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  mode: "hash",
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
