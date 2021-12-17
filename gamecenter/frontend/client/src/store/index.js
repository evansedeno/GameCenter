import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: false,
    token: false,
    partie: false,
  },
  mutations: {
    setUser(state, user){
      state.user = user;
    },
    setToken(state, token){
      state.token = token;
    },
    setPartie(state, partie) {
      state.partie = partie;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin],
})
