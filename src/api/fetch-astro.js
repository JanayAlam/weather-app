import axios from 'axios';
import { format } from 'date-fns';

const BASE_URL = 'http://api.weatherapi.com/v1/astronomy.json';
const API_KEY = import.meta.env.VITE_API_KEY || '';

/**
 * Fetch astronomy information from the API.
 * @param {Object} queriesObj the query object that will be passed in the url
 */
const getAstroInfo = async (queriesObj, date = new Date()) => {
  date = format(date, 'yyyy-MM-dd').toString();
  const queries = Object.keys(queriesObj).reduce((acc, cur) => {
    acc += `&${cur}=${queriesObj[cur]}`;
    return acc;
  }, '');

  const URI = `${BASE_URL}?key=${API_KEY}${queries}&dt=${date}`;
  const res = await axios.get(URI);

  const { sunrise, sunset, moonset, moonrise, moon_phase, moon_illumination } =
    res.data.astronomy.astro;
  return {
    sunrise,
    sunset,
    moonrise,
    moonset,
    moonPhase: moon_phase,
    moonIllumination: moon_illumination,
  };
};

export default getAstroInfo;
