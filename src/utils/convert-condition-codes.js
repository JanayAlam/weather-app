import data from './includes/condition-codes';

const convertConditionCodes = (code, isDay) => {
  if (isDay) {
    return data[code].day;
  }
  return data[code].night;
};

export default convertConditionCodes;
