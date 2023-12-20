import { format, parse } from 'date-fns';

const KEY_DHAKA = 'w_dhaka';
const KEY_MIYAZAKI = 'w_miyazaki';
// const KEY_CITIES = 'w_cities';

const cache = (key, data) => {
  localStorage.setItem(key, data);
};

const getIsFetchRequired = (prevDate) => {
  //! FIX: THIS IS NOT WORKING FOR LOCAL TIMES (OTHER THAN DHAKA)
  const parsedDate = parse(prevDate, 'yyyy-MM-dd HH:mm', new Date());
  const prevHour = format(parsedDate, 'HH').toString();
  const currentHour = format(new Date(), 'HH').toString();
  return prevHour !== currentHour;
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
    isFetchRequired: getIsFetchRequired(data.current.lastUpdated),
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
    isFetchRequired: getIsFetchRequired(data.current.lastUpdated),
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
