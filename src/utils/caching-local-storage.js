import { add, isBefore } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const KEY_DHAKA = 'w_dhaka';
const KEY_MIYAZAKI = 'w_miyazaki';
// const KEY_CITIES = 'w_cities';

const cache = (key, data) => {
  localStorage.setItem(key, data);
};

const getIsFetchRequired = (prevDate, tzId = 'Asia/Dhaka') => {
  const prevHour = add(zonedTimeToUtc(prevDate, tzId), { hours: 1 });
  return isBefore(prevHour, new Date());
};

export const cacheDhaka = (data) => {
  cache(KEY_DHAKA, JSON.stringify(data));
};

export const getCacheValueDhaka = () => {
  let data = localStorage.getItem(KEY_DHAKA);
  if (!data) {
    return {
      isFetchRequired: true,
      data: null,
    };
  }
  data = JSON.parse(data);
  return {
    isFetchRequired: getIsFetchRequired(
      data.current.lastUpdated,
      data.location.tzId
    ),
    data,
  };
};

export const cacheMiyazaki = (data) => {
  cache(KEY_MIYAZAKI, JSON.stringify(data));
};

export const getCacheValueMiyazaki = () => {
  let data = localStorage.getItem(KEY_MIYAZAKI);
  if (!data) {
    return {
      isFetchRequired: true,
      data: null,
    };
  }
  data = JSON.parse(data);
  return {
    isFetchRequired: getIsFetchRequired(
      data.current.lastUpdated,
      data.location.tzId
    ),
    data,
  };
};

// export const cacheCities = (items) => {
//   cache(KEY_CITIES, JSON.stringify(items));
// };

// export const getCacheValueCities = () => {
//   const items = localStorage.getItem(KEY_CITIES);
//   return items ? JSON.parse(items) : [];
// };
