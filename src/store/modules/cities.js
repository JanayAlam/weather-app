import getWeatherInfo from '../../api/fetch-weather';
import {
  cacheDhaka,
  cacheMiyazaki,
  getCacheValueDhaka,
  getCacheValueMiyazaki,
} from '../../utils/caching-local-storage';

const cityModule = {
  state: () => ({
    dhaka: null,
    miyazaki: null,
    cities: {},
  }),
  mutations: {
    SET_DHAKA(state, payload) {
      state.dhaka = payload;
    },
    SET_MIYAZAKI(state, payload) {
      state.miyazaki = payload;
    },
    APPEND_CITY(state, payload) {
      state.cities[payload.key] = payload.data;
    },
    REMOVE_CITY(state, payload) {
      delete state.cities[payload];
    },
  },
  actions: {
    async fetchCities({ commit }) {
      const dhakaDataObj = getCacheValueDhaka();
      const miyazakiDataObj = getCacheValueMiyazaki();
      // DHAKA
      if (dhakaDataObj.isFetchRequired) {
        try {
          const weather = await getWeatherInfo('Dhaka');
          commit('SET_DHAKA', weather);
          cacheDhaka(weather);
        } catch (e) {
          throw new Error(e.data.error.message);
        }
      } else {
        commit('SET_DHAKA', dhakaDataObj.data);
      }

      // MIYAZAKI
      if (miyazakiDataObj.isFetchRequired) {
        try {
          const weather = await getWeatherInfo('Miyazaki');
          commit('SET_MIYAZAKI', weather);
          cacheMiyazaki(weather);
        } catch (e) {
          throw new Error(e.data.error.message);
        }
      } else {
        commit('SET_MIYAZAKI', miyazakiDataObj.data);
      }
    },
  },
  getters: {
    getDhakaWeather(state) {
      return state.dhaka;
    },
    getMiyazakiWeather(state) {
      return state.miyazaki;
    },
  },
};

export default cityModule;
