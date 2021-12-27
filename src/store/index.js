import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.token ? localStorage.token : "",
    authStatus: null,
  },
  mutations: {
    setAuthStatus(state, status) {
      state.authStatus = status;
    },
    changeLogin(state, token) {
      state.token = token;
      localStorage.token = token;
    },
  },
  modules: {},
});
