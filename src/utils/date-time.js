import { utcToZonedTime } from 'date-fns-tz';

export const getCurrentDateTime = (tzId) => {
  return utcToZonedTime(new Date(), tzId);
};
