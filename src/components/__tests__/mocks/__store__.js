import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      lang: 'en',
      languages: {
        en: {
          id: 1,
          value: 'en',
          content: 'English',
          short: 'ENG',
          icon: 'GB',
        },
        jp: {
          id: 2,
          value: 'jp',
          content: '日本語',
          short: '日本語',
          icon: 'JP',
        },
        bd: {
          id: 3,
          value: 'bd',
          content: 'বাংলা',
          short: 'বাংলা',
          icon: 'BD',
        },
      },
    };
  },
  getters: {
    getAllLanguages(state) {
      return state.languages;
    },
    getCurrentLanguage(state) {
      return state.lang;
    },
  },
});

export default store;
