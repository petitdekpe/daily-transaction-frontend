import { createStore } from "vuex";

export default createStore({
  state: {
    authenticated: false,
    token: null,
    user: null,
  },
  getters: {},
  mutations: {
    getInfo(state, info) {
      if (info.token) {
        localStorage.setItem("INFO", JSON.stringify(info));
        state.authenticated = true;
        state.token = info.token;
        state.user = info.user;
      }
    },
    removeUserInfos(state) {
      state.authenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("INFO");
    },
    persistUserData(state) {
      let info = JSON.parse(localStorage.getItem("INFO"));
      if (info) {
        state.authenticated = true;
        state.token = info.token;
        state.user = info.user;
      }
    },
  },
  actions: {},
  modules: {},
});
