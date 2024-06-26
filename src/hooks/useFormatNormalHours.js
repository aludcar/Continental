export const useConvertFormatHours = (hourData) => {
  if (!hourData) return null;
  const hour = hourData.split(":");
  let newFormatHour = "";
  if (hour[0] >= 0 && hour[0] <= 24 && hour[1] >= 0 && hour[1] <= 60) {
    const AMorPM = hour[0] >= 12 ? "PM" : "AM";
    const hr = hour[0] % 12;
    const min = hour[1];
    newFormatHour = `${
      parseInt(hour[0]) === 12 ? hour[0] : hr
    }:${min} ${AMorPM}`;
  }
  return newFormatHour;
};
