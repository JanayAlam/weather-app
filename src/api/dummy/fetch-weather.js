import convertConditionCodes from '../../utils/convert-condition-codes';
import getAstroInfo from './fetch-astro';

/**
 * Fetch astronomy information from the API.
 * @param {String} _location the query object that will be passed in the url
 */
const getWeatherInfo = (_location, _date = new Date()) => {
  return {
    location: {
      name: 'Dhaka',
      region: '',
      country: 'Bangladesh',
      lat: 23.72,
      lon: 90.41,
      tzId: 'Asia/Dhaka',
    },
    current: {
      lastUpdated: '2023-12-19 11:45',
      temp: {
        c: 24.5,
        f: 76.1,
      },
      isDay: false,
      condition: {
        code: 1000,
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        text: convertConditionCodes(1000, true),
      },
      wind: {
        speed: 10.8,
        degree: 353,
        direction: 'N',
      },
      pressure: 1017.0,
      humidity: 51,
      cloud: 8,
      feelsLike: {
        c: 25.5,
        f: 78,
      },
      visibility: 10,
      uv: 6.0,
      windGust: 12.4,
      air_quality: {
        co: 1468.7,
        no2: 16.3,
        o3: 127.3,
        so2: 8.7,
        pm2_5: 320.5,
        pm10: 348.9,
        usEpaIndex: 6,
        gbDefraIndex: 10,
      },
      astro: getAstroInfo(),
    },
    forecasts: [
      {
        date: '2023-12-20',
        temp: {
          min: {
            c: 17.1,
            f: 62.8,
          },
          avg: {
            c: 21,
            f: 69.8,
          },
          max: {
            c: 25.8,
            f: 78.5,
          },
        },
        condition: {
          code: 1000,
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          text: {
            bd: 'সূর্যোজ্জ্বল',
            jp: '晴れ',
            en: 'Sunny',
          },
        },
        wind: 10.8,
        visibility: 10,
        humidity: 61.0,
        chanceOfRain: 0,
        chanceOfSnowFall: 0,
        uv: 6,
        astro: {
          sunrise: '06:35 AM',
          sunset: '05:16 PM',
          moonrise: '11:48 AM',
          moonset: '11:53 PM',
        },
        air_quality: {
          co: 1439.024,
          no2: 23.652,
          o3: 79.77600000000001,
          so2: 4.787999999999999,
          pm2_5: 282.968,
          pm10: 306.2440000000001,
          usEpaIndex: 6,
          gbDefraIndex: 10,
        },
      },
      {
        date: '2023-12-21',
        temp: {
          min: {
            c: 16.8,
            f: 61.0,
          },
          avg: {
            c: 20,
            f: 67.8,
          },
          max: {
            c: 25.8,
            f: 78.5,
          },
        },
        condition: {
          code: 1000,
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          text: {
            bd: 'সূর্যোজ্জ্বল',
            jp: '晴れ',
            en: 'Sunny',
          },
        },
        wind: 10.8,
        visibility: 10,
        humidity: 61.0,
        chanceOfRain: 0,
        chanceOfSnowFall: 0,
        uv: 6,
        astro: {
          sunrise: '06:35 AM',
          sunset: '05:16 PM',
          moonrise: '11:48 AM',
          moonset: '11:53 PM',
        },
        air_quality: {
          co: 1439.024,
          no2: 23.652,
          o3: 79.77600000000001,
          so2: 4.787999999999999,
          pm2_5: 282.968,
          pm10: 306.2440000000001,
          usEpaIndex: 6,
          gbDefraIndex: 10,
        },
      },
      {
        date: '2023-12-22',
        temp: {
          min: {
            c: 17.1,
            f: 62.8,
          },
          avg: {
            c: 21,
            f: 69.8,
          },
          max: {
            c: 25.8,
            f: 78.5,
          },
        },
        condition: {
          code: 1000,
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          text: {
            bd: 'সূর্যোজ্জ্বল',
            jp: '晴れ',
            en: 'Sunny',
          },
        },
        wind: 10.8,
        visibility: 10,
        humidity: 61.0,
        chanceOfRain: 0,
        chanceOfSnowFall: 0,
        uv: 6,
        astro: {
          sunrise: '06:35 AM',
          sunset: '05:16 PM',
          moonrise: '11:48 AM',
          moonset: '11:53 PM',
        },
        air_quality: {
          co: 1439.024,
          no2: 23.652,
          o3: 79.77600000000001,
          so2: 4.787999999999999,
          pm2_5: 282.968,
          pm10: 306.2440000000001,
          usEpaIndex: 6,
          gbDefraIndex: 10,
        },
      },
      {
        date: '2023-12-23',
        temp: {
          min: {
            c: 16.8,
            f: 61.0,
          },
          avg: {
            c: 20,
            f: 67.8,
          },
          max: {
            c: 25.8,
            f: 78.5,
          },
        },
        condition: {
          code: 1000,
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          text: {
            bd: 'সূর্যোজ্জ্বল',
            jp: '晴れ',
            en: 'Sunny',
          },
        },
        wind: 10.8,
        visibility: 10,
        humidity: 61.0,
        chanceOfRain: 0,
        chanceOfSnowFall: 0,
        uv: 6,
        astro: {
          sunrise: '06:35 AM',
          sunset: '05:16 PM',
          moonrise: '11:48 AM',
          moonset: '11:53 PM',
        },
        air_quality: {
          co: 1439.024,
          no2: 23.652,
          o3: 79.77600000000001,
          so2: 4.787999999999999,
          pm2_5: 282.968,
          pm10: 306.2440000000001,
          usEpaIndex: 6,
          gbDefraIndex: 10,
        },
      },
      {
        date: '2023-12-24',
        temp: {
          min: {
            c: 17.1,
            f: 62.8,
          },
          avg: {
            c: 21,
            f: 69.8,
          },
          max: {
            c: 25.8,
            f: 78.5,
          },
        },
        condition: {
          code: 1000,
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          text: {
            bd: 'সূর্যোজ্জ্বল',
            jp: '晴れ',
            en: 'Sunny',
          },
        },
        wind: 10.8,
        visibility: 10,
        humidity: 61.0,
        chanceOfRain: 0,
        chanceOfSnowFall: 0,
        uv: 6,
        astro: {
          sunrise: '06:35 AM',
          sunset: '05:16 PM',
          moonrise: '11:48 AM',
          moonset: '11:53 PM',
        },
        air_quality: {
          co: 1439.024,
          no2: 23.652,
          o3: 79.77600000000001,
          so2: 4.787999999999999,
          pm2_5: 282.968,
          pm10: 306.2440000000001,
          usEpaIndex: 6,
          gbDefraIndex: 10,
        },
      },
      {
        date: '2023-12-25',
        temp: {
          min: {
            c: 16.8,
            f: 61.0,
          },
          avg: {
            c: 20,
            f: 67.8,
          },
          max: {
            c: 25.8,
            f: 78.5,
          },
        },
        condition: {
          code: 1000,
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          text: {
            bd: 'সূর্যোজ্জ্বল',
            jp: '晴れ',
            en: 'Sunny',
          },
        },
        wind: 10.8,
        visibility: 10,
        humidity: 61.0,
        chanceOfRain: 0,
        chanceOfSnowFall: 0,
        uv: 6,
        astro: {
          sunrise: '06:35 AM',
          sunset: '05:16 PM',
          moonrise: '11:48 AM',
          moonset: '11:53 PM',
        },
        air_quality: {
          co: 1439.024,
          no2: 23.652,
          o3: 79.77600000000001,
          so2: 4.787999999999999,
          pm2_5: 282.968,
          pm10: 306.2440000000001,
          usEpaIndex: 6,
          gbDefraIndex: 10,
        },
      },
      {
        date: '2023-12-26',
        temp: {
          min: {
            c: 16.8,
            f: 61.0,
          },
          avg: {
            c: 20,
            f: 67.8,
          },
          max: {
            c: 25.8,
            f: 78.5,
          },
        },
        condition: {
          code: 1000,
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          text: {
            bd: 'সূর্যোজ্জ্বল',
            jp: '晴れ',
            en: 'Sunny',
          },
        },
        wind: 10.8,
        visibility: 10,
        humidity: 61.0,
        chanceOfRain: 0,
        chanceOfSnowFall: 0,
        uv: 6,
        astro: {
          sunrise: '06:35 AM',
          sunset: '05:16 PM',
          moonrise: '11:48 AM',
          moonset: '11:53 PM',
        },
        air_quality: {
          co: 1439.024,
          no2: 23.652,
          o3: 79.77600000000001,
          so2: 4.787999999999999,
          pm2_5: 282.968,
          pm10: 306.2440000000001,
          usEpaIndex: 6,
          gbDefraIndex: 10,
        },
      },
    ],
  };
};

export default getWeatherInfo;
