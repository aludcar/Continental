import { useMaximumSelectedSeats } from "../../hooks/useMaximumSelectedSeats";
import customFetch from "../../utils/axios";
import { urlDictionary } from "../../utils/urlDictionary";
import { updateCouponProperty } from "./couponCodeSlice";

const baseCouponRequest = {
  transporterId: 2,
  tripDate: "",
  passengersQty: 1,
  seatRates: [],
  purchasePrice: 0,
  promoCode: null,
  promotionType: "C",
};

const createRequestData = (data) => {
  const { outboundTripLegs, returnTripLegs, promoCode, departureDate } = data;
  const maximumSelectedSeats = useMaximumSelectedSeats(
    outboundTripLegs,
    returnTripLegs,
    true
  );
  const newData = {
    ...baseCouponRequest,
    seatRates: maximumSelectedSeats.maximumSelectedSeats,
    promoCode,
    passengersQty: maximumSelectedSeats.length,
    purchasePrice: maximumSelectedSeats.total,
    tripDate: departureDate,
  };

  return newData;
};

export const getPromoCodeInfoThunk = async (promoCode, thunkAPI) => {
  try {
    thunkAPI.dispatch(
      updateCouponProperty({
        propName: "promoCode",
        propValue: promoCode,
      })
    );
    const { outboundTripLegs, returnTripLegs } =
      thunkAPI.getState().selectedTrip;
    const { departureDate } = thunkAPI.getState().searchTrip;

    const dataRequest = createRequestData({
      outboundTripLegs,
      returnTripLegs,
      promoCode,
      departureDate,
    });
    const responseCodeInfo = await customFetch.post(
      urlDictionary.couponEndpoint,
      dataRequest
    );
    return responseCodeInfo.data;
  } catch (error) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(`something went wrong: ${error.response}`);
  }
};
