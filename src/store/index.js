import { createStore } from 'vuex';
import cityModule from './modules/cities';
import language from './modules/language';

const store = createStore({
  modules: {
    language,
    city: cityModule,
  },
});

export default store;
