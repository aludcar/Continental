import { useSetCurrentDatePlusHours, useSetCurrentDateLessHours } from "./useSetCurrentDatePlusHours";

export const useSetExpirationDate = (
  meansPayUName = null,
  dateDeparture = null,
) => {
  let newExpirationDate = null;
  try {
    if (meansPayUName === null && dateDeparture === null) return null;
    const currentDate = new Date();
    const newDateDeparture = new Date(dateDeparture);
    const diffHours = parseInt(diff_hours(newDateDeparture, currentDate));
    newExpirationDate = setExpirationDate(currentDate, diffHours, newDateDeparture);
  } catch (err) {
    console.error(err);
  } finally {
    return newExpirationDate;
  }
};

const diff_hours = (dt2, dt1) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
};

const setExpirationDate = (currentDate, diffHours, newDateDeparture) => {
  let expirationDate = null;
  if (diffHours <= 4) {
    expirationDate = useSetCurrentDatePlusHours(currentDate, 2);
  } else if (diffHours > 4 && diffHours < 24) {
    expirationDate = useSetCurrentDateLessHours(newDateDeparture, 1);
  } else if (diffHours > 24) {
    expirationDate = useSetCurrentDatePlusHours(currentDate, 23);
  }
  return expirationDate;
};
