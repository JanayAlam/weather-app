import {
  cacheHistory,
  getCacheHistories,
} from '../../utils/search-history-local-storage';

const searchHistoriesModule = {
  state: () => ({
    histories: [],
  }),
  mutations: {
    SET_HISTORIES(state, payload) {
      state.histories = payload;
    },
    APPEND_HISTORIES(state, payload) {
      payload = `${payload.charAt(0).toUpperCase()}${payload.substring(
        1,
        payload.length
      )}`;
      if (state.histories.length === 0) {
        state.histories.unshift(payload);
      } else {
        if (state.histories.includes(payload)) {
          state.histories = [
            payload,
            ...state.histories.filter((h) => h !== payload),
          ];
        } else {
          if (state.histories.length < 3) {
            state.histories = [payload, ...state.histories];
          } else {
            state.histories.pop();
            state.histories = [payload, ...state.histories];
          }
        }
      }
    },
    REMOVE_HISTORIES(state, payload) {
      state.histories = state.histories.filter((h) => h !== payload);
    },
  },
  actions: {
    /**
     * Fetch search histories from the local storage and store that in the store
     * @param {Object} context provided by vuex
     */
    fetchHistories({ commit }) {
      commit('SET_HISTORIES', getCacheHistories());
    },
    /**
     * Add a new search history in the store
     * @param {Object} context provided by vuex
     * @param {String} payload searched city name
     */
    addNewHistory({ commit, state }, payload) {
      commit('APPEND_HISTORIES', payload);
      cacheHistory(state.histories);
    },
    /**
     * Remove a search history in the store
     * @param {Object} context provided by vuex
     * @param {String} payload city name which will be removed
     */
    removeAHistory({ commit, state }, payload) {
      commit('REMOVE_HISTORIES', payload);
      cacheHistory(state.histories);
    },
  },
  getters: {
    /**
     * Get the search histories
     * @param {Object} state state object provided by vuex
     * @returns {Array<String>}
     */
    getSearchHistories(state) {
      return state.histories;
    },
  },
};

export default searchHistoriesModule;
