import customFetch from "../../utils/axios";
import { urlDictionary } from "../../utils/urlDictionary";
import { updateAvailableTripRequest } from "./allTripsSlice";

export const getAvailableTripsThunk = async (thunkAPI) =>{

    try {
        /* thunkAPI.dispatch(updateAvailableTripRequest(searchRequest)); */
        const { availableTripRequest } = thunkAPI.getState().allTrips
        const resp = await customFetch.post(
          urlDictionary.allTripsEndpoint,
          availableTripRequest
        );
        return resp.data;
      } catch (error) {
        console.log(error.response);
        return thunkAPI.rejectWithValue("something went wrong");
      }
}