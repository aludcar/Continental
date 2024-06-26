export const getMinimumPrice = (rates) => {
  const formatted = Math.min(
    ...rates.map((rate) => rate?.price).filter((price) => parseInt(price) !== 0)
  ).toLocaleString("es-co", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatted;
};

export const formattedCOP = (rate) =>
  rate.toLocaleString("es-co", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const calculateArrivalTime = (departureTime, estimatedTripHours) => {};
