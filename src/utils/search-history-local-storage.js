const KEY = 'w_histories';

export const cacheHistory = (item) => {
  let histories = getCacheHistories();
  if (histories.length < 3) {
    histories = [item, ...histories];
  } else {
    histories.pop();
    histories = [item, ...histories];
  }
  localStorage.setItem(KEY, JSON.stringify(histories));
};

export const getCacheHistories = () => {
  const histories = localStorage.getItem(KEY);
  if (!histories) {
    return [];
  }
  return JSON.parse(histories);
};
