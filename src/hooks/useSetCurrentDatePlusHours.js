export const useSetCurrentDatePlusHours = (
  currentDate = Date.now(),
  hours = 0
) => {
  const newCurrentDate = currentDate;
  newCurrentDate.setHours(newCurrentDate.getHours() + hours);
  return newCurrentDate;
};

export const useSetCurrentDateLessHours = (
  currentDate = Date.now(),
  hours = 0
) => {
  const newCurrentDate = currentDate;
  newCurrentDate.setHours(newCurrentDate.getHours() - hours);
  return newCurrentDate;
};

export const useSetTodayPlus2 = (days) => {
    const newDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    return newDate;
  };