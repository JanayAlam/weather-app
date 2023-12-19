/**
 * Fetch astronomy information from the API.
 * @param {Object} _queriesObj the query object that will be passed in the url
 */
const getAstroInfo = (_queriesObj, _date = new Date()) => {
  return {
    sunrise: '06:35 AM',
    sunset: '05:16 PM',
    moonrise: '11:48 AM',
    moonset: '11:53 PM',
    moon_phase: 'First Quarter',
  };
};

export default getAstroInfo;
