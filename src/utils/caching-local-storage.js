import { add, isBefore } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const KEY_DHAKA = 'w_dhaka';
const KEY_MIYAZAKI = 'w_miyazaki';
const KEY_CITIES = 'w_cities';

const cache = (key, data) => {
  localStorage.setItem(key, data);
};

const getIsFetchRequired = (prevDate, tzId = 'Asia/Dhaka') => {
  const prevHour = add(zonedTimeToUtc(prevDate, tzId), { hours: 1 });
  return isBefore(prevHour, new Date());
};

const getData = (data) => {
  return {
    isFetchRequired: getIsFetchRequired(
      data.current.lastUpdated,
      data.location.tzId
    ),
    data,
  };
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
  return getData(JSON.parse(data));
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
  return getData(JSON.parse(data));
};

export const cacheCities = (item) => {
  let items = JSON.parse(localStorage.getItem(KEY_CITIES));
  if (!items) {
    items = {};
  }
  items[item.location.name] = item;
  cache(KEY_CITIES, JSON.stringify(items));
};

export const getCacheValueCities = () => {
  const items = localStorage.getItem(KEY_CITIES);
  if (!items) return {};
  const cities = JSON.parse(items);
  return Object.keys(cities).map((key) => getData(cities[key]));
};

export const removeCity = (name) => {
  let items = JSON.parse(localStorage.getItem(KEY_CITIES));
  if (!items) return;
  delete items[name];
  localStorage.setItem(KEY_CITIES, JSON.stringify(items));
};
