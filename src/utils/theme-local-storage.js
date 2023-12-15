const KEY = 'theme';
const THEMES = ['light', 'dark'];

/**
 * Set theme in the local storage.
 * @param {String} theme the string that will be saved in the local storage
 */
export const setTheme = (theme) => {
  // checking if the given theme is valid or not
  theme = THEMES.includes(theme) ? theme : 'light';
  localStorage.setItem(KEY, JSON.stringify(theme));
};

/**
 * Get the theme from the local storage.
 * @returns the theme
 */
export const getTheme = () => {
  const theme = localStorage.getItem(KEY);
  return theme ? JSON.parse(theme) : 'light';
};
