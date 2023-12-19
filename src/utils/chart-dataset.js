import { format } from 'date-fns';

/**
 * Get a day object which contain day name in bengali, japanese, and english language.
 * @param {String} day string value containing the name of the day
 * @returns {Object} a object containing the names in all three languages
 */
const getDayForAllLanguage = (day) => {
  day = day.toLowerCase();
  switch (day) {
    case 'friday':
      return {
        en: 'Friday',
        bd: 'শুক্রবার',
        jp: '金曜日',
      };
    case 'saturday':
      return { en: 'Saturday', bd: 'শনিবার', jp: '土曜日' };
    case 'sunday':
      return {
        en: 'Sunday',
        bd: 'রবিবার',
        jp: '日曜日',
      };
    case 'monday':
      return {
        en: 'Monday',
        bd: 'সোমবার',
        jp: '月曜日',
      };
    case 'tuesday':
      return {
        en: 'Tuesday',
        bd: 'মঙ্গলবার',
        jp: '火曜日',
      };
    case 'wednesday':
      return {
        en: 'Wednesday',
        bd: 'বুধবার',
        jp: '水曜日',
      };
    case 'thursday':
      return {
        en: 'Thursday',
        bd: 'বৃহস্পতিবার',
        jp: '木曜日',
      };
    default:
      return {
        en: '',
        bd: '',
        jp: '',
      };
  }
};

/**
 * Generate a dataset from the weather data.
 * @param {Array<{
 *    date: String,
 *    temp: {
 *      min: { c: Number, f: Number },
 *      avg: { c: Number, f: Number },
 *      max: { c: Number, f: Number },
 *    }
 *  }>} arr an array of objects which contains information about a day's weather
 * @returns {{
 *  labels: Array<String>,
 *  c: Array<Number>,
 *  f: Array<Number>,
 * }} dataset object for viewing the chart
 */
const generateChartDataset = (arr) => {
  const labels = [];
  const c = [
    {
      label: 'Min Temp',
      data: [],
    },
    {
      label: 'Avg Temp',
      data: [],
    },
    {
      label: 'Max Temp',
      data: [],
    },
  ];
  const f = [
    {
      label: 'Min Temp',
      data: [],
    },
    {
      label: 'Avg Temp',
      data: [],
    },
    {
      label: 'Max Temp',
      data: [],
    },
  ];

  arr.forEach(({ date, temp }) => {
    // label
    const day = getDayForAllLanguage(format(new Date(date), 'EEEE'));
    labels.push(day.en);

    // celsius
    c[0].data.push(temp.min.c); // min
    c[1].data.push(temp.avg.c); // avg
    c[2].data.push(temp.max.c); // max

    // fahrenheit
    f[0].data.push(temp.min.f); // min
    f[1].data.push(temp.avg.f); // avg
    f[2].data.push(temp.max.f); // max
  });

  return {
    labels,
    c,
    f,
  };
};

export default generateChartDataset;
