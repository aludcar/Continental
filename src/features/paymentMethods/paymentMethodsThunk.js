import customFetch from "../../utils/axios";
import { urlDictionary } from "../../utils/urlDictionary";

const requestDefaultData = {
  agreementUserId: 0,
  applicationId: "EBOL_WEB",
  transporterId: 2,
};

export const getPaymentMethodsThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.post(
      urlDictionary.paymentMethodsEndpoint,
      requestDefaultData
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return thunkAPI.rejectWithValue("something went wrong");
  }
};
