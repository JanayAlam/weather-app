import axios from 'axios';
import { format } from 'date-fns';
import convertConditionCodes from '../utils/convert-condition-codes';
import getAstroInfo from './fetch-astro';

const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json';
const API_KEY = import.meta.env.VITE_API_KEY || '';

/**
 * Fetch astronomy information from the API.
 * @param {String} locationStr the query object that will be passed in the url
 */
const getWeatherInfo = async (locationStr, date = new Date()) => {
  date = format(date, 'yyyy-MM-dd').toString();
  const URI = `${BASE_URL}?key=${API_KEY}&q=${locationStr}&days=8&aqi=yes&alerts=yes`;

  try {
    const res = await axios.get(URI);
    const astro = await getAstroInfo({ q: locationStr });

    const location = {
      name: res.data.location.name,
      region: res.data.location.region,
      country: res.data.location.country,
      lat: res.data.location.lat,
      lon: res.data.location.lon,
      tzId: res.data.location.tz_id,
    };

    const current = {
      lastUpdated: res.data.current.last_updated,
      temp: {
        c: res.data.current.temp_c,
        f: res.data.current.temp_f,
      },
      isDay: res.data.current.is_day,
      condition: {
        code: res.data.current.condition.code,
        icon: res.data.current.condition.icon,
        text: convertConditionCodes(
          res.data.current.condition.code,
          res.data.current.is_day
        ),
      },
      wind: {
        speed: res.data.current.wind_kph,
        degree: res.data.current.wind_degree,
        direction: res.data.current.wind_dir,
      },
      pressure: res.data.current.pressure_mb,
      humidity: res.data.current.humidity,
      cloud: res.data.current.cloud,
      feelsLike: {
        c: res.data.current.feelslike_c,
        f: res.data.current.feelslike_f,
      },
      visibility: res.data.current.vis_km,
      uv: res.data.current.uv,
      windGust: res.data.current.gust_kph,
      airQuality: {
        co: res.data.current.air_quality.co,
        no2: res.data.current.air_quality.no2,
        o3: res.data.current.air_quality.o3,
        so2: res.data.current.air_quality.so2,
        pm2_5: res.data.current.air_quality.pm2_5,
        pm10: res.data.current.air_quality.pm10,
        usEpaIndex: res.data.current.air_quality['us-epa-index'],
        gbDefraIndex: res.data.current.air_quality['gb-defra-index'],
      },
      astro,
    };

    const forecasts = res.data.forecast.forecastday.map((ele) => {
      return {
        date: ele.date,
        temp: {
          min: {
            c: ele.day.mintemp_c,
            f: ele.day.mintemp_f,
          },
          avg: {
            c: ele.day.avgtemp_c,
            f: ele.day.avgtemp_f,
          },
          max: {
            c: ele.day.maxtemp_c,
            f: ele.day.maxtemp_f,
          },
        },
        condition: {
          code: ele.day.condition.code,
          icon: ele.day.condition.icon,
          text: convertConditionCodes(ele.day.condition.code, true),
        },
        wind: ele.day.maxwind_kph,
        visibility: ele.day.avgvis_km,
        humidity: ele.day.avghumidity,
        chanceOfRain: ele.day.daily_chance_of_rain,
        chanceOfSnowFall: ele.day.daily_chance_of_snow,
        uv: ele.day.uv,
        astro: {
          sunrise: ele.astro.sunrise,
          sunset: ele.astro.sunset,
          moonrise: ele.astro.moonrise,
          moonset: ele.astro.moonset,
          moonPhase: ele.astro.moon_phase,
          moonIllumination: ele.astro.moon_illumination,
        },
        air_quality: {
          co: ele.day.air_quality.co,
          no2: ele.day.air_quality.no2,
          o3: ele.day.air_quality.o3,
          so2: ele.day.air_quality.so2,
          pm2_5: ele.day.air_quality.pm2_5,
          pm10: ele.day.air_quality.pm10,
          usEpaIndex: ele.day.air_quality['us-epa-index'],
          gbDefraIndex: ele.day.air_quality['gb-defra-index'],
        },
      };
    });

    return {
      location,
      current,
      forecasts,
    };
  } catch (e) {
    throw e.response;
  }
};

export default getWeatherInfo;
