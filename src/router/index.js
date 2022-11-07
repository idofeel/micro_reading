import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "微阅读",
    },
  },
  {
    path: "/center",
    name: "center",
    component: () => import("@/views/serviceCenter/serviceCenter.vue"),
    meta: {
      title: "服务大厅",
    },
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import("@/views/rank/rank.vue"),
    meta: {
      title: "借阅排行",
    },
  },
  {
    path: "/ApplyQuery",
    name: "rank",
    component: () => import("@/views/rank/rank.vue"),
    meta: {
      title: "借阅排行",
    },
  },
];

const router = createRouter({
  mode: "hash",
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

// 切换页面换title 全局的前置守卫
router.afterEach((to) => {
  //获取 document.querySelector title = 直接改掉 这么简单
  document.querySelector("title").innerText = to.meta
    ? to.meta.title
    : "微阅读";
});

export default router;
