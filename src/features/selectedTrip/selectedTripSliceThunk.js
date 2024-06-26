import { useControlErrors } from "../../hooks/useControlErrors";
import customFetch from "../../utils/axios";
import { urlDictionary } from "../../utils/urlDictionary";
import { addPromoCodeToSeats } from "./selectedTripSlice";

const createRequestData = (thunkAPI) => {
  try {
    const {
      customerDocumentNumber,
      CustomerEmail,
      TotalPrice,
      customerExpressTravelerCardId,
      expressTravelerPointsToUse,
      tripOriginAgencyId,
      tripDestinationAgencyId,
      outboundTripLegs,
      returnTripLegs,
      passengers,
      paymentMethod,
    } = thunkAPI.getState().selectedTrip;

    const newData = {
      customerDocumentNumber,
      CustomerEmail,
      TotalPrice,
      customerExpressTravelerCardId,
      expressTravelerPointsToUse,
      tripOriginAgencyId,
      tripDestinationAgencyId,
      outboundTripLegs,
      returnTripLegs,
      passengers,
      paymentMethod,
    };
    newData.returnTripLegs =
      newData.returnTripLegs[0].seats?.length > 0
        ? newData.returnTripLegs
        : null;

    return newData;
  } catch (error) {
    console.error(error);
  }
};

export const setBookingAndPaymentMethodThunk = async (thunkAPI) => {
  try {
    const { promoCode, isPromoCodeValid } = thunkAPI.getState().couponCode;
    promoCode &&
      isPromoCodeValid &&
      thunkAPI.dispatch(addPromoCodeToSeats({ promoCode }));

    const requestData = createRequestData(thunkAPI);

    const responseSetBooking = await customFetch.post(
      urlDictionary.setBookingEndpoint,
      requestData
    );

    if (
      parseInt(responseSetBooking.status) === 200 &&
      parseInt(responseSetBooking.data.statusCode) === 0
    ) {
      throw { response: responseSetBooking.data };
    }

    const { purchaseId } = responseSetBooking.data.data;
    const { paymentMethod } = requestData;
    const responsePaymentMethod = await customFetch.post(
      urlDictionary.setPurchasePaymentMethodEndpoint,
      {
        purshasedId: purchaseId,
        paymentMethod,
      }
    );
    return responseSetBooking.data;
  } catch (error) {
    const { response } = error;
    useControlErrors(response);
    return thunkAPI.rejectWithValue("something went wrong");
  }
};
