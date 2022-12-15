import { createStore } from "vuex";
import createPersistedstate from "vuex-persistedstate";
import { logut } from "@/api";
import { Toast } from "vant";

export default createStore({
  state: {
    openId: "",
    user: {},
  },
  mutations: {
    saveOpenId(state, data) {
      state.openId = data;
    },
    saveUser(state, data) {
      console.log("saveUser", data);
      state.user = data;
    },
  },
  actions: {
    logut({ state, commit }) {
      logut({ useropenid: state.user.openId }).then((res) => {
        if (res.status === "1") {
          Toast(res.msg || "登出失败");
        } else {
          Toast("登出成功");
        }
        commit("saveUser", {});
      });
    },
  },
  getters: {
    isLogin(state) {
      return state.user && state.user.qrcodeUrl;
    },
    userQrCode(state) {
      return state.user ? state.user.qrcodeUrl : "";
    },
  },
  modules: {},
  plugins: [
    createPersistedstate({
      key: "micro_raeading",
    }),
  ],
});
