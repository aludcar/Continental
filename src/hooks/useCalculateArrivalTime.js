import { useConvertFormatHours } from "./useFormatNormalHours";

export const useCalculateArrivalTime = (departureHour, estimatedTripHours) => {
  const departureHourArr = departureHour.split(":");
  const dhr = departureHourArr[0];
  const dmin = departureHourArr[1];

  const time = parseInt(dhr) + parseInt(estimatedTripHours);
  const arrivalHour = time > 24 ? time - 24 : time;
  const newArrivalHour = useConvertFormatHours(`${arrivalHour}:${dmin}`);
  return newArrivalHour;
};

