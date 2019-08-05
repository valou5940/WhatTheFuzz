import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sortType: null,
    chronicsId: [],
    chronicsList: []
  },
  getters: {
    sortToPerform(state) {
      return state.chronicsList;
    }
  },
  mutations: {
    setSortingChronics(state, type) {
      state.sortType = type;
      switch (state.sortType) {
        case 'DATE_DESC':
          state.chronicsList = state.chronicsList.sort(
            (a, b) =>
              parseFloat(new Date(a.date).getTime()) - parseFloat(new Date(b.date).getTime())
          );
          break;
        case 'DATE_ASC':
          state.chronicsList = state.chronicsList.sort(
            (a, b) =>
              parseFloat(new Date(b.date).getTime()) - parseFloat(new Date(a.date).getTime())
          );
          break;
        case 'ARTISTS_DESC':
          state.chronicsList = state.chronicsList.sort((a, b) => {
            if (a.bandName < b.bandName) {
              return -1;
            }
            if (a.bandName > b.bandName) {
              return 1;
            }
            return 0;
          });
          break;
        case 'ARTISTS_ASC':
          state.chronicsList = state.chronicsList.sort((a, b) => {
            if (b.bandName < a.bandName) {
              return -1;
            }
            if (b.bandName > a.bandName) {
              return 1;
            }
            return 0;
          });
          break;
        case 'ALBUM_ASC':
          state.chronicsList = state.chronicsList.sort((a, b) => {
            if (b.discName < a.discName) {
              return -1;
            }
            if (b.discName > a.discName) {
              return 1;
            }
            return 0;
          });
          break;
        case 'ALBUM_DESC':
          state.chronicsList = state.chronicsList.sort((a, b) => {
            if (a.discName < b.discName) {
              return -1;
            }
            if (a.discName > b.discName) {
              return 1;
            }
            return 0;
          });
          break;
        default:
          break;
      }
    },
    addChronicsId(state, chronicsId) {
      state.chronicsId = chronicsId;
    },
    addChronicsToList(state, payload) {
      state.chronicsList = payload.chronicsList;
    }
  },
  actions: {
    addChronicsId(context) {
      context.commit('addChronicsId');
    },
    addChronicsToList(context, payload) {
      context.commit('addChronicsToList', payload);
    }
  }
});

export default store;
