import getWeatherInfo from '../../api/fetch-weather';
import {
  cacheCities,
  cacheDhaka,
  cacheMiyazaki,
  getCacheValueCities,
  getCacheValueDhaka,
  getCacheValueMiyazaki,
  removeCity,
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
      const citiesObj = getCacheValueCities();

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

      // cities
      Object.keys(citiesObj).forEach(async (key) => {
        if (citiesObj[key].isFetchRequired) {
          try {
            const weather = await getWeatherInfo(
              citiesObj[key].data.location.name
            );
            commit('APPEND_CITY', {
              key: weather.location.name,
              data: weather,
            });
            cacheCities(weather);
          } catch (e) {
            throw new Error(e.data.error.message);
          }
        } else {
          commit('APPEND_CITY', {
            key: citiesObj[key].data.location.name,
            data: citiesObj[key].data,
          });
        }
      });
    },
    /**
     * Add a new city in the store
     * @param {Object} context provided by vuex
     * @param {String} payload city's name
     */
    async addNewCity({ commit, state }, payload) {
      if (
        state.cities[payload] ||
        payload === 'Dhaka' ||
        payload === 'Miyazaki'
      ) {
        throw new Error('This city is already exist in the application');
      }
      try {
        const weather = await getWeatherInfo(payload);
        commit('APPEND_CITY', {
          key: weather.location.name,
          data: weather,
        });
        cacheCities(weather);
      } catch (e) {
        throw new Error(e.data.error.message);
      }
    },
    removeACity({ commit }, payload) {
      removeCity(payload);
      commit('REMOVE_CITY', payload);
    },
  },
  getters: {
    getDhakaWeather(state) {
      return state.dhaka;
    },
    getMiyazakiWeather(state) {
      return state.miyazaki;
    },
    getAllCitiesWeather(state) {
      return state.cities;
    },
    getAllCitiesName(state) {
      return [
        'Dhaka',
        'Miyazaki',
        'Miyazaki-Shi',
        ...Object.keys(state.cities),
      ];
    },
  },
};

export default cityModule;
