const KEY = 'lang';
const LANGUAGES = ['en', 'jp', 'bd'];

/**
 * Set language in the local storage.
 * @param {String} language the string that will be saved in the local storage
 */
export const setLanguage = (language) => {
  // checking if the given language is valid or not
  language = LANGUAGES.includes(language) ? language : 'en';
  localStorage.setItem(KEY, JSON.stringify(language));
};

/**
 * Get the language from the local storage.
 * @returns the language
 */
export const getLanguage = () => {
  const language = localStorage.getItem(KEY);
  return language ? JSON.parse(language) : 'en';
};
