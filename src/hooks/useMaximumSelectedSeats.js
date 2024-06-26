export const useMaximumSelectedSeats = (
  outboundTripLegs = [],
  returnTripLegs = [],
  isCoupon = false
) => {
  const maximumSelectedSeats = {
    maximumSelectedSeats: [],
    length: 0,
    total: 0,
  };

  !isCoupon
    ? passengerCase(outboundTripLegs, returnTripLegs, maximumSelectedSeats)
    : couponCodeCase(outboundTripLegs, returnTripLegs, maximumSelectedSeats);
  return maximumSelectedSeats;
};

const passengerCase = (
  outboundTripLegs,
  returnTripLegs,
  maximumSelectedSeats
) => {
  if (
    !returnTripLegs[0]?.seats?.length ||
    returnTripLegs[0].seats.length < outboundTripLegs[0].seats.length
  ) {
    maximumSelectedSeats.maximumSelectedSeats = outboundTripLegs[0].seats;
    maximumSelectedSeats.length = parseInt(outboundTripLegs[0].seats.length);
    maximumSelectedSeats.total = parseInt(outboundTripLegs[0].subTotal);
  } else {
    maximumSelectedSeats.maximumSelectedSeats = returnTripLegs[0].seats;
    maximumSelectedSeats.length = parseInt(returnTripLegs[0].seats.length);
    maximumSelectedSeats.total = parseInt(returnTripLegs[0].subTotal);
  }
};

const couponCodeCase = (
  outboundTripLegs,
  returnTripLegs,
  maximumSelectedSeats
) => {
  if (!returnTripLegs[0]?.seats?.length) {
    maximumSelectedSeats.maximumSelectedSeats = outboundTripLegs[0].seats;
    maximumSelectedSeats.length = parseInt(outboundTripLegs[0].seats.length);
    maximumSelectedSeats.total = parseInt(outboundTripLegs[0].subTotal);
  } else {
    maximumSelectedSeats.maximumSelectedSeats = [
      ...returnTripLegs[0].seats,
      ...outboundTripLegs[0].seats,
    ];
    maximumSelectedSeats.length =
      parseInt(outboundTripLegs[0].seats.length) +
      parseInt(returnTripLegs[0].seats.length);
    maximumSelectedSeats.total =
      parseInt(outboundTripLegs[0].subTotal) +
      parseInt(returnTripLegs[0].subTotal);
  }
};
