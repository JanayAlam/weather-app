import { getLanguage, setLanguage } from '../../utils/lang-local-storage';

const LANGUAGES = {
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
};

const languageModule = {
  state: () => ({
    lang: LANGUAGES.en.value,
    languages: { ...LANGUAGES },
  }),
  mutations: {
    CHANGE_LANGUAGE(state, payload) {
      state.lang = payload;
    },
  },
  actions: {
    fetchLanguage({ commit }) {
      // getting current language from local storage
      commit('CHANGE_LANGUAGE', getLanguage());
    },
    changeLanguage({ commit }, payload) {
      const allowedLanguages = ['en', 'jp', 'bd'];
      payload = allowedLanguages.includes(payload) ? payload : 'en';
      commit('CHANGE_LANGUAGE', payload);
      // storing the current language in the local storage
      setLanguage(payload);
    },
  },
  getters: {
    getAllLanguages(state) {
      return state.languages;
    },
    getCurrentLanguage(state) {
      return state.lang;
    },
  },
};

export default languageModule;
