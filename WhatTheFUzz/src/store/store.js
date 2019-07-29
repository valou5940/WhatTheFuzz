import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sortChronicsByArtists: false
  },
  mutations: {
    setSortingChronicsByArtist(state) {
      state = !state;
    }
  }
});

export default store;
