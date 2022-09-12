import { createStore } from "vuex";
import createPersistedstate from "vuex-persistedstate";

export default createStore({
  state: {
    isLogin: false,
    openId: "",
  },
  mutations: {
    login(state, payload) {
      console.log("loginloginloginlogin", state.isLogin);
      state.isLogin = !!payload;
    },
    saveOpenId(state, data) {
      state.openId = data;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedstate({
      key: "micro_raeading",
    }),
  ],
});
