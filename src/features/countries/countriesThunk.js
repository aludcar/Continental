import customFetch from "../../utils/axios";
import { urlDictionary } from "../../utils/urlDictionary";

export const getAllCountriesThunk = async (thunkAPI) =>{

    try {
        const resp = await customFetch.post(
          urlDictionary.countriesEndpoint,
        );
        return resp.data;
      } catch (error) {
        console.log(error.response);
        return thunkAPI.rejectWithValue("something went wrong");
      }
}