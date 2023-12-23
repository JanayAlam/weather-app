import { createStore } from 'vuex';
import cityModule from './modules/cities';
import languageModule from './modules/language';
import searchHistoriesModule from './modules/search-histories';

const store = createStore({
  modules: {
    language: languageModule,
    city: cityModule,
    searchHistories: searchHistoriesModule,
  },
});

export default store;
