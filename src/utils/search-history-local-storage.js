const KEY = 'w_histories';

export const cacheHistory = (history) => {
  localStorage.setItem(KEY, JSON.stringify(history));
};

export const getCacheHistories = () => {
  const histories = localStorage.getItem(KEY);
  if (!histories) {
    return [];
  }
  return JSON.parse(histories);
};
