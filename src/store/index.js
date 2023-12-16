import { createStore } from 'vuex';
import language from './modules/language';

const store = createStore({
  modules: {
    language,
  },
});

export default store;
