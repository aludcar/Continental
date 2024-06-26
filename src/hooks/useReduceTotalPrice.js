export const useReduceTotalPrice = (
  outboundSeatsArr = [],
  returnSeatsArr = []
) => {
  const arr = [...outboundSeatsArr, ...returnSeatsArr]
  const total = arr.reduce(
    (currentVal, { seatRate }) => currentVal + seatRate,
    0
  );
  return total;
};
